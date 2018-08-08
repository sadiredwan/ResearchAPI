var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rakibhasan:rakibhasan1@ds113019.mlab.com:13019/research_database', ['researches']);


//Get all members
router.get('/researches', function(req, res, next){
	db.researches.find(function(err, research){
		if(err){
			res.send(err);
		}
		res.json(research);
	});
});


//Get by id
router.get('/researches/:id', function(req, res, next){
	db.researches.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, research){
		if(err){
			res.send(err);
		}
		res.json(research);
	});
});


//Save
router.post('/researches', function(req, res, next){
	var research = req.body;
	if(!research.name || !research.paper){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.researches.save(research, function(err, research){
			if(err){
				res.send(err);
			}
			res.json(research);
		});
	}
});



//Delete
router.delete('/researches/:id', function(req, res, next){
	db.researches.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, research){
		if(err){
			res.send(err);
		}
		res.json(research);
	});
});


//Update
router.put('/researches/:id', function(req, res, next){
	var research = req.body;
	var upMem = {};

	if(research.name){
		upMem.name = research.name;
    }
    
    if(research.paper){
		upMem.paper = research.paper;
	}

	if(!upMem.name && !upMem.paper){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.researches.update({_id: mongojs.ObjectId(req.params.id)}, upMem, {}, function(err, research){
			if(err){
				res.send(err);
			}
			res.json(research);
		});
	}


});



module.exports = router;