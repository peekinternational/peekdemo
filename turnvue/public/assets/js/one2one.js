
const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = 0
var O2OSoc;
var o2oReqUrl = 'wss://' + "peekvideochat.com" + ':8443/one2one';
var O2O_ws = new WebSocket(o2oReqUrl);
var o2oSocConEst = false;
var userBusy = false;
var showVideo = true;
var openVoice = true;
var webRtcO2OPeer = null;
var callerId = 0;
var friendId = 0;
var callType = '';
var inComCallData = 0;
var c_userData = JSON.parse(localStorage.getItem('userData'));
var recording;

//console.log(c_userData);
// o2oSocConnec();

window.onbeforeunload = function () {
   // console.log("onbeforeunload");
    O2O_ws.close();
}

O2O_ws.onopen = function (message) {
    if (!c_userData) return;
    
   // console.log("onopen");
    sendKMessage({
        id: 'register',
        isFromAndroid: false,
        name: c_userData._id  //set loggedIn userId here
    });

    setCallState(NO_CALL);
}

O2O_ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    //  console.info('Received message: ' + message.data);
    o2oSocConEst = true;
 //   console.info("++++ parsedMessage ++++");
  //  console.info(parsedMessage);
    switch (parsedMessage.id) {
        case 'registerResponse':
            // resgisterResponse(parsedMessage);
            break;
        case 'callResponse':
            callResponse(parsedMessage);
            break;
        case 'incomingCall':
            console.log('..incomingCall...');
            incomingCall(parsedMessage);
            break;
        case 'startCommunication':
            startCommunication(parsedMessage);
            break;
        case 'stopCommunication':
            console.info("Communication ended by remote peer");
            stopK(true);
            break;
        // case 'onIceCandidate': // testing purpose, needs reCheck
        //     webRtcO2OPeer.addIceCandidate(parsedMessage.candidate);
        //     break;
        case 'iceCandidate':
            webRtcO2OPeer.addIceCandidate(parsedMessage.candidate);
            break;
        default:
            console.error('Unrecognized message', parsedMessage);
    }
}

O2O_ws.onclose = function () {
    console.log("onclose");
    // o2oSocConnec();
}

O2O_ws.onerror = function () {
    console.log("onerror");
    // sendKMessage({
    //   id: 'register',
    //   name: c_userData._id  //set loggedIn userId here
    // });
    // o2oSocConnec();
}

function setCallState(nextState) {
    // switch (nextState) {
    //     case NO_CALL:
    //        // $('#videoCall').attr('disabled', false);  // related to VideoCall icon
    //        // $('#terminate').attr('disabled', true);
    //         break; 
    //     case PROCESSING_CALL:
    //        // $('#videoCall').attr('disabled', true); 
    //        // $('#terminate').attr('disabled', true);
    //         break;
    //     case IN_CALL:
    //       // $('#videoCall').attr('disabled', true);
    //       // $('#terminate').attr('disabled', false);
    //         break;
    //     default:
    //         return;
    // }

    callState = nextState;
}

function onIceCandidateO2O(candidate) {
    var message = {
        id: 'onIceCandidate',
        candidate: candidate,
        to: (c_userData._id == friendId) ? callerId : friendId,  //set userIds
        from: c_userData._id,
        isFromAndroid: false
    }
 //   console.log("... onIceCandidateO2O ...");
    //   console.log(message);
    sendKMessage(message);
}

function sendKMessage(message) {
    var jsonMessage = JSON.stringify(message);
    //   console.log('Sending message: ' + jsonMessage);
    O2O_ws.send(jsonMessage);
}

