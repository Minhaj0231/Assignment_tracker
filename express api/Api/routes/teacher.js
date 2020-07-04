const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  teacherHandler = require('../controller/teacher');

const upload = require('../utils/file_upload')


const  {is_authenticated} = require('../middleware/authentication')


router.post('/addStudent', upload.single('studentImage\n') ,teacherHandler.addStudentToAssignmets);
router.post('/addAssigment', is_authenticated, teacherHandler.addAssignment)


router.delete('/deleteAssignment',is_authenticated,  teacherHandler.deleteAssignment)

module.exports = router;