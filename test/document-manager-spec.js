(function () {
  'use strict';

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
  var users, roles, docs, docByDate, newUser, newDoc, info, error = [],
    docId, limit = 0;

  var fakeUser = {
    username: 'thomasnyambati',
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

  // TESTS
  describe('Document managemnet  system test', function () {
    // USER TEST SUITE
    describe('Create new user', function () {
      beforeEach(function (done) {
        userHandler.createUser(fakeUser, function (err, user) {
          error.push(err);
          done();
        });
      });

      it('New user should be unique', function () {
        expect(typeof error).toBe('object');
        expect(error[0].message).toBeDefined();
        expect(error[0].message.substring(0, 26)).toEqual('E11000 duplicate key error');
      });
    });

    describe("Query user", function () {
      // get the user data.
      beforeEach(function (done) {
        userHandler.getAllUsers(limit, function (allUsers) {
          users = allUsers;
          done();
        });
      });

      // checkif the user created is unique.
      it('Should return unique username and password', function () {
        expect(check.isUnique.email(users)).toBeTruthy();
        expect(check.isUnique.username(users)).toBeTruthy();
      });

      it('Should return all data when getAll users is called', function () {
        expect(users.length).toBeGreaterThan(0);
      });

      it('Should have a role defined', function () {
        expect(check.isDefined).toBeTruthy();
      });

      it('First name and last names Should be created', function () {
        expect(check.hasFirstName(users)).toBeTruthy();
        expect(check.hasLastName(users)).toBeTruthy();
      });
    });

    describe('delete user', function (done) {
      beforeEach(function (done) {
        userHandler.deleteUser('thomasnyambati', function (err, ok) {
          info = ok.result;
          done();
        });
      });

      it('Should delete the document of specified id', function () {
        expect(info.ok).toBe(1);
        expect(info.n).toBe(1);
      });
    });

    // ROLE TEST SUITE
    describe('Roles', function () {
      beforeEach(function (done) {
        roleHandler.getAllRoles(limit, function (err, allRoles) {
          roles = allRoles;
          done();
        });
      });

      it("Should have unique titles", function () {
        expect(check.isUnique.roleTitle(roles)).toBeTruthy();
      });

      it('Should return all roles when getAllRoles is called', function () {
        expect(roles.length).toBeGreaterThan(0);
      });
    });

    // DOCUMENTS TEST SUITE
    describe('Documents', function () {
      describe('Create new document', function () {
        beforeEach(function (done) {
          docHandler.createDocument(fakeDoc, function (err, doc) {
            newDoc = doc;
            docId = doc._id;
            done();
          });
        });

        it('New documents should have all the required information', function () {
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
      });

      describe('Delete document', function () {
        beforeEach(function (done) {
          docHandler.deleteDocument(docId, function (err, ok) {
            info = ok.result;
            done();
          });
        });

        it('Should delete the document of specified id', function () {
          expect(info.ok).toBe(1);
          expect(info.n).toBe(1);
        });
      });

      describe('Get all documents', function () {
        beforeEach(function (done) {
          docHandler.getAllDocuments(2, function (allDocs) {
            docs = allDocs;
            done();
          });
        });

        it('Each documents should have unique titles', function () {
          expect(check.isUnique.docTitle(docs)).toBeTruthy();
        });

        it('Each document should have a owner', function () {
          expect(check.hasOwner(docs)).toBeTruthy();
        });

        it('Each document has dateCreated', function () {
          expect(check.hasDateCreated(docs)).toBeTruthy();
        });

        it('Should return documents of specified limit', function () {
          expect(docs.length).toBe(2);
        });

        it('Should return all docs when getAlldocuments is called', function () {
          expect(docs.length).toBeGreaterThan(0);
        });

        it('Should return documents starting with the recent one', function () {
          expect(check.ordered(docs)).toBeTruthy();
        });
      });
    });
    // SEARCH TEST SUITE
    describe('Search', function () {
      describe('Get documents by  date', function () {
        beforeEach(function (done) {
          docHandler.getAllDocumentsByDate('2015-10-06', 2, function (allDocs) {
            docs = allDocs;
            done();
          });
        });

        it("Should return all document of a specified date", function () {
          expect(check.isByDate(docs)).toBeTruthy();
        });
      });

      describe('Get documents by role', function () {
        beforeEach(function (done) {
          docHandler.getAllDocumentsByRole('public', 2, function (allDocs) {
            docs = allDocs;
            done();
          });
        });

        it("Should return all document of a specified date", function () {
          expect(check.isOfSameRole(docs)).toBeTruthy();
        });
      });
    });
  });
})();
