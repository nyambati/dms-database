#!/usr/bin/env node

// connect to mongodb database
var mongoose = require('mongoose'),
  inquirer = require('inquirer'),
  renderUser = require('./render/user'),
  renderDocs = require('./render/document'),
  renderRole = require('./render/role'),
  db = 'mongodb://localhost/documents',
  userPrompt = require('./prompts/create-user'),
  documentPropmt = require('./prompts/create-document'),
  rolePrompt = require('./prompts/create-role'),
  seed = require('./seed'),
  args = process.argv.slice(2),
  command = args[0];

// require handlers
var userHandler = require('./handlers/user'),
  docHandler = require('./handlers/document'),
  roleHandler = require('./handlers/role');

var conn = mongoose.connect(db);

switch (command) {
  // User commands

case 'init':
  if (conn) {
    seed.user();
    seed.roles();
    seed.documents();
  }

  setTimeout(function () {
    process.exit();
  }, 500);

  break;
  //  creates users
case 'cru':
  inquirer.prompt(userPrompt, function (responses) {
    //  check if the user cancelled the input
    if (responses.confirm === false) {
      console.log('Exit command recieved Exiting........');
      process.exit(1);
    }

    userHandler.createUser(responses, function (err, users) {
      if (err) {
        console.log('===========================================================================');
        console.log("YOUR EMAIL AND USERNAME ALREADY EXIST PLEASE CHANGE CHANGE AND TRY AGAIN");
        console.log('===========================================================================');
        process.exit();
      } else {
        renderUser(users);
        process.exit();
      }
    });
  });

  break;
case 'gau':
  userHandler.getAllUsers(args[1], function (users) {
    renderUser(users);
    process.exit();
  });
  break;

  // document comands
case 'crd':
  inquirer.prompt(documentPropmt, function (responses) {
    // if the user cancels the input exit the commanline processd
    if (responses.confirm === false) {
      console.log('Exit command recieved Exiting........');
      process.exit(1);
    }

    docHandler.createDocument(responses, function (err, docs) {
      if (err) {
        console.log('===========================================================================');
        console.log('THE TITLE HAS ALREADY BEEN USED PLEASE CHANGE IT AND TRY AGAIN');
        console.log('===========================================================================');
        process.exit();
      } else {
        // render the result to the comandline.
        renderDocs(docs);
        process.exit();
      }
    });
  });
  break;

  // Get all Documents with limit of 10
case 'gad':
  docHandler.getAllDocuments(args[1], function (docs) {
    // render the result to the comandline.
    renderDocs(docs);
    process.exit();
  });
  break;

case 'gbd':
  docHandler.getAllDocumentsByDate(args[1], args[2], function (docs) {
    // render the result to the comandline.
    renderDocs(docs);
    process.exit();
  });
  break;

case 'gdr':
  docHandler.getAllDocumentsByRole(args[1], args[2], function (docs) {
    // render the result to the comandline.
    renderDocs(docs);
    process.exit();
  });
  break;

  // role command
case 'crole':
  inquirer.prompt(rolePrompt, function (responses) {

    // check if the user cancelled the input
    if (responses.confirm === false) {
      console.log('Exit command recieved Exiting........');
      process.exit(1);
    }

    roleHandler.createRole(responses, function (err, role) {
      if (err) {
        console.log('===========================================================================');
        console.log("THAT ROLE HAS ALREADY BEEN CREATED CHANGE AND TRY AGAIN");
        console.log('===========================================================================');
        process.exit();
      } else {
        // render the result to the comandline.
        renderRole(role);
        process.exit();
      }
    });
  });
  break;

case 'gar':
  // query the database and get all roles
  roleHandler.getAllRoles(args[1], function (err, roles) {
    if (!roles) {
      console.log('===========================================================================');
      console.log("DATA RETRIVAL FAILED, ENSURE YOU PASS IN THE RIGHT COMMANDS");
      console.log('===========================================================================');
      process.exit();
    } else {
      // render the result to the comandline.
      renderRole(roles);
      process.exit();
    }
  });
  break;

default:
  console.log('~/manager: command %s not found', command);
  process.exit(1);
}
