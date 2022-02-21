/*
* author  => Nabeel
* designBy => Peek International
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingModel = mongoose.Schema({

	"meeting_id": {
		type: String,
	},
	"meeting_title": {
		type: String,
	},
	"meeting_zone": {
		type: String,
		// ref: 'projects'
	},
	"meeting_notification": {
		type: String,
	},
	"meeting_topic": {
		type: String,
		// ref: 'projects'
	},
	"meeting_password": {
		type: String,
		// ref: 'projects'
	},
	"meeting_time": {
		type: String,
		// ref: 'projects'
	},
	"meeting_date": {
		type: Date,
		// ref: 'projects'
	},
	"meeting_duration": {
		type: String,
		// ref: 'projects'
	},
	"meeting_endDate": {
		type: Date,
		default: null
	},
	"meeting_file": {
		type: String,
		default: ""
		// ref: 'projects'
	},
	// "meeting_file": [],
	
	"recorded_file": {
		type: String,
		default: ""
	},
	'createdBy': {
		type: Schema.ObjectId,
		ref: 'users'
	},
	"activeStatus": {
		type: Number,
		default: 0     //1= started, 0= not started
	},
	"status": {
		type: Number,
		default: 1       //1= not-completed, 0=completed
	},
	"projectId": {
		type: String,
	},
	// "meeting_memebers": {
	// 	type: String,
	// 	// ref: 'projects'
	// },
	"meeting_members": [
		// {
		// 	memberEmail: {
		// 		type: String,
		// 	},
		// 	startDate: {
		// 		type: Date,
		// 		default: Date.now()
		// 	},
		// 	endDate: {
		// 		type: Date,
		// 		default: null
		// 	},
		// 	hasLeft: {
		// 		type: Number,
		// 		default: 0
		// 	}
		// }
	],
	"friend_members": [],
	"closedAt": {
		type: Date,
		default: null
	}
}, { timestamps: true });

module.exports = mongoose.model('meetings', meetingModel)