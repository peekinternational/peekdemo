<template>
  <div class="container-fluid" style="padding:0px;background-color: aliceblue;">
    <div class="row" style="margin-top: 3px;overflow: auto;">
      
    <div id="videoDiv" class="col-md-12 pr-0" style="height: calc(100vh - 10px);" >
    
        <!-- <div id="meet"></div> -->
         
              <vue-jitsi-meet
              ref="jitsiRef"
              domain="stun.ringy.jp"
              :options="jitsiOptions"
            ></vue-jitsi-meet>
        <!-- missing -->
        <!-- <button v-if="showchat" @click="startgroupchat()" class="btn btn-sm btn-success chatbutton chatbutton">openchat</button> -->
        <img v-if="showchat" @click="startgroupchat()" class="bg-img chatbutton" src="../assets/images/icons/white-chat.png" style="border-radius: 0px;"  alt="Avatar" />
                <img class="bg-img chatbutton" v-if="hidechat" @click="hidegroupchat()" src="../assets/images/icons/mclosechat.png" style=""  alt="Avatar" />
       <!--  <button v-if="hidechat" @click="hidegroupchat()" class=" btn btn-sm btn-success chatbutton">hidechat</button> -->
        </div>
        <div id="chatDiv" class="col-md-3 pl-0" style="display:none">
        	  <!--  Groupchat -->
        <div class="chat-content tabto" id="startgroupchat">
          <div id="group_chat_open" class="messages custom-scroll group_chat_open">
         <div class="contact-details" style="background: white;padding: 12px;">
               <div class="row">
                
                <div class="col-md-12">
                  <div class="">
                    <div class="media-left">

                    </div>

                    <div class="media-body">
                    

                    </div>
                    <div class="media-right">
                      <ul>
                      
                        <li @click="hidegroupchat()">
                          <a class="icon-btn btn-light button-effect " href="#">
                            <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
            <vue-dropzone ref="mygroupVueDropzone" id="groupdropzone" @vdropzone-success="groupComplete" v-on:vdropzone-sending="draggroupfileupload" :options="dropzoneOptions"></vue-dropzone>
            <div class="contact-chat" id="contact-chat" style="">
                  <ul class="chatappend" v-for="g_chat in groupchatdata" v-if="g_chat.groupId == groupId" >
                  	<!-- <span>{{groupId}}</span> -->
                    <h5 v-if="g_chat.messageType == 3 && g_chat.g_chatType == 3" style="text-align:center;padding: 10px;font-size: 10px;">
                      <span>{{chatTime(g_chat.createdAt)}}</span> <br><br> {{ g_chat.message }}</h5>
                    <li class="replies" style="padding-bottom:20px" v-else-if="g_chat.senderId._id == c_user._id">
                      <div class="media">
                        <div class="profile mr-4" style="margin-left: 0.5rem !important;width: 41px;height: 41px !important;padding: 2px;background-color: #9fa0a8;">
                       <span style="text-transform: uppercase;font-size: 15px;">  {{getFirstLetter(c_user.name)}}</span>
                      </div>
                        <div class="media-body">
                          <div class="contact-name">
                            <h5 style="font-size: 11px;">{{ c_user.name}}</h5>
                            <h6 style="font-size: 10px;">{{chatTime(g_chat.createdAt)}}</h6>

                            <ul class="msg-box" style="margin-top: 0px;margin-left: 8px;">
                              <li class="msg-setting-main">
                                <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                                  <div class="msg-setting" :id="'msg-settingo2o'+g_chat._id" @click="msg_setting(g_chat._id)">
                                    <i class="ti-more-alt"></i>
                                  </div>

                                  <div class="msg-dropdown" :id="'msg-dropdowno2o'+g_chat._id" style="z-index: 99999;">
                                    <ul>
                                      <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                        <a href="#" @click="editgroupchat(g_chat._id,g_chat.message)">
                                           <img class="chatIcons" src="../assets/images/icons/svg/edit.svg" alt="Avatar"  />{{ $t('Edit') }}</a>
                                      </li>
                                      <br>
                                      <li>
                                        <a href="#" @click="groupquote(g_chat)">
                                          <i style="margin-right: 4px;" class="fa fa-share"></i>{{ $t('Cancel') }}</a>
                                      </li>
                                     <br>
                                      <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                        <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                           <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                      </li>
                                      <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                      <li style="margin: 0 10px;">
                                        <a href="#" @click="groupmsgdelete(g_chat)">
                                          <img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  />{{ $t('Delete') }}</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <h5 v-if="g_chat.isDeleted == 1" :id="'sendergroup'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ $t('messagedeleted') }}</h5>
                                <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'sendergroup'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ g_chat.message }}</h5>
                                <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'sendergroup'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">
                                  <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                                <br>
                                <a :href="hostname+'/images/chatImages/'+g_chat.message" :id="'sendergroup'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" target="_blank" download>
                                  <img :src="hostname+'/images/chatImages/'+g_chat.message">
                                </a>

                                <a :href="hostname+'/images/chatImages/'+g_chat.message" :id="'sendergroup'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>

                              </li>

                            </ul>

                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="sent" style="padding-bottom:20px" v-else>
                      <div class="media">
                        <div class="profile mr-4" style="margin-left: 0.5rem !important;width: 41px;height: 41px !important;padding: 2px;background-color: #9fa0a8;">
                       <span style="text-transform: uppercase;font-size: 15px;"> {{getFirstLetter(g_chat.senderId.name)}}</span>
                      </div>
                        <div class="media-body">
                          <div class="contact-name">
                            <h5 style="font-size: 10px;">{{ g_chat.senderId.name }}</h5>
                            <h6 style="font-size: 10px;">{{chatTime(g_chat.createdAt)}}</h6>
                            <ul class="msg-box" style="margin-top: 0px;margin-left: 8px;">
                              <li class="msg-setting-main">

                                <h5 v-if="g_chat.isDeleted == 1" :id="'receivero2o'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ $t('messagedeleted') }}</h5>
                                <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'receiver'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ g_chat.message }} </h5>
                                <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'receivero2o'+g_chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">
                                  <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                                <br>
                                <a :href="hostname+'/images/chatImages/'+g_chat.message" :id="'receivero2o'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" target="_blank" download>
                                  <img :src="hostname+'/images/chatImages/'+g_chat.message">
                                </a>
                                <a :href="hostname+'/images/chatImages/'+g_chat.message" :id="'receivero2o'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1"><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>
                                <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                                  <div class="msg-setting" :id="'msg-settingo2o'+g_chat._id" @click="msg_setting(g_chat._id)">
                                    <i class="ti-more-alt"></i>
                                  </div>
                                  <div class="msg-dropdown" :id="'msg-dropdowno2o'+g_chat._id" style="z-index: 99999;">
                                    <ul>

                                      <li>
                                        <a href="#" @click="groupquote(g_chat)">
                                          <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                      </li>

                                      <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                        <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                         <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                      </li>

                                    </ul>
                                  </div>
                                </div>
                              </li>

                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>

                  </ul>

                </div>
          </div>
           <VEmojiPicker @select="selectGroupcallEmoji" class="" v-bind:class="{activeemoji: isActive}" style="bottom: 86px;" v-if="isActive" />
              <div class="message-input messagecall" id="groupsinglemessage-input">
                <div class="replybox" v-if="replyBox == true">
                  <p style="padding: 7px; margin: 0;">‘‘{{chatreplydata.message}}’’
                    <span style="float:right;cursor: pointer;" @click="closegroupReplybox()">
                      <x-icon size="1.5x" class="custom-class"></x-icon>
                    </span>
                    <br>
                    <span style="margin-left: 6px;">
                      {{chatTime(chatreplydata.createdAt)}}
                    </span>
                  </p>
                </div>
                <div class="wrap emojis-main">

                  <div class="dot-btn dot-primary mr-3" style="margin-right: 0.3rem !important;">
                    <a class="icon-btn btn-outline-primary button-effect " style="height: 30px;width: 30px;" @click="showGroupemoji">
                      <smile-icon size="1.5x" class="custom-class"></smile-icon>
                    </a>
                  </div>

                  <label class="icon-btn btn-outline-primary mr-4" style="height: 30px;width: 30px;margin-right: 0.3rem !important;" for="groupCallmyFiles">
                    <i class="fa fa-plus"></i>
                  </label>
                  <input type="file" id="groupCallmyFiles" ref="groupCallmyFiles" style="display:none" @change="groupCalluploadfile($event)" multiple>

                  <input class="setemoj inputbox" id="setemoj" ref="groupafterClick" type="text" v-on:keyup="" @paste="onPastegroup" @keyup.enter="groupchat()" v-model="groupmessage" style="margin-right: 10px;" :placeholder="$t('Password')" />

                  <button class="submit icon-btn btn-primary disabled" style="height: 30px;width: 30px;" v-show="ongroupChat" @click="groupchat()" id="send-groupcallmsg" :disabled="not_working">
                    <send-icon size="1.5x" class="custom-class"></send-icon>
                  </button>
                  <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditgroupclear" @click="cleargroupchat()">
                    <x-icon size="1.5x" class="custom-class"></x-icon>
                  </button>

                </div>
              </div>
        </div>
        <!--end -->
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
import { JitsiMeet } from '@mycure/vue-jitsi-meet';
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
 components: {VEmojiPicker,InputTag, VueTimepicker, Datepicker, ClipboardIcon ,CameraIcon , UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, AudioRecorder, ContentLoader, InfiniteLoading, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, Loading, vueDropzone,PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon,VueJitsiMeet: JitsiMeet  },
  data(){
  	return{
    search: "",
    message: "Hello",
    api: null,
    room: "test romm",
    username: "rabie",
    projectId: "5d4c07fb030f5d0600bf5c03",
    groupCallId:'',
    groupId:'',
    groupName:'',
	groupreplyBox: false,
	groupchatreplydata: '',
	groupformDatas: {},
	 editgroupChatid: '',
      onEditgroupclear: false,
      ongroupChat: true,
      dropzoneOptions: {
        url: 'https://peekvideochat.com:22000/chatFilesShare',
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: 10,
        maxFilesize: 420,
        chunking: true,
        headers: { "My-Awesome-Header": "header value" }
      },
      groupdata: {},
      receiveGroupName: '',
      grouCallStatus: false,
      callGroup: {},
      groupSearch: '',
      groupmessage: '',
      groupmsgObj: {},
      groupchatdata: {},
      groupCallId: '',
      not_working: false,
      groupLoader: false,
      isLoading :false,
      showchat:true,
      hidechat:false,
      isActive: false,
      currentUser:'',
      callingStatus:true,
      callDisable:true,
  }
  },
   beforeMount() {
    window.addEventListener("beforeunload", this.preventNav,false)
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav,false);
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
    beforeCreate: function() {
    if (localStorage.getItem("userData") === null) {
      this.$router.push('/login')
    }
  },

  sockets: {
    connect: function() {
      console.log('socket connected successfully')
    },

    disconnect() {
      console.log('socket disconnected')
    },

    receivegroupmsg(data) {
      // console.log(data);
      
        this.groupchatdata.push(data);
console.log(this.groupchatdata);
              var container = this.$el.querySelector("#group_chat_open");
          console.log(container.scrollHeight);
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast"); 

          var container2 = this.$el.querySelector("#startgroupchat");
          console.log(container2.scrollHeight);
          $("#startgroupchat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");

        var containers3 = this.$el.querySelector("#contact-chat");
      console.log(containers3.scrollHeight);
      $("#contact-chat").animate({ scrollTop: containers3.scrollHeight + 7020 }, "fast");
       
      
    },

  groupreceiveid(data) {
      console.log(data);
      this.$set(this.groupchatdata[this.groupchatdata.length - 1], '_id', data._id);
      console.log(this.groupchatdata[this.groupchatdata.length - 1]);
    },
    receiveupdateGroupchatmsg(updatedata) {
      const data = updatedata;
      const post = this.groupchatdata.filter((obj) => {
        return updatedata.chatid === obj._id;
      }).pop();
      post.message = data.message;

    },
     grpreciverdeletemsg(data) {
      // console.log(data);
      const post = this.groupchatdata.filter((obj) => {
        return data._id === obj._id;
      }).pop(post);
      //console.log(post);
      post.isDeleted = 1;
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },
},
computed: {
          jitsiOptions () {
            return {
              roomName: this.groupName,
              noSSL: false,
              userInfo: {
                email: this.currentUser.email,
                displayName: this.currentUser.name,
              },
              configOverwrite: {
                enableNoisyMicDetection: false,
                disableSimulcast: true,
                prejoinPageEnabled: false,
                disableDeepLinking: true,
                startWithVideoMuted: this.callingStatus,
              },
              interfaceConfigOverwrite: {
                 TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                  'fodeviceselection', 'hangup', 'profile','etherpad', 'settings', 'raisehand',
                  'videoquality', 'filmstrip', 'feedback', 'stats',
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
watch:{
	  groupmessage() {

       if (this.groupmessage.length > 0) {
        this.not_working = false;
        $('#send-groupcallmsg').removeClass('disabled').attr("disabled", false);
      } else {
        this.not_working = true;
        $('#send-groupcallmsg').removeClass('disabled').attr("disabled", true);
      }
    },
},

  mounted() {
    this.c_user = JSON.parse(localStorage.getItem('userData'));
    this.groupName = this.$route.query.groupName;
    this.groupId = this.$route.query.groupId;
    this.groupCallId = this.$route.query.groupCallId;
    // this.openRoom();
    if(this.$route.query.callStatus == 'video'){
         this.callingStatus = false;
    }else{
          this.callingStatus = true;
    }
    
    this.hostname = this.$hostname;
    document.addEventListener('dragenter', function(e) {
      if (e.target.className == 'message-input' || e.target.className == 'wrap emojis-main' || e.target.className == 'setemoj' || e.target.className == 'messages custom-scroll group_chat_open active') {
        $("#groupdropzone").css("display", "block");
      }
      else {
        $("#groupdropzone").css("display", "none");
      }
    });

  },

  methods: {
       preventNav(event) {
         if (!this.callDisable) return
          console.log(event);
         event.preventDefault();
         event.returnValue = " Hello Nabeel";
         this.groupstopKCall();
          return undefined;
        },
      onIFrameLoad () {
               this.$refs.jitsiRef.addEventListener('participantJoined', this.onParticipantJoined);
               this.$refs.jitsiRef.addEventListener('videoConferenceLeft', this.groupstopKCall);
            },

            onParticipantJoined (e) {
                // alert('join');
              },

               groupstopKCall() {
                this.callDisable = false;
                this.$socket.emit('groupcallclose', {
                  groupId: this.groupId,
                  userId: this.c_user._id,
                });
                console.log(this.groupCallId,'closeeeeeeeeeeeeeeeeeeeeeeeeee');
                axios.post('/leaveCallGroup', {
                  _id: this.groupCallId,
                  groupId: this.groupId,
                  userId: this.c_user._id,
                  projectId: this.projectId
                }).then(response => {
                  this.isGroupcall=false;
                  console.log(response.data.members);
                  if(response.data.members && response.data.members.length < 1){
                this.$socket.emit('sendGroupclose', {
                    groupId: this.groupId,
                    userId: this.c_user._id,
                  });
                  }
                  window.close();
                  console.log(response,'leavegroup');
                }, function(err) {
                  console.log('err', err);
                  //alert('error');
                });
                  // this.$refs.jitsiRef.dispose();
                  // this.$router.push('/')

              
              },

    onCopy: function(e) {

      this.$toasted.success(this.$t('clipboard'), {
        theme: "toasted-primary",
        position: "bottom-center",
        duration: 5000
      })
    },

    onError: function(e) {
      alert('Failed to copy texts')
    },

    copymsg(msg) {
      this.messagecopy = msg;
    },

    isToday(date) {
    	moment.locale('ko'); 
      return moment(date).format('ll');
    },
    pastDate(){
      return moment().subtract(1, 'days').toDate()
    },
  docToday(date) {
      return moment(date).format('LL');
    },
    chatTime(date) {
      return moment(date).format('LT');
    },
    hidegroupchat () {
   this.hidechat=false;
      this.showchat=true;
      $('#chatDiv').hide();
      $('#videoDiv').removeClass('col-md-9');
      $('#videoDiv').addClass('col-md-12');
      $('#videoDiv').show();
    },
  startgroupchat() {
    this.showchat=false;
  	this.hidechat=true;

  	  if($(window).width() < 720){
        $('#videoDiv').removeClass('col-md-12');
        $('#videoDiv').hide();
      $('#chatDiv').addClass('col-md-12');
      $('#chatDiv').show();
    }else{
      $('#videoDiv').removeClass('col-md-12');
      $('#videoDiv').addClass('col-md-9');
      $('#chatDiv').show();
    }

     this.groupstatus = true;
 
      var containers = this.$el.querySelector("#contact-chat");
      console.log(containers.scrollHeight);
      $("#contact-chat").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");

      this.onEditgroupclear = false;
      this.ongroupChat = true;
      this.groupmessage = '';
      this.editgroupChatid = '';
      this.groupchatreplydata = "";
      $('#groupsinglemessage-input').css("height", "96px");

      axios.get('/getGroupChat/'+this.groupId+'/'+ this.c_user._id + '/50/'+this.projectId)
        .then(responce => { 
        	this.groupchatdata = responce.data;
        	console.log(this.groupchatdata);
       }, function(err) {
            console.log('err', err);
            alert('error');
          })

        var containers = this.$el.querySelector("#contact-chat");
      console.log(containers.scrollHeight);
      $("#contact-chat").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");
        var container3 = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container3.scrollHeight + 7020 }, "fast"); 

          var container2 = this.$el.querySelector("#startgroupchat");
          $("#startgroupchat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
      
    },

    groupchat: function(e) {
      this.isActive = false;
      if (this.groupmessage) {
        if (this.editgroupChatid) {

          this.msgObj = {

            message: this.groupmessage,
            chatid: this.editgroupChatid

          };
          console.log(this.msgObj);

          this.$socket.emit('updateGroupchatmsg', this.msgObj)

          axios.post('/updateGroupChat', {
            msgData: this.msgObj,
            id: this.editgroupChatid,
            projectId: this.projectId
          }).then(response => {

          }, function(err) {
            console.log('err', err);
            alert('error');
          })

          this.groupmessage = '';
          this.editgroupChatid = '';
          $('#send-msg').addClass('disabled').attr("disabled", "disabled");
        }

        else if (this.groupchatreplydata) {
        	console.log(this.groupchatreplydata);
        	alert('ffff');

          this.groupmsgObj = {

            commentId: { _id: this.groupchatreplydata._id, message: this.groupchatreplydata.message, senderId: this.groupchatreplydata.senderId },
            messageType: 0,
            senderId: { _id: this.c_user._id, name: this.c_user.name, user_image: this.c_user.user_image},
            senderName: this.c_user.name,
            message: this.groupmessage,
            groupId: this.groupId,
            createdAt: new Date().toISOString(),
            chatType: 1,
            isGroup: 1,
            isDeleted: 0,
            projectId: this.projectId
          };


          this.$socket.emit('sendgroupmsg', this.groupmsgObj);

          axios.post('/groupChat', this.groupmsgObj).then(response => {

            console.log(response.data);
            this.$socket.emit('groupsendid', response.data)
            $('#message-input').css("height", "96px");
            this.groupreplyBox = false;
            this.groupchatreplydata = '';
            this.groupmessage = '';
            //$('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);

          }, function(err) {
            console.log('err', err);
            alert('error');
          })
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast"); 

          var container2 = this.$el.querySelector("#startgroupchat");
          $("#startgroupchat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
          this.groupmessage = '';


        }

        else {
          this.groupmsgObj = {
            chatType: 0,
            isGroup: 1,
            senderId: { _id: this.c_user._id, name: this.c_user.name, user_image: this.c_user.user_image },
            senderName: this.c_user.name,
            message: this.groupmessage,
            groupId: this.groupId,
            isDeleted: 0,
            messageType: 0,
            projectId: this.projectId
          };
          console.log(this.groupmsgObj);
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
        this.groupmessage = '';
          axios.post('/groupChat', this.groupmsgObj).then(response => {

            console.log(response.data);
            this.$socket.emit('groupsendid', response.data)
          //    var container = this.$el.querySelector("#group_chat_open");
          // console.log(container.scrollHeight);
          // $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast"); 

          var container2 = this.$el.querySelector("#startgroupchat");
          console.log(container2.scrollHeight);
          $("#startgroupchat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");

      //   var containers3 = this.$el.querySelector("#contact-chat");
      // console.log(containers3.scrollHeight);
      // $("#contact-chat").animate({ scrollTop: containers3.scrollHeight + 7020 }, "fast");
            //  $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);

          }, function(err) {
            console.log('err', err);
            alert('error');
          })
          // var container = this.$el.querySelector("#group_chat_open");
          // console.log(container.scrollHeight);
          // $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast"); 

          var container2 = this.$el.querySelector("#startgroupchat");
          console.log(container2.scrollHeight);
          $("#startgroupchat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");

      //   var containers3 = this.$el.querySelector("#contact-chat");
      // console.log(containers3.scrollHeight);
      // $("#contact-chat").animate({ scrollTop: containers3.scrollHeight + 7020 }, "fast");
          this.groupmessage = '';
        }
      }
    },


    editgroupchat(id, message) {
      console.log(id + 'edit id');
      this.closegroupReplybox();
      this.groupmessage = message;
      this.editgroupChatid = id;

      this.$nextTick(function() {
        this.$refs.groupafterClick.focus();
      });
      this.onEditgroupclear = true;
      this.ongroupChat = false;

    },

    cleargroupchat() {
      this.onEditgroupclear = false;
      this.ongroupChat = true;
      this.groupmessage = '';
      this.editgroupChatid = '';
    },

    groupremovecross() {

      this.onEditgroupclear = false;
      this.ongroupChat = true;
      $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    },

    groupmsgdelete(data) {
      this.closegroupReplybox();
      this.onEditgroupclear = false;
      this.groupmessage = '';
      this.$socket.emit('grpsenderdeletemsg', data);

      $('#groupsender' + data._id).html('message deleted');
      console.log(data._id);
      axios.get('/deleteMsg/' + data._id + '/0' + '/' + this.projectId)
        .then((responce) => console.log(responce))
        .catch((error) => console.log(error));

    },
    groupquote(chatdata) {

      this.groupchatreplydata = chatdata;
      this.onEditgroupclear = false;
      this.groupmessage = '';
      $('#message-input').css("height", "140px");
      this.groupreplyBox = true;
      this.$nextTick(function() {
        this.$refs.groupafterClick.focus();
      });
    },

    closegroupReplybox() {
      $('#message-input').css("height", "96px");
      this.groupreplyBox = false;
      this.groupchatreplydata = '';
    },

    draggroupfileupload(file, xhr, formData) {
      //   console.log('gggggggggggggggggggggggggggggggggggggg');
      
      formData.append('senderId', this.c_user._id);
      formData.append('senderName', this.c_user.name);
      formData.append('groupId', this.groupId);
      formData.append('isGroup', 1);
      // formData.append('messageType', 1);
      formData.append('projectId', this.projectId);
    },

    groupComplete(file, response) {
      // console.log(file);
      //console.log(response.data);

      this.groupmsgObj = {
        _id: response.data._id,
        chatType: 0,
        isGroup: 1,
        messageType: 1,
        senderId: { _id: this.c_user._id, name: this.c_user.name },
        senderName: this.c_user.name,
        message: response.file[0].originalname,
        groupId: this.groupId,
        isDeleted: 0,
        createdAt: new Date().toISOString(),
      };
   
      this.$socket.emit('sendgroupmsg', this.groupmsgObj);
      var container = this.$el.querySelector("#group_chat_open");
      $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
    
      this.$refs.mygroupVueDropzone.removeFile(file);
      $("#groupdropzone").css("display", "none");
      $("#dropzone").css("display", "none");
    },

    groupCalluploadfile(event){
    //alert("groupCalluploadfile");
      let groupfilesdata = this.$refs.groupCallmyFiles.files;
          console.log(groupfilesdata);
      groupfilesdata.forEach((file) => {
        let groupformDatas = new FormData();
        groupformDatas.append('file', file);
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.callGroup._id);
        groupformDatas.append('isGroup', 1);
        // groupformDatas.append('messageType', 1);
        groupformDatas.append('projectId', this.projectId)
        console.log(groupformDatas);
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
          //console.log(response.data);
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 1,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: response.data.file[0].originalname,
            groupId: this.callGroup._id,
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: this.projectId
          };
        
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
          alert('error');
        })
      })
    },

    groupuploadfile(event) {
      console.log("groupCalluploadfile");
      let groupfilesdata = this.$refs.groupmyFiles.files;
          console.log(groupfilesdata);
      groupfilesdata.forEach((file) => {
        let groupformDatas = new FormData();
        groupformDatas.append('file', file);
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.groupId);
        groupformDatas.append('isGroup', 1);
        // groupformDatas.append('messageType', 1);
        groupformDatas.append('projectId', this.projectId)
        console.log(groupformDatas);
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
          //console.log(response.data);
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 1,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: response.data.file[0].originalname,
            groupId: this.groupId,
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: this.projectId
          };
        
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
          alert('error');
        })
      })
    },

     onPastegroup(e){
       e.clipboardData.files.forEach((file) => {
         let groupformDatas = new FormData();
         let r = Math.random().toString(36).substring(7);
        groupformDatas.append('file', file, (r + file.name));
        // groupformDatas.append('file', file);
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.groupId);
        groupformDatas.append('isGroup', 1);
        // groupformDatas.append('messageType', 1);
        groupformDatas.append('projectId', this.projectId)
        console.log(groupformDatas);
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
          //console.log(response.data);
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 1,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: response.data.data.message,
            groupId: this.groupId,
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: this.projectId
          };
        
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
          alert('error');
        })
      })
    },

 msg_setting(id) {
      $('#msg-setting' + id).siblings('#msg-dropdown' + id).toggle();
      $('#msg-settingo2o' + id).siblings('#msg-dropdowno2o' + id).toggle();
    },

 showGroupemoji() {
      this.isActive = !this.isActive;
    },
