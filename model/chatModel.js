/*
* author  => Peek International
* designBy => Peek International
*/
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
	"senderId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	"receiverId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	"commentId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'chat'
	},
	"groupId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'groups'            // if isGroup is 1 then there will be groupId and no receiver id          
	},
	"message": {
		type: String,
		default: ""
	},
	"messageType": {
		type: Number,     // 0- Normal, 1- Image, 2- Text, PDF etc.., 3- Call, 4- Links, 5- Videos, 6- Audio Recordings, 7- Location
		default: 0
	},
	"chatType": {
		type: Number,     // 0- Comment, 1- Reply, 2- Broadcast Chat
		default: 0
	},
	"status": {
		type: Number,
		default: 1        //1=Active, 0=Deleted (means real remove)
	},
	"isSeen": {
		type: Number,
		default: 0        // 0=No, 1=Yes
	},
	"isDeleted": {        // normal delete (means- on this delete, it show message on frontend, that "message is deleted")
		type: Number,
		default: 0
	},
	"deletedBy": [{
        type: Schema.ObjectId,
        ref: 'users'
    }],
	"isGroup": {
		type: Number,
		default: 0        //0=No[O2O], 1=Group, 2=Room
	},
	"bookmarked":{
		type: Number,
		default: 0        //0=No, 1=Yes
	},
	"bookmarkedChat": [{
		type: Schema.ObjectId,
        ref: 'users'
	}],
	"projectId": {
		type: String
	},
	"receiptStatus":{
		type: Number,
		default: 1        //0= messages can't be seen, 1= messages can be seen
	},
	"hide": {
		type: Number,
		default: 0        //0= msg not hidden, 1= msg hidden
	}
}, { timestamps: true });

module.exports = mongoose.model('chat', chatSchema)