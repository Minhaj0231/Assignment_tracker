const { validationResult } = require('express-validator');
const User = require('../models/user');

const asyncHandler = require('../middleware/async');


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

// asyncHandler(async (req,res,next) =>{

// } )


exports.register =  asyncHandler(async (req,res,next) =>{
    console.log(req.body)

    const {  email, password, role } = req.body;

    const user = await User.create({
        email,
        password,
        role
      });

      res.status(200).json({
        success: true,
        data: "done"
      });


} )