selectGroupcallEmoji(emoji) {
      // alert(emoji.data)
      //this.emoj.push(emoji.data);
      this.groupmessage += emoji.data;
      console.log(this.groupmessage);

      this.not_working = false;
      $('#send-groupcallmsg').removeClass('disabled').attr("disabled", false);

    },
    getFirstLetter(str){
      // console.log(str);
      if(str){
      //   var matchess = str.match(/\b(\w)/g); // ['J','S','O','N']
      // var matches = matchess.slice(0, 2);
      // var acronym = matches.join(''); // JSON
     var acronym = str.replace(/\s/g, '').split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
            return acronym;
      }
      
    },

  },
    
};
</script>
<style scoped>
.dropzone {
  box-sizing: border-box;
  display: none;
  position: absolute;
  width: 92%;
  height: 89%;
  z-index: 99999;
  background: #80808066;
  border: 11px dashed #60a7dc;
}
.activeChatemoji{
z-index: 9999;
    position: absolute;
    bottom:80px
}
@media screen and (max-width: 767.98px){
 .message-input {
    width: calc(100% - 200px);
}
}

@media screen and (max-width: 767.98px){
.message-input {
    width: calc(100% - 200px);
}
}

@media screen and (max-width: 992px){
.message-input {
    width: calc(100% - 215px);
}
}

