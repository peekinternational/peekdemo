<template>
  <div class="container-fluid" style="padding:0px;background-color: aliceblue;">
  	<div class="row">
  		
  	<div id="videoDiv" class="col-md-12">
  <!-- 	
    <div class="hidelogo">
      <img id="myImg" src="https://www.alswebcam.com/img/logo.f6ecbf81.png" alt="Snow" style="width: 80%;/* max-width: 285px; */">
    </div> -->
        <div id="meet"></div>
       
        </div>
 
  </div>
</div>
</template>

<script>
import { JitsiMeet } from '@mycure/vue-jitsi-meet';
import Vue from 'vue';
import $ from 'jquery';
import JQuery from 'jquery';
import 'bootstrap';
import feather from 'feather-icons';
import Popper from 'popper.js';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import  { VEmojiPicker } from 'v-emoji-picker';
import InfiniteLoading from 'vue-infinite-loading';
import 'feather-icons/dist/feather.min.js';
import tippy from 'tippy.js';
import Toasted from 'vue-toasted';
import 'tippy.js/dist/tippy.css';
import moment from 'moment';
import _ from 'lodash';
import vueDropzone from 'vue2-dropzone';
//import Dropzone from "dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import ApiService from '../services/api.service.js';
import AudioRecorder from 'vue-audio-recorder';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';
import InputTag from 'vue-input-tag';
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader
} from 'vue-content-loader'

