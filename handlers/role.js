var Role = require('../models/roles'),
  roleHandler = {
    // create roles
    createRole: function(req, res) {
      if (req === undefined) {
        res("Please provide data");
      } else {
        Role.create({
          title: req.title,
        }, function(err, role) {
          if (err)
            res(err, null);
          else
            res(null, role);
        });
      }
    },
    //  Get all roles from the datase
    getAllRoles: function(limit,res) {
      Role.find({}, function(err, roles) {
        if (err) {
          res(err, null);
        }
        res(null, roles);
      }).limit(limit);
    }
  };

module.exports = roleHandler;
