const { validationResult } = require('express-validator');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User');
const  Assignment = require('../models/Assignment');

const is_before_endTime = require('../utils/comapre_date');




 // @desc      add reading time to student of a assignment
 // @route     PUT /api/v1/student/addReadingTime
 // @access    student

 exports.addStudentReadingTime = asyncHandler(async(req, res, next) => {

    const {assignmentId, studentEmail, readingTime} = req.body;

    const assignment = await Assignment.findById(assignmentId)

    if(!assignment){ 

        return next(new ErrorResponse('No Assignmnet Found',400));
    } 

    if(!is_before_endTime(assignment.end_date)){
        return next(new ErrorResponse('deadline Finished',400));
    }
    


    

    const student  = await User.findOne({email: studentEmail})

    if(!student){
             
        return next(new ErrorResponse('No Student Found',400));
    } 


    const tempStudent = assignment.Students.find( (std)=> {
       return std.student._id.toString() === student._id.toString()
    });

    if( !tempStudent){
        return next(new ErrorResponse('This Student was not assigned to this Assigmnet',400));
    }


    tempStudent.readingTime = tempStudent.readingTime + readingTime;
    assignment.save()


    res.status(200).json({
        success: true
           
    })



   

});



// @desc       returns assignment detail 
 // @route     POST /api/v1/student/assignmentDetail
 // @access    student
exports.assignmentDetail = asyncHandler(async(req, res, next) => {

    const {assignmentId} = req.body;

    const tempAssignment = await Assignment.findById(assignmentId);

    if(!tempAssignment){ 

        return next(new ErrorResponse('No Assignmnet Found',400));

    } 


    const student  = await User.findOne({email: req.user.email })

    if(!student){
             
        return next(new ErrorResponse('No Student Found',400));
    } 


    const tempStudent = tempAssignment.Students.find( (std)=> {
       return std.student._id.toString() === student._id.toString()
    });

    if( !tempStudent){
        return next(new ErrorResponse('This Student was not assigned to this Assigmnet',400));
    }

    const studentImage = tempStudent.image


    const assignmentDetail  =  tempAssignment.assignment

    res.status(200).json({
        success: true,
        assignment: assignmentDetail,
        image: studentImage
      });





});

