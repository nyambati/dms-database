var prompts;
(function() {
  'use strict';

  prompts = [{
      type: 'input',
      name: 'username',
      message: 'Enter your username: ',
      default: 'admin'
    }, {
      type: 'input',
      name: 'firstname',
      message: 'Enter your first name: ',
      default: 'admin'
    },

    {
      type: 'input',
      name: 'lastname',
      message: 'Enter your last name: ',
      default: 'docManager'
    }, {
      type: "checkbox",
      message: "Choose your role: ",
      name: "role",
      choices: [{
        name: "admin",
        checked: true
      },
      {
        name: "User"
      }, {
        name: "public"
      }, ],
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your e-mail address: ',
      default: 'admin@docManager.com'
    },
     {
      type: 'password',
      name: 'password',
      message: 'Enter your Password: ',
      default: 'admin'
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure of your input ?'
    }
  ];

})();
module.exports = prompts;
