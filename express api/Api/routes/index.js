const express = require('express');
const router = express.Router();

const  {is_authenticated} = require('../middleware/authentication')

const  authHandler = require('../controller/auth');

/* GET home page. */
router.get('/', is_authenticated, function(req, res, next) {

  
  res.status(201).json({
    success: true,
    msg : "this is a message"
  })
});




module.exports = router;
