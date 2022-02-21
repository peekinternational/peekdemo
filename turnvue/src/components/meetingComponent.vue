<template>
  <div>
    <!--Login form -->
    <div class="container" id="meetinglogin">
      <div class="row" style="margin-top: 90px;">
        <div class="col col-md-3">

        </div>
        <div class="col col-md-6">
          <div style="text-align:center">
            <img src="../assets/images/logo/logo_big.png" alt="" />
            <h3 style="margin: 21px 0 21px;">{{ $t("WelcomeToChattoMeeting") }}</h3>
          </div>

          <div class="form-group">
            <label for="name">{{ $t('Name') }}:</label>
            <input type="text" class="form-control" v-model="input.name" :placeholder="$t('EnterName')" id="name">
          </div>
          <div class="form-group">
            <label for="email">{{ $t('MeetingID') }}:</label>
            <input type="email" class="form-control" v-model="input.email" :placeholder="$t('EnterMeetingId')" id="email">
          </div>
          <div class="form-group">
            <label for="pwd">{{ $t('MeetingPassword') }}:</label>
            <input type="password" class="form-control" v-model="input.password" :placeholder="$t('EnterMeetingPassword')" id="pwd">
          </div>

          <button @click="meetingLogin()" class="btn btn-lg btn-primary btn-block">{{ $t("JoinMeeting") }}</button>

           <div style="margin-top: 10px; float: right;">
             <select style="width: 150px; padding: 6px; margin-left: 10px; margin-bottom: 7px; border-radius: 4px; border: 1px solid #787575;" v-model="selected_language"  @change="changelanguage($event)">
                  <template v-for="locale in locales" :key="locale">
                    <option :value="locale" >{{ $t(locale) }}</option>
                  </template>
             </select>
           </div>

        </div>

      </div>

    </div>



    <div class="container-fluid" id="meetingSection" style="background-color: #2C3550;
    height: calc(119.8vh - 20vh);display:none">
      <div class="row meetingRow">
        <div class="col-">
          <div class="profile" style="width: 56px;height: 56px;">
            <span> {{getFirstLetter(meedtingData.meeting_title)}}</span>
          </div>
        </div>
        <div class="col col-md-5">
          <p>{{meedtingData.meeting_title}}</p>
          <p>{{isToday(meedtingData.meeting_date)}}</p>
        </div>
        <div class="col col-md-6" style="flex: 1 0 50%;max-width: 62%;padding-right: 0px;">
        </div>
      </div>

      <div class="row" style="margin-top: 2px;overflow-y: auto;">
        <div class="col col-md-12" id="mainMeeting" style="height: calc(98vh - 69px);">
          <template v-if="adminStatus1 || userStatus1">
            <vue-jitsi-meet ref="jitsiRef" domain="stun.ringy.jp" :options="jitsiOptions"></vue-jitsi-meet>
            
            <!-- <div class="bg-img chatbutton">
               <img src="../assets/images/fileIcon.png">
               <span> {{ messageCount }} </span>
           </div> -->

           <span id="chatopen" class="bg-img chatbutton" v-if="chatTrue" @click="chatOpen()">
              <span class="activecss1" v-bind:class="{'dot-btn dot-danger grow' : presentersMsg }" style="vertical-align: text-bottom;">
                <!-- <img class="" src="../assets/images/nav/meetings.svg" alt="Avatar" style="height: auto;" /> -->
              </span>

              <img class="" src="../assets/images/icons/white-chat.png" alt="Avatar" style="border-radius: 0px;" />
           </span>

           <span class="bg-img chatbutton" v-if="chatFalse" @click="chatClose()">
             <img class="" src="../assets/images/icons/white-chat.png" alt="Avatar" style="border-radius: 0px;" />
           </span>
           <!--

            <img v-if="chatTrue" @click="chatOpen()" class="bg-img chatbutton"
              src="../assets/images/icons/white-chat.png" style="border-radius: 0px;" alt="Avatar" />

            <img class="bg-img chatbutton" v-if="chatFalse" @click="chatClose()"
              src="../assets/images/icons/mclosechat.png" alt="Avatar" /> -->


            <img class="bg-img recordbutton" @click="screenRecording()" src="../assets/images/icons/mrecord.png"
              style="border-radius: 0px;" alt="Avatar" />

            <div id="record-options" style="display:none;padding: 7px; align-items: center;" class="">

              <div class="group_record-options"
                style="width: 195px;position: absolute;z-index: 999;background-color: white; padding: 10px;bottom: 81px; left: 3%; border-radius: 3px;">
                <ul style="display: flex; flex-direction: column;">
                  <li id="meet_stop-btn" class="record_btn" @click="o2o_stopRecording()" style="cursor: pointer;">Stop</li>
                  <li id="meet_pauseRecording-btn" class="record_btn" style="display: none;" @click="pauseRecording()">Pause</li>
                  <!-- <li id="saveRecording-btn" class="save-record_btn" style="display: none; cursor: pointer;" @click="saveRecording()">Save Recording</li> -->

                  <!-- <li style="padding-top: 5px;">
                    <a id="meet_downloadLink" class="record_btn" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
                  </li> -->
                  <!-- <li style="width: 100%">
                    <span id="meet_clearRecordDownloads" class="clear-record_btn" @click="resetRecordLink()"
                      style="cursor: pointer; display: none;"> Clear </span>
                  </li> -->
                </ul>
              </div>
            </div>

          </template>

        </div>

        <div class="chat-content tabto" id="startMeetingchat"
          style="display: none;background-color: rgb(237, 238, 241);">
          <div class=" messages custom-scroll active messageschat" id="meetingsDiv" style="height: auto; overflow-y: scroll;">
            <div class="contact-chat" style="height: calc(78vh - 95px); min-height: calc(78vh - 76px);margin-top: 0px;">
              <ul class="chatappend" v-for="chat in meetingChat">
                <li class="replies" style="padding-bottom:20px" v-if="chat.senderId._id == userEmail">
                  <div class="media">
                    <div class="profile mr-4">
                      <div class="userprofile">
                        <span style="z-index: 0;"> {{getFirstLetter(chat.senderId.name)}}</span>
                      </div>
                    </div>

                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{chat.senderId.name}}</h5>
                        <h6>{{chatTime(chat.createdAt)}}</h6>

                        <ul class="msg-box">
                          <li class="msg-setting-main">
                            <h5>{{ chat.message }}</h5>
                          </li>
                        </ul>

                      </div>
                    </div>
                  </div>
                </li>
                <li class="sent" style="padding-bottom:20px" v-else>
                  <div class="media">
                    <div class="profile mr-4">
                      <div class="userprofile">
                        <span style="z-index: 0;"> {{getFirstLetter(chat.senderId.name)}}</span>
                      </div>
                    </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{chat.senderId.name}}</h5>
                        <h6>{{chatTime(chat.createdAt)}}</h6>
                        <ul class="msg-box">
                          <li class="msg-setting-main">
                            <h5>{{ chat.message }} </h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </div>

          </div>

          <VEmojiPicker @select="selectmeetingEmoji" class="" v-bind:class="{activeChatemoji: ismeetingemojiActive}"
            v-if="ismeetingemojiActive" />
          <div class="message-input row" id="singlemessage-input"
            style="bottom: 0%;width:25%;height: calc(19vh - 76px);">

            <div class="wrap emojis-main col-12">

              <div class="dot-btn dot-primary mr-3">
                <a class="icon-btn btn-outline-primary button-effect " @click="showMeetingemoji">
                  <smile-icon size="1.5x" class="custom-class"></smile-icon>
                </a>
              </div>

              <!--  <label class="icon-btn btn-outline-primary mr-4" for="fileupload">
                        <file-plus-icon size="1.5x" class="custom-class"></file-plus-icon>
                      </label> -->
              <!-- <input type="file" id="fileupload" ref="myFiles" style="display:none" @change="uploadfile($event)" multiple> -->
              <textarea class="setemoj" id="setemoj" ref="afterroomClick" type="text" @keydown.enter.exact.prevent
                @keyup.enter.exact="meetingchat()" @keydown.enter.shift.exact="newline" v-model="message"
                :placeholder="$t('WriteMessage')" rows="3" cols="50">
              </textarea>

              <button class="submit icon-btn btn-primary disabled mr-3 ml-3" v-show="onChat" @click="meetingchat()"
                id="send-msg" style="width: 65px;" disabled="disabled">
                <send-icon size="1.5x" class="custom-class"></send-icon>
              </button>

              <button class="submit icon-btn btn-primary mr-3 ml-3" style="width: 65px; display:none" v-show="onEditclear" @click="clearchat()">
                <x-icon size="1.5x" class="custom-class"></x-icon>
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>

