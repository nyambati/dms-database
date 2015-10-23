var User = require('../models/user'),
  Doc = require('../models/document'),
  bcrypt = require('bcrypt-nodejs'),
  userHandler = {

    createUser: function(req, cb) {
      if (req === undefined) {
        cb('please provide  user data');
      }
      // Hash the password before we store it into the database
      var hash = bcrypt.hashSync(req.password);
      User.create({
        username: req.username,
        role: req.role,
        name: {
          first: req.firstname,
          last: req.lastname
        },
        email: req.email,
        password: hash
      }, function(err, users) {
        if (err)
          cb(err, null);
        cb(null, users);
      });
    },

    // Gets all users
    getAllUsers: function(limit, cb) {
      User.find({}, function(err, users) {
        if (err) {
          cb(err);
        }
        cb(users);
      }).limit(limit);
    },

    deleteUser: function(id, cb) {
      User.remove({
        _id: id
      }, function(err, ok) {
        if (err) {
          cd(err);
        }
        cb(null, ok);
      });
    },
  };

module.exports = userHandler;
