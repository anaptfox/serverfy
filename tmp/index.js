var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./public', {cache: 3600 , headers: {"Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Methods" : "POST, GET, PUT, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log("Listening at  http://localhost:8080");