<div class="modal" id="recordSaveModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Recording Stopped</h5>
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body">
       
      </div>
      <div class="record-model_footer">
        <!-- <button type="button" class="btn btn-primary">Download</button> -->
        <a id="meet_downloadLink" class="record_btn" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
        <button type="button" class="save-record_btn" @click="saveRecording()">Save</button>
        <button type="button" class="clear-record_btn" data-dismiss="modal" @click="resetRecordLink()">Close</button>
      </div>
    </div>
  </div>
</div>


  </div>

</template>

<script>
  import Vue from 'vue';
  import $ from 'jquery';
  import JQuery from 'jquery';
  import 'bootstrap';
  import feather from 'feather-icons';
  import Popper from 'popper.js';
  import Toasted from 'vue-toasted';
  import moment from 'moment';
  import VEmojiPicker from 'v-emoji-picker';
  import { JitsiMeet } from '@mycure/vue-jitsi-meet';
  import { Trash2Icon, CheckIcon, AirplayIcon, AtSignIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneIncomingIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon } from 'vue-feather-icons';


  export default {
    name: 'JoinMeeting',
    components: { Trash2Icon, CheckIcon, VEmojiPicker, PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon, VueJitsiMeet: JitsiMeet },
    props: [],
    data() {
      return {
        c_user: '',
        input: {
          name: "",
          email: "",
          password: ""
        },
        meetingId: '',
        errorMessage: '',
        meedtingData: '',
        meetingChat: [],
        isConnected: false,
        socketMessage: '',
        userId: '',
        singlefriend: {},
        msgObj: {},
        message: '',
        friendchat: {},
        chatdata: {},
        typing: false,
        messagecopy: '',
        editChatid: '',
        onEditclear: false,
        onChat: true,
        formDatas: {},
        replyBox: false,
        chatreplydata: {},
        userdec: {},
        fullPage: true,
        isSeen: false,
        isActive: false,
        ismeetingemojiActive: false,
        userid: '',
        windowHeight: 0,
        friendid: '',
        userEmail: '',
        chatTrue: true,
        chatFalse: false,
        members: '',
        meetingVideoPause: true,
        meetingVideoPlay: false,
        meetingAudioPause: true,
        meetingAudioPlay: false,
        screenshareActive: true,
        stopscreenshareActive: false,
        startScreenuser: '',
        screenActive: false,
        adminStatus1: '',
        userStatus1: '',
        callDisable: true,
        messageCount: 0,
        presentersMsg: false,
        locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(','),
        selected_language: "english"
      }
    },

    beforeMount() {
      window.addEventListener("beforeunload", this.preventNav, false)
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("beforeunload", this.preventNav, false);
      })
    },

    beforeRouteLeave(to, from, next) {

      //   if (this.isGroupcall) {
      // if (!window.confirm("Leave without saving?")) {
      //   return;
      // }
      // }
      next();
    },

    beforeCreate: function () {
      // if (localStorage.getItem("userData") == null) {
      //   this.$router.push('/login')
      // }
    },
    sockets: {
      connect: function () {
        console.log('socket connected successfully')
      },

      disconnect() {
        console.log('socket disconnected')
      },


      /////////////////////////////CHAT SECTION////////////////////////


    // receivemsg(data) {
    //   console.log("receivemsg: ", data);
    //   if (this.c_user._id == data.msgData.receiverId._id && this.singlefriend._id == data.msgData.senderId._id) 
    //     this.presentersMsg2= true;
    //   else if (this.c_user._id == data.selectFrienddata) 
    //     this.presentersMsg= true;
    // },

      receiveMeetingmsg(data) {
     //  console.log("receiveMeetingmsg");
     //  console.log(data.receiverId , '==' , this.meetingId);
        if (data.receiverId == this.meetingId) {
        //  console.log("receiveMeetingmsg INSIDE");
          if (this.chatTrue) $('#chatopen').addClass('dot-btn dot-success grow');
          this.meetingChat.push(data);
          var containers = this.$el.querySelector("#meetingsDiv");
          // console.log(containers.scrollHeight);
          $("#meetingsDiv").animate({ scrollTop: containers.scrollHeight - 200 }, "fast");
          // console.log(this.broadcastChat);
        }

      },
      receivescreenUrl(data) {
       // console.log(data);
        this.startScreenuser = data.startScreen;
        var meetingId = this.$route.query.meetingId;
        if (data.friendId == meetingId && data.userId != this.c_user._id) {
          var html = '<iframe style="width: 100%;height: calc(80vh - 30px);" src="' + data.viewerUrl + '" title="description">';
          $('#participants').children('div').removeClass('participant');
          $('#participants').children('div').addClass('participantscreen');
          $('#participants').css({ "display": "none" });
          $('#remoteScreenshare').css({ "display": "block" });
          this.screenActive = true;
          // console.log(this.screencode);
          $('#remoteScreenshare').html(html);
          localStorage.setItem('screenSharing', 0);
        }
      },
      receivestopScreenshare(data) {
        if (data.userId == this.c_user._id) {
          this.stopscreenshareActive = false;
          this.screenshareActive = true;
        }
        var meetingId = this.$route.query.meetingId;
        if (data.friendId == meetingId && data.userId != this.c_user._id) {
          this.screenActive = false;
          $('#participants').children('div').removeClass('participantscreen');
          $('#participants').children('div').addClass('participant');
          $('#remoteScreenshare').css('display', 'none');
          $('#participants').css({ "display": "-webkit-box" });
          $('#remoteScreenshare').html('');

          localStorage.setItem('screenSharing', 0);
        }
      },
    },
    computed: {
      jitsiOptions() {
        return {
          roomName: this.meetingId,
          noSSL: false,
          userInfo: {
            email: this.c_user.email,
            displayName: this.c_user.name,
          },
          configOverwrite: {
            enableNoisyMicDetection: false,
            disableSimulcast: true,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'stats',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ],

            AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
            AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',
            AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
            BRAND_WATERMARK_LINK: ' ',
            CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables 
            CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
            CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
            CONNECTION_INDICATOR_DISABLED: false,
            DEFAULT_BACKGROUND: '#474747',
            DEFAULT_LOCAL_DISPLAY_NAME: 'me',
            DEFAULT_LOGO_URL: 'https://stun.peekvideochat.com/images/watermark.png',
            DEFAULT_REMOTE_DISPLAY_NAME: 'Loading',
            DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
            DISABLE_FOCUS_INDICATOR: false,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
            DISABLE_PRESENCE_STATUS: false,
            DISABLE_RINGING: false,
            DISABLE_TRANSCRIPTION_SUBTITLES: false,
            DISABLE_VIDEO_BACKGROUND: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            ENABLE_DIAL_OUT: true,
            ENABLE_FEEDBACK_ANIMATION: false, // Enables feedback star animation.
            FILM_STRIP_MAX_HEIGHT: 120,
            filmStripOnly: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            HIDE_INVITE_MORE_HEADER: true,
            INITIAL_TOOLBAR_TIMEOUT: 20000,
            JITSI_WATERMARK_LINK: 'http://peekinternational.com/',
            LANG_DETECTION: true, // Allow i18n to detect the system language
            LIVE_STREAMING_HELP_LINK: 'http://peekinternational.com/', // Documentation reference for the live streaming feature.
            LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9

            MAXIMUM_ZOOMING_COEFFICIENT: 1.3,

            MOBILE_APP_PROMO: false,
            // NATIVE_APP_NAME: 'Als Web Cam',
            OPTIMAL_BROWSERS: ['chrome', 'chromium', 'firefox', 'nwjs', 'electron', 'safari'],
            POLICY_LOGO: null,
            // PROVIDER_NAME: 'Als Web Cam',
            RECENT_LIST_ENABLED: false,
            REMOTE_THUMBNAIL_RATIO: 1, // 1:1
            SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
            SHOW_BRAND_WATERMARK: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            SHOW_DEEP_LINKING_IMAGE: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            SHOW_WATERMARK_FOR_GUESTS: true, // if watermark is disabled by default, it can be shown only for guests
            SUPPORT_URL: 'http://peekinternational.com/',
            TOOLBAR_ALWAYS_VISIBLE: true,
            disableDeepLinking: true,
            TOOLBAR_TIMEOUT: 4000,
            UNSUPPORTED_BROWSERS: [],
            VERTICAL_FILMSTRIP: true,
            VIDEO_LAYOUT_FIT: 'both',
            VIDEO_QUALITY_LABEL_DISABLED: false,
            makeJsonParserHappy: 'even if last key had a trailing comma'

          },
          onload: this.onIFrameLoad
        };
      },
    },
    watch: {
      message() {
        if (this.message.length > 0) {
          $('#send-msg').removeClass('disabled').attr("disabled", false);
        } else {
          $('#send-msg').removeClass('disabled').attr("disabled", true);
        }
      }
    },

    methods: {

      changelanguage(value){
              let locale = value.target.value;
               if(this.$i18n.locale !== locale){
                  this.$i18n.locale = locale;
               }

       axios.post('/updateLang', {
          "lang": locale,
          "userId": this.c_user._id,
          "projectId": '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
           console.log(response);
        }, function(err) {
           console.log(err);
        });
               
   },

      preventNav(event) {
        if (!this.callDisable) return
        console.log(event);
        event.preventDefault();
        event.returnValue = " Hello Nabeel";
        this.meetingstopKCall();
        return undefined;
      },

      onIFrameLoad() {
        this.$refs.jitsiRef.addEventListener('participantJoined', this.onParticipantJoined);
        this.$refs.jitsiRef.addEventListener('videoConferenceLeft', this.meetingstopKCall);
      },

      onParticipantJoined(e) {
        // alert('join');
      },

      // meetingstopKCall (e) {
      //   alert('left');
      // },

      selectmeetingEmoji(emoji) {
        // console.log(emoji.data)
        //this.emoj.push(emoji.data);
        this.message += emoji.data;
        console.log(this.message);

        $('#send-msg').removeClass('disabled').attr("disabled", false);

      },


      showMeetingemoji() {

        this.ismeetingemojiActive = !this.ismeetingemojiActive;
      },

      onCopy: function (e) {

        this.$toasted.success(this.$t('clipboard'), {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 5000
        })
      },
      onError: function (e) {
        alert('Failed to copy texts')
      },

      copymsg(msg) {
        this.messagecopy = msg;
      },

      getFirstLetter(str) {
        // console.log(str);
        if (str) {
         var acronym = str.replace(/\s/g, '').split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
            return acronym;
        }

      },
      isToday(date) {
        return moment(date).format('l');
      },
      chatTime(date) {
        return moment(date).format('LT');
      },
      meetingstopKCall() {

        this.callDisable = false;
        var adminStatus = this.$session.get('isMeetingAdmin');
        var meetingId = this.$route.query.meetingId;
        console.log(adminStatus);

        if (adminStatus == true) {

          axios.post('/updateMeetingStatus', {
            '_id': meetingId, 'activeStatus': 0, 'meetingStatus': 0, projectId: '5d4c07fb030f5d0600bf5c03'
          }).then((response) => {
            console.log(response);
            this.$session.destroy('isMeetingAdmin');
            window.close();
            // this.$router.push('/?meeting=meeting').catch(()=>{});

          }, function (err) {
            console.log('err', err);
            alert('error');
          })

        }
        else {
          this.$session.destroy('isMeetingUser');
          localStorage.removeItem("userMeeting");
          $('#meetingSection').hide();
          $('#meetinglogin').show();

        }

        // leaveRoom();
      },

      meetingLogin() {
        var meetingId = this.$route.query.meetingId;
        axios.post('/checkJoiningUser', {
          _id: meetingId,
          name: this.input.name,
          email: this.input.email,
          password: this.input.password,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
          $("#record-options").hide();

          console.log(response);
          if (response.data.adminActive == 1) {
            localStorage.setItem('userMeeting', JSON.stringify({ 'status': true, 'name': this.input.name, '_id': this.input.email }));
            this.c_user = JSON.parse(localStorage.getItem('userMeeting'));
            console.log(this.c_user._id, 'adasdasdadadadas');
            var name = this.input.name;
            var calltype = 'meeting';
            // register(meetingId, name,calltype);
            $('#meetinglogin').hide();
            $('#meetingSection').show();
            this.$session.set('isMeetingUser', { 'status': true, 'name': this.input.name, 'userEmail': this.input.email });
            window.location.href = '/meeting?meetingId=' + meetingId;
            // this.$router.push('/meeting?meetingId='+meetingId).catch(()=>{});
          } else if (response.data.status == 1 && response.data.adminActive == 0) {

            this.$session.set('isMeetingUser', { 'status': true, 'name': this.input.name });
            localStorage.setItem('userMeeting', JSON.stringify({ 'status': true, 'name': this.input.name, '_id': this.input.email }));
            this.c_user = JSON.parse(localStorage.getItem('userMeeting'));
            this.$router.push('/joinmeeting?meetingId=' + meetingId).catch(() => { });

          } else {
            alert('wrong email and password');
          }

        }, function (err) {
          console.log('err', err);
          alert('error');
        })
      },
      meetingchat() {

        this.ismeetingemojiActive = false;
        var adminStatus = this.$session.get('isMeetingAdmin');
        if (adminStatus == true) {
          this.userEmail = this.c_user.email;
          this.bcJoinedChat = {
            senderId: { _id: this.c_user.email, name: this.c_user.name },
            receiverId: this.meetingId,
            message: this.message,
            chatType: 2
          }
        } else {
          var userdata = this.$session.get('isMeetingUser');
          this.userEmail = userdata.userEmail;
          this.bcJoinedChat = {
            senderId: { _id: userdata.userEmail, name: userdata.name },
            receiverId: this.meetingId,
            message: this.message,
            chatType: 2
          }
        }

        this.$socket.emit('meetingMsg', this.bcJoinedChat);
        this.message = ''; //emit socket to show other 
      },
      chatOpen() {
        this.presentersMsg= false;
        this.chatTrue = false;
        this.chatFalse = true;
        $('#mainMeeting').removeClass('col-md-12');
        $('#mainMeeting').addClass('col-md-9');
        $('#startMeetingchat').addClass('col-md-3');
        $('#startMeetingchat').show();
        $('#chatopen').removeClass('dot-btn dot-success grow');
      },

      chatClose() {
        this.chatFalse = false;
        this.chatTrue = true;
        $('#startMeetingchat').removeClass('col-md-3');
        $('#mainMeeting').addClass('col-md-12');
        $('#startMeetingchat').hide();
      },

      screenSharing() {
        console.log(this.screenActive);
        if (this.screenActive) {
          alert('you can not share screen');

        } else {
          var friendId = this.meetingId;
          screenShare();
          localStorage.setItem('friendId', friendId);
          // this.$socket.emit('screenUrl',{userId:this.c_user._id, startScreen: this.c_user._id, friendId:this.meetingId, viewerUrl:'https://chat.chatto.jp/sViewer.html'} );
          this.screenshareActive = false;
          this.stopscreenshareActive = true;
        }
      },

      stopScreenShare() {

        this.stopscreenshareActive = false;
        this.screenshareActive = true;

        this.$socket.emit('stopscreenshare', { userId: this.c_user._id, friendId: this.meetingId });
        stopScreenShare();
      },

      screenRecording() {
        this.recordOptions = !this.recordOptions;
        console.log("screenRecording: ", this.recordOptions);
        onBtnRecordClicked(2);

        if (this.recordOptions) {
          $("#record-options").show();
        } else {
          $("#record-options").hide();
        }
      },

      startRecording() {
        console.log("startRecording function called");
        onBtnRecordClicked(2);
      },
      pauseRecording() {
        onPauseResumeClicked();
      },

      o2o_stopRecording(){
        onBtnStopClicked();
      },

      saveRecording() {
        $('#recordSaveModal').hide();
        console.log("Saving recording to chat");
        //onBtnStopClicked();
        //console.log("meedtingData: ", this.meedtingData);
        //console.log("recordingBlob: ", window.recordingBlob);
        //console.log("recordingvideoURL: ", window.recordingvideoURL);
        $("#saveRecording-btn").hide();
	      $('#meet_pauseRecording-btn').hide();

        let _formData = new FormData();
        _formData.append('file', window.recordingBlob, (this.meedtingData.meeting_title + "_recording.mp4"));
        _formData.append('_id', this.meedtingData._id);
        _formData.append('fileName', (this.meedtingData.meeting_title + "_recording.mp4"));
        _formData.append('recordingUrl', window.recordingvideoURL);
        _formData.append('projectId', '5d4c07fb030f5d0600bf5c03');

        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        $("#record-options").hide();
        let meetingSocketData = {
          "meetingId": this.meedtingData._id,
          "recordingFileName": (this.meedtingData.meeting_title + "_recording.mp4")
        }

        axios.post('/updateMeetingFile', _formData, config).then((response) => {
           this.$socket.emit('meetingRecordFile', meetingSocketData);

          this.$toasted.success('Recording saved', {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 5000
        })
        });
      },

      resetRecordLink() {
        $('#recordSaveModal').hide();
        $("#record-options").hide();
        resetDownloadLink();
      },

      //     room_screenRecording(){

      //     // this.recordOptions = !this.recordOptions;
      //      onBtnRecordClicked(1);
      //     $("#saveRecording-btn").show();

      // },
      // saveRecording() {

      //        // console.log("recordingBlob: ", window.recordingBlob);
      //        // console.log("callGroup: ", this.callGroup);

      //         $("#saveRecording-btn").hide();
      //         $("#group-saveRecording-btn").hide();

      //         let groupformDatas = new FormData();
      //         let randFileNo = Math.floor(10 + Math.random() * 90);


      //         groupformDatas.append('file', window.recordingBlob, (this.meetingId + randFileNo + "_recording.mp4"));
      //         groupformDatas.append('senderId', this.c_user._id);
      //         groupformDatas.append('senderName', this.c_user.name);
      //         groupformDatas.append('groupId', this.meetingId);
      //         groupformDatas.append('isGroup', 2);
      //         groupformDatas.append('messageType', 1);
      //         groupformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03')

      //         let config = {
      //           header: {
      //             'Content-Type': 'multipart/form-data'
      //           }
      //         }


      //         axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
      //          // console.log('chatFilesShare', response);
      //           this.groupmsgObj = {
      //             _id: response.data.data._id,
      //             chatType: 0,
      //             isGroup: 2,
      //             messageType: response.data.data.messageType,
      //             senderId: { _id: this.c_user._id, name: this.c_user.name },
      //             senderName: this.c_user.name,
      //             message: response.data.data.message,
      //             groupId: this.meetingId,
      //             isDeleted: 0,
      //             createdAt: new Date().toISOString(),
      //             projectId: '5d4c07fb030f5d0600bf5c03'
      //           };

      //              if(adminStatus == true){
      //               this.userEmail=this.c_user.email;
      //                 this.bcJoinedChat = {
      //                 senderId: { _id: this.c_user.email, name: this.c_user.name },
      //                 receiverId: this.meetingId,
      //                 message: response.data.data.message,
      //                 chatType: 2
      //               }
      //             }else{
      //               var userdata=this.$session.get('isMeetingUser');
      //               this.userEmail=userdata.userEmail;
      //               this.bcJoinedChat = {
      //                 senderId: { _id: userdata.userEmail, name: userdata.name },
      //                 receiverId: this.meetingId,
      //                 message: response.data.data.message,
      //                 chatType: 2
      //               }
      //             }
      //          this.$socket.emit('meetingMsg',this.bcJoinedChat)


      //         }, function(err) {
      //          // console.log('err', err);
      //           alert('error');
      //         })
      //         var container = this.$el.querySelector("#roomchating");
      //         $("#roomchating").animate({ scrollTop: container.scrollHeight + 9020 }, "fast");
      //     },
      //  o2o_stopRecording(){
      //     onBtnStopClicked();
      //  },

      //     o2o_resetRecordLink(){
      //       resetDownloadLink();
      //     },

      meetingPausecall() {

        this.meetingVideoPause = false;
        this.meetingVideoPlay = true;
        const stream = document.getElementById('video-' + this.c_user._id).srcObject;
        stream.getVideoTracks()[0].enabled = false;

      },

      meetingPlaycall() {

        this.meetingVideoPlay = false;
        this.meetingVideoPause = true;
        const stream = document.getElementById('video-' + this.c_user._id).srcObject;
        stream.getVideoTracks()[0].enabled = true;

      },
      audiomeetingPausecall() {

        this.meetingAudioPause = false;
        this.meetingAudioPlay = true;
        const stream = document.getElementById('video-' + this.c_user._id).srcObject;
        stream.getAudioTracks()[0].enabled = false;

      },

      audiomeetingPlaycall() {
        this.meetingAudioPlay = false;
        this.meetingAudioPause = true;
        const stream = document.getElementById('video-' + this.c_user._id).srcObject;
        stream.getAudioTracks()[0].enabled = true;
      }
    },

    mounted() {

      this.meetingId = this.$route.query.meetingId;
      $("#record-options").hide();
      $("#meet_stop-btn").hide();
      if (this.meetingId) {
        axios.get('/getSingleMeeting/' + this.meetingId + '/5d4c07fb030f5d0600bf5c03')
          .then((responce) => {
            this.meedtingData = responce.data;
            this.members = this.meedtingData.meeting_members.length;

          }).catch((error) => console.log(error));
        this.c_user = JSON.parse(localStorage.getItem('userData'));
        if (this.c_user == null) {
          this.c_user = JSON.parse(localStorage.getItem('userMeeting'));
        }
        this.adminStatus1 = this.$session.get('isMeetingAdmin');
        this.userStatus1 = this.$session.get('isMeetingUser');
        console.log(this.adminStatus1);
        console.log(this.userStatus1);
        var calltype = 'meeting';

        if (this.c_user) {
          var adminName = this.c_user.name;
          if (this.adminStatus1 == true) {
            $('#meetinglogin').hide();
            $('#meetingSection').show();
            var meetingID = this.meetingId;
            // setTimeout(function(){ register(meetingID, adminName+' (Host)',calltype)}, 3000);
          }
        }

        if (this.userStatus1) {
          if (this.userStatus1.status == true) {
            $('#meetinglogin').hide();
            $('#meetingSection').show();
            var meetingID = this.meetingId;
            // setTimeout(function(){ register(meetingID, userStatus.userName,calltype)}, 3000);

          }
        }

        // =========== 10-13-2021 (Ammar) =============

         axios.get('/notificationsCount/' + this.c_user._id + '5d4c07fb030f5d0600bf5c03/').then((response) => {
            console.log("notificationsCount: ", response);
            this.messageCount = response;
          }, function (err) {
            console.log('err', err);
          })
      }

    }
  }

