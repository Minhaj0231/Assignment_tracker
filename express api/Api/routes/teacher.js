const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  teacherHandler = require('../controller/teacher');

const upload = require('../utils/file_upload')


const  {is_authenticated,has_permission} = require('../middleware/authentication')


router.post('/addStudent',is_authenticated, has_permission('Teacher'), upload.single('studentImage\n') ,teacherHandler.addStudentToAssignmets);
router.post('/addAssigment', is_authenticated, has_permission('Teacher'), teacherHandler.addAssignment)
router.delete('/deleteAssignment',is_authenticated, has_permission('Teacher'),  teacherHandler.deleteAssignment)
router.get('/assignmentDetail',is_authenticated, has_permission('Teacher'), teacherHandler.assignmentDetail);

module.exports = router;