var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var departments = require('./routes/departments');

var port = 2000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Static
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', departments);


//URL error handling
app.use((req, res, next)=>{

    const error = new Error('Not found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

app.listen(port, function(){
	console.log('Server started on port ' +port);
});