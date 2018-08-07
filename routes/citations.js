var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rakibhasan:rakibhasan1@ds113019.mlab.com:13019/research_database', ['citations']);


//Get all citations
router.get('/citations', function(req, res, next){
	db.citations.find(function(err, citation){
		if(err){
			res.send(err);
		}
		res.json(citation);
	});
});


//Get by id
router.get('/citations/:id', function(req, res, next){
	db.citations.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, citation){
		if(err){
			res.send(err);
		}
		res.json(citation);
	});
});


//Save
router.post('/citations', function(req, res, next){
	var citation = req.body;
	if(!citation.researchName || !citation.citedBy || !citation.citedFrom){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.citations.save(citation, function(err, citation){
			if(err){
				res.send(err);
			}
			res.json(citation);
		});
	}
});


//Delete
router.delete('/citations/:id', function(req, res, next){
	db.citations.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, citation){
		if(err){
			res.send(err);
		}
		res.json(citation);
	});
});


//Update
/*router.put('/citations/:id', function(req, res, next){
	var citation = req.body;
	var upMem = {};

	if(citation.researchName){
		upMem.researchName = citation.researchName;
    }
    
    if(citation.citedBy){
		upMem.citedBy = citation.citedBy;
	}

	if(citation.citedFrom){
		upMem.citedFrom = citation.citedFrom;
	}

	if(!upMem.researchName && !upMem.citedBy && !upMem.citedFrom){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	}
	else{
		db.citations.update({_id: mongojs.ObjectId(req.params.id)}, upMem, {}, function(err, citation){
			if(err){
				res.send(err);
			}
			res.json(citation);
		});
	}


});*/


module.exports = router;
