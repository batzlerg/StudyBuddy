var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	courses: { type : Array , "default" : [] }
});
var Course = new Schema({
	subject: String,
	number: Number,
	groups: { type: Array, "default" : [] }
});
var Group = new Schema({
	date: Date,
	start: String,
	end: String,
	location: String
});

Account.plugin(passportLocalMongoose);

module.exports.Account = mongoose.model('Account', Account);
module.exports.Course = mongoose.model('Course', Course);
module.exports.Group = mongoose.model('Group', Group);
// module.exports = mongoose.model('Account', Account);





// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema({
//     	Account: {
//     		username: String,
//     		password: String,
//     		courses: { type : Array , "default" : [] }
//     	},
//     	Course: {
//     		subject: String,
//     		number: Number,
//     		groups: { type: Array, "default" : [] }
//     	},
//     	Group: {
//     		date: Date,
//     		start: String,
//     		end: String,
//     		location: String
//     	}
//     });

//     var Account = new Schema({
//    		username: String,
//     	password: String,
//     	courses: { type : Array , "default" : [] }
//     });

//     passportLocalMongoose = require('passport-local-mongoose');

// Account.plugin(passportLocalMongoose);

// module.exports.Account = mongoose.model('Account', Account);
// module.exports.Course = mongoose.model('Course', Course);
// module.exports.Group = mongoose.model('Group', Group);
// // module.exports = mongoose.model('Account', Account);