/*
* author  => Peek International
* designBy => Peek International
*/

const mongoose = require("mongoose");

const replySchema = mongoose.Schema({

    "commentId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    },
    "senderId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    "receiverId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    "groupId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'            //If isGroup is 1 then there will be groupId and no receiver id          
    },
    "projectId": {
		type: String
	},
    "message": String,
    "messageType": {
        type: Number,    // 0- Normal , 1- Image, 2- Text, PDF etc..
        default: 0
    },
    "status": {
        type: Number,
        default: 1        //1=Active, 0=Deleted
    },
    "isDeleted": {
        type: Number,
        default: 0
    },
    "isGroup": {
        type: Number,
        default: 0        //0=No, 1=Yes
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('replies', replySchema);