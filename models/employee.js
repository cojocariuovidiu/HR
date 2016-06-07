var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
	id: {
		type: String,
		required: true, 
		unique: true
	},
	name: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
		}
	},
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Team'
	},
	image: {
		type: String,
		default: 'images/default'
	},
	address: {
		lines:{
			type: [String]
		},
		city: {
			type: String
		},
		province: {
			type: String
		},
		zip: {
			type: String
		}
	}
});

module.exports = mongoose.model('Employee', EmployeeSchema);