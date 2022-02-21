const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
	"senderId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	"receiverId": {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	"friendIds": [    // Only used for group, meeting, room and note cases
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			default: null
		}
	],
	"title": {
		type: String,
		default: ""
	},
	"body": {
		type: String,
		default: ""
	},
	"image": {
		type: String,
		default: ""
	},
	"readStatus": {
		type: Number,
		default: 0        //1= read, 0= unread
	},
	"status": {
		type: Number,
		default: 1        //1= Active, 0= unActive (deleted/removed)
	},
	"notificationType": {
		type: Number,
		default: 0  //0= normal chat, 1= group chat, 2= friend request, 3= request accepted, 4= request rejected, 5= normal note, 6= screenshot note, 7= missed call
	},
	"projectId": {
		type: String,
		default: "5d4c07fb030f5d0600bf5c03"
	}
}, { timestamps: true });

module.exports = mongoose.model('notifications', notificationSchema);