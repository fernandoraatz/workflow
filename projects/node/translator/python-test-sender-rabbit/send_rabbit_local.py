## Imports

import pika
import json
from article_mock import * 

## Connect Rabbit

def connect_rabbitmq():

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host='172.17.0.2', 
            virtual_host='contenthub',
            credentials=pika.PlainCredentials(
                username='guest',
                password='guest'
            )
        )
    )

    return connection

## Set Rabbit

def set_rabbitmq(custom_routing_key):

    connection = connect_rabbitmq()
    channel = connection.channel()

    channel.exchange_declare(
        exchange='leibniz-qa',
        exchange_type='direct',
        durable='true'
    )

    channel.basic_publish(
        exchange='leibniz-qa',
        routing_key=custom_routing_key,
        body=json.dumps(article),
        properties=pika.BasicProperties(delivery_mode = 2)
    )

    print '[v] Successfully send message to translator leibniz using route %s' %(custom_routing_key)

    connection.close()

## Send Rabbit

def send_rabbitmq():
    custom_routing_key = 'INDEX'
    for i in range(5):
        if custom_routing_key == 'INDEX':
            custom_routing_key = 'DELETE'
        else:
            custom_routing_key = 'INDEX' 
        
        set_rabbitmq(custom_routing_key)

## Init

send_rabbitmq()

