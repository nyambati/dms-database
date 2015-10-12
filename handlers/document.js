// DOCUMENT HANDLER
// handles all the document crud operations

var Doc = require('../models/document'),
  docHandler = {

    // Create a new document
    createDocument: function(req, cb) {
      if (req === undefined) {
        return cb({
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
            cb(err, null);
          if (!doc)
            cb('Document not created');
          else
            cb(null, doc);
        });
      }
    },

    //  Get all the documents with a limit is specified
    getAllDocuments: function(limit, cb) {
      Doc.find({}, null, {
        sort: '-dateCreated'
      }, function(err, docs) {
        if (err) {
          cb(err);
        } else {
          cb(docs);
        }
      });
    },

    // Gets all documents by date
    getAllDocumentsByDate: function(date, limit, cb) {
      Doc.find({
        dateCreated: new Date(date)
      }, function(err, docs) {
        if (err) {
          cb(err);
        }
        cb(docs);
      });
    },

    // Get all documents by role
    getAllDocumentsByRole: function(role, limit, cb) {
      Doc.find({
        access: role
      }, function(err, docs) {
        if (err) {
          cb(err);
        } else {
          cb(docs);
        }
      });
    }
  };

module.exports = docHandler;
