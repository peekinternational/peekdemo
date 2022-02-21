const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const one2oneCall = mongoose.Schema({
    "callerId": {
        type: Schema.ObjectId,
        ref: 'users'
    },
    "receiverId": {
        type: Schema.ObjectId,
        ref: 'users'
    },
    "callerName": {
        type: String,
    },
    "friendName": {
        type: String,
    },
    "status": {
        type: Number,
        default: 1  // 3= missed (Closed-by-Caller), 2= rejected, 5= closed, 1= (created but never started), 4= received (OnGoing), 6= receiverRejected
    },
    "projectId": {
        type: String,
    },
    "fullDeletedBy": [{
        type: Schema.ObjectId
    }],

    "callerLatestCallTime": {
        "all": {
            type: Date,
            default: null
        },
        "missed": {
            type: Date,
            default: null
        },
        "outgoing": {
            type: Date,
            default: null
        },
        "incomming": {
            type: Date,
            default: null
        }
    },
    "receiverLatestCallTime": {
        "all": {
            type: Date,
            default: null
        },
        "missed": {
            type: Date,
            default: null
        },
        "outgoing": {
            type: Date,
            default: null
        },
        "incomming": {
            type: Date,
            default: null
        }
    },

    "callHistory": [
        {
            type: new mongoose.Schema(
                {
                    "callerId": {
                        type: Schema.ObjectId,
                        ref: 'users'
                    },
                    'receiverId': {
                        type: Schema.ObjectId,
                        ref: 'users'
                    },
                    "senderStatus": {
                        type: Number,
                        default: 1
                    },
                    "receiverStatus": {
                        type: Number,
                        default: 1
                    },
                    "callTime": {
                        type: String,
                        default: ""
                    },
                    "callType": {
                        type: Number     // 0= video, 1= audio
                    },
                    "closedAt": {
                        type: Date,
                        default: null
                    },
                    "deletedBy": [{
                        type: Schema.ObjectId
                    }]
                }, { timestamps: true }
            )

        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('one2oneCall', one2oneCall)