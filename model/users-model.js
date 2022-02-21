const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
	'userId': { type: String, default: '' },
	"projectId": { type: Schema.ObjectId, ref: 'projects' },
	"chatWithRefId": { type: String, default: '' },
	'name': { type: String, default: '' },
	'gender': { type: String, default: 'male' },
	'email': { type: String, default: '' },
	"user_image": { type: String, default: '' },
	"phone": { type: String, default: '' },
	"birth": { type: String, default: '' },
	"country": { type: String, default: '' },
	'password': { type: String, default: '' },
	"updatedByMsg": { type: Date, default: Date.now },  // updated time according to which user has been messaged
	"userTitle": { type: String, default: '' },        // Title of the User coming from any connected project (e.g. Teacher)
	"userProfileUrl": { type: String, default: '' },
	"onlineStatus": { type: Number, default: 1 },
	"seenStatus": { type: Number, default: 1 },
	"readReceipts": { type: Number, default: 1 },
	"isAdmin": { type: Number, default: 0 },
	"emailConfirm": { type: Number, default: 0 },
	"languageCode": { type: String, default: 'en' },
	"status": { type: Number, default: 1 },     // deleted=0(No use)/ active=1/ inActive=2/ 3= deActivated
	"pStatus": { type: Number, default: 0 },   // active=0/away=1/dNotDisturb=2/Invisible=3/Offline=4/Hide=5
	"isGroup": { type: Number, default: 0 },  // for mobileApp, to tell them is this entity a user or group
	"lastActiveTime": { type: Date, default: Date.now() },
	"callStatus": { type: Number, default: 0 },
	"favourite": { type: Number, default: 0 },
	"token": { type: String, default: '' },  // contains: Token on password reset case / SMS code on account verification case
	"fcm_id": { type: String, default: '' },
	"rememberMe": { type: Number, default: 0 },
	"voiceCallReceive": { type: Number, default: 1 },
	"videoCallReceive": { type: Number, default: 1 },
	"secretKey": { type: String, default: '' },
	"qr_code": { type: String, default: '' },
	"ring": { type: String, default: '' },
	"ring_id": { type: Schema.ObjectId, ref: 'rings', default: null },
	"r_read": { type: Number, default: 0 },
	"about_url": { type: String, default: "" },
	"terms_url": { type: String, default: "" },
	
	"clearedUsersChat": [{        // 0- chat is not deleted/cleared, 1- chat is cleared using 'deleteAllChat API'
		type: Schema.ObjectId,    // contains ID's of those users whose chat are deleted using 'deleteAllChat API'
		ref: 'users'
	}],
	"clearedUsersGroupChat": [{     // 0- chat is not deleted/cleared, 1- chat is cleared using 'deleteAllChat API'
		type: Schema.ObjectId,      // contains ID's of those users whose chat are deleted using 'deleteAllChat API'
		ref: 'groups'
	}],
	"blockedUsers": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"blockedGroups": [{
		type: Schema.ObjectId,
		ref: 'groups'
	}],
	"hiddenUsers": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"hiddenGroups": [{
		type: Schema.ObjectId,
		ref: 'groups'
	}],
	"mutedUsers": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"mutedGroups": [{
		type: Schema.ObjectId,
		ref: 'groups'
	}],
	"hiddenO2OChatUsers": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"hiddenGroupChatUsers": [{
		type: Schema.ObjectId,
		ref: 'groups'
	}]
},
	{ timestamps: true });

// userSchema.pre('save', function (next) {
// 	var user = this;
// 	if (!user.isModified('password')) return next();

// 	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
// 		if (err) return next(err);

// 		bcrypt.hash(user.password, salt, function (err, hash) {
// 			if (err) return next(err);

// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

userSchema.methods.generateJWT = function () {
	console.log("generateJWT");
	//	const today = new Date();
	//	const expirationDate = new Date(today);
	//  expirationDate.setDate(today.getDate() + 60);

	console.log("userId: ", this._id, 'projectId: ', this.projectId);
	return jwt.sign({
		id: this._id,
		name: this.name,
		email: this.email
		// exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, 'secret');
}

userSchema.methods.toAuthJSON = function () {
	console.log("toAuthJSON: " + this._id);
	return {
		_id: this._id,
		email: this.email,
		token: this.generateJWT(),
		userId: this.userId,
		projectId: this.projectId,
		chatWithRefId: this.chatWithRefId,
		name: this.name,
		email: this.email,
		user_image: this.user_image,
		phone: this.phone,
		country: this.country,
		// password: this.password,
		updatedByMsg: this.updatedByMsg,
		userTitle: this.userTitle,
		userProfileUrl: this.userProfileUrl,
		onlineStatus: this.onlineStatus,
		seenStatus: this.seenStatus,
		isAdmin: this.isAdmin,
		status: this.status,
		pStatus: this.pStatus,
		blockedUsers: this.blockedUsers,
		hiddenUsers: this.hiddenUsers
	};
};

module.exports = mongoose.model('users', userSchema);
