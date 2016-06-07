var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');

var data = {
	employees: [
		{
			id: '101',
			name: {
				first: 'Colin',
				last: 'Ihrig'
			},
			image: 'images/employees/101.jpg',
			address: {
				lines: ['11 Wall Street'],
				city: 'Pittsburgh',
				state: 'PA',
				zip: '1522'
			}
		},
		{
			id: '102',
			name: {
				first: 'Elmer',
				last: 'Firth'
			},
			address: {
				lines: ['103 Melrose', 'apt 2130'],
				city: 'Paris',
				state: 'TX',
				zip: '15245H'
			}
		},
		{
			id: '103',
			name: {
				first: 'Jessica',
				last: 'Bacon'
			},
			image: 'images/employees/invalid_image.jpg',
			address: {
				lines: ['22 Food street', '(food street)'],
				city: 'Parliament city',
				state: 'JV',
				zip: '152g5'
			}
		},
		{
			id: '104',
			name: {
				first: 'Freagan',
				last: 'Zephyr'
			},
			address: {
				lines: ['55 Lard ave'],
				city: 'Serbia',
				state: 'RU',
				zip: '45363g-51r'
			}
		},
		{
			id: '105',
			name: {
				first: 'Nexus',
				last: 'Leiberville'
			},
			address: {
				lines: ['23 Passaic dr'],
				city: 'Alimony',
				state: 'FL',
				zip: '23413'
			}
		}],
		teams: [
			{
				name: 'Code Monkeys'
			},
			{
				name: 'Software and Services Group'
			},
			{
				name: 'Project Development'
			}
		]
};

var deleteEmployees = function(callback) {
	console.info('Deleting Employees');
	Employee.remove({}, function(err, response) {
		if (err) {
			console.error('Error deleting employees: ' + err);
		}

		console.info('Done deleting employees');
		callback();
	});
};

var addEmployees = function(callback) {
	Employee.create(data.employees, function(err, response) {
		if (err) {
			console.error('Error: ' + err);
		}

		console.info('Employees added sucessfully');
		callback();
	})
}

var deleteTeams = function(callback) {
	Team.remove({}, function(err, response){
		if (err) {
			console.error('Error deleting teams: ' + err);
		}

		console.info('Teams deleted sucessfully');
		callback();
	});
};

var addTeams = function(callback) {
	Team.create(data.teams, function(err, response) {
		if (err) {
			console.error('Error creating teams');
		} else {
			data.default_team_id = data.teams[0]._id; //Set a default team id
		}

		console.info('Teams added, team id set to default');
		callback();
	});
};

var updateEmployeeTeams = function(callback) {
	console.info('Updating employee teams');
	Employee.update({}, {
		team: data.default_team_id
	}, {
		multi: true
	}, function(error, numberAffected, response) {
		if (error){
			console.error('Error updating employee teams: ' + error);
		}

		console.info('Finished updating, all employees set to default team');
		callback();
	});
};

// async keeps us out of callback hell by letting us pass a single callback after running all our scripts
async.series([
	deleteEmployees,
	deleteTeams,
	addEmployees,
	addTeams,
	updateEmployeeTeams
], function(error, results) {
	if (error) {
		console.error('Error: ' + error);
	}

	mongoose.connection.close();
	console.log('Finito! connection closed.');
});





































