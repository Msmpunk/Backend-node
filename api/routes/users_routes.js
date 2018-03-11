'use strict';
// var router = require('express-promise-router')();
const express = require('express'),
      router = express.Router(),
      mdAuthToken = require('../middlewares/auth-token');


const usersController = require('../controllers/users');
const loginController = require('../controllers/login');


  // User Routes
router.get('/users', usersController.list_all_users);
// router.post('/users', mdAuthToken.authToken, usersController.crete_user);
router.post('/users',  usersController.crete_user);

router.put('/users/:userId',  mdAuthToken.authToken,usersController.update_user);
router.delete('/users/:userId', mdAuthToken.authToken,usersController.delete_user);

router.post('/login',loginController.login);
// router.post('/logout',loginController.logout);


// router.get('/users/:userId', usersController.read_user)



module.exports = router;