</script>

<style>
  img {
    border-radius: 8px;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .activeChatemoji {
    z-index: 9999;
    position: absolute;
    bottom: 82px;
  }

  .emoji-picker {

    width: 308px !important;
  }

  .message-input {
    height: 85px;
    position: fixed;
    background-color: #fff;
    transition: all .5s;
    padding: 20px 4px;
    z-index: 9;
    bottom: 61px;
  }

  .icon-btn.btn-outline-primary {
    background-color: #2c3550 !important;
    color: rgb(255 255 255) !important;
    border: none !important;
    transition: all .3s ease;
  }

  .btn-primary {
    background-color: #2c3550;
    border-color: #2c3550 !important;
    color: #fff !important;
    transition: all .3s ease;
  }

  .participant.singleM.col-md-12 video {
    width: 100% !important;
    -o-object-fit: fill;
    object-fit: cover;
    height: calc(89vh - 73px);
  }

  .participant.singleM.col-md-12 .vidControls {
    position: absolute;
    bottom: 19;
    padding-right: 100px;
    z-index: 99999;
  }

  .participant.singleM.col-md-12 .participantName {
    position: absolute;
    bottom: 0;
    padding-left: 50px;
    color: #fff;
    font-size: 25px;
  }

  .participant.double video {
    width: 98% !important;
    height: calc(89vh - 73px);
  }

  .participant.tripple.col-md-12 video {
    width: 98% !important;
  }

  .participant.tripple.col-md-6 video {
    width: 48% !important;
  }

  .vidControls span {
    color: white;
    padding: 7px;
  }
</style>