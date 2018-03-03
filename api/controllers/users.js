'use strict';


const mongoose = require('mongoose'),
      User = mongoose.model('Login');

exports.list_all_users = async (req, res) => {
  try{
    const users = await User.find( {} , (err, user) => {})
    res.json(users);
  } catch (e){
      res.send(e);
}
};

exports.crete_user = async (req, res) => {
  try{
    const user = new User(req.body);
    const result = await user.save((err, user) => {});
    res.json(user);
  }catch(e){
    res.send(e)
  }
};

exports.read_user = async (req, res, err) => {
  try{
    const user_id = req.params.userId;
    const result =  await User.findById( user_id, (err, user) => {
      if (!user)
        return res.status(400).json({error: 'El usuario no existe.'})
    });
    res.json(result);
    }catch(err){
      res.send(err);
    }
};


exports.update_user = async (req, res) => {
  try{
    const update = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, user) => {});
    res.json(update);
  }catch(err){
    res.send(err);
  }
};

exports.delete_user =  async (req, res) => {
  try{
    const deleteUser = User.remove({_id: req.params.userId }, (err, user) => {});
    res.json({ message: 'User successfully deleted' });
  }catch(e){
    res.send(e);
  }
};
