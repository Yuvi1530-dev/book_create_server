const chai = require('chai');
const ChaiHttp = require('chai-http');
const server = require('../app');
const { describe } = require('mocha');
chai.should();

chai.use(ChaiHttp);

describe('Task Api', () => {
    /**
     * POST Method
     */
    describe('POST /bookList', () => {
        it("It Shoul Get a Book List using the Limit", (done) => {
            let payLoad = {
                n_Skip: 0,
                n_Limit: 10,
            }
            chai.request(server).post('/bookList').send(payLoad).end((err, response) => {
                response.should.have.status(1);
                response.body.should.be.a('Object');
                response.body.should.have.message('Data Found')
                done();
            })
        })
        it("It Shoul Add The Book", (done) => {
            router.post('/findBook', BookController.bookGet);
            router.post('/updateBook', BookController.bookUpdate);
            router.post('/bookDelete', BookController.bookDelete);
            let payLoad = {
                title: 'Yuvaraj Test',
                author: "Yuvaraj",
                description: "dasd adad ad ad ada da dasd asd ad adasdasdad asda sda das dasdasdasasda dad asdasdasasd",
                publication_year: 2023,
            }
            chai.request(server).post('/addBook').send(payLoad).end((err, response) => {
                response.should.have.status(1);
                response.body.should.have.message('Book added successfully')
                done();
            })
        })
        it("It Shoul Find The Book Using The ISBN Number", (done) => {
            router.post('/updateBook', BookController.bookUpdate);
            router.post('/bookDelete', BookController.bookDelete);
            let payLoad = {
                isbn: 962968474,
            }
            chai.request(server).post('/findBook').send(payLoad).end((err, response) => {
                response.should.have.status(1);
                response.body.should.have.message('Data Found')
                done();
            })
        })
        it("Update The Book Using The ISBN Number", (done) => {
            router.post('/bookDelete', BookController.bookDelete);
            let payLoad = {
                isbn: 962968474,
                title: 'Yuvaraj Test',
                author: "Yuvaraj",
                description: "dasd adad ad ad ada da dasd asd ad adasdasdad asda sda das dasdasdasasda dad asdasdasasd",
                publication_year: 2023
            }
            chai.request(server).post('/updateBook').send(payLoad).end((err, response) => {
                response.should.have.status(1);
                response.body.should.have.message('Book Data Updated Successfully')
                done();
            })
        })
        it("Delete The Book Using the Isbn Number", (done) => {
            let payLoad = {
                isbn: 962968474
            }
            chai.request(server).post('/updateBook').send(payLoad).end((err, response) => {
                response.should.have.status(1);
                response.body.should.have.message('Book Data Deleted Successfully')
                done();
            })
        })
    });
})

