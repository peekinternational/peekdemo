<template>
  <div class="hello">
  <button class="btn btn-succcess" @click="openchat()"> Chat open</button>
        <div class="chat-content tabto" id="startchat" style="float:left;display:none">
          <div class=" messages custom-scroll active messageschat" id="chating">
            
            <!-------- Dropzone ------>
            <vue-dropzone ref="myVueDropzone" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions"> </vue-dropzone>
            <!-------- end -------->
            <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">

            </loading>
            <div class="contact-chat  ">
              <ul class="chatappend" v-for="chat in friendchat">
                <li class="replies" style="padding-bottom:20px" v-if="chat.senderId._id == c_user._id">
                  <div class="media">
                    <div class="profile mr-4">
                      <img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" /></div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{ c_user.name}}</h5>
                        <h6>{{isToday(chat.createdAt)}}</h6>

                        <ul class="msg-box">
                          <li class="msg-setting-main">
                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                <ul>
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="eidtchat(chat._id,chat.message)">
                                      <i class="fa fa-pencil"></i>{{ $t('Edit') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <li>
                                    <a href="#" @click="msgdelete(chat)">
                                      <i class="ti-trash"></i>{{ $t('Delete') }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <h5 v-if="chat.isDeleted == 1" :id="'sender'+chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.chatType == 0" :id="'sender'+chat._id">{{ chat.message }}</h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.chatType == 1" :id="'sender'+chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{chat.commentId.message}}’’</span><br> {{ chat.message }}</h5>
                            <br>
                            <a :href="'https://192.168.100.25:22000/images/chatImages/'+chat.message" :id="'sender'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="'https://192.168.100.25:22000/images/chatImages/'+chat.message">
                            </a>

                            <a :href="'https://192.168.100.25:22000/images/chatImages/'+chat.message" :id="'sender'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ chat.message }}</a>

                          </li>
                          <!-- <li class="msg-setting-main">
                                <h5> your personal assistant to help you &#128512; </h5>
                                <div class="badge badge-success sm ml-2"> R</div>
                                <div class="msg-dropdown-main">
                                  <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                  <div class="msg-dropdown"> 
                                    <ul>
                                      <li><a href="#"><i class="fa fa-share"></i>{{ $t('Forward') }}</a></li>
                                      <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                      <li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                                      <li><a href="#"><i class="ti-trash"></i>delete</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </li> -->
                        </ul>

                      </div>
                    </div>
                  </div>
                </li>
                <li class="sent" style="padding-bottom:20px" v-else>
                  <div class="media">
                    <div class="profile mr-4"><img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" /></div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5></h5>
                        <h6>{{isToday(chat.createdAt)}}</h6>
                        <ul class="msg-box">
                          <li class="msg-setting-main">

                            <h5 v-if="chat.isDeleted == 1" :id="'receiver'+chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.chatType == 0" :id="'receiver'+chat._id">{{ chat.message }} </h5>
                            <h5 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.chatType == 1" :id="'receiver'+chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{chat.commentId.message}}’’</span><br> {{ chat.message }}</h5>
                            <br>
                            <a :href="'https://192.168.100.25:22000/images/chatImages/'+chat.message" :id="'receiver'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="'https://192.168.100.25:22000/images/chatImages/'+chat.message">
                            </a>
                            <a :href="'https://192.168.100.25:22000/images/chatImages/'+chat.message" :id="'receiver'+chat._id" v-if="chat.messageType == 2 && chat.isDeleted != 1"><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ chat.message }}</a>
                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>
                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                <ul>
                                  <!--<li v-if="chat.messageType != 1 && chat.messageType != 2"><a href="#" @click="eidtchat(chat._id,chat.message)"><i class="fa fa-pencil" ></i>{{ $t('Edit') }}</a></li>-->
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <!--<li><a href="#" @click="msgdelete(chat._id)"><i class="ti-trash"></i>{{ $t('Delete') }}</a></li>-->
                                </ul>
                              </div>
                            </div>
                          </li>
                          <!--   <li class="msg-setting-main">
                                <h5> it should from elite auther &#128519;</h5>
                                <div class="badge badge-success sm ml-2"> R</div>
                                <div class="msg-dropdown-main">
                                  <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                  <div class="msg-dropdown"> 
                                    <ul>
                                      <li><a href="#"><i class="fa fa-share"></i>{{ $t('Forward') }}</a></li>
                                      <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                      <li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                                      <li><a href="#"><i class="ti-trash"></i>{{ $t('Delete') }}</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </li> -->
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
              <img class="" src="../assets/images/contact/2.jpg" alt="Avatar" v-if="isSeen == true && friendchat.length > 0" style="width: 20px;float:right" />
            </div>
           
          </div>
       <VEmojiPicker @select="selectchatEmoji"
          class=""
          v-bind:class="{activeChatemoji: ischatemojiActive}"  v-if="ischatemojiActive" />
          <div class="message-input">
            <div class="replybox" v-if="replyBox == true">
              <p style="padding: 7px; margin: 0;">‘‘{{chatreplydata.message}}’’
                <span style="float:right;cursor: pointer;" @click="closeReplybox()">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </span>
                <br>
                <span style="margin-left: 6px;">
                  {{isToday(chatreplydata.createdAt)}}
                </span>
              </p>
            </div>
            <div class="wrap emojis-main">
             
              <div class="dot-btn dot-primary mr-3">
                <a class="icon-btn btn-outline-primary button-effect " @click="showChatemoji">
                  <smile-icon size="1.5x" class="custom-class"></smile-icon>
                </a>
              </div>

              <label class="icon-btn btn-outline-primary mr-4" for="fileupload">
                <i class="fa fa-plus"></i>
              </label>
              <input type="file" id="fileupload" ref="myFiles" style="display:none"  @change="uploadfile($event)" multiple>

              <!--<div class="contact-poll-content">
                      <ul>
                        <li><a href="#"><i data-feather="image"></i>gallery</a></li>
                        <li><a href="#"><i data-feather="camera"></i>camera</a></li>
                        <li><a data-toggle="modal" data-target="#snippetModal"><i data-feather="code">                       </i>Code Snippest</a></li>
                        <li><a href="#"><i data-feather="user">                              </i>contact</a></li>
                        <li><a href="#"><i data-feather="map-pin">                       </i>location</a></li>
                        <li><a href="#"><i data-feather="clipboard"> </i>document</a></li>
                        <li><a data-toggle="modal" data-target="#pollModal"><i data-feather="bar-chart-2">                       </i>poll</a></li>
                        <li><a href="#"><i data-feather="paperclip">                       </i>attach</a></li>
                      </ul>
                    </div>-->

              <input class="setemoj" id="setemoj" ref="afterClick" type="text"  v-on:keyup="removecross()" @keyup.enter="chat()" v-model="message" placeholder="Write your message..." />
              <a class="icon-btn btn-outline-primary button-effect mr-3 ml-3" href="#">
                <mic-icon size="1.5x" class="custom-class"></mic-icon>
              </a>
              <button class="submit icon-btn btn-primary disabled" v-show="onChat" @click="chat()" id="send-msg" disabled="disabled">
                <send-icon size="1.5x" class="custom-class"></send-icon>
              </button>
              <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditclear" @click="clearchat()">
                <x-icon size="1.5x" class="custom-class"></x-icon>
              </button>
              
            </div>
          </div>
        </div>
      <iframe  class="ifram callifram" src="https://www.youtube.com/embed/tgbNymZ7vqY">
      </iframe>
        
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
import VEmojiPicker from 'v-emoji-picker';
// import ApiService from '../services/api.service.js';
import {Trash2Icon ,CheckIcon, AirplayIcon, AtSignIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneIncomingIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon } from 'vue-feather-icons';

