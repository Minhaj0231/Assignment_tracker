const fs =  require('fs'); 
const path = require('path');
const ErrorResponse = require('./errorResponse');



 const deleTeFile = fileName  =>{
    fs.unlink( path.join(__dirname, `../public/images/${fileName}`), err => {
        return new ErrorResponse('File NOt deleted ',400);
    });

 }


 module.exports =  deleTeFile;