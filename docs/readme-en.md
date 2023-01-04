# API Service for FRÍ

## Goal
One of the big goes is to create a api service that can support small single task web user interfaces, like athlete registry, competition and achievements.

## Setup
The system is set up as simple REST API, written in nodeJS with Postgres database as a backend. The service is hosted on Heroku. To run the api service locally you need to do the following:

1. Set up nodeJS and npm on your computer
2. Clone this repository
3. Get the environmental variables from Heroku and add to .env file.
4. Enter npm install in your terminal
4. Enter npm run start to start the service.
5. Open your hosts file and enter 127.0.0.1  local.fri.is in the file
6. Open your browser at http://local.fri.is:3000

### Code
The code is written in nodeJS and uses dependency injection to build the modules. The file app.js sets up boilerplate code around expressjs and is then used in index.js where databases, redis and logs are set up. The folder  composition creates the dependency tree for each entity which is then used in index.js

#### /server/index.js
This is the entry point where database and redis connections are created, routes are set up and the service is started.

#### /server/app.js
Boilerplate to configure the Express service, e.g. cors, helmet, etc.

#### /routes/clubs.js - etc
Endpoint for a club. It uses database functions from the repo folder e.g. selectClubs and displays the results.

#### /repo/clubs - etc
Database code for clubs. Each function has its own file. For example the file select.js gets information about clubs. Inside the file there is a simple factory function named makeSelectClubs  Það er er einfalt fall sem heitir makeSelectClubs which has a database dependency and returns another function that returns all the data.

### Access
The api is open to read but has two kind of locks.

## External systems.
The API service has a whitelist for services or web ui-s that can connect to it. The whitelist is sorted into production and development. To get the development environment to work it eis enough to add local.fri.is to your hosts file.

## Login
To change information you need to log in. You can login at /user/login by posting a username and a password. By doing that the following sequence starts:

1. The service queries the database for the user.
2. Username and password are checked.
3. Information about the user are saved into a redis cache/db with a key (user-id).
4. The service respons with a cookie FRI_API which is a httpOnly, secure cookie with 10 year lifespan.
5. The service sends general user information as JSON.

Note that this only authenticates to user towards the api-service If you're creating a web ui you need to manage your user session there. The service is "stateless", it doesn't keep track of sessions. It only accepts a token in the form of a cookie or a Bearer to authenticate requests and then looks it up in a redis database. The service  sends the user information back as a JSON when a user logs in, those are not sensitive information only name, club, etc and contain no information about authentication. Those informations are in the cookie which is httpOnly and secure and cannot be read by client code. The token you recieve SHOULD NEVER BE STORED ON THE CLIENT.

You can send a request to http://api.fri.is/user to see what user is behind the token.

### Coding rules
The repository uses eslint-standard to maintain same rules of coding for everybody that is working on the project. This way all the code has the same formatting and we don't get extra lines of conflicts when merging.

Please keep the same setup or rules when working on the project. For example:
1. Create a folder for each entity. For example: /repo/meets/
2. Create a file for each function. For example:  /repo/meets/insert.js
3. Functions that use depencey should use the prefix make. For exmaple makeInsertMeet(db)

#### Pre-commit hooks (e. hooks)
This repository uses pre-commit hooks that run a linter to make sure nothing is broken before the code is published.

### Continuous deployment
When a new version is merged to master the changes go straight to live.  All changes are required to first to a dedicated branch, then a pull request is made, a code review and then finally a merge.

### Test
Þeim er ábótavant.
