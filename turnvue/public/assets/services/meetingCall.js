var groupUser = '';
var groupRoomName = '';
var name;
var socket = new WebSocket('wss://' + 'peekvideochat.com:3000' + '/groupcall');
console.log('wss://' + 'peekvideochat.com:3000' + '/groupcall');
var participants = {};
var parsed = {};
var userCount = 0;
var mySocketId = 0;

socket.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);

    switch (parsedMessage.id) {
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


function nextUniqueId() {
    mySocketId = Math.floor(Math.random() * Math.floor(9000));
}

function onNewParticipant(request) {
    console.log("... onNewParticipant ...");
    console.log(request);
    receiveVideo(request.name);
}

function receiveVideoResponse(result) {
    participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
    });
}

// Call this function from HTML button click
function register(groupData, userData) {
    nextUniqueId();
    name = userData; // document.getElementById('name').value;
    var roomName = groupData; // document.getElementById('roomName').value;
    groupUser = name;

    console.log("name: " + name);
    console.log("roomName: " + roomName);
    document.getElementById('room-header').innerText = 'Group Name ' + roomName;
    document.getElementById('join').style.display = 'none';
    document.getElementById('room').style.display = 'block';

    var message = {
        id: 'joinRoom',
        name: name,
        roomName: roomName,
        socketId: mySocketId
    }
    sendGroupMessage(message);
}

function meetingCallResponse(message) {
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

    var participant = new Participant(groupUser);
    participants[groupUser] = participant;
    var video = participant.getVideoElement();

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

    msg.data.forEach(receiveVideo);
}

//Call this function from HTML button click, if user leaves a group-call
function receiveVideo(sender) {
    var participant = new Participant(sender);
    participants[sender] = participant;
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
    // console.log('Participant ' + request.name + ' left');
    var participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];
    userCount--;
    // var maincolratio = 12;
    // var colratio = 12;
    // if (userCount == 2) {
    //     colratio = 12;
    //     maincolratio = 12;
    // } else if (userCount == 3) {
    //     colratio = 6;
    //     maincolratio = 12;
    // } else if (userCount == 4) {
    //     colratio = 6;
    //     maincolratio = 6;
    // } else if (userCount == 5 || userCount == 6) {
    //     colratio = 4;
    //     maincolratio = 4;
    // } else if (userCount == 7 || userCount == 8) {
    //     colratio = 3;
    //     maincolratio = 3;
    // } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
    //     colratio = 2;
    //     maincolratio = 2;
    // } else {

    // }
    // $('#participants').find('.participant').attr('class', 'participant col-' + colratio);
}

function sendGroupMessage(message) {
    // console.log(message);
    var jsonMessage = JSON.stringify(message);
    socket.send(jsonMessage);
}


function Participant(name) {
    userCount++;

    // var maincolratio = 12;
    // var colratio = 12;
    // if (userCount == 2) {
    //     colratio = 12;
    //     maincolratio = 12;
    // } else if (userCount == 3) {
    //     colratio = 6;
    //     maincolratio = 12;
    // } else if (userCount == 4) {
    //     colratio = 6;
    //     maincolratio = 6;
    // } else if (userCount == 5 || userCount == 6) {
    //     colratio = 4;
    //     maincolratio = 4;
    // } else if (userCount == 7 || userCount == 8) {
    //     colratio = 3;
    //     maincolratio = 3;
    // } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
    //     colratio = 2;
    //     maincolratio = 2;
    // } else {

    // }
    // $('#participants').find('.participant').attr('class', 'participant col-' + colratio);

    const PARTICIPANT_MAIN_CLASS = 'participant main col-' + maincolratio;
    const PARTICIPANT_CLASS = 'participant col-' + colratio;
    this.name = name;
    var container = document.createElement('div');
    container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
    container.id = name;
    var span = document.createElement('span');
    var video = document.createElement('video');
    var rtcPeer;

    container.appendChild(video);
    container.appendChild(span);
    container.onclick = switchContainerClass;
    document.getElementById('participants').appendChild(container);

    span.appendChild(document.createTextNode(name));

    video.id = 'video-' + name;
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
        //   console.log('Invoking SDP offer callback function: ' + name);
        var msg = {
            id: "receiveVideoFrom",
            sender: name,
            sdpOffer: offerSdp,
            socketId: mySocketId
        };
        sendGroupMessage(msg);
    }


    this.onIceCandidate = function (candidate, wp) {
        //    console.log("Local candidate" + candidate);

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
        //   console.log('Disposing participant ' + this.name);
        this.rtcPeer.dispose();
        container.parentNode.removeChild(container);
    };
}
function leaveRoom(userData = null, status = 2) {
    sendGroupMessage({
        'id': 'leaveRoom',
        socketId: mySocketId
    });

    for (var key in participants) {
        participants[key].dispose();
    }

    document.getElementById('join').style.display = 'block';
    document.getElementById('room').style.display = 'none';
    userCount = userCount - 1;
    //	console.log(userCount);
    // var maincolratio = 12;
    // var colratio = 12;
    // if (userCount == 1) {
    //     colratio = 12;
    //     maincolratio = 12;
    // }
    // if (userCount == 2) {
    //     colratio = 12;
    //     maincolratio = 12;
    // } else if (userCount == 3) {
    //     colratio = 6;
    //     maincolratio = 12;
    // } else if (userCount == 4) {
    //     colratio = 6;
    //     maincolratio = 6;
    // } else if (userCount == 5 || userCount == 6) {
    //     colratio = 4;
    //     maincolratio = 4;
    // } else if (userCount == 7 || userCount == 8) {
    //     colratio = 3;
    //     maincolratio = 3;
    // } else if (userCount == 9 || userCount == 10 || userCount == 11 || userCount == 12 || userCount == 13 || userCount == 14 || userCount == 15 || userCount == 16) {
    //     colratio = 2;
    //     maincolratio = 2;
    // }
    // $('#participants').find('.participant').attr('class', 'participant col-' + colratio);

    // socket.close();
}