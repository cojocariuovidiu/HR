var mongoose = require('mongoose');
var postFind = require('mongoose-post-find');
var async = require('async');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	members: {
		type: [Schema.Types.Mixed]
	}
});

// Finds all employees with an ID matching the team passed in as result and adds them as members
function _attachMembers(Employee, result, callback) {
	Employee.find({
		team: result._id
	}, function (error, employees){
		if (error) {
			return callback(error);
		}

		result.members = employees;
		callback(null, result);
	})
}

//listen for find and findOne
TeamSchema.plugin(postFind, {

	find: function(results, callback) {
		var Employee = mongoose.model('Employee');

		async.each(results, function(item, callback) {
			_attachMembers(Employee, item, callback); 
		}, function(err){
			if (err) {
				return callback(err);
			}
			callback(null, results);
		});		
	},

	findOne: function(result, callback){
		var Employee = mongoose.model('Employee');
		_attachMembers(Employee, result, callback);
	}
});

module.exports = mongoose.model('Team', TeamSchema);