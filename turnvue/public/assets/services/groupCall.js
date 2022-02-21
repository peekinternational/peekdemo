// var groupUser = '';
// var groupRoomName = '';
var name;
var socket = new WebSocket('wss://' + 'peekvideochat.com:3000' + '/groupcall');
var participants = {};
var userCount = 0;
var mySocketId = 0;
var callType = '';
var amIAdmin = false;
var myroomName = '';

window.onbeforeunload = function () {
    console.log("CLOSING SOCKET");
    leaveRoom();
    socket.close();
};

socketConnect();
function socketConnect() {
    socket = new WebSocket('wss://' + 'peekvideochat.com:3000' + '/groupcall');

    socket.onopen = function () {
        console.log('SOCKET IS OPEN');
    }
    socket.onclose = function () {
        console.log('SOCKET IS CLOSING');
        setTimeout(() => {
            socketConnect();
        }, 1000);
    }
    socket.onerror = function (err) {
        console.log('>>>> SOMETHING WENT WRONG <<<<', err.message);
        socket.close();
        setTimeout(() => {
            socketConnect();
        }, 1000);
    }


    socket.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);
        // console.log(" ///// onmessage \\\\\ ", parsedMessage);
        switch (parsedMessage.id) {
            case "_updateVideoStatus":
                if (data.audio == 0) {
                    if ((myroomName === '' || parsedMessage.roomName === myroomName) && parsedMessage.socketId === mySocketId) {
                        if (parsedMessage.myAdminStatus) {
                            if (parsedMessage.videoStatus) {
                                let myobj = document.getElementById('videoMsg-' + parsedMessage.socketId);
                                myobj.remove();
                                //   console.log(document.getElementById('vidStopbtn-' + parsedMessage.socketId));
                                document.getElementById('vidStopbtn-' + parsedMessage.socketId).disabled = false;
                            }
                            else {
                                let messageEle = document.createElement('p');
                                messageEle.id = "videoMsg-" + parsedMessage.socketId;
                                messageEle.innerText = 'stopped by Admin';
                                document.getElementById(parsedMessage.sender).appendChild(messageEle);
                                document.getElementById('vidStopbtn-' + parsedMessage.socketId).disabled = true;
                            }
                        }

                        const stream = document.getElementById('video-' + parsedMessage.socketId).srcObject;
                        stream.getVideoTracks()[0].enabled = !(stream.getVideoTracks()[0].enabled);
                    }
                }
                else {
                    if ((myroomName === '' || data.roomName === myroomName) && data.socketId === mySocketId) {
                        if (data.myAdminStatus) {
                            if (data.videoStatus) {
                                let myobj = document.getElementById('videoMsg-' + data.socketId);
                                myobj.remove();
                                document.getElementById('audStopbtn-' + data.socketId).disabled = false;
                            }
                            else {
                                let messageEle = document.createElement('p');
                                messageEle.id = "videoMsg-" + data.socketId;
                                messageEle.innerText = 'stopped by Admin';
                                document.getElementById(data.sender).appendChild(messageEle);
                                document.getElementById('audStopbtn-' + data.socketId).disabled = true;
                            }
                        }

                        const stream = document.getElementById('video-' + data.socketId).srcObject;
                        stream.getAudioTracks()[0].enabled = !(stream.getAudioTracks()[0].enabled);
                    }
                }
                break;
            case 'existingParticipants':
                onExistingParticipants(parsedMessage);
                break;
            case 'newParticipantArrived':
                onNewParticipant(parsedMessage);
                break;
            case 'participantLeft':
                onParticipantLeft(parsedMessage);
                break;
            case 'receiveVideoAnswer':
                receiveVideoResponse(parsedMessage);
                break;
            case 'iceCandidate':
                participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
                    if (error) {
                        console.error("Error adding candidate: " + error);
                        return;
                    }
                });
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
        }
    }
}

// function participandsCountUpdate(msg){
//  console.log(msg);
// }

