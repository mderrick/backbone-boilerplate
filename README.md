# Backbone Boilerplate [![Build Status](https://travis-ci.org/mderrick/backbone-boilerplate.svg?branch=master)](https://travis-ci.org/mderrick/backbone-boilerplate)

## Getting started

- `npm install`
- `bower install`
- `grunt server`
- Go to `http://localhost:9001`

## Tasks

### `grunt build:<ENV_NAME>`

This will build the environment into the `dist` directory.

The boilerplate includes both the `local` and `prod` environments.

To add more environments simply create two files:
- `env/.<ENV_NAME>`
- `app/js/settings/env/<ENV_NAME>.js`

And then run the command `grunt build:<ENV_NAME>`.


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

## TODO
- Write a more extensive server
- CSS sourcemaps
- Use Mocha instead of Jasmine? (TBC)
- Image minification
- Error handling and logging (errbit?)
- BUILD SOMETHING!