export default {
  name: 'O2O',
  components: {Trash2Icon ,CheckIcon,VEmojiPicker, Loading, vueDropzone,PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon },
      props:[],
        data(){
            return{
            data: '',
              isConnected: false,
              socketMessage: '',
              friendsdata: [],
              userId: '',
              singlefriend: {},
              msgObj: {},
              message: '',
              friendchat: {},
              chatdata: {},
              typing: false,
              not_working: true,
              messagecopy: '',
              editChatid: '',
              onEditclear: false,
              onChat: true,
              dropzoneOptions: {
                url: 'https://192.168.100.25:22000/chatFilesShare',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                maxFiles: 10,
                maxFilesize: 420,
                chunking: true,
                headers: { "My-Awesome-Header": "header value" }
              },
              formDatas: {},
              replyBox: false,
              chatreplydata: {},
              userdec: {},
              isLoading: false,
              fullPage: true,
              isSeen: false,
              isActive:false,
              ischatemojiActive:false,
              userid:'',
              dragAndDropCapable: false,
              windowHeight:0,
              friendid:''
            }
    
        },
        beforeCreate: function() {
    if (!this.$session.exists()) {
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

    receivemsg(data) {
      //this.c_user._id == data.receiverId._id &&
     console.log(data);

     
      
      if (this.c_user._id == data.msgData.receiverId._id && this.friendid == data.msgData.senderId._id) {

        this.friendchat.push(data.msgData);
        // $('#f_typing'+data.msgData.receiverId._id).html(data.msgData.message);
        var container = this.$el.querySelector("#chating");
         $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
      
      
        
      }
     
    },

    receiveupdatechatmsg(updatedata) {
      const data = updatedata;
      const post = this.friendchat.filter((obj) => {
        return updatedata.chatid === obj._id;
      }).pop();
      post.message = data.message;

    },

    receiveid(data) {
    //if(this.singlefriend.chatWithRefId == this.c_user._id){
    this.$set(this.friendchat[this.friendchat.length - 1], '_id', data._id);
        // console.log(this.friendchat[this.friendchat.length - 1]);
   // }
      
    },

    lastchatobj_receive(data) {
      console.log(data);

      if (data.isSeen == 1) {
        this.isSeen = true;
      } else {
        this.isSeen = false;
      }
    },
    
    reciverdeletemsg(data) {
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },

    starttyping(data) {

     const post = this.friendsdata.filter((obj) => {
            return data.selectFrienddata._id === obj._id;
          }).pop();
          
            console.log(post);
                if (this.friendid== data.UserId && post._id == data.selectFrienddata._id) {
                    this.typing = true;
                    
                }else if(post._id == data.selectFrienddata._id){
                  const fdata = this.friendsdata.filter((obj) => {
                      return data.UserId === obj._id;
                    }).pop();
                 // console.log(fdata);
                  $('#f_typing'+data.UserId).html(`<span style='color: green;'>${ this.$t('istyping')}</span>`);
                  this.typing = false;
                  
                }
          

    },

    stoptyping(data) {
      console.log(data);
      this.typing = false;
     $('#f_typing'+data.UserId).html(data.selectFrienddata.latestMsg.message);
    },
    
 
  },
        watch:{
    
                },
        methods:{
          openchat(){
            $('#startchat').show();
            $('.ifram').removeClass('chatifram');
             $('.ifram').addClass('afterchatifram');
          },

    selectchatEmoji(emoji) {
     // console.log(emoji.data)
      //this.emoj.push(emoji.data);
      this.message += emoji.data;
      console.log(this.message);
      
        $('#send-msg').removeClass('disabled').attr("disabled", false);
      
    },

    
    showChatemoji(){
     
       this.ischatemojiActive = !this.ischatemojiActive;
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
      return moment(date).calendar();
    },


  getfriends() {
      axios.get('/getUsers/' + this.c_user._id + '/0/5d4c07fb030f5d0600bf5c03')
        .then(responce => {
          this.friendsdata = responce.data.usersList;
          setTimeout(() => {
               this.$socket.emit('login', this.c_user._id);
              }, 2000);
         
          console.log(this.friendsdata);
        })
        .catch((error) => console.log(error));
    },
           
   startchat(id) {
    this.isLoading = true;
            this.message = '';
            this.editChatid = '';
            this.onEditclear = false;
            this.onChat = true;
            this.chatreplydata = "";
            this.typing = false;
            var container = this.$el.querySelector("#chating");
            $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
           
            this.message = '';
            this.typing = false;
           
              this.friendchat ={};
            axios.get('/getChat/' + this.c_user._id + '/' + id + '/50')
              .then(responce => {
                
                this.friendchat = responce.data;
                console.log(this.friendchat);
                this.$socket.emit('lastchatobj_send', this.friendchat[this.friendchat.length - 1]);
                var container = this.$el.querySelector("#chating");
                $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast"); 
                if (this.friendchat[this.friendchat.length - 1].isSeen == 1) {
                  this.isSeen = true;
                } else {
                  this.isSeen = false;
                }

        })
        .catch((error) => console.log(error));
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
          var container = this.$el.querySelector("#chating");
          $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast"); 

    },
chat: function(e) {
      this.ischatemojiActive=false;
      if(this.message){
      if (this.editChatid) {

        this.msgObj = {

          message: this.message,
          chatid: this.editChatid

        };
        console.log(this.msgObj);

        this.$socket.emit('updatechatmsg', this.msgObj)
        
        axios.post('/updateChat/' + this.editChatid, {
          msgData: this.msgObj
        }).then(response => {

        }, function(err) {
          console.log('err', err);
          alert('error');
        })

        this.message = '';
        this.editChatid = '';
        $('#send-msg').addClass('disabled').attr("disabled", "disabled");
      }

      else if (this.chatreplydata) {

        this.msgObj = {

          commentId: { _id: this.chatreplydata._id, message: this.chatreplydata.message },
          messageType: 0,
          senderId: { _id: this.c_user._id },
          receiverId: { _id: this.friendid },
          senderName: this.c_user.name,
          message: this.message,
          createdAt: new Date().toISOString(),
          chatType: 1
        };
        // if (this.singlefriend.chatWithRefId == this.c_user._id) {
        //   // alert('dasdasdas');
        //   this.$set(this.msgObj, 'isSeen', 1);
        // }

        //console.log(this.msgObj);
        this.isSeen = false;
        this.friendchat.push(this.msgObj);
        this.$socket.emit('sendmsg', {
              selectFrienddata: this.friendid,
              userId: this.c_user._id,
              msgData:this.msgObj
            })
        $('#f_typing'+this.friendid).html(this.msgObj.message);
        $('.message-input').css("height", "96px");
          this.replyBox = false;
          this.chatreplydata = "";
        axios.post('/chat', {
          msgData: this.msgObj,
          selectedUserData: this.friendid
        }).then(response => {
          this.$socket.emit('sendid', response.data)
          
          this.userdec = this.friendsdata.filter((obj) => {
            return this.friendid === obj._id;
          }).pop();
          this.userdec.updatedByMsg = new Date().toISOString();


          setTimeout(() => {
            const id = $(".active.init").attr("id");

            if (id != 'friend' + this.friendid) {
              $('.init').removeClass("active");
              setTimeout(() => {

                $('#friend' + this.friendid).addClass("active");
                setTimeout(() => {

               //   $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
                }, 200);

              }, 1);


            }
          }, 0);


        }, function(err) {
          console.log('err', err);
          alert('error');
        })
        var container = this.$el.querySelector("#chating");
        $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
        this.message = '';
        $('#send-msg').addClass('disabled').attr("disabled", "disabled");
      }

      else {


        this.msgObj = {
          chatType: 0,
          isGroup: 0,
          messageType: 0,
          senderId: { _id: this.c_user._id },
          senderImage: '',
          receiverImage: '',
          receiverId: { _id: this.friendid },
          senderName: this.c_user.name,
          message: this.message,
          createdAt: new Date().toISOString(),
        };

        //  if (this.singlefriend.chatWithRefId == this.c_user._id) {
        //    this.$set(this.msgObj, 'isSeen', 1);
        //   this.isSeen = true;
        //   console.log('seenddddddddd');
        //     const post = this.friendsdata.filter((obj) => {
        //   return this.friendid === obj._id;
        // }).pop();
        // post.usCount = 0;
        // }
        // else {
        //   console.log('unseen');
        //   this.isSeen = false;
         
        // }
       
        //console.log(this.msgObj);
      //  this.isSeen = false;
        this.friendchat.push(this.msgObj);
        this.$socket.emit('sendmsg', {
              selectFrienddata: this.friendid,
              userId: this.c_user._id,
              msgData:this.msgObj
            })
             $('#f_typing'+this.friendid).html(this.msgObj.message);
      // this.$socket.emit('stopTyping', { selectFrienddata:this.singlefriend, UserId:this.c_user._id});
        axios.post('/chat', {
          msgData: this.msgObj,
          selectedUserData: this.friendid
        }).then(response => {
          this.$socket.emit('sendid', response.data)


          this.userdec = this.friendsdata.filter((obj) => {
            return this.friendid === obj._id;
          }).pop();
          this.userdec.updatedByMsg = new Date().toISOString();


          setTimeout(() => {
            const id = $(".active.init").attr("id");

            if (id != 'friend' + this.friendid) {
              $('.init').removeClass("active");
              setTimeout(() => {

                $('#friend' + this.friendid).addClass("active");
                setTimeout(() => {

                 // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
                }, 200);

              }, 1);


            }
          }, 0);




        }, function(err) {
          console.log('err', err);
          alert('error');
        })
        console.log(this.friendid);


       var container = this.$el.querySelector("#chating");
         $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
          
        this.message = '';
        $('#send-msg').addClass('disabled').attr("disabled", "disabled");

      }
      }
    },


    dragfileupload(file, xhr, formData) {
     // console.log(this.singlefriend);
      formData.append('senderId', this.c_user._id);
      formData.append('senderName', this.c_user.name);
      formData.append('friendId', this.friendid);
      formData.append('isGroup', 0);


    },

    afterComplete(file, response) {
      console.log(file);
      console.log(response.data);

      this.msgObj = {
        _id: response.data._id,
        chatType: 0,
        isSeen: 0,
        isGroup: 0,
        messageType: response.data.messageType,
        senderId: { _id: this.c_user._id },
        senderImage: '',
        receiverImage: '',
        receiverId: { _id: this.friendid },
        senderName: this.c_user.name,
        message: response.file[0].originalname,
        createdAt: new Date().toISOString(),
      };
      // if (this.singlefriend.chatWithRefId == this.c_user._id) {
      //   // alert('dasdasdas');
      //   this.$set(this.msgObj, 'isSeen', 1);
      // }

      console.log(this.msgObj);
      this.isSeen = false;
      this.friendchat.push(this.msgObj);
      var container = this.$el.querySelector("#chating");
       $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
      this.$socket.emit('sendmsg', {
              selectFrienddata: this.friendid,
              userId: this.c_user._id,
              msgData:this.msgObj
            })
      this.userdec = this.friendsdata.filter((obj) => {
        return this.friendid === obj._id;
      }).pop();

      this.userdec.updatedByMsg = new Date().toISOString();


      setTimeout(() => {
        const id = $(".active.init").attr("id");

        if (id != 'friend' + this.friendid) {
          $('.init').removeClass("active");
          setTimeout(() => {

            $('#friend' + this.friendid).addClass("active");
            setTimeout(() => {

             // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
            }, 200);

          }, 1);


        }
      }, 0);
      // this.$socket.emit('sendmsg', response.data )
      this.$refs.myVueDropzone.removeFile(file);
      $("#dropzone").css("display", "none");
      $("#groupdropzone").css("display", "none");
    },

    uploadfile(event) {
      console.log(event.target.value)
      let filesdata = this.$refs.myFiles.files[0];

      let formDatas = new FormData();
      formDatas.append('file', filesdata);
      formDatas.append('senderId', this.c_user._id);
      formDatas.append('senderName', this.c_user.name);
      formDatas.append('friendId', this.friendid);
      formDatas.append('isGroup', 0);
      console.log(formDatas);
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('/chatFilesShare', formDatas, config).then((response) => {
        console.log(response.data);
        this.msgObj = {
          _id: response.data.data._id,
          chatType: 0,
          isSeen: 0,
          isGroup: 0,
          messageType: response.data.data.messageType,
          senderId: { _id: this.c_user._id },
          senderImage: '',
          receiverImage: '',
          receiverId: { _id: this.friendid },
          senderName: this.c_user.name,
          message: response.data.file[0].originalname,
          createdAt: new Date().toISOString(),
        };
        // if (this.singlefriend.chatWithRefId == this.c_user._id) {
        //   // alert('dasdasdas');
        //   this.$set(this.msgObj, 'isSeen', 1);
        // }

        console.log(this.msgObj);
        this.isSeen = false;
        this.friendchat.push(this.msgObj);
        var container = this.$el.querySelector("#chating");
        $("#chating").animate({ scrollTop: container.scrollHeight + 7020}, "fast");
        this.$socket.emit('sendmsg', {
              selectFrienddata: this.friendid,
              userId: this.c_user._id,
              msgData:this.msgObj
            })
        this.userdec = this.friendsdata.filter((obj) => {
          return this.friendid === obj._id;
        }).pop();
        this.userdec.updatedByMsg = new Date().toISOString();


        setTimeout(() => {
          const id = $(".active.init").attr("id");

          if (id != 'friend' + this.friendid) {
            $('.init').removeClass("active");
            setTimeout(() => {

              $('#friend' + this.friendid).addClass("active");
              setTimeout(() => {

               // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
              }, 200);

            }, 1);


          }
        }, 0);
      }, function(err) {
        console.log('err', err);
        alert('error');
      })
    },


    eidtchat(id, message) {
      this.message = message;
      this.editChatid = id;

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
if(this.onEditclear == true){
   this.onEditclear = false;
      this.onChat = true;
      $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    }else{
      // this.$socket.emit('msgtyping', { selectFrienddata:this.singlefriend, UserId:this.c_user._id});
    }
     
    },

    msgdelete(data) {
      this.$socket.emit('senderdeletemsg', data._id);

      $('#sender' + data._id).html(""+ this.$t('messagedeleted'));
      console.log(data._id);
      axios.get('/deleteMsg/' + data._id + '/0')
        .then((responce) => console.log(responce))
        .catch((error) => console.log(error));

    },
    quote(chatdata) {
      this.chatreplydata = chatdata;
      $('.message-input').css("height", "140px");
      this.replyBox = true;
      this.$nextTick(function() {
        this.$refs.afterClick.focus();
      });
    },

    closeReplybox() {
      $('.message-input').css("height", "96px");
      this.replyBox = false;
    },
msg_setting(id) {
      $('#msg-setting' + id).siblings('#msg-dropdown' + id).toggle();
    },
        },
        mounted() {
         this.friendid =this.$route.query.data;
         console.log(this.friendid);
         this.c_user = this.$session.get('c_user');
         document.addEventListener('dragenter', function(e) {
          console.log(e.target);
          if(e.target.className == 'message-input' || e.target.className == 'wrap emojis-main' || e.target.className == 'setemoj' || e.target.className == ' messages custom-scroll active messageschat' || e.target.className == 'messages custom-scroll messageschat active'){
            $("#dropzone").css("display", "block");
          }
          else{
            $("#dropzone").css("display", "none");
          }
          
        });
         this.getfriends();
         this.startchat(this.friendid);
    

    $(window).on('keydown', function(e) {
      if (e.which == 13) {
        if (!e.target.value) {
          return false
        }

        return false;
      }
    });






        
    },
}
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    position: fixed;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    padding: 26px 45px;
    z-index: 9;
    bottom: 0;
}
.contact-chat  {
  height: 509px;
    overflow: scroll;
    overflow-x: hidden;
    width: 415px;
}
.contact-chat>ul.chatappend {
    display: flex;
    flex-direction: column;
    width: 95%;
}
.callifram{
  width:100%;
  height: 600px;
  float:right;
}
.afterchatifram{
  width:60%;
  height: 600px;
  float:right;
}

</style>
