# cmdify [![Build Status](https://secure.travis-ci.org/danielchatfield/node-cmdify.png?branch=master)](http://travis-ci.org/danielchatfield/node-cmdify)

A small utility to help make spawning cross platform.

## Getting Started
Install the module with: `npm install cmdify`

```javascript
var cmdify = require('cmdify');

cmdify('npm version patch') // on windows returns 'npm.cmd version patch'
```

## License
Copyright (c) 2013 Daniel Chatfield. Licensed under the MIT license.
