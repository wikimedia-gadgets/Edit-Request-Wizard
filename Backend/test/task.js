const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("API Endpoints", () => {

    // afterAll(() => {
    //     // done => server.close(done);
    //     // shut down server or do whatever cleanup is needed
    //   })

    // after(done => server.close(done));

    context("GET/api/", () => {
        it("It should GET to check if service is running",(done)=>{
            chai.request(server)
                .get("/ping")
                .end((err,response) => {
                    // response,should.have.status(200);
                    response.body.should.be.a("object");
                done();
                });
            });
        });
    

    context("POST/api/", () => {
        it("It should POST to verify the source",(done)=>{
            const task = {
                "linkValue": "https://www.youtube.com/watch?v=I4BZQr-5mBY"
            };
            chai.request(server)
                .post("/api/v1/verifySource")
                .send(task)
                .end((err,response) => {
                    // response,should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("comment").eq('Generally unreliable source');
                    response.body.should.have.property("flag").eq(1);
                    response.body.should.have.property("kind").eq('unreliable');
                done();
            });
        });
    });

    context("POST/api/", () => {
        it("It should POST to verify the Quote",(done)=>{
            const task = {
                "linkValue": "https://www.investopedia.com/terms/b/blockchain.asp",
                "quoteValue": "A blockchain is a distributed database or ledger that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format."
            };
            chai.request(server)
                .post("/api/v1/verifyQuote")
                .send(task)
                .end((err,response) => {
                    // response,should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("isParagraphTextOnPage").eq(true);
                done();
            });
        });
    });
});

