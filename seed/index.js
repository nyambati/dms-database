 var json = require('json-file'),
   Doc = require('../models/document'),
   User = require('../models/user'),
   Role = require('../models/roles');

 module.exports = {
   user: function() {
     var users;

     // Read users
     users = json.read('./data/users.json');

     // Insert users into the db
     User.collection.insert(users.data, function(err, users) {
       if (err) {
         console.log('======================================');
         console.log(err.message.substring(7, 26).toUpperCase() + ': Users Already created');
       } else {
         console.log('======================================');
         console.log('Users Have been inserted');
       }
     });
   },

   roles: function() {
     var roles;

     // Read roles
     roles = json.read('./data/roles.json');
     // Insert role into the db
     Role.collection.insert(roles.data, function(err, roles) {
       if (err) {
         console.log('======================================');
         console.log(err.message.substring(7, 26).toUpperCase() + ': Roles Already created');
       } else {
         console.log('======================================');
         console.log('Roles have been inserted');
       }
     });
   },

   documents: function() {
     var documents;

     // Read documents
     documents = json.read('./data/documents.json');
     // Insert documents into the db
     documents.data.forEach(function(doc) {
       Doc.create({
        ownerId: doc.ownerId,
        title: doc.title,
        content: doc.content,
        access: doc.access,
        dateCreated: doc.dateCreated
      },
      function(err, documents) {
       if (err) {
         console.log('======================================');
         console.log(err.message.substring(7, 26).toUpperCase() + ': Users Already created');
       } else {
         console.log('======================================');
         console.log('Documents have been inserted');
       }
     });
     });
   }
 };
