/*
 * exposes four responses to return info to the client
 *  404, 500, 200 + staticfile, and 200 + json data
 */

 var fs = require('fs');

 exports.send404 = function(response) {
 	console.error('Resource not found');

 	response.writeHead(404,{
 		'Content-type': 'text/plain'
 	});

 	return response.end('Not found');
 }

 exports.sendJson = function(data, response) {
 	console.log('Returning JSON data');

 	response.writeHead( 200,{
 		'Content-type': 'application/json'
 	});

 	response.end(JSON.stringify(data))
 }

 exports.send500 = function(data, response) {
 	console.error(data.red);

 	response.writeHead(500,{
 		'Content-type': 'text/plain'
 	});

 	response.end(data);
 }

 exports.staticFile = function(filePath) {
 	return function(data, response) {
 		var readStream;

 		// fix so that /home and /home.html both work
 		data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
 		data = '.' + filePath + data;

 		fs.stat(data, function(error, stats){
 			
 			if (error || stats.isDirectory()) {
 				return exports.send404(response);
 			}

 			readStream = fs.createReadStream(data);
	 		return readStream.pipe(response);	
 		});
 	}
 }