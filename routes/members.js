var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rakibhasan:rakibhasan1@ds113019.mlab.com:13019/research_database', ['members']);


//Get all members
router.get('/members', function(req, res, next){
	db.members.find(function(err, members){
		if(err){
			res.send(err);
		}
		res.json(members);
	});
});


//Get by id
router.get('/members/:id', function(req, res, next){
	db.members.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, member){
		if(err){
			res.send(err);
		}
		res.json(member);
	});
});


//Save
router.post('/members', function(req, res, next){
	var member = req.body;
	if(!member.name || !member.department){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.members.save(member, function(err, member){
			if(err){
				res.send(err);
			}
			res.json(member);
		});
	}
});


//Delete
router.delete('/members/:id', function(req, res, next){
	db.members.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, member){
		if(err){
			res.send(err);
		}
		res.json(member);
	});
});


//Update
router.put('/members/:id', function(req, res, next){
	var member = req.body;
	var upMem = {};

	if(member.name){
		upMem.name = member.name;
    }
    
    if(member.department){
		upMem.department = member.department;
	}

	if(!upMem.name && !upMem.department){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.members.update({_id: mongojs.ObjectId(req.params.id)}, upMem, {}, function(err, member){
			if(err){
				res.send(err);
			}
			res.json(member);
		});
	}


});


module.exports = router;