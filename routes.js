var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

  app.get('/hello', function(req, res){
    var dataEJS = {};
    dataEJS.page_title = 'My Beautiful Title';
    dataEJS.page_body = 'My Beautiful Content';
    res.render('layout.ejs', dataEJS);
  });

  app.get('/', function (req, res) {
      res.render('index.ejs', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register.ejs', { msg: ""});
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register.ejs', { msg: "That username already exists. Try again." });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  app.get('/login', function(req, res) {
      res.render('login.ejs', { user : req.user });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/canvas',
    passport.authorize(''))

  app.get('/user', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

};