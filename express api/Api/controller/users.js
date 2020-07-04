const { validationResult } = require('express-validator');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User');
const  Assignment = require('../models/Assignment');

// @desc      returns users all assignments, both for teacher and students
// @route     POST /api/v1/student/addReadingTime
// @access    student, teacher

exports.usersAssignmnets = asyncHandler(async(req, res, next) => {

    const user  = await User.findOne({email: req.user.email})
        
    
    let data = user.assignments;
    let assignments_data = []

    

    for( let i = 0;i< data.length;i++ ){
      
        const TempAssignment = await Assignment.findById(data[i].assignment);


       
        let tempObj = {
            assignmentId: TempAssignment._id,
            assignmentTitle:TempAssignment.title,
            assignmentEndTime:TempAssignment.end_date,
            assignmentProvider:TempAssignment.teacher,
        }
        assignments_data.push(tempObj)

    }
      

        
        res.status(200).json({
            success: true,
            data: assignments_data
           
    })

});
     