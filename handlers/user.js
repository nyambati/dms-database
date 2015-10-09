var User = require('../models/user'),
  Doc = require('../models/document'),
  bcrypt = require('bcrypt-nodejs'),
  userHandler = {

    createUser: function(req, res) {
      if (req === undefined) {
        res('please provide  user data');
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
          res(err, null);
        res(null, users);
      });
    },

    // Gets all users
    getAllUsers: function(limit, res) {
      User.find({}, function(err, users) {
        if (err) {
          res(err);
        }
        res(users);
      }).limit(limit);
    },
  };

module.exports = userHandler;
