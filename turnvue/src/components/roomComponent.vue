lo<template>
  <div>
<!--Login form -->
<!--     <div class="container" id="meetinglogin">
      <div class="row" style="margin-top: 90px;">
        <div class="col col-md-3">
          
        </div>
        <div class="col col-md-6">
          <div style="text-align:center">
          <img src="../assets/images/logo/logo_big.png" alt="" />
          <h3 style="margin: 21px 0 21px;">Welcome to Chatto Meeting</h3>
        </div>
         
             <div class="form-group">
              <label for="email">Name:</label>
              <input type="text" class="form-control" v-model="input.name" placeholder="Enter name" id="name">
            </div>
            <div class="form-group">
              <label for="email">Email Address:</label>
              <input type="email" class="form-control" v-model="input.email" placeholder="Enter email" id="email">
            </div>
            <div class="form-group">
              <label for="pwd">{{ $t('MeetingPassword') }}:</label>
              <input type="password" class="form-control" v-model="input.password" placeholder="Enter Meeting password" id="pwd">
            </div>
           
            <button @click="meetingLogin()" class="btn btn-lg btn-primary btn-block">Join Meeting</button>
    
        </div>
        
      </div>
      
    </div>


 -->
    <div class="container-fluid" id="meetingSection" style="background-color: #2C3550;
    height: calc(119.8vh - 20vh);">
         <div class="row meetingRow" >
          <div class="col-">
           <div  class="profile" style="width: 56px;height: 56px;">
              <span> {{getFirstLetter(roomData.room_title)}}</span>
            </div>
          </div>
          <div class="col col-md-5">
            <p>{{roomData.room_title}}</p>
            <p>{{isToday(roomData.createdAt)}}</p>
          </div>
        <div class="col col-md-6" style="flex: 1 0 50%;max-width: 62%;padding-right: 0px;">

        </div>
      </div>

              <div class="row" style="margin-top: 2px;overflow-y: auto;">
             <div class="col col-md-12" id="mainMeeting" style="height: calc(98vh - 69px);" >
                <template v-if="userHave">
                  <vue-jitsi-meet
                  ref="jitsiRef"
                  domain="stun.ringy.jp"
                  :options="jitsiOptions"
                ></vue-jitsi-meet>
                <img v-if="chatTrue" @click="chatOpen()" class="bg-img chatbutton" src="../assets/images/icons/white-chat.png" style="border-radius: 0px;"  alt="Avatar" />
                <img class="bg-img chatbutton" v-if="chatFalse" @click="chatClose()" src="../assets/images/icons/mclosechat.png" style=""  alt="Avatar" />
                </template>
              
            </div>

              <div class="chat-content tabto" id="startMeetingchat" class="" style="display: none;background-color: #edeef1;">
              <div class=" messages custom-scroll active messageschat" id="roomchating"  style="height: auto;
    overflow-y: scroll;
