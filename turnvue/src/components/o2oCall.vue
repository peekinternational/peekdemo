<template>
  <div class="container-fluid" style="padding:0px;background-color: aliceblue;">
    <p style="display:none">{{checkcallTime}}</p>
  	<div class="row" style="margin-top: 3px;overflow: auto;">
  		
  	<div id="videoDiv" class="col-md-12 pr-0" style="height: calc(100vh - 10px);" >
  
        <!-- <div id="meet"></div> -->
         
              <vue-jitsi-meet
              ref="jitsiRef"
              domain="stun.ringy.jp"
              :options="jitsiOptions"
            ></vue-jitsi-meet>
          
        <!-- missing -->
        <!-- <button v-if="showchat" @click="startchat()" class="btn btn-sm btn-success chatbutton chatbutton">openchat</button> -->
        <img v-if="showchat" @click="startchat()" class="bg-img chatbutton" src="../assets/images/icons/white-chat.png" style="border-radius: 0px;"  alt="Avatar" />
                <img class="bg-img chatbutton" v-if="hidechat" @click="hideChat()" src="../assets/images/icons/mclosechat.png" style=""  alt="Avatar" />
       <!--  <button v-if="hidechat" @click="hideChat()" class=" btn btn-sm btn-success chatbutton">hidechat</button> -->
        </div>
        <div id="chatDiv" class="col-md-3 pl-0" style="display:none">
        	  <!--  Groupchat -->
        
        
            <div class="chat-content tabto" id="startchatsss">
              <div class=" messages custom-scroll active messageschat o2omessageschat" id="o2ochating" style="min-height: 450px!important;">
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
                      
                        <li @click="hideChat()">
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
                <!-------- Dropzone ------>
                <vue-dropzone ref="myVueDropzone" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions"> </vue-dropzone>
                <!-------- end -------->
                <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">

                </loading>
                <div class="contact-chat" id="contact-chat">
                  <ul class="chatappend" v-for="chat in friendchat">
                    <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 10px;font-size: 10px;">
                      <span>{{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>
                    <li class="replies" style="padding-bottom:20px" v-else-if="chat.senderId._id == c_user._id">
                      <div class="media">
                       <!--  <div class="profile mr-4" style="margin-left: 0.5rem !important;width: 41px;height: 41px !important;padding: 2px;">
                          <img class="bg-img" src="../assets/images/contact/2.jpg" style="width: 35px !important;" alt="Avatar" /></div> -->

                       <div class="profile mr-4">
                         <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar"  />
                       <div v-else  class="userprofile"  >
                         <span style="z-index: 0;"> {{getFirstLetter(c_user.name)}}</span>
                      </div>
                    </div>

                        <div class="media-body">
                          <div class="contact-name">
                            <h5 style="font-size: 11px;">{{ c_user.name}}</h5>
                            <h6 style="font-size: 10px;">{{chatTime(chat.createdAt)}}</h6>

                            <ul class="msg-box" style="margin-top: 0px;margin-left: 8px;">
                              <li class="msg-setting-main">
                              <img v-if="(isSeen == true || chat.isSeen == 1) && chat.receiptStatus == 1" class="" src="../assets/images/doubleblue.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />

                <img v-else class="" src="../assets/images/doublegray.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />
                               
                             
                            <h5 v-if="chat.isDeleted == 1" :id="'receiver'+chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 && chat.chatType == 0" :id="'receiver'+chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ chat.message }} </h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'receiver'+chat._id">
                              <span style="border-bottom: 1px solid;">
                              <template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h5>
                            <br>
                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+chat.message">
                            </a>
                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1"><img src="../assets/images/fileIcon.png" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;"> {{ chat.message }}</a>
                        
                         <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                                  <div class="msg-setting" :id="'msg-settingo2o'+chat._id" @click="msg_setting(chat._id)">
                                    <i class="ti-more-alt"></i>
                                  </div>

                                  <div class="msg-dropdown" :id="'msg-dropdowno2o'+chat._id" style="z-index: 99999;">
                                    <ul>
                                       <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="eidtchat(chat._id,chat.message)">
                                      <img class="chatIcons" src="../assets/images/icons/svg/edit.svg" alt="Avatar"  />{{ $t('Edit') }}</a>
                                  </li>
                                
                              <br>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i style="margin-right: 4px;"  class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>
                                <br>
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <li style="margin-left: 12px;">
                                    <a href="#" @click="msgdelete(chat)">
                                      <img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  />{{ $t('Delete') }}</a>
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
                    <li class="sent" style="padding-bottom:20px" v-else>
                      <div class="media">
                       <!--  <div class="profile mr-4" style="margin-left: 0.5rem !important;width: 41px;height: 41px !important;padding: 2px;">
                          <img class="bg-img" src="../assets/images/contact/2.jpg" style="width: 35px !important;" alt="Avatar" /></div> -->

                       <div class="profile mr-4">
                         <!--   <img class="bg-img" v-if="oncallFriend.user_image" :src="hostname+'images/chatImages/'+oncallFriend.user_image" alt="Avatar"  /> -->
                         <div  class="userprofile"  >
                           <span style="z-index: 0;"> {{getFirstLetter(chat.senderId.name)}}</span>
                        </div>
                      </div>

                        <div class="media-body">
                          <div class="contact-name">
                            <h5 style="font-size: 10px;">{{ chat.senderId.name }}</h5>
                            <h6 style="font-size: 10px;">{{chatTime(chat.createdAt)}}</h6>
                            <ul class="msg-box" style="margin-top: 0px;margin-left: 8px;">
                              <li class="msg-setting-main">

                             
                            <h5 v-if="chat.isDeleted == 1" :id="'receiver'+chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 && chat.chatType == 0" :id="'receiver'+chat._id" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;">{{ chat.message }} </h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'receiver'+chat._id">
                              <span style="border-bottom: 1px solid;">
                              <template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h5>
                            <br>
                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+chat.message">
                            </a>
                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1"><img src="../assets/images/fileIcon.png" style="font-size: 10px;padding-right: 10px;padding: 6px 10px;"> {{ chat.message }}</a>
                          
                                <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                                  <div class="msg-setting" :id="'msg-settingo2o'+chat._id" @click="msg_setting(chat._id)">
                                    <i class="ti-more-alt"></i>
                                  </div>
                                  <div class="msg-dropdown" :id="'msg-dropdowno2o'+chat._id" style="z-index: 99999;">
                                    <ul>

                                 
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i style="margin-right: 4px;" class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>
                                  <br>
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
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
              <VEmojiPicker @select="select2chatEmoji" class="" v-bind:class="{activeChatemoji: isActive}" style="bottom: 86px;" v-if="isActive" />
              <div class="message-input messagecall" id="o2osinglemessage-input">
                <div class="replybox" v-if="replyBox == true">
                  <p style="padding: 7px; margin: 0;">‘‘{{chatreplydata.message}}’’
                    <span style="float:right;cursor: pointer;" @click="closeReplybox()">
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
                    <a class="icon-btn btn-outline-primary button-effect " style="height: 30px;width: 30px;" @click="showChatemoji">
                      <smile-icon size="1.5x" class="custom-class"></smile-icon>
                    </a>
                  </div>

                  <label class="icon-btn btn-outline-primary mr-4" style="height: 30px;width: 30px;margin-right: 0.3rem !important;" for="fileupload">
                    <i class="fa fa-plus"></i>
                  </label>
                  <input type="file" id="fileupload" ref="myFiles" style="display:none" @change="uploadfile($event)" multiple>

                  <input class="setemoj inputbox" id="setemoj" ref="afterClick" type="text" @paste="onPaste" @keyup.enter="chat()" v-model="message" style="" :placeholder="$t('WriteMessage')" />

                  <button class="submit icon-btn btn-primary disabled" style="height: 30px;width: 30px;" v-show="onChat" @click="chat()" id="send-msg" disabled="disabled">
                    <send-icon size="1.5x" class="custom-class"></send-icon>
                  </button>
                  <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditclear" @click="clearchat()">
                    <x-icon size="1.5x" class="custom-class"></x-icon>
                  </button>

                </div>
              </div>
            </div>
        <!--end -->
  		
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
 components: {VEmojiPicker,InputTag, VueTimepicker, Datepicker, ClipboardIcon ,CameraIcon , UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, AudioRecorder, ContentLoader, InfiniteLoading, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, Loading, vueDropzone,PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon,VueJitsiMeet: JitsiMeet },
  data(){
  	return{
    search: "",
    message: "Hello",
    api: null,
    room: "test romm",
    username: "rabie",
    projectId: "5d4c07fb030f5d0600bf5c03",
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
      currentUser:'',
      elapsedcallTime: 0,
      calltimer: undefined,
      callstatus: 0,
      callReceiveStatus:false,
      callCommingStatus:0,
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
  O2OReceiverPanal(data) {
    // alert(data.friendId);
    // alert('close');
      if (data.friendId == this.c_user._id) {
          
           this.onStopCall();
      }
    },
     receivemsg(data) {
      //this.c_user._id == data.callerId._id &&
    
      if (this.c_user._id == data.msgData.receiverId._id && this.friendId== data.msgData.senderId._id) {

        this.friendchat.push(data.msgData);
       
        // $('#f_typing'+data.msgData.receiverId._id).html(data.msgData.message);
        var container = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
        var container2 = this.$el.querySelector("#o2ochating");
        $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        // var container3 = this.$el.querySelector("#o2oaudiochating");
        // $("#o2oaudiochating").animate({ scrollTop: container3.scrollHeight + 7020 }, "fast");
       

      }
     
    },
    receiveupdatechatmsg(updatedata) {
      const data = updatedata;
      const post = this.friendchat.filter((obj) => {
        return updatedata.chatid === obj._id;
      }).pop();
      post.message = data.message;

    },
     reciverdeletemsg(data) {

      const post = this.friendchat.filter((obj) => {
        return data._id === obj._id;
      }).pop();
      post.isDeleted = 1;
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },
      O2OreceivestarTimer(data) {

      if (data.reciverid == this.friendId || data.friendId == this.c_user._id) {
              this.checkreset();
              this.checkcallstart();
              this.callReceiveStatus=true;
            }
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
                  'fodeviceselection', 'hangup', 'profile', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                  'videoquality', 'filmstrip', 'feedback', 'stats',
                  'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
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
              TOOLBAR_TIMEOUT: 60000,
              UNSUPPORTED_BROWSERS: [],
              VERTICAL_FILMSTRIP: true,
              VIDEO_LAYOUT_FIT: 'both',
              VIDEO_QUALITY_LABEL_DISABLED: false,
              makeJsonParserHappy: 'even if last key had a trailing comma'

                 },
              onload: this.onIFrameLoad
            };
          },
            checkcallTime() {
            const date = new Date(null);
            date.setSeconds(this.elapsedcallTime / 1000);
            const utc = date.toUTCString();
            this.callstatus = utc.substr(utc.indexOf(":") - 2, 8);
            return utc.substr(utc.indexOf(":") - 2, 8);
          },
        },
watch:{
	   message() {

	       if (this.message.length > 0) {

	        $('#send-msg').removeClass('disabled').attr("disabled", false);
	      } else {
	        
	        $('#send-msg').removeClass('disabled').attr("disabled", true);
	      }
    },
      callstatus() {
      console.log(this.checkcallTime);
    },
},

  mounted() {
    this.groupName = this.$route.query.userName+'-'+this.$route.query.friendName;
    this.c_user = JSON.parse(localStorage.getItem('userData'));
    this.currentUser=this.c_user;
    this.friendName=this.$route.query.friendName;
    this.callID=this.$route.query.callId;
    this.userId = this.$route.query.userId;
    this.friendId = this.$route.query.friendId;
    if(this.$route.query.callStatus == 'video'){
         this.callingStatus = false;
    }else{
          this.callingStatus = true;
    }
   
    if(this.$route.query.receiveUser == 'yes'){
      this.checkcallstart();
      this.callReceiveStatus = true;

    }
    // this.openRoom();
    this.hostname = this.$hostname;
 
 document.addEventListener('dragenter', function(e) {
      console.log(e.target);
     if (e.target.className == 'message-input' || e.target.className == 'contact-chat' || e.target.className == 'chat-main' || e.target.className == 'chat-box' || e.target.className == 'details' || e.target.className == 'wrap emojis-main' || e.target.className == 'setemoj' || e.target.className == ' messages custom-scroll active messageschat' || e.target.className == 'messages custom-scroll messageschat active') {
        $("#dropzone").css("display", "block");
      }
      else {
        $("#dropzone").css("display", "none");
      }

    });
  },

  methods: {
       preventNav(event) {
     if (!this.callDisable) return
      console.log(event);
     event.preventDefault();
     event.returnValue = " Hello Nabeel";
     this.onStopCall();
      return undefined;
    },
       
      checkcallstart() {
      this.calltimer = setInterval(() => {
        this.elapsedcallTime += 1000;
      }, 1000);
    },
    checkcallstop() {
      clearInterval(this.calltimer);
    },
    checkreset() {
      this.elapsedcallTime = 0;
    },
     onIFrameLoad () {
               this.$refs.jitsiRef.addEventListener('participantJoined', this.onParticipantJoined);
               this.$refs.jitsiRef.addEventListener('videoConferenceLeft', this.onStopCall);
            },

            onParticipantJoined (e) {
                // alert('join');
              },

              onStopCall(){
                this.callDisable = false;
               var o2oobg = {
                      friendId: this.friendId,
                      userId: this.c_user._id
                    }

                   

                      this.$socket.emit('updateCallStatus', {
                          userId: this.c_user._id,
                          userName: this.c_user.name,
                          friendId: this.friendId,
                          friendName: '',
                          status: 0,
                          call:'close'
                          
                        });
                      var status=0;
                      if(this.callReceiveStatus == true){
                           this.callCommingStatus=5;
                      }else{
                           this.callCommingStatus=3;
                      }

                       axios.post('/updateOne2oneCall', {
                        callId: this.callID,
                        callStatus: this.callCommingStatus,
                        callTime:this.callstatus,
                        projectId: "5d4c07fb030f5d0600bf5c03"
                      }).then(response => {
                        this.$socket.emit('O2OcloseReceiverPanal', o2oobg);
                        // this.$router.push('/');
                        // window.location.href = "/";
                        window.close();
                      }, function(err) {
                        console.log('err', err);
                        //alert('error');
                      });
                      this.checkreset();
                      this.checkcallstop();

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
      // this.messagecopy = msg;
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
    hideChat () {
    	this.hidechat=false;
    	this.showchat=true;
    	$('#chatDiv').hide();
    	$('#videoDiv').removeClass('col-md-9');
    	$('#videoDiv').addClass('col-md-12');
    	$('#videoDiv').show();
    },

  startchat() {
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
  	    
      var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        var containers = this.$el.querySelector("#o2ochating");
      $("#o2ochating").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");

      this.message = '';
      this.editChatid = '';
      this.onEditclear = false;
      this.onChat = true;
      this.chatreplydata = "";
      this.replyBox = false;
      $('#o2osinglemessage-input').css("height", "96px");
      // $('#o2ocontents').show();
      $('.chitchat-main .chat-content').css('opacity', '1');

      this.$socket.emit('updateUserSelection', {
        selectedUser: this.friendId,
        userId: this.c_user._id
      });
      // const post = this.friendsdata.filter((obj) => {
      //   return this.friendId === obj._id;
      // }).pop();
      // post.usCount = 0;


      this.friendchat = {};
      axios.get('/getChat/' + this.c_user._id + '/' + this.friendId + '/50' + '/'+this.projectId+'/0')
        .then(responce => {
          console.log(responce.data);
          this.friendchat = responce.data;
          this.$socket.emit('lastchatobj_send', this.friendchat[this.friendchat.length - 1]);
          var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
          var container = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          if (this.friendchat[this.friendchat.length - 1].isSeen == 1) {
            this.isSeen = true;
          } else {
            this.isSeen = false;
          }

        })
        .catch((error) => console.log(error));
      var container2 = this.$el.querySelector("#contact-chat");
          $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
      var container = this.$el.querySelector("#o2ochating");
      $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
      
    },

      chat: function(e) {

       
      this.isActive = false;
      if (this.message) {
        if (this.editChatid) {

          this.msgObj = {

            message: this.message,
            chatid: this.editChatid

          };

          this.$socket.emit('updatechatmsg', this.msgObj)
          // this.removecross();
          axios.post('/updateChat', {
            msgData: this.msgObj,
            id: this.editChatid,
            projectId: this.projectId
          }).then(response => {

          }, function(err) {
            console.log('err', err);
          })

          this.message = '';
          this.editChatid = '';
          $('#send-msg').addClass('disabled').attr("disabled", "disabled");
        }

        else if (this.chatreplydata) {

          this.msgObj = {

            commentId: { _id: this.chatreplydata._id, message: this.chatreplydata.message, senderId: { _id: this.chatreplydata.senderId._id},messageType: this.chatreplydata.messageType },
            messageType: 0,
            receiptStatus:status,
            bookmarked:0,
            senderId: { _id: this.c_user._id,name:this.c_user.name },
            receiverId: { _id: this.friendId },
            senderName: this.c_user.name,
            message: this.message,
            createdAt: new Date().toISOString(),
            chatType: 1
          };
          var msg = this.message;
          

          this.isSeen = false;
          this.friendchat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.friendId,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
        
          $('#singlemessage-input').css("height", "96px");
          this.replyBox = false;
          this.chatreplydata = "";
          axios.post('/chat', {
            msgData: this.msgObj,
            selectedUserData: this.friendId,
              projectId: this.projectId
          }).then(response => {
            this.$socket.emit('sendid', response.data)

            // this.userdec = this.friendsdata.filter((obj) => {
            //   return this.friendId === obj._id;
            // }).pop();
            // this.userdec.updatedByMsg = new Date().toISOString();
            // this.userdec.lastmsg.message = msg;




          }, function(err) {
            console.log('err', err);
          })
           var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
          var container = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
          this.message = '';
          $('#send-msg').addClass('disabled').attr("disabled", "disabled");
        }

        else {


          this.msgObj = {
            chatType: 0,
            isGroup: 0,
            messageType: 0,
            receiptStatus:status,
            bookmarked:0,
            senderId: { _id: this.c_user._id,name:this.c_user.name },
            senderImage: '',
            receiverImage: '',
            receiverId: { _id: this.friendId },
            senderName: this.c_user.name,
            message: this.message,
            createdAt: new Date().toISOString(),
          };
       
          //  this.isSeen = false;
          this.friendchat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.friendId,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          //  $('#f_typing' + this.friendId).html(this.msgObj.message);
          
          axios.post('/chat', {
            msgData: this.msgObj,
            selectedUserData: this.friendId,
              projectId: this.projectId
          }).then(response => {
            this.$socket.emit('sendid', response.data)


           //  this.userdec = this.friendsdata.filter((obj) => {
           //    return this.friendId === obj._id;
           //  }).pop();
           //  this.userdec.updatedByMsg = new Date().toISOString();
           // // this.userdec.latestMsg.message=msg;
           // this.userdec.latestMsg.message=msg;


          }, function(err) {
            console.log('err', err);
          })

          this.message = '';
           var container = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          var container2 = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        

          $('#send-msg').addClass('disabled').attr("disabled", "disabled");

        }
      }
    },



    dragfileupload(file, xhr, formData) {
      formData.append('senderId', this.c_user._id);
      formData.append('senderName', this.c_user.name);
      formData.append('friendId', this.friendId);
      formData.append('messageType', 1);
      formData.append('projectId', this.projectId);
      formData.append('isGroup', 0);


    },

    afterComplete(file, response) {

      this.msgObj = {
        _id: response.data._id,
        chatType: 0,
        isSeen: 0,
        isGroup: 0,
        messageType:1,
        messageType: response.data.messageType,
        senderId: { _id: this.c_user._id },
        senderImage: '',
        receiverImage: '',
        receiverId: { _id: this.friendId },
        senderName: this.c_user.name,
        message: response.data.message,
        createdAt: new Date().toISOString(),
      };
     

      this.isSeen = false;
      this.friendchat.push(this.msgObj);
       var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
      var container = this.$el.querySelector("#o2ochating");
      $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
      this.$socket.emit('sendmsg', {
        selectFrienddata: this.friendId,
        userId: this.c_user._id,
        msgData: this.msgObj
      })
      // this.userdec = this.friendsdata.filter((obj) => {
      //   return this.friendId === obj._id;
      // }).pop();

      // this.userdec.updatedByMsg = new Date().toISOString();

      // this.$socket.emit('sendmsg', response.data )
      this.$refs.myVueDropzone.removeFile(file);
      $("#dropzone").css("display", "none");
      $("#groupdropzone").css("display", "none");
    },

    uploadfile(event) {
      let filesdata = this.$refs.myFiles.files;
      filesdata.forEach((file) => {
        let formDatas = new FormData();
        let r = Math.random().toString(36).substring(7);
        // formDatas.append('file', file, (r + file.name));
         formDatas.append('file', file);
        formDatas.append('senderId', this.c_user._id);
        formDatas.append('senderName', this.c_user.name);
        formDatas.append('friendId', this.friendId);
        formDatas.append('isGroup', 0);
        formDatas.append('messageType', 1);
        formDatas.append('projectId', this.projectId);
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', formDatas, config).then((response) => {
          this.msgObj = {
            _id: response.data.data._id,
            chatType: 0,
            messageType: 1,
            isSeen: 0,
            isGroup: 0,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id },
            senderImage: '',
            receiverImage: '',
            receiverId: { _id: this.friendId },
            senderName: this.c_user.name,
            message: response.data.data.message,
            createdAt: new Date().toISOString(),
            projectId: this.projectId
          };
         

          this.isSeen = false;
          this.friendchat.push(this.msgObj);
          this.isLoading = false;
            var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.friendId,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          // this.userdec = this.friendsdata.filter((obj) => {
          //   return this.friendId === obj._id;
          // }).pop();
          // this.userdec.updatedByMsg = new Date().toISOString();


        
          }, 0);
        }, function(err) {
          console.log('err', err);
        })
      
    },

 onPaste(e){
       console.log(e.clipboardData.files[0]);
         e.clipboardData.files.forEach((file) => {
        // var rnd=Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
        // file.name=rnd+file.name;
        console.log(file);
        let formDatas = new FormData();
        let r = Math.random().toString(36).substring(7);
       console.log(r);
        formDatas.append('file', file, (r + file.name));
        formDatas.append('senderId', this.c_user._id);
        formDatas.append('senderName', this.c_user.name);
        formDatas.append('friendId', this.friendId);
        formDatas.append('isGroup', 0);
        // formDatas.append('messageType', 1);
        formDatas.append('projectId', this.projectId);
        console.log(formDatas);
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', formDatas, config).then((response) => {
          console.log(response.data);
          this.msgObj = {
            _id: response.data.data._id,
            chatType: 0,
            // messageType: 1,
            isSeen: 0,
            isGroup: 0,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id },
            senderImage: '',
            receiverImage: '',
            receiverId: { _id: this.friendId },
            senderName: this.c_user.name,
            message: response.data.data.message,
            createdAt: new Date().toISOString(),
            projectId: this.projectId
          };
        

          console.log(this.msgObj);
          this.isSeen = false;
          this.friendchat.push(this.msgObj);
          this.isLoading = false;
           var container2 = this.$el.querySelector("#contact-chat");
        $("#contact-chat").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.friendId,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          

        }, function(err) {
          console.log('err', err);
          // alert('error');
        })
      })
    },

    eidtchat(id, message) {
      this.message = message;
      this.editChatid = id;
      $('#singlemessage-input').css("height", "96px");
      this.replyBox = false;
   
      this.$nextTick(function() {
        this.$refs.afterClick.focus();
      });
    
      this.onEditclear = true;
      this.onChat = false;

    },

    clearchat() {
      this.onEditclear = false;
      this.onChat = true;
      this.message = '';
      this.editChatid = '';
    },


    removecross() {

      if (this.onEditclear == true) {
        this.onEditclear = false;
        // this.message = '';
        this.onChat = true;
        $('#send-msg').addClass('disabled').attr("disabled", "disabled")
      } else {
        this.$socket.emit('msgtyping', { selectFrienddata: this.friendId, UserId: this.c_user._id });
      }

    },

    msgdelete(data) {
      this.$socket.emit('senderdeletemsg', data);
      this.onEditclear = false;
      this.message = '';
      $('#singlemessage-input').css("height", "96px");
      this.replyBox = false;
      $('#sender' + data._id).html(""+ this.$t('messagedeleted'));
      axios.get('/deleteMsg/' + data._id + '/0' + '/5d4c07fb030f5d0600bf5c03')
        .then((responce) => console.log(responce))
        .catch((error) => console.log(error));

    },

 msg_setting(id) {
      $('#msg-setting' + id).siblings('#msg-dropdown' + id).toggle();
      $('#msg-settingo2o' + id).siblings('#msg-dropdowno2o' + id).toggle();
    },

 showChatemoji() {
  // alert('dd');
      this.isActive = !this.isActive;
    },
select2chatEmoji(emoji) {
       alert(emoji.data)
      // this.emoj.push(emoji.data);
      this.message += emoji.data;
      // console.log(this.groupmessage);

      // this.not_working = false;
      $('#send-msg').removeClass('disabled').attr("disabled", false);

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
    stopcall(){
           this.$socket.emit('updateCallStatus', {
                userId: this.c_user._id,
                userName: this.c_user.name,
                friendId: this.friendId,
                friendName: '',
                status: 0,
                call:''
                
              });

        axios.post('/updateCallStatus', {
          userId: this.c_user._id,
          friendId: this.friendId,
          status: 0,
          projectId: this.projectId
        }).then(response => {
           this.$router.push('/');
        }, function(err) {
          console.log('err', err);
          //alert('error');
        });
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
    padding: 11px 10px 0;
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
