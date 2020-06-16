const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  authHandler = require('../controller/auth');

router.post('/signup',[check('email').isEmail().withMessage("Not a email"),
    check('password').isLength({min: 4}).trim().withMessage("Not a valid Password"),
    

],authHandler.register);

router.post('/login', authHandler.login);


module.exports = router;
