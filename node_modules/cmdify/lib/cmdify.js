/*
 * cmdify
 * https://github.com/danielchatfield/node-cmdify
 *
 * Copyright (c) 2013 Daniel Chatfield
 * Licensed under the MIT license.
 */

'use strict';
var os = require('os');

module.exports = function (command) {
    if (os.platform() !== 'win32') {
        return command;
    }
    command = command.split(' ');
    command[0] += '.cmd';
    return command.join(' ');
};
