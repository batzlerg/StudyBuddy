var port = 3000;

var express = require('express');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// EJS and templating
app.set('view_engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false, root:__dirname + '/views/'});

// gzip
app.use(express.compress());

// express methods
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// init passport
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');

// hook router in
require('./routes')(app);

// magic
app.listen(port);
console.log("listening on port " + port)