function nextUniqueId() {
    // mySocketId = Math.floor(Math.random() * Math.floor(9000));
    let loggedUserId = '';
    loggedUserId = JSON.parse(localStorage.getItem("userData"));
    if (loggedUserId == null) {
        loggedUserId = JSON.parse(localStorage.getItem("userMeeting"));
    }

    console.log("loggedUserId 1: ", loggedUserId);
    mySocketId = loggedUserId._id;
    //  console.log("loggedUserId 2: ", mySocketId);
    // localStorage.setItem('socketId', mySocketId); //temporarily using localStorage, otherwise not a good approach
}

function onNewParticipant(request) {
    console.log("... onNewParticipant ...");
    // receiveVideo(request.name);
    receiveVideo(request.name, request.sockid, request.isAdmin);
}

function receiveVideoResponse(result) {
    participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
    });
}

// Call this function from HTML button click
function register(groupName, userData, type) {
    console.log('register ', userData);
    // socket.connect(); 
    callType = type;
    nextUniqueId();
    name = userData; // document.getElementById('name').value;
    var roomName = groupName; // document.getElementById('roomName').value;
    // groupUser = name;
    //  console.log("type: " , type);
    //   console.log("name: " , name);
    //  console.log("roomName: " , roomName);
    document.getElementById('room-header').innerText = 'Group Name ' + roomName;
    document.getElementById('join').style.display = 'none';
    document.getElementById('room').style.display = 'block';

    if (type == 'o2o') document.getElementById('o2oroom').style.display = 'block';

    var message = {
        "id": 'joinRoom',
        "name": name,
        "roomName": roomName,
        "socketId": mySocketId,
        "statuscall": "video"
    }
    sendGroupMessage(message);
}

// ---------- reCheck needed ------------------
function groupCallResponse(message) {
    if (message.response != 'accepted') {
        console.info('Call not accepted by peer. Closing call');
        stop();
    } else {
        webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
            if (error) return console.error(error);
        });
    }
}

function onExistingParticipants(msg) {
    console.log(name, '... onExistingParticipants ...', msg);

    var constraints = {
        audio: true,
        video: {
            mandatory: {
                maxWidth: 320,
                maxFrameRate: 15,
                minFrameRate: 15
            }
        }
    };

    amIAdmin = msg.isAdmin;
    myroomName = msg.roomName;

    var participant = new Participant(name, msg.sockid, msg.isAdmin);
    participants[name] = participant;
    var video = participant.getVideoElement();

    //  console.log(video);

    var options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: participant.onIceCandidate.bind(participant)
    }

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
        function (error) {
            if (error) {
                return console.error(error);
            }
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
        });

    //msg.data.forEach(receiveVideo);
    for (var exUser of msg.data) {
        receiveVideo(exUser.username, exUser.sockId, exUser.isAdmin);
    }
}

//Call this function from HTML button click, if user leaves a group-call


function receiveVideo(senderName, senderSockid, isAdmin) {
    console.log('receiveVideo>>', senderName);
    var participant = new Participant(senderName, senderSockid, isAdmin);
    participants[senderName] = participant;
    var video = participant.getVideoElement();

    var options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant)
    }

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
        function (error) {
            if (error) {
                return console.error(error);
            }
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
        }
    );
}

