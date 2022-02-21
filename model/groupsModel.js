const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema({
	"members": [{
		type: Schema.ObjectId,
		ref: 'users'
	}],
	"projectId": {
		type: Schema.ObjectId,
		ref: 'projects'
	},
	"name": String,
	"creatorUserId": {
		type: Schema.ObjectId,
		ref: 'users'
	},
	"status": {
		type: Number,
		default: 1        //1=Active, 0=Deleted
	},
	"updatedByMsg": { type: Date, default: Date.now },  // updated time according to which user has messaged
	"group_image": { type: String, default: '' },
	"isGroup": {type: Number, default: 1} // for mobileApp, to tell them is this entity a user or group
}, { timestamps: true });

module.exports = mongoose.model('groups', groupSchema)