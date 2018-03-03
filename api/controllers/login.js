'use strict';

const mongoose = require('mongoose'),
      Login = mongoose.model('Login'),
      bcrypt = require('bcrypt');


exports.login = async (req, res) => {
  try{

    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }

    const userData = {
      
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      }

    const result = await Login.create(userData, (err, user) => {});

    return res.status(200).json({message: 'El usuario se ha  registrado.'});

  }catch(e){
    return res.status(500).json({error: 'Ocurrio un error.'})
  }
};

exports.logout = async (req, res) => {
  try{
    if (req.session) {
      const resultado = await req.session.destroy((err) => {});
      return res.redirect('/');
    }
  }catch(e){
    return res.status(500).json({error: 'Ocurrio un error.'})
  }
};
//
// router.get('/logout', function(req, res, next) {
//   if(err) {
//     return next(err);
//   } else {
//   }
// });
