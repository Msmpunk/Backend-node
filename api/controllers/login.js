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

    const result = await User.findOne({ email: body.email }, (err , user) => {

      if (err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });
      }

      if(!user){
        return res.status(400).json({
          ok: false,
          message: 'Credentials invalid - email',
          err: err
        });
      }

      if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Credenciales incorrectas - password',
              err: err
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

    })
    return result;

  }catch(e){
    return res.status(500).json({error: 'There is a problem in the server'})
  }
};
