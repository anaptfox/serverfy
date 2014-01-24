
"use strict";

var program = require('commander'),
    serverfy = require('../lib/serverfy'),
    path = require('path'),
    fs = require('fs'),
    cwd = process.cwd(),
    inquirer = require("inquirer");

program
  .version('0.0.1')
  .parse(process.argv);


serverfy.on('progress', function(msg) {

  console.log(msg);

});



/**
 * Input prompt 
 */

var questions = [
  {
    type: "input",
    name: "baseDirectory",
    message: "Where is the base directory?",
    default: function () {
      return cwd;
    }
  },
  {
    type: "confirm",
    name: "skip",
    message: "Do you want to skip any folders or directorys? (ex. .git)",
    default: false
  },
  {
    type: "checkbox",
    name: "skipFiles",
    message: "Which files/directorys do you want to skip?",
    default: false,
    when: function(answers){

      return answers.skip;

    },
    choices: function(answers){

      return fs.readdirSync(answers.baseDirectory);

    }
  }
];

inquirer.prompt( questions, function( options ) {

  serverfy.convert(options, function(err) {

    if(err) {
    
      console.log('ERROR: ' + err);
    
    }
    
    else {
    
      console.log('Please run "npm start" to start application');
      process.exit();
    }

  });
  
});