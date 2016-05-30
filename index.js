var http = require('http');
var employeeService = require('./lib/employees');

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

	//Setting up routes — exec checks the url against a regExp
	if (_url = /^\/employees$/i.exec(req.url) ) {

		//return a list of employees
		employeeService.getEmployees(function(error, data){
			if (error) {
				res.writeHead(501,{'Content-type': 'text/plain'});
				return res.end();
			}
			res.writeHead(200);
			return res.end(data);
		});


	} else if (_url = /^\/employees\/(\d+)$/i.exec(req.url) ) {
		
		//return a single employee by the id in the route
		employeeService.getEmployee( _url[1], function(error, data){
			if (error) {
				res.writeHead(501,{'Content-type': 'text/plain'});
				return res.end();
			}
			if (!data){
				res.writeHead(200);
				return res.end();
			}

			res.writeHead(200);
			return res.end(data);
		});

	} else {
		//try to return the static file
		res.writeHead(200);
		res.end('static file maybe');
	}


}).listen(1337, '127.0.0.1');

console.log('Server listening at http://127.0.0.1:1337/');