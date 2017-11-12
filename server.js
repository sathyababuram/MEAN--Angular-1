var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var morgan = require('morgan');
var  bodyParser = require('body-parser');
var Employee = require('./app/model/employee');
//var methodOverride = require('method-override');
var port = 3000;
var router =  express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');



//app.use(morgan('dev'));                                                        
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json()); 
//app.use(methodOverride());
app.use('/api',appRoutes);
app.use(express.static(__dirname + '/public'));  


mongoose.connect('mongodb://localhost:27017/Employee_Details');

mongoose.connection.on('connected',function(){
    console.log("connected to database");
});




app.listen(port,function(req,res){
 console.log("Server Started Successfully");
});

