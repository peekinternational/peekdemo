var constraints = { video: true, audio: true };

var recBtn = document.querySelector('button#rec');
//var pauseResBtn = document.querySelector('button#pauseRes');
var stopBtn = document.querySelector('button#stop');

var videoElement = $('#screenvideo');//document.querySelector('screenvideo');
var dataElement = document.querySelector('#data');
var downloadLink = $('#o2o_downloadLink');//document.querySelector('a#downloadLink');

console.log("downloadLink: ", downloadLink);
//videoElement.controls = false;

var mediaRecorder;
var chunks = [];
var count = 0;
var localStream = null;
var soundMeter = null;
var micNumber = 0;
var isPaused = false;
var recordingType = 0;
var composedStream;

// +++++++++++++++++++++++++++++++++++++++++++ SCREEN RECORDING ++++++++++++++++++++++++++++++++++++++++++++++
var displayMediaOptions = {
	video: {
		cursor: "always"
	},
	audio: true
};

// const videoElem = document.getElementById("screenvideo");
var screenStream;

function stopCapture(evt) {
	let tracks = videoElement.srcObject.getTracks();

	tracks.forEach(track => track.stop());
	videoElement.srcObject = null;
}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function onShareScreen() {
	console.log("onShareScreen");
	if (!navigator.mediaDevices.getDisplayMedia) {
		alert(
			"navigator.mediaDevices.getDisplayMedia not supported on your browser, use the latest version of Chrome"
		);
	} else {
		if (window.MediaRecorder == undefined) {
			alert(
				"MediaRecorder not supported on your browser, use the latest version of Firefox or Chrome"
			);
		} else {
			navigator.mediaDevices.getDisplayMedia(constraints).then(function (screenStream) {
				//check for microphone
				navigator.mediaDevices.enumerateDevices().then(function (devices) {
					devices.forEach(function (device) {
						if (device.kind == "audioinput") {
							micNumber++;
						}
					});

					if (micNumber == 0) {
						getStreamSuccess(screenStream);
					} else {
						navigator.mediaDevices.getUserMedia({ audio: true }).then(function (micStream) {
							composedStream = new MediaStream();
							$("#meet_stop-btn").show();
							$('#recordingIcon').show();
							$('#recorderMsg').text("Recording screen ...");
							$('#meet_pauseRecording-btn').show();

							//added the video stream from the screen
							screenStream.getVideoTracks().forEach(function (videoTrack) {
								composedStream.addTrack(videoTrack);
							});

							//if system audio has been shared
							if (screenStream.getAudioTracks().length > 0) {
								//merge the system audio with the mic audio
								var context = new AudioContext();
								var audioDestination = context.createMediaStreamDestination();

								const systemSource = context.createMediaStreamSource(screenStream);
								const systemGain = context.createGain();
								systemGain.gain.value = 1.0;
								systemSource.connect(systemGain).connect(audioDestination);
								console.log("added system audio");

								if (micStream && micStream.getAudioTracks().length > 0) {
									const micSource = context.createMediaStreamSource(micStream);
									const micGain = context.createGain();
									micGain.gain.value = 1.0;
									micSource.connect(micGain).connect(audioDestination);
									console.log("added mic audio");
								}

								audioDestination.stream.getAudioTracks().forEach(function (audioTrack) {
									composedStream.addTrack(audioTrack);
								});
							} else {
								//add just the mic audio
								micStream.getAudioTracks().forEach(function (micTrack) {
									composedStream.addTrack(micTrack);
								});
							}

							getStreamSuccess(composedStream);

						})
							.catch(function (err) {
								log("navigator.getUserMedia error: " + err);
							});
					}
				})
					.catch(function (err) {
						log(err.name + ": " + err.message);
					});
			})
				.catch(function (err) {
					log("navigator.getDisplayMedia error: " + err);
				});
		}
	}
}

