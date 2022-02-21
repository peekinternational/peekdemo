
        var config = {
            // via: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs
            openSocket: function (config) {
              
                  //  https://socketio-over-nodejs2.herokuapp.com:443/
                //  https://peekvideochat.com:9559/

                var SIGNALING_SERVER = 'https://peekvideochat.com:9559/';
                console.log();
                var channel = config.channel || 'peekChatSystem';
                //  var channel = "tocherChatSystem";//config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
                var sender = Math.round(Math.random() * 999999999) + 999999999;

                io.connect(SIGNALING_SERVER).emit('new-channel', {
                    channel: channel,
                    sender: sender
                });
            
                var socket = io.connect(SIGNALING_SERVER + channel);
                socket.channel = channel;
                
                socket.on('connect', function () {
                    if (config.callback) config.callback(socket);
                    console.log("Screen share connect");
                });

                socket.send = function (message) {
                    socket.emit('message', {
                        sender: sender,
                        data: message
                    });
                };

                socket.on('message', config.onmessage);
            },
            onRemoteStream: function (media) {
                if (isbroadcaster) return;
                console.log("onRemoteStream");
                var video = media.video;
                // videosContainer.insertBefore(video, videosContainer.firstChild);
                // rotateVideo(video);

                document.querySelector('.hide-after-join').style.display = 'none';

            },
            onRoomFound: function (room) {
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
                console.log(state);
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
             console.log(error);
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
            try {
                video.setAttributeNode(document.createAttribute('autoplay'));
                video.setAttributeNode(document.createAttribute('playsinline'));
                video.setAttributeNode(document.createAttribute('controls'));
            } catch (e) {
                video.setAttribute('autoplay', true);
                video.setAttribute('playsinline', true);
                video.setAttribute('controls', false);
            }

            if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
                function onGettingSteam(stream) {
                    video.srcObject = stream;
                    // videosContainer.insertBefore(video, videosContainer.firstChild);
                 
                    addStreamStopListener(stream, function () {
                        var video = document.createElement('video');
                         console.log(video);
                        let tracks = config.attachStream.getTracks();
                        // let tracks = video.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                        video.srcObject = null;
                       var userDatas= JSON.parse(localStorage.getItem('userData'));
                       var friendIds= localStorage.getItem('friendId');
                        $.ajax({
                            url: "https://peekvideochat.com:22000/stopscreenshare",
                            type: "post",
                            data: {userId:userDatas._id, friendId:friendIds} ,
                            success: function (response) {
                             console.log(response);
                             localStorage.removeItem("friendId");
                            //  $('#onstopscreen').hide();
                            //  $('#onsharescreen').show();
                           
                               // You will get response from your PHP page (what you echo or print)
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
                            }
                        });
                    });

                    console.log(config);
                      var userDatas= JSON.parse(localStorage.getItem('userData'));
                       var friendIds= localStorage.getItem('friendId');
                        $.ajax({
                            url: "https://peekvideochat.com:22000/startscreenshare",
                            type: "post",
                            data: {userId:userDatas._id, startScreen: userDatas._id, friendId:friendIds, viewerUrl:'https://turn.peekvideochat.com/sViewer.html'},
                            success: function (response) {
                             console.log(response);
                             // localStorage.removeItem("friendId");
                               // You will get response from your PHP page (what you echo or print)
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
                            }
                        });
                   
                    $('#logs-message').text('sharing screen ...');
                    config.attachStream = stream;
                    callback && callback();
                    // rotateVideo(video);


                   // showPrivateLink();

                    document.querySelector('.hide-after-join').style.display = 'none';
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
        console.log("iframeshare script loaded");
        /* UI specific */
        // var videosContainer = document.getElementById("videos-container") || document.body;

        function screenShare() {
            var roomName = document.getElementById('room-name') || {};

            let tokenIs = localStorage.getItem('tokenIs');
            let currentUserName = localStorage.getItem('userData');

            roomName.disabled = true;
            console.log(currentUserName);
            captureUserMedia(function () {
                conferenceUI.createRoom({
                    roomName: (currentUserName.name || 'Anonymous') + ' shared his screen with you',
                    roomData: tokenIs
                });
            });
            $("#share-screen").attr("disabled", true);
            this.disabled = true;
        }
        
        function stopScreenShare(){
            var tracks = config.attachStream.getTracks();
            for( var i = 0 ; i < tracks.length ; i++ ) tracks[i].stop();
        }

        // function rotateVideo(video) {
        //     video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
        //     setTimeout(function () {
        //         video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
        //     }, 1000);
        // }

        // function showPrivateLink() {
        //     var uniqueToken = document.getElementById('unique-token');
        //     uniqueToken.innerHTML = '<a href="' + location.href + '" target="_blank">Copy & Share This Private Room Link</a>';
        //     uniqueToken.style.display = 'block';
        // }