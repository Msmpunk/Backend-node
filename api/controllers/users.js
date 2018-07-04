'use strict';
const mongoose = require('mongoose'),
      User = mongoose.model('Users'),
      bcrypt = require('bcrypt');

exports.list_all_users = async (req, res) => {
  try {
    const users = await User.find( {} , '_id name email last_name age telefon img role ');
    if (users) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error loading users'
      });
    }
    return res.status(200).json({
        ok: true,
        users: users,
    });
  } catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
};

exports.crete_user = async (req, res) => {
  try{
    const body = req.body;
    const user = new User({
      name: body.name,
      last_name: body.last_name,
      email: body.email,
      age: body.age,
      telefon: body.telefon,
      password: bcrypt.hashSync(body.password, 10),
      img: body.img,
      role: body.role
    });

    user.save((err, saveUser) => {

      if (err) {
        return res.status(400).json({
          ok: false,
          message: 'Error creating user',
          err: err.message
        });
      }

      res.status(201).json({
        ok: true,
        user: saveUser,
        userToken: req.user
      });

    });
  }catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
};


//
// exports.read_user = async (req, res, err) => {
//   try{
//     const user_id = req.params.userId;
//     const result =  await User.findById( user_id, (err, user) => {
//       if (!user)
//         return res.status(400).json({error: 'El usuario no existe.'})
//     });
//     res.json(result);
//     }catch(err){
//       res.send(err);
//     }
// };
//
//


exports.update_user = async (req, res) => {
  try{
    const id = req.params.userId;
    const body = req.body;

    const user = await User.findById( id )

    if (!user) {
      return res.status(400).json({
          ok: false,
          mensaje: 'The user with' + id + ' dosent exits',
          errors: { message: 'there is not user with that id' }
      });
    }

    user.name = body.name;
    user.email = body.email;
    user.role = body.role;

    user.save((err, saveUser) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: 'Error updating the user',
          error: err
        });
      }
      saveUser.password = ':)';

      res.status(200).json({
      ok: true,
      user: saveUser
      });
    })
  }catch(err){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
};


//
exports.delete_user =  async (req, res) => {
  try{

    const user = await User.findByIdAndRemove({_id: req.params.userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        mensaje: 'There is no user for that id',
        errors: { message: 'Sorry we dont have that user' }
      });
    }

    res.status(200).json({
      ok: true,
      usuario: user
    });

  }catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
};
