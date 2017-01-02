var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userModel = new Schema({
    email: {type: String},
    password: {type: String},
});

module.exports = mongoose.model('User', userModel);
