var prompts;

(function() {
  'use strict';

  prompts = [{
    type: 'input',
    name: 'title',
    message: 'Enter your Your Role: ',
    default: 'Owner'
  }, {
    type: 'confirm',
    name: 'confirm',
    message: 'Are you sure of your input ?'
  }];

})();

module.exports = prompts;
