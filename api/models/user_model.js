
'use strict';
const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var UsersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Enter the name of the user in order to continue']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is necesary']
  },
  password: {
    type: String,
    required: [true, 'Password is necesary']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
  // google: {
  //   type: Boolean,
  //   required: true,
  //   default: false
  // },
});
UsersSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })
module.exports = mongoose.model('Users', UsersSchema);
