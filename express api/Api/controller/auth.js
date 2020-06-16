const { validationResult } = require('express-validator');
const User = require('../models/User');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

// asyncHandler(async (req,res,next) =>{

// } )

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register =  asyncHandler(async (req,res,next) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next(new ErrorResponse('Invalid Inputs',400))
  }
    const {  email, password, role } = req.body;

    const user = await User.create({
        email,
        password,
        role
      });

      res.status(200).json({
        success: true,

      });

} );



// @desc      login user
// @route     POST /api/v1/auth/register
// @access    Public
exports.login =  asyncHandler(async (req,res,next) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return next(new ErrorResponse('Invalid Inputs',400))
  }
    const {  email, password } = req.body;

    


    // Validate emil & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }


    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }



    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    });


} );