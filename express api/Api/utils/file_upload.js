const multer = require('multer');
const ErrorResponse = require('./errorResponse');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/'));
    },
    filename: (req, file, cb) => {
        let  filetype = '';
        
        

          if(file.mimetype === 'image/png') {
            filetype = 'png';
          }
          else if(file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
          }
          else {
            return next(new ErrorResponse('Invalid File format',415))
          }

          cb(null, 'image-' + Date.now() + '.' + filetype);
    },

})

const upload = multer({storage: storage});

module.exports = upload;