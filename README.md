# Backbone Boilerplate [![Build Status](https://travis-ci.org/mderrick/backbone-boilerplate.svg?branch=master)](https://travis-ci.org/mderrick/backbone-boilerplate)

A backbone boilerplate to build and deploy multiple environments for both web 
and cordova applications using the same codebase. This boilerplate uses 
[Grunt](http://gruntjs.com/), [Require](http://requirejs.org/), 
[Bower](http://bower.io/), [Express](http://expressjs.com/), 
[Jasmine](http://jasmine.github.io/) and [Cordova](http://cordova.apache.org/).

## Getting started

- `npm install`
- `bower install`
- `npm install ios-sim -g`
- `grunt server:prod --cordova`
- Go to `http://localhost:9001` and view app in simulator

## Tasks

### `grunt build:<ENV_NAME>`

This will build the environment into the `dist` directory.

The boilerplate includes both the `local` and `prod` environments.

To add more environments simply create two files:
- `env/.<ENV_NAME>`
- `www/app/js/settings/env/<ENV_NAME>.js`

And then run the command `grunt build:<ENV_NAME>`.

Include `--cordova` option and this will also create and prepare the cordova 
application in the `dist` directory and launch it in the ios simulator.
Obviously this can and should be changed to include other sims in the `Gruntfile.js`.

Please see [Cordova](http://cordova.apache.org/) documentation on installing device emulators.


### `grunt server:<ENV_NAME>`

`grunt server` will run the development server without building.

`grunt server:<ENV_NAME>` will first run the above `build:<ENV_NAME>` task and 
then run the server on the `dist` directory.

By default any environment that is not `local` will run the build first before
running the server on the `dist` folder.


### `grunt test`

Runs the entire application (except directories in `.jshintignore`) through 
JSHint using the rules established in the `.jshintrc`.

This is followed by running jasmine tests located in `tests` directory. Tests 
for the client are run in `tests/app` and serverside tests are run in 
`tests/server`.