function onParticipantLeft(request) {
    //console.log('Participant ' + request.name + ' left');
    var participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];

    var maincolratio = 12;
    var colratio = 12;
    if (callType == 'meeting') {
        // console.log('meting caasssssssssssssssssllllll');
        userCount--;
        //  console.log('onParticipantLeft: ', userCount);
        //  console.log(userCount);

        var classname = 'singleM';
        if (userCount == 2) {
            colratio = 6;
            maincolratio = 6;

            classname = 'double';
        } else if (userCount == 3) {
            colratio = 4;
            maincolratio = 4;
            classname = 'tripple';
        } else if (userCount == 4) {
            colratio = 6;
            maincolratio = 6;
        } else if (userCount == 5 || userCount == 6) {
            colratio = 4;
            maincolratio = 4;
        } else if (userCount == 7 || userCount == 8) {
            colratio = 3;
            maincolratio = 3;
        } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
            colratio = 2;
            maincolratio = 2;
        }
        $('#participants').find('.participant').attr('class', 'participant ' + classname + ' col-md-' + colratio);


    } else {
        var classname = 'single';
        userCount--;
        // console.log('onParticipantLeft: ', userCount);

        if (userCount == 2) {
            colratio = 12;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 3) {
            colratio = 6;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 4) {
            colratio = 6;
            maincolratio = 6;
            classname = '';
        } else if (userCount == 5 || userCount == 6) {
            colratio = 4;
            maincolratio = 4;
            classname = '';
        } else if (userCount == 7 || userCount == 8) {
            colratio = 3;
            maincolratio = 3;
            classname = '';
        } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
            colratio = 2;
            maincolratio = 2;
            classname = '';
        }
    }
    $('#participants').find('.participant').attr('class', 'participant ' + classname + ' col-md-' + colratio);
}

function sendGroupMessage(message) {
    // console.log(message);
    var jsonMessage = JSON.stringify(message);
    socket.send(jsonMessage);
}