function getStreamSuccess(stream) {
	localStream = stream;
	localStream.getTracks().forEach(function (track) {
		if (track.kind == "audio") {
			track.onended = function (event) {
				//recheck needed
				var tracks = localStream.getTracks();
				for (var i = 0; i < tracks.length; i++) tracks[i].stop();

				$('#recordingIcon').hide();
				$('#recorderMsg').text("");

				onBtnStopClicked();
				log("audio track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
			};
		}
		if (track.kind == "video") {
			track.onended = function (event) {
				//recheck needed
				var tracks = localStream.getTracks();
				for (var i = 0; i < tracks.length; i++) tracks[i].stop();

				$('#recordingIcon').hide();
				$('#recorderMsg').text("");

				onBtnStopClicked();
				log("video track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
			};
		}
	});

	//videoElement.srcObject = localStream;
	//	videoElement.play();
	//videoElement.muted = true;
	//recBtn.disabled = false;
	//	shareBtn.disabled = true;

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.audioContext = new AudioContext();
	} catch (e) {
		log("Web Audio API not supported.");
	}

	soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
	soundMeter.connectToSource(localStream, function (e) {
		if (e) {
			log(e);
			return;
		}
	});

	if (localStream == null) {
		alert("Could not get local stream from mic/camera");
	} else {
		//	recBtn.disabled = true;
		//	stopBtn.disabled = false;

		/* use the stream */
		log("Start recording...");
		if (typeof MediaRecorder.isTypeSupported == "function") {
			if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
				var options = { mimeType: "video/webm;codecs=vp9" };
			} else if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
				var options = { mimeType: "video/webm;codecs=h264" };
			} else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
				var options = { mimeType: "video/webm;codecs=vp8" };
			}
			log("Using " + options.mimeType);
			mediaRecorder = new MediaRecorder(localStream, options);
		} else {
			log("isTypeSupported is not supported, using default codecs for browser");
			mediaRecorder = new MediaRecorder(localStream);
		}

		mediaRecorder.ondataavailable = function (e) {
			chunks.push(e.data);
		};

		mediaRecorder.onerror = function (e) {
			log("mediaRecorder.onerror: " + e);
		};

		mediaRecorder.onstart = function () {
			log("mediaRecorder.onstart, mediaRecorder.state = " + mediaRecorder.state);

			localStream.getTracks().forEach(function (track) {
				if (track.kind == "audio") {
					log("onstart - Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
				}
				if (track.kind == "video") {
					log("onstart - Video track.readyState=" + track.readyState + ", track.muted=" + track.muted);
				}
			});
		};

		mediaRecorder.onstop = function () {
			$('#recordingIcon').hide();
			$('#recorderMsg').text("");

			log('mediaRecorder.onstop, mediaRecorder.state = ' + mediaRecorder.state);
			$("#clearRecordDownloads").show();
			$("#record-options").show();
			$("#saveRecording-btn").show();
			$("#group-saveRecording-btn").show();
			$('#group-saveRecording-btn').attr("style", "display: block !important");

			$("#o2o-saveRecording-btn").show();
			$('#o2o-saveRecording-btn').attr("style", "display: block !important");

			var tracks = localStream.getTracks();
			for (var i = 0; i < tracks.length; i++) tracks[i].stop();

			var blob = new Blob(chunks, { type: "video/webm" });
			window.recordingBlob = blob;
			chunks = [];

			var videoURL = window.URL.createObjectURL(blob);
			window.recordingvideoURL = videoURL;

			//	console.log("recorder type: ", recordingType);
			if (recordingType == 0) {
				if (!downloadLink || downloadLink == null) downloadLink = $('#o2o_downloadLink');
			}
			else if (recordingType == 1) {
				if (!downloadLink || downloadLink == null) downloadLink = $('#group_downloadLink');
			}
			else {
				if (!downloadLink || downloadLink == null) downloadLink = $('#meet_downloadLink');
			}

			//  console.log('downloadLink on stop: ', downloadLink);
			//  console.log(videoURL);

			if (recordingType == 0) {
				$("#o2o_downloadLink").attr("href", videoURL);
				$("#o2o_downloadLink").text("Download video file");
			}
			else if (recordingType == 1) {
				$("#group_downloadLink").attr("href", videoURL);
				$("#group_downloadLink").text("Download video file");
			}
			else {
				$("#meet_downloadLink").attr("href", videoURL);
				$("#meet_downloadLink").text("Download video file");
			}

			var rand = Math.floor((Math.random() * 10000000));
			var name = "video_" + rand + ".webm";

			if (recordingType == 0) {
				$("#o2o_downloadLink").attr("download", name);
				$("#o2o_downloadLink").attr("name", name);
			}
			else if (recordingType == 1) {
				$("#group_downloadLink").attr("download", name);
				$("#group_downloadLink").attr("name", name);
			}
			else {
				$("#meet_downloadLink").attr("download", name);
				$("#meet_downloadLink").attr("name", name);
			}

		};

		mediaRecorder.onwarning = function (e) {
			log("mediaRecorder.onwarning: " + e);
		};

		mediaRecorder.start(10);

		localStream.getTracks().forEach(function (track) {
			log(track.kind + ":" + JSON.stringify(track.getSettings()));
			console.log(track.getSettings());
		});
	}
}

function onBtnRecordClicked(recordType) {
	recordingType = recordType;
	onShareScreen();
}

