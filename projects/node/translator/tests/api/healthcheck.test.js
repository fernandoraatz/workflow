var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app.js');
let healthcheckUrl = '/healthcheck.json';
let expect = chai.expect;

chai.use(chaiHttp);

describe('Healthcheck Test', function () {
    it('Should respond with 200', function(done) {
        chai.request(server)
            .get(healthcheckUrl)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});