/*
* author  => Peek International
* designBy => Peek International
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
	'userId': { // included for better usage
		type: Schema.ObjectId,
		ref: 'users'
	},
	'todo': String,
	'assignId': { // included for better usage
		type: Schema.ObjectId,
		ref: 'users'
	},
	'assignFrom': { // included for better usage
		type: String,
		ref: 'users'
	},
	'assignTo': String,
	"status":{
		type:String,
		default: 0
	},
	"assignDate":{
		type:Date,
		default: null
	},
	"projectId": {
		type: String
	}
},
	{ timestamps: true });



module.exports = mongoose.model('todos', todoSchema);
