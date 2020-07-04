const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  {is_authenticated} = require('../middleware/authentication')


const  studentHandler = require('../controller/student');

router.put('/addReadingTime', studentHandler.addStudentReadingTime);

module.exports = router;