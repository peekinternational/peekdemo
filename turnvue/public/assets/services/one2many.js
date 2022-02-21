var broadCastHtml = document.getElementById('broadCastVideo');
var userData= JSON.parse(localStorage.getItem('userData'));
function testing(){
   console.log(JSON.parse(localStorage.getItem('userData')));
}
window.webRtcO2MPeer='';
function presenterResponse(message) {
    if (message.response != 'accepted') {
        var errorMsg = message.message ? message.message : 'Unknow error';
        console.warn('Call not accepted for the following reason: ' + errorMsg);
        dispose();
    } else {
        window.webRtcO2MPeer.processAnswer(message.sdpAnswer); //change needed here
        $('#bctest').text(message.data);  
        window.presenterArr = message.data;  //change needed here
    }
}

function viewerResponse(message) {
    if (message.response != 'accepted') {
        var errorMsg = message.message ? message.message : 'Unknow error';
        console.warn('Call not accepted for the following reason: ' + errorMsg);
        dispose();
    } else {
        window.webRtcO2MPeer.processAnswer(message.sdpAnswer);  //change needed here
    }
}

function presenter() {
    if (!window.webRtcO2MPeer) {  //change needed here
        showSpinner(broadCastHtml);  //change needed here
        var options = {
            localVideo: broadCastHtml,  //change needed here
            onicecandidate: onIceCandidate
        }
        window.webRtcO2MPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {  //change needed here
            if (error) return onError(error);
            this.generateOffer(onOfferPresenter);
        });
    }
}

function onOfferPresenter(error, offerSdp) {
    if (error) return onError(error);
    var message = {
        id: 'presenter',
        sdpOffer: offerSdp,
        preId: userData._id,  //change needed here
        password: (prePassword) ? prePassword : 0,  //change needed here
        preName: userData.name  //change needed here
    };
    sendMessage(message);
}

function getPresenterData() {
    var message = {
        id: 'presenterData'
    };
    sendMessage(message);
}

function viewer() {
    if (window.webRtcO2MPeer) {  //change needed here
        showSpinner(broadCastHtml);  //change needed here

        var options = {
            remoteVideo: broadCastHtml,  //change needed here
            onicecandidate: onIceCandidate
        }

        window.webRtcO2MPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {  //change needed here
            if (error) return onError(error);
            this.generateOffer(onOfferViewer);
        });
    }
}

function onOfferViewer(error, offerSdp) {
    if (error) return onError(error)

    var message = {
        id: 'viewer',
        sdpOffer: offerSdp,
        preId: userData.chatRefId //$rootScope.connWdPreId  //change needed here
    }

    sendMessage(message);
}

function onIceCandidate(candidate) {
    var message = {
        id: 'onIceCandidate',
        candidate: candidate
    }
    sendMessage(message);
}

function stop() {
    if (window.webRtcO2MPeer) {  //change needed here
        var message = { 
            id: 'stop'
        }
        sendMessage(message);
        dispose();
    }
}

function dispose() {
    if (window.webRtcO2MPeer) {  //change needed here
        window.webRtcO2MPeer.dispose();  //change needed here
        window.webRtcO2MPeer = null;  //change needed here
    }
    hideSpinner(broadCastHtml);  //change needed here
}

// function sendMessage(message) {
//     window.O2MSoc.$emit(JSON.stringify(message));  //change needed here
// }
function sendMessage(message) {
	var jsonMessage = JSON.stringify(message); 
	ws.send(jsonMessage);
}

function showSpinner() {
    //  if (!arguments[0]) return; // included temporary to bypass error
    var i = 0;
    var lengthIs = arguments.length;
    for (i; i < lengthIs; i++) {
        if (arguments[i] && typeof arguments[i].poster !== 'undefined') {
            arguments[i].poster = './images/transparent-1px.png';
            arguments[i].style.background = 'center transparent url("./images/webrtc.png") no-repeat';
        }
    }
}

function hideSpinner() {
    //if (!arguments[0]) return; // included temporary to bypass error
    var i = 0;
    var lengthIs = arguments.length;
    for (i; i < lengthIs; i++) {
        if (arguments[i] && typeof arguments[i].poster !== 'undefined') {
            arguments[i].src = '';
            arguments[i].poster = './images/webrtc.png';
            arguments[i].style.background = '';
        }
    }
}

function onError(error) {
    console.log(error);
}
