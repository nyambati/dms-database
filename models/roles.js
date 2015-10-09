var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  RoleSchema = new Schema({
    title: {
      type: String,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
module.exports = mongoose.model('Role', RoleSchema);
