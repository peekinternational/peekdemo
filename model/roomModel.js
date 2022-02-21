const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomModel = mongoose.Schema({

    "room_id": {
        type: String,
    },
    "room_title": {
        type: String,
    },
    "room_topic": {
        type: String,
    },
    "room_password": {
        type: String,
    },

    // "room_file": {
    //     type: String,
    //     default: ""
    // },
    "room_file": [
		{
			type: new mongoose.Schema(
				{
					"filename": {
						type: String
					}
				}
			)
		}
	],

    'createdBy': {
        type: Schema.ObjectId,
        ref: 'users'
    },

    "activeStatus": {
        type: Number,
        default: 0       // 0= not started, 1= started, 2= completed
    },
    "activeMembersCount" : {
        type: Number,
        default: 0       
    },

    // "onGoingCallMembers" : [
    //     {
    //         type: Schema.ObjectId,
    //         ref: 'users'
    //     }
    // ],

    "status": {
        type: Number,
        default: 1       // 0= off, 1= on
    },

    "projectId": {
        type: String,
    },

    "room_friends": [
        {
            type: Schema.ObjectId,
            ref: 'users'
        }
    ],

    "scheduleTypeName": { type: String },
    "scheduleWeekDays": [],
    "scheduleStartDate": { type: Date, default: Date.now() },
    "scheduleStartTime": { type: String, default: "null" },

    "room_timezone": {
        type: String,
        default: ""
    },
    // "scheduleType": [
    //     {
    //         typeName: { type: String },

    //         days: [],

    //         startDate: {
    //             type: Date,
    //             default: Date.now()
    //         },
    //         startTime: {
    //             type: String,
    //             default: "null"
    //         }
    //     }
    // ],

    "closedAt": {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('rooms', roomModel)