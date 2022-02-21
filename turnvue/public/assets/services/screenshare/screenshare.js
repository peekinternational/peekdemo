var config = {
    // via: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs
    openSocket: function (config) {
      //  console.log('config: 0');
        var SIGNALING_SERVER = 'https://peekvideochat.com:9559/';//'https://socketio-over-nodejs2.herokuapp.com:443/';

        var channel = config.channel || 'peekChatSystemG';
        //  var channel = "tocherChatSystem";  //config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var sender = Math.round(Math.random() * 999999999) + 999999999;

        io.connect(SIGNALING_SERVER).emit('new-channel', {
            channel: channel,
            sender: sender
        });

        var socket = io.connect(SIGNALING_SERVER + channel);
        socket.channel = channel;
     // console.log('config: 1');
        socket.on('connect', function () {
            console.log('connect >', config.callback);
            if (config.callback) config.callback(socket);
            console.log("Screen share connect");
        });

        socket.send = function (message) {
            // console.log('message--> ', message);
            socket.emit('message', {
                sender: sender,
                data: message
            });
        };

        socket.on('message', config.onmessage);
    },
    onRemoteStream: function (media) {
        console.log('SSonRemoteStream: ', media);
        if (isbroadcaster) return;

        // var video = media.video;  
        // let screenshareEle = document.getElementById('screenshare');
        // screenshareEle.insertBefore(video, screenshareEle.firstChild);
        //  rotateVideo(video);
        // document.querySelector('.hide-after-join').style.display = 'none';
    },
    onRoomFound: function (room) {
      //  console.log(room.roomData, " :onRoomFound: ", isbroadcaster);
        if (isbroadcaster) return;

        let userData = room.roomData.split('-');
      //  console.log(localStorage.getItem('tokenData') ," != ", userData[1]);
        if (localStorage.getItem('tokenData') != userData[1]) return;

     
        var alreadyExist = document.getElementById(room.roomData);
      //  console.log('alreadyExist: ', alreadyExist);
        if (alreadyExist) return;
   
        var videoOutput = document.getElementById('videoOutput');
        var button = document.getElementById('viewButton');//tr.querySelector('.join');
        var button = this;
        button.disabled = true;
        $('#videoOutput').css({ "width": "30%", "float": "left", "height": "275px" });
        $('#remoteScreenshare').css({ "width": "70%", "float": "right", "display": "block" });

        conferenceUI.joinRoom({
            roomToken: room.roomToken,
            joinUser: room.broadcaster
        });

        $('#remoteScreenshare').show();
     
        let currentUserName = JSON.parse(localStorage.getItem('userData'));
        console.log("screenshare room joined~~~ ", room);
        // console.log('onRoomFound', currentUserName._id , '-' , userData[0] , '-' , currentUserName.name);
        // ------------- testing needed ------------------------------------
        localStorage.setItem('tokenIs', currentUserName._id + '-' + userData[0] + '-' + currentUserName.name);
        // ------------- testing needed ------------------------------------

    },
    onNewParticipant: function (numberOfParticipants) {
        var text = numberOfParticipants + ' users are viewing your screen!';

        if (numberOfParticipants <= 0) {
            text = 'No one is viewing your screen YET.';
        }
        else if (numberOfParticipants == 1) {
            text = 'Only one user is viewing your screen!';
        }

        document.title = text;
        showErrorMessage(document.title, 'green');
    },
    oniceconnectionstatechange: function (state) {
        var text = '';
        // console.log(state);
        if (state == 'closed' || state == 'disconnected') {
            text = 'One of the participants just left.';
            document.title = text;
            showErrorMessage(document.title);
        }

        if (state == 'failed') {
            text = 'Failed to bypass Firewall rules. It seems that target user did not receive your screen. Please ask him reload the page and try again.';
            document.title = text;
            showErrorMessage(document.title);
        }

        if (state == 'connected' || state == 'completed') {
            text = 'A user successfully received your screen.';
            document.title = text;
            showErrorMessage(document.title, 'green');
        }

        if (state == 'new' || state == 'checking') {
            text = 'Someone is trying to join you.';
            document.title = text;
            showErrorMessage(document.title, 'green');
        }
    }
};

