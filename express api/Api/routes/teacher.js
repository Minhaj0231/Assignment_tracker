const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  teacherHandler = require('../controller/teacher');

const upload = require('../utils/file_upload')




router.post('/studentPhoto', upload.single('studentImage\n') ,teacherHandler.uploadStudentPhoto)


module.exports = router;