">
               <div class="contact-chat"   style="height: calc(78vh - 95px); min-height: calc(78vh - 76px);margin-top: 0px;padding: 20px 0px 0;">

                
              <ul class="chatappend" v-for="chat in roomsChat">
                   <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 30px;">
                                  <span>{{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>

                                <li class="replies" style="padding-bottom:20px" v-else-if="chat.senderId._id == c_user._id">
                                  <div class="media">
                                    <div class="profile mr-4">
                                       <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar"  />
                                     <div v-else  class="userprofile"  >
                                       <span style="z-index: 0;"> {{getFirstLetter(c_user.name)}}</span>
                                    </div>
                                  </div>
                                    <div class="media-body">
                                      <div class="contact-name">
                                        <h5>{{ c_user.name}}</h5>
                                        <h6>{{chatTime(chat.createdAt)}}</h6>
                                        <span v-if="chat.bookmarked == 1"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                                        <ul class="msg-box">
                                          <li class="msg-setting-main">
                               <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                                <i class="ti-more-alt"></i>
                                              </div>

                                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                                <ul>
                                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                                    <a href="#" @click="eidtroomchat(chat._id,chat.message)">
                                                      <img class="chatIcons" src="../assets/images/icons/svg/edit.svg" alt="Avatar"  />{{ $t('Edit') }}</a>
                                                  </li>
                                               <!--    <li>
                                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon> Download
                                                    </a>
                                                </li> -->
                                               <!--   <li>
                                                    <a href="#" @click="forward(chat)">
                                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                                  </li> -->
                                                  <li v-if="chat.bookmarked == 0">
                                                    <a href="#" @click="bookmarked(chat,'room')">
                                                      <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                                  </li>
                                                   <li v-else>
                                                    <a href="#" @click="removebookmarked(chat,'room')">
                                                      <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                                  </li>
                                                  <li>
                                                    <a href="#" @click="roomquote(chat)">
                                                      <i style="margin-right: 4px;" class="fa fa-share"></i>{{ $t('Quote') }}</a>
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

                               &nbsp; <h5 v-if="chat.isDeleted == 1" :id="'sender'+chat._id">{{ $t('messagedeleted') }}</h5>
                                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 &&  chat.chatType == 0" :id="'sender'+chat._id">{{ chat.message }}</h5>
                                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'sender'+chat._id">
                                              <span style="border-bottom: 1px solid;"><template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h5>
                                            <br>

                                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank"  :id="'sender'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                                              <img :src="hostname+'/images/chatImages/'+chat.message">
                                            </a>

                                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'sender'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ chat.message }}</a>
                                            <audio controls v-if="chat.messageType == 6 && chat.isDeleted != 1">
                                              <source :src="hostname+'/images/chatImages/'+chat.message" type="audio/ogg">
                                              <source :src="hostname+'/images/chatImages/'+chat.message" type="audio/mpeg">
                                              Your browser does not support the audio element.
                                            </audio>

                                            <video width="320" height="240" style="border-radius: 10px;" controls v-if="chat.messageType == 5 && chat.isDeleted != 1">
                                            <source :src="hostname+'/images/chatImages/'+chat.message">
                                            <source :src="hostname+'/images/chatImages/'+chat.message">
                                            Your browser does not support the video tag.
                                          </video>
                                          
                                          </li>
                                      
                                        </ul>

                                      </div>
                                    </div>
                                  </div>
                                </li>
                       <li class="sent" style="padding-bottom:20px" v-else>

                                  <div class="media">
                                    <div class="profile mr-4">
                                       <img class="bg-img" v-if="chat.senderId.user_image" :src="hostname+'images/chatImages/'+chat.senderId.user_image" alt="Avatar" />
                                     <div v-else  class="userprofile">
                                       <span style="z-index: 0;
                " > {{getFirstLetter(chat.senderId.name)}}</span>
                                    </div> </div>
                                    <div class="media-body">
                                      <div class="contact-name">
                                        <h5>{{ chat.senderId.name }}</h5>
                                        <h6>{{chatTime(chat.createdAt)}}</h6>
                                         <span v-if="chat.bookmarked == 1"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                                        <ul class="msg-box">
                                          <li class="msg-setting-main">
                                       
                                            <h5 v-if="chat.isDeleted == 1" :id="'receiver'+chat._id">{{ $t('messagedeleted') }}</h5>
                                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 && chat.chatType == 0" :id="'receiver'+chat._id">{{ chat.message }} </h5>
                                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'receiver'+chat._id">
                                              <span style="border-bottom: 1px solid;">
                                              <template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h5>
                                            <br>
                                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                                              <img :src="hostname+'/images/chatImages/'+chat.message">
                                            </a>
                                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1"><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ chat.message }}</a>
                                               <audio controls v-if="chat.messageType == 6 && chat.isDeleted != 1">
                                              <source :src="hostname+'/images/chatImages/'+chat.message" type="audio/ogg">
                                              <source :src="hostname+'/images/chatImages/'+chat.message" type="audio/mpeg">
                                              Your browser does not support the audio element.
                                            </audio>
                                             <video width="320" height="240" style="border-radius: 10px;" controls v-if="chat.messageType == 5 && chat.isDeleted != 1">
                                            <source :src="hostname+'/images/chatImages/'+chat.message">
                                            <source :src="hostname+'/images/chatImages/'+chat.message">
                                            Your browser does not support the video tag.
                                          </video>
                                                 <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                                <i class="ti-more-alt"></i>
                                              </div>
                                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                                <ul>
                                                  <!--<li v-if="chat.messageType != 1 && chat.messageType != 2"><a href="#" @click="eidtchat(chat._id,chat.message)"><i class="fa fa-pencil" ></i>{{ $t('Edit') }}</a></li>-->
                                                   <li>
                                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon> {{ $t('Download') }}
                                                    </a>
                                                </li>
                                               <!--   <li>
                                                    <a href="#" @click="forward(chat)">
                                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                                  </li> -->
                                                    <li v-if="chat.bookmarked == 0">
                                                    <a href="#" @click="bookmarked(chat,'room')">
                                                     <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                                  </li>
                                                   <li v-else>
                                                    <a href="#" @click="removebookmarked(chat,'room')">
                                                      <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                                  </li>
                                                  <li>
                                                    <a href="#" @click="roomquote(chat)">
                                                      <i style="margin-right: 4px;" class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                                  </li>
                                                 <br>
                                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                                      <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                                  </li>
                                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                                  <!--<li><a href="#" @click="msgdelete(chat._id)"><i class="ti-trash"></i>{{ $t('Delete') }}</a></li>-->
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

                <VEmojiPicker @select="selectmeetingEmoji" class="" v-bind:class="{activeChatemoji: ismeetingemojiActive}" v-if="ismeetingemojiActive" />
                  <div class="message-input row" id="singlemessage-input" style="bottom: 0%;width:25%;height: calc(19vh - 76px);">
                    <div class="replybox" v-if="replyroomBox == true">
                              <p style="padding: 7px; margin: 0;"> <template v-if="roomchatreplydata.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{roomchatreplydata.message}}’’</template> 
                                <span style="float:right;cursor: pointer;" @click="closeroomReplybox()">
                                  <x-icon size="1.5x" class="custom-class"></x-icon>
                                </span>
                                <br>
                                <span style="margin-left: 6px;">
                                  {{chatTime(roomchatreplydata.createdAt)}}
                                </span>
                              </p>
                            </div>
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
                       <textarea class="setemoj" id="setemoj" ref="afterroomClick" type="text"  v-on:keyup="removeroomcross()" @keydown.enter.exact.prevent
                              @keyup.enter.exact="meetingchat()"
                              @keydown.enter.shift.exact="newline" v-model="message" :placeholder="$t('WriteMessage')" rows="3" cols="50">
                              </textarea>
                     
                      <button class="submit icon-btn btn-primary disabled mr-3 ml-3" v-show="onChat" @click="meetingchat()" id="send-msg" style="width: 65px;" disabled="disabled">
                        <send-icon size="1.5x" class="custom-class"></send-icon>
                      </button>
                      <button class="submit icon-btn btn-primary mr-3 ml-3" v-show="onEditclear" @click="clearchat()" style="display: none; width: 65px;">
                        <x-icon size="1.5x" class="custom-class"></x-icon>
                      </button>

                    </div>
                  </div>
                    </div>

                </div>
        


            


               <!-- <div class="row meetingOptions" style="margin-top: 2px;border-top: 1px solid #bac5e9bf;"> -->
                <!-- <div class="col col-md-1" style="margin-top: 16px;" v-if="meetingAudioPause"  @click="audiomeetingPausecall()">
                   <img class="bg-img" src="../assets/images/icons/mmic.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Mute</span>
                </div>
                <div class="col col-md-1" style="margin-top: 16px;" v-if="meetingAudioPlay"  @click="audiomeetingPlaycall()">
                   <img class="bg-img" src="../assets/images/icons/mcrossmic.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Un Mute</span>
                </div>
                <div class="col col-md-1" style="margin-top: 16px;max-width: 10.3333%;flex: 0 0 10.3333%;" v-if="meetingVideoPause"  @click="meetingPausecall()">
                  <img class="bg-img" src="../assets/images/icons/mvideo.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Stop Video</span>
                </div>
                <div class="col col-md-1" style="margin-top: 16px;max-width: 10.3333%;flex: 0 0 10.3333%;" v-if="meetingVideoPlay"  @click="meetingPlaycall()">
                  <img class="bg-img" src="../assets/images/icons/mcrossvideo.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Play Video</span>
                </div>
                 <div class="col col-md-1"   style="margin-top: 16px;">
                  <img class="bg-img" @click="room_screenRecording()" src="../assets/images/icons/mrecord.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff" @click="room_screenRecording()">Record</span>

                 <div  id="saveRecording-btn" style="display:none;padding: 7px; align-items: center;" class="">
                
                    <div class="group_record-options" style="width: 155px;position: absolute;z-index: 999;background-color: white; padding: 10px;bottom: 0;"> 
                      <ul style="display: flex; flex-direction: column;">
                       
                        <li id="group-pauseRecording-btn" onclick="onPauseResumeClicked()">Pause</li>
                        <li id="group-saveRecording-btn" @click="saveRecording()">Save Recording</li>
                        <li style="padding-top: 5px;">
                         <a id="group_downloadLink" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
                        </li>
                        <li style="width: 100%">
                        <span id="group_clearRecordDownloads" @click="o2o_resetRecordLink()" style="cursor: pointer; display: none; float: right; padding: 10px;">Close</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                    <div class="col col-md-1" id="onsharescreen" v-if="screenshareActive" style="margin-top: 16px;max-width: 10.33333%;flex: 0 0 10.33333%;" @click="screenSharing()">
                  <img class="bg-img" src="../assets/images/icons/white-screen.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Share Screen</span>
                </div>

                <div class="col col-md-1" id="onstopscreen" v-if="stopscreenshareActive" style="margin-top: 16px;max-width: 10.33333%;flex: 0 0 10.33333%;" @click="stopScreenShare()">
                  <img class="bg-img" src="../assets/images/icons/white-screen.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff"> Stop Share Screen</span>
                </div> -->
               <!--   <div class="col-1" style="margin-top: 16px;">
                  <img class="bg-img" src="../assets/images/icons/white-person.png" style=""  alt="Avatar" />
                 <span style="color:#fff">{{ $t('Invite') }}</span>
                </div> -->
            <!--      <div class="col col-md-1" style="margin-top: 16px;padding:0px;max-width: 10.3333%;flex: 0 0 10.3333%;">
                  <img class="bg-img" src="../assets/images/icons/white-person.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Participants ({{members}})</span>
                </div>
             

                <div class="col col-md-5" v-if="chatTrue" @click="chatOpen()" style="margin-top: 16px;">
                  <img class="bg-img" src="../assets/images/icons/white-chat.png" style="border-radius: 0px;"  alt="Avatar" />
                 <span style="color:#fff">Chat</span>
                </div>

                <div class="col col-md-5" v-if="chatFalse" @click="chatClose()" style="margin-top: 16px;">
                  <img class="bg-img" src="../assets/images/icons/mclosechat.png" style=""  alt="Avatar" />
                 <span style="color:#fff">Chat</span>
                </div>
              <div class="col col-md-5">
                <p @click="meetingstopKCall()" style="text-align:right;color:#B70A0A;cursor: pointer;padding-top: 13px;font-weight: 600; ">Leave Room</p>
              </div>
            </div> -->

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
import {Trash2Icon ,CheckIcon, AirplayIcon, AtSignIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneIncomingIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon } from 'vue-feather-icons';