@media screen and (max-width: 1366px){
.message-input {
    width: calc(100% - 490px);
}
}

@media screen and(max-width: 767.98px){
.message-input {
    width: calc(100% - 200px);
}
}

@media screen and (max-width: 992px){
.message-input {
    width: calc(100% - 215px);
}
}

@media screen and (max-width: 800px){

.message-input {
    width: 100vw;
    -webkit-animation: fadeInRight 300ms ease-in-out;
    animation: fadeInRight 300ms ease-in-out;
    transition: all 0.3s ease;
}
}

@media screen and (max-width: 1024px){
.message-input {
    padding: 26px 20px;
}
}

@media screen and (max-width: 1366px){
.message-input {
    padding: 26px 25px;
}
}
.message-input {
    height: 95px;
    width: 24%;
    position: fixed;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    padding: 26px 9px;
    z-index: 9;
    bottom: 0;
}
.contact-chat  {
    height: calc(84vh - 50px);
    overflow: scroll;
    overflow-x: hidden;
    padding: 10px 0px 0;
    margin-top: 17px;
}
.contact-chat>ul.chatappend {
    display: flex;
    flex-direction: column;
    width: 95%;
}
.activeemoji {
  z-index: 9999;
  position: absolute;
  bottom: 0px;
}

.inputbox{
  font-size: 11px;
    width: calc(100% - 100px);
}
@media screen and (max-width: 767px){
.messagecall {
    /* height: 72px!important; */
    position: fixed;
    transition: all .5s;
    padding: 9px 26px !important;
    z-index: 9;
    width: 100%!important;
    bottom: -26px!important;
}
.inputbox{
  font-size: 11px;
    width: calc(100% - 125px);
    margin-right: 14px;
}
.contact-chat  {
    height: calc(92vh - 140px);
    overflow: scroll;
    overflow-x: hidden;
    padding: 11px 10px 0;
    margin-top: 17px;
}

}
</style>
