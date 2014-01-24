var fs = require('fs-extra'),
    async = require('async'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    path = require('path'),
    FsTools = require('fs-tools'),
    cwd = process.cwd(),
    glob = require("glob"),
    ncp = require('ncp').ncp,
    _ = require('underscore'),
    inquirer = require("inquirer"),
    cmdify = require("cmdify");


ncp.limit = 16;


//------------------------------------------------------------------------------
var Serverfy = function() {

};

util.inherits(Serverfy, EventEmitter);

//------------------------------------------------------------------------------
Serverfy.prototype.convert = function(options, callback) {

  var self = this;

  self.paths = {
    cwd: cwd
  };

  async.series([
    function(callback){
       self.moveToPublic(self.paths, options, callback);
    },
    function(callback){
       self.clean(self.paths, options, callback);
    },
    function(callback){
      self.attacheNode(self.paths, options,  callback);
    },
    function(callback){
      self.runNode(self.paths, options,  callback);
    }
  ], callback);

};

//------------------------------------------------------------------------------


Serverfy.prototype.moveToPublic = function(paths, options, callback) {

  var self = this;

  self.emit('progress', 'Moving public files to ' + path.join(options.baseDirectory, 'public'));

  var baseDirectory = options.baseDirectory;

  //Get all files in options

  var file_list = fs.readdirSync(baseDirectory);

  // Make public direcoty

  fs.mkdirSync(path.join(paths.cwd, "public"));

  function moveFile (item, callback) {


    var destination = path.join(paths.cwd, "public", item);


    //Skip anything the user wants to skip
    if(_.contains(options.skipFiles, item)) return callback(null);

    

    ncp(path.join(baseDirectory, item), destination, function (err) {
       
      return callback(err);
      
    });

  }

  async.eachSeries(file_list, moveFile, function(err){

    callback(err);
  
  });



};

Serverfy.prototype.clean = function(paths, options, callback) {
  var self = this;

  self.emit('progress', 'Cleaning up old files');

  var baseDirectory = options.baseDirectory;

  //Get all files in options

  var file_list = fs.readdirSync(baseDirectory);


  file_list.forEach(function(item){

    if(item === 'public') return;

    //Skip anything the user wants to skip
    if(_.contains(options.skipFiles, item)) return;

    fs.removeSync(path.join(baseDirectory, item));

  });

  callback(null);

};


Serverfy.prototype.attacheNode = function(paths, options, callback) {
  var self = this;

  self.emit('progress', 'Attaching Node');

  async.series([

    function(callback){
    
       fs.copy(path.join(__dirname,'..', 'tmp', 'index.js'), path.join(paths.cwd, 'index.js'), callback);
    
    },
    
    function(callback){
    
       fs.copy(path.join(__dirname,'..', 'tmp', 'package.json'), path.join(paths.cwd, 'package.json'), callback);
    
    }
  
  ], callback);



};


Serverfy.prototype.runNode = function(paths, options, callback) {
  var self = this;

  self.emit('progress', 'Installing npm modules...');

  var loader = [
    "/ Installing",
    "| Installing",
    "\\ Installing",
    "- Installing"
  ];
  var i = 4;
  var ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % 4] });

  var interval = setInterval(function() {
    ui.updateBottomBar( loader[i++ % 4] );
  }, 300 );

  var spawn = require("child_process").spawn;

  var cmd = spawn(cmdify("npm"), [ "install"], { stdio: "pipe" });
  //cmd.stdout.pipe( ui.log );
  cmd.on( "close", function() {
    ui.updateBottomBar("Installation done!\n");
    clearInterval(interval);
    callback(null);
  });
  
};





module.exports = new Serverfy();

//------------------------------------------------------------------------------
