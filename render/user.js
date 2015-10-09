var Table = require('cli-table');

module.exports = function(users) {
  var table = new Table({
    head: [
      'userId', 'Full Names', 'username', 'Role','email', 'password'
    ],
    chars: {
      'top': '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      'bottom': '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      'left': '║',
      'left-mid': '╟',
      'mid': '─',
      'mid-mid': '┼',
      'right': '║',
      'right-mid': '╢',
      'middle': '│'
    },

    style: {
      'padding-left': 0,
      'padding-right': 0
    },
    colWidths: [30, 50, 30,10, 50, 70]
  });
  if (users._id === undefined) {
    for (var key in users) {
      var user = users[key];
      table.push(
        [
          user._id,
          user.name.first + " " + user.name.last,
          user.username,
          user.role,
          user.email,
          user.password
        ]
      );
    }
  } else {
    table.push([
      users._id,
      users.name.first + " " + users.name.last,
      users.username,
      users.role,
      users.email,
      users.password
    ]);
  }

  console.log(table.toString());
};
