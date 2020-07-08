const { validationResult } = require('express-validator');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User');
const  Assignment = require('../models/Assignment');
const deleTeFile = require('../utils/fileDelete');




// @desc      Create new Assignment
// @route     POST /api/v1/teacher/addStudent
// @access    Teacher
 exports.addAssignment = asyncHandler(async (req, res,next) => {
    const {title, assignment, end_date } = req.body;
        
    const assignmentObj = await Assignment.create({    
        title: title,       
        assignment: assignment,
        end_date:  end_date,
        teacher: req.user.email
    })



    
    const teacher  = await User.findOne({email: req.user.email})

    teacher.assignments.push({
        assignment: assignmentObj
    })

    
    doc = await teacher.save();

    res.status(200).json({
        success: true
           
    })

 });



 // @desc      add student to  assignments
// @route     POST /api/v1/teacher/addStudent
// @access    Teacher
exports.addStudentToAssignmets = asyncHandler(async (req,res,next) =>{
   
     
    if(!req.file) {

       
         
        return next(new ErrorResponse('No file found',500))
    }
    
    const assignment = await Assignment.findById(req.body.assignmentId)

    if(!assignment){

        // delete the saved imaged   
        deleTeFile(req.file.filename);

        return next(new ErrorResponse('No Assignmnet Found',400));
    } 
    
    const student  = await User.findOne({email: req.body.studentEmail})

    if(!student){
       
        deleTeFile(req.file.filename);
        return next(new ErrorResponse('No Student Found',400));
    } 
    
    // Checking if the student already exists to this assignmnet 
    let prevStudent =  assignment.Students.filter( (std) => {                   
        return std.student._id.toString() === student._id.toString()
    })

    // if student already  exists  then return eror 
    if( prevStudent.length > 0 ){
        deleTeFile(req.file.filename);
        return next(new ErrorResponse('This Student Already assigned to this Assignment ',400));
    }

    assignment.Students.push({
        student: student,
        image: req.file.filename,
        readingTime: 0
    })
    assignment.save()

    student.assignments.push({
        assignment: assignment
    })
    doc  = await student.save()


    res.status(200).json({
        success: true
      });

    
    

 } );


 // @desc      Delete perticular assignmet and additional  information related to it.
// @route     DELETE /api/v1/teacher/deleteAssignment
// @access    Teacher

exports.deleteAssignment = asyncHandler(async(req, res, next) => {

    const {assignmentId } = req.body;
        
    const assignment = await Assignment.findById(req.body.assignmentId)

    if(!assignment){

        return next(new ErrorResponse('No Assignmnet Found',400));
    } 


    let  teacher =  await User.findOne({email: req.user.email})

    if(!teacher){
        
        return next(new ErrorResponse('No Teacher Found',400));
    } 

    let TeacherTempAssignment =  teacher.assignments.find( (usr)=> {
        return usr.assignment.toString() === assignmentId.toString()
     });
 
    

    teacher.assignments.pull({_id: TeacherTempAssignment._id });
    teacher.save();

    let students = assignment.Students;
   
    for( let i = 0;i<students.length;i++ ){
        try{
            deleTeFile(students[i].image)
         
            const tempStudent = await User.findById(students[i].student);

            let StudentTempAssignment =  tempStudent.assignments.find( (usr)=> {
                return usr.assignment.toString() === assignmentId.toString()
             });
         

            tempStudent.assignments.pull({ _id: StudentTempAssignment._id });
         
            tempStudent.save();

            
        } 
        catch(err){
         
        } 
    
    }



     await assignment.remove()
        
        
        
    res.status(200).json({
        success: true
           
    })

});




// @desc       returns assignment detail 
 // @route     POST /api/v1/teacher/assignmentDetail
 // @access    Teacher
 
 exports.assignmentDetail = asyncHandler(async(req, res, next) => {

    const {assignmentId} = req.body;

    const tempAssignment = await Assignment.findById(assignmentId);

    if(!tempAssignment){ 

        return next(new ErrorResponse('No Assignmnet Found',400));
    } 

    const assignmentDetail  =  tempAssignment.assignment
    const students = tempAssignment.Students

    res.status(200).json({
        success: true,
        assignment: assignmentDetail,
        students: students

      });





});

     