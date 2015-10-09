var Table = require('cli-table'),
  moment = require('moment');
module.exports = function(docs) {
  var table = new Table({
    head: [
      'Document Id', 'Title', 'Content', 'Acces Rights','Date Created', 'Date Modified'
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
    colWidths: [30, 50, 90, 13, 20, 20]
  });
  if (docs._id === undefined) {
    for (var key in docs) {
      var doc = docs[key];
      table.push(
        [
          doc._id,
          doc.title,
          doc.content,
          doc.access,
          moment(doc.dateCreated).format('YYYY MM DD'),
          moment(doc.lastModified).format('YYYY MM DD')
        ]
      );
    }
  } else {
    table.push(
      [
        docs._id,
        docs.title,
        docs.content,
        docs.access,
        moment(docs.dateCreated).format('YYYY MM DD'),
        moment(docs.lastModified).format('YYYY MM DD')
      ]
    );
  }

  console.log(table.toString());
};