function resetDownloadLink() {
	$("#saveRecording-btn").hide();
	$("#group-saveRecording-btn").hide();
	$("#o2o-saveRecording-btn").hide();

	setTimeout(() => {

		if (recordingType == 0) {
			$("#o2o_downloadLink").attr("href", "videoURL");
			$("#o2o_downloadLink").text("");
			$("#o2o_downloadLink").attr("download", "");
			$("#o2o_downloadLink").attr("name", "");
			$("#o2o_clearRecordDownloads").hide();
		}
		else if (recordingType == 1) {
			$("#group_downloadLink").attr("href", "videoURL");
			$("#group_downloadLink").text("");
			$("#group_downloadLink").attr("download", "");
			$("#group_downloadLink").attr("name", "");
			$("#group_clearRecordDownloads").hide();
		}
		else {
			$("#meet_downloadLink").attr("href", "videoURL");
			$("#meet_downloadLink").text("");
			$("#meet_downloadLink").attr("download", "");
			$("#meet_downloadLink").attr("name", "");
			$("#meet_clearRecordDownloads").hide();
		}

	}, 100);
}

navigator.mediaDevices.ondevicechange = function (event) {
	log("mediaDevices.ondevicechange");
}

function onClearFileClicked() {
	$("#saveRecording-btn").hide();
	$("#o2o-saveRecording-btn").hide();
	$("#group-saveRecording-btn").hide();
	downloadLink.href = '';
	downloadLink.innerHTML = '';
	downloadLink.setAttribute("download", '');
	downloadLink.setAttribute("name", '');
}

function onBtnStopClicked() {
	$('#recordingIcon').hide();
	$('#recorderMsg').text("");
	$("#meet_stop-btn").hide();
	// $("#o2o_clearRecordDownloads").show();
	// $("#group_clearRecordDownloads").show();
	// $("#meet_clearRecordDownloads").show();
	$('#meet_pauseRecording-btn').hide();
    $('#group_record-options').hide();
	$('#recordSaveModal').show();
	
	mediaRecorder.stop();
	//	videoElement.controls = true;
	//  recBtn.disabled = false;
	//	pauseResBtn.disabled = true;
	//	stopBtn.disabled = true;
	// composedStream.getVideoTracks()[0].onended = function () {};
	// let tracks1 = composedStream.getTracks();
	// for (let i = 0; i < tracks1.length; i++) tracks1[i].stop();


	let tracks = localStream.getTracks();
	for (let i = 0; i < tracks.length; i++) tracks[i].stop();
}

function onPauseResumeClicked() {
	isPaused = !isPaused;

	if (isPaused) {
		//pauseResBtn.textContent = "Resume";
		$('#meet_pauseRecording-btn').show();
		$('#recordingIcon').show();
		$('#o2o_pauseRecording-btn').text("Resume");
		$('#group_pauseRecording-btn').text("Resume");
		$('#meet_pauseRecording-btn').text("Resume");
		$('#recorderMsg').text("Screen recording paused");

		mediaRecorder.pause();
		// stopBtn.disabled = true;
	} else {
		// pauseResBtn.textContent = "Pause";
		$('#meet_pauseRecording-btn').show();
		$('#recordingIcon').show();
		$('#recorderMsg').text("Screen recording ...");
		$('#o2o_pauseRecording-btn').text("Paused");
		$('#group_pauseRecording-btn').text("Paused");
		$('#meet_pauseRecording-btn').text("Paused");
		mediaRecorder.resume();
		// stopBtn.disabled = false;
	}
	// recBtn.disabled = true;
	// pauseResBtn.disabled = false;
}

function log(message) {
	//dataElement.innerHTML = dataElement.innerHTML + '<br>' + message;
	console.log(message)
}

// Meter class that generates a number correlated to audio volume.
// The meter class itself displays nothing, but it makes the
// instantaneous and time-decaying volumes available for inspection.
// It also reports on the fraction of samples that were at or near
// the top of the measurement range.
function SoundMeter(context) {
	this.context = context;
	this.instant = 0.0;
	this.slow = 0.0;
	this.clip = 0.0;
	this.script = context.createScriptProcessor(2048, 1, 1);
	var that = this;
	this.script.onaudioprocess = function (event) {
		var input = event.inputBuffer.getChannelData(0);
		var i;
		var sum = 0.0;
		var clipcount = 0;
		for (i = 0; i < input.length; ++i) {
			sum += input[i] * input[i];
			if (Math.abs(input[i]) > 0.99) {
				clipcount += 1;
			}
		}
		that.instant = Math.sqrt(sum / input.length);
		that.slow = 0.95 * that.slow + 0.05 * that.instant;
		that.clip = clipcount / input.length;
	};
}

SoundMeter.prototype.connectToSource = function (stream, callback) {
	console.log("SoundMeter connecting");
	try {
		this.mic = this.context.createMediaStreamSource(stream);
		this.mic.connect(this.script);
		// necessary to make sample run, but should not be.
		this.script.connect(this.context.destination);
		if (typeof callback !== "undefined") {
			callback(null);
		}
	} catch (e) {
		console.error(e);
		if (typeof callback !== "undefined") {
			callback(e);
		}
	}
};
SoundMeter.prototype.stop = function () {
	this.mic.disconnect();
	this.script.disconnect();
};
