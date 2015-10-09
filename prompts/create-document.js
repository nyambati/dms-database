var prompts;
(function() {
  prompts = [{
    type: 'input',
    name: 'userId',
    message: 'Enter your id: ',
    default: '56122e08725f6bce0b2833e4'
  }, {
    type: 'input',
    name: 'title',
    message: 'Enter the doccument title: ',
    default: 'The Penguis of Madagascar'
  }, {
    type: 'input',
    name: 'content',
    message: "your content goes here...: ",
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }, {
    type: 'input',
    name: 'date',
    message: "Enter Current date (year-month-day)",
    default: "2015-10-6"
  }, {
    type: 'input',
    name: 'access',
    message: 'Who should access your  document',
    default: 'public'
  }, {
    type: 'confirm',
    name: 'confirm',
    message: 'Are you sure of your input ?'
  }];
})();
module.exports = prompts;
