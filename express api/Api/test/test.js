let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
const { response } = require('express');
const { teardown } = require('mocha');
should = chai.should()

var fs = require("fs");
const path = require('path');
const { addStudentToAssignmets } = require('../controller/teacher');

chai.use(chaiHttp);


let Student_jwt = "";
let Teacher_jwt = "";
let Teacher_assignments;
let Student_assignments;


describe('Signup Api', () => {

    describe('Post api/v1/auth/signup', () => {

        it('it should add a new user', (done) => {

            data = {
                "email": "abc5@gmail.com",
                "password": "1234",
                "role": "Student"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/signup')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();
            })

        })



        it('it should add a new user', (done) => {

            data = {
                "email": "abcT5@gmail.com",
                "password": "1234",
                "role": "Teacher"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/signup')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();
            })

        })



        it('it should not  add a new user for duplicate email', (done) => {

            data = {
                "email": "abc5@gmail.com",
                "password": "1234",
                "role": "Student"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/signup')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)

                done();
            })

        })



        it('it should not  add a new user for unknown role', (done) => {

            data = {
                "email": "abc6@gmail.com",
                "password": "1234",
                "role": "ent"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/signup')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)

                done();
            })

        })

        
       


    })



    describe('Post api/v1/auth/login', () => {

        it('it should return a jwt token', (done) => {

            data = {
                "email": "abc5@gmail.com",
                "password": "1234"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('token')

                
                
               Student_jwt = response.body.token;
                done();
            })

        })



        it('it should return a jwt token', (done) => {

            data = {
                "email": "abcT5@gmail.com",
                "password": "1234"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('token')

               
                Teacher_jwt = response.body.token;
               
                done();
            })

        })


        it('it should not  return a jwt token for invalid email', (done) => {

            data = {
                "email": "abc10@gmail.com",
                "password": "123"                   
        
        }

        


            chai.request(server)
            .post( '/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(401);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('error').eq('Invalid credentials')
                done();
            })

        })




        it('it should not  return a jwt token for  invalid  password ', (done) => {

            data = {
                "email": "abc5@gmail.com",
                "password": "123"                   
        }

            chai.request(server)
            .post( '/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(401);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('error').eq('Invalid credentials')
                done();
            })

        })


        
       


    })



})




describe('Teacher Api', () => {

    describe('Post api/v1/teacher/addAssigment', () => {

        it('it should not  create a Assignmen  for not authorized', (done) => {

            data = {
                "title": "assignment title 5",
                "assignment": "this is a assignment 5. this is a assignment 5. this is a assignment 5",
                "end_date": "2020-06-22"
            }

            chai.request(server)
            .post( '/api/v1/teacher/addAssigment')
            .set('content-type', 'application/json')
            .send(data )
            .end((err, response) => {

                response.should.have.status(401);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('error')

                done();
            })

        })



        it('it should   create a Assignment', (done) => {

            data = {
                "title": "assignment title 5",
                "assignment": "this is a assignment 5. this is a assignment 5. this is a assignment 5",
                "end_date": "2020-06-22"
            }

            chai.request(server)
            .post( '/api/v1/teacher/addAssigment')
            .set('content-type', 'application/json')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
               

                done();
            })

        })

        it('it should   create a Assignment', (done) => {

            data = {
                "title": "assignment title 6",
                "assignment": "this is a assignment 6. this is a assignment 6. this is a assignment 6",
                "end_date": "2050-08-22"
            }

            chai.request(server)
            .post( '/api/v1/teacher/addAssigment')
            .set('content-type', 'application/json')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data )
            .end((err, response) => {

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
               

                done();
            })

        })





        it('it should not  add a Assignment for  invalid request data ', (done) => {

            data = {
                
                "assignment": "this is a assignment 5. this is a assignment 5. this is a assignment 5",
                "end_date": "2020-06-22"
            }

            chai.request(server)
            .post( '/api/v1/teacher/addAssigment')
            .set('content-type', 'application/json')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data )
            .end((err, response) => {

                response.should.have.status(500);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)
                response.body.should.have.property('error')

                done();
            })

        })



       

        
       


    })



    describe('Get api/v1/user/usersAssignments', () => {

        it('it should return teachers  assignments', (done) => {

            

            chai.request(server)
            .get( '/api/v1/user/usersAssignments')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('data')

               

                Teacher_assignments = response.body.data

               

                done();
            })

        })



    })



    describe('Post api/v1/teacher/addStudent', () => {

        it('it should add a new student to assignment  ', (done) => {

        

            chai.request(server)
            .post( '/api/v1/teacher/addStudent')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .field('studentEmail',"abc5@gmail.com" )
            .field('assignmentId',Teacher_assignments[0].assignmentId.toString() )
            .attach('studentImage', 'test/test.jpg')
            .end((err, response) => {

               

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();
            })

        })

        it('it should add a new student to assignment  ', (done) => {

        

            chai.request(server)
            .post( '/api/v1/teacher/addStudent')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .field('studentEmail',"abc5@gmail.com" )
            .field('assignmentId',Teacher_assignments[1].assignmentId.toString() )
            .attach('studentImage', 'test/test.jpg')
            .end((err, response) => {

               

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();
            })

        })




        it('it should not  add a new student to assignment for  duplicate student email  ', (done) => {

        

            chai.request(server)
            .post( '/api/v1/teacher/addStudent')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .field('studentEmail',"abc5@gmail.com" )
            .field('assignmentId',Teacher_assignments[0].assignmentId.toString() )
            .attach('studentImage', 'test/test.jpg')
            .end((err, response) => {

               

                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)

                done();
            })

        })



    })







})












