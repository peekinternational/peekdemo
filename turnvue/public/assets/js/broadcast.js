var userData = JSON.parse(localStorage.getItem('userData'));
let hostIs = location.host.split(':');
let webSocketIp = "peekvideochat.com";
if (hostIs[0] == 'localhost') webSocketIp = '127.0.0.1';
let broadCastUrl = 'wss://' + webSocketIp + ':8444/one2many';
console.log(broadCastUrl);
var ws = new WebSocket(broadCastUrl);
var presenterArr = [];
var returnpresenterData = [];


ws.onopen = function () {
  console.log('O2M socket open');
  setInterval(getPresenterData, 6000);
  getPresenterData(); //call on start and then it will repeat by interval
}

ws.onmessage = function (message) {
  var parsedMessage = JSON.parse(message.data);
  // console.info('Received message: ' + message.data);
  switch (parsedMessage.id) {
    case 'presenterResponse':
      presenterResponse(parsedMessage);
      break;
    case 'viewerResponse':
      viewerResponse(parsedMessage);
      break;
    case 'stopCommunication':
      dispose();
      break;
    case 'iceCandidate':
      webRtcO2MPeer.addIceCandidate(parsedMessage.candidate)
      break;
    case 'presenterDataResp':
      // where 'user' is loggedInUser
      if (!userData) break;
      let presenterData = [];


      //console.log(userData._id);
      parsedMessage.data.forEach(preData => {
        //console.log(preData.preId +'!='+ userData._id);
        if (preData.preId != userData._id) presenterData.push(preData)
      });
      presenterArr = presenterData;

      // returnpresenterData=presenterData;
      //   console.log('presenterArr ', presenterArr);
      break;
    default:
      console.error('Unrecognized message', parsedMessage);
  }
}

function returnPdata() {
  return presenterArr;
}
var broadCastHtml = document.getElementById('broadCastVideo');
console.log(broadCastHtml);
var userData = JSON.parse(localStorage.getItem('userData'));
function testing() {
  console.log(JSON.parse(localStorage.getItem('userData')));
}

var webRtcO2MPeer = '';
var bcPresenterId = '';
function presenterResponse(message) {
  if (message.response != 'accepted') {
    var errorMsg = message.message ? message.message : 'Unknow error';
    console.warn('Call not accepted for the following reason: ' + errorMsg);
    dispose();
  } else {
    webRtcO2MPeer.processAnswer(message.sdpAnswer); //change needed here
    $('#bctest').text(message.data);
    presenterArr = message.data;  //change needed here
  }
}

function viewerResponse(message) {
  if (message.response != 'accepted') {
    var errorMsg = message.message ? message.message : 'Unknow error';
    console.warn('Call not accepted for the following reason: ' + errorMsg);
    dispose();
  } else {
    webRtcO2MPeer.processAnswer(message.sdpAnswer);  //change needed here
  }
}

function presenter(broadCastHtml) {
  console.log(userData);
  if (!webRtcO2MPeer) {  //change needed here
    showSpinner(broadCastHtml);  //change needed here
    var options = {
      localVideo: broadCastHtml,  //change needed here
      onicecandidate: onIceCandidate
    }
    webRtcO2MPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {  //change needed here
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
    password: 0,  //change needed here
    preName: userData.name  //change needed here
  };
  sendMessage(message);
}


function getPresenterData() {
  returnPdata();
  var message = {
    id: 'presenterData'
  };
  sendMessage(message);
}


function viewer(presenterid, viewHtml) {

  if (!webRtcO2MPeer) {  //change needed here
    //showSpinner(viewHtml);  //change needed here
    console.log('bcPresenterId' + presenterid);
    console.log(viewHtml);
    bcPresenterId = presenterid;
    var options = {
      remoteVideo: viewHtml,  //change needed here
      onicecandidate: onIceCandidate
    }

    webRtcO2MPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {  //change needed here
      console.log(error);
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
    preId: bcPresenterId //$rootScope.connWdPreId  //change needed here
  }
  console.log(message);
  sendMessage(message);
}

function onIceCandidate(candidate) {
  var message = {
    id: 'onIceCandidate',
    candidate: candidate
  }
  sendMessage(message);
}



function broadcaststop() {
  if (webRtcO2MPeer) {  //change needed here

    var message = {
      id: 'stop'
    }
    sendMessage(message);
    dispose();

    $('#broadcastvideocall').removeClass('show');
    $('#broadcastvideocall').css('display', 'none');
    $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");
  }
}

function dispose() {
  if (webRtcO2MPeer) {  //change needed here
    webRtcO2MPeer.dispose();  //change needed here
    webRtcO2MPeer = null;  //change needed here
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