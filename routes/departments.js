var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sadiredwan:kookoor1@ds113019.mlab.com:13019/research_database', ['departments']);


//Get all departments
router.get('/departments', function(req, res, next){
	db.departments.find(function(err, departments){
		if(err){
			res.send(err);
		}
		res.json(departments);
	});
});


//Get by id
router.get('/departments/:id', function(req, res, next){
	db.departments.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, department){
		if(err){
			res.send(err);
		}
		res.json(department);
	});
});


//Save
router.post('/departments', function(req, res, next){
	var department = req.body;
	if(!department.title){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.departments.save(department, function(err, department){
			if(err){
				res.send(err);
			}
			res.json(department);
		});
	}
});


//Delete
router.delete('/departments/:id', function(req, res, next){
	db.departments.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, department){
		if(err){
			res.send(err);
		}
		res.json(department);
	});
});


//Update
router.put('/departments/:id', function(req, res, next){
	var department = req.body;
	var upDept = {};

	if(department.title){
		upDept.title = department.title;
	}

	if(!upDept.title){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.departments.update({_id: mongojs.ObjectId(req.params.id)}, upDept, {}, function(err, department){
			if(err){
				res.send(err);
			}
			res.json(department);
		});
	}


});


module.exports = router;