const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const  {is_authenticated} = require('../middleware/authentication')


const  userHandler = require('../controller/users');

router.get('/usersAssignments', is_authenticated, userHandler.usersAssignmnets);

module.exports = router;