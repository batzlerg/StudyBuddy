// ================================================================================
// CONFIG =========================================================================
// ================================================================================

var passport = require('passport');
var models = require('./models/account');
  var Account = models.Account;
  var Course = models.Course;
  var Group = models.Group;
var loginControl = require('connect-ensure-login');

module.exports = function (app) {

// ================================================================================
// INDEX ==========================================================================
// ================================================================================

  app.get('/', function (req, res) {
    if (req.user) {
      console.log("logged in!");

      Account.findOne({ username: req.user.username }, function(err, docReturned) {
        var user_course_ids = docReturned.courses;
        console.log("USER COURSE IDS: " + user_course_ids);
        var user_courses = new Array();
        for (i=0; i<user_course_ids.length; i++) {
          Course.findOne({ _id: user_course_ids[i] }, function(err, result) {
            console.log("COURSE NAME LOOKUP: " + result);
            user_courses[i] = result.subject + " " + result.number;
            console.log("COURSE NAME: " + user_courses[i]);
          });
          console.log("looped " + i + " times and added \"" + user_course_ids[i] + "\"");
        }
        setTimeout(function(){
          res.render('index.ejs', { 
          user : req.user, 
          page_title: 'StudyBuddy: connect with your classmates',
          user_courses: user_courses
        })}, 20);
      });
        
    }  

    else {
      res.render('index.ejs', { user : req.user, page_title: 'StudyBuddy: connect with your classmates', user_courses: [] });
    }
  });

// ================================================================================
// REGISTER =======================================================================
// ================================================================================

  app.get('/register', function(req, res) {
      res.render('register.ejs', { msg: "", page_title: 'StudyBuddy | Register'});
  });

  app.post('/register', function(req, res) {
    console.log("Routing a request for: /register");
    if (req.body.email.indexOf('@') > -1 && req.body.email.substr(req.body.email.length - 9) === 'upenn.edu') {
      Account.register(new Account({ username : req.body.email }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register.ejs', { account:account, msg: "An account is already linked to that email" });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });

      });
    } else {
      res.render('register.ejs', { msg: 'Valid Penn address required', page_title: 'StudyBuddy | Register' });
    }
  });

// ================================================================================
// LOGIN/OUT ======================================================================
// ================================================================================

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

// ================================================================================
// COURSES ========================================================================
// ================================================================================
  app.post('/addcourse', loginControl.ensureLoggedIn('/login'),
    function(req,res){

      var entry = new Course ({
        subject: req.body.subject, 
        number: req.body.number
      });

      entry.save(function(err, docInserted){
        console.log(docInserted._id);
        var course_id = docInserted._id;
        if(err){
          console.log('Error on save to course db!');
        } else {
          // save to user account
          Account.update(
            { username: req.user.username },
            { $addToSet: { courses: course_id } },
            function(err){
              if(err){
                console.log('Error on save to user account!');
              }
            }
          );
        }
      });
      
      res.redirect('/');

    })

// ================================================================================
// STATIC =========================================================================
// ================================================================================

  app.get('/user', loginControl.ensureLoggedIn('/login'),
    function(req,res){
      res.render('user.ejs', {user: req.user})
  });

  app.get('/about', function(req,res){
      res.render('about.ejs', { page_title: 'StudyBuddy | About' });
  });

};