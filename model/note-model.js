const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    "note_title": {
        type: String,
    },

    "note_topic": {
        type: String,
    },

    'createdBy': {
        type: Schema.ObjectId,
        ref: 'users'
    },

    "note_date": {
        type: Date,
        default: null
    },

    "note_category": {
        type: String,
        default: ""
    },

    "status": {
        type: Number,
        default: 1       // 0= off, 1= on
    },

    "projectId": {
        type: String,
        default: "5d4c07fb030f5d0600bf5c03"
    },

    "note_members": [
        {
            type: Schema.ObjectId,
            ref: 'users'
        }
    ],
});

module.exports = mongoose.model('notes', noteSchema);