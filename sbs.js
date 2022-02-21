const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const userModel = require('./model/users-model');
const bodyParser = require('body-parser');
// const webpush = require('web-push');
const cors = require('cors');
const sslConfig = require('./ssl-config');
var os = require('os');
var ifaces = os.networkInterfaces();
const passport = require('passport');


const firebaseAdmin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount)
});


var keysOpt = {};
var serverIpAdd = [];
Object.keys(ifaces).forEach(function (ifname) {
	var alias = 0;
	ifaces[ifname].forEach(function (iface) {
		if (('IPv4' !== iface.family || iface.internal !== false) && iface.address != '127.0.0.1') return;
		//	console.log(alias, ' and ', iface.address, ' and ', iface.family, ' and ', iface.internal);
		if (alias < 1) serverIpAdd.push(iface.address);
		++alias;
	});
});


if (serverIpAdd.includes('192.241.139.188')) {
	keysOpt = {
		key: sslConfig.keyJcm,
		cert: sslConfig.certJcm,
	};
}

const server = require('https').Server(keysOpt, app);
const io = require('socket.io')(server);
// const io = require('./public/js/muaz/socket.io')(server);
const config = require('./config/DB');

/**  */
//*****
//*****
//mongo db connection 
//*****
//*****
//mongodb://localhost/kstreams
//const db = "./config/DB";
mongoose.Promise = global.Promise;
mongoose.set('returnOriginal', false);
mongoose.connect(config.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
	() => {
		console.log('Database is connected')
	},
	err => {
		console.log('Cannot connect to the database' + err)
	}
);

const publicVapidKey = 'BOkWsflrOnCVOs19RXCMiHl-tAbRzKC3BlAwxzTo7rJYWGAgGFzDweF9jgSvlZ17AwV-fIlXPRxPVp_-Hr9gwk4';
const privateVapidKey = '52YWJRrW8wan8J8hon6w4MP7QTKPrvIzKCENPe7vTXM';
//const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
//const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// webpush.setVapidDetails('https://localhost:22000/#!/', publicVapidKey, privateVapidKey);

//*****
//*****
// define all variable used in app
//*****
//***** 
var users = [];

//const publicVapidKey = 'BEU-89R8Bp4KeZEjOSQtFj-3aBvwgFE8iJ20y4CG2H4Mwip9jaX8dkldWsOPJtnp7fcqnQR1FbzVZeQ1YD7N5tA';
//const privateVapidKey = 'ntLibayiqZ-KpIC5swgVRep2ywsbn6zEVC0sS10mnaQ';
const port = 22000;
var authUser;


//*****
//*****
// middle ware area 
//*****
//*****

const corsOptions = {
	origin: ["https://demo.peekchat.live", "https://peekchat.live", "https://turn.chatto.jp"], //the port my react app is running on. https://alllinkshare.com   / https://searchbysearch.com
	credentials: true,
};

app.use(cors(corsOptions));
app.use(session({
	secret: "kstreams@123",
	resave: false,
	saveUninitialized: false,
	//cookie: { secure: false }
})); //resave changed to 'true'

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static('public'));
app.use(express.static('images'));

// Provide access to node_modules folder
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));
/*get data from url and encode in to json*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------- Deprecated -----------
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use(bodyParser.json());

const registrationRoute = require('./routes/registration.routes');
const groupsRoute = require('./routes/groups.routes');
const projectRoute = require('./routes/projects.routes');
const friendRoute = require('./routes/friends.routes');

app.use('/business', registrationRoute);
app.use('/groups', groupsRoute);
app.use('/projects', projectRoute);
app.use('/friends', friendRoute);

//****
//****
// push notification code 
//****
//****
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log('vapidKeys: ',publicVapidKey,' and ',privateVapidKey);
// webpush.setVapidDetails('mailto:muhammadsajid9005@gmail.com', publicVapidKey, privateVapidKey);

// app.post('/subscribe', (req, res) => {

// 	//Get push subcription object
// 	const subscription = req.body.subscription;
// 	//send 201 resource created
// 	res.status(201).json({});
// 	//create payload
// 	const payload = JSON.stringify({
// 		title: req.body.title
// 	});
// 	//pass object into send notification
// 	webpush.sendNotification(subscription, payload).catch(err => console.error(err));
// });


server.listen(port, () => {
	// eslint-disable-next-line no-console
	console.info('listening on %d', port);
});

require('./serverRoutes')(app, io, saveUser);


/* save the current login user info in a variable */
function saveUser(user) {
	authUser = user;
	setUserStatus(1, authUser._id);
}
//*****
//*****
// socket io events area 
//*****
//*****
function setUserStatus(status, userId) {
	userModel.update({
		'_id': userId
	}, {
		'onlineStatus': status
	}).exec();
}

