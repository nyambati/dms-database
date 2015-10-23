var mongoose = require('mongoose'),
  db = 'mongodb://localhost/documents',
  userHandler = require('../handlers/user'),
  docHandler = require('../handlers/document'),
  roleHandler = require('../handlers/role'),
  faker = require('faker'),
  //require helpers
  check = require('./helpers/helper');
// require db
mongoose.connect(db);
// TESTS
(function() {
  'use strict';

  describe('Document managemnet  system test', function() {
    var users, roles, docs, docByDate, newUser, newDoc, info, docId, limit = 0;

    // USER TEST SUITE
    var fakeUser = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      role: 'admin',
      email: faker.internet.email(),
      password: faker.name.findName()
    };

    var fakeDoc = {
      userId: '56208486f923bdb57090c1b7',
      title: faker.lorem.sentence(),
      access: 'public',
      content: faker.lorem.paragraph()
    };
    describe("User", function() {
      describe('Create new user', function() {
        beforeEach(function(done) {
          userHandler.createUser(fakeUser, function(err, user) {
            newUser = user;
            done();
          });
        });

        it('the new user should have id, username, role, names and password ', function() {
          expect(newUser.username).toBeDefined();
          expect(newUser.username).toBe(fakeUser.username);
          expect(newUser.role).toBeDefined();
          expect(newUser.role).toBe(fakeUser.role);
          expect(typeof newUser.name).toBe('object');
          expect(newUser.name.first).toBe(fakeUser.firstname);
          expect(newUser.name.last).toBe(fakeUser.lastname);
          expect(newUser._id).toBeDefined();
          expect(newUser.password).toBeDefined();
          expect(typeof newUser.password).toBe('string');
        });

        beforeEach(function(done) {
          userHandler.deleteUser(newUser._id, function(err, ok) {
            info = ok.result;
            done();
          });
        });

        it('should delete the document of specified id', function() {
          expect(info.ok).toBe(1);
          expect(info.n).toBe(1);
        });
      });
      // get the user data.
      beforeEach(function(done) {
        userHandler.getAllUsers(limit, function(allUsers) {
          users = allUsers;
          done();
        });
      });

      // checkif the user created is unique.
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
      describe('Create new document', function() {
        beforeEach(function(done) {
          docHandler.createDocument(fakeDoc, function(err, doc) {
            newDoc = doc;
            docId = doc._id;
            done();
          });
        });

        it('New documents should have all the required information', function() {
          expect(newDoc._id).toBeDefined();
          expect(newDoc.ownerId).toBeDefined();
          expect(newDoc.ownerId).toBe(fakeDoc.userId);
          expect(newDoc.title).toBeDefined();
          expect(newDoc.title).toBe(fakeDoc.title);
          expect(newDoc.content).toBeDefined();
          expect(newDoc.content).toBe(fakeDoc.content);
          expect(newDoc.access).toBeDefined();
          expect(newDoc.access).toBe(fakeDoc.access);
          expect(newDoc.dateCreated).toBeDefined();
        });

        beforeEach(function(done) {
          docHandler.deleteDocument(docId, function(err, ok) {
            info = ok.result;
            done();
          });
        });

        it('should delete the document of specified id', function() {
          expect(info.ok).toBe(1);
          expect(info.n).toBe(1);
        });
      });
    });

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
      expect(docs.length).toBe(2);
    });

    it('should return all docs when getAlldocuments is called', function() {
      expect(docs.length).toBeGreaterThan(0);
    });

    it('should return documents starting with the recent one', function() {
      expect(check.ordered(docs)).toBeTruthy();
    });
    // SEARCH TEST SUITE
    describe('Search', function() {
      describe('Get documents by  date', function() {
        beforeEach(function(done) {
          docHandler.getAllDocumentsByDate('2015-10-06', 2, function(allDocs) {
            docs = allDocs;
            done();
          });
        });

        it("should return all document of a specified date", function() {
          expect(check.isByDate(docs)).toBeTruthy();
        });
      });

      describe('Get documents by role', function() {
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
