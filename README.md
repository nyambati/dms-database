
# Document Management Sytem V.2.0.0
This sytstem will enable you to interact with MongoDB (noSQL) database through your command line. it has been designed to work on a variety of command line tools such as bash for linux and powershell for windows

# Installation.

For you to use this system, you have to install the  following tools

1. #### Nodejs
    our sytem in build on node framework, therefore isy is important that we install this tools, it enables your to run your javacript via commandline, cool right!. install **Nodejs** : https://nodejs.org/en/

2. ##### MongoDb
    Another tool we need is the database, just to be clear, our system needs to store and retirve data, for persistance we need a storage area, so make sure you install mongoDb, you can find how to install **mongodb website**: https://nodejs.org/en/, on your respective machine.

Cool, now that we have installed our major tools we can now start running this system, ohh wait before anything just make sure you clone this sytem to your desktop,

great, now lets run ` npm install ` this will install all the dependecies that the system will need to run perfectly.
```
    $ npm install
    
    $ npm link
    
    $ manager init
```
 
# Commands
The following are the  commands you will need to navigate through our system, in your terminal navigate to the system folder and run `manager <command>`

1. `cru` Create new user
2. `gau <limit>` Get all user, followed the limit of the users you want to find, if you want all users, ignore the limit
3. `crd` create documents
4. `gad  <limit>` Get all documents with limit
5. `gbd <date> <limit>` Get documents by date  and limit format `yyy-mm-dd`
6. `gdr <role> <limit>` Get documents by Role and limit
7. `crole` Create Roles
8. `gar <limit>` Get all role with limit

#Testing

This app has been tested using  `jasmine-node`, to run the test in your command line run
```
    $ npm test
```

#### Now we are good to go, Enjoy.

