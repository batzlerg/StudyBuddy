var port = 3000;

var express = require('express');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.set('view_engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false, root:__dirname + '/views/'});
app.use(express.compress());
app.use(express.static(__dirname + '/public'));


app.get('/hello', function(req, res){
	var dataEJS = {};
	dataEJS.page_title = 'My Beautiful Title';
	dataEJS.page_body = 'My Beautiful Content';
	res.render('layout.ejs', dataEJS);
});
app.get('/', function(req,res){
	res.send('Default');
});

app.listen(port);
console.log("listening on port " + port)