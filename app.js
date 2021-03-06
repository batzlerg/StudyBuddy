var port = 3000;

var express = require('express');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var OAuthStrategy = require('passport-oauth').OAuthStrategy;

var app = express();

// EJS and templating
app.set('view_engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false, root:__dirname + '/views/'});

// gzip
app.use(express.compress());

// express methods
// app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(__dirname + '/static'));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// passport config
var models = require('./models/account');
var Account = models.Account;

// local strategy
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// canvas strategy
// passport.use('canvas', new OAuthStrategy({
// 	userAuthorizationURL: 'https://upenn.instructure.com/login/oauth2/auth',
// }))

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');

// hook router in
require('./routes')(app);

// magic
app.listen(port);
console.log("listening on port " + port)