function Participant(name, incomingId, isAdmin) {
    console.log("callType: ", callType, ', isAdmin: ', isAdmin);
    var maincolratio = 12;
    var colratio = 12;
    if (callType == 'meeting') {
        // console.log('meting calsssssssssssssssssllllll');
        userCount++;
        var classname = 'singleM';
        //  console.log('Participant: ', userCount);
        //  console.log(userCount);

        if (userCount == 2) {
            colratio = 6;
            maincolratio = 6;

            classname = 'double';
        } else if (userCount == 3) {
            colratio = 4;
            maincolratio = 4;
            classname = 'tripple';
        } else if (userCount == 4) {
            colratio = 6;
            maincolratio = 6;
        } else if (userCount == 5 || userCount == 6) {
            colratio = 4;
            maincolratio = 4;
        } else if (userCount == 7 || userCount == 8) {
            colratio = 3;
            maincolratio = 3;
        } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
            colratio = 2;
            maincolratio = 2;
        }
        $('#participants').find('.participant').attr('class', 'participant ' + classname + ' col-md-' + colratio);


    }
    else if (callType == 'o2o') {
        // console.log('ooooooooooooooooooooooooooooooooooooooooooooooo');
        userCount++;
        var classname = 'single';
        // console.log('O2O-Participant: ', userCount);
        //  console.log(userCount);

        if (userCount == 2) {
            colratio = 12;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 3) {
            colratio = 6;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 4) {
            colratio = 6;
            maincolratio = 6;
            classname = '';
        } else if (userCount == 5 || userCount == 6) {
            colratio = 4;
            maincolratio = 4;
            classname = '';
        } else if (userCount == 7 || userCount == 8) {
            colratio = 3;
            maincolratio = 3;
            classname = '';
        } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
            colratio = 2;
            maincolratio = 2;
            classname = '';
        }

        $('#o2oparticipants').find('.participant').attr('class', 'participant ' + classname + ' col-md-' + colratio);
    }
    else {
        userCount++;
        var classname = 'single';
        // console.log('Participant: ', userCount);
        //  console.log(userCount);

        if (userCount == 2) {
            colratio = 12;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 3) {
            colratio = 6;
            maincolratio = 12;
            classname = '';
        } else if (userCount == 4) {
            colratio = 6;
            maincolratio = 6;
            classname = '';
        } else if (userCount == 5 || userCount == 6) {
            colratio = 4;
            maincolratio = 4;
            classname = '';
        } else if (userCount == 7 || userCount == 8) {
            colratio = 3;
            maincolratio = 3;
            classname = '';
        } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
            colratio = 2;
            maincolratio = 2;
            classname = '';
        }
        $('#participants').find('.participant').attr('class', 'participant col-md-' + colratio);
    }

    const PARTICIPANT_MAIN_CLASS = 'participant ' + classname + ' main col-md-' + maincolratio;
    const PARTICIPANT_CLASS = 'participant ' + classname + ' col-md-' + colratio;
    // console.log("Participant name: " + name);

    this.name = name;
    var container = document.createElement('div');
    container.className = PARTICIPANT_CLASS;//isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
    container.id = name;
    var span = document.createElement('p');
    span.className = "participantName";
    var video = document.createElement('video');

    // ------------------------------ VIDEO BUTTONS --------------------------------

    var stopVideoBtn;
    var startVideoBtn;

    var stopVideoBtn = document.createElement("IMG");
    stopVideoBtn.setAttribute("src", "https://turn.peekvideochat.com/assets/videocallfull.png");
    stopVideoBtn.id = 'vidStopbtn-' + incomingId;

    var startVideoBtn = document.createElement("IMG");
    startVideoBtn.setAttribute("src", "https://turn.peekvideochat.com/assets/crossvideocallfull.png");
    startVideoBtn.id = 'vidStartbtn-' + incomingId;


    if (callType != 'o2o') {
        if (isAdmin) { // needs recheck
            if (incomingId == mySocketId) {  // means I'm an admin, so dont show me buttons on my video
                // do nothing ;
            }
        }
        else {
            stopVideoBtn.addEventListener('click', function () {
                var data = {
                    id: "updateMemberStatus",
                    sender: name,
                    socketId: incomingId,
                    mySocketId: mySocketId,
                    roomName: myroomName,
                    videoStatus: false,
                    isAdmin: isAdmin,
                    myAdminStatus: amIAdmin,
                    audio: 0
                };
                if (amIAdmin && incomingId != mySocketId) {
                    sendGroupMessage(data);
                    document.getElementById('vidStartbtn-' + incomingId).style.display = 'block';
                    document.getElementById('vidStartbtn-' + incomingId).style.padding = '0px 13px 0px 0px';
                    document.getElementById('vidStopbtn-' + incomingId).style.padding = '0px 13px 0px 0px';
                    document.getElementById('vidStopbtn-' + incomingId).style.display = 'none';
                }

            });
            startVideoBtn.addEventListener('click', function () {
                var data = {
                    id: "updateMemberStatus",
                    sender: name,
                    socketId: incomingId,
                    mySocketId: mySocketId,
                    roomName: myroomName,
                    videoStatus: true,
                    isAdmin: isAdmin,
                    myAdminStatus: amIAdmin,
                    audio: 0
                };

                if (amIAdmin && incomingId != mySocketId) {
                    sendGroupMessage(data);
                    document.getElementById('vidStartbtn-' + incomingId).style.display = 'none';
                    document.getElementById('vidStopbtn-' + incomingId).style.display = 'block';
                }

            });
        }
    }
    // ------------------------------ ***VIDEO BUTTONS ENDS*** ----------------------------


    // ------------------------------ AUDIO BUTTONS --------------------------------

    var stopAudioBtn;
    var startAudioBtn;

    var stopAudioBtn = document.createElement("IMG");
    stopAudioBtn.setAttribute("src", "https://turn.peekvideochat.com/assets/micfull.png");
    stopAudioBtn.id = 'audStopbtn-' + incomingId;

    var startAudioBtn = document.createElement("IMG");
    startAudioBtn.setAttribute("src", "https://turn.peekvideochat.com/assets/crossmicfull.png");
    startAudioBtn.id = 'audStartbtn-' + incomingId;

    if (callType != 'o2o') {
        if (isAdmin) { // needs recheck
            if (incomingId == mySocketId) {  // means I'm an admin, so dont show me buttons on my video
                // do nothing ;
            }
        }
        else {
            stopAudioBtn.addEventListener('click', function () {
                var data = {
                    id: "updateMemberStatus",
                    sender: name,
                    socketId: incomingId,
                    mySocketId: mySocketId,
                    roomName: myroomName,
                    videoStatus: false,
                    isAdmin: isAdmin,
                    myAdminStatus: amIAdmin,
                    audio: 1
                };

                if (amIAdmin && incomingId != mySocketId) {
                    sendGroupMessage(data);
                    document.getElementById('audStartbtn-' + incomingId).style.display = 'block';
                    document.getElementById('audStopbtn-' + incomingId).style.display = 'none';
                }

            });
            startAudioBtn.addEventListener('click', function () {
                var data = {
                    id: "updateMemberStatus",
                    sender: name,
                    socketId: incomingId,
                    mySocketId: mySocketId,
                    roomName: myroomName,
                    videoStatus: true,
                    isAdmin: isAdmin,
                    myAdminStatus: amIAdmin,
                    audio: 1
                };

                if (amIAdmin && incomingId != mySocketId) {
                    sendGroupMessage(data);
                    document.getElementById('audStartbtn-' + incomingId).style.display = 'none';
                    document.getElementById('audStopbtn-' + incomingId).style.display = 'block';
                }
            });
        }
    }
    // ------------------------------ ***AUDIO BUTTONS ENDS*** --------------------------------


    var rtcPeer;
    var controlsBtnDiv = document.createElement('div');
    controlsBtnDiv.className = "vidControls";
    container.appendChild(video);

    if (callType != 'o2o') {
        if (isAdmin) { // needs recheck
            if (incomingId == mySocketId) {  // means I'm an admin, so dont show me buttons on my video
                // do nothing ;
            }
        }
        else {
            if (amIAdmin && incomingId != mySocketId) {
                controlsBtnDiv.appendChild(stopVideoBtn);
                controlsBtnDiv.appendChild(startVideoBtn);

                controlsBtnDiv.appendChild(stopAudioBtn);
                controlsBtnDiv.appendChild(startAudioBtn);
                setTimeout(() => {
                    document.getElementById('vidStopbtn-' + incomingId).style.display = 'block';
                    document.getElementById('vidStartbtn-' + incomingId).style.display = 'none';
                    document.getElementById('audStopbtn-' + incomingId).style.display = 'block';
                    document.getElementById('audStartbtn-' + incomingId).style.display = 'none';
                }, 500);
            }
        }
    }

    // container.appendChild(span);
    container.appendChild(span);

    if (callType != 'o2o') {
        if (isAdmin) { // needs recheck
            if (incomingId == mySocketId) {
                // do nothing ;
            }
        }
        else container.appendChild(controlsBtnDiv);
    }

    document.getElementById('participants').appendChild(container);

    if (callType == 'o2o')
    {
     document.getElementById('o2oparticipants').appendChild(container);
         console.log("userCount: ", userCount);
    if (userCount == 1){
        console.log("userCount IF 1: ");
        video.classList.add('full-video');
        // document.getElementsByTagName("BODY")[0].style.margin = '0';
    }

    if (userCount == 2){

        console.log("userCount IF 2: ", incomingId + " == " + mySocketId);
        if (incomingId == mySocketId) {
            // video.classList.add('sender-video');
        }

        if (incomingId != mySocketId) {
            console.log( document.getElementById("o2oparticipants").children[0]);
             console.log( document.getElementById("o2oparticipants").children[1]);
            document.getElementById("o2oparticipants").children[1].classList.add("full-video");

            document.getElementById("o2oparticipants").children[0].classList.add("sender-video");
            // video.classList.add('full-video');
        }
        
        // document.getElementsByTagName("BODY")[0].style.margin = '0';
    }
    }
        

    if (callType != 'o2o') span.appendChild(document.createTextNode(name));

    
    // ------------- NABEEL --------------------------------------------------------------

    // ------------- ******** -------------------------------------------------------------


    video.id = 'video-' + incomingId;
    var att_isAdmin = document.createAttribute("isAdmin");
    var att_playsinline = document.createAttribute("playsinline");
    att_isAdmin.value = isAdmin;
    video.setAttributeNode(att_isAdmin);
    video.setAttributeNode(att_playsinline);
    video.setAttribute("poster", "https://turn.peekvideochat.com/boxloader.gif");

    video.autoplay = true;
    video.controls = false;


    this.getElement = function () {
        return container;
    }

    this.getVideoElement = function () {
        return video;
    }


    function switchContainerClass() {
        if (container.className === PARTICIPANT_CLASS) {
            var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
            elements.forEach(function (item) {
                item.className = PARTICIPANT_CLASS;
            });
            container.className = PARTICIPANT_MAIN_CLASS;
        } else {
            container.className = PARTICIPANT_CLASS;
        }
    }

    function isPresentMainParticipant() {
        return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0);
    }

    this.offerToReceiveVideo = function (error, offerSdp, wp) {
        if (error) return console.error("sdp offer error")
        console.log('Invoking SDP offer callback function: ' + name);
        var msg = {
            id: "receiveVideoFrom",
            sender: name,
            sdpOffer: offerSdp,
            socketId: mySocketId
        };
        sendGroupMessage(msg);
    }


    this.onIceCandidate = function (candidate, wp) {
        // console.log("Local candidate" + candidate);
        var message = {
            id: 'onIceCandidate',
            socketId: mySocketId,
            candidate: candidate,
            sender: name
        };
        sendGroupMessage(message);
    }

    Object.defineProperty(this, 'rtcPeer', { writable: true });

    this.dispose = function () {
        //  console.log('Disposing participant ' + this.name);
        this.rtcPeer.dispose();
        // If condition -> needs recheck
        if (container.parentNode) container.parentNode.removeChild(container);
    };
}
function leaveRoom(userData = null, status = 2) {
    console.log('leaveRoom 1');
    sendGroupMessage({
        'id': 'leaveRoom',
        socketId: mySocketId
    });

    for (var key in participants) {
        participants[key].dispose();
    }

    document.getElementById('join').style.display = 'block';
    document.getElementById('room').style.display = 'none';
    userCount = userCount = 0;

    var maincolratio = 12;
    var colratio = 12;
    if (userCount == 1) {
        colratio = 12;
        maincolratio = 12;
    }
    if (userCount == 2) {
        colratio = 12;
        maincolratio = 12;
    } else if (userCount == 3) {
        colratio = 6;
        maincolratio = 12;
    } else if (userCount == 4) {
        colratio = 6;
        maincolratio = 6;
    } else if (userCount == 5 || userCount == 6) {
        colratio = 4;
        maincolratio = 4;
    } else if (userCount == 7 || userCount == 8) {
        colratio = 3;
        maincolratio = 3;
    } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
        colratio = 2;
        maincolratio = 2;
    }
    //  console.log('leaveRoom 5');
    $('#participants').find('.participant').attr('class', 'participant col-md-' + colratio);

    // socket.close();
}

