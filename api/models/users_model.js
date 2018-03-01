
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsersSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the user in order to continue'
  },
  last_name: {
    type: String,
    required: 'Enter the last name of the user in order to continue'
  },
  email: {
    type: String,
    required: 'Enter your email in order to continue'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Users', UsersSchema);