describe('Student Api ', () => {

    describe('Get api/v1/user/usersAssignments', () => {

        it('it should return teachers  assignments', (done) => {

            

            chai.request(server)
            .get( '/api/v1/user/usersAssignments')
            .set({ Authorization: "Bearer "+ Student_jwt })
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('data')

               

              Student_assignments = response.body.data

               

                done();
            })

        })



    })


    describe('Get api/v1/student/assignmentDetail', () => {

        it('it should return assignment Detail', (done) => {

            data = {
                
                "assignmentId": Student_assignments[1].assignmentId
            }

            chai.request(server)
            .get( '/api/v1/student/assignmentDetail')
            .set({ Authorization: "Bearer "+ Student_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('assignment')
                response.body.should.have.property('image')

            

                done();
            })

        })



    })




    describe('Get api/v1/student/addReadingTime', () => {

        it('it should add  reading time to assignment ', (done) => {

           

            data = {
                
                "assignmentId":Student_assignments[1].assignmentId,
                "studentEmail": "abc5@gmail.com",
                "readingTime": 200
            }

            chai.request(server)
            .put( '/api/v1/student/addReadingTime')
            .set({ Authorization: "Bearer "+ Student_jwt })
            .send(data)
            .end((err, response) => {
                
                    
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();
            })

        })

        it('it should not  add  reading time to assignment ', (done) => {

            data = {
                "assignmentId": Student_assignments[0].assignmentId,
                 "studentEmail": "abc2@gmail.com",
                "readingTime": 200
            }

            chai.request(server)
            .put( '/api/v1/student/addReadingTime')
            .set({ Authorization: "Bearer "+ Student_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)

                done();
            })

        })



    })




})

describe('Teacher Api', () => {
    describe('Get api/v1/teacher/assignmentDetail', () => {

        it('it should return assignmentDetaisl for teacher ', (done) => {

            data = {
                
                "assignmentId": Teacher_assignments[1].assignmentId
            }

            chai.request(server)
            .get( '/api/v1/teacher/assignmentDetail')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)
                response.body.should.have.property('assignment')
                response.body.should.have.property('students')

            

                done();

            })

        })



    })

    describe('Get api/v1/teacher/deleteAssignment', () => {

        it('it should add  delete assignment and related info  ', (done) => {
           

            data = {
                    
                "assignmentId": Teacher_assignments[0].assignmentId
            }

            chai.request(server)
            .delete( '/api/v1/teacher/deleteAssignment')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();

            })



        })


        it('it should add  delete assignment and related info  ', (done) => {
           

            data = {
                    
                "assignmentId": Teacher_assignments[1].assignmentId
            }

            chai.request(server)
            .delete( '/api/v1/teacher/deleteAssignment')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(true)

                done();

            })



        })

        it('it should add  delete assignment and related info  ', (done) => {
           

            data = {
                    
                "assignmentId": Teacher_assignments[1].assignmentId
            }

            chai.request(server)
            .delete( '/api/v1/teacher/deleteAssignment')
            .set({ Authorization: "Bearer "+ Teacher_jwt })
            .send(data)
            .end((err, response) => {
                

                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(false)

                done();

            })



        })


    })




})


