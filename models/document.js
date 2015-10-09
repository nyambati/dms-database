var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  DocSchema = new Schema({
    ownerId: String,
    title: {
      type: String,
      unique: true
    },
    content: String,
    access:String,
    dateCreated: {
      type: Date
    },
    lastModified: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model('Documents', DocSchema);
