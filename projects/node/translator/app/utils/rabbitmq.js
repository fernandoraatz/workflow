/*
|--------------------------------------------------------------------------
| Rabbit - Queues/Exchanges
|--------------------------------------------------------------------------
*/

const amqp  = require('amqplib');
const edgat = require('../translator/edg-core-article-translator');
const env = require('../../config/env');
const logger = require('./logger');
const {ReadingAugmenter} = require('@igeg/franklin');
const translator = new edgat();

const augmenter = new ReadingAugmenter();

class Rabbitmq{

    // Connect
    queueConnect(retryCounter = 1) {
        let open = amqp.connect(`amqp://${env.BROKER_USER}:${env.BROKER_PASS}@${env.BROKER_HOST}/${env.BROKER_VHOST}`);
        let self = new Rabbitmq();
        open.then(conn => {
            logger.info('[v] Successfully connected to rabbitmq');
            this.queueConsume(conn);
            return null;
        }).catch(() => {
            if (retryCounter <= env.LIMIT_RETRY_PUBLISH) {
                logger.error('[x] Failed to connect to rabbitmq. Re-attempting connection.');
                retryCounter ++;
                setTimeout(function() {
                    self.queueConnect(retryCounter);
                }, env.TIME_RETRY_PUBLISH);

            } else {
                logger.error('[x] Failed to connect to rabbitmq');
                logger.warn('Rabbitmq connection - Error');
                setTimeout(function() {
                    self.queueConnect();
                }, env.TIME_RETRY_PUBLISH);
            }
        });
    }

    // Consume
    queueConsume(conn) {
        let self = new Rabbitmq();
        conn.createConfirmChannel()
            .then(ch => {
                ch.on('close', function() {
                    logger.error('[x] Error to get message from channel - Rabbit is down');
                    self.queueConnect();
                });
                ch.prefetch(1);
                ch.assertExchange(env.EXCHANGE_CONSUME, 'direct', { durable: true });
                var q = ch.assertQueue(env.QUEUE_CONSUME, { durable: true });
                var queueName = q.queue;
                ch.bindQueue(queueName, env.EXCHANGE_CONSUME, 'INDEX');
                ch.bindQueue(queueName, env.EXCHANGE_CONSUME, 'DELETE');
                ch.consume(queueName, msg => {
                    let route = msg.fields.routingKey;
                    try {
                        let sendedMessage = translator.translate(JSON.parse(msg.content));
                        augmenter.addWordCountAndReadingTime(sendedMessage);
                        let translatedMsg = new Buffer(JSON.stringify(sendedMessage));

                        if (translatedMsg.body !== '[]') {
                            this.queuePublish(ch, msg, route, translatedMsg);
                        } else {
                            logger.error(`[x] Error translate article body null - ${msg.content}`);
                            ch.ack(msg);
                        }
                    } catch (err) {
                        logger.error(`[x] Error translate article - ${msg.content} \n\n  error - ${err}`);
                        ch.ack(msg);
                    }
                });
            });
    }

    // Publish
    queuePublish(ch, msg, route, translatedMsg, retryNumber = 1) {

        let self = new Rabbitmq();

        ch.assertExchange(env.EXCHANGE_PUBLISH, 'direct', { durable: true });
        ch.publish(env.EXCHANGE_PUBLISH, route, translatedMsg, {}, function(err) {
            if (!err) {
                logger.info(`[v] ${JSON.parse(msg.content).uid} - Successfully published message to exchange ${env.EXCHANGE_PUBLISH} using route ${route}`);
                ch.ack(msg);
            } else {
                logger.error(`[x] ${JSON.parse(msg.content).uid} - Failed to publish message to exchange ${env.EXCHANGE_PUBLISH} using route ${route} - ${msg.content}`);
                logger.info(`[>] This was retry #${retryNumber} of ${env.LIMIT_RETRY_PUBLISH}`);
                if (retryNumber < env.LIMIT_RETRY_PUBLISH) {
                    setTimeout(function() {
                        self.queuePublish(ch, msg, route, translatedMsg, ++retryNumber);
                    }, env.TIME_RETRY_PUBLISH);
                } else {
                    logger.error(`[x] ${JSON.parse(msg.content).uid} - Retry limit exceeded. Shutting off -  ${msg.content} `);
                    ch.close();
                }
            }
        });
    }
}

module.exports = Rabbitmq;