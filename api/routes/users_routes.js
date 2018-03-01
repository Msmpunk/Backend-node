'use strict';
// var router = require('express-promise-router')();
const express = require('express'),
      router = express.Router();


const usersController = require('../controllers/users');

  // User Routes
router.get('/users', usersController.list_all_users);
router.post('/users',usersController.crete_user);


router.get('/users/:userId', usersController.read_user)
router.put('/users/:userId', usersController.update_user)
router.delete('/users/:userId',usersController.delete_user);


module.exports = router;