io.on('connection', function (socket) {
	console.log("SOCKET CONNECTION");

	var address = socket.handshake.address;
	console.log('New connection from ' + address + ':' + address);
	socket.on('user_connected', (data) => {
		socket.userId = data.userId;
		setUserStatus(1, socket.userId);

		io.emit('front_user_status', {
			'userId': socket.userId,
			'status': 1
		});
	});

	/* disconnect user */
	socket.on('disconnect', function () {
		console.log("disconnect");
		setUserStatus(0, socket.userId);
		io.emit('front_user_status', {
			'userId': socket.userId,
			'status': 0
		});
	});

	module.exports.authUser = authUser;
	socket.username = "Anonymous";

	/////////////////////////VUEJS/////////////////////

	//////// send and receive msg ////////// 
	socket.on('message', (data) => {
		io.emit('birdsreceivemsg', data);
	});

	///////start typing/////////
	socket.on('alphamsgtyping', (data) => {
		io.emit('alphastarttyping', data)
	});
	
	//////// stop typing/////////
	socket.on('alphastopTyping', (data) => {
		io.emit('alphastoptyping', data)
	});

	//////// PeekChat Demo send and receive msg ////////// 
	socket.on('peekMessage', (data) => {
		io.emit('peekChatReceivemsg', data);
	});

	socket.on('peekUpdateUserSelection', (data) => {
		io.emit('peekReceiverUserStatus', data);
	});

	///////start typing/////////
	socket.on('peekMsgTyping', (data) => {
		io.emit('peekStartTyping', data)
	});

	//////// stop typing/////////
	socket.on('peekStopTyping', (data) => {
		io.emit('peekStopTyping', data)
	});
	//////// update chatmsg //////////   
	socket.on('peekUpdateChatMsg', (data) => {
		io.emit('peekReceiveUpdateChatMsg', data);
	});
	// Peek Call 
	socket.on('peekUpdateCallStatus', (data) => {
		io.emit('peekReceiveupdateCallStatus', data);
	});
	/////////// Peek O2O CALL  ////////// 

	socket.on('peekO2OcloseReceiverPanal', (data) => {
		io.emit('peekO2OReceiverPanal', data);
	});

	socket.on('peekO2OstarTimer', (data) => {
		io.emit('peekO2OreceivestarTimer', data);
	});
	// //////////  End PeekChat Demos //////////
	socket.on('sendmsg', (data) => {
		io.emit('receivemsg', data);
	});

	//////// send and receive chatmsgid //////////   
	socket.on('lastchatobj_send', (data) => {
		io.emit('lastchatobj_receive', data);
	});

	//////// send and receive chatmsgid //////////   
	socket.on('sendid', (data) => {
		io.emit('receiveid', data);
	});

	socket.on('updateUserSelection', (data) => {
		io.emit('receiverUserStatus', data);
	});
	//////// update chatmsg //////////   
	socket.on('updatechatmsg', (data) => {
		io.emit('receiveupdatechatmsg', data);
	});


	//////Delete chat //////////
	socket.on('senderdeletemsg', (data) => {
		io.emit('reciverdeletemsg', data);
	});

	///////start typing/////////
	socket.on('msgtyping', (data) => {
		io.emit('starttyping', data)
	});

	//////// stop typing/////////
	socket.on('stopTyping', (data) => {
		io.emit('stoptyping', data)

	});

	////////// Group chat /////////

	socket.on('getGroups', (data) => {
		io.emit('receiveGroups', data);
	});

	socket.on('sendgroupmsg', (data) => {
		io.emit('receivegroupmsg', data);
	});

	socket.on('groupsendid', (data) => {
		io.emit('groupreceiveid', data);
	});

	socket.on('updateGroupchatmsg', (data) => {
		io.emit('receiveupdateGroupchatmsg', data);
	});

	socket.on('updateGroupTitle', (data) => {
		io.emit('receiveGroupTitle', data);
	});

	socket.on('deleteGroup', (data) => {
		io.emit('receivedeleteGroup', data);
	});

	socket.on('updateMembers', (data) => {
		io.emit('receiveupdateMembers', data);
	});

	socket.on('grpsenderdeletemsg', (data) => {
		io.emit('grpreciverdeletemsg', data);
	});


	///////////////////Room/////////////////////
	socket.on('roomsendmsg', (data) => {
		io.emit('receiveRooms', data);
	});

	socket.on('createroom', (data) => {
		io.emit('receivecreateroom', data);
	});

	socket.on('updateroom', (data) => {
		io.emit('receiveupdateroom', data);
	});
	socket.on('deleteroom', (data) => {
		io.emit('receivedeleteroom', data);
	});
	socket.on('roomsendid', (data) => {
		io.emit('receiveroomid', data);
	});

	socket.on('senderroomdeletemsg', (data) => {
		io.emit('receiveroomdeletemsg', data);
	});

	socket.on('updateRoomCallStatus', (data) => {
		io.emit('_updateRoomCallStatus', data);
	});

	socket.on('leaveRoomCall', (data) => {
		io.emit('_leaveRoomCall', data);
	});

	//////// update chatmsg //////////   
	socket.on('updateroomchatmsg', (data) => {
		io.emit('receiveroomupdatechatmsg', data);
	});

	////////////group call /////////
	socket.on('sendGroupdetail', (data) => {
		io.emit('receiveGroupdetail', data);
	});

	///////////////////// Pause and Play Video ////////////////////////

	socket.on('sendvideoPausecall', (data) => {
		io.emit('receivevideoPausecall', data);
	});

	socket.on('sendvideoPlaycall', (data) => {
		io.emit('receivevideoPlaycall', data);
	});


	/////////////////////////////////////////////////// BROADCAST  ////////////////////////////////////////////////////

	socket.on('closebroadcastpanel', (data) => {
		io.emit('receiveClosepanle', data);
	});

	socket.on('broadcastmsg', (data) => {
		io.emit('receivebroadcastmsg', data);
	});

	/////////// O2O CALL  ////////// 

	socket.on('O2OcloseReceiverPanal', (data) => {
		io.emit('O2OReceiverPanal', data);
	});

	socket.on('O2OstarTimer', (data) => {
		io.emit('O2OreceivestarTimer', data);
	});

	//////// REQUEST STATUS UPDATE ////////// 

	socket.on('updateRequeststatus', (data) => {
		io.emit('receiveRequeststatus', data);
	});


	///////////////// Busy Call Status //////////////
	socket.on('updateCallStatus', (data) => {
		io.emit('receiveupdateCallStatus', data);
	});
	socket.on('createCallstatus', (data) => {
		io.emit('receivecreateCallstatus', data);
	});
	socket.on('notification', (data) => {
		io.emit('receivenotification', data);
	});


	// //////////////////////////// MEETING /////////////////////////////////////////////////////////////////////////////////
	socket.on('meetingMsg', (data) => {
		io.emit('receiveMeetingmsg', data);
	});
	socket.on('meetingshare', (data) => {
		io.emit('receivemeetingshare', data);
	});
	socket.on('meetingsharestop', (data) => {
		io.emit('receivemeetingsharestop', data);
	});

	socket.on('startMeeting', (data) => {
		io.emit('receiveStartMeeting', data);
	});
	socket.on('handRaiseStatus', (data) => {
		io.emit('receiveHandRaiseStatus', data);
	})

	socket.on('updateAudioStatus', (data) => {
		io.emit('_updateAudioStatus', data);
	})
	socket.on('updateVideoStatus', (data) => {
		io.emit('_updateVideoStatus', data);
	})
	socket.on('createmeeting', (data) => {
		io.emit('receivecreatemeeting', data);
	})
	// /////////////// ----- /////////////////////

	socket.on('changeStatus', (data) => {
		io.emit('receivechangeStatus', data);
	});
	socket.on('login', (data) => {
		if (data) userModel.update({ '_id': data }, { 'onlineStatus': 1, "callStatus": 0 }).exec();
		io.emit('changestatuslogin', data);
	});

	socket.on('logout', (data) => {
		io.emit('changestatuslogout', data);
	});

	socket.on('disconnect', function () {
	});

	socket.on('stopscreenshare', function (data) {
		io.emit('receivestopScreenshare', data);
	});
	socket.on('screenUrl', function (data) {
		io.emit('receivescreenUrl', data);
	});
	socket.on('groupstopscreenshare', function (data) {
		io.emit('receivegroupstopScreenshare', data);
	});
	socket.on('groupscreenUrl', function (data) {
		io.emit('receivegroupscreenUrl', data);
	});

	socket.on('sendGroupclose', function (data) {
		io.emit('receiveGroupclose', data);
	});

	socket.on('groupcallclose', function (data) {
		io.emit('receivegroupcallclose', data);
	});

	socket.on('leaveAndroidUser', function (data) {
		io.emit('_leaveAndroidUser', data);
	});

	socket.on('updateControlStatus', function (data) {
		io.emit('_updateControlStatus', data);
	});

	socket.on('updateReadReceipt', function (data) {
		io.emit('receiveUpdateReadReceipt', data);
	});

	socket.on('updatesetvideo', function (data) {
		io.emit('receiveupdatesetvideo', data);
	})

	socket.on('updatesetaudio', function (data) {
		console.log("updatesetaudio");
		io.emit('receiveupdatesetaudio', data);
	});

	socket.on('receiveCall', function (data) {
		io.emit('receiveCalls', data);
	});

	socket.on('stopCall', function (data) {
		io.emit('receivestopCall', data);
	});

	socket.on('_isRinging', function (data) {
		io.emit('isRinging', data);
	});

	socket.on('updateUsername', function (data) {
		io.emit('_updateUsername', data);
	});

	socket.on('meetingRecordFile', function (data){
		// console.log("meetingRecordFile: ", data);
		io.emit('_meetingRecordFile', data);
	});

	// /////////////////////////// NOTIFICATION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	socket.on('sendNotification', function () {
		io.emit('receiveNotification');
	});

	socket.on("calledNotify", function (){
		console.log("calledNotify");
	});
});

