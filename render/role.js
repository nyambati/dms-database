var Table = require('cli-table');

module.exports = function(roles) {
  var table = new Table({
    head: [
      'RoleId', 'Title','created At'
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
    colWidths: [50, 30,50]
  });
  if (roles._id === undefined) {
    for (var key in roles) {
      var role = roles[key];
      table.push(
        [
          role._id,
          role.title,
          role.createdAt
        ]
      );
    }
  } else {
    table.push([
      roles._id,
      roles.title,
      roles.createdAt

    ]);
  }

  console.log(table.toString());
};
