const express = require('express');
const router = express.Router();

const  authHandler = require('../controller/auth');

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.body)
  res.status(201).json({
    success: true,
    msg : "this is a message"
  })
});

router.get('/add', authHandler.register);

module.exports = router;
