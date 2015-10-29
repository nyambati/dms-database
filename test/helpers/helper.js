(function() {

  'use strict';

  module.exports = {
    isUnique: {
      email: function(users) {
        var email = [];
        // loop through the array and get all the emails
        for (var key in users) {
          email.push(users[key].email);
        }

        // check if they are unique
        if (email.length === 1) {
          return true;
        }
        var unique = false;

        // if the email array is more than one
        for (var i = 0; i < email.length - 1; i++) {
          if (email[i] !== email[i + 1]) {
            unique = true;
          } else {
            unique = false;
          }
        }
        return unique;
      },

      //   check if the usernames are unique
      username: function(users) {
        var username = [];
        // loop through the array and get all the usernames
        for (var key in users) {
          username.push(users[key].username);
        }

        // check if they are unique
        if (username.length === 1) {
          return true;
        }
        // if the username array is more than one
        var unique = false;
        for (var i = 0; i < username.length - 1; i++) {
          if (username[i] !== username[i + 1]) {
            unique = true;
          } else {
            unique = false;
          }
        }
        return unique;
      },

      // chekc if the roles created have a unique title.
      roleTitle: function(roles) {
        var titles = [];
        for (var key in roles) {
          titles.push(roles[key].title);
        }

        if (titles.length == 1) {
          return true;
        } else {
          var unique = false;
          for (var i = 0; i < titles.length - 1; i++) {
            if (titles[i] !== titles[i + 1]) {
              unique = true;
            } else {
              unique = false;
            }
          }
          return unique;
        }
      },

      // is unique document title
      docTitle: function(docs) {
        var titles = [];
        for (var key in docs) {
          titles.push(docs[key].title);
        }

        if (titles.length == 1) {
          return true;
        } else {
          var unique = false;

          for (var i = 0; i < titles.length - 1; i++) {
            if (titles[i] !== titles[i + 1]) {
              unique = true;
            } else {
              unique = false;
            }
          }
          return unique;
        }
      }

    },

    // chekc if the user role are defined
    isDefined: function(users) {
      var unique = false;
      for (var key in users) {
        if (users[key].role) {
          unique = true;
        } else {
          unique = false;
        }
      }
      return unique;
    },

    hasFirstName: function(users) {
      var unique;
      for (var key in users) {
        if (users[key].name.first) {
          unique = true;
        } else {
          unique = false;
        }
      }
      return unique;
    },

    hasLastName: function(users) {
      var unique;
      for (var key in users) {
        if (users[key].name.last) {
          unique = true;
        } else {
          unique = false;
        }
      }
      return unique;
    },

    hasOwner: function(docs) {
      var unique = false;
      for (var key in docs) {
        if (docs[key].ownerId) {
          unique = true;
        } else {
          unique = false;
        }
      }
      return unique;
    },

    // Check if the documents have date created
    hasDateCreated: function(docs) {
      var unique = false;
      for (var key in docs) {
        if (docs[key].dateCreated) {
          unique = true;
        } else {
          unique = false;
        }
      }
      return unique;
    },

    // checks if the the  documents retrived are ordered.
    ordered: function(docs) {
      var dates = [];
      for (var key in docs) {
        dates.push(docs[key].dateCreated);
      }
      var ordered = false;

      for (var i = 0; i < dates.length - 1; i++) {
        if (+dates[i] > +dates[i + 1] || +dates[i] === +dates[i + 1]) {
          ordered = true;
        } else {
          ordered = false;
        }
      }
      return ordered;
    },

    //  check if the documenst fetched are of the same Date
    isByDate: function(docs) {
      var dates = [];
      for (var key in docs) {
        dates.push(docs[key].dateCreated);
      }
      var isDate = false;
      if (dates.length === 1) {
        return true;
      } else {
        for (var i = 0; i < dates.length - 1; i++) {
          if (+dates[i] === +dates[i + 1]) {
            isDate = true;
          } else {
            isDate = false;
          }
        }
        return isDate;
      }
    },
    //  chekc if the documenst fetched are of the same
    isOfSameRole: function(docs) {
      var role = [];
      for (var key in docs) {
        role.push(docs[key].access);
      }
      var isRole = false;

      for (var i = 0; i < role.length - 1; i++) {
        if (role[i] == role[i + 1]) {
          isRole = true;
        } else {
          isRole = false;
        }
      }
      return isRole;
    }

  };
})();
