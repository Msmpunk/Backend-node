// 'use strict';
//
const mongoose = require('mongoose'),
      User = mongoose.model('Users'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      SEED = require('../config/config').SEED;
//
//
exports.login = async (req, res) => {
  try{
    const body = req.body;

    const user = await User.findOne({ email: body.email })

    if(!user){
      return res.status(400).json({
        ok: false,
        message: 'Invalid credentials - email'
      });
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Invalid credentials - password'
      });
    }

    user.password = ':)';

    var token = jwt.sign({ user:user} , SEED , {expiresIn:14400});

    res.status(400).json({
      ok: true,
      user: user,
      token: token,
      id: user._id,
    });
  }catch(e){
    return res.status(500).json({error: 'There is a problem in the server'})
  }
};