function leaveAndroidRoom(userData) {
    totalElements = 0;
    console.log("...android leave room 1 :", userData.userId);
    console.log("...android leave room 2 :", participants);

    sendGroupMessage({
        'id': 'leaveRoom',
        socketId: mySocketId
    });

    if (userData.callType == "o2o") {
        sendGroupMessage({
            'id': 'leaveRoom',
            socketId: userData.userId
        });

        document.getElementById('join').style.display = 'block';
        document.getElementById('room').style.display = 'none';
    }

    for (var key in participants) {
        participants[key].dispose();
    }


    userCount = userCount = 0;

    var maincolratio = 12;
    var colratio = 12;
    if (userCount == 1) {
        colratio = 12;
        maincolratio = 12;
    }
    if (userCount == 2) {
        colratio = 12;
        maincolratio = 12;
    } else if (userCount == 3) {
        colratio = 6;
        maincolratio = 12;
    } else if (userCount == 4) {
        colratio = 6;
        maincolratio = 6;
    } else if (userCount == 5 || userCount == 6) {
        colratio = 4;
        maincolratio = 4;
    } else if (userCount == 7 || userCount == 8) {
        colratio = 3;
        maincolratio = 3;
    } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
        colratio = 2;
        maincolratio = 2;
    }

    $('#participants').find('.participant').attr('class', 'participant col-md-' + colratio);
}