var mongoose = require('mongoose'),
  db = 'mongodb://localhost/documents',
  userHandler = require('../handlers/user'),
  docHandler = require('../handlers/document'),
  roleHandler = require('../handlers/role'),
  //require helpers
  check = require('./helpers/helper');
// require db
mongoose.connect(db);
// TESTS
(function() {
  'use strict';

  describe('Document managemnet  system test', function() {
    var users, roles, docs, docByDate, limit = 0;

    // USER TEST SUITE

    describe("User", function() {
      // get the user data.
      beforeEach(function(done) {
        userHandler.getAllUsers(limit, function(allUsers) {
          users = allUsers;
          done();
        });
      });

      // test the data retrived

      it('should return unique username and password', function() {
        expect(check.isUnique.email(users)).toBeTruthy();
        expect(check.isUnique.username(users)).toBeTruthy();
      });

      it('should return all data when getAll users is called', function() {
        expect(users.length).toBeGreaterThan(0);
      });

      it('each user should have a role defined', function() {
        expect(check.isDefined).toBeTruthy();
      });

      it('First name and last names should be created', function() {
        expect(check.hasFirstName(users)).toBeTruthy();
        expect(check.hasLastName(users)).toBeTruthy();
      });

    });

    // ROLE TEST SUITE
    describe('Roles', function() {
      beforeEach(function(done) {
        roleHandler.getAllRoles(limit, function(err, allRoles) {
          roles = allRoles;
          done();
        });
      });

      it("the roles should have unique titles", function() {
        expect(check.isUnique.roleTitle(roles)).toBeTruthy();
      });

      it('should return all roles when getAllRoles is called', function() {
        expect(roles.length).toBeGreaterThan(0);
      });
    });

    // DOCUMENTS TEST SUITE
    describe('Documents', function() {
      beforeEach(function(done) {
        docHandler.getAllDocuments(2, function(allDocs) {
          docs = allDocs;
          done();
        });
      });

      it("Each documents should have unique titles", function() {
        expect(check.isUnique.docTitle(docs)).toBeTruthy();
      });

      it('Each document should have a owner', function() {
        expect(check.hasOwner(docs)).toBeTruthy();
      });

      it('Each document has dateCreated', function() {
        expect(check.hasDateCreated(docs)).toBeTruthy();
      });

      it('should return documents of specified limit', function() {
        limit = 2;
        expect(docs.length).toBe(2);
      });

      it('should return all docs when getAlldocuments is called', function() {
        expect(docs.length).toBeGreaterThan(0);
      });

      it('should return documents starting with the recent one', function() {
        expect(check.ordered(docs)).toBeTruthy();
      });

    });

    // ROLE TEST SUITE
    describe('Roles', function() {
      describe('Get documents by  date', function() {
        beforeEach(function(done) {
          docHandler.getAllDocumentsByDate('2015-10-6', 2, function(allDocs) {
            docs = allDocs;
            done();
          });
        });

        it("should return all document of a specified date", function() {
          expect(check.isByDate(docs)).toBeTruthy();
        });
      });

      describe('Get documents by  date', function() {
        beforeEach(function(done) {
          docHandler.getAllDocumentsByRole('public', 2, function(allDocs) {
            docs = allDocs;
            done();
          });
        });

        it("should return all document of a specified date", function() {
          expect(check.isOfSameRole(docs)).toBeTruthy();
        });
      });

    });
  });
})();