// ****************************************************************************************************************
// *******************************************************************************************************************
// *****************************************************************************************************************


app.post('/pauseChatFunc', (req, res) => {
	io.emit('pauseChatFunctionality', req.body.chatId); // this emitted function is after line#900
	res.status(200).json({});
});

app.post('/updateSSstatus', (req, res) => {
	io.emit('updateScreenshareStatus', req.body);
	res.status(200).json({});
});

app.post('/gCallStatus', (req, res) => {
	io.emit('gCallStatusUpdater', req.body);
	res.status(200).json({});
})

app.post('/externalLogout/:userId/:projectId', (req, res) => {
	userModel.update({
		'_id': req.params.userId,
		'projectId': req.params.projectId
	}, {
		'onlineStatus': 0, "callStatus": 0
	}).exec();

	let userData = {
		'userId': req.params.userId,
		'projectId': req.params.projectId
	};

	io.emit('_externalLogout', userData);
	res.status(200).json({});
})

app.get('/mobileLogout/:userId/:projectId', (req, res) => {
	userModel.update({
		'_id': req.params.userId,
		'projectId': req.params.projectId
	}, {
		'onlineStatus': 0, "callStatus": 0
	}).exec();

	let userData = {
		'userId': req.params.userId,
		'projectId': req.params.projectId
	};

	io.emit('_externalLogout', userData);
	res.status(200).json({});
})

app.post('/stopscreenshare', (req, res) => {
	console.log("stopscreenshare: ", req.body);
	io.emit('receivestopScreenshare', req.body);
	res.status(200).json({});
})

app.post('/startscreenshare', (req, res) => {
	console.log("startscreenshare: ", req.body);
	io.emit('receivescreenUrl', req.body);
	res.status(200).json({});
})

var serveStatic = require('serve-static');
const { SSL_OP_NO_TICKET } = require('constants');
app.use(serveStatic('./'));
//app.use(express.static(path.join(__dirname, "client")));