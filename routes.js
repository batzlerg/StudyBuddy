var passport = require('passport');
var models = require('./models/account');
  var Account = models.Account;
  var Course = models.Course;
  var Group = models.Group;
var loginControl = require('connect-ensure-login');

module.exports = function (app) {

  app.get('/hello', function(req, res){
    var dataEJS = {};
    dataEJS.page_title = 'My Beautiful Title';
    dataEJS.page_body = 'My Beautiful Content';
    res.render('layout.ejs', dataEJS);
  });

  app.get('/', function (req, res) {
    res.render('index.ejs', { user : req.user, page_title: 'StudyBuddy: connect with your classmates'});
  });

  app.get('/register', function(req, res) {
      res.render('register.ejs', { msg: "", page_title: 'Register for StudyBuddy'});
  });

  app.post('/register', function(req, res) {
    console.log("Routing a request for: /register");
    if (req.body.email.indexOf('@') > -1 && req.body.email.substr(req.body.email.length - 9) === 'upenn.edu') {
      Account.register(new Account({ username : req.body.email }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register.ejs', { msg: "That email already exists. Try again." });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });

        // passport.authenticate('local')(req, res, function () {
        //   res.redirect('/');
        // });
      })
    } else {
      res.render('register.ejs', { msg: 'Valid Penn address required', page_title: 'StudyBuddy | Register' });
    }
  });

  app.get('/login', function(req, res) {
    console.log("Routing a request for: /login");
    res.render('login.ejs', { user : req.user, msg: '', page_title: 'StudyBuddy | Login' });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/logout', function(req, res) {
      console.log("Routing a request for: /logout");
      req.logout();
      res.redirect('/');
  });

  // app.get('/canvas',
  //   passport.authorize(''));

  app.get('/user', loginControl.ensureLoggedIn('/login'),
    function(req,res){
      res.render('user.ejs', {user: req.user})
    });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

};