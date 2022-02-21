
var app= require('express')();
var server = require('http').Server(app);	//var server = require('https');//.Server(app);
var io= require('socket.io')(server);	
var redis= require('redis');	
//var redis= require('redis');
var io= require('socket.io')(server);
server.listen(6998);


io.on('connection', function (socket) {
    console.log('start');
 //////// send and receive msg //////////   
      socket.on('sendmsg', (data) => {
		console.log(data);
		io.emit('receivemsg',data);
	});

//////// send and receive chatmsgid //////////   
      socket.on('lastchatobj_send', (data) => {
		console.log(data);
		io.emit('lastchatobj_receive',data);
	});

	//////// send and receive chatmsgid //////////   
      socket.on('sendid', (data) => {
		console.log(data);
		io.emit('receiveid',data);
	});

socket.on('updateUserSelection', (data) => {
	console.log(data);
		io.emit('receiverUserStatus', data);
	});
//////// update chatmsg //////////   
      socket.on('updatechatmsg', (data) => {
		console.log(data);
		io.emit('receiveupdatechatmsg',data);
	});


//////Delete chat //////////
 socket.on('senderdeletemsg', (data) => {
		console.log(data);
		io.emit('reciverdeletemsg',data);
	});
 
///////start typing/////////
        socket.on('msgtyping', (data) => {
	      console.log(data);
	         io.emit('starttyping', data)
	      
    });

//////// stop typing/////////
        socket.on('stopTyping', (data)=>{
	      console.log(data);
	         io.emit('stoptyping', data)
	      
    });

//////////group chat /////////
socket.on('getGroups', (data) => {
		console.log(data);
		io.emit('receiveGroups',data);
	});

 socket.on('sendgroupmsg', (data) => {
		console.log(data);
		io.emit('receivegroupmsg',data);
	});

  
      socket.on('groupsendid', (data) => {
		console.log(data);
		io.emit('groupreceiveid',data);
	});

	   socket.on('updateGroupchatmsg', (data) => {
		console.log(data);
		io.emit('receiveupdateGroupchatmsg',data);
	});

	  socket.on('updateGroupTitle', (data) => {
		console.log(data);
		io.emit('receiveGroupTitle',data);
	});

	 socket.on('deleteGroup', (data) => {
		console.log(data);
		io.emit('receivedeleteGroup',data);
	});

	socket.on('updateMembers', (data) => {
		console.log(data);
		io.emit('receiveupdateMembers',data);
	});
	
 socket.on('grpsenderdeletemsg', (data) => {
		console.log(data);
		io.emit('grpreciverdeletemsg',data);
	});
	
/////////// BROADCAST  ////////// 


	  socket.on('closebroadcastpanel', (data) => {
		console.log(data);
		io.emit('receiveClosepanle',data);
	});
	
	 socket.on('broadcastmsg', (data) => {
		console.log(data);
		io.emit('receivebroadcastmsg',data);
	});

/////////// O2O CALL  ////////// 

 socket.on('O2OcloseReceiverPanal', (data) => {
		console.log(data);
		io.emit('O2OReceiverPanal',data);
	});
	
	socket.on('O2OstarTimer', (data) => {
		console.log(data);
		io.emit('O2OreceivestarTimer',data);
	});

 //////// REQUEST STATUS UPDATE ////////// 
	
 socket.on('updateRequeststatus', (data) => {
		console.log(data);
		io.emit('receiveRequeststatus',data);
	});


///////////////// Busy Call Status //////////////
 socket.on('updateCallStatus', (data) => {
		console.log(data);
		io.emit('receiveupdateCallStatus',data);
	});
 //////// LOGIN AND LOUT ////////// 
	
 socket.on('login', (data) => {
		console.log(data);
		io.emit('changestatuslogin',data);
	});
	
socket.on('logout', (data) => {
		console.log(data);
		io.emit('changestatuslogout',data);
	});

    socket.on('disconnect', function() {
        
        console.log('disconnect');
    });
    
});