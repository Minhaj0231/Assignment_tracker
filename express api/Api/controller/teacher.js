const { validationResult } = require('express-validator');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')


// @desc      Upload studets image 
// @route     POST /api/v1/auth/register
// @access    Teacher
exports.uploadStudentPhoto = asyncHandler(async (req,res,next) =>{

   
    
    if(!req.file) {
        return next(new ErrorResponse('No file found',500))
    }
    console.log(req.file.mimetype)
    res.status(200).json({
        success: true
      });


 } );
    