function showErrorMessage(error, color) {
    $("#share-screen").attr("disabled", false);
    console.log("error>>> ", error);
    $('#logs-message').text(error + '');

}

function getDisplayMediaError(error) {
    if (location.protocol === 'http:') {
        showErrorMessage('Please test this WebRTC experiment on HTTPS.');
    } else {
        showErrorMessage(error.toString());
    }
}

function captureUserMedia(callback) {
    var video = document.createElement('video');
    video.muted = true;
    video.volume = 0;
    video.controls = false;
    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
        video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.setAttribute('controls', false);
    }

    console.log('captureUserMedia1: ', video);
    if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
        function onGettingSteam(stream) {
            video.srcObject = stream;
            // videosContainer.insertBefore(video, videosContainer.firstChild);

            addStreamStopListener(stream, function () {
                console.log("screenshare stopped");
                $("#share-screen").attr("disabled", false);
                $('#rooms-list').html('');
                $("#share-screen").attr("disabled", false);
                localStorage.setItem('screenSharing', 0);
                isbroadcaster = false;
            });

            // $('#logs-message').text('sharing screen ...');
            config.attachStream = stream;
            callback && callback();
            rotateVideo(video);

            // showPrivateLink();
            // document.querySelector('.hide-after-join').style.display = 'none';
        }

        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => {
                onGettingSteam(stream);
            }, getDisplayMediaError).catch(getDisplayMediaError);
        }
        else if (navigator.getDisplayMedia) {
            navigator.getDisplayMedia({ video: true }).then(stream => {
                onGettingSteam(stream);
            }, getDisplayMediaError).catch(getDisplayMediaError);
        }
    }
    else {
        if (DetectRTC.browser.name === 'Chrome') {
            if (DetectRTC.browser.version == 71) {
                showErrorMessage('Please enable "Experimental WebPlatform" flag via chrome://flags.');
            } else if (DetectRTC.browser.version < 71) {
                showErrorMessage('Please upgrade your Chrome browser.');
            } else {
                showErrorMessage('Please make sure that you are not using Chrome on iOS.');
            }
        }

        if (DetectRTC.browser.name === 'Firefox') {
            showErrorMessage('Please upgrade your Firefox browser.');
        }

        if (DetectRTC.browser.name === 'Edge') {
            showErrorMessage('Please upgrade your Edge browser.');
        }

        if (DetectRTC.browser.name === 'Safari') {
            showErrorMessage('Safari does NOT supports getDisplayMedia API yet.');
        }
    }
}

/* on page load: get public rooms */
var conferenceUI = conference(config);
console.log('conferenceUI >', conferenceUI);
var videosContainer = document.getElementById("videos-container");
var remoteScreenshare = document.getElementById("remoteScreenshare");


function screenShare() {
    videosContainer = document.getElementById("videos-container");
    var roomName = document.getElementById('room-name') || {};
    let tokenIs = localStorage.getItem('tokenIs');
    let currentUserName = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem('screenSharing', 1);
    roomName.disabled = true;

    // console.log(roomName);
    // console.log(tokenIs);
     console.log(currentUserName, ' <===> ' , currentUserName);
    // console.log('SS: ', JSON.parse(localStorage.getItem('screenshareUserData')));

    captureUserMedia(function () {
        conferenceUI.createRoom({
            roomName: (currentUserName || '') + '',
            roomData: tokenIs
        });
    });
    $("#share-screen").attr("disabled", true);
    this.disabled = true;
}

function stopScreenshare() {
    $("#share-screen").attr("disabled", false);
    $('#rooms-list').html('');
    $("#share-screen").attr("disabled", false);
    localStorage.setItem('screenSharing', 0);
}
// config.attachStream.getVideoTracks()[0].onended = function () {
//     console.log("STOP SCREENSHARE");
// };

function rotateVideo(video) {
    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    setTimeout(function () {
        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
    }, 1000);
}