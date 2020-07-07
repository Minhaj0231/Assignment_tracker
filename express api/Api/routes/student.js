const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  {is_authenticated, has_permission} = require('../middleware/authentication')


const  studentHandler = require('../controller/student');

router.put('/addReadingTime',is_authenticated, has_permission('Student'), studentHandler.addStudentReadingTime);

router.get('/assignmentDetail',is_authenticated, has_permission('Student'), studentHandler.assignmentDetail);

module.exports = router;