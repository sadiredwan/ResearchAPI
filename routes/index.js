var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next){
	res.send('Research API for University of Rajshahi');
});

module.exports = router;