export default {
  name: 'JoinMeeting',
   components: {Trash2Icon ,CheckIcon,VEmojiPicker,PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon,VueJitsiMeet: JitsiMeet },
      props:[],
           data() {
            return {
              c_user:'',
                input: {
                    name: "",
                    email: "",
                    password: ""
                },
                meetingId:'',
                 userImageName:'',
                errorMessage: '',
                roomData:'',
                roomsChat:[],
                isConnected: false,
                socketMessage: '',
                userId: '',
                singleRoom: {},
                msgObj: {},
                message: '',
                friendchat: {},
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
                isActive:false,
                ismeetingemojiActive:false,
                userid:'',
                windowHeight:0,
                friendid:'',
                userEmail:'',
                chatTrue:true,
                chatFalse:false,
                members:'',
                meetingVideoPause:true,
                meetingVideoPlay:false,
                meetingAudioPause:true,
                meetingAudioPlay:false,
                screenshareActive:true,
                stopscreenshareActive:false,
                startScreenuser:'',
                screenActive:false,
                roomchatreplydata: '',
                editroomChatid:'',
                onroomEditclear: false,
                 onroomChat: true,
                 replyroomBox:false,
                 showchat:true,
                 hidechat:false,
                 userHave:false,
                 callDisable:true,
              //  roomLeft: false,
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
           beforeCreate: function () {
          if (localStorage.getItem("userData") == null) {
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


          /////////////////////////////CHAT SECTION////////////////////////

          receiveRooms(data) {
            //console.log(data);
            if (this.singleRoom && this.singleRoom == data.msgData.groupId) {
               this.roomsChat.push(data.msgData);
                    var container = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container.scrollHeight + 9820 }, "fast");
            }

        },

      receiveroomupdatechatmsg(updatedata) {
          const data = updatedata;
          const post = this.roomsChat.filter((obj) => {
            return updatedata.chatid === obj._id;
          }).pop();
          post.message = data.message;

    },

        receivescreenUrl(data){

              this.startScreenuser = data.startScreen;
            if( data.friendId == this.roomData._id && data.userId != this.c_user._id){
              var html='<iframe style="width: 100%;height: calc(80vh - 30px);" src="'+data.viewerUrl+'" title="description">';
              $('#participants').children('div').removeClass('participant');
              $('#participants').children('div').addClass('participantscreen');
              $('#participants').css({"display": "none"});
              $('#remoteScreenshare').css({"display": "block"});
             this.screenActive=true;
              console.log(this.screencode);
              $('#remoteScreenshare').html(html);
              localStorage.setItem('screenSharing', 0);
            }
          },
          receivestopScreenshare(data){
             if(data.userId == this.c_user._id){
              this.stopscreenshareActive=false;
              this.screenshareActive=true;
            }
            if(data.friendId == this.roomData._id && data.userId != this.c_user._id){
               this.screenActive=false;
              $('#participants').children('div').removeClass('participantscreen');
              $('#participants').children('div').addClass('participant');
              $('#remoteScreenshare').css('display','none');
              $('#participants').css({"display": "-webkit-box"});
              $('#remoteScreenshare').html('');
              
              localStorage.setItem('screenSharing', 0);
            }
          },
        },
computed: {
          jitsiOptions () {
            return {
              roomName: this.singleRoom,
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
                  'fodeviceselection', 'hangup', 'profile', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                  'videoquality', 'filmstrip','feedback', 'stats',
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
          message() {
              if (this.message.length > 0) {
                      $('#send-msg').removeClass('disabled').attr("disabled", false);
                    } else {
                      $('#send-msg').removeClass('disabled').attr("disabled", true);
                    }
                  }
                },

        methods:{

    preventNav(event) {
             if (!this.callDisable) return
              console.log(event);
             event.preventDefault();
             event.returnValue = " Hello Nabeel";
             this.meetingstopKCall();
              return undefined;
            },
            
         onIFrameLoad () {
               this.$refs.jitsiRef.addEventListener('participantJoined', this.onParticipantJoined);
               this.$refs.jitsiRef.addEventListener('videoConferenceLeft', this.meetingstopKCall);
            },

            onParticipantJoined (e) {
                // alert('join');
              },
              selectmeetingEmoji(emoji) {
               // console.log(emoji.data)
                //this.emoj.push(emoji.data);
                this.message += emoji.data;
                console.log(this.message);
                
                  $('#send-msg').removeClass('disabled').attr("disabled", false);
                
              },

              
              showMeetingemoji(){
               
                 this.ismeetingemojiActive = !this.ismeetingemojiActive;
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


            getFirstLetter(str){
                console.log(str);
                if(str){
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
                 
                 

                       let selectedRoomData = {
                               "projectId": "5d4c07fb030f5d0600bf5c03",
                               "_id": this.singleRoom
                       };
                    // this.$socket.emit('leaveRoomCall', selectedRoomData);

                     console.log("leaveRoomCall2:", selectedRoomData);

                        axios.post('/leaveRoomCall', selectedRoomData).then((response) => {
                            console.log("leaveRoomCall", response);

                            if (response.data.activeMembersCount == 0){
                             this.$socket.emit('leaveRoomCall', selectedRoomData);
                            }

                           setTimeout(() => {
                             // this.$router.push('/?room=room');
                              window.close();
                           }, 500);
                        });
                                         //  }

                    // this.$router.push('/?room=room');

                },

             
                  meetingchat() {

                      console.log(this.message);
                        this.ismeetingemojiActive = false;
                     if (this.message) {
                    if (this.editroomChatid) {

                      this.msgObj = {
                        message: this.message,
                        chatid: this.editroomChatid
                      };
                     

                      this.$socket.emit('updateroomchatmsg', this.msgObj)
                      // this.removecross();
                      axios.post('/updateGroupChat',{
                        message: this.message,
                        _id: this.editroomChatid,
                        projectId: '5d4c07fb030f5d0600bf5c03'
                      }).then(response => {

                      }, function(err) {
                        console.log('err', err);
                      })

                      this.message = '';
                      this.editroomChatid = '';
                      $('#roomsend-msg').addClass('disabled').attr("disabled", "disabled");
                    }

                    else if(this.roomchatreplydata) {
                
                      this.msgObj = {

                        commentId: { _id: this.roomchatreplydata._id, message: this.roomchatreplydata.message, senderId: { _id: this.roomchatreplydata.senderId._id},messageType: this.roomchatreplydata.messageType },

                        messageType: 0,
                        receiptStatus:1,
                        senderId: { _id: this.c_user._id, name: this.c_user.name },
                        senderName: this.c_user.name,
                        message: this.message,
                        groupId: this.singleRoom,
                        createdAt: new Date().toISOString(),
                        chatType: 1,
                        isGroup: 2,
                        isDeleted: 0,
                        projectId: '5d4c07fb030f5d0600bf5c03'
                      };
                     
                      this.roomsChat.push(this.msgObj);
                      var container = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container.scrollHeight + 9820 }, "fast");
                      //this.friendCallchat.push(this.msgObj);
                      // this.$socket.emit('roomsendmsg', {
                      //   roomId: this.singleRoom._id,
                      //   userId: this.c_user._id,
                      //   msgData: this.msgObj
                      // })
                    
                      $('#singlemessage-input').css("height", "96px");
                      this.replyroomBox = false;
                      this.roomchatreplydata = "";
                      axios.post('/groupChat', this.msgObj).then(response => {
                        this.$socket.emit('roomsendid', response.data)

                     var container2 = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container2.scrollHeight + 9820 }, "fast");

                      }, function(err) {
                        console.log('err', err);
                      
                      })
                      
                     
                    
                      this.message = '';
                      $('#roomsend-msg').addClass('disabled').attr("disabled", "disabled");
                    }

                    else {


                      this.msgObj = {

                        chatType: 0,
                        isGroup: 2,
                        messageType: 0,
                        bookmarked:0,
                        senderId: { _id: this.c_user._id, name: this.c_user.name },
                        senderImage: '',
                        groupId: this.singleRoom,
                        receiverImage: '',
                        senderName: this.c_user.name,
                        message: this.message,
                        projectId:'5d4c07fb030f5d0600bf5c03',
                        createdAt: new Date().toISOString(),
                      };
                    
                      //  this.isSeen = false;
                      // this.roomsChat.push(this.msgObj);
                      //this.friendCallchat.push(this.msgObj);
                      this.$socket.emit('roomsendmsg', { msgData: this.msgObj
                      })
                     
                      axios.post('/groupChat',this.msgObj).then(response => {
                        this.$socket.emit('roomsendid', response.data);
                        var container2 = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container2.scrollHeight + 9820 }, "fast");

                      }, function(err) {
                        console.log('err', err);
                      })

                      this.message = '';
                      var container = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container.scrollHeight + 9820 }, "fast");
               

                      $('#roomsend-msg').addClass('disabled').attr("disabled", "disabled");

                    }
                  }
                  },
                 chatOpen(){
                      this.chatTrue= false;
                      this.chatFalse= true;
                      $('#mainMeeting').removeClass('col-md-12');
                      $('#mainMeeting').addClass('col-md-9');
                      $('#startMeetingchat').addClass('col-md-3');
                      $('#startMeetingchat').show();
                      axios.get('/getRoomChat/'+this.singleRoom+'/5d4c07fb030f5d0600bf5c03/')
                      .then(responce => {
                           this.roomsChat=responce.data;
                            var container = this.$el.querySelector("#roomchating");
                           $("#roomchating").animate({ scrollTop: container.scrollHeight + 9820 }, "fast");
                         }, function(err) {
                        console.log('err', err);
                      
                      })
                   

                  },

                  chatClose(){
                      this.chatFalse=false;
                      this.chatTrue =true;
                      $('#startMeetingchat').removeClass('col-md-3');
                      $('#mainMeeting').addClass('col-md-12');
                      $('#startMeetingchat').hide();
                  } ,

                screenSharing(){
                  console.log(this.screenActive);
                 if(this.screenActive){
                   alert('you can not share screen');
                       
                    }else{
                     var friendId=this.singleRoom;
                     screenShare();
                     localStorage.setItem('friendId', friendId);
                       // this.$socket.emit('screenUrl',{userId:this.c_user._id, startScreen: this.c_user._id, friendId:this.singleRoom, viewerUrl:'https://chat.chatto.jp/sViewer.html'} );
                      this.screenshareActive=false;
                      this.stopscreenshareActive=true;
                    }
                  },

                  stopScreenShare(){
                    

                    this.stopscreenshareActive=false;
                    this.screenshareActive=true;

                    this.$socket.emit('stopscreenshare',{userId:this.c_user._id, friendId:this.singleRoom});
                      stopScreenShare();
                  },

                  room_screenRecording(){

                  // this.recordOptions = !this.recordOptions;
                   onBtnRecordClicked(1);
                  $("#saveRecording-btn").show();
                  
              },
              saveRecording() {
                    
                     // console.log("recordingBlob: ", window.recordingBlob);
                    //  console.log("callGroup: ", this.callGroup);

                      $("#saveRecording-btn").hide();
                      $("#group-saveRecording-btn").hide();
                        
                      let groupformDatas = new FormData();
                      let randFileNo = Math.floor(10 + Math.random() * 90);


                      groupformDatas.append('file', window.recordingBlob, (this.singleRoom + randFileNo + "_recording.mp4"));
                      groupformDatas.append('senderId', this.c_user._id);
                      groupformDatas.append('senderName', this.c_user.name);
                      groupformDatas.append('groupId', this.singleRoom);
                      groupformDatas.append('isGroup', 2);
                      groupformDatas.append('messageType', 1);
                      groupformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03')
               
                      let config = {
                        header: {
                          'Content-Type': 'multipart/form-data'
                        }
                      }
                   

                      axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
                       // console.log('chatFilesShare', response);
                        this.groupmsgObj = {
                          _id: response.data.data._id,
                          chatType: 0,
                          isGroup: 2,
                          messageType: response.data.data.messageType,
                          senderId: { _id: this.c_user._id, name: this.c_user.name },
                          senderName: this.c_user.name,
                          message: response.data.data.message,
                          groupId: this.singleRoom,
                          isDeleted: 0,
                          createdAt: new Date().toISOString(),
                          projectId: '5d4c07fb030f5d0600bf5c03'
                        };
                       this.$socket.emit('roomsendmsg', {
                          roomId: this.singleRoom,
                          userId: this.c_user._id,
                          msgData: this.groupmsgObj
                        })
                      
                        
                      }, function(err) {
                       // console.log('err', err);
                        alert('error');
                      })
                      var container = this.$el.querySelector("#roomchating");
                      $("#roomchating").animate({ scrollTop: container.scrollHeight + 9020 }, "fast");
                  },
                   o2o_stopRecording(){
                      onBtnStopClicked();

                 },

                      o2o_resetRecordLink(){
                        resetDownloadLink();
                      },

                  meetingPausecall() {

                  this.meetingVideoPause = false;
                  this.meetingVideoPlay = true;
                   const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
                  stream.getVideoTracks()[0].enabled = false;

                },

                meetingPlaycall() {

                    this.meetingVideoPlay = false;
                    this.meetingVideoPause = true;
                    const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
                    stream.getVideoTracks()[0].enabled = true;

                  },
                   audiomeetingPausecall() {

                  this.meetingAudioPause = false;
                  this.meetingAudioPlay = true;
                   const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
                  stream.getAudioTracks()[0].enabled = false;

                },

              audiomeetingPlaycall() {

                  this.meetingAudioPlay = false;
                  this.meetingAudioPause = true;
                  const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
                  stream.getAudioTracks()[0].enabled = true;

                },
                getFirstLetter(str){
     
                  if(str){
                    var matchess = str.match(/\b(\w)/g); // ['J','S','O','N']
                    var matches = matchess.slice(0, 2);
                    var acronym = matches.join(''); // JSON

                  return acronym;
                  }
                  
                },
              msg_setting(id) {
                  $('#msg-setting' + id).siblings('#msg-dropdown' + id).toggle();
                  $('#msg-settingo2o' + id).siblings('#msg-dropdowno2o' + id).toggle();
                },

    eidtroomchat(id, message) {
      this.message = message;
      this.editroomChatid = id;
      $('#singlemessage-input').css("height", "96px");
      this.replyroomBox = false;
    
      this.$nextTick(function() {
        this.$refs.afterroomClick.focus();
      });
   
      this.onroomEditclear = true;
      this.onroomChat = false;

    },

    clearroomchat() {
      this.onroomEditclear = false;
      this.onroomChat = true;
      this.roommessage = '';
      this.editroomChatid = '';
    },


    removeroomcross() {

      if (this.onroomEditclear == true) {
        this.onroomEditclear = false;
        // this.message = '';
        this.onroomChat = true;
        $('#roomsend-msg').addClass('disabled').attr("disabled", "disabled")
      }

    },

    msgroomdelete(data) {
      this.$socket.emit('senderroomdeletemsg', data);
      this.onroomEditclear = false;
      this.roommessage = '';
      $('#singlemessage-input').css("height", "96px");
      this.replyroomBox = false;
      $('#sender' + data._id).html(""+ this.$t('messagedeleted'));

      axios.get('/deleteMsg/' + data._id + '/0' + '/5d4c07fb030f5d0600bf5c03')
        .then((responce) => console.log(responce))
        .catch((error) => console.log(error));

    },

       roomquote(chatdata) {
          this.roomchatreplydata = chatdata;
          $('#singlemessage-input').css("height", "140px");
          this.onroomEditclear = false;
          this.message = '';
          this.replyroomBox = true;
         
          this.$nextTick(function() {
            this.$refs.afterroomClick.focus();
          });
   
    },

    closeroomReplybox() {
      $('#singlemessage-input').css("height", "96px");
      this.replyroomBox = false;
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
    bookmarked(bookchat,status){

        axios.post('/bookmarkChat', {
              chatId: bookchat._id,
              bookmarkStatus: 1,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
           if(status == 'chat'){
                 this.userchat = this.friendchat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
               
                  this.userchat.bookmarked = 1;
              }else if(status == 'room'){
               this.usergrp = this.roomsChat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
               
                  this.usergrp.bookmarked = 1;
              }else{
                
               this.usergrp = this.groupchatdata.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                
                  this.usergrp.bookmarked = 1;
              
              }
          


          }, function(err) {
            console.log('err', err);
     
          })
    },

     removebookmarked(bookchat,status){
        axios.post('/bookmarkChat', {
              chatId: bookchat._id,
              bookmarkStatus: 0,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)

              if(status == 'chat'){
                 this.userchat = this.friendchat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.userchat.bookmarked = 0;
              }else if(status == 'room'){
               this.usergrp = this.roomsChat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.usergrp.bookmarked = 0;
              }else{
               this.usergrp = this.groupchatdata.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.usergrp.bookmarked = 0;
              }
            
          


          }, function(err) {
            console.log('err', err);
          })
    },
        },

        mounted() {
         // this.roomLeft = false;
          this.singleRoom=this.$route.query.roomId;
          console.log(this.singleRoom);
          this.hostname = this.$hostname;
          if(this.singleRoom){
           this.c_user = JSON.parse(localStorage.getItem('userData'));
           this.userImageName=this.c_user.user_image
            axios.get('/getSingleRoom/'+this.singleRoom+'/5d4c07fb030f5d0600bf5c03')
                  .then((responce) => { this.roomData = responce.data;
                    console.log(responce.data);
                    console.log(this.roomData.room_friends);
                 this.members=this.roomData.room_friends.length;
                   const post = this.roomData.room_friends.filter((obj) => {
                    return this.c_user._id === obj;
                  }).pop();
                     console.log(post);
                     if(this.roomData.createdBy == this.c_user._id){
                         this.userHave = true;
                     }else{
                       if(!post){
                             this.userHave = false;
                             window.close();
                          }else{
                             this.userHave = true;
                          }
                     }

                   

                  }).catch((error) => console.log(error));
                }
           var roomId = this.singleRoom;
           var userName= this.c_user.name;
      
   
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
    background-color: #2c3550!important;
    color: rgb(255 255 255)!important;
    border: none!important;
    transition: all .3s ease;
}
.btn-primary {
    background-color: #2c3550;
    border-color: #2c3550!important;
    color: #fff!important;
    transition: all .3s ease;
}
.participant.singleM.col-md-12 video {
        width: 100%!important;
        -o-object-fit: fill;
        object-fit: cover;
        height: calc(89vh - 73px);
}
.participant.singleM.col-md-12 .vidControls{
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
    width: 98%!important;
     height: calc(89vh - 73px);
}

.participant.tripple.col-md-12 video {
    width: 98%!important;
}

.participant.tripple.col-md-6 video {
    width: 48%!important;
}

.vidControls span{
    color:white;
    padding: 7px;    
}
#group-saveRecording-btn{
    display: none !important;
    font-size: small;
    color: #e42323;
    font-weight: 600;
    float: right;
    margin-top: 9px;
}
.replybox{
    width: 60%;
    height: auto;
    background: #e0dddd;
    margin-left: 72px;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    border-bottom: 2px solid rgba(156,151,151,.28);
}


</style>