import {ClipboardIcon ,CameraIcon , UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, AirplayIcon, AtSignIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneIncomingIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon } from 'vue-feather-icons';
export default {
  name: "AtendimentoMedico",
 components: {VEmojiPicker,InputTag, VueTimepicker, Datepicker, ClipboardIcon ,CameraIcon , UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, AudioRecorder, ContentLoader, InfiniteLoading, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, Loading, vueDropzone,PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon },
  data(){
  	return{
    search: "",
    message: "Hello",
    api: null,
    room: "test romm",
    username: "rabie",
    projectId: "5d4c07fb030f5d0600bf5c07",
    userId:'',
    friendId:'',
    groupName:'',
      msgObj: {},
      message: '',
      friendchat: {},
      friendCallchat: {},
      chatdata: {},
      messagecopy: '',
      editChatid: '',
      onEditclear: false,
      onChat: true,
      onbroChat: true,
      formDatas: {},
      replyBox: false,
      chatreplydata: {},
      isLoading: false,
      fullPage: true,
      isSeen: false,
      dropzoneOptions: {
        url: 'https://peekvideochat.com:22000/chatFilesShare',
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { "My-Awesome-Header": "header value" }
      },
     
      isLoading :false,
      showchat:true,
      hidechat:false,
      isActive: false,
      friendName:'',
  }
  },
  //   beforeCreate: function() {
  //   if (localStorage.getItem("userData") === null) {
  //     this.$router.push('/login')
  //   }
  // },

  sockets: {
    connect: function() {
      console.log('socket connected successfully')
    },

    disconnect() {
      console.log('socket disconnected')
    },
  O2OReceiverPanal(data) {
    // alert('close');
      if (data.friendId == this.c_user._id) {
          
           this.stopcall();
      }
    },

   
},
watch:{
	 
},

  mounted() {
    // this.c_user = JSON.parse(localStorage.getItem('userData'));
    this.groupName = this.$route.query.userName+'-'+this.$route.query.friendName;
    // this.friendName=this.$route.query.friendName;
    // this.userId = this.$route.query.userId;
    // this.friendId = this.$route.query.friendId;
    this.openRoom();
    this.hostname = this.$hostname;
 
  },

  methods: {


    startConference() {
      var _this = this;
      try {
        const domain = "stun.ringy.jp";
        const options = {
          roomName: this.groupName,
          height: 670,
          noSsl: false,
          parentNode: document.querySelector("#meet"),
          interfaceConfigOverwrite: {
      

    TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    ],

  //  APP_NAME: 'Als Web Cam',
    AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
    AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',

    AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
    BRAND_WATERMARK_LINK: ' ',

    CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables it
   
    CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,

    /**
     * How long the connection indicator should remain displayed before hiding.
     * Used in conjunction with CONNECTION_INDICATOR_AUTOHIDE_ENABLED.
     *
     * @type {number}
     */
    CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,

    /**
     * If true, hides the connection indicators completely.
     *
     * @type {boolean}
     */
    CONNECTION_INDICATOR_DISABLED: false,

    DEFAULT_BACKGROUND: '#474747',
    DEFAULT_LOCAL_DISPLAY_NAME: 'me',
    DEFAULT_LOGO_URL: 'https://stun.peekvideochat.com/images/watermark.png',
    DEFAULT_REMOTE_DISPLAY_NAME: 'Loading',

    DISABLE_DOMINANT_SPEAKER_INDICATOR: false,

    DISABLE_FOCUS_INDICATOR: false,

    /**
     * If true, notifications regarding joining/leaving are no longer displayed.
     */
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,

    /**
     * If true, presence status: busy, calling, connected etc. is not displayed.
     */
    DISABLE_PRESENCE_STATUS: false,

    /**
     * Whether the ringing sound in the call/ring overlay is disabled. If
     * {@code undefined}, defaults to {@code false}.
     *
     * @type {boolean}
     */
    DISABLE_RINGING: false,

    /**
     * Whether the speech to text transcription subtitles panel is disabled.
     * If {@code undefined}, defaults to {@code false}.
     *
     * @type {boolean}
     */
    DISABLE_TRANSCRIPTION_SUBTITLES: false,

    /**
     * Whether or not the blurred video background for large video should be
     * displayed on browsers that can support it.
     */
    DISABLE_VIDEO_BACKGROUND: false,

    DISPLAY_WELCOME_PAGE_CONTENT: false,
    DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,

    ENABLE_DIAL_OUT: true,

    ENABLE_FEEDBACK_ANIMATION: false, // Enables feedback star animation.

    FILM_STRIP_MAX_HEIGHT: 120,

    /**
     * Whether to only show the filmstrip (and hide the toolbar).
     */
    filmStripOnly: false,

    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,

    /**
     * Hide the invite prompt in the header when alone in the meeting.
     */
    HIDE_INVITE_MORE_HEADER: true,

    INITIAL_TOOLBAR_TIMEOUT: 20000,
    JITSI_WATERMARK_LINK: 'http://peekinternational.com/',

    LANG_DETECTION: true, // Allow i18n to detect the system language
    LIVE_STREAMING_HELP_LINK: 'http://peekinternational.com/', // Documentation reference for the live streaming feature.
    LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9

    /**
     * Maximum coefficient of the ratio of the large video to the visible area
     * after the large video is scaled to fit the window.
     *
     * @type {number}
     */
    MAXIMUM_ZOOMING_COEFFICIENT: 1.3,

    /**
     * Whether the mobile app Jitsi Meet is to be promoted to participants
     * attempting to join a conference in a mobile Web browser. If
     * {@code undefined}, defaults to {@code true}.
     *
     * @type {boolean}
     */
    MOBILE_APP_PROMO: false,

    // NATIVE_APP_NAME: 'Als Web Cam',

    OPTIMAL_BROWSERS: [ 'chrome', 'chromium', 'firefox', 'nwjs', 'electron', 'safari' ],

    POLICY_LOGO: null,
    // PROVIDER_NAME: 'Als Web Cam',

    RECENT_LIST_ENABLED: false,
    REMOTE_THUMBNAIL_RATIO: 1, // 1:1

    SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
    SHOW_BRAND_WATERMARK: false,

    SHOW_CHROME_EXTENSION_BANNER: false,

    SHOW_DEEP_LINKING_IMAGE: false,
    SHOW_JITSI_WATERMARK: false,
    SHOW_POWERED_BY: false,
    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
    SHOW_WATERMARK_FOR_GUESTS: true, // if watermark is disabled by default, it can be shown only for guests

    SUPPORT_URL: 'http://peekinternational.com/',

    TOOLBAR_ALWAYS_VISIBLE: false,

    disableDeepLinking: true,
    TOOLBAR_TIMEOUT: 4000,

    UNSUPPORTED_BROWSERS: [],

    VERTICAL_FILMSTRIP: true,

    VIDEO_LAYOUT_FIT: 'both',

    VIDEO_QUALITY_LABEL_DISABLED: false,

  
    makeJsonParserHappy: 'even if last key had a trailing comma'

    // No configuration value should follow this line.
          },
          configOverwrite: {
            disableSimulcast: true,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
          },
        };

        this.api = new JitsiMeetExternalAPI(domain, options);
        this.api.addEventListener("videoConferenceJoined", () => {
          console.log("Local User Joined");
       $('.watermark.leftwatermark').css('display','none');
          _this.api.executeCommand("displayName", _this.$route.query.userName);
        });

    this.api.addEventListener("videoConferenceLeft", () => {
          console.log("Local User Joined");
      
        
         
          // window.location.href = "/";
        });
        
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
    },
    openRoom() {
      // verify the JitsiMeetExternalAPI constructor is added to the global..
      if (window.JitsiMeetExternalAPI) {
        // var person = prompt("Please enter your name:", "Rabie");
        // if (person != null || person != "") this.username = person;
        // var room = prompt("Please enter your room:", "Test Room");
        // if (room != null || room != "") this.room = room;
        this.startConference();
      } else alert("Jitsi Meet API script not loaded");
    },
  },
   
};
</script>
<style scoped>

</style>
