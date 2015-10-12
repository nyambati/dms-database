var Role = require('../models/roles'),
  roleHandler = {
    // create roles
    createRole: function(req, cb) {
      if (req === undefined) {
        cb("Please provide data");
      } else {
        Role.create({
          title: req.title,
        }, function(err, role) {
          if (err)
            cb(err, null);
          else
            cb(null, role);
        });
      }
    },
    //  Get all roles from the database
    getAllRoles: function(limit,cb) {
      Role.find({}, function(err, roles) {
        if (err) {
          cb(err, null);
        }
        cb(null, roles);
      }).limit(limit);
    }
  };

module.exports = roleHandler;