function callResponse(message) {
 //   console.log('... callResponse ...');
    // console.log(message);
    if (message.response != 'accepted') {
        // if (message.message != 'user declined'){
        //     $.toaster({
        //         priority: 'danger',
        //         title: 'Call Status',
        //         message: 'User is offline'
        //     });
        // }
        // else{
        //     $.toaster({
        //         priority: 'danger',
        //         title: 'Call Status',
        //         message: 'Call rejected by user'
        //     });
        // }
        // console.info('Call not accepted by peer. Closing call');
        var errorMessage = message.message ? message.message
            : 'Unknown reason for call rejection.';
        // updateCallerUI();
        o2oSocConEst = false;
        //ping();
        stopK(true);
    } else {
        setCallState(IN_CALL);
        webRtcO2OPeer.processAnswer(message.sdpAnswer);
    }
}

function stopK(message, friendId = 0) {
    setCallState(NO_CALL);
    if (webRtcO2OPeer) {
        webRtcO2OPeer.dispose();
        webRtcO2OPeer = null;
        userBusy = false;

        sendKMessage({
            id: 'stop',
            to: (c_userData._id == friendId) ? callerId : friendId,   //set userIds
            from: c_userData._id,
            isFromAndroid: false
        });
    }
    disconnect(friendId);
};


/*disconnect the call from user side who hit the disconnect button*/
function disconnect(friendId) {
    setCallState(NO_CALL);
    //leaveRoom();
    if (friendId) socket.emit('calldisconnect', { friendId: friendId });
}

function incomingCall(message) {
  //  console.log("userBusy:" + userBusy);
    if (userBusy) {
        var response = {
            id: 'incomingCallResponse',
            from: message.from,   //callerId
            to: c_userData._id,    //set userId here
            callResponse: 'reject',
            message: 'bussy',
            isFromAndroid: false
        };
        console.log("*********** BUSY *************");
        return sendKMessage(response);
    }

    showVideo = true;
    openVoice = true;
    setCallState(PROCESSING_CALL);

    console.log(message);
    callerId = message.userData.callerId;
    friendId = message.userData.friendId;
    callType = message.userData.callType;

    // callMsgData = message.userData;
    //alert('audiorcvcall');
    // checkCallerUser(message.userData);
   // console.log("callType.........: " + callType);

    var x = document.getElementById("outgoingcall");
    //  console.log(x);
    x.play();
    x.muted = false;
    x.loop = true;


    $('#videocallReceiver').modal();
    $('#videocallReceiver').show(); // show incomingCall Modal here
    $('#incomingName').html(message.userData.callerName);
    localStorage.setItem('tokenIs', message.userData.friendId + '-' + message.userData.callerId + '-' + message.userData.callerName);
    $("#videofram" ).addClass( "modal fade in" ); 
     $("#videofram").css("display","block");
    //    var x = document.getElementById("outgoingcall"); 
    //   //console.log(x);
    // 		x.play();
    // 		x.muted = false;
    // 		x.loop = true;
    //     $('#audiocallReceiver').modal();
    // 	$('#audiocallReceiver').show(); // show incomingCall Modal here
    // 	$('#audioincomingName').html(message.userData.callerName);


    //$('#broadcastvideocall').addClass('show');
    //$('#broadcastvideocall').css('display','block');

    //document.getElementById('callerName').innerHTML = message.userData.callerName; //set callerName in html
    inComCallData = message;

}

function playSound() {
    var sound = 'https://peekvideochat.com/incomming.mp3';
    if (sound) {
        var audio = new Audio(sound);
        return audio;
    }
}

function startCall() {
    let localAsset = document.getElementById('local-video');
    let remoteAsset = document.getElementById('videoOutput');
    let medConst = {};

 //   console.log('callType: ' + callType);
    if (callType == 'audio') {
      //  console.log("audio call accepted");
        localAsset = document.getElementById('local-video');
        remoteAsset = document.getElementById('videoOutput');
        medConst = {
            mediaConstraints: {
                audio: true,
                video: false
            }
        };
    }
    let options = {
        localVideo: localAsset,
        remoteVideo: remoteAsset,
        onicecandidate: onIceCandidateO2O, medConst
    }
    webRtcO2OPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
        function (error) {
            if (error) setCallState(NO_CALL);

            this.generateOffer(function (error, offerSdp) {
                if (error) setCallState(NO_CALL);
               
                let response = {
                    id: 'incomingCallResponse',
                    from: inComCallData.from, //caller Id
                    to: c_userData._id, //set userId here
                    callResponse: 'accept',
                    isFromAndroid: false,
                    sdpOffer: offerSdp
                };

                userBusy = true;
                sendKMessage(response);
            });
        });

    //   receiverId(inComCallData.from);
}

