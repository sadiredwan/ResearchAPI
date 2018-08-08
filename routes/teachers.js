var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db1 = mongojs('mongodb://rakibhasan:rakibhasan1@ds113019.mlab.com:13019/research_database', ['teachers']);

router.get('/shamim_ahmed', function(req, res, next){
	db1.teachers.find(function(err, teacher){
		if(err){
			res.send(err);
		}
		res.json(teacher);
	});
});


//Get by id
router.get('/shamim_ahmed/:id', function(req, res, next){
	db1.teachers.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, teacher){
		if(err){
			res.send(err);
		}
		res.json(teacher);
	});
});


//Save
router.post('/shamim_ahmed', function(req, res, next){
	var paper = req.body;
	if(!paper.name){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db1.teachers.save(paper, function(err, paper){
			if(err){
				res.send(err);
			}
			res.json(paper);
		});
	}
});


//Delete
router.delete('/shamim_ahmed/:id', function(req, res, next){
	db1.teachers.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, teacher){
		if(err){
			res.send(err);
		}
		res.json(teacher);
	});
});


//Update
router.put('/shamim_ahmed/:id', function(req, res, next){
	var paper = req.body;
	var upMem = {};

	if(paper.name){
		upMem.name = paper.name;
    }

	if(!upMem.name){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db1.teachers.update({_id: mongojs.ObjectId(req.params.id)}, upMem, {}, function(err, teacher){
			if(err){
				res.send(err);
			}
			res.json(teacher);
		});
	}


});



module.exports = router;