'use strict';
const mongoose = require('mongoose'),
      User = mongoose.model('Users'),
      bcrypt = require('bcrypt');

exports.list_all_users = async (req, res) => {
  console.log("Peticion Realizada[--->]")
  try{
    const users = await User.find( {} , '_id name email last_name age telefon img role ')
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error loading users',
          errors: err.message
        });
      }
      return res.status(200).json({
          ok: true,
          users: user,
      });

    });
    return users
  } catch(e){
    return res.status(500).json({
        ok: false,
        mensaje: 'There was an error, please try again later',
    });
    }
};

exports.crete_user = async (req, res) => {
  console.log("Peticion Realizada[--->]")
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
    console.log(req.body)
    // const user = new User(req.body);
    console.log(user.password)
    const result = await user.save((err, saveUser) => {

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
    return result
  }catch(e){
    return res.status(500).json({
        ok: false,
        message: 'There was an error, please try again later',
    });
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
  console.log("Peticion Realizada[--->]")
  try{

    const id = req.params.userId,
          body = req.body;

    const result = await User.findById( id , (err,user) => {

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
    })
    return result;


  }catch(err){
    return res.status(500).json({
        ok: false,
        mensaje: 'There was an error, please try again later',
    });
  }
};


//
exports.delete_user =  async (req, res) => {
  console.log("Peticion Realizada[--->]")
  try{

    const deleteUser = User.findByIdAndRemove({_id: req.params.userId }, (err, user) => {
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
    });

  }catch(e){
    return res.status(500).json({
      ok: false,
      mensaje: 'Error deleting the user',
      errors: err
    });
  }
};