function receiverId() {
    return inComCallData.from;
}

function videoKCall(from, to, userData, isAudio) {

    setCallState(PROCESSING_CALL);
    let localAsset = document.getElementById('local-video');
    let remoteAsset = document.getElementById('videoOutput');
    let medConst = {};

    medConst = {
        mediaConstraints: {
            audio: true,
            video: true
        }
    };

    if (isAudio == 'audio') {
      //  console.log("AUDIO call");
        // localAsset=document.getElementById('audioInput');
        // remoteAsset= document.getElementById('audioOutput'); 

        localAsset = document.getElementById('local-video');
        remoteAsset = document.getElementById('videoOutput');

        medConst = {
            mediaConstraints: {
                audio: true,
                video: false
            }
        };
    }
    else {
      //  console.log("VIDEO call");
    }
    let options = {
        localVideo: localAsset,
        remoteVideo: remoteAsset,
        onicecandidate: onIceCandidateO2O, medConst
    }

    webRtcO2OPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
        if (error) setCallState(NO_CALL);

        this.generateOffer(function (error, offerSdp) {
            if (error) setCallState(NO_CALL);

            let message = {
                id: 'call',
                from: from,
                to: to,
                userData: userData,
                sdpOffer: offerSdp,
                isFromAndroid: false
            };
            userBusy = true;
            sendKMessage(message);
        });
    });
}

function stopCall() {
    //console.log('stopCall');
    let response = {
        id: 'incomingCallResponse',
        from: inComCallData.from,
        to: c_userData._id, // set userId here
        callResponse: 'reject',
        message: 'user declined',
        isFromAndroid: false
    };
    sendKMessage(response);
    stopK(true);
}

function videoKCall(from, to, userData, isAudio) {
    setCallState(PROCESSING_CALL);
    let localAsset = document.getElementById('local-video');
    let remoteAsset = document.getElementById('videoOutput');
    let medConst = {};

    if (isAudio == 1) {
        localAsset = document.getElementById('audioInput');
        remoteAsset = document.getElementById('audioOutput');
        medConst = {
            mediaConstraints: {
                audio: true,
                video: false
            }
        };
    }
    let options = {
        localVideo: localAsset,
        remoteVideo: remoteAsset,
        onicecandidate: onIceCandidateO2O, medConst
    }

    webRtcO2OPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
        if (error) setCallState(NO_CALL);

        this.generateOffer(function (error, offerSdp) {
            if (error) setCallState(NO_CALL);

            let message = {
                id: 'call',
                from: from,
                to: to,
                userData: userData,
                sdpOffer: offerSdp,
                isFromAndroid: false
            };
            userBusy = true;
            sendKMessage(message);
        });
    });
}

function startCommunication(message) {
    //  console.log(message);
    setCallState(IN_CALL);
    webRtcO2OPeer.processAnswer(message.sdpAnswer);
}
		//setInterval(ping, 2000);
		//function ping() {
        //if (!c_userData || typeof c_userData._id === "undefined") return;
		//console.log(o2oSocConEst);
       // if (!o2oSocConEst){ sendKMessage({
               // id: 'register',
               // name: c_userData._id  //set loggedIn userId here
           // });
			//} //window.location.reload();
         // sendKMessage({
         //   id: '__ping__',
         //   from: c_userData._id
        //});
   // }
