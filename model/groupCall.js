const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupCall = mongoose.Schema({
	"members": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"fixedJoinedMembers": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"groupId": {
		type: Schema.ObjectId,
		ref: 'groups'
	},
	"projectId": {
		type: String,
	},
	"callerId": { // included for better usage
		type: Schema.ObjectId,
		ref: 'users'
	},
	"receiverId": {     // BOGUS FIELD , ONLY USED FOR MOBILE SCENARIO TO GET RID OF ERROR
		type: Schema.ObjectId,
		default: null 
	},
	'callType': {
		type: Number,
		default: 0 
	},
	"callTime": {
		type: String,
		default: ""
    },
	'createdBy':{
		type: Schema.ObjectId,
		ref: 'users'
	}, 
	"status": {
		type: Number,
		default: 1       //1=Active, 0=closed                    [[[[[// 3= missed, 2= rejected , 1= accepted/closed, 0= received]]]]]
	},
	"closedAt":{
		type:Date,
		default: null
	}
}, { timestamps: true });

module.exports = mongoose.model('groupCall', groupCall)