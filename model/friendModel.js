const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    "userId": {
        type: Schema.ObjectId,
        ref: 'users'
    },
    "friendId": {
        type: Schema.ObjectId,
        ref: 'users'
    },
    "projectId": {
        type: String,
		// ref: 'projects'
    },
    "updatedByMsg": {
        type: Date, default: Date.now
    }, // updated time according to which user has been messaged
    "status": { 
        type: Number, default: 1 // 0- nothing, 1- request accepted, 2- request send, 3- request rejected
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('friends', friendSchema);