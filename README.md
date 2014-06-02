# Backbone Boilerplate

## Getting started

`npm install`
`bower install`
`grunt server` will run the unminified development server and use the local server
variables in `env/.local`.

`grunt server:prod` will run the minified distributable version using the prod
server variables in `env/.prod`.

To add more environments simply create two files:
- `env/.ENV_NAME`
- `app/js/settings/env/ENV_NAME.js`

And then run the command `grunt server:ENV_NAME` or `grunt build:ENV_NAME`.

By default any environment that is not `local` will run the build. This will
change and is likely to be an option for all environments to run in both
minified and unminified states at a later date.