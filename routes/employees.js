var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/employees', function(req, res, next) {
	Employee.find().sort('name.last').exec(function(error, results) {
		if (error) {
			return next(error);
		}

		res.json(results);
	});
});

router.get('/employees/:employeeId', function(req, res, next) {
	Employee.findOne({
		id: req.params.employeeId
	}).populate('team').exec(function (err, results) {
		if(err){
			return next(err);
		}

		if (!results) {
			res.send(404);
		}

		res.json(results);
	});
});

router.put('/employees/:employeeId', function(req, res, next) {
	
	//Don't try to update the mongo id
	delete req.body._id;
	req.body.team = req.body.team._id;

	Employee.update({
		id: req.params.employeeId
	}, req.body, function(err, numAffected, response) {
		if(err){
			return next(err);
		}

		res.json(response);
	});
});

module.exports = router ;

