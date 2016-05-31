var employeeDb = require('../database/employees');

// Array.find polyfill, remove once db in place
require('./find-polyfill');

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees (callback) {
	setTimeout(function() {
		callback(null, employeeDb);
	}, 500);
}

function getEmployee (employeeId, callback) {

	//call the getEmployees function
	getEmployees(function(error, data){
		
		//bubble the error up to the callback
		if(error){
			return callback(error);
		}

		//find the employee in question
		var result = data.find(function(item){
			return item.id === employeeId;
		});

		//send the result to the callback
		callback(null, result);
	});
}