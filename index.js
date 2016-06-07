var http = require('http');
var colors = require('colors');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

//make db connection
require('./lib/connection');


http.createServer(function(req, res){

	// a parsed url to use in case there are parameters
	var _url;

	// in case the client uses lowercase for request
	req.method = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);

	// this server only serves GET requests.
	if (req.method !== 'GET') {
		res.writeHead(501,{'Content-type': 'text/plain'});
		return res.end(req.method + ' is not implemented by this server.');
	}

	//Setting up routes to get employee list and a single employee
	if (_url = /^\/employees$/i.exec(req.url) ) {

		//return a list of employees
		employeeService.getEmployees(function(error, data){
			if (error) {
				return responder.send500(error, res);
			}
			return responder.sendJson(data, res);
		});


	} else if (_url = /^\/employees\/(\d+)$/i.exec(req.url) ) {
		
		//return a single employee by the id in the route
		employeeService.getEmployee( _url[1], function(error, data){
			if (error) {
				return responder.send500(error, res);
			}
			if (!data){
				return responder.send404(res);
			}
			return responder.sendJson(data, res);
		});

	} else {
		staticFile(req.url, res);
	}

}).listen(1333, '127.0.0.1');

console.log('Server listening at http://127.0.0.1:1333/');