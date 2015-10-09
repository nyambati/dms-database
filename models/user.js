var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  UserSchema = new Schema({
    username: {
      type: String,
      unique: true
    },
    role: String,
    name: Object,
    email: {
      type: String,
      unique: true
    },
    password: String
  });

module.exports = mongoose.model('User', UserSchema);
