 var users = require('./data/users.json'),
   roles = require('./data/roles.json'),
   documents = require('./data/documents.json'),
   Doc = require('../models/document'),
   User = require('../models/user'),
   Role = require('../models/roles');

 module.exports = {
   user: function () {
     // Insert users into the db
     User.collection.insert(users, function (err, users) {
       if (err) {
         console.log('======================================');
         console.log(err.message.substring(7, 26).toUpperCase() + ': Users Already created');
       } else {
         console.log('======================================');
         console.log('Users Have been inserted');
       }
     });
   },

   roles: function () {
     // Insert role into the db
     Role.collection.insert(roles, function (err, roles) {
       if (err) {
         console.log('======================================');
         console.log(err.message.substring(7, 26).toUpperCase() + ': Roles Already created');
       } else {
         console.log('======================================');
         console.log('Roles have been inserted');
       }
     });
   },

   documents: function () {
     // Insert documents into the db
     var counter = 0,
       errCounter = 0;
     documents.forEach(function (doc) {
       Doc.create({
           ownerId: doc.ownerId,
           title: doc.title,
           content: doc.content,
           access: doc.access,
           dateCreated: doc.dateCreated
         },
         function (err, documents) {
           if (err) {
             errCounter++;
             if (errCounter === 4) {
               console.log('======================================');
               console.log(err.message.substring(7, 26).toUpperCase() + ': Documents Already created');
             }
           } else {
             counter++;
             if (counter === 4) {
               console.log('======================================');
               console.log('Documents have been inserted');
             }
           }
         });
     });
   }
 };
