// DOCUMENT HANDLER
// handles all the document crud operations

var Doc = require('../models/document'),
  docHandler = {

    // Create a new document
    createDocument: function(req, res) {
      if (req === undefined) {
        return res({
          isCreated: false,
          message: 'please provide  user data'
        });
      } else {
        Doc.create({
          ownerId: req.userId,
          title: req.title,
          content: req.content,
          access: req.access,
          dateCreated: new Date(req.date)
        }, function(err, doc) {
          if (err)
            res(err, null);
          if (!doc)
            res('Document not created');
          else
            res(null, doc);
        });
      }
    },

    //  Get all the documents with a limit is specified
    getAllDocuments: function(limit, res) {
      Doc.find({}, null, {
        sort: '-dateCreated'
      }, function(err, docs) {
        if (err) {
          res(err);
        } else {
          res(docs);
        }
      });
    },

    // Gets all documents by date
    getAllDocumentsByDate: function(date, limit, res) {
      Doc.find({
        dateCreated: new Date(date)
      }, function(err, docs) {
        if (err) {
          res(err);
        }
        res(docs);
      });
    },

    // Get all documents by role
    getAllDocumentsByRole: function(role, limit, res) {
      Doc.find({
        access: role
      }, function(err, docs) {
        if (err) {
          res(err);
        } else {
          res(docs);
        }
      });
    }
  };

module.exports = docHandler;
