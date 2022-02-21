<template>
  <div class="hello" >
    <div class="chitchat-loader">
      <div>
        <img src="../assets/images/logo/logo_big.png" alt="" />
        <h3>Simple, secure messaging for fast connect to world..!</h3>
      </div>
    </div>
    <div class="chitchat-container sidebar-toggle">

      <nav class="main-nav on custom-scroll" id="mainnav" style="background-color: white;">

        <div class="logo-warpper" style="border: 0;">
          <div class="navlogo">
            <a href=""><img src="../assets/images/logo/logo.png" alt="logo" style="border-radius: 0px;height:auto" /></a>
          </div>
          <div style="margin-top: 17px;padding-right: 10px;">
           <!-- <span><img class="" src="../assets/images/nav/bars.png" alt="Avatar" style="height: auto;border-radius: 0;" /></span> -->
            <span style="margin-left: 12px; margin-right: 12px;" v-if="current_User.onlineStatus == 1" class="profile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">
              <img class="bg-img"  v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;max-width: 42px;" />
             <div v-else  class="user2 profile" style="width: 44px;height: 44px;">
                <span> {{getFirstLetter(c_user.name)}} </span>
             </div>
            </span>
            <span class="userStatus" style="padding:8px"><img  src="../assets/images/nav/dots.png" alt="Avatar" style="height: auto;" /></span>
                 <ul class="status-cont-setting" style="box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;cursor: pointer;padding-left: 25px;position: absolute;z-index: 999999;cursor: pointer;bottom: 68%;">
                 	<!-- <span>Choose your status:</span> -->
              <li>

                  <p style="padding-right: 0px;" @click="changeStatus('0')"><span class="profile online statusClass">
                  </span> <span>{{ $t('Online') }}</span></p>

              </li>
              <li>
                
                  <p style="padding-right: 0px;text-align: left;" @click="changeStatus('3')"><span class="profile offline statusClass">
                  </span> <span>{{ $t('Offline') }}</span></p>

              </li>
               <li>

                  <p style="padding-right: 0px;" @click="changeStatus('1')"><span class="profile unreachable statusClass">
                  </span> <span>{{ $t('Away') }}</span></p>

              </li>
               <li>

                  <p style="padding-right: 0px;" @click="changeStatus('2')"><span class="profile busy statusClass">
                  </span> <span>{{ $t('Donotdisturb') }}</span></p>

              </li>
            <!--   <li>
                
                  <p style="padding-right: 0px;" @click="changeStatus('3')"><span class="profile offline statusClass">
                  </span> <span>Invisible</span></p>

              </li>
               -->
            </ul>
          </div>
        </div>
        <div class="sidebar-main" @click="wholepageclick()">
          <ul class="sidebar-top">
            <li @click="chatNav()" id="chatactive"  class="active" style="display: flex;">
              
                <span class="activefile1" style="vertical-align: text-bottom;" v-bind:class="{'dot-btn dot-danger grow' : presentersMsg }"><img class="" src="../assets/images/nav/chaticon.svg" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 18px;">{{ $t('Chat') }}</span>
            </li>
            <li  @click="getCallhistory()" data-to="calls-content">
                  <a class="nav-link button-effect" id="call-tab" data-toggle="tab" href="#call" role="tab" aria-controls="call" aria-selected="false"  style="display: flex;padding: 0;">
              
                <span class="activefile1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/call.svg" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 18px;">{{ $t('Call') }}</span>
            </a>
            </li>
            <li @click="meetingNav()">
              <span class="activecss1" v-bind:class="{'dot-btn dot-danger grow' : presentersMeeting }" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/meetings.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 16px;">{{ $t('Meetings') }}</span>
            </li>
            <li @click="roomNav()">
              <span class="activecss1" v-bind:class="{'dot-btn dot-danger grow' : presentersRoom }" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/rooms.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 20px;">{{ $t('Rooms') }}</span>
            </li>
       <!--      <li data-toggle="modal" data-target="#showPresenter" data-keyboard="false" data-backdrop="static">
              <span  style="vertical-align: text-bottom;" class="activecss1" v-bind:class="{'dot-btn dot-danger grow' : presentersData.length > 0 }"><img class="" src="../assets/images/nav/live.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activelive" style="padding-left: 17px;">Live</span>
            </li> -->
            <li @click="contact()">
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/contacts.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 16px;">{{ $t('Contacts') }}</span>
            </li>
         <!--    <li>
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/schedule.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss"  style="padding-left: 22px;">Schedule</span>
            </li> -->
           <!--  <li @click="todoNav()">
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/todo.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activetodo" style="padding-left: 20px;">Note</span>
            </li> -->
          <!--   <li>
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/projects.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 17px;">Projects</span>
            </li> -->
            <li @click="document()">
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/files.svg" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 17px;">{{ $t('Files') }}</span>
            </li>
            <li @click="status()" style="display: flex;">

                <span class="activefile1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/media.svg" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 19px;">{{ $t('media') }}</span>
            </li>

              <li @click="notification()"  style="display: flex;">

                <span class="activefile1" v-bind:class="{'dot-btn dot-danger grow' : presentersNoti == true }" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/notification.svg" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 19px;">{{ $t('Notification') }}</span>
            </li>
         <!--    <li class="records">
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/records.png" alt="Avatar" style="height: auto;" /></span>
              <span style="padding-left: 24px;">Records</span>
              <span  style="margin-left: 16px;" class="active_class badge badge-danger sm">2</span>
            </li>
            <li class="minutes" style="    margin-bottom: 66px !important;">
              <span class="activecss1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/minutes.png" alt="Avatar" style="height: auto;" /></span>
              <span class="activecss" style="padding-left: 22px;">Minutes</span>
            </li> -->

         <!--    <li>
                  <a class="icon-btn btn-light button-effect" href="javascript:void(0);" @click="favourite()" id="Fav">
                    <i class="fa fa-star"> </i>
                  </a>
                </li>
                
                <li>
                  <a class="icon-btn btn-light button-effect" href="javascript:void(0);" @click="contact()">
                    <i class="fa fa-users"> </i>
                  </a>
                </li> -->
             <!--    <li @click="notification()" class="d-block d-sm-none" style="display: flex;">

                <span class="activefile1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/files.png" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 19px;">Notification</span>
            </li>
               <li @click="setting()" class="d-block d-sm-none" style="display: flex;">

                <span class="activefile1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/files.png" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 19px;">Setting</span>
            </li>
               <li @click="logout()" class="d-block d-sm-none" style="display: flex;">

                <span class="activefile1" style="vertical-align: text-bottom;"><img class="" src="../assets/images/nav/files.png" alt="Avatar" style="height: auto;" /></span>
              
              <span class="activefile" style="padding-left: 19px;">Logout</span>
            </li> -->
          </ul>
          <ul class="sidebar-bottom" style="display: none">
            <li>
                  <a class="icon-btn btn-light button-effect mode" data-tippy-content="Theme Mode" >
                    <i class="fa fa-moon-o"></i>
                  </a>
                </li>
                <li>
                  <button v-on:click="logout()" class="icon-btn btn-light">
                    <i class="fa fa-power-off"> </i>
                  </button>
                </li>
          </ul>
        </div>
      </nav>

      <div class="logoutDiv d-none d-sm-block">
       <!--  <span @click="notification()" v-bind:class="{'dot-btn dot-danger grow' : notificationStatus == true }" style="padding-left: 3px;"><img class="" src="../assets/images/nav/notification.png" alt="Avatar" style="height: auto;" /></span> -->
        <span @click="setting()" style="padding-left: 0px;padding-right: 18px;"><img class="" src="../assets/images/nav/Gear-Icon.svg" alt="Avatar" style="height: auto;" /></span>
        <span v-on:click="logout()"><img class="" src="../assets/images/nav/Logout-Icon.svg" alt="Avatar" style="height: auto;" /></span>
      </div>
      <aside class="chitchat-left-sidebar left-disp" id="mainSidebar"  style="display:block">
        <div class="recent-default dynemic-sidebar active" id="recent" style="border-right: 2px solid #dcdcdc;">
          <div class="recent">
            <div class="theme-title">
              <div class="media">
                <!--<audio-recorder
      					upload-url="YOUR_API_URL"
      					:attempts="3"
      					:time="2"
      					:headers="headers"
      					:before-recording="callback"
      					:pause-recording="callback"
      					:after-recording="callback"
      					:select-record="callback"
      					:before-upload="callback"
      					:successful-upload="callback"
      					:failed-upload="callback"/>
      					
                <audio-player src="https://peekvideochat.com/incomming.mp3"/> -->

                <div v-if="c_user" style="display: contents;">
                  <audio id="messagetone" muted>
                    <source :src="hostname+'/bell.mp3'" type="audio/ogg">
                    <source :src="hostname+'/bell.mp3'" type="audio/mpeg">
                  </audio>

                  <audio id="outgoingcall" muted>
                    <source :src="hostname+'/incomming.mp3'" type="audio/ogg">
                    <source :src="hostname+'/incomming.mp3'" type="audio/mpeg">
                  </audio>
                  <audio id="incommingcall" muted>
                    <source :src="hostname+'/outgoing_ringtone.mp3'" type="audio/ogg">
                    <source :src="hostname+'/outgoing_ringtone.mp3'" type="audio/mpeg">
                  </audio>
                  <p style="display:none">{{checkcallTime}}</p>
                  <p style="display:none">{{checkGroupcallTime}}</p>

                  <div style="border: 1px #BAC5E9 solid;padding: 1px;border-radius: 26px;width: 62px !important;height: 62px !important;" v-if="c_user.onlineStatus == 1" class="profile">
                    
                    <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;width: 57px;min-height: 57px;max-height: 57px;" />
                    <div v-else  class="user profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                 
                    <label for="imageInput" style="position: absolute;right: 0; top: 37px;background: white; padding: 3px; border-radius: 12px;"><camera-icon size="1.5x"  class="custom-class"></camera-icon></label>
                    <input type="file" id="imageInput" ref="userImage" @change="userUploadfile($event)" style="display:none"/> 
                  </div>
                  <div style="padding-left: 12px; margin-top: 5px;width:100%">
                    <h5 style="font-size:16px;margin-bottom: 10px;"> {{c_user.name}} </h5>

                    <div v-if="c_user.pStatus == 0" class="badge badge-success">{{ $t('Online') }}</div>
                    <div v-else-if="c_user.pStatus == 1" class="badge badge-warning">{{ $t('Away') }}</div>
                    <div v-else-if="c_user.pStatus == 2" class="badge badge-danger">{{ $t('Busy') }}</div>
                    <div v-else-if="c_user.pStatus == 3" class="badge badge-light">{{ $t('Offline') }}</div>
                    <span style=""> {{c_user.userId}}</span>
                  </div>
                </div>
                <div class="media-body">
                  <a class="icon-btn btn-outline-light button-effect pull-right mobile-back">
                    <i class="ti-angle-right"></i>
                  </a>
                  <a class="icon-btn button-effect pull-right mainnav" style="margin-top: 19px;">
                    <settings-icon size="1.5x" class="custom-class"></settings-icon>
                  </a>
                </div>
              </div>
            </div>

            <!-- <carousel :nav="false" :dots="false">
                      <div style="padding: 13px;">
                    <div class="dot-btn dot-danger grow"></div>
                    <img src="https://placeimg.com/200/200/any?1">
                      </div>

                      <div style="padding: 13px;">
                      <div class="dot-btn dot-success grow"></div>
                    <img src="https://placeimg.com/200/200/any?2">
                  </div>

                  <div style="padding: 13px;">
                    <div class="dot-btn dot-danger grow"></div>
                    <img src="https://placeimg.com/200/200/any?3">
                  </div>
                  <div style="padding: 13px;">
                    <div class="dot-btn dot-danger grow"></div>
                    <img src="https://placeimg.com/200/200/any?4">
                  </div>
      			
                </carousel> -->
            <!-- <div class="recent-slider recent-chat owl-carousel owl-theme">
                      <div class="item">
                        <div class="recent-box">
                          <div class="dot-btn dot-danger grow"></div>
                          <div class="recent-profile"><img class="bg-img" src="../assets/images/avtar/1.jpg" alt="Avatar"/>
                            <h6> John deo</h6>
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="recent-box">
                          <div class="dot-btn dot-success grow"></div>
                          <div class="recent-profile online"><img class="bg-img" src="../assets/images/avtar/big/audiocall.jpg" alt="Avatar"/>
                            <h6> John </h6>
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="recent-box">
                          <div class="dot-btn dot-warning grow"></div>
                          <div class="recent-profile"><img class="bg-img" src="../assets/images/avtar/2.jpg" alt="Avatar"/>
                            <h6> Jpny</h6>
                          </div>
                        </div>
                      </div>
                    </div> -->
          </div>
          <div class="chat custom-scroll" style="margin-top: 55px;">
            <ul class="chat-cont-setting" style="padding: 7px;margin-left: 14px;margin-bottom:-15px;box-shadow: 0px 0px 0px 1px #0000000f;">
              <li>

                <a href="#" data-toggle="modal" data-target="#msgchatModal" data-keyboard="false" data-backdrop="static">
                  <div style="margin-right: 11px;">
                    <img class="" src="../assets/images/nav/newchat.png" alt="Avatar" style="height: auto;border-radius: 0;" />
                    <!-- </i> -->
                  </div>
                  <span style="padding-right: 10px;">{{ $t('NewChat') }}</span>

                </a>
              </li>
              <li>
                <a style="justify-content: flex-start; !important" href="#" data-toggle="modal" data-target="#msgcallModal" data-keyboard="false" data-backdrop="static">
                  <div style="margin-right: 11px;">
                    <img class="" src="../assets/images/nav/newcall.png" alt="Avatar" style="height: auto;border-radius: 0;" />
                  </div>
                  <span style="padding-right: 14px;">{{ $t('NewCall') }}</span>
                </a>
              </li>
              <li>
                <a style="justify-content: flex-start; !important" href="#" @click="creategroupPanle" data-toggle="modal" data-target="#exampleModalCenter" data-keyboard="false" data-backdrop="static">
                  <div style="margin-right: 11px;">
                    <img class="" src="../assets/images/nav/groupUsers.png" alt="Avatar" style="height: auto;border-radius: 0;" />
                  </div>
                  <span style="padding-right: 0px;">{{ $t('NewGroup') }}</span>

                </a>
              </li>
            </ul>
            <div class="theme-title">
              <div class="media">
                
                <div class="media-body text-right">
                
                  <a  class="icon-btn btn-primary btn-fix chat-cont-toggle outside" href="#" id="chattoggle">
                    <plus-icon size="1.5x" class="custom-class"></plus-icon>
                  </a>
                   <a class="icon-btn btn-primary btn-fix chat-cont-close outside" href="#" id="chattoggleclose" style="background: white;box-shadow: rgb(136, 136, 136) 1px 2px 8px 2px;color: rgb(111 102 255) !important;display:none">
                    <x-icon size="1.5x" class="custom-class"></x-icon>
                  </a>
                </div>
              </div>
            </div>
            <div class="theme-tab tab-sm chat-tabs" style="padding:0px;margin-top: 0px;">

              <div class="tab-content" id="myTabContent" style="">
                <div class="tab-pane fade show active" id="chat" role="tabpanel" aria-labelledby="chat-tab">
                <h5 style="padding-left: 21px; display: none">
                   <img class="" src="../assets/images/nav/Chat.svg" alt="Avatar" style="height: auto;border-radius: 0;padding-right: 10px;" />{{ $t('Chat') }}</h5>
              
                  <div class="theme-tab">
                    <ul class="nav nav-tabs nav-justified" id="myTab1" role="tablist" style="border: 1px solid rgb(234 238 248 / 67%);">
                      <li class="nav-item" style="margin: 0px 0px;">
                        <a class="nav-link button-effect active" @click="usertab()" id="direct-tab" data-toggle="tab" href="#direct" role="tab" aria-controls="direct" aria-selected="false" data-to="chating">{{ $t('direct') }}</a>
                      </li>
                      <span style="border-right: 1px #bac5e947 solid;border-width: 1px;padding: 15px 0;"></span>
                      <li class="nav-item" style="margin: 0px 0px;">
                        <a class="nav-link button-effect" @click="getgroups()" id="group-tab" data-toggle="tab" href="#group" role="tab" aria-controls="group" aria-selected="true" data-to="group_chat">{{ $t('group') }}</a>
                      </li>
                                         </ul>
                    <div class="tab-content" id="myTabContent1">
                      <div class="tab-pane fade show active" id="direct" role="tabpanel" aria-labelledby="direct-tab">
                        <div class="search2" id="mainsearch" style="padding: 0px;border-top: none;margin-bottom: 6px;">
                          <div>
                            <div class="input-group">

                              <input class="form-control" v-model="userSearch" type="text" :placeholder="$t('Search ...')" />
                              <div class="input-group-append">
                                <span class="input-group-text">
                                  <i class="fa fa-search"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="showCallMin" style="display:none">
                          <h5>{{ $t('Cancel') }}</h5>
                          <ul class="chat-main">
                            <li data-to="blank" class="inits active" style="">
                              <a href="#" data-toggle="modal" data-target="#o2ovideocall" data-keyboard="false" data-backdrop="static" class="" style="font-size: 16px;line-height: 2;">
                                {{ oncallFriend.name }} </a>
                              <span style="margin-left: 44px;">{{formattedElapsedTime}}</span>
                               <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#" @click="o2ostopKCall()"  style="float: right;width: 30px;height: 30px;margin-left: 12px;">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                              </a>
                              <a href="#" data-toggle="modal" data-target="#o2ovideocall" data-keyboard="false" data-backdrop="static" class="" style="background: black;padding: 7px;float: right; border-radius: 5px;margin-top: 3px;" >
                                <img class="" src="../assets/images/icons/minscreen.png" alt="Avatar" style="height: auto;border-radius: 0;" /></a>
                             
                            </li>
                          </ul>
                        </div>

                        <div v-if="showUsers">
                          <template v-if="orderedUsers.length != 0">
                          <ul v-for="friends in orderedUsers" v-if="friends._id != c_user._id" class="chat-main" :id="'showcallModel'+friends._id">
                            <template v-if="friends.friendReqStatus == 1" >
                            <li class="init"  :id="'friend'+friends._id" data-to="blank" style="cursor: pointer;">
                              <div class="chat-box">
                              	<div @click="startchat(friends)" >
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                                <div class="details" style="padding-left: 73px;">
                                  <h5>{{friends.name}}</h5>
                                  <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                  <h6 :id="'f_typing'+friends._id" v-else>Start Chat</h6>
                                </div>
                            </div>
                                <div class="date-status">
                                  <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                  <div v-if="friends.usCount != 0" class="badge badge-primary sm" style="float: left;margin-top: 10px;">{{friends.usCount}}</div>
                                  <div class="" style="float: right;"><a class="icon-btn btn-light bg-transparent button-effect outside userRead" href="#" data-tippy-content="Quick action">
			                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
			                      </a>
									 <ul class="read-cont-setting" style="box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;cursor: pointer;padding-left: 9x;position: absolute;z-index: 999999;cursor: pointer;width: 110px;">
									           
						              <li style="margin: 0;">

						                  <p v-if="friends.usCount != 0" style="padding-right: 0px;" @click="readmsg(friends)"><span>Mark as read</span></p>
						                  <p v-else style="padding-right: 0px;" @click="unreadmsg(friends)"><span>{{ $t("MarkUnread") }}</span></p>

						              </li>
						           
						          
						            </ul>
			                  </div>
                                 <!--  <h6 class="font-success status" v-else-if="friends.seenStatus == 1 "> Seen</h6> -->
                                </div>
                              </div>
                            </li>
                            <hr class="hrline">
                            </template>
                            <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                   <div v-if="friends.friendReqSenderId == friends._id">
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div v-else>
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                      </p>
                                    </div>
                                  </div>

                              </div>
                            </li>
                          </ul>
                          </template>
                          <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nochat.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have Chat') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                        </div>


                        <div v-if="userSearching">
                          <div v-if="filteredUserlist.length > 0">
                            <ul v-for="friends in filteredUserlist" v-if="friends._id != c_user._id" class="chat-main" :id="'showcallModel'+friends._id">

                              <li v-if="friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank" style="cursor: pointer;">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                    <h6 v-else>Start Chat</h6>
                                  </div>

                                  <div class="date-status">
                                    <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                    <div v-if="friends.usCount != 0" class="badge badge-primary sm">{{friends.usCount}}</div>
                                   <!--  <h6 class="font-success status" v-else> Seen</h6> -->
                                  </div>

                                </div>

                              </li>

                              <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>
                                  <div v-if="friends.friendReqSenderId == friends._id">
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div v-else>
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                </div>

                              </li>

                              <li v-else :id="'friend'+friends._id" data-to="blank" style="">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <button type="button" @click="addfriends(friends)" class="btn btn-sm btn-default" style="cursor:pointer">{{ $t('AddFriend') }}</button>
                                  </div>

                                </div>

                              </li>

                            </ul>
                          </div>
                          <div v-else>
                            <p style="text-align: center;">{{ $t('NoRecordFound') }}</p>
                          </div>

                        </div>

                      </div>
                      <div class="tab-pane fade" id="group" role="tabpanel" aria-labelledby="group-tab">
                        <div class="search2">
                          <div>
                            <div class="input-group">

                              <input class="form-control" type="text" v-model="groupSearch" :placeholder="$t('searchgroup')" />
                              <div class="input-group-append">
                                <span class="input-group-text">
                                  <i class="fa fa-search"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <content-loader v-if="groupLoader" :width="230" :height="160" :speed="2" primaryColor="#dad7d7" secondaryColor="#ecebeb">
                          <rect x="66" y="17" rx="3" ry="3" width="139" height="5" />
                          <rect x="65" y="35" rx="3" ry="3" width="130" height="5" />
                          <rect x="66" y="55" rx="3" ry="3" width="142" height="5" />
                          <circle cx="2" cy="2" r="2" />
                          <rect x="7" y="14" rx="8" ry="8" width="49" height="49" />
                          <rect x="15" y="39" rx="0" ry="0" width="0" height="1" />
                          <circle cx="341" cy="18" r="8" />
                          <circle cx="218" cy="30" r="7" />
                        </content-loader>

                        <div v-if="groupData">
                          <template v-if="orderedGroups.length != 0">
                          <ul class="group-main" v-for="(group,index) in orderedGroups">
                            <li class="group_chat" :id="'group_data'+group._id" data-to="group_chat" @click="startgroupchat(group,index)" style="cursor: pointer;">
                              <div class="group-box">
                                <div class="profile">
                                	<span>{{getFirstLetter(group.name)}}</span>
                                </div>
                                <div class="details" style="padding-left: 66px;padding-top: 0px;">
                                  <h5>{{ group.name }}</h5>
                                  <template v-if="group.latestMsg">
                                    
                                  <h6>{{group.latestMsg.message}}</h6>
                                  </template>
                                  <template v-else>Start Chat</template>
                                </div>
                                <div class="date-status">
                                  <ul class="grop-icon">
                                    <li>
                                      <a class="group-tp" href="#" data-tippy-content=""> ({{group.members.length }})</a>
                                    </li>

                                  </ul>

                                </div>
                              </div>
                            </li>
                            <hr class="hrline">

                          </ul>
                        </template>
                          <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nogroup.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have A Group') }}<br>
                                {{ $t('Please Create Group') }}</p>
                            
                          </div>

                        </div>

                        <div v-if="groupSearching">

                          <ul class="group-main" v-for="(group,index) in filteredGrouplist">
                           <li class="group_chat" :id="'group_data'+group._id" data-to="group_chat" @click="startgroupchat(group,index)" style="cursor: pointer;">
                              <div class="group-box">
                                <div class="profile">
                                  <span>{{getFirstLetter(group.name)}}</span>
                                </div>
                                <div class="details" style="padding-left: 66px;padding-top: 0px;">
                                  <h5>{{ group.name }}</h5>
                                  <template v-if="group.latestMsg">
                                    
                                  <h6>{{group.latestMsg.message}}</h6>
                                  </template>
                                  <template v-else>Start Chat</template>
                                </div>
                                <div class="date-status">
                                  <ul class="grop-icon">
                                    <li>
                                      <a class="group-tp" href="#" data-tippy-content=""> ({{group.members.length }})</a>
                                    </li>

                                  </ul>

                                </div>
                              </div>
                            </li>
                            <hr class="hrline">
                          </ul>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="call" role="tabpanel" aria-labelledby="call-tab">
                  <h5 style="padding-left: 21px;">
                   <img class="" src="../assets/images/nav/calls.png" alt="Avatar" style="height: auto;border-radius: 0;padding-right: 10px;" />{{ $t('Call') }}</h5>
                  <div class="theme-tab tab-icon">
                    <ul class="nav nav-tabs" id="contactTab" role="tablist" style="">
                      <li class="nav-item" @click="getCallhistory()" style="width: 25%;">
                        <a class="callnav-link nav-link active"  id="con1-tab" data-toggle="tab" href="#con1" role="tab" aria-controls="con1" aria-selected="true">{{ $t('All') }}</a>
                      </li>
                        <li class="nav-item" style="width:25%">
                        <a class="callnav-link nav-link" @click="dialallCallHistory()"  id="con2-tab" data-toggle="tab" href="#con2" role="tab" aria-controls="con2" aria-selected="false">
                          <phone-outgoing-icon size="1.5x" style="" class="custom-class"></phone-outgoing-icon>
                        </a>
                      </li>
                      <li class="nav-item" @click="missallCallHistory()" style="width: 25%;">
                        <a class="callnav-link nav-link" id="con3-tab" data-toggle="tab" href="#con3" role="tab" aria-controls="con3" aria-selected="false">
                          <phone-incoming-icon size="1.5x" style="color: red;" class="custom-class"></phone-incoming-icon>
                        </a>
                      </li>
                      <li class="nav-item" style="width:25%">
                        <a class="callnav-link nav-link" @click="receivellCallHistory()"  id="con4-tab" data-toggle="tab" href="#con4" role="tab" aria-controls="con4" aria-selected="false">
                          <phone-incoming-icon size="1.5x" style="color: #5BBDF4;" class="custom-class"></phone-incoming-icon>
                        </a>
                      </li>
                    
                    </ul>
                    <div class="tab-content" id="contactTabContent">
                      <div class="tab-pane fade show active" id="con1" role="tabpanel" aria-labelledby="con1-tab">
                        <template v-if="allCallData.length != 0" >
                        <ul class="call-log-main">
                          <li v-for="calldata in allCallData" :id="calldata._id" @click="openCallhistory(calldata)" class="callActive">
                            <div v-if="calldata.callerId._id == c_user._id" class="call-box">
                             <div v-if="calldata.receiverId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.receiverId.pStatus == 0, unreachable : calldata.receiverId.pStatus == 1, busy: calldata.receiverId.pStatus == 2, offline: calldata.receiverId.pStatus == 3, offline: calldata.receiverId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.receiverId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                               <!--  <div class="icon-btn btn-outline-success button-effect btn-sm">
                                  <phone-icon size="1.5x" v-if="calldata.callType == 1" class="custom-class"></phone-icon>
                                    <video-icon size="1.5x" v-else class="custom-class"></video-icon>
                                </div> -->
                              </div>
                            </div>
                             <div v-if="calldata.receiverId._id == c_user._id" class="call-box">
                              <div v-if="calldata.callerId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.callerId.pStatus == 0, unreachable : calldata.callerId.pStatus == 1, busy: calldata.callerId.pStatus == 2, offline: calldata.callerId.pStatus == 3, offline: calldata.callerId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.callerId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <!-- <div class="call-status">
                                <div class="icon-btn btn-outline-success button-effect btn-sm">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </div>
                              </div> -->
                            </div>
                          </li>
                        </ul>
                        </template>
                       <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                      </div>
                      <div class="tab-pane fade" id="con2" role="tabpanel" aria-labelledby="con2-tab">
                         <template v-if="dialCallData.length != 0" >
                        <ul class="call-log-main">
                        <template v-for="calldata in dialCallData"   v-if="calldata.callHistory.length != 0"  >
                        
                         <li @click="openCallhistory(calldata)"  class="callActive" :id="'d'+calldata._id">
                            <div v-if="calldata.callerId._id == c_user._id" class="call-box">
                             <div v-if="calldata.receiverId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.receiverId.pStatus == 0, unreachable : calldata.receiverId.pStatus == 1, busy: calldata.receiverId.pStatus == 2, offline: calldata.receiverId.pStatus == 3, offline: calldata.receiverId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.receiverId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{callTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                               <!--  <div class="icon-btn btn-outline-success button-effect btn-sm">
                                  <phone-icon size="1.5x" v-if="calldata.callType == 1" class="custom-class"></phone-icon>
                                    <video-icon size="1.5x" v-else class="custom-class"></video-icon>
                                </div> -->
                              </div>
                            </div>
                             <div v-if="calldata.receiverId._id == c_user._id" class="call-box">
                              <div v-if="calldata.callerId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.callerId.pStatus == 0, unreachable : calldata.callerId.pStatus == 1, busy: calldata.callerId.pStatus == 2, offline: calldata.callerId.pStatus == 3, offline: calldata.callerId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.callerId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{callTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                             <!--    <div class="icon-btn btn-outline-success button-effect btn-sm">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </div> -->
                              </div>
                            </div>
                          </li>

                        	</template>
                        	<template v-else>
                        		
                        	
                          <li >
                             <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                          </li>
                          </template>
                        </ul>
                        </template>
                         <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                      </div>
                      <div class="tab-pane fade" id="con3" role="tabpanel" aria-labelledby="con3-tab">
                      
                         <template v-if="missCallData.length != 0" >
                        <ul class="call-log-main">
                        <template  v-for="calldata in missCallData"  v-if="calldata.callHistory.length != 0 " >
                          <li  @click="openCallhistory(calldata)" class="callActive" :id="'m'+calldata._id">
                            <div v-if="calldata.callerId._id == c_user._id" class="call-box">
                             <div v-if="calldata.receiverId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.receiverId.pStatus == 0, unreachable : calldata.receiverId.pStatus == 1, busy: calldata.receiverId.pStatus == 2, offline: calldata.receiverId.pStatus == 3, offline: calldata.receiverId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.receiverId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i> {{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                               <!--  <div class="icon-btn btn-outline-success button-effect btn-sm">
                                  <phone-icon size="1.5x" v-if="calldata.callType == 1" class="custom-class"></phone-icon>
                                    <video-icon size="1.5x" v-else class="custom-class"></video-icon>
                                </div> -->
                              </div>
                            </div>
                             <div v-if="calldata.receiverId._id == c_user._id" class="call-box">
                              <div v-if="calldata.callerId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.callerId.pStatus == 0, unreachable : calldata.callerId.pStatus == 1, busy: calldata.callerId.pStatus == 2, offline: calldata.callerId.pStatus == 3, offline: calldata.callerId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.callerId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                             <!--    <div class="icon-btn btn-outline-success button-effect btn-sm">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </div> -->
                              </div>
                            </div>
                          </li>
                          </template>
                          <template v-else>
                            <li v-else>
                             <div style="padding: 73px;text-align: center;" >
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                          </li>
                           </template>
                        </ul>
                        </template>
                         <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                      </div>
                     <div class="tab-pane fade" id="con4" role="tabpanel" aria-labelledby="con2-tab">
                         <template v-if="receiveCallData.length != 0" >
                        <ul class="call-log-main">
                      <template v-for="calldata in receiveCallData" v-if="calldata.callHistory.length != 0" >
                         <li  @click="openCallhistory(calldata)" class="callActive" :id="'r'+calldata._id">
                            <div v-if="calldata.callerId._id == c_user._id" class="call-box">
                             <div v-if="calldata.receiverId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.receiverId.pStatus == 0, unreachable : calldata.receiverId.pStatus == 1, busy: calldata.receiverId.pStatus == 2, offline: calldata.receiverId.pStatus == 3, offline: calldata.receiverId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.receiverId.user_image" :src="hostname+'images/chatImages/'+calldata.receiverId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.receiverId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.receiverId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                               <!--  <div class="icon-btn btn-outline-success button-effect btn-sm">
                                  <phone-icon size="1.5x" v-if="calldata.callType == 1" class="custom-class"></phone-icon>
                                    <video-icon size="1.5x" v-else class="custom-class"></video-icon>
                                </div> -->
                              </div>
                            </div>
                             <div v-if="calldata.receiverId._id == c_user._id" class="call-box">
                              <div v-if="calldata.callerId.onlineStatus == 1" class="profile" v-bind:class="{ online: calldata.callerId.pStatus == 0, unreachable : calldata.callerId.pStatus == 1, busy: calldata.callerId.pStatus == 2, offline: calldata.callerId.pStatus == 3, offline: calldata.callerId.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                               </div>
                             </div>
                               <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="calldata.callerId.user_image" :src="hostname+'images/chatImages/'+calldata.callerId.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(calldata.callerId.name)}}</span>
                              </div>
                                  </div>
                              <div class="details">
                                <h5>{{calldata.callerId.name}}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(calldata.createdAt)}} {{chatTime(calldata.createdAt)}}</h6>
                              </div>
                              <div class="call-status">
                             <!--    <div class="icon-btn btn-outline-success button-effect btn-sm">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </div> -->
                              </div>
                            </div>
                          </li>
                      </template>
                      <template v-else>
                      	
                           <li >
                             <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                          </li>
                      </template>
                        </ul>
                        </template>
                         <div style="padding: 73px;text-align: center;" v-else>
                            <p> <img  src="../assets/images/icons/nocall.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveCalls') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  <ul class="contact-log-main">
                    <li>
                      <div class="contact-box">
                        <div class="profile offline"><img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" /></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+21 3523 25544 </h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect">
                             <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                          </div>
                          <div class="icon-btn btn-outline-success btn-sm button-effect">
                               <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="active">
                      <div class="contact-box">
                        <div class="profile online"><img class="bg-img" src="../assets/images/contact/1.jpg" alt="Avatar" /></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+54 541447 255 </h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect">
                             <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                          </div>
                          <div class="icon-btn btn-outline-success btn-sm button-effect">
                               <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile busy"><img class="bg-img" src="../assets/images/contact/3.jpg" alt="Avatar" /></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+58 2564 02554</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect">
                             <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                          </div>
                          <div class="icon-btn btn-outline-success btn-sm button-effect">
                               <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile unreachable"><img class="bg-img" src="../assets/images/contact/4.jpg" alt="Avatar" /></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+44 55124 2524</h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect">
                             <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                          </div>
                          <div class="icon-btn btn-outline-success btn-sm button-effect">
                               <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="contact-box">
                        <div class="profile online"><img class="bg-img" src="../assets/images/contact/4.jpg" alt="Avatar" /></div>
                        <div class="details">
                          <h5>Jony Lynetin</h5>
                          <h6>+54 541447 255 </h6>
                        </div>
                        <div class="contact-action">
                          <div class="icon-btn btn-outline-primary btn-sm button-effect">
                             <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                          </div>
                          <div class="icon-btn btn-outline-success btn-sm button-effect">
                               <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fevorite-tab dynemic-sidebar" id="favourite">
           <div class="todo-main">
                <div class="theme-title">
                  <div class="media">
                    <div>
                      <h2>Todo</h2>
                      <h4>{{ $t('createyourtask') }}</h4>
                    </div>
                    <div class="media-body media-body text-right">
                      <a class="icon-btn btn-sm btn-outline-light close-panel" href="javascript:void(0);">
                        <x-icon size="1.5x" class="custom-class"></x-icon>
                      </a>
                    </div>
                  </div>
                </div>
              
                <div class="todo-tab theme-tab custom-scroll">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a class="buttoneffect active show" data-toggle="pill" href="#todo1" @click="getTodo">{{ $t('All') }}</a>
                    </li>
                    <li class="nav-item">
                      <a class="buttoneffect button-effect" data-toggle="pill" href="#todo2" @click="getMytodo">My to-dos</a>
                    </li>
                    <li>
                      <a class="icon-btn btn-light button-effect btn-sm" data-toggle="modal" data-target="#createtodoModal" data-keyboard="false" data-backdrop="static">
                        <plus-icon size="1.5x" class="custom-class"></plus-icon>
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active show" id="todo1">
                     <div v-if="TodoList.length > 0">
                             <div class="tab-card text-left">
                        <div class="todo-task" >
                         <template v-for="todoData in TodoList">
                          <div class="todo-main-content" >
                            <div class="input-text" style="margin-bottom: 12px;font-weight: 700;">
                              {{todoData.todo}}
                            </div>
                             <div style="float:left">
                            <p >Assign by</p>
                             <p >  Assign Date</p>
                               <p >  Due Date </p>
                             </div>
                               <div style="float:right">  
                            <p style="color: #223645;">{{todoData.assignTo}}</p>
                           <p style="color: #223645;"> {{isToday(todoData.createdAt)}}</p> 
                            <p style="color: #223645;">{{isToday(todoData.assignDate)}}</p>
                          </div>
                          </div>
                         
                          <div class="todo-list" style="padding-bottom: 28px;border-bottom: 1px solid #eff1f2; margin-bottom: 36px;">
                            <div class="element" id="div_1">
                              <p class="add add-to-do" style="float:left">Status</p>
                             
                              <span class="add add-to-do" style="float:right">
                                  <select class="custom-scroll" name=""   @change="todoStatusUpdate($event)">
                                <option :selected="todoData.status == 0 ?true : false" :value="'0,'+todoData._id+','+todoData.userId" >{{ $t('Assigned') }}</option>
                                <option :selected="todoData.status == 1 ?true : false" :value="'1,'+todoData._id+','+todoData.userId" >{{ $t('InProgress') }}</option>
                                <option :selected="todoData.status == 2 ?true : false" :value="'2,'+todoData._id+','+todoData.userId" >{{ $t('Complete') }}</option>
                              </select>
                              </span>
                            </div>
                          </div>
                          </template>
                        </div>
                          </div>

                      </div>
                       <div v-else> No task in list</div>
                    </div>
                    <div class="tab-pane fade" id="todo2">
                      <div v-if="myTodoList.length > 0">
                             <div class="tab-card text-left">
                        <div class="todo-task" >
                         <template v-for="mytodo in myTodoList">
                          <div class="todo-main-content" >
                            <div class="input-text" style="margin-bottom: 12px;font-weight: 700;">
                              {{mytodo.todo}}
                            </div>
                             <div style="float:left">
                            <p >{{ $t('AssignTO') }}</p>
                             <p >  Assign Date</p>
                               <p >  Due Date </p>
                             </div>
                               <div style="float:right">  
                            <p style="color: #223645;">{{mytodo.assignTo}}</p>
                           <p style="color: #223645;"> {{isToday(mytodo.createdAt)}}</p> 
                            <p style="color: #223645;">{{isToday(mytodo.assignDate)}}</p>
                          </div>
                          </div>
                          <div class="todo-list" style="padding-bottom: 28px;border-bottom: 1px solid #eff1f2; margin-bottom: 36px;">
                            <div class="element" id="div_1">
                              <p class="add add-to-do" style="float:left">{{ $t('Status') }}</p>
                              <p class="add add-to-do" style="float:right"><span class="badge badge-dark" v-if="mytodo.status == 0">{{ $t('Assigned') }}</span> <span class="badge badge-primary" v-else-if="mytodo.status == 1">{{ $t('InProgress') }}</span>
                                <span class="badge badge-success" v-else>Complete</span></p>
                            </div>
                          </div>
                          </template>
                        </div>
                          </div>
                      </div>
                      <div v-else class="converstaion-docs tab-card">
                        <i class="fa fa-sticky-note-o"></i>
                        <h5 class="mb-3">No Open To-Dos Here </h5>
                        <a class="btn btn-primary btn-sm" data-toggle="modal" data-target="#createtodoModal">Create A To-Do</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div class="document-tab dynemic-sidebar" id="document">
          <div class="theme-title">
            <div class="media">
              <div>
                <h2>{{ $t("Documents") }}</h2>
                <!-- <h4>List of document</h4> -->
              </div>
              <div class="media-body text-right">
                <a class="icon-btn btn-outline-light btn-sm m-r-15 search" href="#">
                  <search-icon size="1.5x" class="custom-class"></search-icon>
                </a>
                <form class="form-inline search-form">
                  <div class="form-group">
                    <input class="form-control-plaintext" type="search" :placeholder="$t('Search ...')" v-model="docSearch" />
                    <div class="icon-close close-search"> </div>
                  </div>
                </form>
              <!--   <a class="icon-btn btn-outline-light btn-sm close-panel">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </a> -->
              </div>
            </div>
          </div>
          <ul class="chat-main" v-if="allDocument.length > 0 && docData">
            <li v-for="document in allDocument">
              <div class="chat-box">
                <div class="media">
                  <div class="">
                    <a class="icon-btn btn-outline-danger btn-xl pull-right rouded15" href="#">
                      <i class="fa fa-file-code-o"></i>
                    </a>
                  </div>
                  <div class="details" style="padding-left: 20px;">
                    <h5>{{document.message}}</h5>
                    <h6>{{docToday(document.createdAt)}}</h6>
                  </div>
                  <div class="media-body">
                    <a class="icon-btn btn-outline-light btn-sm pull-right" :href="hostname+'images/chatImages/'+document.message" target="_blank">
                      <download-icon size="1.5x" class="custom-class"></download-icon>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            
          </ul>

      <ul class="chat-main" v-else-if="searchDocument.length > 0 && docSearching">
            <li v-for="document in searchDocument">
              <div class="chat-box">
                <div class="media">
                  <div class="">
                    <a class="icon-btn btn-outline-danger btn-xl pull-right rouded15" href="#">
                      <i class="fa fa-file-code-o"></i>
                    </a>
                  </div>
                  <div class="details" style="padding-left: 20px;">
                    <h5>{{document.message}}</h5>
                    <h6>{{docToday(document.createdAt)}}</h6>
                  </div>
                  <div class="media-body">
                    <a class="icon-btn btn-outline-light btn-sm pull-right" :href="hostname+'images/chatImages/'+document.message" target="_blank">
                      <download-icon size="1.5x" class="custom-class"></download-icon>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            
          </ul>
          <ul style="padding: 100px 0 9px 60px;" v-else>
            <li>{{ $t('NoFiles') }}</li>
            
          </ul>
        
        </div>
        <div class="contact-list-tab dynemic-sidebar custom-scroll" id="contact-list">
          <div class="theme-title">
            <div class="media">
              <div>
                <h2>{{ $t('Contact') }}</h2>
                <!-- <h4>Start talking now</h4> -->
              </div>
              <div class="media-body text-right">
                <a class="icon-btn btn-outline-light btn-sm m-r-15 search" href="#">
                  <search-icon size="1.5x" class="custom-class"></search-icon>
                </a>
                <form class="form-inline search-form">
                  <div class="form-group">
                    <input class="form-control" v-model="searchFriend" type="text" :placeholder="$t('Search ...')" />
                    <div class="icon-close close-search"> </div>
                  </div>
                </form>
               <!--  <a class="icon-btn btn-outline-light btn-sm close-panel">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </a> -->
              </div>
            </div>
          </div>
           <ul class="chat-main custom-scroll" v-if="showUsersContact">
             <template v-if="orderedUsers.length != 0">
            <li v-for="friends in orderedUsers"  v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank" style="cursor: pointer;">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                                <div class="details" style="padding-left: 73px;">
                                  <h5>{{friends.name}}</h5>
                                  <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                  <h6 :id="'f_typing'+friends._id" v-else>Start Chat</h6>
                                </div>

                                <div class="date-status">
                                  <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                  <div v-if="friends.usCount != 0" class="badge badge-primary sm">{{friends.usCount}}</div>
                                  <!-- <h6 class="font-success status" v-else-if="friends.seenStatus == 1 "> Seen</h6> -->
                                </div>
                              </div>
                            </li>
                            <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-if="friends.friendReqSenderId == friends._id">
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                    </p>
                                  </div>
                                </div>

                                <div v-else>
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </li>
                             </template>
                          <li v-else>
                            <div style="padding: 20px;text-align: center;margin-top: 100px;" >
                            <p> <img  src="../assets/images/icons/nocontacts.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have Contact') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                        </li>
                      </ul>

                     <div v-if="showSearchfriends">
                            <ul class="chat-main custom-scroll" v-if="searchUsers.length > 0" >

                             <li v-for="friends in searchUsers" v-if="friends._id != current_User._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank" style="cursor: pointer;">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                    <h6 v-else>Start Chat</h6>
                                  </div>

                                  <div class="date-status">
                                    <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                    <div v-if="friends.usCount != 0" class="badge badge-primary sm">{{friends.usCount}}</div>
                                    <!-- <h6 class="font-success status" v-else> Seen</h6> -->
                                  </div>

                                </div>

                              </li>

                              <li v-else-if="friends._id != current_User._id && friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                            </div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>
                                  <div v-if="friends.friendReqSenderId == friends._id">
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div v-else>
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                </div>

                              </li>

                              <li v-else :id="'friend'+friends._id" data-to="blank" style="">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <button type="button" @click="addfriends(friends)" class="btn btn-sm btn-default" style="cursor:pointer">{{ $t('AddFriend') }}</button>
                                  </div>

                                </div>

                              </li>

                            </ul>
                          <ul v-else>
                           <li> <p style="text-align: center;">{{ $t('NoRecordFound') }}</p></li>
                          </ul>

                        </div>

        </div>
        <div class="notification-tab dynemic-sidebar custom-scroll" id="notification">
          <div class="theme-title">
            <div class="media">
              <div>
                <h2>{{ $t('Notification') }}</h2>
                <!-- <h4>List of notification</h4> -->
              </div>
            <!--   <div class="media-body text-right">
                <a class="icon-btn btn-outline-light btn-sm close-panel">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </a>
              </div> -->
            </div>
          </div>
          <ul class="chat-main" v-if="notificationsList.length > 0">
            <li style="padding: 0 0px;" v-for="(notification,index) in notificationsList">
              <div class="chat-box notification">
                  <div class="profile userprofile" style="margin-top:10px">
                       <span style="z-index: 0;padding-top: 13px;
    padding-bottom: 13px;" > {{getFirstLetter(notification.body)}}</span>
                    </div> 
                <div class="details">
                  <h5>{{ $t(`${notification.title}`) }}</h5>
                  <p>{{notification.body}}</p> <span @click="removeNotification(notification,index)" style="position: absolute;right: 0;cursor: pointer;top: 56px;">X</span>
                </div>
                <div class="date-status">
                  <h6>{{callTime(notification.createdAt)}}</h6>
                </div>
              </div>
            </li>
            
          </ul>
          <ul style="padding: 100px 0 9px 60px;" v-else>
            <li>{{ $t('NoNotification') }}</li>
          </ul>
        </div>
        <div class="settings-tab dynemic-sidebar custom-scroll" id="settings">
          <div class="row">
            <div class="col-md-11">
              <div class="media pb-2">
                <div class="d-flex">
                  <img class="float-left mr-2" src="../assets/images/nav/setting.png" alt="Avatar" style="height: auto;" />
                  <h2 class="pt-2 setting-title">{{ $t('Setting') }}</h2>
                  <!-- <h4>{{ $t('Changesetting') }}</h4> -->
                </div>
                <!-- <div class="media-body text-right">
                  <a class="icon-btn btn-outline-light btn-sm close-panel">
                    <x-icon size="1.5x" class="custom-class"></x-icon>
                  </a>
                </div> -->
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3" style="background-color:#FCFCFC">
              <div class="theme-title">
                <!-- <div class="media">
                  <div>
                    <h2>Settings</h2>
                    <h4>{{ $t('Changesetting') }}</h4>
                  </div>
                  <div class="media-body text-right">
                    <a class="icon-btn btn-outline-light btn-sm close-panel">
                      <x-icon size="1.5x" class="custom-class"></x-icon>
                    </a>
                  </div>
                </div> -->
                <div class="profile-box">
                   <div class="filter-block" style="padding-bottom: 15px;border-bottom: 1px solid #dcdcdc;">
                  <div class="collapse-block">
                    <h2 class="block-title Setting pb-2">
                       {{ $t('ProfileSetting') }}
                    </h2>
                    <p style="display: none"><small class="text-muted">{{ $t('Updateyourprofile') }}</small></p>
                    <div class="block-content" style="display:none">
                      <div class="nav flex-column nav-pills document-list profile-setting-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link panel-title" data-toggle="collapse" data-target="#EditBasicProfile">{{ $t('EditBasicProfile') }}</a>

						<div id="EditBasicProfile" class="collapse">
						<div class="row">
							<div class="col-md-12" style="text-align:center">
						    <div class="seetingUserpro">
						            <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="" />
						            <div v-else  class="user profile" style="width: 56px;height: 56px;">
						               <span> {{getFirstLetter(current_User.name)}}</span>
						            </div>
						         
						            <label for="imageProfileMain" style="position: absolute;right: 0; top: 37px;"><camera-icon size="1.5x"  class="custom-class"></camera-icon></label>
						            <input type="file" id="imageProfileMain" ref="imageProfileMain" @change="userProfileUploadfile($event)" style="display:none"/> 
						        </div>
						       
						    </div>

						     <div class="col-md-12" style="margin-top: 40px;">
				                  <span>{{ $t('Name') }}:</span>
				                 <input class="form-control" ref="Username" type="text" v-model="username" />
				                <div class="text-center pt-3">
				                   <button class="btn btn-primary" @click="profileUpdate()">{{ $t('update') }}</button>
				                 </div>
				                 </div>

							</div>

							</div>

                        <a class="nav-link panel-title" data-toggle="collapse" data-target="#ChangeMobileNumber">{{ $t('ChangeMobileNumber') }}</a>

                        <div id="ChangeMobileNumber" class="collapse">
          							   <div class="row">
          								<div class="col-md-12" style="">
          									<div class="form-group">
          									<span>{{ $t('ExistingMobileNumber') }}</span>
          					                 <input class="form-control" ref="Exmobile" type="text" v-model="exmobile" />
          									</div>
          									<div class="form-group">
          									<span>{{ $t('NewMobileNumber') }}:</span>
          					                 <input class="form-control" ref="Newmobile" type="text" v-model="Newmobile" />
                                     <p id="cmobile" style="position: absolute;right:0px;    padding-top: 13px;padding-right: 60px;"></p>
          									</div>
          									<div class="form-group">
          									<span>{{ $t('RepeatNewMobileNumber') }}:</span>
          					                 <input class="form-control" ref="confirmMobile" type="text" v-model="confirmMobile" />
          									</div>
          									 <div class="text-center pt-3">
          				                   <button class="btn btn-primary" onpaste="return false;" id="Mbsubmitbtn" @click="mobileUpdate()" disabled>{{ $t('update') }}</button>
          				                 </div>
          								</div>
          							</div>
          						</div>
                        <a class="nav-link panel-title" data-toggle="collapse" data-target="#ChangeEmail">{{ $t('ChangeEmail') }}</a>
                        <div id="ChangeEmail" class="collapse">
      							   <div class="row">
      								<div class="col-md-12" style="">
      									<div class="form-group">
      									<span>{{ $t('ExistingEmailAddress') }}</span>
      					                 <input class="form-control" ref="Useremail" type="text" v-model="exemail" />
      									</div>
      									<div class="form-group">
      									<span>{{ $t('NewEmailAddress') }}</span>
      					                 <input class="form-control" ref="Newemail" type="text" v-model="Newemail" />
      									</div>
      									
      									 <div class="text-center pt-3">
      				                   <button class="btn btn-primary" @click="emailUpdate()">{{ $t('update') }}</button>
      				                 </div>
      								</div>
      							</div>
      						</div>

                        <a class="nav-link panel-title" data-toggle="collapse" data-target="#IDSetting">{{ $t('IDSetting') }}</a>
                             <div id="IDSetting" class="collapse">
            							   <div class="row">
            								<div class="col-md-12" style="">
            									<div class="form-group">
            									<span>{{ $t('UserId') }}</span>
            					                 <input class="form-control" ref="UserId" type="text" v-model="UserId" />
            									</div>
            									
            									 <div class="text-center pt-3">
            				                   <button class="btn btn-primary" @click="UserIdUpdate()">{{ $t('update') }}</button>
            				                 </div>
            								</div>
            							</div>
            						</div>
                        <a class="nav-link panel-title"  data-toggle="collapse" data-target="#ChangePassword">{{ $t('ChangePassword') }}</a>
                             <div id="ChangePassword" class="collapse">
          							   <div class="row">
          								<div class="col-md-12" style="">
          									<div class="form-group">
          									<span>{{ $t('ExistingPassword') }}</span>
          					                 <input class="form-control" ref="Expassword" type="text" v-model="expassword" />
          									</div>
          									<div class="form-group">
          									<span>{{ $t('NewPassword') }}</span>
          					                 <input class="form-control" ref="Newpassword" type="text" v-model="Newpassword" />
          									</div>
          									<div class="form-group">
          									<span>{{ $t('RepeatNewPassword') }}</span>
                             <p id="cpass" style="position: absolute;right:0px;padding-top: 7px;padding-right: 60px;"></p>
          		                 <input class="form-control" ref="confirmpassword" type="text" v-model="confirmpassword" />
                              
          									</div>
          									 <div class="text-center pt-3">
    				                   <button class="btn btn-primary" id="passsubmitbtn" @click="paswordUpdate()" disabled>{{ $t('update') }}</button>
    				                 </div>
          								</div>
          							</div>
          						</div>
                      </div>
                      <!-- <ul class="document-list profile-setting-list">
                        <li>
                          <a href="">{{ $t('EditBasicProfile') }}</a>
                        </li>
                         <li>
                          <a href="">{{ $t('ChangeMobileNumber') }}</a>
                        </li>
                        <li>
                          <a href="">{{ $t('ChangeEmail') }}</a>
                        </li>
                        <li>
                          <a href="">{{ $t('IDSetting') }}</a>
                        </li>
                        <li>
                          <a href="">{{ $t('ChangePassword') }}</a>
                        </li>
                      </ul> -->
                    </div>
                  </div>
                </div>
                   <div class="filter-block" style="padding-bottom: 17px;padding-top: 17px;border-bottom: 1px solid rgb(220, 220, 220);">
                  <div class="collapse-block">
                    <h2 class="block-title Setting">
                     {{ $t('UserSetting') }}
                    </h2>
                   <p style="display: none">{{ $t('Otheruserrelatedsetting') }}</p>
                    <div class="block-content" style="display:none">

                     <div class="nav flex-column nav-pills document-list profile-setting-list">
                        <a class="nav-link panel-title" @click="showblockUsers()" data-toggle="collapse" data-target="#BlockUsers">{{ $t('BlockUsers') }}</a>
                          <div id="BlockUsers" class="collapse">
                       <div class="row">
                      <div class="col-md-12" style="">
                        <template v-if="blockUsers.length != 0">
                          <ul v-for="friends,index in blockUsers" class="chat-main">
                            <li class="init" data-to="blank" style="cursor: pointer;">
                              <div class="chat-box">
                                <div style="display: inline-flex" >
                                <div style="border: 1px solid;border-radius: 23px; padding: 2px;">
                                  <img class="bg-img" style="min-height: 53px;max-width: 51px;border-radius: 19px; max-height: 53px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="" style="border-radius: 33px;padding: 23px; background: #8e88fdbd;" >
                                   <span style="color: white;text-transform: capitalize;"> {{getFirstLetter(friends.name)}}</span>
                                </div>
                              </div>
                               

                                <div class="details" style="display:block;padding-left: 10px;">
                                  <h5 style="margin-left: 0px;">{{friends.name}}</h5>
                                  
                                  <h6>{{friends.email}}</h6>
                                </div>
                            </div>
                                <div class="date-status">
                                 
                                 <button class="btn btn-sm btn-success showAddmeeting" @click="blockUser(friends._id,0,index)">Unblock</button>
                                </div>
                              </div>
                            </li>
                            <!-- <hr class="hrline"> -->
                            
                           
                          </ul>
                          </template>
                          <template v-else>
                            <p style="text-align:center">{{ $t('NoUsers') }}</p>
                          </template>
                      </div>
                    </div>
                  </div>

                        <!-- <a class="nav-link" data-toggle="collapse" data-target="#MutedUsers">Muted Users</a> -->
                        <a class="nav-link panel-title" @click="showhideUsers()" data-toggle="collapse" data-target="#HiddenUsers">{{ $t('HiddenUsers') }}</a>
                            <div id="HiddenUsers" class="collapse">
  

                       <div class="row">
                      <div class="col-md-12" style="">
                        <template v-if="hideUsers.length != 0">
                          <ul v-for="friends,index in hideUsers"  class="chat-main" >
                            <li class="init" data-to="blank" style="cursor: pointer;">
                              <div class="chat-box">
                                <div style="display: inline-flex" >
                                <div style="border: 1px solid;border-radius: 23px; padding: 2px;">
                                  <img class="bg-img" style="min-height: 53px;max-width: 51px;border-radius: 19px; max-height: 53px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="" style="border-radius: 33px;padding: 23px; background: #8e88fdbd;" >
                                   <span style="color: white;text-transform: capitalize;"> {{getFirstLetter(friends.name)}}</span>
                                </div>
                              </div>
                               

                                <div class="details" style="display:block;padding-left: 10px;">
                                  <h5 style="margin-left: 0px;">{{friends.name}}</h5>
                                  
                                  <h6>{{friends.email}}</h6>
                                </div>
                            </div>
                                <div class="date-status">
                                 
                                 <button class="btn btn-sm btn-success showAddmeeting" @click="hideUser(friends._id,0,index)">Unhide</button>
                                </div>
                              </div>
                            </li>
                            <!-- <hr class="hrline"> -->
                          </ul>
                          </template>

                           <template v-else>
                            <p style="text-align:center">{{ $t('NoUsers') }}</p>
                          </template>

    
                      </div>
                    </div>
                  </div>    
                    </div>
                  </div>

                </div>
            </div>

                   <div class="filter-block" style="padding-bottom: 17px;padding-top: 17px;border-bottom: 1px solid rgb(220, 220, 220);">
                  <div class="collapse-block">
                    <h2 class="block-title Setting">
                      {{ $t('ChatSetting') }}
                    </h2>
                    <p style="display: none">{{ $t('Chatrelatedchanges') }}</p>
                    <div class="block-content" style="display:none">
                      <ul class="document-list">
                        <li style="width: 100%;">
                           <span>{{ $t('ReadReceipt') }}</span>
                              <span style="float:right">
              
			                    <toggle-button v-if="current_User.readReceipts == 1" @change="onChangeEventHandler($event)" :value="true"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }` }"/>

			                   <toggle-button v-if="current_User.readReceipts == 0" @change="onChangeEventHandler($event)" :value="false"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }` }"/>
                            </span>
                        </li>
                       
                      </ul>
                      <!-- <div class="nav flex-column nav-pills document-list profile-setting-list">
                        <a class="nav-link" data-toggle="collapse" data-target="#HiddenChat">Hidden Chat</a>
                        <a class="nav-link" data-toggle="collapse" data-target="#BlockedChat">Blocked Chat</a>
                        <a class="nav-link" data-toggle="collapse" data-target="#MutedChat">Muted Chat</a>
                      
                    </div> -->
                    </div>
                  </div>
                </div>

               <div class="filter-block" style="padding-bottom: 17px;padding-top: 17px;border-bottom: 1px solid rgb(220, 220, 220);">
                  <div class="collapse-block">
                    <h2 class="block-title Setting">
                      {{ $t('CallSetting') }}
                    </h2>
                    <p style="display: none">{{ $t('Callrelatedchanges') }}</p>
                    <div class="block-content" style="display:none">
                      <ul class="document-list">
                        <li style="width: 100%;">
                           <span>{{ $t('AllowVoiceCall') }}</span>
                              <span style="float:right">
              
			                    <toggle-button v-if="current_User.voiceCallReceive == 1" @change="setaudioCall($event)" :value="true"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }`}"/>

			                   <toggle-button v-if="current_User.voiceCallReceive == 0" @change="setaudioCall($event)" :value="false"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }`}"/>
                            </span>
                        </li>
                         <li style="width: 100%;">
                           <span>{{ $t('AllowVideoCall') }}</span>
                              <span style="float:right">
              
			                    <toggle-button v-if="current_User.videoCallReceive == 1" @change="setvideoCall($event)" :value="true"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }`}"/>

			                   <toggle-button v-if="current_User.videoCallReceive == 0" @change="setvideoCall($event)" :value="false"
			                   :labels="{checked: `${ this.$t('On') }`, unchecked: `${ this.$t('Off') }`}"/>
                            </span>
                        </li>

                       
                      </ul>
                     
                    </div>
                  </div>
                </div>

                
              <div class="filter-block" style="padding-bottom: 17px;padding-top: 17px;border-bottom: 1px solid rgb(220, 220, 220);">
                  <div class="collapse-block">
                    <h2 class="block-title" style="padding-bottom: 8px !important">
                     {{ $t('LanguageSetting') }}
                    </h2>
                     <p style="display:none">Language related changes</p>
                    <div class="block-content" style="display:none">
                        <select style="width: 150px; padding: 6px; margin-left: 10px; margin-bottom: 7px; border-radius: 4px; border: 1px solid #787575;" v-model="selected_language"  @change="changelanguage($event)">
       <!-- <option value="">{{ $t('selectlan') }}</option> -->
        <template v-for="locale in locales" :key="locale">
          <option :value="locale" >{{ $t(locale) }}</option>
        </template>
      </select>
                  </div>
                </div>
            </div>

                  <div class="filter-block" style="padding-bottom: 17px;padding-top: 17px;">
                  <div class="collapse-block Setting">
                    <h2 class="block-title">
                       {{ $t('Others') }}
                    </h2>
                    <p style="display:none">{{ $t('Aboutapp,feedbacketc,') }}</p>
                    <div class="block-content" style="display:none">
                      <div class="nav flex-column nav-pills document-list profile-setting-list">
                        <a class="nav-link" data-toggle="modal" data-target="#aboutChatto">{{ $t('AboutChatto') }}</a>
                        <a class="nav-link" data-toggle="modal" data-target="#aboutChatto">{{ $t('Feedback') }}</a>
                        <a class="nav-link" data-toggle="modal" data-target="#termsConditions">{{ $t('Termsandcondition') }}</a>
	                     <a class="nav-link" data-toggle="modal" data-target="#deactivateAccount">{{ $t('DeactivateAccount') }}</a>
	                    <a class="nav-link" data-toggle="modal" data-target="#deleteAccount">{{ $t('DeleteAccount') }}</a>
	                    <a class="nav-link" @click="logout()">{{ $t('Logout') }}</a>
                      
                    </div>
                    </div>
                  </div>
                </div>
                 
                  
                </div>
              </div>
            
            </div>
            <div class="col-md-9 setting-content-block">
              
              <div class="row settingWelcomePanel" id="settingcontent" style="margin-top: 157px;text-align: center;">
              <div class="col-12" style="">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">

                  <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px; border-radius: 30px; background-color: #2c3550;">
                       <span> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#msgchatModal" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('Startconversation') }} </button>
                  <p>{{ $t('Searchsomeone') }}</p>
                </div>

              </div>
            </div>

            </div>
          </div>
        </div>
        <div class="status-tab custom-scroll dynemic-sidebar" id="status">

          <div class="theme-title">
            <div class="media">
              <div>
                <h2>{{ $t('Media') }}</h2>
                <!-- <h4>Shared Media</h4> -->
              </div>
            <!--   <div class="media-body media-body text-right">
                <a class="icon-btn btn-sm btn-outline-light close-panel" href="javascript:void(0);">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </a>
              </div> -->
            </div>
          </div>
          <div class="theme-tab">
            <ul class="nav nav-tabs" style="padding: 30px;">
              <li class="nav-item">
                <a class="buttoneffect active" data-toggle="pill" href="#tab1">{{ $t('media') }}</a>
              </li>
              <li class="nav-item">
                <a class="buttoneffect" data-toggle="pill" href="#tab2">{{ $t('Link') }}</a>
              </li>
              <!-- <li class="nav-item">
                <a class="buttoneffect" data-toggle="pill" href="#tab3">Docs</a>
              </li> -->
            </ul>
          </div>
          <div class="file-tab">
            <div class="tab-content custom-scroll">
              <div class="tab-pane active" id="tab1">
                <div class="media-gallery portfolio-section grid-portfolio">
                  <div class="collapse-block open">
                   
                    <div class="block-content">
                      <div class="row share-media zoom-gallery">
                        <!--<div class="col-4 isotopeSelector filter">
                          <div class="media-big">
                            <div class="overlay">
                              <div class="border-portfolio">
                                <a href="../assets/images/gallery/1.jpg">
                                  <div class="overlay-background">
                                    <i class="ti-plus" aria-hidden="true"></i>
                                  </div><img class="img-fluid bg-img" src="../assets/images/gallery/1.jpg" alt="portfolio-image" /></a>
                              </div>
                            </div>
                          </div>
                        </div>-->
                        <div class="col-4" v-for="media in allMedia">
                          <div class="media-small isotopeSelector filter">
                            <div class="overlay">
                              <div class="border-portfolio">
                                <a :href="hostname+'images/chatImages/'+media.message" target="_blank">
                                  <div class="overlay-background">
                                    <i class="ti-plus" aria-hidden="true"></i>
                                  </div><img class="img-fluid bg-img" :src="hostname+'images/chatImages/'+media.message" alt="portfolio-image" /></a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- <div v-if="allMedia.length == 0">
                        </div> -->
                     
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab2">
               
              </div>
              <div class="tab-pane fade" id="tab3">
                <ul class="chat-main">
                 <li v-for="document in allDocument">
              <div class="chat-box">
                <div class="media">
                  <div class="profile">
                    <a class="icon-btn btn-outline-danger btn-xl pull-right rouded15" href="#">
                      <i class="fa fa-file-code-o"></i>
                    </a>
                  </div>
                  <div class="details">
                    <h5>{{document.message}}</h5>
                    <h6>{{docToday(document.createdAt)}}</h6>
                  </div>
                  <div class="media-body">
                    <a class="icon-btn btn-outline-light btn-sm pull-right" :href="hostname+'images/chatImages/'+document.message" target="_blank">
                      <download-icon size="1.5x" class="custom-class"></download-icon>
                    </a>
                  </div>
                </div>
              </div>
            </li>
                  
                </ul>
              </div>
            </div>
          </div>

        </div>
      </aside>

      <div class="chitchat-main small-sidebar" id="content" >
        <div class="chat-content tabto active" id="mainchatpage">
          <div class=" custom-scroll active">
            <div class="row" style="margin-top: 157px;text-align: center;">
              <div class="col-12">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">

                  <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px;">
                       <span> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#msgchatModal" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('Startconversation') }} </button>
                  <p>{{ $t('Searchsomeone') }}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="chat-content tabto active" id="group_chat">
          <div class="custom-scroll active">
    <div class="chat-content tabto active">
          <div class=" custom-scroll active">
            <div class="row" style="margin-top: 157px;text-align: center;">
              <div class="col-12" style="">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">
                  
                 <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px;">
                       <span> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#exampleModalCenter" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('Startconversation') }} </button>
                  <p>{{ $t('Searchsomeone') }}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        <!--  Groupchat -->
        <div class="chat-content tabto" id="startgroupchat">
          <div id="group_chat_open" class="messages custom-scroll group_chat_open">
            <div class="contact-details">
              <div class="row">
                <form class="form-inline search-form">
                  <div class="form-group">
                    <input class="form-control-plaintext" type="search" v-model="groupmsgsearch" :placeholder="$t('Search ...')" />
                    <div class="icon-close close-search" @click="groupsearchClose()"> </div>
                  </div>
                </form>
                <div class="col-7">
                  <div class="media left">
                    <div class="media-left mr-3" @click="groupSidebar()">

                      <div class="profile menu-trigger" style="border-radius: 30px;">
                      <span>{{getFirstLetter(singlegroup.name)}}</span></div>
                    </div>
                    <div class="media-body">
                      <h5>{{singlegroup.name}}</h5>

                    </div>
                    <div class="media-right groupUsers">
                      <ul>
                        <li>
                          <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }} </h6>
                          <div class="usersprof">
                            <template v-for="gmembers,index in singlegroup.members" v-if="index < 4">
                              <div  v-if="gmembers.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+gmembers.user_image" alt="Avatar" :title="gmembers.name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount">{{getFirstLetter(gmembers.name)}}</div>
                            </div>
                               
                            </template>
                            <div class="profile">
                              <div class="usersCount">{{groupmembers}}</div>
                            </div>
                            <div class="addGroups" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#showGroupsMembers">
                              <div class="" style="padding: 6px;color: #6F66FF;">
                                <plus-icon size="1.5x" class="custom-class"></plus-icon>
                              </div>
                            </div>

                          </div>
                        </li>

                        <li>
                          <a class="icon-btn btn-light button-effect mobile-sidebar" href="#">
                            <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <ul class="calls text-right">
                    <!--<li>
                              <a class="icon-btn btn-light button-effect mute" href="#">
                                <i class="fa fa-volume-up"></i>
                              </a>
                            </li>-->
                    <li>
                      <a class="icon-btn btn-light search-right" href="#">
                       <img class="chatIcons" style="padding: 2px;" src="../assets/images/icons/svg/Search.svg" alt="Avatar"  />
                      </a>
                    </li>
                    <template v-if="singlegroup.groupCallStatus == 1"  >
                      <li>
                        <a class="icon-btn btn-success" href="#" style="border-radius: 16px;height: 35px; width: 72px;"  @click="groupvideoJoinCall(singlegroup)" data-backdrop="static" data-target="#groupvideocall">
                          {{ $t('JoinCall') }}
                        </a>
                      </li>
                    </template>
                    <template v-else>
                      <li>
                        <a class="icon-btn btn-light button-effect" href="#" @click="groupvideostartCall(singlegroup,'audio')"  data-tippy-content="Quick Audio Call">
                            <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                        </a>
                      </li>
                      <li>
                        <a class="icon-btn btn-light button-effect" href="#" @click="groupvideostartCall(singlegroup,'video')" data-tippy-content="Quick Video Call">
                          <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                        </a>
                      </li>
                    </template>
                     <li class="chat-friend-toggle">
                      <a class="icon-btn btn-light bg-transparent button-effect outside" href="#" data-tippy-content="Quick action">
                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                      </a>
                      <div class="chat-frind-content">
                        <ul style="width:170px">
                           <li @click="deleteChat()" style="cursor:pointer">
                            <a class="" href="#" style="color: #959595;">
                              <trash-2-icon size="1.5x" class="custom-class"></trash-2-icon>
                            </a>
                            <h5>{{ $t('DeleteChat') }}</h5>
                          </li>

                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <star-icon size="1.5x" class="custom-class"></star-icon>
                            </a>
                            <h5 >Hide Group</h5>
                          </li>
                          <!-- <li>
                            <a class="" href="#" style="color: #959595;">
                              <volume-x-icon size="1.5x" class="custom-class"></volume-x-icon>
                            </a>
                            <h5>{{ $t('MuteNotification') }}</h5>
                          </li>-->
                          <li> 
                            
                            <a class="" href="#" style="color: #959595;">
                              <slash-icon size="1.5x" class="custom-class"></slash-icon>
                            </a>
                            <h5 >Block Group</h5>
                          </li>
                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <user-icon size="1.5x" class="custom-class"></user-icon>
                            </a>
                            <h5 >{{ $t('LeaveGroup') }}</h5>
                          </li>

                        </ul>
                      </div>
                    </li>
                   <!--  <li class="" v-if=" userid == singlegroup.creatorUserId ">
                          <a class="icon-btn btn-light bg-transparent button-effect outside" href="#" @click="deleteGroup()" data-tippy-content="Quick action">
                            <trash-2-icon size="1.5x" class="custom-class"></trash-2-icon>
                          </a>
                        </li> -->

                  </ul>
                </div>
              </div>
            </div>

            <vue-dropzone ref="mygroupVueDropzone" id="groupdropzone" @vdropzone-success="groupComplete" v-on:vdropzone-sending="draggroupfileupload" :options="dropzoneOptions"></vue-dropzone>
            <div class="contact-chat">

          <template v-if="groupchatdata.length > 0 && groupmainmsg">
              <ul class="chatappend" v-for="g_chat in groupchatdata" v-if="g_chat.groupId == singlegroup._id">

                <li class="replies" v-if="g_chat.senderId._id == c_user._id" style="padding-top: 20px;">
                  <div class="media">
                    
                     <div class="profile mr-4">
                       <img class="bg-img" v-if="c_user.user_image" :src="hostname+'images/chatImages/'+c_user.user_image" alt="Avatar"  />
                     <div v-else  class="userprofile"  >
                       <span style="z-index: 0;"> {{getFirstLetter(g_chat.senderId.name)}}</span>
                    </div>
                  </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{g_chat.senderId.name}}</h5>
                        <h6>{{isToday(g_chat.createdAt)}} {{chatTime(g_chat.createdAt)}}</h6>
                         <span v-if="g_chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main">

                            <h5 v-if="g_chat.isDeleted == 1" :id="'groupsender'+g_chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'groupsender'+g_chat._id">{{ g_chat.message }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'groupsender'+g_chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                            <br>
                            <a :href="hostname+'download/'+g_chat.message"  :id="'groupsender'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+g_chat.message">
                            </a>

                            <a :href="hostname+'/images/chatImages/'+g_chat.message" target="_blank" :id="'groupsender'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>

                            <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+g_chat._id" @click="msg_setting(g_chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+g_chat._id" style="z-index: 99999;">
                                <ul  style="display: flex; flex-direction: column;">
                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="editgroupchat(g_chat._id,g_chat.message)">
                                       <img class="chatIcons" src="../assets/images/icons/svg/edit.svg" alt="Avatar"  /> {{ $t('Edit') }}
                                  </li>
                                  <br>
                                   <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                        <img class="chatIcons" src="../assets/images/icons/svg/Forword.svg" alt="Avatar"  />{{ $t('Forward') }}</a>
                                  </li>
                                      <li v-if="!g_chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(g_chat,'group')">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(g_chat,'group')">
                                       <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>
                                   <br>
                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <li style="margin-left: 12px;">
                                    <a href="#" @click="groupmsgdelete(g_chat)">
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
                <li class="sent" style="padding-top: 20px;" v-else>
                  <div class="media">
                    
                     <div class="profile mr-4">
                       <img class="bg-img" v-if="g_chat.senderId.user_image" :src="hostname+'images/chatImages/'+g_chat.senderId.user_image" alt="Avatar"  />
                     <div v-else  class="userprofile"  >
                       <span style="z-index: 0;"> {{getFirstLetter(g_chat.senderId.name)}}</span>
                    </div>
                  </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{g_chat.senderId.name}}</h5>
                        <h6>{{isToday(g_chat.createdAt)}} {{chatTime(g_chat.createdAt)}}</h6>
                        <span v-if="g_chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main">

                            <h5 v-if="g_chat.isDeleted == 1" :id="'sender'+g_chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'sender'+g_chat._id">{{ g_chat.message }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'sender'+g_chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                            <br>
                            <a :href="hostname+'download/'+g_chat.message" :id="'sender'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+g_chat.message">
                            </a>

                            <a :href="hostname+'/images/chatImages/'+g_chat.message" target="_blank" :id="'sender'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>

                            <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+g_chat._id" @click="msg_setting(g_chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+g_chat._id" style="z-index: 99999;">
                                <ul  style="display: flex; flex-direction: column;">
                                    <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                        <img class="chatIcons" src="../assets/images/icons/svg/Forword.svg" alt="Avatar"  />{{ $t('Forward') }}</a>
                                  </li>
                                      <li v-if="!g_chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(g_chat,'group')">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(g_chat,'group')">
                                       <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                               
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->

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
          </template>

          <template v-if="groupsearchchat.length > 0 && groupmsgsearch">
              <ul class="chatappend" v-for="g_chat in groupsearchchat" v-if="g_chat.groupId == singlegroup._id">

                <li class="replies" v-if="g_chat.senderId._id == c_user._id" style="padding-top: 20px;">
                  <div class="media">
                    
                     <div class="profile mr-4">
                       <img class="bg-img" v-if="g_chat.senderId.user_image" :src="hostname+'images/chatImages/'+g_chat.senderId.user_image" alt="Avatar"  />
                     <div v-else  class="userprofile"  >
                       <span style="z-index: 0;"> {{getFirstLetter(g_chat.senderId.name)}}</span>
                    </div>
                  </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{g_chat.senderId.name}}</h5>
                        <h6>{{isToday(g_chat.createdAt)}} {{chatTime(g_chat.createdAt)}}</h6>
                         <span v-if="g_chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main">

                            <h5 v-if="g_chat.isDeleted == 1" :id="'groupsender'+g_chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'groupsender'+g_chat._id">{{ g_chat.message }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'groupsender'+g_chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                            <br>
                            <a :href="hostname+'download/'+g_chat.message"  :id="'groupsender'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+g_chat.message">
                            </a>

                            <a :href="hostname+'/images/chatImages/'+g_chat.message" target="_blank" :id="'groupsender'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>

                            <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+g_chat._id" @click="msg_setting(g_chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+g_chat._id" style="z-index: 99999;">
                                <ul  style="display: flex; flex-direction: column;">
                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="editgroupchat(g_chat._id,g_chat.message)">
                                      <i class="fa fa-pencil"></i>{{ $t('Edit') }}</a>
                                  </li>
                                   <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                      <li  v-if="!g_chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(g_chat,'group')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(g_chat,'group')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <li style="margin-left: 12px;">
                                    <a href="#" @click="groupmsgdelete(g_chat)">
                                      <i class="ti-trash"></i>{{ $t('Delete') }}</a>
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
                <li class="sent" style="padding-top: 20px;" v-else>
                  <div class="media">
                    
                     <div class="profile mr-4">
                       <img class="bg-img" v-if="g_chat.senderId.user_image" :src="hostname+'images/chatImages/'+g_chat.senderId.user_image" alt="Avatar"  />
                     <div v-else  class="userprofile"  >
                       <span style="z-index: 0;"> {{getFirstLetter(g_chat.senderId.name)}}</span>
                    </div>
                  </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{g_chat.senderId.name}}</h5>
                        <h6>{{isToday(g_chat.createdAt)}} {{chatTime(g_chat.createdAt)}}</h6>
                        <span v-if="g_chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main">

                            <h5 v-if="g_chat.isDeleted == 1" :id="'sender'+g_chat._id">{{ $t('messagedeleted') }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 0" :id="'sender'+g_chat._id">{{ g_chat.message }}</h5>
                            <h5 v-else-if="g_chat.messageType != 1 && g_chat.messageType != 2 && g_chat.chatType == 1" :id="'sender'+g_chat._id">
                              <span style="border-bottom: 1px solid;">‘‘{{g_chat.commentId.message}}’’</span><br> {{ g_chat.message }}</h5>
                            <br>
                            <a :href="hostname+'download/'+g_chat.message" :id="'sender'+g_chat._id" v-if="g_chat.messageType == 1 && g_chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+g_chat.message">
                            </a>

                            <a :href="hostname+'/images/chatImages/'+g_chat.message" target="_blank" :id="'sender'+g_chat._id" v-if="g_chat.messageType == 2 && g_chat.isDeleted != 1" download><img src="../assets/images/fileIcon.png" style="width: 40px;"> {{ g_chat.message }}</a>

                            <div class="msg-dropdown-main" v-if="g_chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+g_chat._id" @click="msg_setting(g_chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+g_chat._id" style="z-index: 99999;">
                                <ul  style="display: flex; flex-direction: column;">
                                  <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                      <li  v-if="!g_chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(g_chat,'group')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(g_chat,'group')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="groupquote(g_chat)">
                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="g_chat.messageType != 1 && g_chat.messageType != 2">
                                    <a href="#" @click="copymsg(g_chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->

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
          </template>

            </div>
          </div>
          <VEmojiPicker @select="selectEmoji" class="" v-bind:class="{activeemoji: isActive}" v-if="isActive" />
          <div class="message-input" id="message-input">
            <div class="replybox" v-if="groupreplyBox == true">
              <p style="padding: 7px; margin: 0;">‘‘{{groupchatreplydata.message}}’’
                <span style="float:right;cursor: pointer;" @click="closegroupReplybox()">
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                </span>
                <br>
                <span style="margin-left: 6px;">
                 {{isToday(g_chat.createdAt)}} {{chatTime(groupchatreplydata.createdAt)}}
                </span>
              </p>
            </div>
            <div class="wrap emojis-main">
           

              <div class="dot-btn dot-primary mr-3">
                <a class="icon-btn btn-outline-primary button-effect" @click="showGroupemoji">
                  <smile-icon size="1.5x" class="custom-class"></smile-icon>
                </a>
              </div>

              <label class="icon-btn btn-outline-primary mr-4" for="groupfileupload">
                <i class="fa fa-plus"></i>
              </label>
              <input type="file" id="groupfileupload" ref="groupmyFiles" style="display:none" @change="groupuploadfile($event)" multiple>
              <textarea class="setemoj" id="setemoj" ref="groupafterClick" type="text" v-on:keyup="groupremovecross" v-model="groupmessage" :placeholder="$t('WriteMessage')"  @keydown.enter.exact.prevent
              @keyup.enter.exact="groupchat()"
              @keydown.enter.shift.exact="groupnewline" rows="3" cols="50">
              </textarea>
         <!--      <input class="setemoj" id="groupsetemoj" ref="groupafterClick" type="text" v-on:keyup="groupremovecross()" @keyup.enter="groupchat()" v-model="groupmessage" placeholder="Write your message..." /> -->
             <!--  <a class="icon-btn btn-outline-primary button-effect mr-3 ml-3" href="#" @click="feedbackDictation()">
                <mic-icon size="1.5x" class="custom-class"></mic-icon>
              </a> -->
              <button class="submit icon-btn btn-primary" v-show="ongroupChat" @click="groupchat()" id="send-groupmsg" :disabled="not_working">
                <send-icon size="1.5x" class="custom-class"></send-icon>
              </button>
              <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditgroupclear" @click="cleargroupchat()">
                <x-icon size="1.5x" class="custom-class"></x-icon>
              </button>

            </div>
          </div>
        </div>
        <!--end -->

        <div class="chat-content tabto" id="startchat">
          <div class=" messages custom-scroll active messageschat" id="chating">

             <div class="contact-details">
              <div class="row">
                <form id="mainchatform" class="form-inline search-form">
                  <div class="form-group">
                    <input class="form-control-plaintext" type="search" v-model="msgsearch" :placeholder="$t('Search ...')" />
                    <div class="icon-close close-search" @click="searchClose()"> </div>
                  </div>
                </form>
                <div class="col-7">
                  <div class="media left">
                    <div class="media-left mr-3" @click="chatSidebar()">

                      <div v-if="singlefriend.onlineStatus == 1" style="border-radius: 30px;" class="profile menu-trigger" v-bind:class="{ online: singlefriend.pStatus == 0, unreachable : singlefriend.pStatus == 1, busy: singlefriend.pStatus == 2, offline: singlefriend.pStatus == 3, offline: singlefriend.pStatus == 4 }">

                         <img class="bg-img" v-if="singlefriend.user_image" style ="width: 60px;min-height:60px" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />

                   <div v-else  class="user2 profile" >
                       <span> {{getFirstLetter(singlefriend.name)}}</span>
                    </div>

                  </div>

                      <div v-else class="profile offline menu-trigger" style="border-radius: 30px;">

                         <img class="bg-img" v-if="singlefriend.user_image" style ="width: 60px;min-height: 60px;" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" /> 
                   <div v-else  class="user2 profile" >
                       <span> {{getFirstLetter(singlefriend.name)}}</span>
                    </div>

                       </div>
                    </div>

                    <div class="media-body">
                      <h5>{{singlefriend.name}}</h5>

                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 0" class="badge badge-success">{{ $t('Online') }}</div>
                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 1" class="badge badge-warning">{{ $t('Away') }}</div>
                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 2" class="badge badge-danger">{{ $t('Busy') }}</div>
                      <!-- <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 3" class="badge badge-dark">Invisible</div> -->
                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 4" class="badge badge-secondary">{{ $t('Offline') }}</div>
                      <div v-if="singlefriend.onlineStatus == 0" class="badge badge-light">{{ $t('Offline') }}</div>

                    </div>
                    <div class="media-right">
                      <ul>
                       <!--  <li>
                          <a class="icon-btn btn-light button-effect mute" href="#">
                            <i class="fa fa-volume-up"></i>
                          </a>
                        </li> -->
                        <li>
                          <a class="icon-btn btn-light search-right" href="#">
                              <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Search.svg" alt="Avatar"  />
                      </a>
                          </a>
                        </li>
                        <li>
                          <a class="icon-btn btn-light button-effect mobile-sidebar" href="#">
                            <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <ul class="calls text-right">
                    <template  v-if="singlefriend.voiceCallReceive == 1">
                      <li>
                      <a class="icon-btn btn-light button-effect" href="#"  @click="videostartCall(singlefriend,'audio')">
                        <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>

                    <template v-else>
                       <li>
                      <a class="icon-btn btn-light button-effect" href="#" @click="callAllow()" >
                       <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>

                    <template v-if="singlefriend.videoCallReceive == 1">
                       <li >
                      <a class="icon-btn btn-light button-effect" href="#" @click="videostartCall(singlefriend,'video')" >
                       <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>
                    <template v-else>
                        <li >
                          <a class="icon-btn btn-light button-effect" href="#" @click="callAllow()" >
                            <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                        </a>
                    </li>
                    </template>
                   
                    <!--<li>
                          <a class="icon-btn btn-light button-effect apps-toggle">
                            <i class="ti-layout-grid2"></i>
                          </a>
                        </li>-->
                    <li class="chat-friend-toggle">
                      <a class="icon-btn btn-light bg-transparent button-effect outside" href="#" data-tippy-content="Quick action">
                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                      </a>
                      <div class="chat-frind-content">
                        <ul style="width:170px">
                        

                         <!--  <li>
                            <a class="" href="#" style="color: #959595;">
                              <star-icon size="1.5x" class="custom-class"></star-icon>
                            </a>
                            <h5 >Hide Chat</h5>
                          </li> -->
                          <!-- <li>
                            <a class="" href="#" style="color: #959595;">
                              <volume-x-icon size="1.5x" class="custom-class"></volume-x-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('MuteNotification') }}</h5>
                          </li>-->
                       
                         
                          <li @click="blockUser(singlefriend._id,1,0)" style="cursor:pointer"> 

                            <a class="" href="#" style="color: #959595;">
                             <img class="chatIcons" src="../assets/images/icons/svg/Blocked.svg" alt="Avatar" />
                            </a>
                            <h5 >{{ $t('BlockUsers') }}</h5>
                          </li>
                          <br>
                          <li @click="hideUser(singlefriend._id,1,0)" style="cursor:pointer"> 

                            <a class="" href="#" style="color: #959595;">
                             <img class="chatIcons" src="../assets/images/icons/svg/Hide.svg" alt="Avatar" style="height: auto;width: 85%;" />
                            </a>
                            <h5 >{{ $t('BlockUsers') }}</h5>
                          </li>
                            <li @click="deleteChat()" style="cursor:pointer;padding-top:0px">
                            <a class="" href="#" style="color: #959595;">
                            <img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  />
                            </a>
                            <h5>{{ $t('DeleteChat') }}</h5>
                          </li>
                          <!-- <li>
                            <a class="" href="#" style="color: #959595;">
                              <user-icon size="1.5x" class="custom-class"></user-icon>
                            </a>
                            <h5 >{{ $t('UserSetting') }}</h5>
                          </li> -->

                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-------- Dropzone ------>
            <vue-dropzone ref="myVueDropzone" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions"> </vue-dropzone>
            <!-------- end -------->
            <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">

            </loading>

            <div class="contact-chat">
           <template v-if="friendchat.length != 0 && mainmsg">
              <ul class="chatappend" v-for="chat in friendchat">
                <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 30px;">
                  <span>{{isToday(chat.createdAt)}} {{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>
<!--   && (chat.deletedBy.length == 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1])   -->
                 <!-- <span>{{ chat.deletedBy.length }}</span> -->
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
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                        <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main" @mouseleave="msg_settingHide(chat._id)">
                <img v-if="(isSeen == true || chat.isSeen == 1) && chat.receiptStatus == 1" class="" src="../assets/images/doubleblue.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />

                <img v-else-if="isSeen == false && chat.isSeen == 0" class="" src="../assets/images/doublegray.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />

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
                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+chat._id"  @click="msg_setting(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;" >
                                <ul style="z-index: 99999; display: flex; flex-direction: column;">
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="eidtchat(chat._id,chat.message)">
                                        <img class="chatIcons" src="../assets/images/icons/svg/edit.svg" alt="Avatar"  />{{ $t('Edit') }}</a>
                                  </li>
                                  <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><img class="chatIcons" src="../assets/images/icons/svg/Download.svg" alt="Avatar"  />{{ $t('Download') }}
                                    </a>
                                </li>
                                 <li>
                                    <a href="#" @click="forward(chat)">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Forword.svg" alt="Avatar"  />{{ $t('Forward') }}</a>
                                  </li>
                                  <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(chat,'chat')">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <img class="chatIcons" style="-webkit-transform: scaleX(-1); transform: scaleX(-1); margin-left: -3px" src="../assets/images/icons/svg/Forword.svg" alt="Avatar" />{{ $t('Quote') }}</a>
                                  </li>
                                   <!-- <br> -->
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
                  <!-- v-if="(chat.deletedBy.length != 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1]) )"  -->
                 <div >
                  <div class="media">
                    <div class="profile mr-4">
                       <img class="bg-img" v-if="singlefriend.user_image" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                     <div v-else  class="userprofile">
                       <span style="z-index: 0;" > {{getFirstLetter(singlefriend.name)}}</span>
                    </div> 
                    </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{ singlefriend.name }}</h5>
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                         <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
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
                                <ul  style="display: flex; flex-direction: column;">
                                  <!--<li v-if="chat.messageType != 1 && chat.messageType != 2"><a href="#" @click="eidtchat(chat._id,chat.message)"><i class="fa fa-pencil" ></i>{{ $t('Edit') }}</a></li>-->
                                  <template v-if="chat.messageType != 0 && chat.isDeleted != 1" >
                                  	   <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" download><img class="chatIcons" src="../assets/images/icons/svg/Download.svg" alt="Avatar"  />{{ $t('Download') }}
                                    </a>
                                </li>
                                  </template>
                                
                                   <li>
                                    <a href="#" @click="forward(chat)">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Forword.svg" alt="Avatar"  />{{ $t('Forward') }}</a>
                                  </li>
                                  <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Bookmark.svg" alt="Avatar"  />{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(chat,'chat')">
                                     <img class="chatIcons" src="../assets/images/icons/svg/Bookmark-Fill.svg" alt="Avatar"  />{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <img class="chatIcons" style="-webkit-transform: scaleX(-1); transform: scaleX(-1); margin-left: -3px" src="../assets/images/icons/svg/Forword.svg" alt="Avatar" />{{ $t('Quote') }}</a>
                                  </li>
                                   <!-- <br> -->
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <img class="chatIcons" src="../assets/images/icons/svg/Copy.svg" alt="Avatar" />{{ $t('Copy') }}</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <!--<li><a href="#" @click="msgdelete(chat._id)"><i class="ti-trash"></i>delete</a></li>-->
                                </ul>
                              </div>
                            </div>

                          </li>
                      
                        </ul>
                      </div>
                    </div>
                  </div>

                 </div>
                </li>

              </ul>
            <!--   <template v-if="isSeen == true ">
                     <img class="bg-img" v-if="singlefriend.user_image" style="width: 21px;float:right;min-height: 21px;" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                
                         <div v-else  class="" style="width: 24px;float: right; background: #2c3550;border-radius: 14px;height: 24px;text-align: center;line-height: 23px;margin-bottom: 3px;" >
                             <span style="color: white;text-transform: capitalize;"> {{getFirstLetter(singlefriend.name)}}</span>
                          </div>
                    </template> -->
            </template>
            

           <template v-else-if="searchmsg">
              <ul class="chatappend" v-for="chat in searchchat">
                <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 30px;">
                  <span>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>
<!--   && (chat.deletedBy.length == 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1])   -->
                 <!-- <span>{{ chat.deletedBy.length }}</span> -->
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
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                        <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                        <ul class="msg-box">
                          <li class="msg-setting-main">
                <img v-if="(isSeen == true || chat.isSeen == 1) && chat.receiptStatus == 1" class="" src="../assets/images/doubleblue.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />

                <img v-else-if="isSeen == false && chat.isSeen == 0" class="" src="../assets/images/doublegray.png" alt="Avatar" style="height: auto;width:3%;margin-left: 6px;" />

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
                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                <ul  style="display: flex; flex-direction: column;">
                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="eidtchat(chat._id,chat.message)">
                                      <i class="fa fa-pencil"></i>{{ $t('Edit') }}</a>
                                  </li>
                                  <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon> {{ $t('Download') }}
                                    </a>
                                </li>
                                 <li>
                                    <a href="#" @click="forward(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                  <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i class="fa fa-reply"></i>{{ $t('Quote') }}</a>
                                  </li>

                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <li style="margin-left: 12px;">
                                    <a href="#" @click="msgdelete(chat)">
                                      <i class="ti-trash"></i>{{ $t('Delete') }}</a>
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
                  <!-- v-if="(chat.deletedBy.length != 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1]) )"  -->
                 <div >
                  <div class="media">
                    <div class="profile mr-4">
                       <img class="bg-img" v-if="singlefriend.user_image" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                     <div v-else  class="userprofile">
                       <span style="z-index: 0;" > {{getFirstLetter(singlefriend.name)}}</span>
                    </div> 
                    </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h5>{{ singlefriend.name }}</h5>
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                         <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
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
                                <ul  style="display: flex; flex-direction: column;">
                                  <!--<li v-if="chat.messageType != 1 && chat.messageType != 2"><a href="#" @click="eidtchat(chat._id,chat.message)"><i class="fa fa-pencil" ></i>{{ $t('Edit') }}</a></li>-->
                                   <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon>{{ $t('Download') }}
                                    </a>
                                </li>
                                 <li>
                                    <a href="#" @click="forward(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                    <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                  <li>
                                    <a href="#" @click="quote(chat)">
                                      <i class="fa fa-reply"></i>{{ $t('Quote') }}</a>
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
                      
                        </ul>
                      </div>
                    </div>
                  </div>

                 </div>
                </li>

              </ul>
            <!--   <template v-if="isSeen == true ">
                     <img class="bg-img" v-if="singlefriend.user_image" style="width: 21px;float:right;min-height: 21px;" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                
                         <div v-else  class="" style="width: 24px;float: right; background: #2c3550;border-radius: 14px;height: 24px;text-align: center;line-height: 23px;margin-bottom: 3px;" >
                             <span style="color: white;text-transform: capitalize;"> {{getFirstLetter(singlefriend.name)}}</span>
                          </div>
                    </template> -->
            </template>


            </div>

            <span v-show="typing" style="margin-top: 12px;position: absolute;bottom: 30px;padding: 3px;" class="">{{ singlefriend.name }} {{ $t('istyping') }} ...</span>

          </div>
          <VEmojiPicker @select="selectchatEmoji" class="" v-bind:class="{activeChatemoji: ischatemojiActive}" v-if="ischatemojiActive" />
          <div class="message-input" id="singlemessage-input">
            <div class="replybox" v-if="replyBox == true">
              <p style="padding: 7px; margin: 0;"> <template v-if="chatreplydata.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chatreplydata.message}}’’</template> 
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

              <div class="dot-btn dot-primary mr-3">
                <a class="icon-btn btn-outline-primary button-effect " @click="showChatemoji">
                  <smile-icon size="1.5x" class="custom-class"></smile-icon>
                </a>
              </div>

              <label class="icon-btn btn-outline-primary mr-4" for="fileupload">
                <file-plus-icon size="1.5x" class="custom-class"></file-plus-icon>
              </label>
              <input type="file" id="fileupload" ref="myFiles" style="display:none" @change="uploadfile($event)" multiple>

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
             <textarea class="setemoj" id="setemoj" ref="afterClick" type="text"  v-on:keyup="removecross()" @keydown.enter.exact.prevent
              @keyup.enter.exact="chat()"
              @keydown.enter.shift.exact="newline" v-model="message" :placeholder="$t('WriteMessage')" rows="3" cols="50">
              </textarea>
            <!--   <input class="setemoj" id="setemoj" ref="afterClick" type="text" v-on:keyup="removecross()" @keyup.enter="chat()" v-model="message" placeholder="Write your message..." /> -->
              <!-- <a class="icon-btn btn-outline-primary button-effect mr-3 ml-3" href="#">
                <mic-icon size="1.5x" class="custom-class"></mic-icon>
              </a> -->
              <button class="submit icon-btn btn-primary disabled" v-show="onChat" @click="chat()" id="send-msg" disabled="disabled">
                <send-icon size="1.5x" class="custom-class"></send-icon>
              </button>
              <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditclear" @click="clearchat()">
                <x-icon size="1.5x" class="custom-class"></x-icon>
              </button>

            </div>
          </div>
        </div>

        <div class="call-content">
            <div class="row" id="callcontent" style="margin-top: 157px;text-align: center;">
              <div class="col-12" style="">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">

                  <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px;">
                       <span> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#msgchatModal" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('Startconversation') }} </button>
                  <p>{{ $t('Searchsomeone') }}</p>
                </div>

              </div>
            </div>
            <div id="contactdetails">
           <div class="contact-details"  style="background: white;padding: 10px; border-radius: 11px;width: calc(100vw - 642px);margin-bottom: 21px;">
              <div class="row">
              
                <div class="col-7">
                  <div class="media left">
                    <div class="media-left mr-3" @click="chatSidebar()">

                      <div v-if="singlecall.onlineStatus == 1" style="border-radius: 30px;" class="profile menu-trigger" v-bind:class="{ online: singlecall.pStatus == 0, unreachable : singlecall.pStatus == 1, busy: singlecall.pStatus == 2, offline: singlecall.pStatus == 3, offline: singlecall.pStatus == 4 }">

                         <img class="bg-img" v-if="singlecall.user_image" style ="width: 60px;min-height:60px" :src="hostname+'images/chatImages/'+singlecall.user_image" alt="Avatar" />

                   <div v-else  class="userprofile" >
                       <span> {{getFirstLetter(singlecall.name)}}</span>
                    </div>

                  </div>

                      <div v-else class="profile offline menu-trigger" style="border-radius: 30px;">

                         <img class="bg-img" v-if="singlecall.user_image" style ="width: 60px;min-height: 60px;" :src="hostname+'images/chatImages/'+singlecall.user_image" alt="Avatar" /> 
                   <div v-else  class="userprofile" >
                       <span style="z-index: 99;"> {{getFirstLetter(singlecall.name)}}</span>
                    </div>

                       </div>
                    </div>

                    <div class="media-body" style="margin-top: 8px;">
                      <h5>{{singlecall.name}}</h5>
                <div style="margin-top: 12px;">
                      <div v-if="singlecall.onlineStatus == 1 && singlecall.pStatus == 0" class="badge badge-success">{{ $t('Online') }}</div>
                      <div v-if="singlecall.onlineStatus == 1 && singlecall.pStatus == 1" class="badge badge-warning">{{ $t('Away') }}</div>
                      <div v-if="singlecall.onlineStatus == 1 && singlecall.pStatus == 2" class="badge badge-danger">{{ $t('Busy') }}</div>
                      <!-- <div v-if="singlecall.onlineStatus == 1 && singlecall.pStatus == 3" class="badge badge-dark">Invisible</div> -->
                      <div v-if="singlecall.onlineStatus == 1 && singlecall.pStatus == 4" class="badge badge-secondary">{{ $t('Offline') }}</div>
                      <div v-if="singlecall.onlineStatus == 0" class="badge badge-light">{{ $t('Offline') }}</div>
                   </div>
                    </div>
                    <div class="media-right">
                      <ul>
                       <!--  <li>
                          <a class="icon-btn btn-light button-effect mute" href="#">
                            <i class="fa fa-volume-up"></i>
                          </a>
                        </li> -->
                       <!--  <li>
                          <a class="icon-btn btn-light search-right" href="#">
                            <search-icon size="1.5x" class="custom-class"></search-icon>
                          </a>
                        </li> -->
                        <li>
                          <a class="icon-btn btn-light button-effect mobile-sidebar" href="#">
                            <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <ul class="calls text-right">
                 <template  v-if="singlefriend.voiceCallReceive == 1">
                      <li>
                      <a class="icon-btn btn-light button-effect" href="#"  @click="videostartCall(singlefriend,'audio')">
                         <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>

                    <template v-else>
                       <li>
                      <a class="icon-btn btn-light button-effect" href="#" @click="callAllow()" >
                        <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>

                    <template v-if="singlefriend.videoCallReceive == 1">
                       <li >
                      <a class="icon-btn btn-light button-effect" href="#" @click="videostartCall(singlefriend,'video')" >
                           <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                      </a>
                    </li>
                    </template>
                    <template v-else>
                        <li >
                          <a class="icon-btn btn-light button-effect" href="#" @click="callAllow()" >
                              <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                        </a>
                    </li>
                    </template>
                    <!--<li>
                          <a class="icon-btn btn-light button-effect apps-toggle">
                            <i class="ti-layout-grid2"></i>
                          </a>
                        </li>-->
                    <li class="chat-friend-toggle">
                      <!-- <a class="icon-btn btn-light bg-transparent button-effect outside" href="#" data-tippy-content="Quick action">
                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                      </a> -->
                      <div class="chat-frind-content">
                        <ul style="width:170px">
                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <user-icon size="1.5x" class="custom-class"></user-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('ContactInfo') }}</h5>
                          </li>

                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <star-icon size="1.5x" class="custom-class"></star-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('Statmessage') }}</h5>
                          </li>
                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <volume-x-icon size="1.5x" class="custom-class"></volume-x-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('MuteNotification') }}</h5>
                          </li>
                          <li>
                            <a class="" href="#" style="color: #959595;">
                              <slash-icon size="1.5x" class="custom-class"></slash-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('Block') }}</h5>
                          </li>
                          <li @click="deleteChat()" style="cursor:pointer">
                            <a class="" href="#" style="color: #959595;">
                              <trash-2-icon size="1.5x" class="custom-class"></trash-2-icon>
                            </a>
                            <h5 class="menu-trigger">{{ $t('DeleteChat') }}</h5>
                          </li>

                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          <a class="icon-btn btn-outline-primary button-effect mobile-back mb-3" href="#">
            <i class="ti-angle-left"> </i>
          </a>
          <div class="row">
           
            <div class="col-sm-12">
              <div class="call-log-main custom-scroll">
           <template v-for="callHistory in callHistories">
               <template v-if="callHistory.callerId == c_user._id">
                <div class="coll-log-group" v-if="callHistory.senderStatus == 1 && callHistory.receiverStatus != 5">
                  <div class="log-content-left">
                    <div class="media">
                      <phone-incoming-icon size="1.5x" class="custom-class"></phone-incoming-icon>
                      <div class="media-body">
                        <h5>{{ $t('Outgoing Call') }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="log-content-right">
                    <h6>{{isCall(callHistory.createdAt)}}</h6>
                  </div>
                </div>

                 <div class="coll-log-group" v-else-if="callHistory.senderStatus == 1 && callHistory.receiverStatus == 5">
                  <div class="log-content-left">
                    <div class="media">
                      <phone-incoming-icon size="1.5x" class="custom-class"></phone-incoming-icon>
                      <div class="media-body">
                        <h5>{{ $t('Outgoing Call') }}</h5>
                      </div>
                    </div>
                  </div>
                   <div class="log-content-center">
                          <h6>{{ $t('call duration') }}: {{callHistory.callTime}}</h6>
                        </div>
                  <div class="log-content-right">
                    <h6>{{isCall(callHistory.createdAt)}}</h6>
                  </div>
                </div>
              
                  </template>

                   <template v-else>
        
                    <div class="coll-log-group" v-if="callHistory.receiverStatus == 5">
                        <div class="log-content-left">
                          <div class="media">
                            <phone-incoming-icon size="1.5x" class="custom-class"></phone-incoming-icon>
                            <div class="media-body">
                              <h5>{{ $t('Incomming Call') }}</h5>
                             
                            </div>
                          </div>
                        </div>
                        <div class="log-content-center">
                          <h6>{{ $t('call duration') }}: {{callHistory.callTime}}</h6>
                        </div>
                        <div class="log-content-right">
                          <h6>{{isCall(callHistory.createdAt)}}</h6>
                        </div>
                      </div>
                      <div class="coll-log-group" v-else-if="callHistory.receiverStatus == 3">
                        <div class="log-content-left">
                          <div class="media">
                            <i data-feather="phone-missed"></i>
                            <div class="media-body">
                              <h5>{{ $t('missedcall') }}</h5>
                            </div>
                          </div>
                        </div>
                        <div class="log-content-right">
                          <h6>{{isCall(callHistory.createdAt)}}</h6>
                        </div>
                      </div>
                       <div class="coll-log-group" v-else-if="callHistory.receiverStatus == 6">
                        <div class="log-content-left">
                          <div class="media">
                            <i data-feather="phone-missed"></i>
                            <div class="media-body">
                              <h5>{{ $t('MissedCall') }}</h5>
                            </div>
                          </div>
                        </div>
                        <div class="log-content-right">
                          <h6>{{isCall(callHistory.createdAt)}}</h6>
                        </div>
                      </div>
                  </template>

                </template>

              
              </div>
              <div class="call-log-clear" @click="clearo2oHistory()" v-if="callHistories.length > 0">
                <i class="ti-trash font-danger"></i>
                <span class="font-danger">{{ $t('DeleteCallHistory') }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
       
      </div>
      <aside class="chitchat-right-sidebar" id="groupslide-menu">
        <div class="custom-scroll right-sidebar">
          <div class="contact-profile">
            <div class="theme-title">
              <div class="media">
                <div class="media-body text-left">
                  <a class=" close-profile ml-3" href="#">
                    <x-icon size="1x" class="custom-class"></x-icon>
                  </a>
                </div>
                <div>
                  <h6>Group Information</h6>
                </div>

              </div>
            </div>
            <div class="details">
              <div class="contact-top">
                <img class="bg-img" src="../assets/images/avtar/2.jpg" alt="" />
              </div>
              <div class="name">
                <h3>{{singlegroup.name}}</h3>
                <h6>{{ $t('Add Description') }}</h6>
              </div>

            </div>
          </div>
          <div class="document">
            <div class="filter-block">
              <div class="collapse-block">
                <h5 class="block-title">
                  <span style="padding-right: 5px;">
                    <i class="fa fa-files-o" aria-hidden="true"></i>
                  </span> &nbsp; &nbsp; {{ $t('Shared Document') }}
                  <label class="badge badge-success sm ml-2">3</label>
                </h5>
                <div class="block-content" style="display:none">
                  <ul class="document-list">
                    <li>
                      <i class="ti-folder font-danger"></i>
                      <h5>Simple_practice_project-zip</h5>
                    </li>
                    <li>
                      <i class="ti-write font-success"></i>
                      <h5>Word_Map-jpg</h5>
                    </li>
                    <li>
                      <i class="ti-zip font-primary"></i>
                      <h5>Latest_Design_portfolio.pdf</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="media-gallery portfolio-section grid-portfolio">
            <div class="collapse-block ">
              <h5 class="block-title">
                <span style="padding-right: 5px;">
                  <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                </span> &nbsp; &nbsp; {{ $t('Bookmarked Messages') }}
                <label class="badge badge-primary sm ml-2">2</label>
              </h5>
              <div class="block-content" style="display:none">
                <div class="row share-media zoom-gallery">
                  <div class="col-12">
                    <h6 class="mb-2">22/03/2021</h6>
                  </div>
                  <div class="col-4 isotopeSelector filter">
                    <div class="media-big">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/1.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/1.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/2.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/2.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/3.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/3.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/4.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/4.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                    <div class="media-small isotopeSelector filter fashion">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/5.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/5.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <h6 class="mb-2 mt-2">20/04/2019</h6>
                  </div>
                  <div class="col-4">
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/2.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/2.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/3.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/3.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="media-small isotopeSelector filter">
                      <div class="overlay">
                        <div class="border-portfolio">
                          <a href="../assets/images/gallery/4.jpg">
                            <div class="overlay-background">
                              <i class="ti-plus" aria-hidden="true"></i>
                            </div><img class="img-fluid bg-img" src="../assets/images/gallery/4.jpg" alt="portfolio-image" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="status">
            <div class="collapse-block ">
              <h5 class="block-title">
                <span style="padding-right: 5px;">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </span> &nbsp; &nbsp; {{ $t('ContactInfo') }}
                <label class="badge badge-outline-dark sm ml-2">3</label>
              </h5>
              <div class="block-content" style="display:none">
                <ul>
                  <li>
                    <h5>
                      <a href="#">
                        <i data-feather="smartphone"></i>+12 3456789587</a>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <a href="https://themeforest.net/user/pixelstrap/portfolio">
                        <i data-feather="crosshair"></i>https://pixelstrap</a>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <a href="#">
                        <i data-feather="map-pin"></i>1766 Fidler Drive Texas, 78238.</a>
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="status other">
            <div class="collapse-block ">
              <h5 class="block-title p-b-25">
                <span style="padding-right: 5px;">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </span> &nbsp; &nbsp;Setting</h5>
              <div class="block-content" style="display:none">
                <ul>
                  <li>
                    <h5>
                      <a href="#">
                        <i data-feather="smartphone"></i>+12 3456789587</a>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <a href="https://themeforest.net/user/pixelstrap/portfolio">
                        <i data-feather="crosshair"></i>https://pixelstrap</a>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <a href="#">
                        <i data-feather="map-pin"></i>1766 Fidler Drive Texas, 78238.</a>
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <aside class="chitchat-right-sidebar" id="slide-menu">
        <div class="custom-scroll right-sidebar">
          <div class="contact-profile">
            <div class="theme-title">
              <div class="media">
                <div class="media-body text-right">
                  <a class="close-profile ml-3" href="#">
                    <x-icon size="1x" class="custom-class"></x-icon>
                  </a>
                </div>
                <div>
                  <!-- <h6>{{ $t('Personal Information') }}</h6> -->
                </div>

              </div>
            </div>
            <div class="details">
              <div class="contact-top profile" v-bind:class="{ online: singlefriend.pStatus == 0, unreachable : singlefriend.pStatus == 1, busy: singlefriend.pStatus == 2, offline: singlefriend.pStatus == 3, offline: singlefriend.pStatus == 4 }">
                <img class="bg-img" v-if="singlefriend.user_image" style="min-height: 121px;" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar"  />
                <div v-else  class="user profile" style="background: #2c3550;width: 110px;height: 118px;border-radius: 46px;">
                   <span style="color: white;z-index: 9;font-size: 29px !important;"> {{getFirstLetter(singlefriend.name)}}</span>
                </div>
              </div>
              <div class="name">
                <h3>{{singlefriend.name}}</h3>
              </div>

            </div>
          </div>
          <div class="document">
            <div class="filter-block">
              <div class="collapse-block">
                <h5 class="block-title" @click="markChat()">
                  <span style="padding-right: 5px;">
                    <i class="fa fa-files-o" aria-hidden="true"></i>
                  </span> &nbsp; &nbsp; {{ $t('Bookmarked Messages') }}
                </h5>
                <div class="block-content" id="bookmarkshow" style="display:none">
                  <template v-if="bookmarkChat.length > 0">
                 <ul class="chatappend" v-for="chat,index in bookmarkChat">
                
                <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 30px;">
                  <span>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>
<!--   && (chat.deletedBy.length == 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1])   -->
                 <!-- <span>{{ chat.deletedBy.length }}</span> -->
                <li class="replies" style="padding-bottom:20px" v-else-if="chat.senderId._id == c_user._id">
                  <div class="media">
                    <div class="profile mr-4" style="margin-right: 0.5rem!important;">
                       <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar"  />
                     <div v-else  class="userprofile"  >
                       <span style="z-index: 0;"> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                  </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h6>{{ c_user.name}}</h6>
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                        
                        <ul class="msg-box">
                          <li class="msg-setting-main">
            

               &nbsp; <h5 v-if="chat.isDeleted == 1" :id="'sender'+chat._id">{{ $t('messagedeleted') }}</h5>
                            <h6 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 &&  chat.chatType == 0" :id="'sender'+chat._id">{{ chat.message }}</h6>
                            <h6 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'sender'+chat._id">
                              <span style="border-bottom: 1px solid;"><template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h6>
                            <br>

                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank"  :id="'sender'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+chat.message" style="width:100px">
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
                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                              <div class="msg-setting" :id="'msg-settingb'+chat._id" @click="msg_settingb(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>

                              <div class="msg-dropdown" :id="'msg-dropdownb'+chat._id" style="z-index: 99999;top:15px">
                                <ul>
                                 
                                  <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon>{{ $t('Download') }}
                                    </a>
                                </li>
                                 <li>
                                    <a href="#" @click="forward(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                  <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarkedlist(chat,'chat',index)">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                 

                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                 
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
                  <!-- v-if="(chat.deletedBy.length != 0 || (c_user._id != chat.deletedBy[0] && c_user._id != chat.deletedBy[1]) )"  -->
                 <div >
                  <div class="media">
                    <div class="profile mr-4" style="margin-right: 0.5rem!important;">
                       <img class="bg-img" v-if="singlefriend.user_image" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                     <div v-else  class="userprofile">
                       <span style="z-index: 0;" > {{getFirstLetter(singlefriend.name)}}</span>
                    </div> 
                    </div>
                    <div class="media-body">
                      <div class="contact-name">
                        <h6>{{ singlefriend.name }}</h6>
                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                         
                        <ul class="msg-box">
                          <li class="msg-setting-main">
                       
                            <h6 v-if="chat.isDeleted == 1" :id="'receiver'+chat._id">{{ $t('messagedeleted') }}</h6>
                            <h6 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.messageType != 6 && chat.messageType != 5 && chat.chatType == 0" :id="'receiver'+chat._id">{{ chat.message }} </h6>
                            <h6 v-else-if="chat.messageType != 1 && chat.messageType != 2 && chat.messageType != 3 && chat.chatType == 1" :id="'receiver'+chat._id">
                              <span style="border-bottom: 1px solid;">
                              <template v-if="chat.commentId.messageType == 6">‘‘<mic-icon size="1.5x" class="custom-class"></mic-icon> Voice Message’’</template> <template v-else>‘‘{{chat.commentId.message}}’’</template></span><br> {{ chat.message }}</h6>
                            <br>
                            <a :href="hostname+'/images/chatImages/'+chat.message" target="_blank" :id="'receiver'+chat._id" v-if="chat.messageType == 1 && chat.isDeleted != 1" download>
                              <img :src="hostname+'/images/chatImages/'+chat.message" style="width:100px">
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
                              <div class="msg-setting" :id="'msg-settingb'+chat._id" @click="msg_settingb(chat._id)">
                                <i class="ti-more-alt"></i>
                              </div>
                              <div class="msg-dropdown" :id="'msg-dropdownb'+chat._id" style="z-index: 99999;top:15px">
                                <ul>
                                  <!--<li v-if="chat.messageType != 1 && chat.messageType != 2"><a href="#" @click="eidtchat(chat._id,chat.message)"><i class="fa fa-pencil" ></i>{{ $t('Edit') }}</a></li>-->
                                   <li>
                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon> {{ $t('Download') }}
                                    </a>
                                </li>
                                 <li>
                                    <a href="#" @click="forward(chat)">
                                      <i class="fa fa-share"></i>{{ $t('Forward') }}</a>
                                  </li>
                                    <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                    <a href="#" @click="bookmarked(chat,'chat')">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                  </li>
                                   <li v-else>
                                    <a href="#" @click="removebookmarkedlist(chat,'chat',index)">
                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                  </li>
                                

                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                      <i class="fa fa-clone"></i>copy</a>
                                  </li>
                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                  <!--<li><a href="#" @click="msgdelete(chat._id)"><i class="ti-trash"></i>delete</a></li>-->
                                </ul>
                              </div>
                            </div>

                          </li>
                      
                        </ul>
                      </div>
                    </div>
                  </div>

                 </div>
                </li>

              </ul>
            </template>
            <template v-else>
              <p style="text-align:center">No Message</p>
            </template>
                </div>
              </div>
            </div>
          </div>
      

          <div class="status other">
            <div class="collapse-block ">
              <h5 class="block-title p-b-25" @click="showsetting()">
                <span style="padding-right: 5px;">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </span> &nbsp; &nbsp;Setting</h5>
              <div class="block-content" id="showsetting" style="display:none">
                <ul class="document-list" style="display:grid">
                     <li class="closeprofile" @click="deleteChat()" style="padding-left: 0px;cursor:pointer;display: flex;">
                          
                              <trash-2-icon size="1.0x" class="custom-class" style="margin-right: 5px;"></trash-2-icon>
                         
                         &nbsp;<h6>{{ $t('DeleteChat') }}</h6>
                        </li>
                       
                        <li class="closeprofile" @click="blockUser(singlefriend._id,1,0)" style="padding-left: 0px;cursor:pointer;display: flex;"> 

                            <img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  />&nbsp;
                          
                          <h6 >{{ $t('BlockUsers') }}</h6>
                        </li>
                        <li class="closeprofile" @click="hideUser(singlefriend._id,1,0)" style="padding-left: 0px;cursor:pointer;display: flex;"> 

                            <slash-icon size="1.0x" class="custom-class" style="margin-right: 5px;"></slash-icon>&nbsp;
                         
                          <h6 >Hide User</h6>
                        </li>

                </ul>
              </div>
            </div>
          </div>

        </div>
      </aside>
      <aside class="app-sidebar active" id="rightside" style="display:none">
        <div class="apps">
          <ul class="apps-ul">
            <li id="todo">
              <div class="todo-main">
                <div class="theme-title">
                  <div class="media">
                    <div>
                      <h2>Todo</h2>
                      <h4>{{ $t('createyourtask') }}</h4>
                    </div>
                    <div class="media-body media-body text-right">
                      <a class="icon-btn btn-sm btn-outline-light close-apps" href="javascript:void(0);">
                        <x-icon size="1.5x" class="custom-class"></x-icon>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="todo-name">
                  <form class="default-form">
                    <select class="custom-scroll" name="support[support_type]">
                      <option>All Conversations</option>
                      <option>Josephin water</option>
                      <option>Jony Lynetin</option>
                      <option>Sufiya Elija</option>
                      <option>Mukrani Pabelo</option>
                      <option>Jhon Deo</option>
                    </select>
                  </form>
                </div>
                <div class="todo-tab theme-tab custom-scroll">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a class="nav-link button-effect active show" data-toggle="pill" href="#todo1">{{ $t('All') }}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link button-effect" data-toggle="pill" href="#todo2">My to-dos</a>
                    </li>
                    <li>
                      <a class="icon-btn btn-light button-effect btn-sm" data-toggle="modal" data-target="#todoModal" data-keyboard="false" data-backdrop="static">
                        <plus-icon size="1.5x" class="custom-class"></plus-icon>
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active show" id="todo1">
                      <div class="tab-card text-left">
                        <div class="todo-task">
                          <h4>Designer Discussion </h4>
                          <div class="todo-main-content">
                            <div class="input-text">
                              <input type="checkbox" aria-label="Checkbox for following text input" />
                              <input id="user_input12" type="text" name="todo-text" placeholder="Give me review on our side" />
                            </div>
                            <div class="drop-picker">
                              <div class="dropdown currency" tabindex="1">
                                <div class="select">
                                  <span>{{ $t('AssignTO') }}</span>
                                </div>
                                <input type="hidden" name="currency" />
                                <ul class="dropdown-menu">
                                  <li class="dropdown-divider">
                                    <div class="fa fa-user"></div>
                                    <h5 class="text-muted">{{ $t('AssignTO') }}</h5>
                                  </li>
                                  <li>
                                    <a href="#">Josephin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Lynetin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Sufiya john</a>
                                  </li>
                                  <li>
                                    <a href="#">Jhon john</a>
                                  </li>
                                </ul>
                              </div>
                              <input class="datepicker-here form-control digits" type="url" data-language="en" placeholder="Due date" />
                            </div>
                          </div>
                          <div class="todo-list">
                            <div class="element" id="div_3">
                              <span class="add add-to-do">Add-To-Do</span>
                            </div>
                          </div>
                          <div class="todo-main-content">
                            <div class="input-text">
                              <input type="checkbox" aria-label="Checkbox for following text input" />
                              <input id="user_input13" type="text" name="todo-text" placeholder="Redesign Your Design" />
                            </div>
                            <div class="drop-picker">
                              <div class="dropdown currency" tabindex="1">
                                <div class="select">
                                  <span>{{ $t('AssignTO') }}</span>
                                </div>
                                <input type="hidden" name="currency" />
                                <ul class="dropdown-menu">
                                  <li class="dropdown-divider">
                                    <div class="fa fa-user"></div>
                                    <h5 class="text-muted">{{ $t('AssignTO') }}</h5>
                                  </li>
                                  <li>
                                    <a href="#">Josephin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Lynetin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Sufiya john</a>
                                  </li>
                                  <li>
                                    <a href="#">Jhon john</a>
                                  </li>
                                </ul>
                              </div>
                              <input class="datepicker-here form-control digits" type="url" data-language="en" placeholder="Due date" />
                            </div>
                          </div>
                          <div class="todo-list">
                            <div class="element" id="div_2">
                              <span class="add add-to-do">Add-To-Do</span>
                            </div>
                          </div>
                          <div class="todo-main-content">
                            <div class="input-text">
                              <input type="checkbox" aria-label="Checkbox for following text input" />
                              <input id="user_input14" type="text" name="todo-text" placeholder=" Complete Project report" />
                            </div>
                            <div class="drop-picker">
                              <div class="dropdown currency" tabindex="1">
                                <div class="select">
                                  <span>{{ $t('AssignTO') }}</span>
                                </div>
                                <input type="hidden" name="currency" />
                                <ul class="dropdown-menu">
                                  <li class="dropdown-divider">
                                    <div class="fa fa-user"></div>
                                    <h5 class="text-muted">{{ $t('AssignTO') }}</h5>
                                  </li>
                                  <li>
                                    <a href="#">Josephin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Lynetin john</a>
                                  </li>
                                  <li>
                                    <a href="#">Sufiya john</a>
                                  </li>
                                  <li>
                                    <a href="#">Jhon john</a>
                                  </li>
                                </ul>
                              </div>
                              <input class="datepicker-here form-control digits" type="url" data-language="en" placeholder="Due date" />
                            </div>
                          </div>
                          <div class="todo-list">
                            <div class="element" id="div_1">
                              <span class="add add-to-do">Add-To-Do</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="todo2">
                      <div class="converstaion-docs tab-card">
                        <i class="fa fa-sticky-note-o"></i>
                        <h5 class="mb-3">No Open To-Dos Here </h5>
                        <a class="btn btn-primary btn-sm" data-toggle="modal" data-target="#createtodoModal">Create A To-Do</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li id="notes">
              <div class="notes-main">
                <div class="theme-title">
                  <div class="media">
                    <div>
                      <h2>Notes</h2>
                      <h4>Notes List</h4>
                    </div>
                    <div class="media-body media-body text-right">
                      <a class="icon-btn btn-sm btn-outline-light close-apps" href="javascript:void(0);">
                        <x-icon size="1.5x" class="custom-class"></x-icon>
                      </a>
                    </div>
                  </div>
                </div>
                <form class="default-form">
                  <div class="form-group notes-content">
                    <select>
                      <option>Contact Or Channel</option>
                      <option>Weekdays (Mon-Fri)</option>
                      <option>{{ $t('daily') }}</option>
                      <option>Weekly (Custom)</option>
                    </select>
                    <ul>
                      <li>
                        <a class="icon-btn btn-light button-effect btn-sm" data-toggle="modal" data-target="#notesModal">
                          <plus-icon size="1.5x" class="custom-class"></plus-icon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </form>
                <div class="notes-list">
                  <h6 class="mb-2 text-muted">Joshephin Water.10 Jan</h6>
                  <div class="media"><img class="img-fluid mr-3" src="../assets/images/file_icons/5.png" alt="media-img" />
                    <div class="media-body">
                      <h5 class="mt-0">Joshephin Water</h5>
                    </div>
                  </div>
                  <h5 class="mb-2">Imporatnt project link</h5>
                  <h6 class="mb-2">Please start testing task of your projects.</h6>
                  <div class="forward-main">
                    <a class="line fa fa-mail-forward" href="#">{{ $t('Forward') }}</a>
                  </div>
                </div>
              </div>
            </li>
            <li id="reminder">
              <div class="reminder-main">
                <div class="theme-title">
                  <div class="media">
                    <div>
                      <h2>Reminders</h2>
                      <h4>Set reminders</h4>
                    </div>
                    <div class="media-body media-body text-right">
                      <a class="icon-btn btn-sm btn-outline-light close-apps" href="javascript:void(0);">
                        <x-icon size="1.5x" class="custom-class"></x-icon>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="reminder-content tab-card">
                  <i class="ti-alarm-clock"></i>
                  <p>Never forget important tasks. Set personal and group reminders.</p>
                  <a class="setreminder btn btn-primary button-effect btn-sm" data-toggle="modal" data-target="#setReminder">set reminder</a>
                </div>
                <div class="reminder-list-disp">
                  <h5>Themeforest Discusssion</h5>
                  <h6>Project Discussion</h6>
                  <span>11:22 PM | 15 FAB</span>
                  <ul class="reminder-disp">
                    <li class="reminder-list-toggle">
                      <a class="icon-btn bg-transparent" href="#">
                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                      </a>
                      <div class="reminder-contentlist-toggle">
                        <ul>
                          <li>
                            <a class="icon-btn btn-sm" href="#">
                              <i data-feather="trash"></i>
                            </a>
                            <h5>{{ $t('Delete') }}</h5>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="reminder-list">
                  <button class="Show-reminder">Show Completed</button>
                  <button class="Hide-reminder">Hide Completed</button>
                  <div class="target-reminder-list">
                    <h5>Session Start</h5>
                    <h6>Project Discussion</h6>
                    <h6>05:22 PM | 1 JAN</h6>
                    <ul class="reminder-disp">
                      <li class="reminder-toggle">
                        <a class="icon-btn bg-transparent" href="#" data-tippy-content="Quick action">
                          <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                        </a>
                        <div class="reminder-content-toggle">
                          <ul>
                            <li>
                              <a class="icon-btn btn-sm" href="#">
                                <i data-feather="trash"></i>
                              </a>
                              <h5>{{ $t('Delete') }}</h5>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="app-list">
          <ul class="app-list-ul custom-scroll">
            <li class="title apps-toggle" id="appall">
              <grid-icon size="1.5x" class="custom-class"></grid-icon>
              <h5>Apps</h5>
            </li>
            <li>
              <a class="icon-btn btn-outline-success btn-sm button-effect" href="javascript:void(0);" @click="files()">
                <file-icon size="1.5x" class="custom-class"></file-icon>
              </a>
              <h5>{{ $t('Files') }} </h5>
            </li>
            <li>
              <a class="icon-btn btn-outline-primary btn-sm button-effect" href="javascript:void(0);" @click="notes()">
                <book-icon size="1.5x" class="custom-class"></book-icon>
              </a>
              <h5>Notes </h5>
            </li>
            <li>
              <a class="icon-btn btn-outline-danger btn-sm button-effect" href="javascript:void(0);" @click="todo()">
                <list-icon size="1.5x" class="custom-class"></list-icon>
              </a>
              <h5>Todo </h5>
            </li>
            <li>
              <a class="icon-btn btn-outline-warning btn-sm button-effect" href="javascript:void(0);" @click="reminder()">
                <clock-icon size="1.5x" class="custom-class"></clock-icon>
              </a>
              <h5>Reminder</h5>
            </li>

            <!--  <li class="close-app"><a class="icon-btn btn-danger" href="#" onclick="removedefault()"><x-icon size="1.5x" class="custom-class"></x-icon></a>
                      <h5>close</h5>
                    </li> -->
          </ul>
        </div>
      </aside>

                 <!-- MEETING -->

       <div id="meeting" style="width:100%;background-color: #f3f6ff; display:none">

      <div class="row meetingRow d-none d-sm-flex" >
        <div class="col col-md-2" style="margin-top: 3px;">
          <img class="chatIcons" style="width: 35px!important;
    padding-right: 10px;" src="../assets/images/icons/svg/Meeting-2.svg" alt="Avatar"  />
          <span style="font-size: 15px;">{{ $t('Meetings') }}</span>
        </div>
        <div class="col col-md-4" style="">
         
           <div class="search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
          <!--   <div style="border-radius: 0px;">
              <div class="input-group">

                <input class="form-control"  type="text" v-model="meetingSearch" placeholder="Search meeting" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col col-md-6">
          <button @click="createMeeting()" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addMeetingmodal" class="btn addMeeting" >
            <span style="color: white;padding-right: 8px;">
              <i class="fa fa-plus" aria-hidden="true"></i></span> 
              <span style="color: white;">{{ $t('CreateMeeting') }} </span>
            </button>
        </div>
      </div>

      <div class="row meetingRow d-flex d-sm-none" >
        <div class="col col-md-7" style="margin-top: 3px;">
          <a class="mobile-sidebar" href="#" @click="appchatNav()" style="color: #2c3550;">
              <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
            </a>&nbsp;
          <img class="" src="../assets/images/icons/meetingUser.png" alt="Avatar" style="height: auto;padding-right: 10px;" />
          <span style="font-size: 15px;">{{ $t('Meetings') }}</span>
        </div>
    
        <div class="col col-md-5">
          <button @click="createMeeting()" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addMeetingmodal" class="btn btn-sm addMeeting" >
            <span style="color: white;padding-right: 8px;">
              <i class="fa fa-plus" aria-hidden="true"></i></span> 
              <span style="color: white;">{{ $t('CreateMeeting') }}</span>
            </button>
        </div>

      </div>
      <div class="row d-flex d-sm-none" style="background: white;">
          <div class="col search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
            <div>
              <div class="input-group">

                <input class="form-control" v-model="meetingSearch" type="text" placeholder="Search meeting" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col col-md-4" style="background-color: white;margin-left: 15px;padding:0px">
          <div class="theme-tab tab-sm meeting-tabs" style="border-top: 1px solid #eaeef8;border-bottom: 1px solid #eaeef8;padding-top: 16px;">
            <ul class="nav nav-tabs">
            <li class="nav-item" style="width:50%">
             <a id="up-meeting" @click="getUpcommingMeetings()" data-toggle="tab" href="#upmeeting" role="tab" aria-controls="upmeeting" aria-selected="true" class="nav-link button-effect active">{{ $t('UpcommingMeeting') }}</a>
            </li>
            <li class="nav-item" style="width:50%">
              <a id="complete-meeting" @click="getCompleteMeetings()" data-toggle="tab" href="#completemeeting" role="tab" aria-controls="completemeeting" aria-selected="true" class="nav-link button-effect ">{{ $t('CompletedMeeting') }}</a>
            </li>
          </ul>          
         </div>

              <div class="tab-content meetingContent custom-scroll">
                <div id="upmeeting"  class="tab-pane active">

                  <template v-if="meetingsData.length != 0 && meetingshowRoom">
                  <div  v-for="meetings in meetingsData" :id="meetings._id" @click="openMeeting(meetings)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
                  <div class="col-2" style="text-align: center;">
                    <div>
                    <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(meetings.meeting_title)}}</span>
                    </div>
                  </div>
                  </div>
                  <div class="col col-6">
                    <p>{{meetings.meeting_title}}</p>
                    <p>{{isToday(meetings.meeting_date)}}  {{meetings.meeting_time}}</p>
                  </div>
                  <div class="col col-4 meetingUser" >
                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }} </h6>
                          <div class="usersprof">
                          	   <template v-for="members,index in meetings.meeting_members" v-if="index < 4">
                                <div class="profile">
                              <div class="usersCount" :title="meetings.meeting_members[index]">{{getFirstLetter(meetings.meeting_members[index])}}</div>
                            </div>
                            </template>
                             <template v-for="members,index in meetings.friend_members" v-if="index < 4">
                             	 <div  v-if="members.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                               </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                             </div>
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{meetings.meeting_members.length + meetings.friend_members.length}}</div>
                            </div>

                           
                          </div>
                  </div>
                </div>
                </template>

                 <template v-else-if="filteredMeetinglist.length != 0 && meetingmeetingSearching">
                  <div  v-for="meetings in filteredMeetinglist" :id="meetings._id" @click="openMeeting(meetings)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
                  <div class="col-2" style="text-align: center;">
                    <div>
                    <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(meetings.meeting_title)}}</span>
                    </div>
                  </div>
                  </div>
                  <div class="col col-6">
                    <p>{{meetings.meeting_title}}</p>
                    <p>{{isToday(meetings.meeting_date)}}  {{meetings.meeting_time}}</p>
                  </div>
                  <div class="col col-4 meetingUser" >
                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }} </h6>
                          <div class="usersprof">
                          	   <template v-for="members,index in meetings.meeting_members" v-if="index < 4">
                                <div class="profile">
                              <div class="usersCount" :title="meetings.meeting_members[index]">{{getFirstLetter(meetings.meeting_members[index])}}</div>
                            </div>
                            </template>
                             <template v-for="members,index in meetings.friend_members" v-if="index < 4">
                             	 <div  v-if="members.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                               </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                             </div>
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{meetings.meeting_members.length + meetings.friend_members.length}}</div>
                            </div>

                           
                          </div>
                  </div>
                </div>
                </template>
                 <div style="padding: 73px;text-align: center;margin-top: 65px;" v-else>
                    <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                    <p>{{ $t('YouDontHaveAMeeting') }}<br>
                        {{ $t('PleaseCreateMeetingAndExploreChatto') }}</p>
                    
                  </div>
            
                </div>
                <div id="completemeeting" class="tab-pane fade"><br>
                	<template v-if="completemeetingsData.length != 0">
                   <div  v-for="meetings in completemeetingsData" :id="meetings._id" @click="openMeeting(meetings)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
                  <div class="col col-2" style="text-align: center;">
                    <div>
                    <div  class="profile" style="width: 56px;height: 56px;">
                     <span> {{getFirstLetter(meetings.meeting_title)}}</span>
                    </div>
                  </div>
                  </div>
                  <div class="col col-md-6">
                    <p>{{meetings.meeting_title}}</p>
                    <p>{{isToday(meetings.meeting_date)}} {{meetings.meeting_time}}</p>
                  </div>
                  <div class="col-4 meetingUser" >
                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
                           <div class="usersprof">
                          	   <template v-for="members,index in meetings.meeting_members" v-if="index < 4">
                                <div class="profile">
                              <div class="usersCount" :title="meetings.meeting_members[index]">{{getFirstLetter(meetings.meeting_members[index])}}</div>
                            </div>
                            </template>
                             <template v-for="members,index in meetings.friend_members" v-if="index < 4">
                             	<div  v-if="meetings.friend_members[index].user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+meetings.friend_members[index].user_image" alt="Avatar" :title="meetings.friend_members[index].name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="meetings.friend_members[index].name">{{getFirstLetter(meetings.friend_members[index].name)}}</div>
                            </div>
                             
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{meetings.meeting_members.length + meetings.friend_members.length}}</div>
                            </div>
                          </div>
                  </div>
                </div>
                </template>
                <div style="padding: 73px;text-align: center;margin-top: 60px;" v-else>
                            <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('YouDontHaveAMeeting') }}<br>
                                {{ $t('PleaseCreateMeetingAndExploreChatto') }}</p>
                            
                          </div>
                </div>
               
              </div>
                </div>

        <div class="col col-md-7" id="landMeeting">
	       <div class="row" style="margin-top: 157px;text-align: center;background: white;padding: 30px;margin-left: 70px;">
              <div class="col col-md-12" style="">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col col-md-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">

                  <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px;">
                       <span style="z-index: 9;"> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col col-md-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" @click="createMeeting()" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addMeetingmodal" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('Meetings') }} </button>
                  <p>{{ $t('PleaseCreateMeetingAndExploreChatto') }}</p>
                </div>

              </div>
            </div>
	
           </div>

                <div class="col col-md-8" id="startMeeting" style="max-width: 64.66667%;display:none" >
                  <div class="row mb" style="margin-top: 11px;border-bottom: 1px solid #cbd3ef99;">
                     <div class="col col-md-1">
                     <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(singleMeeting.meeting_title)}}</span>
                    </div>
                  </div>
                  <div class="col col-md-5 pr-0">
                    <p>{{singleMeeting.meeting_title}}</p>
                    <p>{{ $t('Date') }}: {{isToday(singleMeeting.meeting_date)}} {{ $t('TimeHolding') }}: {{singleMeeting.meeting_time}}</p>
                  </div>

                      <div class="col col-md-6">
                        <div class="row" >  
                          <div class="col-6" style="margin-top: 17px;">
                           
                          </div>
                        
                        <!--  <div class="col-2" style="margin-top: 17px;">
                            <span><img class="" src="../assets/images/nav/dots.png" alt="Avatar" style="height: auto;" /></span>
                            </div> -->
                          </div>
                   </div>
                    </div>

                    <div class="row" style="margin-top: 15px;overflow-y: scroll;max-height: calc(83vh - 99px);min-height: calc(83vh - 70px);">
                      <div class="col col-md-8" >
                       
                        <div class="col col-md-12 meetingTopic">
                           <p>{{ $t('MeetingTopic') }}:</p>
                           <p>{{singleMeeting.meeting_topic}}</p>
                        </div>
                         <div class="col col-md-12" style="background-color:white;margin-bottom: 12px;">
                          <div class="row" style="padding-top: 13px;padding-bottom: 9px;">
                           <div class="col col-md-1">
                             <img class="" src="../assets/images/icons/attach.png" alt="Avatar" style="height: auto;border-radius: 0;" /> 
                             
                           </div>
                           <div class="col col-md-10 url_custom" style="border-left: 1px solid gainsboro;height: 15px;">
                             <p>URL: <span> https://chat.chatto.jp/meeting?meetingId={{singleMeeting.meeting_id}}</span></p>
                           </div>
                           <div class="col col-md-1">
                           	 <a href="#" @click="copymsg('https://chat.chatto.jp/meeting?meetingId='+singleMeeting.meeting_id)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                             <clipboard-icon size="1.5x" style="float: right;color: #BAC5E9;" class="custom-class"></clipboard-icon></a>
                         </div>
                           </div>
                        </div>
                         <div class="col col-md-12 meetingTopic">
                            <div class="row" style="padding-top: 14px;padding-bottom: 9px;">
                           <div class="col col-md-1">
                            <img class="chatIcons" src="../assets/images/icons/svg/ID.svg" alt="Avatar" style="width: 22px!important;" />
                             
                           </div>
                           <div class="col col-md-9" style="border-left: 1px solid gainsboro;height: 15px;">
                             <p>{{ $t('MeetingID') }}: <span> {{singleMeeting.meeting_id}}</span></p>
                           </div>
                           <div class="col col-md-2">
                         <a href="#" @click="copymsg(singleMeeting.meeting_id)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                             <clipboard-icon size="1.5x" style="float: right;color: #BAC5E9;" class="custom-class"></clipboard-icon>
                         </a>
                         </div>
                           </div>
                        </div>
                         <div class="col col-md-12 meetingTopic" style="margin-bottom: 40px;">
                           <div class="row" style="padding-top: 14px;padding-bottom: 9px;">
                           <div class="col col-md-1">
                             <img class="" src="../assets/images/icons/batch.png" alt="Avatar" style="height: auto;border-radius: 0;" /> 
                             
                           </div>
                           <div class="col col-md-9" style="border-left: 1px solid gainsboro;height: 15px;">
                             <p>{{ $t('Password') }}: <span> {{singleMeeting.meeting_password}}</span></p>
                           </div>
                           <div class="col col-md-2">
                             <a href="#" @click="copymsg(singleMeeting.meeting_password)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                             <clipboard-icon size="1.5x" style="float: right;color: #BAC5E9;" class="custom-class"></clipboard-icon>
                         </a>
                         </div>
                           </div>
                        </div>
                         <div class="col col-md-12 meetingTopic" style="margin-bottom: 40px;">
                        <div class="row" style="padding-top: 4px;padding-bottom: 9px;">
                         <div class="col-1">
                           <img class="rounded-0 h-auto" src="../assets/images/icons/document.png" alt="Avatar" style="border-radius: 0;" /> 

                         </div>
                         <div class="col-11" style="border-left: 1px solid gainsboro;height: auto;">
                           <p>{{ $t("Files") }}
                             <input type="file" id="addmeetFile" @change="addMeetingFile($event)" ref="meetingFile" style="display:none" multiple>
                                <label v-if="singleMeeting.createdBy == current_User._id" for="addmeetFile" style="
                                cursor: pointer;float:right"><i style="padding-right: 6px;font-size: 18px;" class="fa fa-plus" aria-hidden="true"></i></label>
                           </p>
                           
                            </div>

                          <div class="col-md-11 offset-md-1" v-for="meetFile in singleMeeting.meeting_file" style="">
                              <a v-if="singleMeeting.meeting_file" :href="hostname+'images/chatImages/'+meetFile.filename" target="_blank">{{meetFile.filename}} </a>
                            <label v-if="singleMeeting.meeting_file" @click="removeMeetingfile(meetFile._id)" style="
                                cursor: pointer;float:right"><img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  ></label>

                              

                          </div>

                       </div>
                     </div>

                         <div class="col col-md-12 meetingTopic" v-if="singleMeeting.recorded_file" style="margin-bottom: 40px;">
                          <div class="row" style="padding-top: 14px;padding-bottom: 9px;">
                            <div class="col col-md-1">
                             <img class="chatIcons" src="../assets/images/icons/svg/Records-File.svg" alt="Avatar" />
                            </div>

                            <div class="col col-md-9" style="border-left: 1px solid gainsboro;height: 15px; display: flex;">
                             <p>{{ $t("Record") }}</p>
                             <a style="margin-left: 5px" :href=" 'https://chat.chatto.jp:22000/images/chatImages/' + singleMeeting.recorded_file"> {{singleMeeting.recorded_file}} </a>
                            </div>
                          </div>
                        </div>
                         <div class="col col-md-6 meetingUser">                
                          <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
                             <div class="usersprof">
                               <template v-for="members,index in singleMeeting.meeting_members" v-if="index < 4">
                                <div class="profile">
                              <div class="usersCount" :title="singleMeeting.meeting_members[index]">{{getFirstLetter(singleMeeting.meeting_members[index])}}</div>
                            </div>
                            </template>
                             <template v-for="members,index in singleMeeting.friend_members" v-if="index < 4">
                              <div  v-if="singleMeeting.friend_members[index].user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+singleMeeting.friend_members[index].user_image" alt="Avatar" :title="singleMeeting.friend_members[index].name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="singleMeeting.friend_members[index].name">{{getFirstLetter(singleMeeting.friend_members[index].name)}}</div>
                            </div>
                             
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{membersCount}}</div>
                            </div>
                                <div v-if="meetingType=='Upcomming' && singleMeeting.createdBy == current_User._id" @click="editMeeting(singleMeeting)" class="addMeetingPar"  >
                              <div class="" style="padding: 3px;color: #6F66FF;">
                                <plus-icon size="1.5x" class="custom-class"></plus-icon>
                              </div>
                            </div>
                          </div>

                           <div style="margin-top: 40px;">
                          <div class="" v-for="(friends, index) in singleMeeting.friend_members" :key="friends._id" >
                         <div style="display: inline-flex;">
                             <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                          <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
                        </div>
                        
                        </div>
    


                        <div class="" v-for="(friends, index) in singleMeeting.meeting_members" >
                         <div style="display: inline-flex;">
                          
                                <div class="profile">
                                
                                  <div class="userprofile" >
                                 <span> {{getFirstLetter(friends)}}</span>
                              </div>
                                </div>
                          <p style="margin-top: 11px;padding-left: 9px;">{{friends}}</p>
                        </div>
                        
                        </div>
                      </div>
                        </div> 

                     <!--    <div class="col col-md-12" style="padding-left: 0px;padding-right: 0px;">
                           <div class="document">
                          <div class="filter-block">
                            <div class="collapse-block open">
                              <h5 class="block-title">Advance Options
                                
                              </h5>
                              <div class="block-content">
                                <div class="col col-md-12" style="background-color: white;padding: 12px;margin-bottom: 12px;">
                                 <span>Enable Video</span>
                                  <span style="float:right">
                                  <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                  </label>
                                </span>
                                </div>
                                
                                <div class="col col-md-12" style="background-color: white;padding: 12px;margin-bottom: 12px;margin-top: 12px;">
                                   <span>Record Meeting</span>
                                  <span style="float:right">
                                  <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                  </label>
                                </span>
                                </div>
                                <div class="col col-md-12" style="background-color: white;padding: 12px;margin-bottom: 12px;margin-top: 12px;">
                                   <span>Allow others to invite / add to meeting</span>
                                  <span style="float:right">
                                  <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider round"></span>
                                  </label>
                                </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          
                        </div> -->
                      </div>

                      <div class="col col-md-4">
                        <div class="row">
                          <div class="col col-md-12" style="background-color: white;text-align:center;margin-bottom: 20px;">
                            <div style="width: 100%;margin-top: 10px;height: 50px;background-color: aliceblue;">
                                <img class="" src="../assets/images/icons/schdule.png" alt="Avatar" style="height: auto;border-radius: 0;position: absolute;top: 17px;right: 123px;" /> 
                            </div>
                            <div class="meetingUser" style="margin-top: 40px; margin-bottom: 19px;">

                              <p>{{ $t('Date') }}: {{isToday(singleMeeting.meeting_date)}}</p>
                              
                            </div>
                            
                          </div>
                          <div class="col col-md-12" style="background-color: white;text-align:center;margin-bottom: 20px;">
                            <div style="width: 100%;margin-top: 10px;height: 50px;background-color: aliceblue;">
                                <img class="" src="../assets/images/icons/clock.png" alt="Avatar" style="height: auto;border-radius: 0;position: absolute;top: 19px;right: 125px;" /> 
                            </div>
                            <div class="meetingUser" style="margin-top: 40px; margin-bottom: 19px;">

                              <p>{{ $t('TimeHolding') }}: {{singleMeeting.meeting_time}}</p>
                            
                            </div>
                            
                          </div>
                         
                        </div>
                      </div>

                    </div>

                  <div class="row" style="margin-top: 0px; border-top: 1px solid rgba(203, 211, 239, 0.6);padding: 5px;">
                    <div class="col col-md-4">
                      <div class="row" style="margin-top: 14px;" v-if="singleMeeting.createdBy == current_User._id">
                    <div class="col col-md-3" @click="editMeeting(singleMeeting)" style="cursor: pointer;padding-right: 0;padding-left: 0;">
                   <img class="chatIcons" src="../assets/images/icons/svg/Edit.svg" alt="Avatar" /> <span> {{ $t('Edit') }}</span>
                  </div>
                  <div class="col col-md-4" v-if="meetingType=='Upcomming'" @click="editinviteMeeting(singleMeeting)" style="border-left: 1px solid #BAC5E9; height: 20px;padding-right: 0; padding-left: 10px;cursor: pointer;">
                      <img class="chatIcons" src="../assets/images/icons/svg/Invite.svg" alt="Avatar" />
                     <span> {{ $t('Invite') }}</span>
                  </div>
                  <div class="col col-md-5" @click="removeMeeting(singleMeeting)" style="border-left: 1px solid #BAC5E9;height: 20px;cursor: pointer;"> <img class="chatIcons" src="../assets/images/icons/svg/close.svg" alt="Avatar" />
                     <span style="color:#B70A0A;">{{ $t('Cancel') }}</span>
                  </div>
                  </div>
                  </div>
                  <div class="col-md-3" style="margin-top: 17px;">
                    <a href="#" v-if="singleMeeting.createdBy == current_User._id" @click="copymsg('Meeting URL=https://chat.chatto.jp/meeting?meetingId='+singleMeeting.meeting_id+', Meeting Id='+singleMeeting.meeting_id+', Meeting Password='+singleMeeting.meeting_password)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                     {{ $t('CopyMeeting') }}</a>
                  </div>
                      <div class="col col-md-5">
                      	<template v-if="meetingType=='Upcomming'">
                      		<!-- {{singleMeeting.createdBy}} {{current_User._id}} -->
                      		<template v-if="singleMeeting.createdBy == current_User._id">
                      			 <button  class="btn addMeeting" @click="meetingStatus()">
                            	  <span style="color: white;">{{ $t('StartMeeting') }}</span>
                               
                              </button>
                      		</template>
                      		<template v-else>
                      			 <button v-if="buttonDisable"  class="btn addMeeting" style="margin-top: 9px;" disabled >
						           <span style="color: white;">Join Now </span>
						            </button>
						            <button v-if="buttonEnable" @click="joinMeeting()" class="btn addMeeting" style="margin-top: 9px;"  >
						           <span style="color: white;">Join Now </span>
						            </button>
                      		</template>
                      		
                          </template>
                          <template v-else>
                            <button  class="btn addMeeting" disabled>
                            	  <span style="color: white;">Completed</span>
                               
                              </button>
                      	</template>
                      	
                   </div>
                    </div>

                </div>
      </div>

    </div>
                <!-- MEETING END -->


                 <!-- ROOM -->

       <div id="rooms" style="width:100%;background-color: #f3f6ff; display:none">

      <div class="row meetingRow d-none d-sm-flex" >
        <div class="col col-md-2" style="margin-top: 3px;">
      <img class="chatIcons" style="width: 33px!important;
    padding-right: 10px;" src="../assets/images/icons/svg/Rooms-2.svg" alt="Avatar"  /><span style="font-size: 15px;">{{ $t('RoomCreation') }}</span>
        </div>
        <div class="col col-md-4" style="">
         
           <div class="search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
          <!--   <div style="border-radius: 0px;">
              <div class="input-group">

                <input class="form-control" v-model="roomSearch" type="text" placeholder="Search Room" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col-6 col-md-6">
          <button type="button" class="btn addMeeting" @click="createRoom()"  data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addRoommodal"><span style="color: white;padding-right: 8px;"><i class="fa fa-plus" aria-hidden="true"></i></span> <span style="color: white;">{{ $t('CreateRoom') }} </span></button>
        
            
          
        </div>
      </div>

      <div class="row meetingRow  d-flex d-sm-none" >
        <div class="col col-md-7" style="margin-top: 3px;">
          <a class="mobile-sidebar" href="#" @click="appchatNav()" style="color: #2c3550;">
              <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
            </a>&nbsp;
          <img class="" src="../assets/images/icons/roomUser.png" alt="Avatar" style="height: auto;padding-right: 10px;" /><span style="font-size: 15px;">Room</span>
        </div>

        <div class="col col-md-5">
          <button type="button" class="btn addMeeting"  data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addRoommodal"><span style="color: white;padding-right: 8px;"><i class="fa fa-plus" aria-hidden="true"></i></span> <span style="color: white;">{{ $t('CreateRoom') }} </span></button>
        </div>
      </div>
      <div class="row d-flex d-sm-none" style="background: white;">
       
         <div class="col search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
         <!--  <div style="border-radius: 0px;">
            <div class="input-group">

              <input class="form-control" v-model="roomSearch" type="text" :placeholder="$t('Search ...')" />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <div class="row">
        <div class="col col-md-4" style="background-color: white;margin-left: 15px; padding: 0">
          <div class="theme-tab tab-sm meeting-tabs" style="border-top: 1px solid #eaeef8;border-bottom: 1px solid #eaeef8;padding-top: 16px;">
            <ul class="nav nav-tabs nav-justified room-main-tabs">
            <!-- <li class="nav-item" >
             <a id="up-meeting" data-toggle="tab" href="#allroom" role="tab" aria-controls="allroom" aria-selected="true" class="nav-link button-effect active">{{ $t('All') }}</a>
            </li> -->
            <li class="nav-item" >
             <a id="create-room"  data-toggle="tab" href="#createroom" role="tab" aria-controls="createroom" aria-selected="true" class="nav-link button-effect">{{ $t('CreateRoom') }}</a>
            </li>
            <li class="nav-item" >
              <a id="join-room" data-toggle="tab" href="#joinroom" role="tab" aria-controls="joinroom" aria-selected="true" class="nav-link button-effect ">{{ $t('JoinRoom') }}</a>
            </li>
          </ul>          
         </div>

              <div class="tab-content meetingContent custom-scroll">
                <div id="allroom" class="container tab-pane active">
              
                   <template v-if="roomsData.length != 0 && roomshowRoom">
	                  <div  v-for="(rooms,index) in roomsData" :id="rooms._id" @click="openRoom(rooms,index)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
	                  <div class="col-2" style="text-align: center;">
	                    <div>
	                    <div  class="profile" style="width: 56px;height: 56px;">
	                       <span> {{getFirstLetter(rooms.room_title)}}</span>
	                    </div>
	                  </div>
	                  </div>
	                  <div class="col col-6">
	                    <p>{{rooms.room_title}}</p>
	                    <p>{{rooms.scheduleStartTime}}</p>
	                  </div>
	                  <div class="col col-4 meetingUser" >
	                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
	                          <div class="usersprof">
	                         
	                            <template v-for="members,index in rooms.room_friends" v-if="index < 4">
	                              <div  v-if="members.user_image" class="profile">
	                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
	                                </div>
	                                <div v-else class="profile">
	                                <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
	                              </div>
	                            </template>
	                              
	                            <div class="profile">
	                              <div class="usersCount">{{rooms.room_friends.length}}</div>
	                            </div>
	                          </div>

	                            <div>
	                              <span v-if="rooms.activeStatus == 1" style="color:green">On Going</span>
	                            </div>
	                  </div>
	                </div>
                </template>

                  <template v-else-if="filteredRoomlist.length != 0 && roomroomSearching">
	                  <div  v-for="(rooms,index) in filteredRoomlist" :id="rooms._id" @click="openRoom(rooms,index)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
	                  <div class="col-2" style="text-align: center;">
	                    <div>
	                    <div  class="profile" style="width: 56px;height: 56px;">
	                       <span> {{getFirstLetter(rooms.room_title)}}</span>
	                    </div>
	                  </div>
	                  </div>
	                  <div class="col col-6">
	                    <p>{{rooms.room_title}}</p>
	                    <p>{{rooms.scheduleStartTime}}</p>
	                  </div>
	                  <div class="col col-4 meetingUser" >
	                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
	                          <div class="usersprof">
	                         
	                             <template v-for="members,index in rooms.room_friends" v-if="index < 4">
	                              <div  v-if="members.user_image" class="profile">
	                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
	                              </div>
	                               <div v-else class="profile">
	                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
	                            </div>
	                             
	                            </template>
	                            
	                              
	                            <div class="profile">
	                              <div class="usersCount">{{rooms.room_friends.length}}</div>
	                            </div>

	                          </div>

	                            <div>
	                              <span v-if="rooms.activeStatus == 1" style="color:green">On Going</span>
	                            </div>
	                  </div>
	                </div>
                </template>

                 <div style="padding: 73px;text-align: center;margin-top: 65px;" v-else>
                    <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                    <p>{{ $t('You Dont Have A Room') }} <br>
                     {{ $t('PleaseCreateRoom') }}
                    </p>
                    
                  </div>
                </div>

                <div id="joinroom" class="container tab-pane fade"><br>
                 
                   <template v-if="roomsData.length != 0">
                  <div  v-for="(rooms,index) in roomsData"  v-if="createdBy == c_user._id" @click="openRoom(rooms,index)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
                  <div class="col-2" style="text-align: center;">
                    <div>
                    <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(rooms.room_title)}}</span>
                    </div>
                  </div>
                  </div>
                  <div class="col col-6">
                    <p>{{rooms.room_title}}</p>
                    <p>{{rooms.scheduleStartTime}}</p>
                  </div>
                  <div class="col col-4 meetingUser" >
                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
                          <div class="usersprof">
                         
                             <template v-for="members,index in rooms.room_friends" v-if="index < 4">
                              <div  v-if="members.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                            </div>
                             
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{rooms.room_friends.length}}</div>
                            </div>

                           

                          </div>
                  </div>
                </div>
                </template>
                 <div style="padding: 73px;text-align: center;margin-top: 65px;" v-else>
                            <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have A Room') }} <br>
                             {{ $t('PleaseCreateRoom') }}
                            </p>
                            
                          </div>
                </div>

                <div id="createroom" class="container tab-pane fade"><br>
                 
                   <template v-if="roomsData.length != 0">
                  <div  v-for="(rooms,index) in roomsData" v-if="createdBy != c_user._id"  @click="openRoom(rooms,index)" class="row meetingContentRow"  style="margin-bottom: 12px;margin-top: 12px;padding: 9px;">
                  <div class="col-2" style="text-align: center;">
                    <div>
                    <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(rooms.room_title)}}</span>
                    </div>
                  </div>
                  </div>
                  <div class="col col-6">
                    <p>{{rooms.room_title}}</p>
                    <p>{{rooms.scheduleStartTime}}</p>
                  </div>
                  <div class="col col-4 meetingUser" >
                       <h6 style="font-size: 13px;font-weight: 600;padding: 3px;"> {{ $t('Participants') }}: </h6>
                          <div class="usersprof">
                         
                             <template v-for="members,index in rooms.room_friends" v-if="index < 4">
                              <div  v-if="members.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                            </div>
                             
                            </template>
                            
                              
                            <div class="profile">
                              <div class="usersCount">{{rooms.room_friends.length}}</div>
                            </div>
                          </div>
                  </div>
                </div>
                </template>
                 <div style="padding: 73px;text-align: center;margin-top: 65px;" v-else>
                            <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have A Room') }} <br>
                            {{ $t('PleaseCreateRoom') }}
                            </p>
                            
                          </div>
                </div>
               
              </div>
                </div>

           <div class="col col-md-7" id="landRoom">
             <div class="row" style="margin-top: 157px;text-align: center;background: white;padding: 30px;margin-left: 70px;">
              <div class="col col-md-12" style="">
                <h2 style="text-transform: capitalize;">{{ $t('welcome') }}, {{current_User.name}} </h2>
              </div>
              <div class="col col-md-12" style="margin-top: 35px;">
                <div v-if="current_User.onlineStatus == 1" class="profile mainpanleProfile" v-bind:class="{ online: current_User.pStatus == 0, unreachable : current_User.pStatus == 1, busy: current_User.pStatus == 2, offline: current_User.pStatus == 3, offline: current_User.pStatus == 4 }">

                  <img class="bg-img" v-if="userImageName" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" style="border-radius: 30px;min-height: 64px;" />
                   <div v-else  class="user2 profile" style="width: 63px;height: 63px;">
                       <span style="z-index: 9;"> {{getFirstLetter(c_user.name)}}</span>
                    </div>
                </div>

                <div class="col col-md-12" style="margin-top: 21px;">
                  <button type="button" class="btn btn-default" @click="createRoom()" data-toggle="modal" data-keyboard="false" data-backdrop="static" data-target="#addRoommodal" style="cursor: pointer; margin-top: 21px; margin-bottom: 21px;"> {{ $t('CreateRoom') }} </button>
                  <p>{{ $t('PleaseCreateRoomAndExploreChatto!') }}</p>
                </div>

                

              </div>
            </div>
  
           </div>
                <div class="col col-md-8" id="startRoom" style="max-width: 64.66667%;display:none">
                  <div id="mainRoom">
                    <div class="row mb" style="margin-top: 11px;border-bottom: 1px solid #cbd3ef99;">
                         <div class="col col-md-1">
                     <div  class="profile" style="width: 56px;height: 56px;">
                       <span> {{getFirstLetter(singleRoom.room_title)}}</span>
                    </div>
                  </div>
                  <div class="col col-md-5 pr-0">
                    <p>{{singleRoom.room_title}}</p>
                    <p>{{ $t('Time') }}: {{singleRoom.scheduleStartTime}}  <span class="badge badge-primary">{{$t(singleRoom.scheduleTypeName)}}</span></p>
                   
                  </div>

                      <div class="col col-md-3">
                        <div class="row">  
                          <div class="col-6 mt-2" @click="roomChat()" style="cursor:pointer">
                            <img class="rounded-0 h-auto" src="../assets/images/nav/Chat-Icon.svg" alt="Avatar" />
                            <span> {{ $t("Chat") }} </span>
                          </div>
                        </div>
                      </div>

<div class="col col-md-3"> 
  <button @click="joinRoom(event)" class="btn addMeeting" >
              <span style="color: white;">{{ $t('JoinRoom') }}</span>
            </button>

</div>
                    
                    </div>

                      <div class="row" style="margin-top: 15px;overflow-y: scroll;max-height: calc(83vh - 99px);min-height: calc(83vh - 70px);">
                        <div class="col-md-8" >

                          <div class="col col-md-12 meetingTopic" style="margin-bottom: 12px;">
                           <p>{{ $t('RoomTopic') }}:</p>
                           <p>{{singleRoom.room_topic}}</p>
                         </div>
                       
                       <div class="col col-md-12 meetingTopic" style="margin-bottom: 40px;">
                        <div class="row" style="padding-top: 4px;padding-bottom: 9px;">
                         <div class="col-1">
                           <img class="rounded-0 h-auto" src="../assets/images/icons/document.png" alt="Avatar" style="border-radius: 0;" /> 

                         </div>
                         <div class="col-11" style="border-left: 1px solid gainsboro;height: auto;">
                           <p>{{ $t("Files") }}  
                            <input type="file" id="addroomFile" @change="addRoomFile($event)"  ref="roomFile" multiple style="display:none">
                                <label for="addroomFile" style="
                                cursor: pointer;float:right"><i style="padding-right: 6px;font-size: 17px;" class="fa fa-plus" aria-hidden="true"></i></label>
                              </p>
                        
                             
                         </div>

                          <div class="col-11 offset-md-1" v-for="roomFiles in singleRoom.room_file" style="">
                               <a  :href="hostname+'images/chatImages/'+roomFiles.filename" target="_blank">{{roomFiles.filename}} </a>
                            <label v-if="singleRoom.room_file" @click="removeRoomfile(roomFiles._id)" style="
                                cursor: pointer;float:right"><img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  ></label>
                          </div>

                       </div>
                     </div>
                       <div class="col col-md-6 meetingUser">                
                            <h6 class="font-weight-bold p-1" style="font-size: 13px;"> {{ $t('Participants') }}: </h6>
                            <div class="usersprof">
                     <template v-for="members,index in singleRoom.room_friends" v-if="index < 4">
                              <div  v-if="singleRoom.room_friends[index].user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+singleRoom.room_friends[index].user_image" alt="Avatar" :title="singleRoom.room_friends[index].name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="singleRoom.room_friends[index].name">{{getFirstLetter(singleRoom.room_friends[index].name)}}</div>
                            </div>
                             
                            </template>
                            <div class="profile">
                              <div class="usersCount">{{membersCount}}</div>
                            </div>
                            <div class="addMeetingPar" v-if="singleRoom.createdBy == current_User._id" @click="editRoom(singleRoom)">
                              <div class="" style="padding: 3px;color: #6F66FF;">
                                <plus-icon size="1.5x" class="custom-class"></plus-icon>
                              </div>
                            </div>

                          </div>
                             <div style="margin-top: 40px;">
                          <div class="" v-for="(friends, index) in singleRoom.room_friends" :key="friends._id">
                         <div style="display: inline-flex;">
                             <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                          <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
                        </div>
                        
                        </div>
                      </div>
                        </div> 
              
                  </div>

            <div class="col-md-4">
              <div class="row">
           
            <div class="col col-md-12" style="background-color: white;text-align:center;margin-bottom: 20px;">
                  <div style="width: 100%;margin-top: 10px;height: 50px;background-color: aliceblue;">
                      <img class="" src="../assets/images/icons/clock.png" alt="Avatar" style="height: auto;border-radius: 0;position: absolute;top: 19px;right: 125px;" /> 
                  </div>
                  <div class="meetingUser" style="margin-top: 40px; margin-bottom: 19px;">

                    <p>{{ $t('Time') }}: {{singleRoom.scheduleStartTime}}  <span class="badge badge-primary">{{$t(singleRoom.scheduleTypeName)}}</span></p>
                  
                  </div>
                  
                </div>

              </div>
            </div>

          </div>

          <div class="row" style="border-top: 1px solid rgba(203, 211, 239, 0.6);">
            <div class="col-1" v-if="singleRoom.createdBy == current_User._id" style="margin-top: 13px;cursor:pointer;padding: 0 0px 0 16px;" @click="editRoom(singleRoom)">
             <img class="" src="../assets/images/icons/editmeeting.png" alt="Avatar" style="height: auto;border-radius: 0;" /> <span> {{ $t('Edit') }}</span>
           </div>
           <div class="col-2" style="margin-top: 13px;cursor:pointer" @click="leaveRoom(singleRoom)" v-else>
              <img class="" src="../assets/images/icons/editmeeting.png" alt="Avatar" style="height: auto;border-radius: 0;" /> <span>{{ $t("LeaveRoom") }}</span>
           </div>
           <div class="col-4" v-if="singleRoom.createdBy == current_User._id" style="margin-top: 13px;cursor:pointer" @click="deleteRoom(singleRoom)">
             <img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  /> <span>{{ $t('DeleteRoom') }}</span>
           </div>
           <div class="col-3"  v-else>
            
           </div>
           <div class="col-7" style="">
            <button v-if="singleRoom.createdBy == current_User._id" class="btn addMeeting" style="background-color:#FFFFFF;border: 1px solid #2C3550" @click="ScheduleMeeting()">
              <span style="color: #2C3550;">{{ $t('StartMeeting') }}</span>
            </button>
          </div>
          <!-- <div class="col-2">
            <button @click="joinRoom(event)" class="btn addMeeting" >
              <span style="color: white;">{{ $t('JoinRoom') }}</span>
            </button>
          </div> -->
          
        </div>
                  </div>


                    <div id="roomChat" style="display: none;">
                      <div class="chitchat-main small-sidebar" id="roomContent" style="width: 100%;">
                        <div class="chat-content tabto" id="roomstartchat" style="opacity: 1">
                          <div class=" messages custom-scroll active messageschat" id="roomchating">

                             <div class="contact-details">
                              <div class="row">
                                <form class="form-inline search-form">
                                  <div class="form-group">
                                    <input class="form-control-plaintext" type="search" :placeholder="$t('Search ...')" />
                                    <div class="icon-close close-search"> </div>
                                  </div>
                                </form>
                                <div class="col-7">
                                  
                                  <div class="media left">
                                    <a href="#" @click="roomWindow()" style="color: #2c3550;">
                                      <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                                    </a>&nbsp;
                                    <div class="media-left mr-3" @click="chatSidebar()">

                               

                                      <div class="profile menu-trigger" style="border-radius: 30px;">

                                   <div class="user2 profile" >
                                       <span> {{getFirstLetter(singleRoom.room_title)}}</span>
                                    </div>

                                       </div>
                                    </div>

                                    <div class="media-body">
                                      <h5><span> {{singleRoom.room_title}}</span></h5>
                                      <div>Created on: {{isToday(singleRoom.createdAt)}}</div>
                                      <!-- <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 0" class="badge badge-success">Online</div>
                                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 1" class="badge badge-warning">Away</div>
                                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 2" class="badge badge-danger">Busy</div>
                                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 3" class="badge badge-dark">Invisible</div>
                                      <div v-if="singlefriend.onlineStatus == 1 && singlefriend.pStatus == 4" class="badge badge-secondary">Offline</div>
                                      <div v-if="singlefriend.onlineStatus == 0" class="badge badge-light">Offline</div> -->

                                    </div>
                                    <!-- <div class="media-right">
                                      <ul>
                                        <li>
                                          <a class="icon-btn btn-light search-right" href="#">
                                            <search-icon size="1.5x" class="custom-class"></search-icon>
                                          </a>
                                        </li>
                                        <li>
                                          <a class="icon-btn btn-light button-effect mobile-sidebar" href="#">
                                            <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
                                          </a>
                                        </li>
                                      </ul>
                                    </div> -->
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="calls text-right">
                                    <div class="meetingUser">                
                                      <h6 class="text-left p-1 font-weight-bold" style="font-size: 13px;"> {{ $t('Participants') }}: </h6>
                                        <div class="usersprof">
                         
                                       <template v-for="members,index in singleRoom.room_friends" v-if="index < 4">
                                        <div  v-if="members.user_image" class="profile">
                                          <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                                        </div>
                                         <div v-else class="profile">
                                        <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                                      </div>
                                       
                                      </template>
                                      
                                        
                                      <div class="profile">
                                        <div class="usersCount">{{membersCount}}</div>
                                      </div>
                                    </div>
                                  </div>
                                    <!-- <li>
                                      <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Quick Audio Call" data-toggle="modal" data-target="#o2ovideocall" data-keyboard="false" data-backdrop="static" @click="videostartCall(singlefriend,'audio')">
                                        <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                      </a>
                                    </li>
                                    <li>
                                      <a class="icon-btn btn-light button-effect" href="#" @click="videostartCall(singlefriend,'video')" data-tippy-content="Quick Video Call" data-toggle="modal" data-target="#o2ovideocall" data-keyboard="false" data-backdrop="static">
                                           <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                                      </a>
                                    </li> -->
                                    <!--<li>
                                          <a class="icon-btn btn-light button-effect apps-toggle">
                                            <i class="ti-layout-grid2"></i>
                                          </a>
                                        </li>-->
                                    <!-- <li class="chat-friend-toggle">
                                      <a class="icon-btn btn-light bg-transparent button-effect outside" href="#" data-tippy-content="Quick action">
                                        <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
                                      </a>
                                      <div class="chat-frind-content">
                                        <ul style="width:170px">
                                           <li>
                                            <a class="" href="#" style="color: #959595;">
                                              <trash-2-icon size="1.5x" class="custom-class"></trash-2-icon>
                                            </a>
                                            <h5>{{ $t('DeleteChat') }}</h5>
                                          </li>
                                         

                                          <li>
                                            <a class="" href="#" style="color: #959595;">
                                              <star-icon size="1.5x" class="custom-class"></star-icon>
                                            </a>
                                            <h5 >Hide Chat</h5>
                                          </li>
                                          <li> 

                                            <a class="" href="#" style="color: #959595;">
                                              <slash-icon size="1.5x" class="custom-class"></slash-icon>
                                            </a>
                                            <h5 >{{ $t('BlockUsers') }}</h5>
                                          </li>
                                          <li>
                                            <a class="" href="#" style="color: #959595;">
                                              <user-icon size="1.5x" class="custom-class"></user-icon>
                                            </a>
                                            <h5 >{{ $t('UserSetting') }}</h5>
                                          </li>

                                        </ul>
                                      </div>
                                    </li> -->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-------- Dropzone ------>
                            <vue-dropzone ref="myVueDropzone" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions"> </vue-dropzone>
                            <!-------- end -------->
                            <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">

                            </loading>

                            <div class="contact-chat">
                           <template v-if="roomsChat.length != 0">
                              <ul class="chatappend" v-for="chat in roomsChat">
                                <h5 v-if="chat.messageType == 3 && chat.chatType == 3" style="text-align:center;padding: 30px;">
                                  <span>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</span> <br><br> {{ chat.message }}</h5>

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
                                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                                        <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
                                        <ul class="msg-box">
                                          <li class="msg-setting-main">
                             

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
                                            <div class="msg-dropdown-main" v-if="chat.isDeleted != 1">
                                              <div class="msg-setting" :id="'msg-setting'+chat._id" @click="msg_setting(chat._id)">
                                                <i class="ti-more-alt"></i>
                                              </div>

                                              <div class="msg-dropdown" :id="'msg-dropdown'+chat._id" style="z-index: 99999;">
                                                <ul style="display: flex; flex-direction: column;">
                                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                                    <a href="#" @click="eidtroomchat(chat._id,chat.message)">
                                                      <i class="fa fa-pencil"></i>{{ $t('Edit') }}</a>
                                                  </li>
                                                  <li>
                                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon> {{ $t('Download') }}
                                                    </a>
                                                </li>
                                               <!--   <li>
                                                    <a href="#" @click="forward(chat)">
                                                      <i class="fa fa-share"></i>Forward</a>
                                                  </li> -->
                                                  <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                                    <a href="#" @click="bookmarked(chat,'room')">
                                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                                  </li>
                                                   <li v-else>
                                                    <a href="#" @click="removebookmarked(chat,'room')">
                                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                                  </li>
                                                  <li>
                                                    <a href="#" @click="roomquote(chat)">
                                                      <i class="fa fa-share"></i>{{ $t('Quote') }}</a>
                                                  </li>

                                                  <li v-if="chat.messageType != 1 && chat.messageType != 2">
                                                    <a href="#" @click="copymsg(chat.message)" v-clipboard:copy="messagecopy" v-clipboard:success="onCopy" v-clipboard:error="onError">
                                                      <i class="fa fa-clone"></i>copy</a>
                                                  </li>
                                                  <!--<li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>-->
                                                  <li style="margin-left: 12px;">
                                                    <a href="#" @click="msgdelete(chat)">
                                                      <i class="ti-trash"></i>{{ $t('Delete') }}</a>
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
                                    <div class="profile mr-4">
                                       <img class="bg-img" v-if="chat.senderId.user_image" :src="hostname+'images/chatImages/'+chat.senderId.user_image" alt="Avatar" />
                                     <div v-else  class="userprofile">
                                       <span style="z-index: 0;
                " > {{getFirstLetter(chat.senderId.name)}}</span>
                                    </div> </div>
                                    <div class="media-body">
                                      <div class="contact-name">
                                        <h5>{{ chat.senderId.name }}</h5>
                                        <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                                         <span v-if="chat.bookmarkedChat.includes(c_user._id)"><bookmark-icon size="1.5x" class="custom-class"></bookmark-icon></span>
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
                                                      <a :href="hostname+'download/'+chat.message"  :id="'sender'+chat._id" v-if="chat.messageType != 0 && chat.isDeleted != 1" download><download-icon size="1.5x" class="custom-class"></download-icon>{{ $t('Download') }}
                                                    </a>
                                                </li>
                                               <!--   <li>
                                                    <a href="#" @click="forward(chat)">
                                                      <i class="fa fa-share"></i>Forward</a>
                                                  </li> -->
                                                    <li v-if="!chat.bookmarkedChat.includes(c_user._id)">
                                                    <a href="#" @click="bookmarked(chat,'room')">
                                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('AddBookmark') }}</a>
                                                  </li>
                                                   <li v-else>
                                                    <a href="#" @click="removebookmarked(chat,'room')">
                                                      <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>{{ $t('RemoveBookmark') }}</a>
                                                  </li>
                                                  <li>
                                                    <a href="#" @click="roomquote(chat)">
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
                                      
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                              </ul>
                            <!--   <template v-if="isSeen == true ">
                                     <img class="bg-img" v-if="singlefriend.user_image" style="width: 21px;float:right;min-height: 21px;" :src="hostname+'images/chatImages/'+singlefriend.user_image" alt="Avatar" />
                                
                                         <div v-else  class="" style="width: 24px;float: right; background: #2c3550;border-radius: 14px;height: 24px;text-align: center;line-height: 23px;margin-bottom: 3px;" >
                                             <span style="color: white;text-transform: capitalize;"> {{getFirstLetter(singlefriend.name)}}</span>
                                          </div>
                                    </template> -->
                            </template>
 
                            </div>
<!-- 
                            <span v-show="typing" style="margin-top: 12px;position: absolute;bottom: 30px;padding: 3px;" class="">{{ singlefriend.name }} is typing ...</span> -->

                          </div>
                          <VEmojiPicker @select="selectchatEmoji" class="" v-bind:class="{activeChatemoji: ischatemojiActive}" v-if="ischatemojiActive" />
                          <div class="message-input" id="singlemessage-input" style="width: calc(83% - 352px);height:15%">
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
                            <div class="wrap emojis-main">

                              <div class="dot-btn dot-primary mr-3">
                                <a class="icon-btn btn-outline-primary button-effect " @click="showChatemoji">
                                  <smile-icon size="1.5x" class="custom-class"></smile-icon>
                                </a>
                              </div>

                              <label class="icon-btn btn-outline-primary mr-4" for="roomfileupload">
                                <file-plus-icon size="1.5x" class="custom-class"></file-plus-icon>
                              </label>
                              <input type="file" id="roomfileupload" ref="roomFiles" style="display:none" @change="roomuploadfile($event)" multiple>

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
                             <textarea class="setemoj" id="setemoj" ref="afterroomClick" type="text"  v-on:keyup="removeroomcross()" @keydown.enter.exact.prevent
                              @keyup.enter.exact="roomchat()"
                              @keydown.enter.shift.exact="newline" v-model="roommessage" :placeholder="$t('WriteMessage')" rows="3" cols="50">
                              </textarea>
                            <!--   <input class="setemoj" id="setemoj" ref="afterClick" type="text" v-on:keyup="removecross()" @keyup.enter="chat()" v-model="message" placeholder="Write your message..." /> -->
                              <!-- <a class="icon-btn btn-outline-primary button-effect mr-3 ml-3" href="#">
                                <mic-icon size="1.5x" class="custom-class"></mic-icon>
                              </a> -->
                              <button class="submit icon-btn btn-primary disabled" v-show="onroomChat" @click="roomchat()" id="roomsend-msg" disabled="disabled">
                                <send-icon size="1.5x" class="custom-class"></send-icon>
                              </button>
                              <button class="submit icon-btn btn-primary " style="display:none" v-show="onroomEditclear" @click="clearroomchat()">
                                <x-icon size="1.5x" class="custom-class"></x-icon>
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
	      </div>
	    </div>
	                <!-- ROOM END -->

<!-- Note-->

       <div id="todoNotes" style="width:100%;background-color: #f3f6ff; display:none">

      <div class="row meetingRow d-none d-sm-flex" >
        <div class="col col-md-2" style="margin-top: 3px;">
          <img class="" src="../assets/images/icons/meetingUser.png" alt="Avatar" style="height: auto;padding-right: 10px;" />
          <span style="font-size: 15px;">To-Do</span>
        </div>
        <div class="col col-md-4" style="">
         
           <div class="search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
            <div style="border-radius: 0px;">
              <div class="input-group">

                <input class="form-control"  type="text" placeholder="Search To-Do / Note" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-md-6">
          <button @click="createNote()"   class="btn addMeeting" >
            <span style="color: white;padding-right: 8px;">
              <i class="fa fa-plus" aria-hidden="true"></i></span> 
              <span style="color: white;">Add Note </span>
            </button>
        </div>
      </div>

      <div class="row meetingRow d-flex d-sm-none" >
        <div class="col col-md-7" style="margin-top: 3px;">
          <a class="mobile-sidebar" href="#" @click="appchatNav()" style="color: #2c3550;">
              <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
            </a>&nbsp;
          <img class="" src="../assets/images/icons/meetingUser.png" alt="Avatar" style="height: auto;padding-right: 10px;" />
          <span style="font-size: 15px;">To-Do</span>
        </div>
    
        <div class="col col-md-5">
          <button @click="createNote()" class="btn btn-sm addMeeting" >
            <span style="color: white;padding-right: 8px;">
              <i class="fa fa-plus" aria-hidden="true"></i></span> 
              <span style="color: white;">Add Note </span>
            </button>
        </div>

      </div>
      <div class="row d-flex d-sm-none" style="background: white;">
          <div class="col search2" id="" style="padding: 0px;border-top: none;margin-bottom: 6px;">
            <div>
              <div class="input-group">

                <input class="form-control" v-model="userSearch" type="text" :placeholder="$t('Search ...')" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col col-md-12" style="background-color: white;margin-left: 15px;padding:0px">
          <div class="theme-tab tab-sm meeting-tabs" style="border-top: 1px solid #eaeef8;border-bottom: 1px solid #eaeef8;padding-top: 16px;width: 30%;">
            <ul class="nav nav-tabs">
            <li class="nav-item" style="width:25%">
             <a id="all-todo" data-toggle="tab" @click="getNotes()" href="#alltodo" role="tab" aria-controls="alltodo" aria-selected="true" class="nav-link button-effect active">{{ $t('All') }}</a>
            </li>
            <li class="nav-item" style="width:25%">
              <a id="design-todo"  data-toggle="tab" @click="designNote()" href="#designtodo" role="tab" aria-controls="designtodo" aria-selected="true" class="nav-link button-effect ">design</a>
            </li>
             <li class="nav-item" style="width:25%">
             <a id="general-todo" data-toggle="tab" @click="generalNote()" href="#generaltodo" role="tab" aria-controls="generaltodo" aria-selected="true" class="nav-link button-effect ">general</a>
            </li>
            <li class="nav-item" style="width:25%">
              <a id="projects-todo"  data-toggle="tab" @click="projectsNote()" href="#projectstodo" role="tab" aria-controls="projectstodo" aria-selected="true" class="nav-link button-effect ">projects</a>
            </li>
          </ul>          
         </div>

          <div class="tab-content meetingContent custom-scroll">
          <div id="alltodo"  class="tab-pane active " style="padding: 27px 40px 6px 20px;">
            <div class="row">
              <template v-if="noteData.length != 0">
            <div class="col-md-4" v-for="note in noteData"  style="margin-top: 5px;margin-bottom: 30px;">
              <h3 style="margin: 0px 1px 7px;cursor:pointer;" @click="editNote(note)">{{note.note_title}}</h3>
              <p class="noteP">{{note.note_topic}}</p>

              <div class="row">
                <div class="col-md-3" style="padding-right: 0;">
                  
                    <template>
                      <tag-icon size="1.5x" class="custom-class"></tag-icon>
                    </template>
                    <p style="float: right;">{{note.note_category}}</p>
                
                </div>
                <div class="col-md-6 noteUser">
                <div class="usersprof">
                <template v-for="members,index in note.note_members" v-if="index < 4">
                  <div  v-if="members.user_image" class="profile">
                    <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                  </div>
                   <div v-else class="profile">
                  <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                </div>
                </template>
                
                <div class="profile">
                  <div class="usersCount">{{note.note_members.length}}</div>
                </div>

                </div>
                </div>
                <div class="col-md-3">
                <span>{{isToday(note.note_date)}}</span>
              </div>
              </div>
            </div>
            </template>
            <div v-else class="col-md-12" style="padding: 73px;text-align: center;margin-top: 60px;">
                <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                <p>You Don’t Have A Note!<br>
                    Please Create Note And Explore Chatto!</p>
                
              </div>
            </div>
          </div>

          <div id="designtodo" style="padding: 27px 40px 6px 20px;" class="tab-pane fade">
         <div class="row">
           <template v-if="designNotes.length != 0">
            <div class="col-md-4" v-for="note in designNotes" style="margin-top: 5px;margin-bottom: 30px;">
              <h3 style="margin: 0px 1px 7px;">{{note.note_title}}</h3>
              <p class="noteP">{{note.note_topic}}</p>

              <div class="row">
                <div class="col-md-3" style="padding-right: 0;">
                  
                    <template>
                      <tag-icon size="1.5x" class="custom-class"></tag-icon>
                    </template>
                    <p style="float: right;">{{note.note_category}}</p>
                
                </div>
                <div class="col-md-6 noteUser">
                <div class="usersprof">
                <template v-for="members,index in note.note_members" v-if="index < 4">
                  <div  v-if="members.user_image" class="profile">
                    <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                  </div>
                   <div v-else class="profile">
                  <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                </div>
                </template>
                
                <div class="profile">
                  <div class="usersCount">{{note.note_members.length}}</div>
                </div>

                </div>
                </div>
                <div class="col-md-3">
                <span>{{isToday(note.note_date)}}</span>
              </div>
              </div>
            </div>
            </template>
            <div v-else class="col-md-12" style="padding: 73px;text-align: center;margin-top: 60px;">
                <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                <p>You Don’t Have A Note!<br>
                    Please Create Note And Explore Chatto!</p>
                
              </div>
          </div>
         </div>
          <div id="generaltodo" class="tab-pane fade" style="padding: 27px 40px 6px 20px;">
         <div class="row">
           <template v-if="generalNotes.length != 0">
            <div class="col-md-4" v-for="note in generalNotes" style="margin-top: 5px;margin-bottom: 30px;">
              <h3 style="margin: 0px 1px 7px;">{{note.note_title}}</h3>
              <p class="noteP">{{note.note_topic}}</p>

              <div class="row">
                <div class="col-md-3" style="padding-right: 0;">
                  
                    <template>
                      <tag-icon size="1.5x" class="custom-class"></tag-icon>
                    </template>
                    <p style="float: right;">{{note.note_category}}</p>
                
                </div>
                <div class="col-md-6 noteUser">
                <div class="usersprof">
                <template v-for="members,index in note.note_members" v-if="index < 4">
                  <div  v-if="members.user_image" class="profile">
                    <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                  </div>
                   <div v-else class="profile">
                  <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                </div>
                </template>
                
                <div class="profile">
                  <div class="usersCount">{{note.note_members.length}}</div>
                </div>

                </div>
                </div>
                <div class="col-md-3">
                <span>{{isToday(note.note_date)}}</span>
              </div>
              </div>
            </div>
            </template>
            <div v-else class="col-md-12" style="padding: 73px;text-align: center;margin-top: 60px;">
                <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                <p>You Don’t Have A Note!<br>
                    Please Create Note And Explore Chatto!</p>
                
              </div>
          </div>
       </div>

          <div id="projectstodo" class="tab-pane fade" style="padding: 27px 40px 6px 20px;">
         <div class="row">
           <template v-if="projectsNotes.length != 0">
            <div class="col-md-4" v-for="note in projectsNotes" style="margin-top: 5px;margin-bottom: 30px;">
              <h3 style="margin: 0px 1px 7px;">{{note.note_title}}</h3>
              <p class="noteP">{{note.note_topic}}</p>

              <div class="row">
                <div class="col-md-3" style="padding-right: 0;">
                  
                    <template>
                      <tag-icon size="1.5x" class="custom-class"></tag-icon>
                    </template>
                    <p style="float: right;">{{note.note_category}}</p>
                
                </div>
                <div class="col-md-6 noteUser">
                <div class="usersprof">
                <template v-for="members,index in note.note_members" v-if="index < 4">
                  <div  v-if="members.user_image" class="profile">
                    <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                  </div>
                   <div v-else class="profile">
                  <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                </div>
                </template>
                
                <div class="profile">
                  <div class="usersCount">{{note.note_members.length}}</div>
                </div>

                </div>
                </div>
                <div class="col-md-3">
                <span>{{isToday(note.note_date)}}</span>
              </div>
              </div>
            </div>
            </template>
            <div v-else class="col-md-12" style="padding: 73px;text-align: center;margin-top: 60px;">
                <p> <img  src="../assets/images/icons/nomeeting.png" alt="Avatar" style="height: auto;" /></p>
                <p>You Don’t Have A Note!<br>
                    Please Create Note And Explore Chatto!</p>
                
              </div>
          </div>
        </div>
          </div>
          </div>


          </div>

          </div>
    

<!-- Note End -->

	    </div>




    
    <div class="modal fade add-popup add-contact-modal" id="showGroupsMembers" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" v-if="showGrouptitle">
              {{singlegroup.name}}
              <i class="fa fa-edit" style="font-size: 23px; margin-left: 10px;" @click="editGroup()"></i>
            </h2>
            <div class="form-group mb-2 modal-title" v-if="editgTitle == true" style="display: flex;">
              <input type="text" ref="groupTitle" name="username" v-model="singlegroup.name" class="form-control" maxlength="50">

              <check-icon size="1.5x" class="custom-class" @click="editGroupTitle()" style="margin: 3px;"></check-icon>
              <x-icon size="1.5x" class="custom-class" @click="crossGroupTitle()" style="margin: 3px;"></x-icon>

            </div>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">

              <div class="form-group mb-0">
                <h5>
                  <span style="font-size:17px;cursor: pointer;" @click="showMembers()">{{ $t('Cancel') }}</span>
                  <span style="float:right;cursor: pointer;" @click="addNewmember()">{{ $t('AddNewMember') }}</span>
                </h5>

                <div class="showmembers" v-if="showmembers == true">
                  <div class="groupmembers" v-for="(groupmembers, index) in singlegroup.members">
                      <div style="display: inline-flex;">
                       <img class="bg-img" v-if="groupmembers.user_image" style ="width: 55px;min-height:55px" :src="hostname+'images/chatImages/'+groupmembers.user_image" alt="Avatar" />

                   <div v-else  class="profile" style="background: #2c3550;border-radius: 9px;width: 55px;height: 55px;" >
                       <span> {{getFirstLetter(groupmembers.name)}}</span>
                    </div>
                    <p style="margin-top: 11px;padding-left: 9px;">{{groupmembers.name}}</p>
                  </div>

                    <label v-if="singlegroup.creatorUserId == c_user._id && groupmembers._id != c_user._id" class="btn btn-sm btn-danger removeBtn" style="padding: 4px 7px;float:right;cursor: pointer;" @click="leaveGroup(groupmembers._id,index)">{{ $t('Remove') }}</label>

                  </div>
                </div>

                <div class="showmembers" v-if="shownewmembers == true">
                  <div class="groupmembers" v-for="(members, index) in nonGroupUsers" v-if="members._id != c_user._id">
                 <div style="display: inline-flex;">
                       <img class="bg-img" v-if="members.user_image" style ="width: 60px;min-height:60px" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" />

                   <div v-else  class="profile" style="background: #2c3550;border-radius: 9px;width: 55px;height: 55px;" >
                       <span> {{getFirstLetter(members.name)}}</span>
                    </div>
                    <p style="margin-top: 11px;padding-left: 9px;">{{members.name}}</p>
                  </div>
                    <span class="btn btn-success showAdd" :id="'newmember'+members._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="addnewGroupmemners(members)">{{ $t('Add') }}</span>
                    <span class="btn btn-sm btn-danger hideRemove" :id="'newmemberRm'+members._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="removenewGroupmemners(members._id,index)">{{ $t('Remove') }}</span>
                  </div>

                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button id="groupbtn" v-if="showmembers == true" class="btn btn-primary button-effect btn-sm " type="button" @click="leaveGroup(userid,'user')">{{ $t('LeaveGroup') }}</button>
            <button id="addmemberbtn" v-if="shownewmembers == true" class="btn btn-primary button-effect btn-sm " type="button" @click="addNewmembersList()">{{ $t('Submit') }}</button>
            <button id="addmemberonload" class="addmemberonload btn btn-primary button-effect btn-sm" style="display: none;">
              <i class="fa fa-spinner fa-spin"></i> Loading</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade add-popup add-contact-modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <span><img class="" src="../assets/images/nav/groupUsers.png" alt="Avatar" style="height: auto;border-radius: 0;" /></span>{{ $t('NewGroup') }}</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <div style="display: flex;">
                <div style="padding-right: 10px;">
                  <h4 style="margin-bottom: 4px; color: black;">{{ $t('group') }}:</h4>
                  <div style="border: 1px #E5EAF9 solid;padding: 4px;border-radius: 6px;">
                    <span>  <img class="bg-img" v-if="userImageName" style ="max-height: 40px; border-radius:0px" :src="hostname+'images/chatImages/'+userImageName" alt="Avatar" /> 

                       <img class="bg-img" v-else  src="../assets/images/contact/2.jpg" style ="max-height: 40px;; border-radius:0px"  alt="Avatar" /> </span>
                  </div>
                </div>
                <div class="form-group" style="width: 100%;margin-top: 22px;">
                  <input class="form-control" id="exampleInputEmail1" v-model="groupName" type="text" :placeholder="$t('Entergname')" maxlength="50" />
                </div>
              </div>
              <div style="margin-right: -10px;margin-left: -10px;">
                <div class="input-group">

                   <input class="form-control modelsearch" v-model="userSearch" type="text" :placeholder="$t('Search ...')" />

                </div>
              </div>

              <div class="form-group mb-0 mt-2">
               
                <div class="showmembers" v-if="userData">

                  <ul v-for="(friends, index) in friendsdata" v-if="friends._id != c_user._id" :id="'groupmembers'+friends._id" @click="addGroupmemners(friends._id,index)" class=" showAdd groupmembers chat-main">
                    <li v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" data-to="blank" style="padding-left: 0px;cursor: pointer;width: 100%;display: inline-block;margin: 0 0px;    padding-top: 0px;padding-bottom: 0px;">
                      <div class="chat-box">
                       <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px; max-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                        <div class="details" style="padding-left: 73px;">
                          <h5>{{friends.name}}</h5>
                          <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message" style="padding-top: 0px;">{{ friends.latestMsg.message }}</h6>
                          <h6 style="padding-top: 0px;" v-else>Start Chat</h6>
                        </div>

                        <div class="date-status">
                          <h6 class="todayDate" style="margin-bottom: 11px;">{{isToday(friends.updatedByMsg)}}</h6>

                          <span class="" :id="'member'+friends._id"  style="font-size: 21px;">
                            <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                          </span>
                          <span class="hideRemove" style="display:none;font-size: 21px;" :id="'memberRm'+friends._id" >
                            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    </li>
                     <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-if="friends.friendReqSenderId == friends._id">
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                    </p>
                                  </div>
                                </div>

                                <div v-else>
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </li>

                  </ul>
                </div>

            <div class="showmembers" v-if="userSearching">

                  <ul v-for="(friends, index) in filteredUserlist" v-if="friends._id != c_user._id" :id="'groupmembers'+friends._id" @click="addGroupmemners(friends._id,index)" class="showAdd groupmembers chat-main">
                    <li v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" data-to="blank" style="padding-left: 0px;cursor: pointer;width: 100%;display: inline-block;margin: 0 0px;    padding-top: 0px;padding-bottom: 0px;">
                      <div class="chat-box">
                       <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                        <div class="details" style="padding-left: 73px;">
                          <h5>{{friends.name}}</h5>
                          <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message" style="padding-top: 0px;">{{ friends.latestMsg.message }}</h6>
                          <h6 style="padding-top: 0px;" v-else>Start Chat</h6>
                        </div>

                        <div class="date-status">
                          <h6 class="todayDate" style="margin-bottom: 11px;">{{isToday(friends.updatedByMsg)}}</h6>

                          <span  :id="'member'+friends._id"  style="font-size: 21px;">
                            <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                          </span>
                          <span class="hideRemove" style="display:none;font-size: 21px;" :id="'memberRm'+friends._id" >
                            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    </li>
                     <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span style="padding: 18px;"> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-if="friends.friendReqSenderId == friends._id">
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                    </p>
                                  </div>
                                </div>

                                <div v-else>
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </li>

                  </ul>
                </div>


              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button id="groupcreateBtn" class="btn btn-primary button-effect btn-sm disabled" type="button" @click="createGroup()" :disabled="havegroup">{{ $t('creategroup') }}</button>
            <button class="buttonload btn btn-primary button-effect btn-sm" style="display:none">
              <i class="fa fa-spinner fa-spin"></i> Loading</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal pol-modal-main add-popup" id="pollModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <i data-feather="bar-chart-2"></i>poll</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <h3>create poll</h3>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="ask que" />
                <input class="form-control" type="text" placeholder="add commatn" />
              </div>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="option 1" />
                <input class="form-control" type="text" placeholder="option 2" />
                <a class="add-option" href="#">add an option</a>
              </div>
              <div class="form-group">
                <div class="post-poll">
                  <ul>
                    <li>post poll in
                      <p class="pt-0">test name</p>
                    </li>
                    <li>poll expier in 7 days
                      <p class="pt-0">test name</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <div class="allow-group">
                  <input class="allow-check" type="checkbox" />Allow users to vote anonymously
                </div>
              </div>
              <div class="creat-poll-btn">
                <a class="btn btn-primary button-effect btn-sm" href="#" data-dismiss="modal" aria-label="Close">Create poll</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal notes-modal-main add-popup" id="notesModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <i class="ti-bookmark-alt"></i>notes</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body custom-scroll">
            <div class="card">
              <div class="card-header">
                <h5>Inline Editor</h5>
              </div>
              <div class="card-body">
                <div class="cke_editable cke_editable_inline cke_contents_ltr cke_show_borders" id="area1" contenteditable="true" tabindex="0" spellcheck="false" role="textbox" aria-label="Rich Text Editor, area1" title="Rich Text Editor, area1">
                  <h1>Your title</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at vulputate urna, sed dignissim arcu. Aliquam at ligula imperdiet, faucibus ante a, interdum enim. Sed in mauris a lectus lobortis condimentum. Sed in nunc magna. Quisque massa urna, cursus vitae commodo eget, rhoncus nec erat. Sed sapien turpis, elementum sit amet elit vitae, elementum gravida eros. In ornare tempus nibh ut lobortis. Nam venenatis justo ex, vitae vulputate neque laoreet a.</p>
                </div>
              </div>
              <div class="card-footer">
                <button class="btn btn-danger button-effect btn-sm" type="button">{{ $t('Save') }}</button>
                <button class="btn btn-primary button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal reminder-modal-main add-popup" id="setReminder" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              Set redminders</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form default-form">
              <div class="lable">Reminder for (Groups or contacts)</div>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="contact or channel" />
              </div>
              <div class="lable">Remind about</div>
              <div class="form-group">
                <textarea class="form-control dib" rows="3" placeholder="Some details about task"></textarea>
              </div>
              <div class="lable">Remind about</div>
              <div class="form-group">
                <ul class="reminder-count">
                  <li class="active">
                    <div class="reminder-box">
                      <h3 class="remi-num">15</h3>
                      <h5 class="remi-val">minutes</h5>
                    </div>
                  </li>
                  <li>
                    <div class="reminder-box">
                      <h3 class="remi-num">1</h3>
                      <h5 class="remi-val">hour</h5>
                    </div>
                  </li>
                  <li>
                    <div class="reminder-box">
                      <h3 class="remi-num">5 PM</h3>
                      <h5 class="remi-val">today</h5>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="form-group mb-0">
                <div class="lable">select custom time</div>
                <div class="custom-remider-main">
                  <div class="custom-remider-content">
                    <div class="custom-reminder-inline">
                      <input class="form-control" type="date" />
                      <input class="form-control" type="time" />
                    </div>
                    <div class="custom-reminder-block">
                      <select>
                        <option>Do not repeat</option>
                        <option>Weekdays (Mon-Fri)</option>
                        <option>{{ $t('daily') }}</option>
                        <option>Weekly (Custom)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="reminder-btn">
                <a class="btn btn-primary button-effect">set reminder</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal snippet-modal-main add-popup" id="snippetModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <i class="fa fa-code"></i>code snippets</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <h3>creat snippets</h3>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="title(optional)" />
              </div>
              <div class="form-group">
                <select class="mb-0">
                  <option>ebnf</option>
                  <option>c++</option>
                  <option>diff</option>
                  <option>dart</option>
                </select>
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="5"></textarea>
              </div>
              <div class="form-group">
                <input class="form-control mb-0" type="text" placeholder="add commant (optional)" />
              </div>
              <div class="form-group mb-0">
                <div class="btn-snipate">
                  <a class="btn btn-danger button-effect btn-sm mr-3" href="#" data-dismiss="modal" aria-label="Close">{{ $t('Cancel') }}</a>
                  <a class="btn btn-primary button-effect btn-sm" href="#" data-dismiss="modal" aria-label="Close">Create & post</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


                 <!-- Account Setting -->

 <div class="modal pol-modal-main add-popup" id="deleteAccount" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="text-align:center">
         
          <div class="modal-body">
            <h3>{{ $t('DeleteAccount') }}</h3>
            <p>{{ $t('accountdelDetail') }}</p>
            <button class="btn btn-primary rounded-pill"  data-dismiss="modal" @click="deleteAccount()" style="background-color: #EF6137;    border-radius: 30px!important;">{{ $t('YesDeleteAccount') }}</button>
            <p style="margin-top: 20px;cursor: pointer;" data-dismiss="modal" aria-label="Close">{{ $t('Cancel') }}</p>
          </div>
        </div>
      </div>
    </div>

 <div class="modal pol-modal-main add-popup" id="deactivateAccount" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="text-align:center">
         
          <div class="modal-body">
            <h3>{{ $t('DeactivateAccount') }}</h3>
            <p>{{ $t('Areyousureyouwanttodeactivatethisaccount?') }}</p>
            <button class="btn btn-primary rounded-pill"  data-dismiss="modal" @click="deactivateAccount()" style="border-radius: 30px!important;">{{ $t('YesDeactivateAccount') }}</button>
            <p style="margin-top: 20px;cursor: pointer;" data-dismiss="modal" aria-label="Close">{{ $t('Cancel') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal snippet-modal-main add-popup" id="termsConditions" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{ $t('Termsandcondition') }}</h3>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <p>
             Version 1.0.0
                   </br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>
              
          </div>
        </div>
      </div>
    </div>

     <div class="modal snippet-modal-main add-popup" id="aboutChatto" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{ $t('AboutChatto') }}</h3>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           <p>
             Version 1.0.0
                   </br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>
              
          </div>
        </div>
      </div>
    </div>

                  <!-- O2O VIDEO CALL RECEIVER -->

    <div class="modal fade" id="videocallReceiver" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body" style="border: 3px solid white; padding: 0px;">
          <div class="audiocall1 call-modal">
            <div class="center-con text-center" style="margin-bottom:120px">
              <div class="profile incomingName align-self-center" id="userImagename">
                
              </div>
              <div class="mt-4" style="margin-bottom: 100px;">
                <span class="title2" id="incomingName"></span><br>
                <h6>Incoming...</h6>
              </div>

              <ul>
                <li>
                  <a class="icon-btn btn-success button-effect btn-xl is-animating" href="#" @click="o2oreceiveCall()" data-dismiss="modal">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#" @click="o2ostopKCall(3)">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-------------------------------------------- Group CALL RECEIVER ---------------------------------->
    <div class="modal fade" id="groupcallReceiver" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body">
          <div class="audiocall1 call-modal">
            <div class="center-con text-center">
              <div class="title2" id="groupincomingName"> Group Call</div>
              <ul>
                <li>
                  <a class="icon-btn btn-success button-effect btn-xl is-animating" href="#" @click="groupReceiveCall()" data-dismiss="modal">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#"  data-dismiss="modal">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="videocallModel  viddiolog modal fade" id="broadcastvideocall" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modelbefore" id="modalcall" role="document">
        <div class="modal-body">

          <div class="videocall beforeopenChat call-modal">
            <video id="broadCastVideo" playsinline autoplay style="width:100%"></video>
            <img class="bg-img" src="../assets/images/avtar/big/videocall_bg.jpg" alt="Avatar" />

            <div class="media videocall-details">
              <div class="usersprof">
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/2.jpg" alt="Avatar" /></div>
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/3.jpg" alt="Avatar" /></div>
              </div>
              <div class="media-body">

              </div>
              <div id="basicUsage"></div>

            </div>
            <div class="center-con text-center">
              <ul>
                <li>
                  <a class="icon-btn btn-light button-effect pause" href="#" data-tippy-content="Hold">
                    <i class="ti-control-pause"></i>
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-danger button-effect btn-xl is-animating" href="#" id="broadcaststop" @click="on2Callclose()" data-dismiss="modal" data-tippy-content="Hangup">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute">
                    <i class="fa fa-microphone"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="text-right" style="float: right;position: absolute;bottom: 107px;right: 22px;">
              <ul>
                <li>
                  <div id="chatopen" class="">
                    <a class="icon-btn btn-light button-effect pause" id="" href="#" @click="showCallchat()" data-tippy-content="Hold">
                      <message-square-icon size="1.5x" class="custom-class"></message-square-icon>
                    </a>
                  </div>
                  <a class="icon-btn btn-light button-effect pause" id="chatclose" href="#" @click="hideCallchat()" style="display:none" data-tippy-content="Hold">
                    <img class="" src="../assets/images/chatclose.png" style="width: 60%;" alt="Avatar" />
                  </a>
                </li>

              </ul>
            </div>
          </div>
          <div class="chitchat-main small-sidebar" id="contents" style="display:none;width: 30%;float: right;">

            <div class="chat-content tabto" id="startboardcastchat">
              <div class=" messages custom-scroll active boardcastchat" id="brochatings" style="min-height:108vh !important;">

                <!-------- Dropzone ------>
                <vue-dropzone ref="myVueDropzone" @ondragleave="dragLeave(event)" id="dropzone" @vdropzone-success="afterComplete" v-on:vdropzone-sending="dragfileupload" :options="dropzoneOptions"> </vue-dropzone>
                <!-------- end -------->
                <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage">

                </loading>
                <div class="contact-chat  ">
                  <ul class="chatappend" v-for="chat in broadcastChat">
                    <li class="replies" style="padding-bottom:20px" v-if="chat.senderId._id == c_user._id">
                      <div class="media">
                        <div class="profile mr-4">
                          <img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" /></div>
                        <div class="media-body">
                          <div class="contact-name">
                            <h5>{{ c_user.name}}</h5>
                            <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>

                            <ul class="msg-box">
                              <li class="msg-setting-main">

                                <h5>{{ chat.message }}</h5>

                              </li>
                              <!-- <li class="msg-setting-main">
                                    <h5> your personal assistant to help you &#128512; </h5>
                                    <div class="badge badge-success sm ml-2"> R</div>
                                    <div class="msg-dropdown-main">
                                      <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                      <div class="msg-dropdown"> 
                                        <ul>
                                          <li><a href="#"><i class="fa fa-share"></i>forward</a></li>
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
                    <li class="sent" style="padding-bottom:20px" v-else>
                      <div class="media">
                        <div class="profile mr-4"><img class="bg-img" src="../assets/images/contact/2.jpg" alt="Avatar" /></div>
                        <div class="media-body">
                          <div class="contact-name">
                            <h5>{{chat.senderId.name}}</h5>
                            <h6>{{isToday(chat.createdAt)}} {{chatTime(chat.createdAt)}}</h6>
                            <ul class="msg-box">
                              <li class="msg-setting-main">

                                <h5>{{ chat.message }} </h5>

                              </li>
                              <!--   <li class="msg-setting-main">
                                    <h5> it should from elite auther &#128519;</h5>
                                    <div class="badge badge-success sm ml-2"> R</div>
                                    <div class="msg-dropdown-main">
                                      <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                      <div class="msg-dropdown"> 
                                        <ul>
                                          <li><a href="#"><i class="fa fa-share"></i>forward</a></li>
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
                  <img class="" src="../assets/images/contact/2.jpg" alt="Avatar" v-if="isSeen == true && friendCallchat.length > 0" style="width: 20px;float:right" />
                </div>

              </div>
              <VEmojiPicker @select="broadcastchatEmoji" class="" v-bind:class="{activeChatemoji: isbroadchatemojiActive}" style="bottom: 86px;" v-if="isbroadchatemojiActive" />
              <div id="broadcast-input" class="message-input message-call">

                <div class="wrap emojis-main">

                  <div class="dot-btn dot-primary mr-3">
                    <a class="icon-btn btn-outline-primary button-effect " @click="showbroadcastChatemoji">
                      <smile-icon size="1.5x" class="custom-class"></smile-icon>
                    </a>
                  </div>

                  <input class="setemoj" id="setemoj" ref="borafterClick" type="text" @keyup.enter="broadCastmsgchat()" v-model="broadCastmsg" :placeholder="$t('WriteMessage')" />

                  <button class="submit icon-btn btn-primary disabled" v-show="onbroChat" @click="broadCastmsgchat()" id="send-broadcastmsg" disabled="disabled">
                    <send-icon size="1.5x" class="custom-class"></send-icon>
                  </button>
                  <button class="submit icon-btn btn-primary " style="display:none" v-show="onEditclear" @click="clearchat()">
                    <x-icon size="1.5x" class="custom-class"></x-icon>
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!----------------------------Show Participent  Model -------------->

    <div class="modal fade fev-addcall-main add-popup" id="showPresenter" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              Broadcast</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="presentersData.length > 0" v-for="presenter in presentersData">
              <p> {{presenter.preName}}
                <button class="btn btn-success btn-xs" style="float:right;padding: 5px 16px;cursor: pointer;" @click="becomeViewer(presenter.preId)"> Join</button>
              </p>
            </div>
            <div v-else>
              <p> No Data</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button class="btn btn-primary button-effect btn-sm" @click="startBroadcasting()" type="button">Start Broadcasting</button>
          </div>
        </div>
      </div>
    </div>

    <!---------------------------- Close Show Participent  Model -------------->

    <!----------------------------- Show Broadcast Password  Model-------------->

    <div class="modal fade fev-addcall-main add-popup" id="sBroadcast" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <i class="fa fa-signal text-light-icon"></i> Start Broadcasting
            </h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <h4>Set password for live stream:</h4>
              <div class="form-group" style="display: flex;margin-top: 27px;">
                <span>Yes</span>
                <input class="form-control" id="exampleInputEmail12" name="password" type="radio" style="height: 19px;width:30%;margin-bottom: 0px;" value="Yes" />
              </div>
              <div class="form-group" style="display: flex;">
                <span style="width: 21px;">No</span>
                <input class="form-control" id="exampleInputEmail12" name="password" type="radio" style="height: 19px;width:30%;margin-bottom: 0px;" value="No" checked/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal">Back</button>
            <button class="btn btn-primary button-effect btn-sm" type="button" data-toggle="modal" data-target="#broadcastvideocall" data-keyboard="false" data-backdrop="static" @click="startBroadcasting()">Broadcasting Now</button>
          </div>
        </div>
      </div>
    </div>

    <!---------------------------------------- Close Broadcast Password  Model -------------------->

    <!--------------------------------------------- CLOSE BOARDCAST MODEL -------------------------------->

    <div class="modal fade" id="confercall" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body">
          <div class="conferencecall call-modal"><img class="bg-img" src="../assets/images/avtar/big/audiocall.jpg" alt="Avatar" />
            <div class="center-con text-center">
              <div class="usersprof">
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/2.jpg" alt="Avatar" /></div>
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/3.jpg" alt="Avatar" /></div>
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/5.jpg" alt="Avatar" /></div>
                <div class="profile"><img class="bg-img" src="../assets/images/avtar/big/videocall_bg.jpg" alt="Avatar" /></div>
              </div>
              <p>{{ $t('Incomming Call') }}</p>
              <h3>Conference Call</h3>
              <ul>
                <li>
                  <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#" data-dismiss="modal">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-success button-effect btn-xl is-animating" href="#">
                       <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confvideocl" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row confimg">
              <div class="col-6">
                <div class="vclimg"><img class="bg-img" src="../assets/images/avtar/big/videocall_bg.jpg" alt="Avatar" /></div>
              </div>
              <div class="col-6">
                <div class="vclimg"><img class="bg-img" src="../assets/images/avtar/5.jpg" alt="Avatar" /></div>
              </div>
              <div class="col-6">
                <div class="vclimg"><img class="bg-img" src="../assets/images/avtar/2.jpg" alt="Avatar" /></div>
              </div>
              <div class="col-6">
                <div class="vclimg"><img class="bg-img" src="../assets/images/avtar/3.jpg" alt="Avatar" /></div>
              </div>
            </div>
          </div>
          <div class="modal-footer clfooter">
            <div id="basicUsage3">00:00:00</div>
            <ul>
              <li>
                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="speaker">
                  <i data-feather="volume-2"></i>
                </a>
              </li>
              <li>
                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Camera">
                  <i data-feather="camera-off"></i>
                </a>
              </li>
              <li>
                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Add Call">
                  <i data-feather="user-plus"></i>
                </a>
              </li>
              <li>
                <a class="icon-btn btn-danger button-effect btn-sm is-animating" href="#" data-dismiss="modal" data-tippy-content="Hangup">
                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                </a>
              </li>
              <li>
                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Disable Video">
                  <i data-feather="video-off"></i>
                </a>
              </li>
              <li>
                <a class="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute">
                  <i data-feather="mic-off"></i>
                </a>
              </li>
              <li>
                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Hold">
                  <i data-feather="pause"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade audiorcvcall" id="audiorcvcall" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-body">
          <div class="audiocall2 call-modal"><img class="bg-img" src="../assets/images/avtar/big/audiocall.jpg" alt="Avatar" />
            <div class="center-con text-center">
              <div id="basicUsage2">00:00:00</div>
              <div class="title2">Josephin water</div>
              <h6>log angelina california</h6>
              <ul>
                <li>
                  <a class="icon-btn btn-light button-effect mute" href="#" data-tippy-content="Mute">
                    <i class="fa fa-microphone"></i>
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-light button-effect mute" href="#" data-tippy-content="Speaker">
                    <i class="fa fa-volume-up"></i>
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-danger button-effect btn-xl is-animating" href="#" data-tippy-content="Hangup" data-dismiss="modal">
                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Add Call">
                    <i data-feather="user-plus"></i>
                  </a>
                </li>
                <li>
                  <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Pause">
                    <i data-feather="pause"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

 <div class="modal fade fev-addcall-main add-popup" id="addMeetingmodal" tabindex="-1" role="dialog" aria-hidden="true" style="overflow: auto;">
      <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content" style="">
          <div class="modal-header">
            <h2 class="modal-title" id="meetingTitle">
              {{ $t('CreateMeeting') }}</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <div class="row">
              <div class="col-8" style="margin-top: 11px;">
              <div class="form-group">
                <span>{{ $t('MeetingTitle') }}</span>
                <input class="form-control" id="" v-model="meeting.meeting_title" type="text" :placeholder="$t('Giveitaname')" />
              </div>
              </div>
                <div class="col-4" style="margin-top: 11px;">
              <div class="form-group">
                <span>{{ $t('TimeZone') }}:</span>
               <select class="form-control" id="sel1" v-model="meeting.meeting_zone" style="border: 1px solid #d2d2d2;height:46px;font-size: 13px;border-radius: 4px; background: none;">
  				       <option selected="selected">Select timezone</option>
                   <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                   <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                   <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                   <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                   <option value="US/Arizona">(GMT-07:00) Arizona</option>
                   <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                   <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                   
                   <option value="America/Managua">(GMT-06:00) Central America</option>
                   <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                   <option value="America/Regina">(GMT-06:00) Saskatchewan</option>
                   <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                   <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                   <option value="America/Indiana/Indianapolis">(GMT-05:00) Indiana (East)</option>
                   <option value="America/Halifax">(GMT-04:00) Atlantic Time (Canada)</option>
                   <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                   <option value="America/Manaus">(GMT-04:00) Manaus</option>
                   <option value="America/Santiago">(GMT-04:00) Santiago</option>
                   <option value="America/St_Johns">(GMT-03:30) Newfoundland</option>
                   <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                   <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                   <option value="America/Nuuk">(GMT-03:00) Greenland</option>
                   <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                   <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                   <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                   <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                   <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                   <option value="Etc/GMT">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                   <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                   <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                   <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                   <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                   <option value="Africa/Bangui">(GMT+01:00) West Central Africa</option>
                   <option value="Asia/Amman">(GMT+02:00) Amman</option>
                   <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                   <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                   <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                   <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                   <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                   <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                   <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                   <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                   <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                   <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                   <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                   <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                   <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                   <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                   <option value="Asia/Baku">(GMT+04:00) Baku</option>
                   <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                   <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                   <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                   <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>    
                   <option value="Asia/Kolkata">(GMT+05:30) Sri Jayawardenapura</option> 
                   <option value="Asia/Kathmandu">(GMT+05:45) Kathmandu</option>
                   <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                   <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option> 
                   <option value="Asia/Yangon">(GMT+06:30) Yangon (Rangoon)</option>
                   <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                   <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                   <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>     
                   <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                   <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                   <option value="Australia/Perth">(GMT+08:00) Perth</option>
                   <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                   <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                   <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                   <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                   <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>  
                   <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                   <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                   <option value="Australia/Sydney">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                   <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                   <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                   <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                   <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                   <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                   <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                   <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
			  </select>
              </div>
            </div>
              <div class="col-8" style="padding-top: 11px;padding-bottom: 11px;">
              <div class="form-group">
                <span>{{ $t('MeetingTopic') }}:</span>
                <textarea id="" class="form-control" v-model="meeting.meeting_topic" :placeholder="$t('Whatisthismeetingfor?')" rows="3" cols="50">
                 </textarea>
               
              </div>
              </div>
                <div class="col-4" style="padding-top: 11px;padding-bottom: 11px;">
              <div class="form-group">
                <span>{{ $t('NotificationTime') }}:</span>
                <select class="form-control" v-model="meeting.meeting_notification" id="" style="border: 1px solid #d2d2d2;height:46px;font-size: 13px;border-radius: 4px; background: none;">
      				    <option>Select notification time</option>
      				    <option>15</option>
      				    <option>30</option>
      				    <option>45</option>
      			  </select>
               
              </div>
            </div>
              <div class="col-4" style="padding-bottom: 5px;">
              <div class="form-group">
                <span>{{ $t('Date') }}:</span>
                <datepicker :format="format" :highlighted="highlighted"  v-model="meeting.meeting_date" placeholder="DD / MM / YYYY"></datepicker>
                <!-- <input class="form-control" id="exampleInputEmail12" type="text" placeholder="DD / MM / YYYY" /> -->
              </div>
              </div>
                <div class="col-4" style="padding-bottom: 5px;">
              <div class="form-group">
                <span>{{ $t('Time') }}:</span>
                <!-- <vue-timepicker  hide-dropdown format="hh:mm a" v-model="meeting.meeting_time" placeholder="HH:MM"></vue-timepicker> -->
                <div style="display: flex;">
                    <select id="meet_time" v-model="meeting.meeting_time" style="background: #f5f3f3;">
                      <option disabled value="">hh:mm</option>
                      <option v-for="currenttime in timelist" v-bind:key="currenttime.id" :value="currenttime.time"> {{currenttime.time}} </option>
                    </select>
                    
                    <select id="meet_time_meridian" v-model="meeting_time_meridian" style="background: #f5f3f3;">
                      <option value="am" selected="selected">am</option>
                      <option value="pm">pm</option>
                    </select>
                  </div>

                <!-- <vue-timepicker></vue-timepicker> -->
                <!-- <input class="form-control" id="examplemsg2" type="text" placeholder="HH : MM : SS" /> -->
              </div>
            </div>
            <div class="col-4" style="padding-bottom: 5px;">
              <div class="form-group">
                <span>{{ $t('ReqTime') }}:</span>
                <div style="display: flex;">
                  <select id="meet_duration_hour" v-model="meeting.meeting_duration" style="background: #f5f3f3;">
                      <option value="0" selected="selected">0</option>
                      <option v-for="durationH in duration_hours" v-bind:key="durationH.id" :value="durationH.hours"> {{durationH.hours}} </option>
                  </select>
                   
                  <select id="meet_duration_min" v-model="meeting_duration_minutes" style="background: #f5f3f3;">
                      <option value="0" selected="selected">0</option>
                      <option v-for="durationM in duration_minutes" v-bind:key="durationM.id" :value="durationM.minutes"> {{durationM.minutes}} </option>
                  </select>
                </div>
                <!-- <vue-timepicker  format="hh:mm" v-model="meeting.meeting_duration" placeholder="HH:MM"></vue-timepicker> -->
              </div>

            </div>
              <div class="col-6" style="margin-top: 11px;margin-bottom: 11px;">
              <div class="form-group">
                <span>{{ $t('MeetingID') }}:</span>
                <input class="form-control" id="" v-model="meeting.meeting_id" type="text" placeholder="Meeting id here" disabled="disabled"/>
              </div>
              </div>
                <div class="col-6" style="margin-top: 11px;margin-bottom: 11px;">
              <div class="form-group">
                <span>{{ $t('MeetingPassword') }}:</span>
                <input class="form-control" id="examplemsg2" v-model="meeting.meeting_password" type="password" placeholder="* * * * * * * *" disabled="disabled"/>
              </div>
            </div>
             <div class="col-12" style="margin-top: 0px;margin-bottom: 19px;">
              <div class="form-group">
                <span>{{ $t('AddParticapant') }}</span>
               <label class="btn btn-sm btn-primary" data-toggle="modal" data-target="#invitePersonMeeting" data-keyboard="false" data-backdrop="static" data-dismiss="modal" style="position: absolute;top: 26px;left: 22px;background-color:#6f66ff">{{ $t('InviteMembers') }}</label>
             <input-tag v-model="invitePersons"></input-tag>
             <div class="contactPerson">
             <label class="btn btn-sm btn-primary" data-toggle="modal" data-target="#inviteContactMeeting" data-keyboard="false" data-backdrop="static" data-dismiss="modal" style="position: absolute;top: 93px;left: 22px;background-color:#6f66ff">{{ $t('ContactMember') }}</label>
             <div style="padding: 6px;">
             <template v-for="person in contactPersons">
             	<span class="badge badge-light">{{person.name}}</span>
             </template>
         </div>
             <!-- <input-tag v-model="contactPersons" style="margin-top: 20px;"></input-tag> -->
              </div>
          </div>
            </div>

              <div class="col-12">
              <div class="form-group">
                <span>{{ $t('AddFile') }}</span><br>
                <div style="border: 1px #E5EAF9 solid;
                padding: 7px;border-radius: 3px;">
              <label for="upload" class="btn btn-sm btn-primary" style="background-color:#6f66ff">{{ $t('AttachFile') }}</label>
              <input type="file" class="text-center form-control-file custom_file" ref="meeting_file" id="upload"  @change="meetingFileName()" multiple>
              <label for="file_default"></label>
              <label for="file_name" id="meetingfile"></label>

              <template v-for="meetFile in meetingfile">
                 <label v-if="meetingfile" id="meetingfile2"><b> {{ meetFile.filename }}</b></label>
                 <label v-if="meetingfile" @click="removeMeetingfile(meetFile._id)"  style="float:right"><img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  ></label><br>
              </template>
              
              </div>
              </div>
            </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button  class="btn addMeeting" @click="addMeeting()">
              <span id="addUpdatemeeting" style="color: white;padding-right: 8px;" >
               <i class="fa fa-plus" aria-hidden="true"></i>
               <span style="color: white;">{{ $t('CreateMeeting') }} </span>
              </span> 
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade fev-addcall-main add-popup" id="invitePersonMeeting" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 45%;">
        <div class="modal-content" style="width: 60%!important;">
          <div class="modal-header">
            <h2 class="modal-title">
             {{ $t('InviteFromEmail') }}</h2>
            <button class="close" type="button"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 550px;overflow-x: hidden;">
            <form class="default-form">
               <div class="form-group">
                <span>{{ $t('EnterEmail') }}</span>
               <label class="btn btn-sm btn-primary" @click="addMeetingPersons"  style="position: absolute;top: 34px;right: 19px;background-color:#6f66ff">{{ $t("Add") }}</label> 
               
               <input class="form-control" style="padding: 15px 21px;" v-model="invitePersonMeeting" type="text" :placeholder="$t('TypeEmail')"/>
              </div>
             
            </form>
            <div class="row"  v-for=" (invite,index) in invitePersons" style="margin-bottom:20px">
            	<div class="col-2">
            		<div class="userprofile" >
                     <span style="top: 18.5%;left: 18.5%;color: white;"> {{getFirstLetter(invite)}}</span>
                  </div>
            	</div>

            	<div class="col-8" style="padding-left: 0px;padding-top: 17px;border-bottom: 1px solid #bac5e991;">
            		<span>{{invite}}</span>
            	</div>
            	<div class="col-2" @click="removeMeetingPerson(index)" style="max-width: 12.86667%;padding-right: 0px;padding-top: 17px;border-bottom: 1px solid #bac5e991;">
            		<x-icon size="1.5x" style="float: right;" class="custom-class"></x-icon>
            	</div>
            	
            </div>
            
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button class="btn btn-primary button-effect btn-sm"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" type="button" style="background-color:#6f66ff">{{ $t('Add') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade fev-addcall-main add-popup" id="inviteContactMeeting" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 45%;">
        <div class="modal-content" style="width: 60%!important;">
          <div class="modal-header">
            <h2 class="modal-title">{{ $t("AddContact") }}</h2>
            <button class="close" type="button"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 550px;overflow-x: hidden;">
            <form class="default-form">
               <div class="form-group">
                <input class="form-control" style="padding: 15px 21px;" v-model="inviteContactMeeting" type="text" :placeholder="$t('Search')" />
              </div>
             
            </form>
           <div style="margin-top: 40px;">
                  <div class="" v-for="(friends, index) in orderedUsers" :key="friends._id" v-if="friends._id != c_user._id">
                 <div style="display: inline-flex;">
                     <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                    <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
                  </div>
                  
                    <span class="btn btn-sm btn-success showAddmeeting showAddmeeting2" :id="'contactadd'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="addContactPersons(friends)">{{ $t('Add') }}</span>
                    <span class="btn btn-sm btn-danger hideRemovemeeting hideRemovemeeting2" :id="'contactRm'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="removeContactPerson(friends._id,friends.name,index)">{{ $t('Remove') }}</span>
                  </div>

                </div>
            
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button class="btn btn-primary button-effect btn-sm"  data-toggle="modal" data-target="#addMeetingmodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" type="button" style="background-color:#6f66ff">{{ $t('AddContact') }}</button>
          </div>
        </div>
      </div>
    </div>

 <div class="modal fade fev-addcall-main add-popup" id="inviteContactNote" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 45%;
">
        <div class="modal-content" style="width: 60%!important;">
          <div class="modal-header">
          	<h4>
            <span><img class="" src="../assets/images/nav/groupUsers.png" alt="Avatar" style="height: auto;border-radius: 0;" /></span> {{ $t('AddMember') }} </h4>
            <button class="close" type="button"  data-keyboard="false" data-backdrop="static"  data-toggle="modal" data-target="#addNotemodal" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 550px;overflow-x: hidden;">
            <form class="default-form">
               <div class="form-group">
                <input class="form-control"style="padding: 15px 21px;" v-model="inviteContactNote" type="text" :placeholder="$t('Search ...')" />
              </div>
             
            </form>
           <div style="margin-top: 40px;">
                  <div class="" v-for="(friends, index) in orderedUsers" :key="friends._id" v-if="friends._id != c_user._id">
                 <div style="display: inline-flex;">
                     <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                    <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
                  </div>
                  
                    <span class="btn btn-sm btn-success showAddmeeting" :id="'notecontactadd'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="noteaddContactPersons(friends)">{{ $t('Add') }}</span>
                    <span class="btn btn-sm btn-danger hideRemovemeeting" :id="'notecontactRm'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="noteremoveContactPerson(friends._id,friends.name,index)">{{ $t('Remove') }}</span>
                  </div>

                </div>
            
          </div>
          <div class="modal-footer">
        <!--     <button class="btn btn-danger button-effect btn-sm" type="button"  data-toggle="modal" data-target="#addNotemodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal">{{ $t('Cancel') }}</button> -->
        <a  class="icon-btn btn-primary" style="float:right"  data-toggle="modal" data-target="#addNotemodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" href="#" id="chattoggle">
          <plus-icon size="1.5x" class="custom-class"></plus-icon>
           </a>
            
          </div>
        </div>
      </div>
    </div>


 <div class="modal fade fev-addcall-main add-popup" id="addNotemodal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 550px;">
        <div class="modal-content" style="">
         <!--  <div class="modal-header">
            <h2 class="modal-title" id="noteTitle">
              Create Note</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> -->
          <div class="modal-body">
            <form id="noteData2" class="default-form">
              <div class="row">
              <div class="col-md-12" style="margin-top: 11px;">
              <div class="form-group">
                
                <input class="form-control" id="noteTitle" style="border:none;" v-model="note.noteTitle" type="text" placeholder="Untitled Note" />
              </div>
              </div>
              
            
                <div class="col-md-4" style="padding-top: 11px;padding-bottom: 11px;">
                	<div class="row">
                    <div class="col-md-6" style="padding: 0px 0px 0px 15px;" v-if="note.noteCategory">
                      <tag-icon size="1.5x" class="custom-class"></tag-icon>
                   
                    <span style="float: right;">{{note.noteCategory}}</span>
                     </div>
                     <div class="col-md-6">
                	<button  class="showAddmeeting" style="float: right;padding: 5px 3px;"  data-toggle="modal" data-target="#addNoteTag" data-keyboard="false" data-backdrop="static" data-dismiss="modal">&nbsp; + Tag &nbsp; </button>
                    </div>
		            </div>
		        </div>

                <div class="col-md-4" style="padding-top: 11px;padding-bottom: 11px;">

                	<div class="row">
                		<div class="col-md-8 meetingUser">
                          <div class="usersprof" v-if="notecontactPersons.length > 0">
                         
                             <template v-for="members,index in notecontactPersons" v-if="index < 4">
                              <div  v-if="members.user_image" class="profile">
                                <img class="bg-img" :src="hostname+'images/chatImages/'+members.user_image" alt="Avatar" :title="members.name" />
                              </div>
                               <div v-else class="profile">
                              <div class="usersCount" :title="members.name">{{getFirstLetter(members.name)}}</div>
                            </div>
                             
                            </template>
                            <div class="profile">
                              <div class="usersCount">{{notecontactPersons.length}}</div>
                            </div>

                          </div>
                          </div>
                          <div class="col-md-4">
		                	<button class="showAddmeeting" data-toggle="modal" data-target="#inviteContactNote" data-keyboard="false" data-backdrop="static" data-dismiss="modal" >+</button>
		                  </div>
		                 </div>
		                </div>

                 <div class="col-md-4" style="padding-bottom: 11px;">

                	 <div class="form-group" >
		                
		                <datepicker :format="format"  :highlighted="highlighted"  v-model="note.noteDate" placeholder="DD / MM / YYYY"></datepicker>
		               <!--  <input class="form-control"  v-model="note.noteDate" id="noteData2" type="date" data-date-format="DD / MM / YYYY" placeholder="DD / MM / YYYY" /> -->
		              </div>

                </div>

             <div class="col-12" style="padding-top: 11px;padding-bottom: 11px;">
              <div class="form-group">
                <textarea id="" class="form-control" style="border:none" v-model="note.noteTopic" placeholder="Write your note here" rows="15" cols="50">
                 </textarea>
               
              </div>
              </div>

              </div>
            </form>
          </div>
          <div class="modal-footer">
             
            <a @click="deleteNote()" v-if="editnoteId" href="#" style="color: #f23c3c;padding-right: 8px;" >
             
              <span style="color: #f23c3c;">{{ $t('Delete') }} </span>
            </a> 
            

            <button  class="btn addMeeting" @click="addNote()">
            <span id="addUpdatenote" style="color: white;padding-right: 8px;" >
              <i class="fa fa-plus" aria-hidden="true"></i>
              <span style="color: white;">Add Note </span></span> 
            </button>
          </div>
        </div>
      </div>
    </div>

      <div class="modal fade fev-addcall-main add-popup" id="addNoteTag" tabindex="-1" role="dialog" aria-hidden="true">
			      <div class="modal-dialog modal-dialog-centered" role="document">
			        <div class="modal-content">
			         
			          <div class="modal-body">
			              <div class="form-group">
			                <h4>Note Tag</h4>
			                <select class="form-control" v-model="note.noteCategory" id="" style="border: 1px solid #d2d2d2;height:46px;font-size: 13px;border-radius: 4px; background: none;">
			                  <option>Select Category</option>
			                  <option>design</option>
			                  <option>general</option>
			                  <option>projects</option>
			              </select>
			               
			              </div>
			          </div>
			          <div class="modal-footer">
			            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal" data-keyboard="false" data-backdrop="static"  data-toggle="modal" data-target="#addNotemodal" aria-label="Close">{{ $t('Cancel') }}</button>
			            <button class="btn btn-primary button-effect btn-sm" data-keyboard="false" data-backdrop="static"  data-toggle="modal" data-target="#addNotemodal" data-dismiss="modal" aria-label="Close" type="button">{{ $t('Add') }}</button>
			          </div>
			        </div>
			      </div>
			    </div>


    <div class="modal fade fev-addcall-main add-popup" id="addcallmodal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              {{ $t('AddContact') }}</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <div class="form-group">
                <h5>Email or Username</h5>
                <input class="form-control" id="exampleInputEmail12" type="text" placeholder="Josephin water" />
              </div>
              <div class="form-group">
                <h5>Contact number</h5>
                <input class="form-control" id="examplemsg2" type="number" placeholder="12345678912" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
            <button class="btn btn-primary button-effect btn-sm" type="button">{{ $t('AddContact') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade fev-addcall-main add-popup" id="forwardContacts" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 45%;
">
        <div class="modal-content" style="width: 60%!important;">
          <div class="modal-header">
            <h2 class="modal-title">
             Forward Message</h2>
            <button class="close" type="button"  data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 550px;overflow-x: hidden;">
            <h4 style="padding-top: 20px;margin-bottom: 20px;border-bottom: 1px solid;">“ {{forwardchatdata.message}} ”</h4>
            <form class="default-form">
               <div class="form-group">
                <input class="form-control" style="padding: 15px 21px;" v-model="searchforwardcontact" type="text" placeholder="Search from contact " />
              </div>
             
            </form>
           <div style="margin-top: 40px;">
                  <div class="" v-for="(friends, index) in orderedUsers" v-if="friends._id != c_user._id">
                 <div style="display: inline-flex;">
                     <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                    <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
                  </div>
                    <span class="btn btn-sm btn-success showAddforward" :id="'forward'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="sendforwardmsg(friends)">Send</span>
                    <span class="hideRemoveforward" :id="'rmforward'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="removeContactPerson(friends._id,friends.name,index)">Sent</span>
                  </div>

                </div>
            
          </div>
      
        </div>
      </div>
    </div>

    <!-- Create Room Modal -->
     <div class="modal fade fev-addcall-main add-popup" id="addRoommodal" tabindex="-1" role="dialog" aria-hidden="true" style="overflow:auto;">
          <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title" id="roomTitle">
                  <img class="" src="../assets/images/nav/rooms.png" alt="Avatar" style="height: auto;border-radius: 0;" /> {{ $t('CreateRoom') }}</h2>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="default-form">
                  <div class="row">
                  <div class="col-6" style="margin-top: 11px;">
                  <div class="form-group">
                    <span>{{ $t('RoomName') }}:</span>
                    <input class="form-control" id="" v-model="room.room_title" type="text" :placeholder="$t('PleaseEnterRoomName')" />
                  </div>
                  </div>
                   <div class="col-6" style="margin-top: 11px;">
              <div class="form-group">
                <span>{{ $t('TimeZone') }}:</span>
               <select class="form-control" id="sel1" v-model="room.room_timezone" style="border: 1px solid #d2d2d2;height:46px;font-size: 13px;border-radius: 4px; background: none;">
                  <option selected="selected">Select timezone</option>
                   <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                   <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                   <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                   <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                   <option value="US/Arizona">(GMT-07:00) Arizona</option>
                   <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                   <option value="America/Denver">(GMT-07:00) Mountain Time (US & Canada)</option>
                   
                   <option value="America/Managua">(GMT-06:00) Central America</option>
                   <option value="US/Central">(GMT-06:00) Central Time (US & Canada)</option>
                   <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                   <option value="America/Regina">(GMT-06:00) Saskatchewan</option>
                   <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                   <option value="America/New_York">(GMT-05:00) Eastern Time (US & Canada)</option>
                   <option value="America/Indiana/Indianapolis">(GMT-05:00) Indiana (East)</option>
                   <option value="America/Halifax">(GMT-04:00) Atlantic Time (Canada)</option>
                   <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                   <option value="America/Manaus">(GMT-04:00) Manaus</option>
                   <option value="America/Santiago">(GMT-04:00) Santiago</option>
                   <option value="America/St_Johns">(GMT-03:30) Newfoundland</option>
                   <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                   <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                   <option value="America/Nuuk">(GMT-03:00) Greenland</option>
                   <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                   <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                   <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                   <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                   <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                   <option value="Etc/GMT">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                   <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                   <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                   <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                   <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                   <option value="Africa/Bangui">(GMT+01:00) West Central Africa</option>
                   <option value="Asia/Amman">(GMT+02:00) Amman</option>
                   <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                   <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                   <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                   <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                   <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                   <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                   <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                   <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                   <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                   <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                   <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                   <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                   <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                   <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                   <option value="Asia/Baku">(GMT+04:00) Baku</option>
                   <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                   <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                   <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                   <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>    
                   <option value="Asia/Kolkata">(GMT+05:30) Sri Jayawardenapura</option> 
                   <option value="Asia/Kathmandu">(GMT+05:45) Kathmandu</option>
                   <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                   <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option> 
                   <option value="Asia/Yangon">(GMT+06:30) Yangon (Rangoon)</option>
                   <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                   <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                   <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>     
                   <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                   <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                   <option value="Australia/Perth">(GMT+08:00) Perth</option>
                   <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                   <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                   <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                   <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                   <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>  
                   <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                   <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                   <option value="Australia/Sydney">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                   <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                   <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                   <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                   <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                   <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                   <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                   <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
                   </select>
                  </div>
                </div>
                  <div class="col-12" style="padding-top: 11px;padding-bottom: 11px;">
                  <div class="form-group">
                    <span>{{ $t('RoomTopic') }}:</span>
                    <textarea id="" class="form-control" v-model="room.room_topic" :placeholder="$t('Whatisthisroomfor?')" rows="3" cols="50">
                     </textarea>
                  </div>
                  </div>
                  <!-- <div class="col-12" style="margin-top: 11px;margin-bottom: 11px;">
                  <div class="form-group">
                    <span>{{ $t('RoomID') }}:</span>
                    <input class="form-control" id="" v-model="room.room_id" type="text" placeholder="@123 - 456 - 7890" />
                  </div>
                  </div> -->
                   <!--  <div class="col-6" style="margin-top: 11px;margin-bottom: 11px;">
                  <div class="form-group">
                    <span>{{ $t('RoomPassword') }}:</span>
                    <input class="form-control" id="examplemsg2" v-model="room.room_password" type="password" placeholder="* * * * * * * *" />
                  </div>
                </div> -->
                 <div class="col-12" style="margin-top: 0px;margin-bottom: 19px;">
                  <div class="form-group">
                    <span>{{ $t('AddParticapant') }}</span>
                   <!-- <label class="btn btn-sm btn-primary" data-toggle="modal" data-target="#invitePersonMeeting" data-keyboard="false" data-backdrop="static" data-dismiss="modal" style="position: absolute;top: 26px;left: 22px;background-color:#6f66ff">{{ $t('InviteMembers') }}</label> -->
                 <!-- <input-tag v-model="invitePersons"></input-tag> -->
                 <div class="contactPerson" style="margin-top: 0;"> 
                 <label class="btn btn-sm btn-primary" data-toggle="modal" data-target="#inviteContactRoom" data-keyboard="false" data-backdrop="static" data-dismiss="modal" style="position: absolute;top: 26px;left: 22px;background-color:#6f66ff">{{ $t('AddParticapant') }}</label>
                 <div style="padding: 6px;">
                 <template v-for="person in roomcontactPersons">
                  <span class="badge badge-light">{{person.name}}</span>
                 </template>
             </div>
                  </div>
              </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <span>{{ $t('AttachFile') }}</span><br>
                    <div style="border: 1px #E5EAF9 solid;padding: 7px;border-radius: 3px;">
                      <label for="roomUpload" class="btn btn-sm btn-primary" style="background-color:#6f66ff">{{ $t('AttachFile') }}</label>
                      <input type="file" class="text-center form-control-file custom_file" ref="room_files" id="roomUpload" multiple @change="roomFileName()">
                      <label for="file_default"></label>
                      <label for="filename" id="roomfile"></label>

                   <template v-for="roomFile in roomfile">
                      <label v-if="roomfile"> {{roomFile.filename}}</label>
                      <label v-if="roomfile" @click="removeRoomfile(roomFile._id)" style="float:right"><img class="chatIcons" src="../assets/images/icons/svg/trash.svg" alt="Avatar"  ></label><br>
                    </template>
                    </div>
                  </div>
                </div>

                <div class="col-12" >
                  <div class="form-group">
                    <span>{{ $t('MeetingSchedule') }}</span><br>
                    <div class="theme-tab">
                      <ul class="nav nav-tabs room-tabs nav-justified">
                        <li class="nav-item">
                          <a id="daily-meeting" @click="roomType('daily')" data-toggle="tab" href="#dailyMeeting" role="tab" aria-controls="dailyMeeting" aria-selected="true" class="nav-link button-effect active">{{ $t('daily') }}</a>
                        </li>
                        <li class="nav-item">
                          <a id="weekly-meeting" @click="roomType('weekly')" data-toggle="tab" href="#weeklyMeeting" role="tab" aria-controls="weeklyMeeting" aria-selected="true" class="nav-link button-effect">{{ $t('weekly') }}</a>
                        </li>
                        <li class="nav-item">
                          <a id="monthly-meeting" @click="roomType('monthly')" data-toggle="tab" href="#monthlyMeeting" role="tab" aria-controls="monthlyMeeting" aria-selected="true" class="nav-link button-effect ">{{ $t('monthly') }}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content">
                      <div id="dailyMeeting" class="tab-pane fade show active">
                        <div class="row"> 
                          <div class="col-5 d-flex align-items-center">
                            <span>Select time to the day</span>
                          </div>
                          <div class="col-7" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="weeklyMeeting" class="tab-pane fade">
                        <div class="row"> 
                          <div class="col-2 d-flex align-items-center">
                            <span>Select day</span>
                          </div>
                          <div class="col-6 d-flex align-items-center">
                            <div class="weekDays-selector">
                             <input type="checkbox" id="weekday-mon" value="Mon" v-model="roomweek" class="weekday" />
                              <label for="weekday-mon">Mon</label>
                              <input type="checkbox" id="weekday-tue" value="Tue" v-model="roomweek" class="weekday" />
                              <label for="weekday-tue">Tue</label>
                              <input type="checkbox" id="weekday-wed" value="Wed" v-model="roomweek" class="weekday" />
                              <label for="weekday-wed">Wed</label>
                              <input type="checkbox" id="weekday-thu" value="Thu" v-model="roomweek" class="weekday" />
                              <label for="weekday-thu">Thu</label>
                              <input type="checkbox" id="weekday-fri" value="Fri" v-model="roomweek" class="weekday" />
                              <label for="weekday-fri">Fri</label>
                              <input type="checkbox" id="weekday-sat" value="Sat" v-model="roomweek" class="weekday" />
                              <label for="weekday-sat">Sat</label>
                              <input type="checkbox" id="weekday-sun" value="Sun" v-model="roomweek" class="weekday" />
                              <label for="weekday-sun">Sun</label>
                              
                            </div>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="monthlyMeeting" class="tab-pane fade">
                        <div class="row"> 
                          <div class="col-4 d-flex align-items-center">
                            <span>Select date & time</span>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Date:</span> -->
                              <datepicker :format="format" :highlighted="highlighted"  v-model="room.room_date" placeholder="DD / MM / YYYY"></datepicker>
                              
                            </div>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
           
                  </div>
                </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                
                <button id="addRoombutton" class="btn addMeeting" @click="addRoom()">
                <span id="addUpdateroom" style="color: white;padding-right: 8px;" >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <span style="color: white;">{{ $t('CreateRoom') }} </span></span> 
                </button>
              </div>
            </div>
          </div>
        </div>

  <div class="modal fade fev-addcall-main add-popup" id="schduleRoommodal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" style="max-width: 45%;" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title" id="roomTitle">
                  <img class="" src="../assets/images/nav/rooms.png" alt="Avatar" style="height: auto;border-radius: 0;" /> Schedule Room</h2>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="default-form">
                  <div class="row">

                <div class="col-12" >
                  <div class="form-group">
                    <span>Room Schedule</span><br>
                    <div class="theme-tab">
                      <ul class="nav nav-tabs room-tabs nav-justified">
                        <li class="nav-item">
                          <a id="daily-meeting1" @click="roomType('daily')" data-toggle="tab" href="#dailyMeeting1" role="tab" aria-controls="dailyMeeting1" aria-selected="true" class="nav-link button-effect active">{{ $t('daily') }}</a>
                        </li>
                        <li class="nav-item">
                          <a id="weekly-meeting1" @click="roomType('weekly')" data-toggle="tab" href="#weeklyMeeting1" role="tab" aria-controls="weeklyMeeting1" aria-selected="true" class="nav-link button-effect">{{ $t('weekly') }}</a>
                        </li>
                        <li class="nav-item">
                          <a id="monthly-meeting1" @click="roomType('monthly')" data-toggle="tab" href="#monthlyMeeting1" role="tab" aria-controls="monthlyMeeting1" aria-selected="true" class="nav-link button-effect ">{{ $t('monthly') }}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content">
                      <div id="dailyMeeting1" class="tab-pane fade show active">
                        <div class="row"> 
                          <div class="col-5 d-flex align-items-center">
                            <span>Select time to the day</span>
                          </div>
                          <div class="col-7" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="weeklyMeeting1" class="tab-pane fade">
                        <div class="row"> 
                          <div class="col-2 d-flex align-items-center">
                            <span>Select day</span>
                          </div>
                          <div class="col-6 d-flex align-items-center">
                            <div class="weekDays-selector">
                             <input type="checkbox" id="weekday-mon" value="Mon" v-model="roomweek" class="weekday" />
                              <label for="weekday-mon">Mon</label>
                              <input type="checkbox" id="weekday-tue" value="Tue" v-model="roomweek" class="weekday" />
                              <label for="weekday-tue">Tue</label>
                              <input type="checkbox" id="weekday-wed" value="Wed" v-model="roomweek" class="weekday" />
                              <label for="weekday-wed">Wed</label>
                              <input type="checkbox" id="weekday-thu" value="Thu" v-model="roomweek" class="weekday" />
                              <label for="weekday-thu">Thu</label>
                              <input type="checkbox" id="weekday-fri" value="Fri" v-model="roomweek" class="weekday" />
                              <label for="weekday-fri">Fri</label>
                              <input type="checkbox" id="weekday-sat" value="Sat" v-model="roomweek" class="weekday" />
                              <label for="weekday-sat">Sat</label>
                              <input type="checkbox" id="weekday-sun" value="Sun" v-model="roomweek" class="weekday" />
                              <label for="weekday-sun">Sun</label>
                              
                            </div>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="monthlyMeeting1" class="tab-pane fade">
                        <div class="row"> 
                          <div class="col-4 d-flex align-items-center">
                            <span>Select date & time</span>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Date:</span> -->
                              <datepicker :format="format" :highlighted="highlighted"  v-model="room.room_date" placeholder="DD / MM / YYYY"></datepicker>
                              
                            </div>
                          </div>
                          <div class="col-4" style="padding-bottom: 5px;">
                            <div class="form-group">
                              <!-- <span>Time:</span> -->
                              <vue-timepicker  hide-dropdown format="hh:mm a" v-model="room.room_time" placeholder="HH:MM"></vue-timepicker>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                
                <button  class="btn addMeeting" @click="schduleRoom()">
                <span id="" style="color: white;padding-right: 8px;" >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <span style="color: white;">Schedule Room</span></span> 
                </button>
              </div>
            </div>
          </div>
        </div>


        <div class="modal fade fev-addcall-main add-popup" id="inviteContactRoom" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 45%;
          ">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">
              Invite From Contacts</h2>
              <button class="close" type="button"  data-toggle="modal" data-target="#addRoommodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="max-height: 550px;overflow-x: hidden;">
              <form class="default-form">
               <div class="form-group">
                <input class="form-control"style="padding: 15px 21px;" v-model="roomuserSearch" type="text" placeholder="Search from contact " />
              </div>

            </form>
            <div style="margin-top: 40px;" v-if="roomshowUsers">
              <div class="" v-for="(friends, index) in orderedUsers" :key="friends._id" v-if="friends._id != c_user._id">
               <div style="display: inline-flex;">
                 <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                  <div v-else  class="userprofile" >
                   <span> {{getFirstLetter(friends.name)}}</span>
                 </div></div>
                 <div v-else class="profile offline">
                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                   <div v-else  class="userprofile" >
                     <span> {{getFirstLetter(friends.name)}}</span>
                   </div>
                 </div>
                 <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
               </div>

               <span class="btn btn-sm btn-success showAddmeeting" :id="'roomcontactadd'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="addroomContactPersons(friends)">{{ $t('Add') }}</span>
               <span class="btn btn-sm btn-danger hideRemovemeeting" :id="'roomcontactRm'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="removeroomContactPerson(friends._id,friends.name,index)">{{ $t('Remove') }}</span>
             </div>

           </div>
            <div style="margin-top: 40px;" v-if="roomuserSearching">
              <div class="" v-for="(friends, index) in filteredroomUserlist" :key="friends._id" v-if="friends._id != c_user._id">
               <div style="display: inline-flex;">
                 <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                  <div v-else  class="userprofile" >
                   <span> {{getFirstLetter(friends.name)}}</span>
                 </div></div>
                 <div v-else class="profile offline">
                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                   <div v-else  class="userprofile" >
                     <span> {{getFirstLetter(friends.name)}}</span>
                   </div>
                 </div>
                 <p style="margin-top: 11px;padding-left: 9px;">{{friends.name}}</p>
               </div>

               <span class="btn btn-sm btn-success showAddmeeting" :id="'roomcontactadd'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;" @click="addroomContactPersons(friends)">{{ $t('Add') }}</span>
               <span class="btn btn-sm btn-danger hideRemovemeeting" :id="'roomcontactRm'+friends._id" style="padding: 4px 7px;float:right;cursor: pointer;display:none" @click="removeroomContactPerson(friends._id,friends.name,index)">{{ $t('Remove') }}</span>
             </div>

           </div>
         </div>
         <div class="modal-footer">
          <button class="btn btn-danger button-effect btn-sm" type="button"  data-toggle="modal" data-target="#addRoommodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal">{{ $t('Cancel') }}</button>
          <button class="btn btn-primary button-effect btn-sm"  data-toggle="modal" data-target="#addRoommodal" data-keyboard="false" data-backdrop="static" data-dismiss="modal" type="button" style="background-color:#6f66ff">{{ $t('AddContact') }}</button>
        </div>
      </div>
    </div>
  </div>
    <!-- End Create Room Modal -->

    <div class="modal fade add-popup todo-main-modal" id="todoModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              Welcome to Chitchat</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <div class="todo-task">
                <h5>Felling Lonely</h5>
                <div class="todo-main-content">
                  <div class="form-group">
                    <input type="checkbox" aria-label="Checkbox for following text input" />
                    <input class="w-100" id="user_input123" type="text" placeholder="Fill Your Fillings " />
                  </div>
                  <div class="drop-picker">
                    <div class="dropdown currency" tabindex="1">
                      <div class="select">
                        <span>{{ $t('AssignTO') }}</span>
                      </div>
                      <input type="hidden" name="currency" />
                      <ul class="dropdown-menu">
                        <li class="dropdown-divider">
                          <div class="fa fa-user text-muted"></div>
                          <h5 class="text-muted">{{ $t('AssignTO') }}</h5>
                        </li>
                        <li>Josephin john</li>
                        <li>Lynetin john</li>
                        <li>Sufiya john</li>
                        <li>Jhon john</li>
                      </ul>
                    </div>
                    <input class="datepicker-here form-control digits" type="url" data-language="en" placeholder="Due date" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button">{{ $t('Save') }}</button>
            <button class="btn btn-primary button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade add-popup create-todo-main-modal" id="createtodoModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              Today's ToDo</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="default-form">
              <div class="todo-task">
                <h5>Felling Lonely</h5>
                <div class="todo-main-content">
                  <div class="form-group">
                    <input class="w-100" id="user_input123" v-model="todo" type="text" placeholder="Fill Your Fillings " />
                  </div>
                   <div class="form-group">
                       <select class="custom-scroll" name="" v-model="assignName">
                      <option selected value="">{{ $t('AssignTO') }}</option>
                      <template v-for="item in friendsdata">
                      <option :value="item">{{item.name}}</option>
                      </template>
                    </select>
                  </div>
                   <div class="form-group">
                      <input type="date" style="width:100%" name="" v-model="assignDate">
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger button-effect btn-sm" type="button" @click="saveTodo()">{{ $t('Save') }}</button>
            <button class="btn btn-primary button-effect btn-sm" type="button" data-dismiss="modal">{{ $t('Cancel') }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade add-popup msg-chat-modal" id="msgchatModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <img class="" src="../assets/images/nav/newchat.png" alt="Avatar" style="height: auto;border-radius: 0;" /> {{ $t('NewChat') }}</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="min-height: 500px;">
            <div style="margin-right: -10px;margin-left: -10px;">
              <div class="input-group"> 
                <input class="form-control modelsearch" v-model="userSearch" type="text" :placeholder="$t('Search ...')" />
               
              </div>
            </div>
            <div class="form-group mb-0 mt-2">
             
              <ul class="chat-main custom-scroll" v-if="userData">
                <template v-if="orderedUsers.length != 0">
            <li v-for="friends in orderedUsers"  v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank"  style="cursor: pointer;width: 100%;    padding-left: 0px;padding-right: 5px;">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                                <div class="details" style="padding-left: 73px;">
                                  <h5>{{friends.name}}</h5>
                                  <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                  <h6 :id="'f_typing'+friends._id" v-else>Start Chat</h6>
                                </div>

                                <div class="date-status">
                                  <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                  <div v-if="friends.usCount != 0" class="badge badge-primary sm">{{friends.usCount}}</div>
                                <!--   <h6 class="font-success status" v-else-if="friends.seenStatus == 1 "> Seen</h6> -->
                                </div>
                              </div>
                            </li>
                            <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="chat-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-if="friends.friendReqSenderId == friends._id">
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                    </p>
                                  </div>
                                </div>

                                <div v-else>
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </li>
                            </template>
                             <li v-else>
                            <div style="padding: 20px;text-align: center;margin-top: 90px;" >
                            <p> <img  src="../assets/images/icons/nocontacts.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have Contact') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                        </li>
                      </ul>

                     <div v-if="userSearching">
                            <ul class="chat-main custom-scroll sear" v-if="filteredUserlist.length > 0" >

                              <li v-for="friends in filteredUserlist" v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank"  style="cursor: pointer;width: 100%;    padding-left: 0px;padding-right: 5px;">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <h6 :id="'f_typing'+friends._id" v-if="friends.latestMsg.message">{{ friends.latestMsg.message }}</h6>
                                    <h6 v-else>Start Chat</h6>
                                  </div>

                                  <div class="date-status">
                                    <h6 class="todayDate">{{isToday(friends.updatedByMsg)}}</h6>
                                    <div v-if="friends.usCount != 0" class="badge badge-primary sm">{{friends.usCount}}</div>
                                    <!-- <h6 class="font-success status" v-else> Seen</h6> -->
                                  </div>

                                </div>

                              </li>

                              <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                            </div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>
                                  <div v-if="friends.friendReqSenderId == friends._id">
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div v-else>
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                </div>

                              </li>

                              <li v-else :id="'friend'+friends._id" data-to="blank" style="">
                                <div class="chat-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <button type="button" @click="addfriends(friends)" class="btn btn-sm btn-default" style="cursor:pointer">{{ $t('AddFriend') }}</button>
                                  </div>

                                </div>

                              </li>

                            </ul>
                          <ul v-else>
                           <li> <p style="text-align: center;">{{ $t('NoRecordFound') }}</p></li>
                          </ul>

                        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade add-popup msg-chat-modal" id="msgcallModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              <img class="" src="../assets/images/nav/newcall.png" alt="Avatar" style="height: auto;border-radius: 0;" />{{ $t('NewCall') }}</h2>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="min-height: 500px;">
            <div style="margin-right: -10px;margin-left: -10px;">
              <div class="input-group">
               <input class="form-control modelsearch" v-model="userSearch" type="text" :placeholder="$t('Search ...')" />
              </div>
            </div>
            <div class="form-group mb-0 mt-2">
             
            <ul class="call-log-main custom-scroll" v-if="userData">
              <template v-if="orderedUsers.length != 0">
            <li v-for="friends in orderedUsers"  v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank"  style="cursor: pointer;width: 100%;    padding-left: 0px;padding-right: 12px;">
                              <div class="call-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                  <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                   <span> {{getFirstLetter(friends.name)}}</span>
                                </div></div>
                                <div v-else class="profile offline">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                  <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>

                              <div class="details">
                                <h5>{{friends.name }}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(friends.updatedByMsg)}}</h6>
                              </div>
                              <div class="call-status">
                                <!--<div class="icon-btn btn-outline-success button-effect btn-sm">
                                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                  </div>-->
                                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Quick Audio Call"  @click="videostartCall(friends,'audio')" style="margin-right: 10px;">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </a>
                                <a class="icon-btn btn-light button-effect" href="#" @click="videostartCall(friends,'video')" data-tippy-content="Quick Video Call"  >
                                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                                </a>
                              </div>
                              </div>
                            </li>
                            <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                              <div class="call-box">
                                <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                 <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-else class="profile offline">
                                <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                </div>
                                <div v-if="friends.friendReqSenderId == friends._id">
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                    </p>
                                  </div>
                                </div>

                                <div v-else>
                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <p style="margin: 0;">
                                      <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                      <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </li>
                              </template>
                             <li v-else>
                            <div style="padding: 20px;text-align: center;margin-top: 90px;" >
                            <p> <img  src="../assets/images/icons/nocontacts.png" alt="Avatar" style="height: auto;" /></p>
                            <p>{{ $t('You Dont Have Contact') }}<br>
                                {{ $t('PleaseAddContactAndExploreChatto') }}</p>
                            
                          </div>
                        </li>
                      </ul>

                     <div v-if="userSearching">
                            <ul class="call-log-main custom-scroll" v-if="filteredUserlist.length > 0" >
                              <li v-for="friends in filteredUserlist" v-bind:key="friends._id" v-if="friends._id != c_user._id && friends.friendReqStatus == 1" class="init" @click="startchat(friends)" :id="'friend'+friends._id" data-to="blank"  style="cursor: pointer;width: 100%; padding-left: 0px;padding-right: 12px;">
                                <div class="call-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                   <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>

                                    <div class="details">
                                <h5>{{friends.name }}</h5>
                                <h6>
                                  <i data-feather="arrow-down-left"></i>{{isToday(friends.updatedByMsg)}}</h6>
                              </div>
                              <div class="call-status">
                                <!--<div class="icon-btn btn-outline-success button-effect btn-sm">
                                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                  </div>-->
                                <a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Quick Audio Call"  @click="videostartCall(friends,'audio')" style="margin-right: 10px;">
                                   <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Call.svg" alt="Avatar"  />
                                </a>
                                <a class="icon-btn btn-light button-effect" href="#" @click="videostartCall(friends,'video')" data-tippy-content="Quick Video Call" >
                                     <img class="chatIcons" style="padding-right: 0px;" src="../assets/images/icons/svg/Video-Call.svg" alt="Avatar"  />
                                </a>
                              </div>

                                </div>

                              </li>

                              <li v-else-if="friends.friendReqStatus == 2" class="init" :id="'friend'+friends._id" data-to="blank">
                                <div class="call-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                            </div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div>
                                  </div>
                                  <div v-if="friends.friendReqSenderId == friends._id">
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 25px;" @click="friendRequestupdate(friends,1)">{{ $t('Accept') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Reject') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div v-else>
                                    <div class="details" style="padding-left: 73px;">
                                      <h5>{{friends.name}}</h5>
                                      <br>
                                      <p style="margin: 0;">
                                        <span style="cursor: pointer;color:green;padding-right: 20px;">{{ $t('Pending') }}</span>
                                        <span style="cursor: pointer;color:red" @click="friendRequestupdate(friends,3)">{{ $t('Cancel') }}</span>
                                      </p>
                                    </div>
                                  </div>

                                </div>

                              </li>

                              <li v-else :id="'friend'+friends._id" data-to="blank" style="">
                                <div class="call-box">
                                  <div v-if="friends.onlineStatus == 1" class="profile" v-bind:class="{ online: friends.pStatus == 0, unreachable : friends.pStatus == 1, busy: friends.pStatus == 2, offline: friends.pStatus == 3, offline: friends.pStatus == 4 }">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                 <span> {{getFirstLetter(friends.name)}}</span>
                              </div></div>
                                  <div v-else class="profile offline">
                                    <img class="bg-img" style="min-height: 49px;"  v-if="friends.user_image" :src="hostname+'images/chatImages/'+friends.user_image" alt="Avatar" />
                                   <div v-else  class="userprofile" >
                                     <span> {{getFirstLetter(friends.name)}}</span>
                                   </div>
                                  </div>

                                  <div class="details" style="padding-left: 73px;">
                                    <h5>{{friends.name}}</h5>
                                    <br>
                                    <button type="button" @click="addfriends(friends)" class="btn btn-sm btn-default" style="cursor:pointer">{{ $t('AddFriend') }}</button>
                                  </div>

                                </div>

                              </li>

                            </ul>
                          <ul v-else>
                           <li> <p style="text-align: center;">{{ $t('NoRecordFound') }}</p></li>
                          </ul>

                        </div>

              </ul>
            </div>
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
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import  { VEmojiPicker } from 'v-emoji-picker';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
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


Vue.use(AudioRecorder);
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader
} from 'vue-content-loader'
import {ClipboardIcon ,BookmarkIcon ,CameraIcon ,Edit3Icon, UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, AirplayIcon, AtSignIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneIncomingIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon,TagIcon,SettingsIcon } from 'vue-feather-icons';
import carousel from 'vue-owl-carousel';
import timeList from '../timelist.js';
import { duration_hourList, duration_minuteList } from '../durationlist.js';
// import * as durationList from "../durationlist.js";

export default {
  name: 'MainComponent',
  components: {InputTag,BookmarkIcon ,Edit3Icon, VueTimepicker, Datepicker, ClipboardIcon ,CameraIcon , UserIcon, VolumeXIcon, SlashIcon, FilePlusIcon, MonitorIcon, MessageCircleIcon, AudioRecorder, ContentLoader, InfiniteLoading, RadioIcon, Minimize2Icon, Trash2Icon, CheckIcon, VEmojiPicker, Loading, vueDropzone, carousel, PhoneIncomingIcon, PhoneIcon, VideoIcon, SmileIcon, MicIcon, SendIcon, MessageSquareIcon, UsersIcon, PlusCircleIcon, PlusIcon, PhoneOutgoingIcon, FileIcon, ClockIcon, ListIcon, GridIcon, BookIcon, XIcon, DownloadIcon, SearchIcon, StarIcon, MoreVerticalIcon, ArrowLeftIcon,TagIcon,SettingsIcon   },
  props: [],
  data() {
    return {
      duration_minutes: duration_minuteList,
      duration_hours: duration_hourList,
      timelist: timeList,
       highlighted: {
        dates: [ 
          new Date()
       ]},
      format: "d / MM / yyyy",
      data: '',
      isConnected: false,
      socketMessage: '',
      presentersMsg:false,
      presentersMeeting:false,
      presentersRoom:false,
      presentersNoti:false,
      presentersMsg2:false,
      friendsdata: [],
      searchUsers: [],
      userId: '',
      current_User: '',
      userImageName:'',
      singlefriend: {},
      searchFriend: '',
      showSearchfriends: false,
      showUsers: true,
      roomshowUsers: true,
      showUsersContact: true,
      msgObj: {},
      message: '',
      friendchat: {},
      friendCallchat: {},
      chatdata: {},
      typing: false,
      groups: [],
      singlegroup: {},
      oncallGroup: {},
      groupdata: {},
      receiveGroupName: '',
      grouCallStatus: false,
      callGroup: {},
      groupSearch: '',
      userSearch: '',
      groupmessage: '',
      groupmsgObj: {},
      groupchatdata: [],
      groupCallId: '',
      not_working: true,
      groupLoader: false,
      messagecopy: '',
      searchchat:{},
      msgsearch:'',
      searchmsg:false,
      mainmsg:true,
      groupsearchchat:{},
      groupmsgsearch:'',
      groupsearchmsg:false,
      groupmainmsg:true,
      editChatid: '',
      onEditclear: false,
      onChat: true,
      onbroChat: true,
      editgroupChatid: '',
      onEditgroupclear: false,
      ongroupChat: true,
      dropzoneOptions: {
        url: 'https://chat.chatto.jp:22000/chatFilesShare',
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
      groupreplyBox: false,
      groupchatreplydata: {},
      groupformDatas: {},
      isGroupcall: false,
      isO2Ocall: false,
      userdec: {},
      isLoading: false,
      fullPage: true,
      isSeen: false,
      isActive: false,
      ischatemojiActive: false,
      isbroadchatemojiActive: false,
      multiplemembers: [],
      multipleneewmembers: [],
      havegroup: false,
      groupmembers: '',
      groupName: '',
      groupRoomName: '',
      groupUser: '',
      addgroupData: {},
      showGrouptitle: true,
      editgTitle: false,
      groupIndex: '',
      showmembers: true,
      shownewmembers: false,
      nonGroupUsers: [],
      userid: '',
      dragAndDropCapable: false,
      windowHeight: 0,
      hostname: '',
      broadcastPassword: '',
      presenterPassword: '',
      broadcastingId: '',
      broadcastChat: [],
      presentersData: [],
      bcPresenterId: '',
      broadcastHtml: '',
      starterBroid: '',
      broadCastmsg: '',
      presenterId: '',
      oncallFriend: {},
      o2ostatus: false,
      groupstatus: false,
      elapsedTime: 0,
      timer: undefined,
      elapsedcallTime: 0,
      calltimer: undefined,
      callstatus: 0,
      groupelapsedcallTime: 0,
      groupcalltimer: undefined,
      groupcallstatus: 0,
      audio: {},
      videoPause: true,
      videoPlay: false,
      audioPause: true,
      audioPlay: false,
      groupVideoPause:true,
      groupVideoPlay:false,
      groupAudioPause:true,
      groupAudioPlay:false,
      callType: '',
      groupData: true,
      groupSearching: false,
      userData: true,
      roomuserSearch: '',
      roomuserSearching: false,
      userSearching: false,
      roomshowRoom : true,
	    roomroomSearching : false,
	    roomSearch: '',
	    meetingshowRoom : true,
	    meetingmeetingSearching : false,
	    meetingSearch: '',
      selectFriendStatus: false,
      todo:'',
      assignDate:'',
      assignName:'',
      myTodoList:[],
      TodoList:[],
      todoStatus:'',
      allMedia:[],
      allDocument:[],
      notificationDate:[],
      notificationStatus:false,
      screenshareActive:true,
      stopscreenshareActive:false,
      startScreenuser:'',
      invitePersons:[],
      contactPersons:[],
      contactPersonsName:[],
      notecontactPersons:[],
      notecontactPersonsName:[],
      invitePersonMeeting:'',
      tagsperson:'',
      meeting_time_meridian: 'am',
      meeting_duration_minutes: '0',
      meeting:{
	      meeting_title:'',
	      meeting_zone:'',
	      meeting_notification:'',
	      meeting_topic:'',
	      meeting_password:'',
	      meeting_time:'hh:mm',
	      meeting_date:'',
	      meeting_duration:'0',
	      meeting_id:'',
      },
      meetingfile:'',
      roomfile:'',
      room:{
	      room_title:'',
	      room_topic:'',
	      room_password:'',
	      room_time:'',
	      room_date:'',
	      room_id:'',
        room_timezone:'',
      },
      replyroomBox: false,
      onroomEditclear: false,
      onroomChat: true,
      showroommembers: true,
      shownewroommembers: false,
      nonRoomUsers: [],
      roomIndex: '',
      roomsData:[],
      singleRoom:{},
      roomtype:'daily',
      roomweek:[],
      editroomId:'',
      roomcontactPersons:[],
      roomcontactPersonsName:[],
      roomcontactPersonsId:[],
      roommessage:'',
      roomchatreplydata: '',
      editroomChatid:'',
      roomsChat:[],
      updateMeeting_id:'',
      meetingsData:[],
      completemeetingsData:[],
      singleMeeting:'',
      editMeetingId:'',
      membersCount:0,
      meetingType:'',
      username:'',
      callerData:'',
      receivecallerData:'',
      allCallData:[],
      missCallData:[],
      dialCallData:[],
      receiveCallData:[],
      singlecall:'',
      callHistories:[],
      chatconttoggle: true,
      chatconttoggleclose: false,
      forwardchatdata:'',
      searchforwardcontact:'',
      o2ocallData:'',
      callData:'',
      buttonDisable:true,
      buttonEnable:false,
      roomJoined: false,
      selectedChatType: 0,    //0-> user is selected, 1-> group is selected
      exmobile:'',
      blockUsers:[],
      hideUsers:[],
      confirmMobile:'',
      Newmobile:'',
      exemail:'',
      Newemail:'',
      Newpassword:'',
      confirmpassword:'',
      UserId:'',
      note:{
        noteTitle:'',
        noteTopic:'',
        noteDate:'',
        noteCategory:'',
      },
      editnoteId:'',
      noteData:[],
      designNotes:[],
      generalNotes:[],
      projectsNotes:[],
      singleNote:'',
      callDisable:false,
      bookmarkChat:[],
      notificationsList:[],
      callID:'',
      docSearch:'',
      docData :true,
      docSearching :false,
      locales:process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(','),
      settingsPanelOpen: false,
      selected_language: "english"
    }

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

    _meetingRecordFile(data){
      console.log("_meetingRecordFile: ", data);

     if(this.singleMeeting._id == data.meetingId) this.singleMeeting.recorded_file = data.recordingFileName;

      for (let m= 0; m < this.meetingsData.length; m++){
        if (data.meetingId == this.meetingsData[m]._id) this.meetingsData[m].recorded_file = data.recordingFileName;
      }
    },

    /////////////////////////////CHAT SECTION////////////////////////

    receivemsg(data) {
      //this.c_user._id == data.callerId._id &&
      // setTimeout(() => {
      //   // $('#f_typing' + data.msgData.receiverId._id).html(data.msgData.message);
      // }, 1000);


      if (this.c_user._id == data.msgData.receiverId._id && this.singlefriend._id == data.msgData.senderId._id) {

        this.friendchat.push(data.msgData);
        var messagetone = document.getElementById("messagetone");
        messagetone.play();
        messagetone.muted = false;
        this.presentersMsg2= true;
        // $('#f_typing'+data.msgData.receiverId._id).html(data.msgData.message);
        var container = this.$el.querySelector("#chating");
        $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
        var container2 = this.$el.querySelector("#o2ochating");
        $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        // var container3 = this.$el.querySelector("#o2oaudiochating");
        // $("#o2oaudiochating").animate({ scrollTop: container3.scrollHeight + 7020 }, "fast");
        const userdec = this.friendsdata.filter((obj) => {
          return data.userId === obj._id;
        }).pop();
        // userdec.updatedByMsg = new Date().toISOString();
        userdec.latestMsg.message=data.msgData.message;
        if (this.singlefriend.chatWithRefId == this.c_user._id) {
          // this.friendCallchat.push(data.msgData);

          this.isSeen = true;
       
        }

      }
      else if (this.c_user._id == data.selectFrienddata) {
        var messagetone = document.getElementById("messagetone");
        messagetone.play();
        messagetone.muted = false;
        // const fdata = this.friendsdata.filter((obj) => {
        //   return data.userId === obj._id;
        // }).pop();

        const userdec = this.friendsdata.filter((obj) => {
          return data.userId === obj._id;
        }).pop();
        userdec.updatedByMsg = new Date().toISOString();
        userdec.latestMsg.message=data.msgData.message;
        this.presentersMsg= true;
        this.isSeen = false;
        userdec.usCount += 1;
       
      }
    },

    receiverUserStatus(data) {
      if (!this.friendsdata) return false;
      

      const post = this.friendsdata.filter((obj) => {
        return data.userId === obj._id;
      }).pop();
      if(post){
      
      post.chatWithRefId = data.selectedUser;
       if(data.selectedUser){
          this.isSeen = true;


       for(var i=0; i <= this.friendchat.length; i++ ){
		
          if(data.selectedUser === this.friendchat[i].senderId._id){
          	this.friendchat[i].isSeen = 1;
          
		}
       }

        }
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
        if(data){
          this.$set(this.friendchat[this.friendchat.length - 1], '_id', data._id);
        }
    },

    lastchatobj_receive(data) {
      if (data) {
        if(this.c_user._id == data.senderId._id){
          if (data.isSeen == 1) {
            this.isSeen = true;
          } else {
            this.isSeen = false;
          }
      }

      }
    },

    reciverdeletemsg(data) {

      const post = this.friendchat.filter((obj) => {
        return data._id === obj._id;
      }).pop();
      post.isDeleted = 1;
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },

    //////////////////////END CHAT SECTION////////////////////////
/////////////////////////// ROOM SECTION /////////////////

 receiveRooms(data) {
     
      if (this.roomsData) {
         const post = this.roomsData.filter((obj) => {
        return data.msgData.groupId === obj._id;
      }).pop();
        if(post)
        this.roomsChat.push(data.msgData);
      }

    },
receivecreateroom(data) {

 const post = data.roomMembers.filter((obj) => {
  
            return this.c_user._id === obj._id;
          }).pop();
       if(post){
          this.presentersRoom = true;
          this.roomsData.push(data.roomData);
       }

    },

receivecreatemeeting(data) {

      const post = data.friend_members.filter((obj) => {
            return this.c_user._id === obj._id;
          }).pop();
       if(post){
        console.log(data);
          this.presentersMeeting = true;
          this.meetingsData.push(data);
       }

    },
    
receiveupdateroom(data) {

 const post = this.roomsData.filter((obj) => {
  
            return data._id === obj._id;
          }).pop();
       if(post){

            post.room_title = data.room_title;
            post.room_topic= data.room_topic;
            post.room_timezone= data.room_timezone;
            post.room_password= data.room_password;
            post.room_id= data.room_id;
       }
    },
 receivedeleteroom(data) {
      var id=this.roomsData[data.index]._id;
        if (id === data.roomId) {

        this.roomsData.splice(data.index, 1)
        
      } else {
        let found = this.roomsData.indexOf(data.roomId)
        if(found != -1){
        this.roomsData.splice(found, 1);
          
        }
        
      }

    },

        receiveroomupdatechatmsg(updatedata) {
          const data = updatedata;
          const post = this.roomsChat.filter((obj) => {
            return updatedata.chatid === obj._id;
          }).pop();
          post.message = data.message;

    },
 receiveroomdeletemsg(data) {

      const post = this.roomsChat.filter((obj) => {
        return data._id === obj._id;
      }).pop();
      post.isDeleted = 1;
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },
    receiveroomid(data) {
        if(data){
          this.$set(this.roomsChat[this.roomsChat.length - 1], '_id', data._id);
        }
    },

    _updateRoomCallStatus(data){
      console.log(data);
       if (data){
          if (this.roomsData) {
            for (let r = 0; r < this.roomsData.length; r++){
                if (this.roomsData[r]._id == data._id){
                    this.roomsData[r].activeStatus = 1;
                    break;
                }
            }
          }
           const mdata = this.roomsData.filter((obj) => {
             return data._id === obj._id;
            }).pop();
           console.log(mdata);
               if(mdata){
                this.presentersRoom = true;
               }
       }
    },


    _leaveRoomCall(data){
         if (data){
          if (this.roomsData) {
            for (let r = 0; r < this.roomsData.length; r++){
                if (this.roomsData[r]._id == data._id){
                    this.roomsData[r].activeStatus = 0;
                    break;
                }
            }
          }
       }
    },

    ///////////////////////GROUP SECTION/////////////////////////
    receiveGroups(data) {
      if (this.groups) {
      	 const post = data.groupMembers.filter((obj) => {
        return this.c_user._id === obj;
      }).pop();
      	if(post)
          this.presentersMsg= true;
          this.groups.push(data.groupData);
      }

    },

    groupreceiveid(data) {
      this.$set(this.groupchatdata[this.groupchatdata.length - 1], '_id', data._id);
    },

    receivegroupmsg(data) {
      if (this.groupchatdata) {
        this.groupchatdata.push(data);
        var container = this.$el.querySelector("#group_chat_open");
        $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
        var container2 = this.$el.querySelector("#groupchating");
        $("#groupchating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
      }

for (let g= 0; g < this.groups.length; g++){
   if (data.groupId === this.groups[g]._id) {
     this.groups[g].latestMsg.message = data.message;
     break;
   }
}

    },

    groupreceiveid(data) {
      if (!data) return;
      if (!this.groupchatdata) return;  //NEEDS RECHECK [3-30-2021]

      this.$set(this.groupchatdata[this.groupchatdata.length - 1], '_id', data._id);
    },
    receiveupdateGroupchatmsg(updatedata) {
      const data = updatedata;
      const post = this.groupchatdata.filter((obj) => {
        return updatedata.chatid === obj._id;
      }).pop();
      post.message = data.message;
    },

    receiveGroupTitle(data) {
      const post = this.groups.filter((obj) => {
        return data._id === obj._id;
      }).pop();
      post.name = data.name;
      // this.singlegroup = data;
    },
    receivedeleteGroup(data) {
      this.groups = data;
      $('#startgroupchat').removeClass('active');
    },

    receiveupdateMembers(data) {
      for (var l = 0; l < this.groups.length; l++) {
        if (data.groupId == this.groups[l]._id) {
          for (var m = 0; m < this.groups[l].members.length; m++) {

            if (this.groups[l].members[m]._id == data.memberId) {
              let memberIndex = this.groups.indexOf(this.groups[l].members[m]);
              this.groups[l].members.splice(memberIndex, 1);

              if (this.c_user._id != data.userId)
                $('#showGroupsMembers').modal('hide')
              $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");
              $('#startgroupchat').removeClass('active');
              // if user leaves group
              if (this.c_user._id == data.memberId) {
                $('#showGroupsMembers').modal('hide')
                $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");
                $('#startgroupchat').removeClass('active');
                let groupIndex = this.groups.indexOf(this.groups[l]);
                this.groups.splice(groupIndex, 1);
                break;
              }
            }
          }
        }
      }
    },

    grpreciverdeletemsg(data) {
      const post = this.groupchatdata.filter((obj) => {
        return data._id === obj._id;
      }).pop(post);
      post.isDeleted = 1;
      $('#receiver' + data._id).html(""+ this.$t('messagedeleted'));

    },
    //////////////////////// Group Call //////////////////////

    receiveGroupdetail(data) {

      const groupId = this.groups.filter((obj) => {
          return data.groupId === obj._id;
      }).pop(groupId);

      if (data.userId != this.c_user._id) {
        this.receiveGroupName = data.groupName;
        this.groupCallId = data.groupCallid;
        this.groupStatusCall = data.statusCall;
        if (groupId) {
          this.callGroup = groupId;
          if(this.callDisable != true){
            this.checkGroupcallstart();
            $('#groupcallReceiver').modal('show');
          }
          
        }
      }
      if (groupId) {
        groupId.groupCallStatus = 1;
        this.isGroupcall= true;
      }

     
    },

// ------- groupCall close -----------------------------
receivegroupcallclose(data) {

if(data.userId == this.c_user._id){
        console.log('true');
        this.callDisable=false;
      }
  },
     receiveGroupclose(data) {
      // alert('cllclose');
      if(data.userId == this.c_user._id){
        this.callDisable=false;
      }
        const groupId = this.groups.filter((obj) => {
          return data.groupId === obj._id;
        }).pop(groupId);

        if (groupId) {
         groupId.groupCallStatus = 0;
        }
    },
    //////////////////////////END GROUP SEECTION ///////////////
    
///////////////////////////////// SCREEN SHARE ////////////////////////////////////
receivescreenUrl(data){
    this.startScreenuser = data.startScreen;
  if(data.friendId == this.c_user._id){
    var html='<iframe style="width: 100%;height: calc(100vh - 30px);" src="'+data.viewerUrl+'" title="description">';
    $('#o2oparticipants').children('div').removeClass('participant');
    $('#o2oparticipants').children('div').addClass('participantscreen');
    $('#o2oparticipants').css({"width": "30%", "float": "left"});
    $('#remoteScreenshare').css({"width": "69%", "float": "right","display": "block"});
   this.screencode=data.viewerUrl;
    $('#remoteScreenshare').html(html);
    localStorage.setItem('screenSharing', 0);
  }
},
receivestopScreenshare(data){
	console.log(data);
  if(data.userId == this.c_user._id){
     this.stopscreenshareActive=false;
     this.screenshareActive=true;
  }
  if(data.friendId == this.c_user._id){
    $('#o2oparticipants').children('div').removeClass('participantscreen');
    $('#o2oparticipants').children('div').addClass('participant');
    $('#o2oparticipants').css({"width": "100%", "float": "left"});
    $('#remoteScreenshare').html('');
    
    $('#remoteScreenshare').css('display','none');
    localStorage.setItem('screenSharing', 0);
  }
},


    starttyping(data) {
    //	console.log(data);
	  	if(data.selectFrienddata._id == this.c_user._id){

		      const post = this.friendsdata.filter((obj) => {
		        return data.UserId === obj._id;
		      }).pop();
         // console.log(post);
		      if (post) {

		        if (this.singlefriend._id == data.UserId && post._id == data.UserId) {
		          this.typing = true;
             // console.log('ifmatach',this.singlefriend._id +'=='+ data.UserId +'&&'+ post._id +'=='+ data.UserId);

		        } else if (post._id == data.UserId) {
             // console.log('match');
		          post.latestMsg.message='is typing ...';
		          this.typing = false;

		        }
		      }
		}
    },

    stoptyping(data) {
      this.typing = false;
      if(data && this.c_user._id != data.userId){
    	//console.log(data);
      const post = this.friendsdata.filter((obj) => {
		        return data.UserId === obj._id;
		      }).pop();
          // console.log(post);
          // console.log(post.hasOwnProperty('latestMsg'));
          if(post && post.hasOwnProperty('latestMsg') && data.lastmsg)
          	 post.latestMsg.message=data.lastmsg.message;
          else{
            if (post && post.hasOwnProperty('latestMsg')) post.latestMsg.message='Start Chat';
          }
		      this.typing = false;
      }
    },

    receivechangeStatus(data) {
      const post = this.friendsdata.filter((obj) => {
        return data.userId === obj._id;
      }).pop();

      if (post) {
        post.pStatus = data.status
      }
    },
    changestatuslogin(data) {
      const post = this.friendsdata.filter((obj) => {
        return data === obj._id;
      }).pop();

      if (post) {
        post.onlineStatus = 1;
        post.chatWithRefId= 0;
      }
    },

    changestatuslogout(data) {
      const post = this.friendsdata.filter((obj) => {
        return data === obj._id;
      }).pop();
      if (post) {
        post.onlineStatus = 0;
        post.chatWithRefId= 0;
      }
    },
    receiveUpdateReadReceipt(data) {
          const post = this.friendsdata.filter((obj) => {
            return data.userId === obj._id;
          }).pop();

          if (post) {
            post.readReceipts = data.receiptStatus;
          }
        },

    receiveupdatesetvideo(data) {
          // const post = this.friendsdata.filter((obj) => {
          //   return data.userId === obj._id;
          // }).pop();

          // if (post) {
          //   post.videoCallReceive = data.videoStatus;
          // }

           for (let friend of this.friendsdata){
            if (data.userId === friend._id) {
              friend.videoCallReceive = data.videoStatus;
              break;
            }
          }
        },

    receiveupdatesetaudio(data) {
          // const post = this.friendsdata.filter((obj) => {
          //   return data.userId === obj._id;
          // }).pop();
    
          // if (post) post.voiceCallReceive = data.audioStatus;
          
          // console.log("receiveupdatesetaudio1:", data);
          // console.log("receiveupdatesetaudio2:", post);

          for (let friend of this.friendsdata){
            if (data.userId === friend._id) {
              friend.voiceCallReceive = data.audioStatus;
              break;
            }
          }
        },
    ///////////////////////BROADCASTING SECTION/////////////////////////


    receiveClosepanle(data) {

      if (data == this.broadcastingId) {

        this.broadcastChat = [];
        $('#broadcastvideocall').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }
    },

    receivebroadcastmsg(data) {
      if (data.receiverId == this.broadcastingId) {
        $('#chatopen').addClass('dot-btn dot-success grow');
        this.broadcastChat.push(data);
        var containers = this.$el.querySelector("#brochatings");
        $("#brochatings").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");
      }
    },

    ////////////////////////////// O2O - CALL SECTION //////////////////////////////////////
    
   _leaveAndroidUser(data){  //if android use end o2o call, then close web user call's modal
        if (data.callType == "o2o" && data.roomName == this.receiveGroupName){
	     	  leaveAndroidRoom(data);

        if (this.selectFriendStatus == false) {
          $('#startchat').css('opacity', '0');
        }
        var x = document.getElementById("outgoingcall");
        x.pause();
        x.muted = true;

        var incoming = document.getElementById("incommingcall");
        incoming.pause();
        incoming.muted = true;
        $('#showCallMin').hide();
        $('#audioshowCallMin').hide();
        $('#showcallModel' + data.stoperId).show();
        $('#o2ovideocall').modal('hide');
        $('#o2oaudiocall').modal('hide');
        this.checkreset();
        this.checkcallstop();
        this.reset();
        this.stop();
        $('#audiocallReceiver').modal('hide');
        $('#videocallReceiver').modal('hide');

        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        var endtimes = $('#basicUsage').text();
          var endtime='';
      if(endtimes =='00:00:00'){
           endtime = 'Missed Call';
      }else{
        	endtime='Call Ended ' + endtimes;
      }
        this.$toasted.success(endtime, {
          theme: "toasted-primary",
          position: "top-right",
          duration: 7000
        })
        }
   },

   _updateUsername(data){
   //  console.log("_updateUsername: ", data);

          for (let friend of this.friendsdata){
         //  console.log(data._id ," === ", friend._id);
            if (data._id === friend._id) {
              friend.name = data.name;
              break;
            }
          }
   },


    // O2OReceiverPanal(data) {
    //     if(this.c_user._id == this.startScreenuser){
    //   this.stopScreenShare();
    //    this.startScreenuser = '';
    // }
    //   if (data.reciverid == this.c_user._id || data.friendId == this.c_user._id) {

    //     if (this.selectFriendStatus == false) {
    //       $('#startchat').css('opacity', '0');
    //     }
    //     var x = document.getElementById("outgoingcall");
    //     x.pause();
    //     x.muted = true;

    //     var incoming = document.getElementById("incommingcall");
    //     incoming.pause();
    //     incoming.muted = true;
    //     $('#showCallMin').hide();
    //     $('#audioshowCallMin').hide();
    //     $('#showcallModel' + data.stoperId).show();
    //     $('#o2ovideocall').modal('hide');
    //     $('#o2oaudiocall').modal('hide');
    //     this.checkreset();
    //     this.checkcallstop();
    //     this.reset();
    //     this.stop();
    //     $('#audiocallReceiver').modal('hide');
    //     $('#videocallReceiver').modal('hide');

    //     $('body').removeClass('modal-open');
    //     $('.modal-backdrop').remove();
    //     var endtimes = $('#basicUsage').text();
    //       var endtime='';
    //   if(endtimes =='00:00:00'){
    //        endtime = 'Missed Call';
    //   }else{
    //     	endtime='Call Ended ' + endtimes;
    //   }
    //     this.$toasted.success(endtime, {
    //       theme: "toasted-primary",
    //       position: "top-right",
    //       duration: 7000
    //     })
    //     //this.o2ostopKCall();
    //     // stopCall();
    //     leaveRoom();
    //   }
    // },

  
    receivecallsendmsg(data) {
     // console.log("receivecallsendmsg");
      // this.isO2Ocall=true;
      if (data.reciverid == this.c_user._id || data.friendId == this.c_user._id) {
        this.friendchat.push(data.msgData);
        var messagetone = document.getElementById("messagetone");
        messagetone.play();
        messagetone.muted = false;
        var container3 = this.$el.querySelector("#o2oaudiochating");
        $("#o2oaudiochating").animate({ scrollTop: container3.scrollHeight + 7020 }, "fast");
      }
    },

    /////////////////////////////////// PAUSE AND PLAY VIDEO CALL ////////////////////////
    receivevideoPausecall(data) {
       //  console.log("receivevideoPausecall");
      if (data.reciverid == this.c_user._id || data.friendId == this.c_user._id) {
       //  webRtcO2OPeer.getLocalStream().getVideoTracks()[0].enabled = false;
        $('.participant.col-md-12.full-video').hide(2000);
        $("#userbackground").show(2000);
      }
    },
    receivevideoPlaycall(data) {
       // console.log("receivevideoPlaycall");
      if (data.reciverid == this.c_user._id || data.friendId == this.c_user._id) {
      //   webRtcO2OPeer.getLocalStream().getVideoTracks()[0].enabled = true;
        $("#userbackground").hide(2000);
        $('.participant.col-md-12.full-video').show(2000);

      }
    },


    ///////////////////////////////// Call busy status ////////////////////////////	

    receiveupdateCallStatus(data) {
      console.log("receiveupdateCallStatus", data);
      
      if (data.statuscall === "video" && this.c_user.videoCallReceive == 0) return;
      if (data.statuscall === "audio" && this.c_user.voiceCallReceive == 0) return;

      if(data.friendId == this.c_user._id && data.call == 'call'){
          this.callData=data; 
          var x = document.getElementById("outgoingcall");
          //  console.log(x);
          x.play();
          x.muted = false;
          x.loop = true;
          this.checkcallstart();
       
          $('#videocallReceiver').modal();
          $('#videocallReceiver').show(); // show incomingCall Modal here
          $('#incomingName').html(data.userName);
         var hostname=this.hostname;
          if(data.userImage){
             $('#userImagename').html('<img class="bg-img" src="'+hostname+'/images/chatImages/'+data.userImage+'" alt="Avatar" />');
          }else{
            if(data.userName){
              var matchess = data.userName.match(/\b(\w)/g); // ['J','S','O','N']
              var matches = matchess.slice(0, 2);
              var acronym = matches.join(''); // JSON
              $('#userImagename').html('<span>'+acronym+'</span>');
            }
            
          }


      }else if(data.friendId == this.c_user._id && data.call == 'close'){
           $('#o2ovideocall').modal('hide');
              $('#videocallReceiver').modal('hide');
              this.isO2Ocall=false;
              var x = document.getElementById("outgoingcall"); console.log(x);
              x.pause();
              x.muted = true;
              var incoming = document.getElementById("incommingcall");
              incoming.pause();
              incoming.muted = true;

              this.checkreset();
              this.checkcallstop();
                    //this.singlefriend= this.oncallFriend;
              this.o2ostatus = false;
              this.callDisable=false;

      }else if(data.friendId == this.c_user._id || data.userId == this.c_user._id && data.call == 'close'){
          this.callDisable=false;
      }
      const myData = this.friendsdata.filter((obj) => {
        return data.userId === obj._id;
      }).pop();
      if (myData) {
        myData.callStatus = data.status;
      }
      const friendData = this.friendsdata.filter((obj) => {
        return data.friendId === obj._id;
      }).pop();
      if (friendData) {
        friendData.callStatus = data.status;
      }


    },

    receivecreateCallstatus(data){
      if(data.receiverId._id == this.c_user._id){
         this.receivecallerData = data;
      }
    },
    /////////////////////////////////REQUEST UPDATE STATUS ////////////////////////////	

    receiveRequeststatus(data) {
      // ------------ [AMMAR] ---------------------------
      if (data._id == this.c_user._id) {
      	this.presentersNoti = true;
        const fdata = this.friendsdata.filter((obj) => {
          return data.myId === obj._id;
        }).pop();

        if (data.status == 2) {
          console.log(data.userObj);
          this.friendsdata.push(data.userObj);
        } else {
          fdata.friendReqStatus = data.status;
        }
      }
      // ------------ ******* ---------------------------

    },


    /////////////////////////////////REQUEST UPDATE STATUS ////////////////////////////	
  receivenotification(data) {
      if (data.receiverId == this.c_user._id ) {
           this.notificationStatus=true;
           this.notificationDate.push(data);
      }
    },
     receiveStartMeeting(data) {
          const mdata = this.meetingsData.filter((obj) => {
          return data.meetindId === obj.meeting_id;
        }).pop();
          console.log(mdata);
          if(mdata){
             this.buttonDisable=false;
             this.buttonEnable=true;
             this.presentersMeeting= true;
             

             // $('#joinMeetingNow').html(data.hoster+' is start meeting. Now you can join meeting');
          }

        
        },



  },


  computed: {
	    orderedUsers: function() {

	      return _.orderBy(this.friendsdata, 'updatedByMsg', 'desc')
	    },
	
     	


    orderedGroups: function() {
      return _.orderBy(this.groups, 'createdAt', 'desc')
    },
    filteredGrouplist() {
      return this.groups.filter(post => {
        return post.name.toLowerCase().includes(this.groupSearch.toLowerCase())
      })
    },
 filteredUserlist() {
      return this.friendsdata.filter(post => {
        return post.name.toLowerCase().includes(this.userSearch.toLowerCase())
      })
    },
 filteredroomUserlist() {
      return this.friendsdata.filter(post => {
        return post.name.toLowerCase().includes(this.roomuserSearch.toLowerCase())
      })
    },
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    },

    checkcallTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedcallTime / 1000);
      const utc = date.toUTCString();
      this.callstatus = utc.substr(-6, 3);
      return utc.substr(-6, 3);
    },

checkGroupcallTime() {
      const date = new Date(null);
      date.setSeconds(this.groupelapsedcallTime / 1000);
      const utc = date.toUTCString();
      this.groupcallstatus = utc.substr(-6, 3);
      return utc.substr(-6, 3);
    },

  filteredRoomlist() {
      return this.roomsData.filter(post => {
        return post.room_id.toLowerCase().includes(this.roomSearch.toLowerCase())
      })
    },

  filteredMeetinglist() {
      return this.meetingsData.filter(post => {
        return post.meeting_id.toLowerCase().includes(this.meetingSearch.toLowerCase())
      })
    },

    searchDocument() {
      return this.allDocument.filter(post => {
        return post.message.toLowerCase().includes(this.docSearch.toLowerCase())
      })
    },
  },


  watch: {

    confirmpassword(){
      if(this.confirmpassword == this.Newpassword){
         $('#cpass').css('color','green');
         $('#cpass').text('Password Match');
        $('#passsubmitbtn').prop('disabled', false);

      }else{
        $('#cpass').css('color','red');
        $('#cpass').text('Password Not Match');
        $('#submitbtn').prop('disabled', true);
      }
    },
    Newpassword(){
      if(this.confirmpassword){
         if(this.confirmpassword == this.Newpassword){
         $('#cpass').css('color','green');
         $('#cpass').text('Password Match');
        $('#passsubmitbtn').prop('disabled', false);

      }else{
        $('#cpass').css('color','red');
        $('#cpass').text('Password Not Match');
        $('#passsubmitbtn').prop('disabled', true);
      }
      }
      
    },
        confirmMobile(){
      if(this.confirmMobile == this.Newmobile){
         $('#cmobile').css('color','green');
         $('#cmobile').text('Mobile Match');
        $('#Mbsubmitbtn').prop('disabled', false);

      }else{
        $('#cmobile').css('color','red');
        $('#cmobile').text('Mobile Not Match');
        $('#Mbsubmitbtn').prop('disabled', true);
      }
    },
    Newmobile(){
      if(this.confirmMobile){
         if(this.confirmMobile == this.Newmobile){
         $('#cmobile').css('color','green');
         $('#cmobile').text('Mobile Match');
        $('#Mbsubmitbtn').prop('disabled', false);

      }else{
        $('#cmobile').css('color','red');
        $('#cmobile').text('Mobile Not Match');
        $('#Mbsubmitbtn').prop('disabled', true);
      }
      }
      
    },
    callstatus() {
      if (this.callstatus > 30) {
        this.o2ostopKCall(3);
        // this.stopScreenShare();
       
        // var incoming = document.getElementById("incommingcall");
        //	incoming.pause();
        //	incoming.muted = true;
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#o2ovideocall').modal('hide');
        $('#o2oaudiocall').modal('hide');


      }
    },

      groupcallstatus() {
       if (this.groupcallstatus > 20) {
        var x = document.getElementById("outgoingcall");
        x.pause();
        x.muted = true;
        this.isGroupcall=false;
        $('#groupcallReceiver').modal('hide');
        this.checkGroupreset();
        this.checkGroupcallstop();



      }
    },
    groupmessage() {

      if (this.groupmessage.length > 0) {
        this.not_working = false;
        $('#send-groupmsg').removeClass('disabled').attr("disabled", false);
      } else {
        this.not_working = true;
        $('#send-groupmsg').removeClass('disabled').attr("disabled", true);
      }
    },

      roommessage() {

      if (this.roommessage.length > 0) {
        
        $('#roomsend-msg').removeClass('disabled').attr("disabled", false);
      } else {
        
        $('#roomsend-msg').removeClass('disabled').attr("disabled", true);
      }
    },
    groupName() {

      if (this.groupName.length > 0) {
        this.havegroup = false;
        $('#groupcreateBtn').removeClass('disabled');
      } else {
        this.havegroup = true;
      }

    },
    groupSearch() {
      if (this.groupSearch.length > 0) {
        this.groupData = false;
        this.groupSearching = true;

      }
      else {
        this.groupData = true;
        this.groupSearching = false;
      }
    },

    userSearch() {
      if (this.userSearch.length > 0) {
        this.userData = false;
        this.showUsers = false;
        this.userSearching = true;

      }
      else {
        this.userData = true;
        this.showUsers = true;
        this.userSearching = false;
      }
    },

    roomuserSearch() {
      if (this.roomuserSearch.length > 0) {
        this.roomshowUsers = false;
        this.roomuserSearching = true;

      }
      else {
        
        this.roomshowUsers = true;
        this.roomuserSearching = false;
      }
    },

     roomSearch() {

      if (this.roomSearch.length > 0) {
	        this.roomshowRoom = false;
	        this.roomroomSearching = true;

      }
      else {
	        this.roomshowRoom = true;
	        this.roomroomSearching = false;
      }
    },

      meetingSearch() {
     	
      if (this.meetingSearch.length > 0) {
	        this.meetingshowRoom = false;
	        this.meetingmeetingSearching = true;

      }
      else {
	        this.meetingshowRoom = true;
	        this.meetingmeetingSearching = false;
      }
    },

     docSearch() {
      if (this.docSearch.length > 0) {
        this.docData = false;
        this.docSearching = true;

      }
      else {
        this.docData = true;
        this.docSearching = false;
      }
    },


    broadCastmsg() {
      if (this.broadCastmsg.length > 0) {

        $('#send-broadcastmsg').removeClass('disabled').attr("disabled", false);
      } else {
        $('#send-broadcastmsg').addClass('disabled').attr("disabled", true);
      }
    },
 
    message: _.debounce(function() {
      if (this.message.length > 0) {

        $('#send-msg').removeClass('disabled').attr("disabled", false);
        $('#send-msg2').removeClass('disabled').attr("disabled", false);
      } else {
        $('#send-msg').addClass('disabled').attr("disabled", true); 
        $('#send-msg2').addClass('disabled').attr("disabled", true);
      }
      this.$socket.emit('stopTyping', { selectFrienddata: this.singlefriend,lastmsg:this.friendchat[this.friendchat.length - 1], UserId: this.c_user._id });
    }, 700),

    searchFriend: _.debounce(function() {
      if (this.searchFriend.length > 0) {
        this.showUsersContact = false;
        this.showSearchfriends = true;
        this.friendSearch();
      }
      else {
        this.showSearchfriends = false;
        this.showUsersContact = true;
      }
    }, 500),

     msgsearch: _.debounce(function() {
      if (this.msgsearch.length > 0) {

        this.searchmsg= true;
        this.mainmsg = false;
        this.chatSearch();
      } else {
      	this.searchmsg= false;
       this.mainmsg = true;
      }
      
    }, 500),

     groupmsgsearch: _.debounce(function() {
      if (this.groupmsgsearch.length > 0) {

        this.groupsearchmsg= true;
        this.groupmainmsg = false;
        this.groupchatSearch();
      } else {
      	this.groupsearchmsg= false;
       this.groupmainmsg = true;
      }
      
    }, 500),
   

  },
  created() {
    // setInterval(() => this.startTimer(), 2000);
  },
    beforeMount() {
    window.addEventListener("beforeunload", this.preventNav)
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.preventNav);
    })
  },

  beforeRouteLeave(to, from, next) {
    
    //   if (this.isGroupcall) {
    //   if (!window.confirm("Leave without saving?")) {
    //     return;
    //   }
    // }
    next();
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
       console.log(response)
      }, function(err) {
           console.log(err)
      });
               
   },

      preventNav(event) {
      	 event.preventDefault();
     event.returnValue = "prevented";
      this.emptyChatWithId();
    //    if(this.isO2Ocall){
    //     this.o2ostopKCall(3);
    // }
      this.$socket.emit('logout', this.c_user._id);
      this.loginstatus(0);
      this.wholepageclick();
     
    

      this.isGroupcall=false;
      axios.post('/leaveCallGroup', {
        _id: this.groupCallId,
        groupId: this.callGroup._id,
        userId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
        if(response.data.members.length < 1){
      this.$socket.emit('sendGroupclose', {
          groupId: this.callGroup._id,
        });
        }
      }, function(err) {
      });
      
      $('#groupvideocall').modal('hide');
      $('#groupchatclose').hide();
      $('#groupchating').removeClass('active');
      $('#groupsinglemessage-input').hide();
      $('#chating').removeClass('active');
      // this.$toasted.success('You can join call again', {
      //   theme: "toasted-primary",
      //   position: "top-center",
      //   duration: 5000
      // })
      return 'prevented';
    },
       
		     meeting_Id: function () {
		     	 		this.meeting.meeting_id= Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);;
		            return this.meeting.meeting_id;
		       

		    },
	        
	        meeting_Password: function () {
	     	 	
	     	 		this.meeting.meeting_password= Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);;
	                return this.meeting.meeting_password;
	      

	    },

        room_Id: function () {
              this.room.room_id= Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);;
                return this.room.room_id;
           

        },
          
          room_Password: function () {
          
            this.room.room_password= Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);;
                  return this.room.room_password;
        

      },


    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
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

 checkGroupcallstart() {
      this.groupcalltimer = setInterval(() => {
        this.groupelapsedcallTime += 1000;
      }, 1000);
    },
    checkGroupcallstop() {
      clearInterval(this.groupcalltimer);
    },
    checkGroupreset() {
      this.groupelapsedcallTime = 0;
    },

    startTimer() {

      // var result = returnPdata();
      // if (result && result.length == 0) {
      //   this.presentersData = [];
      // }
      // if (result && this.presentersData.length > result.length) {

      //   for (var i = this.presentersData.length - 1; i >= 0; i--) {
      //     for (var j = 0; j < result.length; j++) {
      //       if (this.presentersData[i] && (this.presentersData[i].preId != result[j].preId)) {
      //         this.presentersData.splice(i, 1);
      //       }
      //     }
      //   }
      // }


      // for (var i = 0; i < this.friendsdata.length; i++) {
      //   for (var j = 0; j < result.length; j++) {

      //     if (this.friendsdata[i]._id == result[j].preId) {
      //       var exists = this.presentersData.some(function(field) {
      //         return field.preId === result[j].preId
      //       });
      //       if (!exists) {
      //         this.presentersData.push(result[j]);
      //       }

      //     }
      //   }
      // }
    },

     goToRoom(){
    },

    o2oopenwindow(id) {
      window.open('/o2o?data=' + this.singlefriend._id, '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1100,height=600');
    },

    selectEmoji(emoji) {
     // alert(emoji.data)
      //this.emoj.push(emoji.data);
      this.groupmessage += emoji.data;

      this.not_working = false;
      $('#send-groupmsg').removeClass('disabled').attr("disabled", false);

    },

    selectGroupcallEmoji(emoji) {
      // alert(emoji.data)
      //this.emoj.push(emoji.data);
      this.groupmessage += emoji.data;

      this.not_working = false;
      $('#send-groupcallmsg').removeClass('disabled').attr("disabled", false);

    },

    selectchatEmoji(emoji) {
      this.message += emoji.data;
      this.roommessage += emoji.data;

      $('#send-msg').removeClass('disabled').attr("disabled", false);

    },

    broadcastchatEmoji(emoji) {

      this.broadCastmsg += emoji.data;

      $('#send-broadcastmsg').removeClass('disabled').attr("disabled", false);

    },
    showGroupemoji() {
      this.isActive = !this.isActive;
    },

    showChatemoji() {
      this.ischatemojiActive = !this.ischatemojiActive;
      console.log("showChatemoji: ", this.ischatemojiActive);
    },

    showbroadcastChatemoji() {
      this.isbroadchatemojiActive = !this.isbroadchatemojiActive;
    },

    logout: function() {

      axios.post('/externalLogout/' + this.c_user._id + '/' + '5d4c07fb030f5d0600bf5c03')
        .then((responce) => {
          this.$socket.emit('logout', this.c_user._id);
          this.emptyChatWithId();
          this.$session.destroy();
          localStorage.removeItem("userData");
          localStorage.removeItem("presenterData");
          this.$router.push('/login')
        })
        .catch((error) => console.log(error));


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
      return moment(date).format('l');
    },
     isCall(date) {
      return moment(date).format('lll');
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

    callTime(date) {
      return moment(date).format('LT');
    },

    feedbackDictation() {

      var recognition = new webkitSpeechRecognition();
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = 'ko';
      recognition.start();

      recognition.onresult = function(e) {
        alert(e.results[0][0].transcript);
        this.groupmessage = e.results[0][0].transcript;


        recognition.stop();
        //document.getElementById('labnol').submit();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    },

    deleteChat(){
      let data = null;
      if (this.selectedChatType == 0){
        data = {
           "senderId":  this.c_user._id,
           "receiverId": this.singlefriend._id,
           "projectId": '5d4c07fb030f5d0600bf5c03',
           "deleteGroup": this.selectedChatType
        };

        for (let i = 0; i < this.friendsdata.length; i++) {
          if (this.friendsdata[i]._id == this.singlefriend._id) {
             this.friendsdata[i].latestMsg.message = "Start chat";
             break;
          }
        }

      }
      else{
        data = {
           "senderId":  this.c_user._id,
           "groupId": this.singlegroup._id,
           "projectId": '5d4c07fb030f5d0600bf5c03',
           "deleteGroup": this.selectedChatType
        };

          for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i]._id == this.singlegroup._id) {
             this.groups[i].latestMsg.message = "Start chat";
             break;
          }
        }
      }
        

        axios.post('/deleteAllChat', data).then((response) => {
            this.friendchat = [];
            this.groupchatdata = [];
        }).catch((error) => console.log(error));
    },

    emptyChatWithId() {
      axios.get('/emptyChatWithId/' + this.c_user._id + '/5d4c07fb030f5d0600bf5c03')
        .then(responce => {
          this.isSeen = false;
        })
        .catch((error) => console.log(error));
    },

    getUsers() {
      ApiService.getUsers((data) => {
        this.friendsdata = data
      }, (response) => {
        //toastr.error("Oops, " + response.status + " " + response.statusText, "Users", toastrOptions);
      })

    },


    getfriends() {
      axios.get('/getUsers/' + this.c_user._id + '/0/5d4c07fb030f5d0600bf5c03')
        .then(responce => {
        	console.log(responce.data.usersList);
          this.friendsdata = responce.data.usersList;
          setTimeout(() => {
            this.$socket.emit('login', this.c_user._id);
          }, 2000);

        })
        .catch((error) => console.log(error));
      $('#singlemessage-input').hide();
    },


    usertab() {
      this.presentersMsg= false;
      this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').show();
      $('#mainchatpage').show();
      $('.call-content.active').removeClass('active');
    },
    chatTab() {
     // this.selectedChatType = 1;
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').show();
      $('#mainchatpage').show();
      $('.call-content.active').removeClass('active');

    },
    changeStatus(status){
    	//alert(status);
    	this.current_User.pStatus = status;
        this.$socket.emit('changeStatus', {userId:this.c_user._id,status:status});
    	  axios.post('/setPerStatus', {
          pStatus: status,
          userId: this.c_user._id,
          projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
        
        localStorage.setItem('userData', JSON.stringify(response.data));
      }, function(err) {
        console.log('err', err);
      })

    },

    friendSearch() {

      axios.post('/friends/searchFriend/', {
        name: this.searchFriend,
        userId: this.c_user._id,
        lastUserTime: '',
         projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
        console.log(response.data);
        this.searchUsers = response.data;
      }, function(err) {
        console.log('err', err);
      })
    },
   

    ///////////////////////////////////////  START CHAT SECTION //////////////////////////////////////


    startchat(friend) {
      this.chatNav();
    	$('#mainchatform').removeClass('open');
    	this.msgsearch = '';
      this.presentersMsg= false;
      console.log(friend);
         if (screen.width < 650) {
          $('#mainSidebar').css({
                 'width' : '',
                 'opacity' : ''
              })
              $('#content').show();
            }
       // this.emptyChatWithId();
        this.$socket.emit('updateUserSelection', {
          selectedUser: '',
          userId: this.c_user._id
        });
      $('#group_chat').hide();
      $('#mainchatpage').hide();
      $('#startchat').css('opacity', '1');
      this.selectFriendStatus = true;
      $('#startchat').show();
      $('#message-input').hide();
      $('#singlemessage-input').show();
      $('#chating').addClass('active');
      this.o2ostatus = false;
      var container = this.$el.querySelector("#chating");
      $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");

      this.isLoading = true;
      this.message = '';
      this.editChatid = '';
      this.onEditclear = false;
      this.onChat = true;
      this.chatreplydata = "";
      this.typing = false;
      $('#singlemessage-input').css("height", "96px");
      this.replyBox = false;
      this.singlefriend = friend;


      localStorage.setItem('tokenIs', this.c_user._id + '-' + this.singlefriend._id + '-' + this.c_user.name);
      localStorage.setItem('friendId', this.singlefriend._id);
      this.$socket.emit('updateUserSelection', {
        selectedUser: this.singlefriend._id,
        userId: this.c_user._id
      });
      const post = this.friendsdata.filter((obj) => {
        return this.singlefriend._id === obj._id;
      }).pop();
      post.usCount = 0;
      // this.$set(this.singlefriend,'chatWithRefId',this.c_user._id);
      $('.init').removeClass("active");
      $('#friend' + friend._id).addClass("active");

      if (screen.width < 600) {
        $('#rightside').removeClass('active');
        // $('#rightside').addClass('off');
      }

      //$(".contact-chat").animate({ scrollTop: window.innerHeight }, "fast");
      this.friendchat = {};
      axios.get('/getChat/' + this.c_user._id + '/' + friend._id + '/50' + '/5d4c07fb030f5d0600bf5c03/0')
        .then(responce => {
          // console.log(responce.data);
          this.friendchat = responce.data;
          this.$socket.emit('lastchatobj_send', this.friendchat[this.friendchat.length - 1]);
          var container = this.$el.querySelector("#chating");
          $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
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
      $('#mainchatpage').hide();

      $('#group_chat').hide();
      var container = this.$el.querySelector("#chating");
      $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");

      $('#startchat').addClass("active");

      $('.chitchat-container').toggleClass("mobile-menu");

    },

  
newline() {
      this.message = `${this.message}\n`;
    },
    roomnewline() {
      this.roommessage = `${this.roommessage}\n`;
    },
    groupnewline() {
      this.groupmessage = `${this.groupmessage}\n`;
    },


    chat: function(e) {

          var status=1;
        if(this.current_User.readReceipts == 0 || this.singlefriend.readReceipts == 0){
           status=0;
        }else{
          status=1;
        }
      if (this.o2ostatus == true) {
        this.singlefriend = this.oncallFriend
      }
      this.ischatemojiActive = false;
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
            projectId: '5d4c07fb030f5d0600bf5c03'
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
            bookmarkedChat:[],
            senderId: { _id: this.c_user._id,name:this.c_user.name },
            receiverId: { _id: this.singlefriend._id },
            senderName: this.c_user.name,
            message: this.message,
            createdAt: new Date().toISOString(),
            chatType: 1
          };
          var msg = this.message;
          if (this.singlefriend.chatWithRefId == this.c_user._id) {
            // alert('dasdasdas');
            this.$set(this.msgObj, 'isSeen', 1);
          }

          this.isSeen = false;
          this.friendchat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.singlefriend._id,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
        
          $('#singlemessage-input').css("height", "96px");
          this.replyBox = false;
          this.chatreplydata = "";
          axios.post('/chat', {
            msgData: this.msgObj,
            selectedUserData: this.singlefriend._id,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            this.$socket.emit('sendid', response.data);
            this.message = '';

            this.userdec = this.friendsdata.filter((obj) => {
              return this.singlefriend._id === obj._id;
            }).pop();
            this.userdec.updatedByMsg = new Date().toISOString();
            this.userdec.lastmsg.message = msg;


            setTimeout(() => {
              const id = $(".active.init").attr("id");

              if (id != 'friend' + this.singlefriend._id) {
                $('.init').removeClass("active");
                setTimeout(() => {
                  $('#friend' + this.singlefriend._id).addClass("active");
                 

                }, 2);


              }
            }, 1);


          }, function(err) {
            console.log('err', err);
          })
          var container = this.$el.querySelector("#chating");
          $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          var container2 = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        
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
            senderId: { _id: this.c_user._id },
            senderImage: '',
            receiverImage: '',
            bookmarkedChat:[],
            receiverId: { _id: this.singlefriend._id },
            senderName: this.c_user.name,
            message: this.message,
            createdAt: new Date().toISOString(),
          };
          var msg = this.message;


          if (this.singlefriend.chatWithRefId == this.c_user._id) {
            this.$set(this.msgObj, 'isSeen', 1);
            this.isSeen = true;
            const post = this.friendsdata.filter((obj) => {
              return this.singlefriend._id === obj._id;
            }).pop();
            post.usCount = 0;
          }
          else {
            this.isSeen = false;
            this.$set(this.msgObj, 'isSeen', 0);

          }

          //  this.isSeen = false;
          console.log(this.msgObj);
          this.friendchat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.singlefriend._id,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          //  $('#f_typing' + this.singlefriend._id).html(this.msgObj.message);
          this.$socket.emit('stopTyping', { selectFrienddata: this.singlefriend,lastmsg:this.friendchat[this.friendchat.length - 1], UserId: this.c_user._id });
          axios.post('/chat', {
            msgData: this.msgObj,
            selectedUserData: this.singlefriend._id,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            this.$socket.emit('sendid', response.data)


            this.userdec = this.friendsdata.filter((obj) => {
              return this.singlefriend._id === obj._id;
            }).pop();
            this.userdec.updatedByMsg = new Date().toISOString();
           // this.userdec.latestMsg.message=msg;
           this.userdec.latestMsg.message=msg;

            setTimeout(() => {
              const id = $(".active.init").attr("id");

              if (id != 'friend' + this.singlefriend._id) {
                $('.init').removeClass("active");
                setTimeout(() => {
                  $('#friend' + this.singlefriend._id).addClass("active");
                  setTimeout(() => {

                    // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
                  }, 200);

                }, 1);


              }
            }, 0);


          }, function(err) {
            console.log('err', err);
          })

          this.message = '';
          var container = this.$el.querySelector("#chating");
          if(container) $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");

          var container2 = this.$el.querySelector("#o2ochating");
          if(container2) $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        

          $('#send-msg').addClass('disabled').attr("disabled", "disabled");

        }
      }
    },

    

    dragfileupload(file, xhr, formData) {
      formData.append('senderId', this.c_user._id);
      formData.append('senderName', this.c_user.name);
      formData.append('friendId', this.singlefriend._id);
      formData.append('messageType', 1);
      formData.append('bookmarkedChat', []); 
      formData.append('projectId', '5d4c07fb030f5d0600bf5c03');
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
        bookmarkedChat:[],
        receiverId: { _id: this.singlefriend._id },
        senderName: this.c_user.name,
        message: response.data.message,
        createdAt: new Date().toISOString(),
      };
      if (this.singlefriend.chatWithRefId == this.c_user._id) {
        // alert('dasdasdas');
        this.$set(this.msgObj, 'isSeen', 1);
      }

      this.isSeen = false;
      this.friendchat.push(this.msgObj);
      var container = this.$el.querySelector("#chating");
      $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
      this.$socket.emit('sendmsg', {
        selectFrienddata: this.singlefriend._id,
        userId: this.c_user._id,
        msgData: this.msgObj
      })
      this.userdec = this.friendsdata.filter((obj) => {
        return this.singlefriend._id === obj._id;
      }).pop();

      this.userdec.updatedByMsg = new Date().toISOString();


      setTimeout(() => {
        const id = $(".active.init").attr("id");

        if (id != 'friend' + this.singlefriend._id) {
          $('.init').removeClass("active");
          setTimeout(() => {

            $('#friend' + this.singlefriend._id).addClass("active");
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
      let filesdata = this.$refs.myFiles.files;
      filesdata.forEach((file) => {
        let formDatas = new FormData();
        let r = Math.random().toString(36).substring(7);
        // formDatas.append('file', file, (r + file.name));
         formDatas.append('file', file);
        formDatas.append('senderId', this.c_user._id);
        formDatas.append('senderName', this.c_user.name);
        formDatas.append('friendId', this.singlefriend._id);
        formDatas.append('isGroup', 0);
        formDatas.append('messageType', 1);
        formDatas.append('bookmarkedChat', []);
        formDatas.append('projectId', '5d4c07fb030f5d0600bf5c03');
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
            bookmarkedChat:[],
            receiverId: { _id: this.singlefriend._id },
            senderName: this.c_user.name,
            message: response.data.data.message,
            createdAt: new Date().toISOString(),
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
          if (this.singlefriend.chatWithRefId == this.c_user._id) {
            // alert('dasdasdas');
            this.$set(this.msgObj, 'isSeen', 1);
          }

          this.isSeen = false;
          this.friendchat.push(this.msgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#chating");
          $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          this.$socket.emit('sendmsg', {
            selectFrienddata: this.singlefriend._id,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          this.userdec = this.friendsdata.filter((obj) => {
            return this.singlefriend._id === obj._id;
          }).pop();
          this.userdec.updatedByMsg = new Date().toISOString();


          setTimeout(() => {
            const id = $(".active.init").attr("id");

            if (id != 'friend' + this.singlefriend._id) {
              $('.init').removeClass("active");
              setTimeout(() => {

                $('#friend' + this.singlefriend._id).addClass("active");
                setTimeout(() => {

                  // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
                }, 200);

              }, 1);


            }
          }, 0);
        }, function(err) {
          console.log('err', err);
        })
      })
    },


    eidtchat(id, message) {
      this.message = message;
      this.editChatid = id;
      $('#singlemessage-input').css("height", "96px");
      this.replyBox = false;
      if (this.o2ostatus == true) {
        this.$nextTick(function() {
        this.$refs.o2oafterClick.focus();
      });
      }else{
      this.$nextTick(function() {
        this.$refs.afterClick.focus();
      });
    }
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
        this.$socket.emit('msgtyping', { selectFrienddata: this.singlefriend, UserId: this.c_user._id });
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
    // bookmarked(bookchat,status){
    //     axios.post('/bookmarkMyChat', {
    //           chatId: bookchat._id,
    //           userId: this.c_user._id,
    //           bookmarkStatus: 1,
    //           projectId: '5d4c07fb030f5d0600bf5c03'
    //       }).then(response => {
    //        if(status == 'chat'){
    //              this.userchat = this.friendchat.filter((obj) => {
    //                 return bookchat._id === obj._id;
    //               }).pop();
    //               this.userchat.bookmarked = 1;
    //           }else{
    //            this.usergrp = this.groupchatdata.filter((obj) => {
    //                 return bookchat._id === obj._id;
    //               }).pop();
    //               this.usergrp.bookmarked = 1;
    //           }
          


    //       }, function(err) {
    //         console.log('err', err);
    //       })
    // },

    //  removebookmarked(bookchat,status){
    //     axios.post('/bookmarkMyChat', {
    //           chatId: bookchat._id,
    //           userId: this.c_user._id,
    //           bookmarkStatus: 0,
    //           projectId: '5d4c07fb030f5d0600bf5c03'
    //       }).then(response => {
    //         //this.$socket.emit('sendid', response.data)

    //           if(status == 'chat'){
    //              this.userchat = this.friendchat.filter((obj) => {
    //                 return bookchat._id === obj._id;
    //               }).pop();
    //               this.userchat.bookmarked = 0;
    //           }else{
    //            this.usergrp = this.groupchatdata.filter((obj) => {
    //                 return bookchat._id === obj._id;
    //               }).pop();
    //               this.usergrp.bookmarked = 0;
    //           }
            
          


    //       }, function(err) {
    //         console.log('err', err);
    //       })
    // },


    forward(forwardchat){
       this.forwardchatdata = forwardchat;
       $('.hideRemoveforward').hide();
       $('.showAddforward').show();
       $('#forwardContacts').modal('show');
       
    },

    sendforwardmsg(forwardfriends){
 
     this.msgObj = {
            chatType: 0,
            isGroup: 0,
            messageType: this.forwardchatdata.messageType,
            bookmarked:0,
            senderId: { _id: this.c_user._id },
            senderImage: '',
            receiverImage: '',
            bookmarkedChat:[],
            receiverId: { _id: forwardfriends._id },
            senderName: this.c_user.name,
            message: this.forwardchatdata.message,
            createdAt: new Date().toISOString(),
          };
        
          var msg = this.forwardchatdata.message;
          if (forwardfriends.chatWithRefId == this.c_user._id) {
            this.$set(this.msgObj, 'isSeen', 1);
            this.isSeen = true;
            const post = this.friendsdata.filter((obj) => {
              return forwardfriends._id === obj._id;
            }).pop();
            post.usCount = 0;
          }
          else {
            this.isSeen = false;

          }

          //  this.isSeen = false;
          // this.friendchat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('sendmsg', {
            selectFrienddata: forwardfriends._id,
            userId: this.c_user._id,
            msgData: this.msgObj
          })
          //  $('#f_typing' + this.singlefriend._id).html(this.msgObj.message);
          this.$socket.emit('stopTyping', { selectFrienddata: forwardfriends,lastmsg:this.friendchat[this.friendchat.length - 1], UserId: this.c_user._id });
          axios.post('/chat', {
            msgData: this.msgObj,
            selectedUserData: forwardfriends._id,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            this.$socket.emit('sendid', response.data)


            this.userdec = this.friendsdata.filter((obj) => {
              return forwardfriends._id === obj._id;
            }).pop();
            this.userdec.updatedByMsg = new Date().toISOString();
           // this.userdec.latestMsg.message=msg;
           this.userdec.latestMsg.message=msg;

            setTimeout(() => {
              const id = $(".active.init").attr("id");

              if (id != 'friend' + forwardfriends._id) {
                $('.init').removeClass("active");
                setTimeout(() => {
                  $('#friend' + forwardfriends._id).addClass("active");
                  setTimeout(() => {

                    // $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
                  }, 200);

                }, 1);


              }
            }, 0);

             setTimeout(() => {
              const id = $(".active.init").attr("id");
                // $('.init').removeClass("active");
                setTimeout(() => {
                  $('#forward'+forwardfriends._id).hide();
                 $('#rmforward'+forwardfriends._id).show();

                }, 200);

            }, 0);


          }, function(err) {
            console.log('err', err);
          })

          var container = this.$el.querySelector("#chating");
          $("#chating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          var container2 = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container2.scrollHeight + 7020 }, "fast");
        

          $('#send-msg').addClass('disabled').attr("disabled", "disabled");

        
    },

 
    quote(chatdata) {
      this.chatreplydata = chatdata;
      this.onEditclear = false;
      this.message = '';
      $('#singlemessage-input').css("height", "140px");
      this.replyBox = true;
      if (this.o2ostatus == true) {
        this.$nextTick(function() {
        this.$refs. o2oafterClick.focus();
      });
      }else{
      this.$nextTick(function() {
        this.$refs.afterClick.focus();
      });
    }
    },

    closeReplybox() {
      $('#singlemessage-input').css("height", "96px");
      this.replyBox = false;
    },

    ///////////////////////////////////////  END CHAT SECTION //////////////////////////////////////

    ///////////////////////////////////////  START GROUP SECTION //////////////////////////////////////

    getgroups() {
     this.wholepageclick();
     this.selectedChatType = 1;
      if (this.orderedGroups.length == 0) {
        this.groupLoader = true;
        axios.get('/getCreatedGroups/' + this.c_user._id + '/5d4c07fb030f5d0600bf5c03')
          .then(responce => {

            this.groupLoader = false;
            this.groups = responce.data;

          }, function(err) {
            console.log('err', err);
          });
      }
   $('#group_chat').show();
   $('#mainchatpage').hide();
      $('#group_chat').addClass("active");
      $('.group_chat').removeClass("active");

      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide()
      this.replyBox = false;
    },

    getgroupsfirst() {
$('#group_chat').hide();
      if (this.orderedGroups.length == 0) {
        this.groupLoader = true;
        axios.get('/getCreatedGroups/' + this.c_user._id + '/5d4c07fb030f5d0600bf5c03')
          .then(responce => {

            this.groupLoader = false;
            this.groups = responce.data;

          }, function(err) {
            console.log('err', err);
          });
      }

    },


    startgroupchat(group, index) {
      $('#group_chat').hide();
      $('#singlemessage-input').hide();
      $('#message-input').show();
      $('.group_chat').removeClass("active");
      $('#group_data' + group._id).addClass("active");
      $('#group_chat').removeClass("active");

      this.singlegroup = group;
      if(group.members.length > 4){
      this.groupmembers = group.members.length - 4;
      this.groupmembers= this.groupmembers+'+';
      }else{

      this.groupmembers = group.members.length;
      }
      this.groupIndex = index;
      this.userid = this.c_user._id;
      this.groupchatreplydata = "";
      this.editgroupChatid = "";
      this.nonGroupUsers = [];
      this.multipleneewmembers = [];
      this.shownewmembers = false;
      this.showmembers = true;

      var container = this.$el.querySelector("#group_chat_open");
      $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
      //$('#friend'+friend._id).addClass("active");
      // $(".contact-chat").animate({ scrollTop: window.innerHeight }, "fast");
      axios.get('/getGroupChat/' + group._id + '/' + this.c_user._id  + '/50' + '/5d4c07fb030f5d0600bf5c03')
        .then((responce) => this.groupchatdata = responce.data)
        .catch((error) => console.log(error));
      $('#startchat').removeClass("active");
      $('#startgroupchat').addClass("active");
      $('#mainchatpage').hide();
      $('.group_chat_open').addClass("active");
      var container = this.$el.querySelector("#group_chat_open");
      $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");

      $('.chitchat-container').toggleClass("mobile-menu");
    },

    groupchat: function(e) {
      this.isActive = false;
      if (this.groupmessage) {
        if (this.editgroupChatid) {

          this.msgObj = {

            message: this.groupmessage,
            chatid: this.editgroupChatid

          };

          this.$socket.emit('updateGroupchatmsg', this.msgObj)

          axios.post('/updateGroupChat', {
            msgData: this.msgObj,
            id: this.editgroupChatid,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {

          }, function(err) {
            console.log('err', err);
          })

          this.groupmessage = '';
          this.editgroupChatid = '';
          $('#send-msg').addClass('disabled').attr("disabled", "disabled");
        }

        else if (this.groupchatreplydata) {

          this.groupmsgObj = {

            commentId: { _id: this.groupchatreplydata._id, message: this.groupchatreplydata.message, senderId: this.groupchatreplydata.senderId, messageType: this.groupchatreplydata.messageType },
            messageType: 0,
            receiptStatus:1,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: this.groupmessage,
            groupId: this.singlegroup._id,
            createdAt: new Date().toISOString(),
            chatType: 1,
            bookmarkedChat: [],
            isGroup: 1,
            isDeleted: 0,
            projectId: '5d4c07fb030f5d0600bf5c03'
          };

          this.$socket.emit('sendgroupmsg', this.groupmsgObj);

          axios.post('/groupChat', this.groupmsgObj).then(response => {

           
            this.$socket.emit('groupsendid', response.data)
            $('#message-input').css("height", "96px");
            this.groupreplyBox = false;
            this.groupchatreplydata = '';
            //$('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);

          }, function(err) {
            console.log('err', err);
           
          })
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          this.groupmessage = '';


        }

        else {
          this.groupmsgObj = {
            chatType: 0,
            isGroup: 1,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: this.groupmessage,
            groupId: this.singlegroup._id,
            bookmarkedChat: [],
            isDeleted: 0,
            messageType: 0,
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);

          axios.post('/groupChat', this.groupmsgObj).then(response => {

            this.$socket.emit('groupsendid', response.data)

            //  $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);

          }, function(err) {
            console.log('err', err);
          })
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          this.groupmessage = '';
        }
      }
    },


    editgroupchat(id, message) {
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
      this.$socket.emit('groupMsgtyping', { groupId: this.singlegroup._id, userId: this.c_user._id });
      $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    },

    groupmsgdelete(data) {
      this.closegroupReplybox();
      this.onEditgroupclear = false;
      this.groupmessage = '';
      this.$socket.emit('grpsenderdeletemsg', data);

      $('#groupsender' + data._id).html(""+ this.$t('messagedeleted'));
      axios.get('/deleteMsg/' + data._id + '/0' + '/' + '5d4c07fb030f5d0600bf5c03')
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
      formData.append('senderId', this.c_user._id);
      formData.append('senderName', this.c_user.name);
      formData.append('groupId', this.singlegroup._id);
      formData.append('isGroup', 1);
      formData.append('messageType', 1);
      formData.append('bookmarkedChat', []);
      formData.append('projectId', '5d4c07fb030f5d0600bf5c03');
    },

    groupComplete(file, response) {
      this.groupmsgObj = {
        _id: response.data._id,
        chatType: 0,
        isGroup: 1,
        messageType: 1,
        senderId: { _id: this.c_user._id, name: this.c_user.name },
        senderName: this.c_user.name,
        message: response.data.message,
        bookmarkedChat: [],
        groupId: this.singlegroup._id,
        isDeleted: 0,
        createdAt: new Date().toISOString(),
      };
      // if (this.singlefriend.chatWithRefId == this.c_user._id) {
      //   // alert('dasdasdas');
      //   this.$set(this.groupmsgObj, 'isSeen', 1);
      // }

      // this.isSeen = false;
      // this.groupchatdata.push(this.groupmsgObj);
      this.$socket.emit('sendgroupmsg', this.groupmsgObj);
      var container = this.$el.querySelector("#group_chat_open");
      $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
      // this.userdec = this.groupchatdata.filter((obj) => {
      //   return this.singlefriend._id === obj._id;
      // }).pop();

      // this.userdec.updatedByMsg = new Date().toISOString();


      // setTimeout(() => {
      //   const id = $(".active.init").attr("id");

      //   if (id != 'friend' + this.singlefriend._id) {
      //     $('.init').removeClass("active");
      //     setTimeout(() => {

      //       $('#friend' + this.singlefriend._id).addClass("active");
      //       setTimeout(() => {

      //         $('.chat-main .active .details h6').html('<span>You : </span>' + response.data.message);
      //       }, 200);

      //     }, 1);


      //   }
      // }, 0);
      // this.$socket.emit('sendmsg', response.data )
      this.$refs.mygroupVueDropzone.removeFile(file);
      $("#groupdropzone").css("display", "none");
      $("#dropzone").css("display", "none");
    },

    groupCalluploadfile(event){
    //alert("groupCalluploadfile");
      let groupfilesdata = this.$refs.groupCallmyFiles.files;
      groupfilesdata.forEach((file) => {
        let groupformDatas = new FormData();
       let r = Math.random().toString(36).substring(7);
        groupformDatas.append('file', file, (r + file.name));
        // groupformDatas.append('file', file);
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.callGroup._id);
        groupformDatas.append('isGroup', 1);
        groupformDatas.append('messageType', 1);
        groupformDatas.append('bookmarkedChat', []);
        groupformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03')
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 1,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            bookmarkedChat: [],
            message: response.data.data.message,
            groupId: this.callGroup._id,
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
        
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
        })
      })
    },

    groupuploadfile(event) {
      let groupfilesdata = this.$refs.groupmyFiles.files;
      groupfilesdata.forEach((file) => {
        let groupformDatas = new FormData();
       let r = Math.random().toString(36).substring(7);
        groupformDatas.append('file', file, (r + file.name));
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.singlegroup._id);
        groupformDatas.append('bookmarkedChat', []);
        groupformDatas.append('isGroup', 1);
        groupformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03')
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 1,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: response.data.data.message,
            bookmarkedChat: [],
            groupId: this.singlegroup._id,
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
        
          this.$socket.emit('sendgroupmsg', this.groupmsgObj);
          this.isLoading = false;
          var container = this.$el.querySelector("#group_chat_open");
          $("#group_chat_open").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
        })
      })
    },

    /////////////////////////////////////// CREATE GROUP ////////////////////////////////////////////

    creategroupPanle() {
      $('#groupcreateBtn').show();
      $('.buttonload').hide();
    },

    createGroup() {
      $('groupmembers.chat-main.active').removeClass('active');
      if (this.multiplemembers.length > 0 && this.groupName) {
        $('#groupcreateBtn').css('display', 'none');
        $('.buttonload').show();
        this.multiplemembers.push(this.c_user._id);
        this.addgroupData = {
          name: this.groupName,
          members: this.multiplemembers,
          creatorUserId: this.c_user._id,
          projectId: '5d4c07fb030f5d0600bf5c03',
          status: 1
        };
        axios.post('/createUserGroup', {
          groupData: JSON.stringify(this.addgroupData),
          userId: this.c_user._id
        }).then(response => {
        	const newGroup={
				groupData:response.data,
				groupMembers:this.multiplemembers
        	};
          this.$socket.emit('getGroups', newGroup);
          $('.chat-cont-setting').removeClass('open')
          this.$toasted.success(this.$t('groupcreatesuccessfully'), {
            theme: "toasted-primary",
            position: "top-center",
            duration: 2000
          })
          $('#group_data' + response.data._id).addClass('active');
          this.singlegroup = response.data;

          setTimeout(() => {

            $('#exampleModalCenter').modal('hide')
            $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");

          }, 2000);

          this.groupName = '';
          this.multiplemembers = [];
          $('.hideRemove').hide();
          $('.showAdd').show();



        }, function(err) {
          console.log('err', err);
        })
      }
      else {
        if (this.multiplemembers.length == 0) {
          this.$toasted.success(this.$t('SelectMember'),{
            theme: "toasted-primary",
            position: "top-center",
            duration: 2000
          })
        } else {
          this.$toasted.success(this.$t('Entergname'), {
            theme: "toasted-primary",
            position: "top-center",
            duration: 2000
          })
        }

      }

    },


    editGroup() {

      this.showGrouptitle = false;
      this.editgTitle = true;
      this.$nextTick(function() {
        this.$refs.groupTitle.focus();
      });
    },

    addGroupmemners(id, index) {
      if($('#groupmembers'+id).hasClass('showAdd')){
      	this.multiplemembers.push(id);
      $('#groupmembers'+ id).addClass('active');
      $('#groupmembers'+ id).removeClass('showAdd');
      $('#member' + id).hide();
      $('#memberRm' + id).show();
  }else{
  	 $('#groupmembers'+ id).addClass('showAdd');
  	if (this.multiplemembers[index] === id) {

        this.multiplemembers.splice(index, 1)
      } else {
        let found = this.multiplemembers.indexOf(id)
        this.multiplemembers.splice(found, 1)
      }
      $('#groupmembers'+ id).removeClass('active');
      $('#memberRm' + id).hide();
      $('#member' + id).show();
  }
    },


    editGroupTitle() {
      if (this.singlegroup.name) {
        this.$socket.emit('updateGroupTitle', this.singlegroup);
        this.showGrouptitle = true;
        this.editgTitle = false;
        axios.post('/editGroupName', {
          groupId: this.singlegroup._id,
          groupName: this.singlegroup.name,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
        }, function(err) {
          console.log('err', err);
        })
      } else {
        this.$toasted.success( this.$t('Entergname'), {
          theme: "toasted-primary",
          position: "top-center",
          duration: 2000
        })
      }
    },

    deleteGroup() {

      if (this.orderedGroups[this.groupIndex]._id === this.singlegroup._id) {

        this.orderedGroups.splice(this.groupIndex, 1)
        this.groups = this.orderedGroups;
      } else {
        let found = this.orderedGroups.indexOf(this.singlegroup._id)
        this.orderedGroups.splice(found, 1);
        this.groups = this.orderedGroups;
      }
      this.$socket.emit('deleteGroup', this.groups);
      $('.group-main').removeClass('active');
      $('#startgroupchat').removeClass('active');
      axios.post('/deleteGroup', {
        groupId: this.singlegroup._id,
        projectId: '5d4c07fb030f5d0600bf5c03',
      }).then(response => {
      }, function(err) {
        console.log('err', err);
      })
    },
    crossGroupTitle() {
      this.showGrouptitle = true;
      this.editgTitle = false;
    },

    leaveGroup(id, index) {
      if (index != 'user') {
        if (this.singlegroup.members[index]._id === id) {
          this.singlegroup.members.splice(index, 1)
          //this.groups=this.orderedGroups;
        } else {
          let found = this.singlegroup.members.indexOf(id)
          this.singlegroup.members.splice(found, 1);
          //this.groups=singlegroup.members;
        }
      }
      axios.post('/removeGroupUser', {
        groupId: this.singlegroup._id,
        memberId: id,
        projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
        this.$socket.emit('updateMembers', {
          groupId: this.singlegroup._id,
          members: this.singlegroup.members,
          groupData: this.singlegroup,
          memberId: id,
          userId: this.c_user._id
        });
        if (index == 'user') {
          if (this.orderedGroups[this.groupIndex]._id === this.singlegroup._id) {

            this.orderedGroups.splice(this.groupIndex, 1)
            this.groups = this.orderedGroups;
          } else {
            let found = this.orderedGroups.indexOf(this.singlegroup._id)
            this.orderedGroups.splice(found, 1);
            this.groups = this.orderedGroups;
          }

          $('#showGroupsMembers').modal('hide')
          $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");
          $('#startgroupchat').removeClass('active');

        }
      }, function(err) {
        console.log('err', err);
      })

    },

    addNewmember() {

      this.nonGroupUsers = [];
      for (var j = 0; j < this.friendsdata.length; j++) {
        const isFound = false;
        if (this.friendsdata[j]._id != this.c_user._id) {

          for (var i = 0; i < this.singlegroup.members.length; i++) {
            if (this.friendsdata[j]._id == this.singlegroup.members[i]._id) {
              isFound = true;
              break;
            }

            else if (this.friendsdata[j]._id != this.singlegroup.members[i]._id && i == (this.singlegroup.members.length - 1) && !isFound) {
              this.nonGroupUsers.push(this.friendsdata[j]);
            }

          }
        }
      }
      this.showmembers = false;
      this.shownewmembers = true;
    },

    showMembers() {

      this.multipleneewmembers = [];
      this.shownewmembers = false;
      this.showmembers = true;
      $('.removeBtn').show();
    },

    addnewGroupmemners(data) {
      this.multipleneewmembers.push(data);
      $('#newmember' + data._id).hide();
      $('#newmemberRm' + data._id).show();
    },

    removenewGroupmemners(id, index) {
      if (this.multipleneewmembers[index]._id === id) {

        this.multipleneewmembers.splice(index, 1)
      } else {
        let found = this.multipleneewmembers.indexOf(id)
        this.multipleneewmembers.splice(found, 1)
      }
      $('#newmemberRm' + id).hide();
      $('#newmember' + id).show();
    },


    addNewmembersList() {
      $('#addmemberbtn').hide();
      $('#addmemberonload').show();

      if (this.multipleneewmembers) {

        axios.post('/addNewMembers', {
          groupId: this.singlegroup._id,
          members: this.multipleneewmembers,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
          //this.$socket.emit('getGroups', response.data);
          for (var i = 0; i < this.multipleneewmembers.length; i++) {
            this.singlegroup.members.push(this.multipleneewmembers[i]);
          }

          for (var j = 0; j < this.nonGroupUsers.length; j++) {
            if (this.nonGroupUsers[j]._id === this.multipleneewmembers[j]._id) {
              this.nonGroupUsers.splice(this.nonGroupUsers[j], 1)
              //this.groups=this.orderedGroups;
            } else {
              let found = this.nonGroupUsers.indexOf(this.multipleneewmembers[j]._id)
              this.nonGroupUsers.splice(found, 1);
              //this.groups=nonGroupUsers;

            }
          }
          this.$socket.emit('updateMembers', this.singlegroup);
          this.multipleneewmembers = [];
          $('#addmemberonload').hide();
          $('#addmemberbtn').show();
          this.$toasted.success(this.$t('addmembersuccessfully'), {
            theme: "toasted-primary",
            position: "top-center",
            duration: 2000
          })

          this.multipleneewmembers = [];
        }, function(err) {
          alert('error');
        })
        setTimeout(() => {
          $('.hideRemove').hide();
          $('.showAdd').show();
        }, 2000);

      }


    },
    ///////////////////////////////////////  END GROUP SECTION //////////////////////////////////////
    callback(msg) {
      //console.debug('Event: ', msg)
    },
      appchatNav(){
      $('.call-content').css('opacity', '0');
      $('#meeting').hide();
      $('#rooms').hide();
      $('#todoNotes').hide();
      $('#mainSidebar').show();
      // $('#content').show();
      $('#mainSidebar').css({
         'width' : '100%',
         'opacity' : '1'
      })
      $('.sidebar-top li.active').removeClass('active');
      $('#chatactive').addClass('active');
      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');
      $('#todoNotes').hide();

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");
      // this.chatTab();
      // $('#chat').addClass('active show');
      // $('#call').removeClass('active show');
      
    },

    chatNav(){
      this.presentersMsg= false;
      this.usertab();
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('.call-content').css('opacity', '0');
      $('#meeting').hide();
      $('#rooms').hide();
      $('#todoNotes').hide();
      $('#mainSidebar').show();
      if(screen.width > 651){

      $('#content').show();

      } 
      if (screen.width < 650) {
      $('.main-nav').removeClass('on');
      $('.main-nav').addClass('off');
    }

      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');
      $('#todoNotes').hide();

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");
      this.chatTab();
      $('#chat').addClass('active show');
      $('#call').removeClass('active show');
      
    },

    meetingNav(){
        this.settingsPanelOpen = false;
      $('#mainSidebar').hide();
      $('#content').hide();
      $('#rooms').hide();
      $('#status').hide();
      $('#status').css('opacity', '0');
      this.getUpcommingMeetings();
      $('#meeting').show();
      $('#todoNotes').hide();
      $('#favourite').removeClass("active");
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");
      $('#files').removeClass("active");

        if(screen.width < 650) {
            $('.main-nav').removeClass('on');
            $('.main-nav').addClass('off');
          }

    },

    todoNav(){
        this.settingsPanelOpen = false;
      $('#mainSidebar').hide();
      $('#content').hide();
      $('#rooms').hide();
      $('#status').hide();
      $('#status').css('opacity', '0');
      this.getNotes();
      $('#meeting').hide();
      $('#todoNotes').show();
      $('#favourite').removeClass("active");
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");
      $('#files').removeClass("active");

        if (screen.width < 650) {
          $('.main-nav').removeClass('on');
          $('.main-nav').addClass('off');
        }

    },

     roomNav(){
      this.getAllRooms('0');
      this.roommessage='';
      $('#status').hide();
      $('#settings').css('opacity', '0');
      $('#mainSidebar').hide();
      $('#content').hide();
      $('#meeting').hide();
      $('#rooms').show();
      $('#todoNotes').hide();

      $('#favourite').removeClass("active");
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#files').removeClass("active");
        if (screen.width < 650) {
        $('.main-nav').removeClass('on');
        $('.main-nav').addClass('off');
      }

    },
    roomChat() {
      $('#mainRoom').hide();
      $('#roomChat').show();
    },
    roomWindow() {
      $('#mainRoom').show();
      $('#roomChat').hide();
    },

    favourite() {
        this.settingsPanelOpen = false;
      this.getTodo();

      $('#meeting').hide();
       $('#status').hide();
      $('#status').css('opacity', '0');
      $('#settings').hide();
      $('#settings').css('opacity', '0');
      $('#rooms').hide();
      $('#todoNotes').hide();
       $('#mainSidebar').show();
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      // add class to the one we clicked
      $('#favourite').addClass("active");
      $('#files').removeClass("active");

    },

    status() {
              this.settingsPanelOpen = false;
     this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').show();
      $('#mainchatpage').show();
     // $('.call-content.active').removeClass('active');
      $('.init').removeClass('active');
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      // $('.call-content').css('opacity', '0');

      $('#content').show();
      $('.call-content').css('opacity', '1');
      $("#callcontent").show();
      $('#contactdetails').hide();

      this.allChatMedia();
      $('#status').show();
      $('#status').css('opacity', '1');
      $('#settings').hide();
      $('#settings').css('opacity', '0');
      $('#meeting').hide();
      $('#rooms').hide();
      $('#todoNotes').hide();
       $('#mainSidebar').show();
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#favourite").removeClass("active");
      // add class to the one we clicked
      $('#status').addClass("active");
       $('#files').addClass("active");
       this.allChatDocument();

    },

    document() {
      this.settingsPanelOpen = false;
      this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').show();
      $('#mainchatpage').show();
      // $('.call-content.active').removeClass('active');
      $('.init').removeClass('active');
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();

    $('#content').show();
      $('.call-content').css('opacity', '1');
      $("#callcontent").show();
      $('#contactdetails').hide();

       this.allChatDocument();
       $('#settings').hide();
      $('#settings').css('opacity', '0');
       $('#meeting').hide();
      $('#rooms').hide();
      $('#status').hide();
      $('#todoNotes').hide();
      $('#status').css('opacity', '0');
       $('#mainSidebar').show();
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#status").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#favourite").removeClass("active");
      // add class to the one we clicked
      $('#document').addClass("active");
      $('#files').removeClass("active");

    },

    contact() {
      this.settingsPanelOpen = false;
      this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#content').show();
      $('#group_chat').hide();
      // $('.call-content.active').removeClass('active');
    
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();

      $('.call-content').css('opacity', '1');
      $("#callcontent").show();
      $('#contactdetails').hide();
  

      $('#settings').hide();
      $('#settings').css('opacity', '0');
      $('#meeting').hide();
      $('#rooms').hide();
      $('#status').hide();
      $('#todoNotes').hide();
      $('#status').css('opacity', '0');
      $('#mainSidebar').show();
      $("#recent").removeClass("active");
      $("#status").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#favourite").removeClass("active");
      // add class to the one we clicked
      $('#contact-list').addClass("active");
      $('#files').removeClass("active");

    },

    notification() {
            this.settingsPanelOpen = false;
           this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('.call-content.active').removeClass('active');
    
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#settings').hide();
      this.showNotification();
      $('#settings').css('opacity', '0');
      this.notificationStatus= false;
      $('#meeting').hide();
      $('#rooms').hide();
      $('#status').hide();
      $('#todoNotes').hide();
      $('#status').css('opacity', '0');
      $('#mainSidebar').show();
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#status").removeClass("active");
      $("#settings").removeClass("active");
      $("#favourite").removeClass("active");
      // add class to the one we clicked
      $('#notification').addClass("active");
      $('#files').removeClass("active");

    },

    setting() {
      this.settingsPanelOpen = true;
      this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('.call-content.active').removeClass('active');
       $('#settingcontent').show();
    
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#settings').show();
      $('#settings').css('opacity', '1');
      $('#meeting').hide();
      $('#rooms').hide();
       $('#mainSidebar').show();
      $('#status').hide();
      $('#todoNotes').hide();
      $('#status').css('opacity', '0');
      $("#recent").removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#status").removeClass("active");
      $("#favourite").removeClass("active");
      // add class to the one we clicked
      $('#settings').addClass("active");
      $('#files').removeClass("active");

    },

    files() {
              this.settingsPanelOpen = false;
           this.selectedChatType = 0;
      this.wholepageclick();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('.call-content.active').removeClass('active');
    
      $('#mainchatpage').hide();
      $('.group_chat').removeClass("active");
      $('#group_chat_open').removeClass("active");
      $('#startchat').removeClass('active');
      $('#mainsearch').hide();
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#meeting').hide();
      $('#rooms').hide();
       $('#mainSidebar').show();
        $('#files').show();
        $('#todoNotes').hide();
      $("#todo").removeClass("active");
      $("#notes").removeClass("active");
      $("#reminder").removeClass("active");
      // add class to the one we clicked
      $('#files').addClass("active");

    },
    reminder() {
              this.settingsPanelOpen = false;
      $('#meeting').hide();
      $('#rooms').hide();
      $('#todoNotes').hide();
       $('#mainSidebar').show();
      $("#todo").removeClass("active");
      $("#notes").removeClass("active");
      $("#files").removeClass("active");
      // add class to the one we clicked
      $('#reminder').addClass("active");

    },
    notes() {
              this.settingsPanelOpen = false;
      $('#meeting').hide();
      $('#rooms').hide();
       $('#mainSidebar').show();
       $('#todoNotes').hide();
      $("#todo").removeClass("active");
      $("#files").removeClass("active");
      $("#reminder").removeClass("active");
      // add class to the one we clicked
      $('#notes').addClass("active");

    },

    todo() {
              this.settingsPanelOpen = false;
      $('#meeting').hide();
      $('#rooms').hide();
      $('#todoNotes').hide();
      $('#mainSidebar').show();
      $("#files").removeClass("active");
      $("#notes").removeClass("active");
      $("#reminder").removeClass("active");
      // add class to the one we clicked
      $('#todo').addClass("active");

    },
    msg_setting(id) {
      $('#msg-setting' + id).siblings('#msg-dropdown' + id).toggle();
      $('#msg-settingo2o' + id).siblings('#msg-dropdowno2o' + id).toggle();
      
      if (id == this.friendchat[this.friendchat.length - 1]._id){
        let objDiv = document.getElementById("chating");
        setTimeout(() => {
          objDiv.scrollTop = objDiv.scrollHeight + 100;
         // console.log("msg_setting inside: ", objDiv.scrollTop);
        }, 100);
       }
    },

    msg_settingHide(id) {
     
      $('#msg-setting' + id).siblings('#msg-dropdown' + id).hide();
      $('#msg-settingo2o' + id).siblings('#msg-dropdowno2o' + id).hide();
    },

   msg_settingb(id) {
      $('#msg-settingb' + id).siblings('#msg-dropdownb' + id).toggle();
    },

    infiniteHandler($state) {
      let vm = this;
      alert('hello');

      $state.loaded();
   
    },


    //////////////////////////////////////// BROADCASTING ////////////////////////////////////////////////


    startBroadcasting() {

      this.broadcastPassword = this.setPassword;
      this.broadcastChat = [];
      $('#showPresenter').hide();
      $('#broadcastvideocall').modal();
      $('#broadcastvideocall').show();
      presenter(this.broadcastHtml);
      axios.post('/startPresenter/', {
        password: this.broadcastPassword,
        userId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
        this.broadcastingId = response.data.broadcastRefId._id;
        this.presenterId = response.data.broadcastRefId.presenterId
      }, function(err) {
        console.log('err', err);
      })

    },

    showCallchat() {
      $('#chatopen').removeClass('dot-btn dot-success grow');
      $('#chatopen').hide();
      $('#chatclose').show();
      $('#startchat').hide();
      $('#brochatings').addClass('active');
      $('#broadcast-input').show();
      var containers = this.$el.querySelector("#brochatings");
      $("#brochatings").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");

      this.broadCastmsg = '';
      this.editChatid = '';
      this.onEditclear = false;
      this.onbroChat = true;
      $('#broadcast-input').css("height", "96px");


      $('.videocall').removeClass('beforeopenChat');
      $('.videocall').addClass('afteropenChat');
      $('#modalcall').removeClass('modelbefore');
      $('#modalcall').addClass('modelafter');
      $('#contents').show();
      $('.chitchat-main .chat-content').css('opacity', '1');
    },

    hideCallchat() {
      $('#chatopen').removeClass('dot-btn dot-success grow');
      $('.videocall').addClass('beforeopenChat');
      $('.videocall').removeClass('afteropenChat');
      $('#modalcall').removeClass('modelafter');
      $('#modalcall').addClass('modelbefore');
      $('#contents').hide();
      $('#chatclose').hide();
      $('#chatopen').show();



    },

    becomeViewer(presenterid) {

      this.starterBroid = presenterid;
      this.broadCastchat = [];
      $('#showPresenter').hide();
      $('#broadcastvideocall').modal();
      $('#broadcastvideocall').show();
      viewer(presenterid, this.broadcastHtml);
      axios.get('/getBroadcastId/' + presenterid + '/5d4c07fb030f5d0600bf5c03')
        .then(response => {
          this.broadcastingId = response.data.broadcastRefId._id;
          this.bcJoinedChat = {
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            receiverId: this.broadcastingId,
            message: 'I have Joined',
            chatType: 2
          }

          this.$socket.emit('broadcastmsg', this.bcJoinedChat); //emit socket to show other that I have joined BC
          axios.post('/joinViewer', {
            preId: this.starterBroid, //set presenterId here
            joinMsg: this.bcJoinedChat, //set joinMessage here
            broadcastId: this.broadcastingId, //set broadcast id here
            projectId: '5d4c07fb030f5d0600bf5c03',
            userData: this.c_user  //user data here
          }).then(response => {
            this.broadcastChat = response.data; //storing chat in variable
          }, function(err) {
            console.log('err', err);
          });

        }, function(err) {
          console.log('err', err);
        })

    },
    on2Callclose() {


      $('#broadcastvideocall').hide();
      $('.videocall').addClass('beforeopenChat');
      $('.videocall').removeClass('afteropenChat');
      $('#modalcall').removeClass('modelafter');
      $('#modalcall').addClass('modelbefore');
      $('#contents').hide();
      $('#chatclose').hide();
      $('#chatopen').show();
      $('#brochatings').removeClass('active');
      if (this.presenterId == this.c_user._id) {

        this.$socket.emit('closebroadcastpanel', this.broadcastingId);
        this.broadcastChat = [];
        axios.get('/stopPresenter/' + this.c_user._id + '/' + this.broadcastingId + '/' + '5d4c07fb030f5d0600bf5c03')
          .then(response => {
        })
      }
      else {

        this.bcJoinedChat = {
          senderId: { _id: this.c_user._id, name: this.c_user.name },
          receiverId: this.broadcastingId,
          message: 'Left !',
          chatType: 2
        }
        axios.post('/stopViewer', {
          projectId: '5d4c07fb030f5d0600bf5c03',
          userData: this.c_user,
          userId: this.c_user._id,
          preId: this.starterBroid
        }).then(response => {

        }, function(err) {
          console.log('err', err);
        });

        this.$socket.emit('broadcastmsg', this.bcJoinedChat); //emit socket to show other that I have joined BC
      }

      $('.modal-backdrop.fade.show').removeClass("modal-backdrop show");
      broadcaststop();
      localStorage.removeItem("presenterData");

    },

    broadCastmsgchat() {
      this.isbroadchatemojiActive = false;
      this.bcJoinedChat = {
        senderId: { _id: this.c_user._id, name: this.c_user.name },
        receiverId: this.broadcastingId,
        message: this.broadCastmsg,
        chatType: 2
      }

      this.$socket.emit('broadcastmsg', this.bcJoinedChat); //emit socket to show other that I have joined BC
      this.broadCastmsg = '';
      axios.post('/chat', {
        projectId: '5d4c07fb030f5d0600bf5c03',
        msgData: this.bcJoinedChat
      }).then(response => {

      }, function(err) {
        console.log('err', err);
      })
    },
    videoPausecall() {
      var o2oobg = {
        reciverid: this.o2ocallData.userId,
        friendId: this.oncallFriend._id
      }
      this.$socket.emit('sendvideoPausecall', o2oobg);
      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getVideoTracks()[0].enabled = false;
      // webRtcO2OPeer.getLocalStream().getVideoTracks()[0].enabled = false;
      this.videoPause = false;
      this.videoPlay = true;
      // if (this.callType == 'audio') {
      //  // $('#o2oparticipants').hide(2000);
      //  // $("#userbackground").show(2000);
        

      //   //this.callType = 'audio';
      // }
      // $('#local-video').css('display', 'none');

    },
    videoPlaycall() {
      var o2oobg = {
        reciverid: this.o2ocallData.userId,
        friendId: this.oncallFriend._id
      }
      this.$socket.emit('sendvideoPlaycall', o2oobg);
      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getVideoTracks()[0].enabled = true;
      this.videoPlay = false;
      this.videoPause = true;
      // if videoPlay(this.callType == 'audio') {
      //   $("#userbackground").hide(2000);
      //   $('#o2oparticipants').show(2000);
        
      //   //this.callType = 'video';
      // }
      // $('#local-video').css('display', 'block');
    },
    groupPausecall() {

      this.groupVideoPause = false;
      this.groupVideoPlay = true;
       const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getVideoTracks()[0].enabled = false;

    },
  groupPlaycall() {

      this.groupVideoPlay = false;
      this.groupVideoPause = true;
      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getVideoTracks()[0].enabled = true;

    },
    audiogroupPausecall() {

      this.groupAudioPause = false;
      this.groupAudioPlay = true;
       const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getAudioTracks()[0].enabled = false;

    },

  audiogroupPlaycall() {

      this.groupAudioPlay = false;
      this.groupAudioPause = true;
      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getAudioTracks()[0].enabled = true;

    },


    audioPausecall() {

      this.audioPause = false;
      this.audioPlay = true;
      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getAudioTracks()[0].enabled = false;

    },

    audioPlaycall() {

      const stream = document.getElementById('video-'+ this.c_user._id).srcObject;
      stream.getAudioTracks()[0].enabled = true;
      this.audioPlay = false;
      this.audioPause = true;
    },


    /////////////////////////////////////// END BROADCASTING //////////////////////////////////////////

    ////////////////////////////////////// O2O VIDEO CALL ////////////////////////////////////////


    o2ohideCallchat() {

      $('#o2ochatopen').removeClass('dot-btn dot-success grow');
      $('.videocall').addClass('o2obeforeopenChat');
      $('.videocall').removeClass('o2oafteropenChat');
      $('#o2omodalcall').removeClass('o2omodelafter');
      $('#o2omodalcall').addClass('o2omodelbefore');
      $('#local-video').removeClass('afterlocalVideo');
      $('#local-video').addClass('beforelocalVideo');
      $('#local-video').removeClass('afterlocalVideo');
      $('#local-video').addClass('beforelocalVideo');
      $('#o2odetail').removeClass('afterDetail');
      $('#o2odetail').addClass('beforeDetail');
      $('#o2ocontents').hide();
      $('#o2ochatclose').hide();
      $('#o2ochatopen').show();
    },

    callAllow(){
   this.$toasted.success('User not allow call ', {
            theme: "toasted-primary",
            position: "top-right",
            duration: 4000
          })
    },

//================== O2O-CALL=======================================
    videostartCall(friends, statuscall) {
      if(this.callDisable == false){
      this.callDisable=true;
      this.isO2Ocall=true;
      var callSD=0;
      this.callType = statuscall;
    
      this.singlefriend = friends;
      $('#msgcallModal').modal('hide');
        this.oncallFriend = this.singlefriend;
      
      if (this.singlefriend.callStatus == 0) {

       
        // var incoming = document.getElementById("incommingcall");
        // incoming.play();
        // incoming.muted = false;
        // incoming.loop = true;
        // this.checkcallstart();
        this.reset();
        this.stop();
  
        this.oncallFriend = this.singlefriend;
        let userDataobj = {
          friendId: this.oncallFriend._id,
          callerName: this.c_user.name,
          callerId: this.c_user._id,
          callType: statuscall
        };
   
        // videoKCall(this.c_user._id, this.oncallFriend._id, userDataobj, this.callType);
        
         axios.post('/createOne2oneCall', {
          callerId: this.c_user._id,
          receiverId: this.singlefriend._id,
          friendName: this.singlefriend.name,
          callerName: this.c_user.name,
          callType: 1,
          status:4,
          projectId: "5d4c07fb030f5d0600bf5c03"
        }).then(response => {
          this.callerData=response.data;
          //console.log(this.callerData);
            this.$socket.emit('updateCallStatus', {
                  userId: this.c_user._id,
                  userName: this.c_user.name,
                  friendId: this.singlefriend._id,
                  friendName: this.singlefriend.name,
                  userImage: this.c_user.user_image,
                  status: 1,
                  statuscall: statuscall,
                  call:'call',
                  callId:response.data._id
          
        });
          // this.$socket.emit('createCallstatus', this.callerData);
          // window.location.href = '/o2oCall?userName='+this.c_user.name+'&friendName='+this.singlefriend.name+'&userId='+this.c_user._id+'&friendId='+this.singlefriend._id+'&receiveUser=no&callId='+response.data._id;
          window.open('/o2oCall?userName='+this.c_user.name+'&friendName='+this.singlefriend.name+'&userId='+this.c_user._id+'&friendId='+this.singlefriend._id+'&receiveUser=no&callId='+response.data._id+'&callStatus='+statuscall, '_blank');
        // this.$router.push('/o2oCall?userName='+this.c_user.name+'&friendName='+this.singlefriend.name+'&userId='+this.c_user._id+'&friendId='+this.singlefriend._id+'&receiveUser=no&callId='+response.data._id);
        }, function(err) {
          console.log('err', err);
          //alert('error');
        });

      }
      else {

        setTimeout(() => {

          $('#o2ovideocall').modal('hide');
          $('.o2ovideocallModel').modal('hide');
          $('#o2omodalcall').modal('hide');
          $('.modal-backdrop').remove();
        }, 2000);

       axios.post('/createOne2oneCall', {
          callerId: this.c_user._id,
          receiverId: this.singlefriend._id,
          friendName: this.singlefriend.name,
          callerName: this.c_user.name,
          callType: 1,
          status:3,
          projectId: "5d4c07fb030f5d0600bf5c03"
        }).then(response => {
          this.callerData=response.data;
          console.log(this.callerData);
            this.$socket.emit('updateCallStatus', {
                  userId: this.c_user._id,
                  userName: this.c_user.name,
                  friendId: this.singlefriend._id,
                  friendName: this.singlefriend.name,
                  userImage: this.c_user.user_image,
                  status: 3,
                  call:'',
                  callId:response.data._id
          
        });
            }, function(err) {
          console.log('err', err);
          //alert('error');
        });

        this.$toasted.success(this.$t('userbusy'), {
          theme: "toasted-primary",
          position: "top-right",
          duration: 4000
        })
       this.callDisable = false;

      }
    }

    },
    o2oreceiveCall() {
       this.isO2Ocall=false;

      var x = document.getElementById("outgoingcall");
      x.pause();
      x.muted = true;
      // startCall();
      // this.reset();
      // this.start();
      this.checkreset();
      this.checkcallstop();
      this.reset();
      this.stop();
      var o2oobg = {
        reciverid:this.c_user._id,
        friendId: this.callData.userId,
      }
      this.$socket.emit('O2OstarTimer', o2oobg);
      // $('#videocallReceiver').modal('hide');
         const post = this.friendsdata.filter((obj) => {
        return this.callData.userId === obj._id;
      }).pop();
      this.oncallFriend = post;
        axios.post('/updateOne2oneCall', {
          callId: this.callData.callId,
          callStatus: 4,
          projectId: "5d4c07fb030f5d0600bf5c03"
        }).then(response => {
          this.callDisable=true;
             window.open('/o2oCall?userName='+this.callData.userName+'&friendName='+this.callData.friendName+'&userId='+this.callData.friendId+'&friendId='+this.callData.userId+'&receiveUser=yes&callId='+this.callData.callId+'&callStatus='+this.callData.statuscall,'_blank');
        }, function(err) {
          console.log('err', err);
          //alert('error');
        });

      // this.$router.push('/o2oCall?userName='+this.callData.userName+'&friendName='+this.callData.friendName+'&userId='+this.callData.friendId+'&friendId='+this.callData.userId+'&receiveUser=yes&callId='+this.callData.callId);
     
 
   
    },

    //o2o-stop
    o2ostopKCall(status) {

      //this.audio.pause();
      $('#o2ovideocall').modal('hide');
      $('#videocallReceiver').modal('hide');
      this.isO2Ocall=false;
      var x = document.getElementById("outgoingcall"); console.log(x);
      x.pause();
      x.muted = true;
      var incoming = document.getElementById("incommingcall");
      incoming.pause();
      incoming.muted = true;

      this.checkreset();
      this.checkcallstop();
            //this.singlefriend= this.oncallFriend;
      this.o2ostatus = false;

      // $('#showcallModel' + this.oncallFriend._id).show();

      var o2oobg = {
        friendId: this.callData.userId,
        // friendId: this.oncallFriend._id,
        stoperId: this.c_user._id
      }
      console.log(o2oobg);
      // alert('ddd');
      this.$socket.emit('O2OcloseReceiverPanal', o2oobg);

      //for android user
        var _andData = {
        roomName: this.callData.userId,
        friendId: this.oncallFriend._id,  //friendId: not in use right now
        userId: this.c_user._id,
        callType: "o2o"
      }
      this.$socket.emit('leaveAndroidUser', _andData);

       axios.post('/updateOne2oneCall', {
          callId: this.callData.callId,
          callStatus: status,
          projectId: "5d4c07fb030f5d0600bf5c03"
        }).then(response => {
        }, function(err) {
          console.log('err', err);
          //alert('error');
        });
      this.reset();
      this.stop();
    
      this.oncallFriend = {};
    },
    minimizeScreen() {
      $('#startchat').hide();
      $('#o2ovideocall').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $('#showcallModel' + this.oncallFriend._id).hide();
      $('#showCallMin').show();
    },
    o2ostartchat() {
      this.presentersMsg2=false;
      this.o2ostatus = true;
      $('#o2ochatopen').removeClass('dot-btn dot-success grow');
      $('#o2ochatopen').hide();
      $('#o2ochatclose').show();
      $('#o2ochating').addClass('active');
      $('#o2osinglemessage-input').show();
      $('#message-input').hide();
      var containers = this.$el.querySelector("#o2ochating");
      $("#o2ochating").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");

      this.message = '';
      this.editChatid = '';
      this.onEditclear = false;
      this.onChat = true;
      this.chatreplydata = "";
      this.typing = false;
      this.replyBox = false;
      $('#o2osinglemessage-input').css("height", "96px");


      $('.videocall').removeClass('o2obeforeopenChat');
      $('.videocall').addClass('o2oafteropenChat');
      $('#o2omodalcall').removeClass('o2omodelbefore');
      $('#o2omodalcall').addClass('o2omodelafter');
      $('#local-video').removeClass('beforelocalVideo');
      $('#local-video').addClass('afterlocalVideo');

      $('#o2odetail').removeClass('beforeDetail');
      $('#o2odetail').addClass('afterDetail');

      $('#o2ocontents').show();
      $('.chitchat-main .chat-content').css('opacity', '1');

      this.$socket.emit('updateUserSelection', {
        selectedUser: this.oncallFriend._id,
        userId: this.c_user._id
      });
      const post = this.friendsdata.filter((obj) => {
        return this.oncallFriend._id === obj._id;
      }).pop();
      post.usCount = 0;


      this.friendchat = {};
      axios.get('/getChat/' + this.c_user._id + '/' + this.oncallFriend._id + '/50' + '/5d4c07fb030f5d0600bf5c03/0')
        .then(responce => {

          this.friendchat = responce.data;
          this.$socket.emit('lastchatobj_send', this.friendchat[this.friendchat.length - 1]);
          var container = this.$el.querySelector("#o2ochating");
          $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          if (this.friendchat[this.friendchat.length - 1].isSeen == 1) {
            this.isSeen = true;
          } else {
            this.isSeen = false;
          }

        })
        .catch((error) => console.log(error));

      var container = this.$el.querySelector("#o2ochating");
      $("#o2ochating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");


    },

    updateCallStatus(Rid) {
      axios.post('/updateCallStatus', {
        userId: this.c_user._id,
        friendId: Rid,
        status: 0,
        projectId: "5d4c07fb030f5d0600bf5c03"
      }).then(response => {

      }, function(err) {
        console.log('err', err);
        //alert('error');
      });
    },
    ///////////////////////////////////////////////////////// O2O AUDIO CALL /////////////////////////////////////////////////////////////////////////////

 


    ////////////////////////////////////// GROUP VIDEO CALL ////////////////////////////////////////


 
    
    groupvideostartCall(group,statusCall) {
       if(this.callDisable == false){
        this.callDisable=true;
      this.isGroupcall=true;
      this.singlegroup = group;
      this.callGroup=group;
      this.grouphideCallchat();
      var groupRoomName = group.name;
      var groupUser = this.c_user.name;
      console.log(groupRoomName);
      // register(groupRoomName, groupUser);

      axios.post('/createGroupCall', {
        groupId: group._id,
        callerId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03',
      }).then(response => {
        console.log(response);
        this.$socket.emit('sendGroupdetail', {
          groupId: group._id,
          groupName: group.name,
          userId: this.c_user._id,
          statusCall:statusCall,
          groupCallid: response.data._id
        });
         window.open('/groupCall?groupName='+groupRoomName+'&groupId='+this.callGroup._id+'&groupCallId='+this.groupCallId+'&callStatus='+statusCall,'_blank');
         // this.$router.push('/groupCall?groupName='+groupRoomName+'&groupId='+this.callGroup._id+'&groupCallId='+this.groupCallId);
      }, function(err) {
        console.log('err', err);
        //alert('error');
      });
    }


    },
    groupvideoJoinCall(group) {
       if(this.callDisable == false){
        this.callDisable=true;
      this.grouphideCallchat();
      var x = document.getElementById("outgoingcall");
        console.log(x);
        x.pause();
        x.muted = true;
        this.isGroupcall=true;
      this.singlegroup = group;
      var groupRoomName = group.name;
      var groupUser = this.c_user.name;
      console.log(groupRoomName);
      // register(groupRoomName, groupUser);
      axios.post('/joinCallGroup', {
        _id: this.groupCallId,
        groupId: this.callGroup._id,
        userId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03',
        member: this.c_user._id
      }).then(response => {
        console.log(response);
        window.open('/groupCall?groupName='+groupRoomName+'&groupId='+this.singlegroup._id+'&groupCallId='+this.groupCallId+'&callStatus=audio','_blank');
        // this.$router.push('/groupCall?groupName='+groupRoomName+'&groupId='+this.singlegroup._id+'&groupCallId='+this.groupCallId);
      }, function(err) {
        console.log('err', err);
        //alert('error');
      });
    }

    },

    groupstopKCall() {
      // leaveRoom();
      this.$socket.emit('groupcallclose', {
          groupId: this.callGroup._id,
        });
      $('#groupvideocall').modal('hide');
      this.grouphideCallchat();
      console.log(this.groupCallId,'closeeeeeeeeeeeeeeeeeeeeeeeeee');
      axios.post('/leaveCallGroup', {
        _id: this.groupCallId,
        groupId: this.callGroup._id,
        userId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03',
      }).then(response => {
        this.isGroupcall=false;
        console.log(response.data.members);
        if(response.data.members && response.data.members.length < 1){
      this.$socket.emit('sendGroupclose', {
          groupId: this.callGroup._id,
        });
        }
        console.log(response,'leavegroup');
      }, function(err) {
        console.log('err', err);
        //alert('error');
      });

      $('#groupchatclose').hide();
      $('#groupchating').removeClass('active');
      $('#groupsinglemessage-input').hide();
      $('#chating').removeClass('active');
    
    },
    groupminimizeScreen() {
      $('#startchat').hide();
      $('#groupvideocall').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $('#groupshowcallModel' + this.oncallGroup._id).hide();
      $('#showCallMin').show();
    },

 groupReceiveCall() {
      this.callDisable=true;
      var x = document.getElementById("outgoingcall");
        console.log(x);
        x.pause();
        x.muted = true;
        this.grouphideCallchat();
      this.singlegroup = this.callGroup;
      var groupRoomName = this.receiveGroupName;
      var groupUser = this.c_user.name;
      console.log(this.groupCallId, 'lllllllllllldsaaaaaaaa');
      // register(groupRoomName, groupUser);
      $('#groupcallReceiver').modal('hide');
      // $('#groupvideocall').modal('show');
      this.checkGroupreset();
      this.checkGroupcallstop();
      axios.post('/joinCallGroup', {
        _id: this.groupCallId,
        groupId: this.callGroup._id,
        userId: this.c_user._id,
        projectId: '5d4c07fb030f5d0600bf5c03',
        member: this.c_user._id
      }).then(response => {
        console.log(response);
        window.open('/groupCall?groupName='+groupRoomName+'&groupId='+this.callGroup._id+'&groupCallId='+this.groupCallId+'&callStatus='+this.groupStatusCall,'_blank');
        // this.$router.push('/groupCall?groupName='+groupRoomName+'&groupId='+this.callGroup._id+'&groupCallId='+this.groupCallId);
      }, function(err) {
        console.log('err', err);
        //alert('error');
      });

    },
    groupstartchat() {
      this.groupstatus = true;
      $('#groupdetail').removeClass('groupCallOptionsb4');
      $('#groupdetail').addClass('groupCallOptionsafter');

      $('#groupCenter').removeClass('groupCallOptionsb4');
      $('#groupCenter').addClass('groupCallOptionsafter');
      $('#groupchatopen').removeClass('dot-btn dot-success grow');
      $('#groupchatopen').hide();
      $('#groupchatclose').show();
      $('#groupchating').addClass('active');
      $('#groupsinglemessage-input').show();

      var containers = this.$el.querySelector("#groupchating");
    
      $("#groupchating").animate({ scrollTop: containers.scrollHeight + 7020 }, "fast");

      this.onEditgroupclear = false;
      this.ongroupChat = true;
      this.groupmessage = '';
      this.editgroupChatid = '';
      this.groupchatreplydata = "";
      $('#groupsinglemessage-input').css("height", "96px");

      axios.get('/getGroupChat/'+this.callGroup._id + '/' + this.c_user._id  + '/50/5d4c07fb030f5d0600bf5c03')
        .then((responce) => this.groupchatdata = responce.data)
        .catch((error) => console.log(error));
      $('.groupcall').removeClass('groupbeforeopenChat');
      $('.groupcall').addClass('groupafteropenChat');
      $('#groupmodalcall').removeClass('groupmodelbefore');
      $('#groupmodalcall').addClass('groupmodelafter');

      $('#groupcontents').show();
      $('.chitchat-main .chat-content').css('opacity', '1');


    },

       grouphideCallchat() {
//alert('close');
      $('#groupdetail').removeClass('groupCallOptionsafter');
    $('#groupdetail').addClass('groupCallOptionsb4');

      $('#groupCenter').removeClass('groupCallOptionsafter');
      $('#groupCenter').addClass('groupCallOptionsb4');
      $('#groupchatopen').removeClass('dot-btn dot-success grow');
      $('.groupcall').addClass('groupbeforeopenChat');
      $('.groupcall').removeClass('groupafteropenChat');
      $('#groupmodalcall').removeClass('groupmodelafter');
      $('#groupmodalcall').addClass('groupmodelbefore');
     

      $('#groupcontents').hide();
      $('#groupchatclose').hide();
      $('#groupchatopen').show();



    },

    ////////////////////////////////////// END GROUP VIDEO CALL ////////////////////////////////////////
screenSharing(){
this.startScreenuser=this.c_user._id;
var friendId=this.oncallFriend._id;
 screenShare();
 localStorage.setItem('friendId', friendId);
 // this.$socket.emit('screenUrl',{userId:this.c_user._id, startScreen: this.c_user._id, friendId:this.oncallFriend._id, viewerUrl:'https://chat.chatto.jp/sViewer.html'} );
this.screenshareActive=false;
this.stopscreenshareActive=true;
},

stopScreenShare(){
  

  this.stopscreenshareActive=false;
  this.screenshareActive=true;

  this.$socket.emit('stopscreenshare',{userId:this.c_user._id, friendId:this.oncallFriend._id});
    stopScreenShare();
},

    addfriends(friend) {
      if (friend.friendReqStatus == 0) {
 
        axios.post('/friends/sendFriendRequest', {
          userId: this.c_user._id,
          friendId: friend._id,
          projectId: '5d4c07fb030f5d0600bf5c03',
          status: 2
        }).then(response => {      
          const searchdata = this.searchUsers.filter((obj) => {
            return friend._id === obj._id;
          }).pop();
          
          searchdata.friendReqStatus = 2;
          searchdata.friendReqSenderId = this.c_user._id;
          searchdata["friendReqId"] = response.data._id;
          this.friendsdata.push(searchdata);
          console.log(searchdata);
          console.log(this.friendsdata);

          // -------------------- IN PROGRESS [AMMAR]-----------------------------------
          let tempUserData = this.c_user;
          tempUserData["friendReqId"] = response.data._id;
          tempUserData.friendReqSenderId = this.c_user._id;
          tempUserData.friendReqStatus = 2;
          tempUserData.updatedByMsg = new Date().toISOString();
          // tempUserData['latestMsg'] = {};
          // tempUserData.latestMsg['message'] = '';
          var statusUpdate = {
            _id: friend._id,
            status: 2,
            myId: this.c_user._id,
            userObj: tempUserData   //sending current user obj with required appended fields
          }
          this.$socket.emit('updateRequeststatus', statusUpdate);
          // --------------------  ---------- ------------------------------------------
        }, function(err) {
          console.log('err', err);
        })
      }
      else if (friend.friendReqStatus == 3) {
 
        axios.post('/friends/updateFriendRequest', {
          _id: friend.friendReqId,
          status: 2,
          userId: this.c_user._id,
          friendId: friend._id,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {

          // -------------------- IN PROGRESS [AMMAR]-----------------------------------
          const searchdata = this.searchUsers.filter((obj) => {
            return friend._id === obj._id;
          }).pop();
          searchdata.friendReqStatus = 2;
          searchdata.friendReqSenderId = this.c_user._id;
          searchdata["friendReqId"] = response.data._id;
          this.friendsdata.push(searchdata);
          console.log(searchdata);
          console.log(this.friendsdata);
          let tempUserData = this.c_user;
          tempUserData["friendReqId"] = response.data._id;
          tempUserData.friendReqSenderId = this.c_user._id;
          tempUserData.friendReqStatus = 2;
          tempUserData.updatedByMsg = new Date().toISOString();
          // tempUserData['latestMsg'] = {};
          // tempUserData.latestMsg['message'] = '';
          var statusUpdate = {
            _id: friend._id,
            status: 2,
            friendId: friend._id,
            myId: this.c_user._id,
            userObj: tempUserData   //sending current user obj with required appended fields
          }
          this.$socket.emit('updateRequeststatus', statusUpdate);
          // --------------------  ---------- ------------------------------------------

        }, function(err) {
          alert('error');
        })

      }

    },

    friendRequestupdate(data, status) {
      var statusUpdate = {
        _id: data._id,
        status: status,
        myId: this.c_user._id
      }
      this.$socket.emit('updateRequeststatus', statusUpdate);
      const fdata = this.friendsdata.filter((obj) => {
        return data._id === obj._id;
      }).pop();

      fdata.friendReqStatus = status;
      fdata.friendReqSenderId = this.c_user._id;
      fdata['latestMsg'] = {};
      fdata.latestMsg['message'] = '';
      console.log(fdata);
      axios.post('/friends/updateFriendRequest', {
        _id: data.friendReqId,
        status: status,
        projectId: '5d4c07fb030f5d0600bf5c03'
      }).then(response => {
      }, function(err) {
        console.log('err', err);
      })
    },


    /////////////////////////////////////// ADD FRIENDS END ////////////////////////////////////////////////////

    userUploadfile(event){
     let userfilesdata = this.$refs.userImage.files;
      userfilesdata.forEach((file) => {
   
        let userProfiledata = new FormData();
        userProfiledata.append('file', file);
        userProfiledata.append('imageName', file.name);
        userProfiledata.append('userId', this.c_user._id);
        userProfiledata.append('projectId', '5d4c07fb030f5d0600bf5c03');

        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        //this.isLoading = true;
        axios.post('/uploadProfilePic', userProfiledata, config).then((response) => {
       
       this.userImageName=response.data;
       localStorage.setItem('c_user_image', JSON.stringify(response.data));
       
          
        }, function(err) {
          console.log('err', err);
        })
          })
    },
    userProfileUploadfile(event){
     let userfilesdata = this.$refs.imageProfileMain.files;
      userfilesdata.forEach((file) => {
      
        let userProfiledata = new FormData();
        userProfiledata.append('file', file);
        userProfiledata.append('imageName', file.name);
        userProfiledata.append('userId', this.c_user._id);
        userProfiledata.append('projectId', '5d4c07fb030f5d0600bf5c03');
    
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        //this.isLoading = true;
        axios.post('/uploadProfilePic', userProfiledata, config).then((response) => {
  
       this.userImageName=response.data;
       localStorage.setItem('c_user_image', JSON.stringify(response.data));
       
          
        }, function(err) {
          console.log('err', err);
          alert('error');
        })
          })
    },
    profileEdit(){
       this.username=this.current_User.name;
       $('#profileEdit').hide();
       $('#profileUpdate').show();
  },
   profileUpdate(){
    // this.username=this.$refs.Username.value;
  
        $('#profileUpdate').hide();
            $('#profileEdit').show();
         // this.username=this.current_User.name;
         axios.post('/updateName',{userId: this.c_user._id, projectId: '5d4c07fb030f5d0600bf5c03',newName:this.$refs.Username.value}).then(response => {
        //  console.log(response.data);
         let _updatedData = response.data;
         let userNewData = {
           "_id": _updatedData._id,
          "name":  _updatedData.name
         };
         this.$socket.emit('updateUsername', userNewData);

         // this.$refs.Username.value=response.data.name
         localStorage.setItem('userData', JSON.stringify(response.data));
         this.c_user = JSON.parse(localStorage.getItem('userData'));
         this.current_User = JSON.parse(localStorage.getItem('userData'));

         this.$toasted.success('Name Update Successfully ', {
          theme: "toasted-primary",
          position: "top-center",
          duration: 3000
        })
        }, function(err) {
          console.log('err', err);
        
        })
  },
    chatSidebar() {
      $('#groupslide-menu').hide();
      $('#slide-menu').show();
    },
    groupSidebar() {
      $('#slide-menu').hide();
      $('#groupslide-menu').show();
    },
    saveTodo(){
     var todoObj={
          userId: this.c_user._id,
          assignFrom: this.c_user.name,
          todo: this.todo,
          assignTo: this.assignName,
          assignDate: this.assignDate,
          type:'todo',
          image:this.c_user.user_image,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }
        var socketNotificationObj={
          receiverId:this.assignName._id,
          senderId:this.c_user._id,
          senderName:this.c_user.name,
          notificationText:'You been assign a new task by '+this.c_user.name
        }
         this.$socket.emit('notification', socketNotificationObj);
   axios.post('/addTodo', todoObj).then(response => {
        
          this.myTodoList.push(response.data);
        
           this.$toasted.success(this.$t('TaskCreatedSuccessfully'), {
          theme: "toasted-primary",
          position: "top-center",
          duration: 3000
        })
         
           setTimeout(() => {
              $('#createtodoModal').modal('hide');
        }, 3000);

       
        }, function(err) {
          console.log('err', err);
  
        })
    },

    getMytodo(){
        axios.post('/getmyTodo',{userId: this.c_user._id, projectId: '5d4c07fb030f5d0600bf5c03'}).then(response => {
         
          this.myTodoList = response.data;
        }, function(err) {
          console.log('err', err);
   
        })

    },
    getTodo(){
        axios.post('/getTodo',{userId: this.c_user._id, projectId: '5d4c07fb030f5d0600bf5c03'}).then(response => {
        
          this.TodoList = response.data;
        }, function(err) {
          console.log('err', err);
       
        })

    },
    todoStatusUpdate(value){
     // console.log(value.target);
      
       var data= value.target.value.split(',');
    
       var socketNotificationObj={
          receiverId:data[2],
          senderId:this.c_user._id,
          senderName:this.c_user.name,
          notificationText:' task update by '+this.c_user.name
        }
         this.$socket.emit('notification', socketNotificationObj);
       axios.post('/todoStatus',
        {
          userId: this.c_user._id,
          status:value.target.value,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
        
          //this.TodoList = response.data;
        }, function(err) {
          console.log('err', err);
        
        })

    },

     allChatMedia(){
     // console.log(value.target);
       axios.post('/allImageChat',
        {
          userId: this.c_user._id,
          projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
       
          this.allMedia = response.data;
        }, function(err) {
          console.log('err', err);
       
        })

    },
    
     allChatDocument(){
       axios.post('/allDocumentChat',
        {
          userId: this.c_user._id,
           projectId: '5d4c07fb030f5d0600bf5c03'
        }).then(response => {
         
          this.allDocument = response.data;
        }, function(err) {
          console.log('err', err);
         
        })

    },



    ////////////////////////////////////////  NOTE  ///////////////////

    noteaddContactPersons(friends){
      
      this.notecontactPersons.push(friends);
      this.notecontactPersonsName.push(friends.name);
      $('#notecontactadd' + friends._id).hide();
      $('#notecontactRm' + friends._id).show();
  
     },

        noteremoveContactPerson(userid,username,index){

        var indexOf=0;
       var exists = this.notecontactPersons.some(function(field,index) {
        indexOf= index;
                return field._id === userid
              });
              if (!exists) {
                this.notecontactPersons.splice(indexOf, 1);
              }
     

            this.notecontactPersons.splice(index, 1);
            this.notecontactPersonsName.splice(index, 1);
           $('#notecontactRm' + userid).hide();
           $('#notecontactadd' + userid).show();
    },


    //////////////////////////////////////////// MEETING SECTION //////////////////////////

    addMeetingPersons(){
      //alert(this.invitePersonMeeting);
      if(this.invitePersonMeeting.length > 0){
      this.invitePersons.push(this.invitePersonMeeting);
      }
      this.invitePersonMeeting='';
    },

    removeMeetingPerson(index){
        this.invitePersons.splice(index, 1)
    },


    addContactPersons(friends){
      
      this.contactPersons.push(friends);
      this.contactPersonsName.push(friends.name);
      $('#contactadd' + friends._id).hide();
      $('#contactRm' + friends._id).show();
  
     },

    removeContactPerson(userid,username,index){
var indexOf=0;
     var exists = this.contactPersons.some(function(field,index) {
      indexOf= index;
              return field._id === userid
            });
            if (!exists) {
              this.contactPersons.splice(indexOf, 1);
            }
     // if (this.contactPersons[index]._id === userid) {

     //        this.contactPersons.splice(index, 1)
     //      } else {
     //        let found = this.contactPersons.indexOf(userid)
     //        this.contactPersons.splice(found, 1)
     //      }

     //      if (this.contactPersonsName[index] === username) {

     //        this.contactPersonsName.splice(index, 1)
     //      } else {
     //        let found1 = this.contactPersonsName.indexOf(username)
     //        this.contactPersonsName.splice(found1, 1)
     //      }

          this.contactPersons.splice(index, 1);
          this.contactPersonsName.splice(index, 1);
         $('#contactRm' + userid).hide();
         $('#contactadd' + userid).show();
    },

    getUpcommingMeetings(){
      this.meetingType='Upcomming';
      this.presentersMeeting= false;
    $('#startMeeting').hide();
    $('#landMeeting').show();
    axios.get('/getMeeting/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03')
        .then((responce) => this.meetingsData = responce.data)
        .catch((error) => console.log(error));
    },

    getCompleteMeetings(){
      this.meetingType='completemeeting';
    $('#startMeeting').hide();
    $('#landMeeting').show();
    axios.get('/getCompletedMeeting/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03')
        .then((responce) => this.completemeetingsData = responce.data)
        .catch((error) => console.log(error));
    },

    addMeeting(){
     // console.log("adding meeting: ", (this.meeting.meeting_time + this.meeting_time_meridian));
         let meeting_file =  this.$refs.meeting_file.files;
        
          if(this.meeting.meeting_zone == ''  || this.meeting.meeting_notification == ''  || this.meeting.meeting_title == ''  || !this.meeting.meeting_time || !this.meeting.meeting_date){
             this.$toasted.error(this.$t('entermissing'), { 
                     theme: "toasted-primary", 
                     position: "top-center", 
                     duration : 5000
                   })
            return 0;

          }
       let meetingformDatas = new FormData();
            meeting_file.forEach((file) => {
                if(meeting_file.length != 0){
                  meetingformDatas.append('file', file);
                  meetingformDatas.append('filename[]', file.name);
                }
              });
              this.meeting.meeting_time += this.meeting_time_meridian;
              this.meeting.meeting_duration = (this.meeting.meeting_duration +":"+ this.meeting_duration_minutes);
              meetingformDatas.append('userId', this.c_user._id);
              meetingformDatas.append('meetingData', JSON.stringify(this.meeting));
              meetingformDatas.append('meetingPersons', this.invitePersons);
              meetingformDatas.append('meetingFriends', JSON.stringify(this.contactPersons));
              meetingformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03');
           
             let config = {
                header: {
                  'Content-Type': 'multipart/form-data'
                }
              }

          if(this.editMeetingId){
            // var members = this.invitePerson.split(",");
            var post={};
            if(this.meetingType== 'Upcomming'){
                post = this.meetingsData.filter((obj) => {
                  return this.editMeetingId === obj._id;
                }).pop();
              }else{
                  post = this.completemeetingsData.filter((obj) => {
                  return this.editMeetingId === obj._id;
                }).pop();
              }
            
                post.meeting_title = this.meeting.meeting_title;
                post.meeting_zone= this.meeting.meeting_zone;
                post.meeting_notification= this.meeting.meeting_notification;
                post.meeting_topic= this.meeting.meeting_topic;
                post.meeting_password= this.meeting.meeting_password;
                post.meeting_time= (this.meeting.meeting_time + this.meeting_time_meridian);
                post.meeting_date= this.meeting.meeting_date;
                post.meeting_duration= (this.meeting.meeting_duration +":"+ this.meeting_duration_minutes);            
                post.meeting_id= this.meeting.meeting_id;
                // post.meeting_members= members;
                meetingformDatas.append('_id', this.editMeetingId);
                    this.isLoading = true;
               axios.post('/updateMeeting', meetingformDatas, config).then((response) => {
               	console.log(response.data);
                  post.meeting_file= response.data.meeting_file;
                  // this.meetingsData.push(response.data);
                  this.isLoading = false;
                  this.$toasted.success('Update Successfully', {
					        theme: "toasted-primary",
					        position: "top-center",
					        duration: 2000
					      })
                        $('#addMeetingmodal').modal('hide');
                       $("label[for='file_name'] b").text('');
                        this.editMeetingId='';
                }, function(err) {
                  console.log('err', err);
                })
                      
          }
          else{

              this.isLoading = true;
               axios.post('/createMeeting', meetingformDatas, config).then((response) => {
                      this.getUpcommingMeetings();
                        this.meetingsData.push(response.data);
                        this.$toasted.success('Create Successfully', {
                      					        theme: "toasted-primary",
                      					        position: "top-center",
                      					        duration: 2000
                      					      })
                         this.$socket.emit('createmeeting',response.data);
                        $('#addMeetingmodal').modal('hide');
                        $("label[for='file_name'] b").text('');
                     
                }, function(err) {
                  console.log('err', err);
                })
               }
    },
    createMeeting(){
      $('#meetingTitle').html(""+ this.$t('CreateMeeting'));
      $('#addUpdatemeeting').html(`<i class='fa fa-plus' aria-hidden='true'></i><span style='color: white; padding-left: 6px;'>${ this.$t('CreateMeeting') }</span>`);
       var output = document.getElementById('meetingfile');
            output.innerHTML = '';
      this.meeting={
        meeting_title:'',
        meeting_zone:'',
        meeting_notification:'',
        meeting_topic:'',
        meeting_time:'',
        meeting_date:'',
        meeting_duration:'0'
      }
      this.meeting_Id();
      this.meeting_Password();
      this.invitePersons=[];
      this.contactPersons=[];
      this.editMeetingId='';
      $('.showAddmeeting2').show();
      $('.hideRemovemeeting2').hide();
    },

    getFirstLetter(str){
     
      if(str){
      	var acronym = str.replace(/\s/g, '').split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
      return acronym;
      //   var matchess = str.match(/\b(\w)/g); // ['J','S','O','N']
      //   var matches = matchess.slice(0, 2);
      //   var acronym = matches.join(''); // JSON

      // return acronym;
      }
      
    },

    editMeeting(meeting){
        console.log(meeting);
        $('#meetingTitle').html(""+ this.$t('MeetingTitle'));
        $('#addUpdatemeeting').html(`<i class='fa fa-pencil-square-o' aria-hidden='true'></i><span style='color: white'> ${ this.$t('UpdateMeeting') } </span>`);
        // $('#meetingfile').empty();
        var output = document.getElementById('meetingfile');
            output.innerHTML = '';
     this.editMeetingId=meeting._id;
    this.meeting={
              meeting_title: meeting.meeting_title,
            meeting_zone: meeting.meeting_zone,
            meeting_notification: meeting.meeting_notification,
            meeting_topic: meeting.meeting_topic,
            meeting_password: meeting.meeting_password,
            meeting_time: (meeting.meeting_time + this.meeting_time_meridian),
            meeting_date: meeting.meeting_date,
            meeting_duration: (meeting.meeting_duration +":"+ this.meeting_duration_minutes),
            meeting_id: meeting.meeting_id,
        }
          this.meetingfile= meeting.meeting_file;
          console.log(this.meetingfile);
          this.invitePersons=meeting.meeting_members;
          this.contactPersons=meeting.friend_members;
          $('#addMeetingmodal').modal('show');
    },

	removeMeetingfile(fileId)
	{

    axios.post('/removeMeetingDocument', {'_id':this.singleMeeting._id,'fileId':fileId, 'projectId':'5d4c07fb030f5d0600bf5c03',
           }).then((response) => {
                console.log(response);
                this.$refs.meetingFile.files = null;
                this.$refs.meetingFile.value = "";

                this.meetingfile= response.data.meeting_file;

                let post = this.meetingsData.filter((obj) => {
                  return response.data._id === obj._id;
                }).pop();
            
                post.meeting_file=response.data.meeting_file;

                }, function(err) {
                  console.log('err', err);
               
                })
	},

   addMeetingFile(){
  
         let meeting_file =  this.$refs.meetingFile.files;
         console.log("addMeetingFile:", meeting_file);
         let meetingformDatas = new FormData();
         meeting_file.forEach((file) => {
        
          if(meeting_file.length != 0){
            meetingformDatas.append('file', file);
            meetingformDatas.append('fileName[]', file.name);
          }
          });
            
              meetingformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03');
           
             let config = {
                header: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          var post={};
            if(this.meetingType== 'Upcomming'){
                post = this.meetingsData.filter((obj) => {
                  return this.singleMeeting._id === obj._id;
                }).pop();
              }else{
                  post = this.completemeetingsData.filter((obj) => {
                  return this.singleMeeting._id === obj._id;
                }).pop();
              }
            
             
                // post.meeting_members= members;
                meetingformDatas.append('_id', this.singleMeeting._id);
                    this.isLoading = true;
               axios.post('/uploadMeetingDocument', meetingformDatas, config).then((response) => {
                //  this.$refs.meetingFile.files = null;
                //  this.$refs.addmeetFile.value = null;

                    console.log(response.data);
                    post.meeting_file= response.data.meeting_file;
                    // this.meetingsData.push(response.data);
                    this.isLoading = false;
                    this.$toasted.success('Added successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
                }, function(err) {
                  console.log('err', err);
                })
             
           
    },

     editinviteMeeting(meeting){
   
      $('#meetingTitle').html(""+ this.$t('UpdateMeeting'));
        $('#addUpdatemeeting').html(`<i class='fa fa-pencil-square-o' aria-hidden='true'></i><span style='color: white;'> ${ this.$t('UpdateMeeting') } </span>`);
     this.editMeetingId=meeting._id;
    this.meeting={
              meeting_title: meeting.meeting_title,
            meeting_zone: meeting.meeting_zone,
            meeting_notification: meeting.meeting_notification,
            meeting_topic: meeting.meeting_topic,
            meeting_password: meeting.meeting_password,
            meeting_time: meeting.meeting_time + this.meeting_time_meridian,
            meeting_date: meeting.meeting_date,
            meeting_duration: (meeting.meeting_duration +":"+ this.meeting_duration_minutes),
            meeting_id: meeting.meeting_id,
        }

          this.invitePersons=meeting.meeting_members;
        $('#invitePersonMeeting').modal('show');
    },
  removeMeeting(meeting){
    this.$dialog.confirm('Are you sure you want to delete?')
  .then((dialog) =>  {
        axios.post('/endMeetingSession', {'_id':meeting._id
           }).then((response) => {
            if(this.meetingType== 'Upcomming'){
            
               this.meetingsData.splice(this.meetingsData.indexOf(meeting), 1);
            }else{
                         
               this.completemeetingsData.splice(this.completemeetingsData.indexOf(meeting), 1);
            }
                      
                 
                        $('#startMeeting').hide('');
                        $('#landMeeting').show();
                        $('.meetingContentRow.active').removeClass('active');
                }, function(err) {
                  console.log('err', err);
               
                })
  })
  .catch(function () {
  });
               
  },

  meetingStatus(){
      // if(this.callDisable == false){
       axios.post('/updateMeetingStatus', {'_id':this.singleMeeting.meeting_id,'meetingStatus':1,'activeStatus':1,projectId: '5d4c07fb030f5d0600bf5c03'
       }).then((response) => {
         this.$socket.emit('startMeeting',{'meetindId':this.singleMeeting.meeting_id,'hoster':this.c_user.name});
              this.callDisable = true;
              this.$session.set('isMeetingAdmin', true);
               window.open('/meeting?meetingId='+this.singleMeeting.meeting_id, '_blank');
              // this.$router.push('/meeting?meetingId='+this.singleMeeting.meeting_id);
              
            }, function(err) {
              console.log('err', err);
            })
   // }
         
  },
    openMeeting(meeting){
      this.presentersMeeting = false;
     $('#landMeeting').hide();

      $('.meetingContentRow.active').removeClass('active');
       
      $('#'+meeting._id).addClass('active');
       if (screen.width < 650) {
       $('#startMeeting').addClass('meetingDetailMB');
    }
      
      this.singleMeeting=meeting;
      console.log(meeting);
    
       this.membersCount=this.singleMeeting.meeting_members.length + this.singleMeeting.friend_members.length;
     $('#startMeeting').show();
    },

    getCallhistory(){
      // $('.settingWelcomePanel').hide();
      $('#settingcontent').hide();
      $('#meeting').hide();
      $('#rooms').hide();
      $('#mainSidebar').show();
      $('#content').show();
      $('#todoNotes').hide();
      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");

      $('#chat').removeClass('active show');
      $('#call').addClass('active show');
       $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('.call-content').css('opacity', '1');
      $('#callcontent').show();
      $('#contactdetails').hide();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').hide();
      $('#mainchatpage').hide();
      $('.call-content.active').removeClass('active');
  axios.get('/getOne2oneCalls/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/0')
        .then((responce) =>{
          console.log(responce.data);
          this.allCallData=responce.data
        })
        .catch((error) => console.log(error));
    },



    openCallhistory(call){
     
      this.callID=call._id;
      if(call.callerId._id == this.c_user._id){

          const post = this.friendsdata.filter((obj) => {
            return call.receiverId._id === obj._id;
          }).pop();
       this.singlefriend = post;
      this.singlecall=call.receiverId;
      }else{
        const post = this.friendsdata.filter((obj) => {
            return call.callerId._id === obj._id;
          }).pop();

         this.singlefriend = post;
         this.singlecall=call.callerId;
      }
      this.callHistories=call.callHistory;
     
     $('.call-content').addClass('active');
       $('#callcontent').hide();
      $('#contactdetails').show();

      $('.callActive.active').removeClass('active');
       
      $('#'+call._id).addClass('active');
      $('#d'+call._id).addClass('active');
      $('#m'+call._id).addClass('active');
      $('#r'+call._id).addClass('active');
    },

    missallCallHistory() {
      $('.callActive.active').removeClass('active');
      $('#meeting').hide();
      $('#rooms').hide();
      $('#mainSidebar').show();
      $('#content').show();
      $('#todoNotes').hide();
      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");

      $('#chat').removeClass('active show');
      $('#call').addClass('active show');
       $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('.call-content').css('opacity', '1');
      $('#callcontent').show();
      $('#contactdetails').hide();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').hide();
      $('#mainchatpage').hide();
      $('.call-content.active').removeClass('active');
      axios.get('/getOne2oneCalls/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/3')
        .then((responce) =>{
          console.log(responce.data);
          this.missCallData=responce.data
        }).catch((error) => console.log(error));

      },

    dialallCallHistory(){

      $('#meeting').hide();
      $('#rooms').hide();
      $('#mainSidebar').show();
      $('#content').show();
      $('#todoNotes').hide();
      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");

      $('#chat').removeClass('active show');
      $('#call').addClass('active show');
       $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('.call-content').css('opacity', '1');
      $('#callcontent').show();
      $('#contactdetails').hide();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').hide();
      $('#mainchatpage').hide();
      $('.call-content.active').removeClass('active');
      axios.get('/getOne2oneCalls/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/1')
        .then((responce) =>{
          console.log(responce.data);
          this.dialCallData=responce.data
        })
        .catch((error) => console.log(error));
      },

     receivellCallHistory(){

      $('#meeting').hide();
      $('#rooms').hide();
      $('#mainSidebar').show();
      $('#content').show();
      $('#todoNotes').hide();
      $("#recent").addClass("active");
      $('#files').removeClass("active");
      $('#status').hide();
      $('#status').css('opacity', '0');

      $('#favourite').removeClass("active");
      $("#contact-list").removeClass("active");
      $("#document").removeClass("active");
      $("#notification").removeClass("active");
      $("#settings").removeClass("active");
      $("#status").removeClass("active");
      $('#notes').removeClass("active");

      $('#chat').removeClass('active show');
      $('#call').addClass('active show');
       $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('.call-content').css('opacity', '1');
      $('#callcontent').show();
      $('#contactdetails').hide();
      this.groupSearch = '';
      $('.init').removeClass('active');
      $('#message-input').hide();
      $('#singlemessage-input').hide();
      $('#startchat').hide();
      $('#group_chat').hide();
      $('#mainsearch').hide();
      $('#mainchatpage').hide();
      $('.call-content.active').removeClass('active');
      axios.get('/getOne2oneCalls/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/5')
        .then((responce) =>{
          console.log(responce.data);
          this.receiveCallData=responce.data
        })
        .catch((error) => console.log(error));
      },

    onChangeEventHandler(event){
 
      if(event.value == true){
          var read= 1;
      }else{
         var read= 0;
      }
       axios.post('/readReceipt', {'userId':this.c_user._id,'readReceiptStatus':read,projectId: '5d4c07fb030f5d0600bf5c03'
       }).then((response) => {
         this.$socket.emit('updateReadReceipt',{'receiptStatus':response.data.status,'userId':this.c_user._id});
              localStorage.setItem('userData', JSON.stringify(response.data.userData));
              this.c_user = JSON.parse(localStorage.getItem('userData'));
                this.current_User = this.c_user;
            }, function(err) {
              console.log('err', err);
              alert('error');
            })
    },
      joinMeeting(){

      	        // if(this.callDisable == false){
      	        	this.callDisable = true;
      	        	this.$session.set('isMeetingAdmin', true);
                    window.open('/meeting?meetingId='+this.singleMeeting.meeting_id, '_blank');
      	        // }
                  // this.meetingId=this.$route.query.meetingId;
                  
                  // this.$router.push('/meeting?meetingId='+this.singleMeeting.meeting_id);
              },

    /////////////////////////////// ROOM PART ////////////////////////////////////   
    getAllRooms(type){
	    this.presentersRoom = false;
	    this.roomsData=[];
      // this.meetingType='completemeeting';
	    $('#startRoom').hide();
	    $('#landRoom').show();
	    axios.get('/getRooms/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/'+type)
	        .then((responce) => {
	        
	          this.roomsData=responce.data;
	        })
	        .catch((error) => console.log(error));
      
    },

    addRoom(){
    $('#addRoombutton').prop('disabled', true);
     let room_file =  this.$refs.room_files.files;
     console.log("adding room: ", room_file);
          if(this.room.room_timezone == ''  || this.room.roomtype == ''  || this.room.room_title == ''  || this.roomcontactPersons.length == 0){
             this.$toasted.error(this.$t('entermissing'), { 
                     theme: "toasted-primary", 
                     position: "top-center", 
                     duration : 5000
                   })
        $('#addRoombutton').prop('disabled', false);
            return 0;
          }
          
      let roomformDatas = new FormData();
      room_file.forEach((file) => {
          if(room_file.length != 0){
            roomformDatas.append('file', file);
            roomformDatas.append('filename[]', file.name);
          }
        });
              roomformDatas.append('userId', this.c_user._id);
              roomformDatas.append('roomData', JSON.stringify(this.room));
              roomformDatas.append('scheduleTypeName', this.roomtype);
              roomformDatas.append('scheduledDaysList', JSON.stringify(this.roomweek));
              roomformDatas.append('scheduleStartTime', this.room.room_time);
              roomformDatas.append('scheduleStartDate', this.room.room_date);
              // roomformDatas.append('scheduleTypeName', JSON.stringify(this.room));
              roomformDatas.append('roomFriends', JSON.stringify(this.roomcontactPersons));
              roomformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03');
           
             let config = {
                header: {
                  'Content-Type': 'multipart/form-data'
                }
              }

          if(this.editroomId){
                   
            // var members = this.invitePerson.split(",");
            var post={};
            
                  post = this.roomsData.filter((obj) => {
                  return this.editroomId === obj._id;
                }).pop();
                post.room_title = this.room.room_title;
                post.room_topic= this.room.room_topic;
                post.room_timezone= this.room.room_timezone;
                post.room_password= this.room.room_password;
                post.room_id= this.room.room_id;
                post.scheduledDaysList= JSON.stringify(this.roomweek);
                post.scheduleStartTime= this.room.room_time;
                post.scheduleStartDate= this.room.room_date;
                post.scheduleTypeName= this.roomtype;
                roomformDatas.append('_id', this.editroomId);
                    this.isLoading = true;
               axios.post('/updateRoom', roomformDatas, config).then((response) => {
                      post.room_file= response.data.room_file;
                      this.$socket.emit('updateroom', response.data);
                        this.isLoading = false;
                         this.$toasted.success('Update Successfully', {
					        theme: "toasted-primary",
					        position: "top-center",
					        duration: 2000
					      })
                        $('#addRoommodal').modal('hide');
                         $('#addRoombutton').prop('disabled', false);
                        $('#roomfile').empty();
                        this.editroomId='';
                      }, function(err) {
                        console.log('err', err);
                      })
                      
          }
          else{

              this.isLoading = true;
               axios.post('/createRoom', roomformDatas, config).then((response) => {
                    
                        console.log(response.data);
                        this.getAllRooms(0);
                        const newRoom={
                        roomData:response.data,
                        roomMembers:this.roomcontactPersons
                          };
                         this.$socket.emit('createroom', newRoom);
                        this.isLoading = false;
                        $('#addRoommodal').modal('hide');
                         $('#roomfile').empty();
                    $('#addRoombutton').prop('disabled', false);
                }, function(err) {
                  console.log('err', err);
            
                })
               }
            
    },  

  removeRoomfile(fileId)
	{
      axios.post('/removeRoomDocument', {'_id':this.singleRoom._id,'fileId':fileId, 'projectId':'5d4c07fb030f5d0600bf5c03',
           }).then((response) => {
                console.log(response);
                this.roomfile= response.data.room_file;

             let post = this.roomsData.filter((obj) => {
                  return response.data._id === obj._id;
                }).pop();
            
                post.room_file=response.data.room_file;

                }, function(err) {
                  console.log('err', err);
               
                })
	},
 addRoomFile(){
    
     let room_file =  this.$refs.roomFile.files;
  
      let roomformDatas = new FormData();
       room_file.forEach((file) => {
          if(room_file.length != 0){
            roomformDatas.append('file', file);
            roomformDatas.append('fileName[]', file.name);
          }
         });
              roomformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03');
           
             let config = {
                header: {
                  'Content-Type': 'multipart/form-data'
                }
              }

         
                   
            // var members = this.invitePerson.split(",");
            var post={};
            
                  post = this.roomsData.filter((obj) => {
                  return this.singleRoom._id === obj._id;
                }).pop();
           
                roomformDatas.append('_id', this.singleRoom._id);
                    this.isLoading = true;
               axios.post('/uploadRoomDocument', roomformDatas, config).then((response) => {
                      post.room_file= response.data.room_file;
                     
                         this.$toasted.success('Update Successfully', {
                          theme: "toasted-primary",
                          position: "top-center",
                          duration: 2000
                        })
                        
                      }, function(err) {
                        console.log('err', err);
                      })
                      
          
          
    }, 
    openRoom(room,index){
      this.presentersRoom = false;
      console.log(room);
      this.roomWindow();
     $('#landRoom').hide();
     this.roommessage='';
     this.roomIndex=index;
      $('.meetingContentRow.active').removeClass('active');
       this.editroomId='';
      $('#'+room._id).addClass('active');
       if (screen.width < 650) {
       $('#startRoom').addClass('meetingDetailMB');

    }
      
      this.singleRoom=room;

this.membersCount=this.singleRoom.room_friends.length;
       axios.get('/getRoomChat/'+room._id+'/5d4c07fb030f5d0600bf5c03/')
        .then((responce) =>{
        	console.log(responce.data);
         this.roomsChat=responce.data;
         var container = this.$el.querySelector("#roomchating");
          $("#roomchating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
       }).catch((error) => console.log(error));
    
       this.membersCount=this.singleRoom.room_friends.length;
     $('#startRoom').show();

    },

  ScheduleMeeting(){
  	var room = this.singleRoom;
  this.room={
             
            room_time: room.scheduleStartTime,
            room_date: room.scheduleStartDate,
        }
           this.roomtype=room.scheduleTypeName;
          this.roomweek=room.scheduleWeekDays;
          // this.invitePersons=room.room_members;
          this.roomcontactPersons=room.room_friends;
          if(room.scheduleTypeName == 'daily'){
             $('#weekly-meeting').removeClass('active');
              $('#daily-meeting').addClass('active');
              $('#weeklyMeeting').removeClass('active show');
              $('#dailyMeeting').addClass('active show');

          }
          else if(room.scheduleTypeName == 'weekly'){

               $('#daily-meeting').removeClass('active');
               $('#weekly-meeting').addClass('active');
               $('#dailyMeeting').removeClass('active show');
               $('#weeklyMeeting').addClass('active show');
          }
          $('#schduleRoommodal').modal('show');
    },

     schduleRoom(){
   
             var post={};
            
                  post = this.roomsData.filter((obj) => {
                  return this.singleRoom._id === obj._id;
                }).pop();
                


     	  axios.post('/updateRoomSchedule', {'roomId':this.singleRoom._id,'scheduleTypeName':this.roomtype,'scheduledDaysList':JSON.stringify(this.roomweek),'scheduleStartTime':this.room.room_time,'scheduleStartDate':this.room.room_date,projectId: '5d4c07fb030f5d0600bf5c03'
       }).then((response) => {
       	console.log(response.data);

					var post={};
		                  post = this.roomsData.filter((obj) => {
		                  return response.data._id === obj._id;
		                }).pop();
                
                       post.scheduledDaysList=response.data.scheduleWeekDays;
		                post.scheduleStartTime= response.data.scheduleStartTime;
		                post.scheduleStartDate= response.data.scheduleStartDate;
		                post.scheduleTypeName= response.data.scheduleTypeName;
                      // this.$socket.emit('updateroom', response.data);
                        // this.isLoading = false;
                        console.log(post);
                        this.$toasted.success('Update Successfully', {
					        theme: "toasted-primary",
					        position: "top-center",
					        duration: 2000
					      })
                        this.singleRoom= response.data;
                        $('#schduleRoommodal').modal('hide');
                        this.editroomId='';
                      }, function(err) {
                        console.log('err', err);
                      })
     },

       createRoom(){
      $('#roomTitle').html(""+ this.$t('CreateRoom'));
      $('#addUpdateroom').html(`<i class="fa fa-plus" aria-hidden="true"></i><span style="color: white;"> ${ this.$t('CreateRoom') } </span>`);
      this.room={
        room_title:'',
        room_topic:'',
        room_time:'',
        room_date:'',
        room_timezone:'',
      }
      this.editroomId='';
      this.roomtype='daily';
      this.roomweek=[];
      this.room_Id();
      this.room_Password();
      this.roomcontactPersons=[];
      $('.showAddmeeting').show();
      $('.hideRemovemeeting').hide();
      
    },

 

    editRoom(room){
    var output = document.getElementById('roomfile');
    output.innerHTML = '';
       this.room={
        room_title:'',
        room_topic:'',
        room_time:'',
        room_date:'',
        room_timezone:'',
      }
      this.editroomId='';
      this.roomtype='';
      this.roomweek=[];
      $('#roomTitle').html(""+ this.$t('UpdateRoom'));
      $('#addUpdateroom').html(`<i class='fa fa-pencil-square-o' aria-hidden='true'></i><span style='color: white;'> ${ this.$t('UpdateRoom') } </span>`);
     this.editroomId=room._id;
    this.room={
              room_title: room.room_title,
            room_topic: room.room_topic,
            room_password: room.room_password,
            room_timezone: room.room_timezone,
            room_id: room.room_id,
            room_time: room.scheduleStartTime,
            room_date: room.scheduleStartDate,
        }
        this.roomfile= room.room_file;
           this.roomtype=room.scheduleTypeName;
          this.roomweek=room.scheduleWeekDays;
          // this.invitePersons=room.room_members;
          this.roomcontactPersons=room.room_friends;
          if(room.scheduleTypeName == 'daily'){
             $('#weekly-meeting').removeClass('active');
              $('#daily-meeting').addClass('active');
              $('#weeklyMeeting').removeClass('active show');
              $('#dailyMeeting').addClass('active show');

          }
          else if(room.scheduleTypeName == 'weekly'){

               $('#daily-meeting').removeClass('active');
               $('#weekly-meeting').addClass('active');
               $('#dailyMeeting').removeClass('active show');
               $('#weeklyMeeting').addClass('active show');
          }
        $('#addRoommodal').modal('show');
    },

  deleteRoom(room){
   
       this.$socket.emit('deleteroom', {index:this.roomIndex,roomId:room._id});
  axios.post('/deleteRoom', {
            _id: room._id,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
             this.roomNav();
           
           // this.$socket.emit('deleteroom',room._id);
          }, function(err) {
            console.log('err', err);
         
          })
  },

  leaveRoom(room){
       // this.$socket.emit('deleteroom', {index:this.roomIndex,roomId:room._id});
      axios.post('/leaveRoom', {
            _id: room._id,
            friendId:this.c_user._id,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
             this.roomNav();
           
           // this.$socket.emit('deleteroom',room._id);
          }, function(err) {
            console.log('err', err);
           
          })
        },
        addroomContactPersons(friends){
         
          this.roomcontactPersons.push(friends);
          this.roomcontactPersonsId.push(friends._id);
          this.roomcontactPersonsName.push(friends.name);
          $('#roomcontactadd' + friends._id).hide();
          $('#roomcontactRm' + friends._id).show();
        
     },

    removeroomContactPerson(userid,username,index){
      var indexOf=0;
           var exists = this.roomcontactPersons.some(function(field,index) {
            indexOf= index;
                    return field._id === userid
                  });
                  if (!exists) {
                    this.roomcontactPersons.splice(indexOf, 1);
                  }

           this.roomcontactPersons.splice(index, 1);
          this.roomcontactPersonsName.splice(index, 1);
          this.roomcontactPersonsId.splice(index, 1);
         $('#roomcontactRm' + userid).hide();
         $('#roomcontactadd' + userid).show();
       
    },

     roomchat: function(e) {

   
      this.ischatemojiActive = false;
      if (this.roommessage) {
        if (this.editroomChatid) {

          this.msgObj = {
            message: this.roommessage,
            chatid: this.editroomChatid
          };
         

          this.$socket.emit('updateroomchatmsg', this.msgObj)
          // this.removecross();
          axios.post('/updateGroupChat',{
            message: this.roommessage,
            _id: this.editroomChatid,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {

          }, function(err) {
            console.log('err', err);
          })

          this.roommessage = '';
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
            message: this.roommessage,
            bookmarkedChat: [],
            groupId: this.singleRoom._id,
            createdAt: new Date().toISOString(),
            chatType: 1,
            isGroup: 2,
            isDeleted: 0,
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
         
          this.roomsChat.push(this.msgObj);
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
            this.$socket.emit('roomsendid', response.data);
            this.$set(this.friendchat[this.friendchat.length - 1], '_id', data._id);

         var container2 = this.$el.querySelector("#roomchating");
          $("#roomchating").animate({ scrollTop: container2.scrollHeight + 8020 }, "fast");

          }, function(err) {
            console.log('err', err);
          
          })
          
         var container = this.$el.querySelector("#roomchating");
          $("#roomchating").animate({ scrollTop: container.scrollHeight + 8020 }, "fast");
        
          this.roommessage = '';
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
            groupId: this.singleRoom._id,
            receiverImage: '',
            bookmarkedChat:[],
            senderName: this.c_user.name,
            message: this.roommessage,
            projectId:'5d4c07fb030f5d0600bf5c03',
            createdAt: new Date().toISOString(),
          };
        
          //  this.isSeen = false;
          // this.roomsChat.push(this.msgObj);
          //this.friendCallchat.push(this.msgObj);
          this.$socket.emit('roomsendmsg', { msgData: this.msgObj
          })
         
          axios.post('/groupChat',this.msgObj).then(response => {
            this.$socket.emit('roomsendid', response.data)

          }, function(err) {
            console.log('err', err);
          })

          this.roommessage = '';
          var container = this.$el.querySelector("#roomchating");
          $("#roomchating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
   

          $('#roomsend-msg').addClass('disabled').attr("disabled", "disabled");

        }
      }
    },


    roomuploadfile(event) {
   
      let groupfilesdata = this.$refs.roomFiles.files;
      
      groupfilesdata.forEach((file) => {
        let groupformDatas = new FormData();
       let r = Math.random().toString(36).substring(7);
     
        groupformDatas.append('file', file, (r + file.name));
        groupformDatas.append('senderId', this.c_user._id);
        groupformDatas.append('senderName', this.c_user.name);
        groupformDatas.append('groupId', this.singleRoom._id);
        groupformDatas.append('bookmarkedChat', []);
        groupformDatas.append('isGroup', 2);
        groupformDatas.append('projectId', '5d4c07fb030f5d0600bf5c03')
     
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.isLoading = true;
        axios.post('/chatFilesShare', groupformDatas, config).then((response) => {
        
          this.groupmsgObj = {
            _id: response.data.data._id,
            chatType: 0,
            isGroup: 2,
            messageType: response.data.data.messageType,
            senderId: { _id: this.c_user._id, name: this.c_user.name },
            senderName: this.c_user.name,
            message: response.data.data.message,
            groupId: this.singleRoom._id,
            bookmarkedChat: [],
            isDeleted: 0,
            createdAt: new Date().toISOString(),
            projectId: '5d4c07fb030f5d0600bf5c03'
          };
        
          this.$socket.emit('roomsendmsg',{msgData:this.groupmsgObj});
          this.isLoading = false;
          var container = this.$el.querySelector("#roomchating");
          $("#roomchating").animate({ scrollTop: container.scrollHeight + 7020 }, "fast");
          
        }, function(err) {
          console.log('err', err);
        })
      })
    },

  joinRoom(event){
   if (!this.roomJoined){
     this.roomJoined = true;
    let selectedRoomData = {
       "projectId": "5d4c07fb030f5d0600bf5c03",
       "_id": this.singleRoom._id
    };

  this.$socket.emit('updateRoomCallStatus', selectedRoomData);

    axios.post('/updateRoomCallStatus', selectedRoomData).then((response) => {
        setTimeout(() => {
       // this.$router.push('/room?roomId='+this.singleRoom._id);
        // event.preventDefault();
        let routeData = this.$router.resolve({path: 'room', query: {roomId: this.singleRoom._id}});
        window.open(routeData.href, '_blank');
        this.roomJoined = false;
        }, 200);
    });
   }
  
  },



    eidtroomchat(id, message) {
      this.roommessage = message;
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
          this.roommessage = '';
          this.replyroomBox = true;
         
          this.$nextTick(function() {
            this.$refs.afterroomClick.focus();
          });
   
    },

    closeroomReplybox() {
      $('#singlemessage-input').css("height", "96px");
      this.replyroomBox = false;
    },

    bookmarked(bookchat,status){

        axios.post('/bookmarkMyChat', {
              chatId: bookchat._id,
              userId:this.c_user._id,
              bookmarkStatus: 1,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
           if(status == 'chat'){
                 this.userchat = this.friendchat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
               
                  this.userchat.bookmarkedChat.push(this.c_user._id);
              }else if(status == 'room'){
               this.usergrp = this.roomsChat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
               
                  this.usergrp.bookmarkedChat.push(this.c_user._id);
              }else{
                
               this.usergrp = this.groupchatdata.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                
                  this.usergrp.bookmarkedChat.push(this.c_user._id);
              
              }
          


          }, function(err) {
            console.log('err', err);
     
          })
    },

     removebookmarked(bookchat,status){
        axios.post('/bookmarkMyChat', {
              chatId: bookchat._id,
              userId:this.c_user._id,
              bookmarkStatus: 0,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)

              if(status == 'chat'){
                 this.userchat = this.friendchat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.userchat.bookmarkedChat = [];
              }else if(status == 'room'){
               this.usergrp = this.roomsChat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.usergrp.bookmarkedChat = [];
              }else{
               this.usergrp = this.groupchatdata.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.usergrp.bookmarkedChat = [];
              }
            
          


          }, function(err) {
            console.log('err', err);
          })
    },
    roomType(type){
    	this.roomtype=type;
    }, 

      readmsg(friend){
    const post = this.friendsdata.filter((obj) => {
		        return friend._id === obj._id;
		      }).pop();
		      if (post) {
		        post.usCount = 0;
		        // post.chatWithRefId= 0;
		      }
      },

      unreadmsg(friend){
		const post = this.friendsdata.filter((obj) => {
		        return friend._id === obj._id;
		      }).pop();
		      if (post) {
		        post.usCount = 1;
		        // post.chatWithRefId= 0;
		      }
      },

      wholepageclick(){
        this.singlefriend = {};
          this.$socket.emit('updateUserSelection', {
          selectedUser: '',
          userId: this.c_user._id
        });
      },
      fullScreen(){
        $('#fullscreen').hide();
        $('#smallscreen').show();
        $('#o2omodalcall').removeClass('o2omodelbefore');
        $('#o2omodalcall').addClass('o2omodelbeforefull');
      },

       smallScreen(){

        $('#smallscreen').hide();
        $('#fullscreen').show();
        $('#o2omodalcall').addClass('o2omodelbefore');
        $('#o2omodalcall').removeClass('o2omodelbeforefull');
      },

      /////////////////////// USER SETTING /////////////////////////

      blockUser(blockId,status,index){


             axios.post('/blockUser', {
              userId:  this.c_user._id,
              blockId : blockId,
              blockStatus : status,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
             if(status == 1){
              this.getfriends();
              this.usertab();
                 this.$toasted.success('User Block Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }
             else if(status == 0){
                this.getfriends();
                this.blockUsers.splice(index, 1);
                this.$toasted.success('User Unblock Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
              }
             console.log(response);

          }, function(err) {
            console.log('err', err);
          })
      },
      showblockUsers(){
          axios.get('/blockedUsers/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03')
        .then((responce) =>{
          console.log(responce.data);
         this.blockUsers=responce.data;
       }).catch((error) => console.log(error));
      },

      hideUser(hideId,status,index){

        
             axios.post('/hideUser', {
              userId:  this.c_user._id,
              hideUserId : hideId,
              hideStatus : status,
              hideType : 0,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
             if(status == 1){
                  this.getfriends();
                  this.usertab();
                  this.$toasted.success('User Hide Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }
             else if(status == 0){
                this.hideUsers.splice(index, 1);
                this.$toasted.success('User Show Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
                this.getfriends();
              }
             console.log(response);

          }, function(err) {
            console.log('err', err);
          })
      },
      showhideUsers(){
          axios.get('/hiddenUsers/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03')
        .then((responce) =>{
          console.log(responce.data);
         this.hideUsers=responce.data;
       }).catch((error) => console.log(error));
      },
      mobileUpdate(){

             axios.post('/updatePhone', {
              userId:  this.c_user._id,
              newPhone : this.Newmobile,
              oldPhone : this.exmobile,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
             if(response.data.status == 1){
                 this.$toasted.success('Mobile Update Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }else{
              this.$toasted.error('Current mobile number does not exist', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }
             console.log(response);

          }, function(err) {
            console.log('err', err);
          })
      },

      emailUpdate(){

             axios.post('/editEmail', {
              userId:  this.c_user._id,
              newEmail : this.Newemail,
              oldEmail : this.exemail,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
             if(response.data.status == 1){
                 this.$toasted.success('Check email and verify', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }else{
              this.$toasted.error('Current email does not exist', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }
             console.log(response);

          }, function(err) {
            console.log('err', err);
          })
      },
       paswordUpdate(){

             axios.post('/editPassword', {
              userId:  this.c_user._id,
              newPassword : this.Newpassword,
              oldPassword : this.expassword,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
             if(response.data.status == 1){
                 this.$toasted.success('Password Update Successfully', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
                 this.expassword='';
                 this.Newpassword= '';
                 this.confirmpassword='';
                 $('#cpass').hide();
             }else{
              this.$toasted.error('Current password is not exist', {
                  theme: "toasted-primary",
                  position: "top-center",
                  duration: 2000
                })
             }
             console.log(response);

          }, function(err) {
            console.log('err', err);
          })
      },
         UserIdUpdate(){
    
         // this.username=this.current_User.name;
         axios.post('/updateUserId',{userId: this.c_user._id, projectId: '5d4c07fb030f5d0600bf5c03',newUserId:this.$refs.UserId.value}).then(response => {
         console.log(response.data);
         // this.$refs.Username.value=response.data.name
         localStorage.setItem('userData', JSON.stringify(response.data));
         this.c_user = JSON.parse(localStorage.getItem('userData'));
         this.current_User = JSON.parse(localStorage.getItem('userData'));
         this.$toasted.success('User Id Update Successfully ', {
          theme: "toasted-primary",
          position: "top-center",
          duration: 3000
        })
        }, function(err) {
          console.log('err', err);
        
        })
  },
      setvideoCall(event){
 
      if(event.value == true){
          var read= 1;
      }else{
         var read= 0;
      }
       axios.post('/setVideoCallReceive', {'userId':this.c_user._id,'callStatus':read,projectId: '5d4c07fb030f5d0600bf5c03'
       }).then((response) => {
         this.$socket.emit('updatesetvideo',{'videoStatus':response.data.videoCallReceive,'userId':this.c_user._id});
         console.log(response);
              localStorage.setItem('userData', JSON.stringify(response.data));
              this.c_user = JSON.parse(localStorage.getItem('userData'));
                this.current_User = this.c_user;
            }, function(err) {
              console.log('err', err);
              alert('error');
            })
    },

   setaudioCall(event){
 
      if(event.value == true){
          var read= 1;
      }else{
         var read= 0;
      }
       axios.post('/setVoiceCallReceive', {'userId':this.c_user._id,'callStatus':read,projectId: '5d4c07fb030f5d0600bf5c03'
       }).then((response) => {
         this.$socket.emit('updatesetaudio',{'audioStatus':response.data.voiceCallReceive,'userId':this.c_user._id});
         console.log(response);
              localStorage.setItem('userData', JSON.stringify(response.data));
              this.c_user = JSON.parse(localStorage.getItem('userData'));
                this.current_User = this.c_user;
            }, function(err) {
              console.log('err', err);
              alert('error');
            })
    },
     addNote(){
     
      var noteformDatas = {
          'note_title':this.note.noteTitle,
          'note_topic':this.note.noteTopic,
          'userId':this.c_user._id,
          'note_date':this.note.noteDate,
          'note_category':this.note.noteCategory,
          'projectId':'5d4c07fb030f5d0600bf5c03',
      } 

      var noteForm = {
        'noteData':noteformDatas,
        'note_members':JSON.stringify(this.notecontactPersons),
        'id':this.editnoteId,
      }

             let config = {
                header: {
                  'Content-Type': 'multipart/form-data'
                }
              }

          if(this.editnoteId){
                   
            // var members = this.invitePerson.split(",");
            var post={};
            
                  post = this.noteData.filter((obj) => {
                  return this.editnoteId === obj._id;
                }).pop();
                post.note_title = this.note.noteTitle;
                post.note_topic= this.note.noteTopic;
                post.note_category= this.note.noteCategory;
                post.note_date= this.note.noteDate;
                // noteformDatas.append('_id', this.editnoteId);
                // Object.assign(noteformDatas, {_id: this.editnoteId});
                    this.isLoading = true;
               axios.post('/updateNote', noteForm, config).then((response) => {
                      
                        this.isLoading = false;
                         this.$toasted.success('Update Successfully', {
                          theme: "toasted-primary",
                          position: "top-center",
                          duration: 2000
                        })
                        $('#addNotemodal').modal('hide');
                        this.editroomId='';
                      }, function(err) {
                        console.log('err', err);
                      })
                      
          }
          else{

              this.isLoading = true;
               axios.post('/createNote', noteForm, config).then((response) => {
                    
                        this.noteData.push(response.data);
                        this.isLoading = false;
                        $('#addNotemodal').modal('hide');
                    
                }, function(err) {
                  console.log('err', err);
            
                })
               }
            
    }, 

  // showNote(note){
  //     console.log(note);
  //     this.singleNote=note;
  //     $('#showNotemodal').modal('show');
  //   },
  createNote(){
    $('#noteTitle').html('Add Note');
      $('#addUpdatenote').html('<i class="fa fa-plus" aria-hidden="true"></i><span style="color: white;"> Add Note </span>');
      this.singleNote='';
      this.editnoteId='';
 this.note = {
          noteTitle:'',
          noteTopic:'',
          noteDate:'',
          noteCategory:'',
      }
      this.notecontactPersons=[];
      $('#addNotemodal').modal('show');
  },

    editNote(note){
      console.log(note);
      this.singleNote=note;
      $('#noteTitle').html('Update Note');
      $('#addUpdatenote').html('<i class="fa fa-plus" aria-hidden="true"></i><span style="color: white;"> Update Note </span>');
      this.editnoteId=note._id;
    this.note = {
          noteTitle:note.note_title,
          noteTopic:note.note_topic,
          noteDate:note.note_date,
          noteCategory:note.note_category,
      }
         this.notecontactPersons=note.note_members;
      $('#addNotemodal').modal('show');
    },

    deleteNote(){
         axios.post('/deleteNote', {'id':this.editnoteId,'projectId':'5d4c07fb030f5d0600bf5c03'}).then((response) => {
                    // this.noteData.push(response.data);
                    this.isLoading = false;
                    this.getNotes();
                    $('#addNotemodal').modal('hide');
                    
                }, function(err) {
                  console.log('err', err);
            
                })
    },

    getNotes(){

          axios.get('/getAllNotes/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/0')
                  .then((responce) =>{
                    console.log(responce.data);
                   this.noteData = responce.data;
                   console.log(this.noteData);
                 }).catch((error) => console.log(error));
        },

         designNote(){

            axios.get('/getAllNotes/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/1')
                    .then((responce) =>{
                      console.log(responce.data);
                     this.designNotes = responce.data;
                     console.log(this.noteData);
                   }).catch((error) => console.log(error));
                },

         generalNote(){

            axios.get('/getAllNotes/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/2')
                    .then((responce) =>{
                      console.log(responce.data);
                     this.generalNotes = responce.data;
                     console.log(this.noteData);
                   }).catch((error) => console.log(error));
        },

         projectsNote(){

            axios.get('/getAllNotes/'+this.c_user._id+'/5d4c07fb030f5d0600bf5c03/3')
                    .then((responce) =>{
                      console.log(responce.data);
                     this.projectsNotes = responce.data;
                     console.log(this.noteData);
                   }).catch((error) => console.log(error));
                },

        deactivateAccount(){
         axios.post('/deactivateAccount', {'userId':this.c_user._id,'projectId':'5d4c07fb030f5d0600bf5c03'}).then((response) => {
                  
                    this.logout();
                }, function(err) {
                  console.log('err', err);
            
                })
    },

        deleteAccount(){
         axios.post('/deleteUser', {'userId':this.c_user._id,'projectId':'5d4c07fb030f5d0600bf5c03'}).then((response) => {
                  
                    this.logout();
                }, function(err) {
                  console.log('err', err);
            
                })
    },
    showsetting(){
     $('#showsetting').toggle();
    },

 markChat(){
   $('#bookmarkshow').toggle();
    axios.get('/getMyBookmarkChats/'+this.c_user._id+'/'
      +this.singlefriend._id+'/5d4c07fb030f5d0600bf5c03')
        .then((responce) => {
        console.log(responce.data);
          this.bookmarkChat=responce.data;
        })
        .catch((error) => console.log(error));
      
    },


  removebookmarkedlist(bookchat,status,index){
        axios.post('/bookmarkMyChat', {
              chatId: bookchat._id,
              userId:this.c_user._id,
              bookmarkStatus: 0,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            //this.$socket.emit('sendid', response.data)
          this.bookmarkChat.splice(index, 1);
              if(status == 'chat'){
                 this.userchat = this.friendchat.filter((obj) => {
                    return bookchat._id === obj._id;
                  }).pop();
                  this.userchat.bookmarked = 0;
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

    clearo2oHistory(){
    	 axios.post('/clearOne2oneHistory', {
              callId: this.callID,
              userId: this.c_user._id,
              projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            this.callHistories=[];
         
          }, function(err) {
            console.log('err', err);
          })

    },

    showNotification(){
              this.presentersNoti = false;
    		  axios.post('/notificationsList', {
              userId: this.c_user._id,
              projectId: '5d4c07fb030f5d0600bf5c03'
		          }).then(response => {
		            console.log(response.data);
		            this.notificationsList = response.data;
		         
		          }, function(err) {
		            console.log('err', err);
		          })
    },
    removeNotification(noti,index){
    	
    	this.notificationsList.splice(index, 1);
        axios.post('/deleteNotification', {
          notifyId: noti._id,
          projectId: '5d4c07fb030f5d0600bf5c03'
	          }).then(response => {
	            console.log(response.data);
	       	          }, function(err) {
	            console.log('err', err);
	          })
    },

    chatSearch(){

       axios.post('/searchChat', {
            searchText: this.msgsearch,
            userId: this.c_user._id,
            friendId: this.singlefriend._id,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            console.log(response.data);
            this.searchchat = response.data;
          }, function(err) {
            console.log('err', err);
          });

    },

	searchClose(){
     this.msgsearch = '';
	},

	groupchatSearch(){

       axios.post('/searchGroupChat', {
            searchText: this.groupmsgsearch,
            senderId: this.c_user._id,
            groupId: this.singlegroup._id,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            console.log(response.data);
            this.groupsearchchat = response.data;
          }, function(err) {
            console.log('err', err);
          });

    },

	groupsearchClose(){
     this.groupmsgsearch = '';
	},

   loginstatus(status) {

      axios.post('/setOnlineStatus', {
            onlineStatus : status,
            userId: this.c_user._id,
            projectId: '5d4c07fb030f5d0600bf5c03'
          }).then(response => {
            console.log(response.data);
            
          }, function(err) {
            console.log('err', err);
          });

    },

    meetingFileName(){

console.log("meetingFileName");
       let meeting_file =  this.$refs.meeting_file;
    var output = document.getElementById('meetingfile');
    var children = "";
    for (var i = 0; i < meeting_file.files.length; ++i) {
        children += '<li>' + meeting_file.files.item(i).name + '</li>';
    }
    // this.meetingfile=children;
    output.innerHTML = '<ul>'+children+'</ul>';
    
    // $("label[for='file_default']").text('Selected File: ');
      //  this.$refs.meeting_file.value = "";
      //  this.$refs.meetingFile.files = null;
    },

    roomFileName(){

  
       let meeting_file =  this.$refs.room_files;
    var output = document.getElementById('roomfile');
    var children = "";
    for (var i = 0; i < meeting_file.files.length; ++i) {
        children += '<li>' + meeting_file.files.item(i).name + '</li>';
    }
    // this.meetingfile=children;
    output.innerHTML = '<ul>'+children+'</ul>';
    
    // $("label[for='file_default']").text('Selected File: ');
 
    },

  },

  mounted() {
    this.roomJoined = false;
    this.c_user = JSON.parse(localStorage.getItem('userData'));
   // console.log(this.c_user);

     axios.get('/updateLang/'+ this.c_user._id+ '/5d4c07fb030f5d0600bf5c03').then(response => {
            console.log(response);
            this.$i18n.locale = response.data.languageCode;
            this.selected_language = response.data.languageCode;
          }, function(err) {
            console.log('err', err);
          });

  

    this.current_User = this.c_user;
    this.userImageName=JSON.parse(localStorage.getItem('c_user_image'));
    var dd = '';
    this.updateCallStatus(dd);
    localStorage.setItem('tokenData', this.c_user._id);
    this.hostname = this.$hostname;
    this.getfriends();
    this.getUpcommingMeetings();
    this.getAllRooms(0);
    this.getgroupsfirst();
      if (screen.width < 650) {
      $('.main-nav').removeClass('on');
      $('.main-nav').addClass('off');
    }
    this.loginstatus(1);
    this.username=this.current_User.name;
    this.UserId=this.current_User.userId;
    var meeting=this.$route.query.meeting;
    if(meeting){
      this.meetingNav();
    }

    var room=this.$route.query.room;
    if(room){
      this.roomNav();
    }
    // this.getMytodo();
    // this.getTodo();
    
    this.emptyChatWithId();
  
    $('.new-tag').attr("type", "hidden");
    ////////////////Chat dropzone //////////////////////

    document.addEventListener('dragenter', function(e) {

    if (e.target.className == 'message-input' || e.target.className == 'contact-chat' || e.target.className == 'chat-main' || e.target.className == 'contact-details' || e.target.className == 'chat-box' || e.target.className == 'details' || e.target.className == 'wrap emojis-main' || e.target.className == 'setemoj' || e.target.className == ' messages custom-scroll active messageschat' || e.target.className == 'messages custom-scroll messageschat active') {
        $("#dropzone").css("display", "block");
      }
      else {
        $("#dropzone").css("display", "none");
      }

    });

    //////////////// Group chat dropzone //////////////////////

    document.addEventListener('dragenter', function(e) {
     if (e.target.className == 'message-input' || e.target.className == 'wrap emojis-main' || e.target.className == 'setemoj' || e.target.className == 'messages custom-scroll group_chat_open active') {
        $("#groupdropzone").css("display", "block");
      }
      else {
        $("#groupdropzone").css("display", "none");
      }
    });

    this.broadcastHtml = document.getElementById('broadCastVideo');

    $(".bg-top").parent().addClass('b-top');
    $(".bg-bottom").parent().addClass('b-bottom');
    $(".bg-center").parent().addClass('b-center');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $('.bg-img').each(function() {
      var el = $(this),
        src = el.attr('src'),
        parent = el.parent();
      parent.css({
        'background-image': 'url(' + src + ')',
        'background-size': 'cover',
        'background-position': 'center',
        'display': 'block'
      });
      el.hide();
    });


  $('.sidebar-top li').click(function(e) {

    $('.sidebar-top li.active').removeClass('active');

    var $parent = $(this).parent();
    $(this).addClass('active');
    e.preventDefault();
  });

  // $('.meetingContentRow').click(function(e) {

  //   $('.meetingContentRow.active').removeClass('active');

  //   var $parent = $(this).parent();
  //   $(this).addClass('active');
  //   e.preventDefault();
  // });

  $('.roomContentRow').click(function(e) {

    $('.roomContentRow.active').removeClass('active');

    var $parent = $(this).parent();
    $(this).addClass('active');
    e.preventDefault();
  });

    /*=====================
          04. Chitchat Loder js
          ==========================*/
    $('.chitchat-loader').slideUp('slow', function() {
      $(this).remove();
    });

    /*=====================
          05. Search js
          ==========================*/
    $('.search').on('click', function(e) {
      $(this).siblings().toggleClass("open");
    });
    $('.close-search').on('click', function(e) {
      $(this).parent().parent().removeClass("open");
    });
    $('.search-right').on('click', function(e) {
      $(this).parent().parent().parent().parent().parent().parent().find(".form-inline").toggleClass("open");
    });
    $('.close-search').on('click', function(e) {
      $(this).parent().parent().removeClass("open");
    });

    /*=====================
          06. Mute js
          ==========================*/
    $('.mute').on('click', function(e) {
      $(this).children().toggleClass("off");
    });

    /*=====================
          07. Button Effect js
          ==========================*/
    $('.button-effect').on('click', function(e) {
      e.preventDefault();
      var self = $(this),
        wave = '.effect-wave',
        btnWidth = self.outerWidth(),
        x = e.offsetX,
        y = e.offsetY;
      self.prepend('<span class="effect-wave"></span>')
      $(wave)
        .css({
          'top': y,
          'left': x
        })
        .animate({
          opacity: '0',
          width: btnWidth * 2,
          height: btnWidth * 2
        }, 500, function() {
          self.find(wave).remove()
        })
    })

    /*=====================
          08. Collapse Title js
          ==========================*/
    $('.block-title').on('click', function(e) {
      e.preventDefault;
      var speed = 300;
      var thisItem = $(this).parent(),
        nextLevel = $(this).next('p').next('.block-content');
      if (thisItem.hasClass('open')) {
        thisItem.removeClass('open');
        nextLevel.slideUp(speed);
      } else {
        thisItem.addClass('open');
        nextLevel.slideDown(speed);
      }
    });

    /*=====================
          09. Refresh Request information next & previous button
          ==========================*/
    $('.refresh').on('click', function(e) {
      $(this).toggleClass('refreshed');
    });
    $('.req-info').on('click', function(e) {
      $(this).addClass('disabled');
    });
    $('.next').on('click', function(e) {
      $(this).parent().parent().siblings().addClass('open');
    });
    $('.previous').on('click', function(e) {
      $(this).parent().parent().parent().removeClass('open');
    });

    $('.chat-cont-toggle').on('click', function(e) {
        $('#chattoggle').hide();
        $('#chattoggleclose').show();
      $('.chat-cont-setting ').addClass('open');
      e.stopPropagation();
    });
     $('.chat-cont-close').on('click', function(e) {
        $('#chattoggleclose').hide();
        $('#chattoggle').show();
      $('.chat-cont-setting ').removeClass('open');
      e.stopPropagation();
    });

    $(document).on('click', '.userRead', function (event) {
     	event.stopPropagation();
        event.stopImmediatePropagation();
        // alert('dsada');
        $(this).next('.read-cont-setting').toggleClass('open');
      
    });

$('.userStatus').on('click', function(e) {

      $('.status-cont-setting ').toggleClass('open');
      e.stopPropagation();
    });



    $('body').on('click', function(e) {
      $('.chat-cont-setting').removeClass('open');
      $('.read-cont-setting').removeClass('open');
      $('.status-cont-setting').removeClass('open');
      $('#chattoggleclose').hide();
        $('#chattoggle').show();


    });




    /*=====================
          10 .Full Screen
          ==========================*/

    $('.toggle-full-screen').on('click', function(e) {
      $('#videocall').toggleClass("active");
    })

    /*=====================
          11.Header fix
          ==========================*/
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 60) {
        $(".landing-header").addClass("fixed");
      } else {
        $(".landing-header").removeClass("fixed");
      }
    });
    /*=====================
      12.Tap on Top
      ==========================*/
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 600) {
        $('.tap-top').fadeIn();
      } else {
        $('.tap-top').fadeOut();
      }
    });
    $('.tap-top').on('click', function() {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });





    /*=====================
    14 footer responsive js
    ==========================*/
    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '768') {
      jQuery('.footer-title h3').append('<span class="according-menu"></span>');
      jQuery('.footer-title').on('click', function() {
        jQuery('.footer-title').removeClass('active');
        jQuery('.footer-contant').slideUp('normal');
        if (jQuery(this).next().is(':hidden') == true) {
          jQuery(this).addClass('active');
          jQuery(this).next().slideDown('normal');
        }
      });
      jQuery('.footer-contant').hide();
    } else {
      jQuery('.footer-contant').show();
    }
    /*=====================
        15. Pin box
        ==========================*/
    $('.ti-pin2').on('click', function() {
      $(this).parent().parent().parent().toggleClass('pined');
    });

    /*=====================
        16 Reminder
        ==========================*/
    $(".reminder-count li").on('click', function() {
      $('.reminder-count li').removeClass('active');
      $(this).addClass('active');
    });

    $('.Show-reminder').on('click', function(e) {
      $('.target-reminder-list').show(500);
      $('.Show-reminder').hide(0);
      $('.Hide-reminder').show(0);
    });
    $('.Hide-reminder').on('click', function(e) {
      $('.target-reminder-list').hide(500);
      $('.Show-reminder').show(0);
      $('.Hide-reminder').hide(0);
    });
    $('.toggle').on('click', function(e) {
      $('.target-reminder-list').toggle('slow');
    });

    /*=====================
        17 set wallpaper onclick
        ==========================*/
    $('.wallpaper li.bg-color').on('click', function() {
      var color = $(this).css('background-image');
      $(".wallpaper li").removeClass('active');
      $(this).addClass("active");
      $(".chitchat-main .messages").css({
        'background-image': color,
        'background-blend-mode': 'unset',
      });
    });
    $('.wallpaper li.bg-size').on('click', function() {
      var color = $(this).children(".bg-img").attr('src');
      $(".wallpaper li").removeClass('active');
      $(this).addClass("active");
      $(".chitchat-main .messages").css({
        'background-image': 'url(' + color + ')',
        'background-color': 'transparent'
      });
    });

    /*=====================
        18 custom tab
        ==========================*/
    $(".contact-log-main li , .call-log-main li").on('click', function() {
      $(this).parent().find("li").removeClass("active");
      $(this).addClass("active");
    });
    $("#myTab1 li a").on('click', function() {
      var active_class = $(this).attr("data-to");
      $('.messages.custom-scroll').removeClass("active");
      $('#' + active_class).addClass("active");
    });
    $(".chat-tabs .nav-tabs li[data-to]").on('click', function() {
      $('.chitchat-main .tabto').removeClass("active");
      var active_class = $(this).attr("data-to");
      $('.' + active_class).addClass("active");
    });



    /*=====================
      22. toggle classes
      ==========================*/
    $('.mobile-sidebar').on('click', function() {
      $('.chitchat-container').toggleClass("mobile-menu");
    });

    $('.group-main .group-box').on('click', function() {
      $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.call-log-main .call-box').on('click', function() {
      $('.chitchat-container').toggleClass("mobile-menu");
    });
    $('.contact-log-main .contact-box').on('click', function() {
      $('.chitchat-container').toggleClass("mobile-menu");
    });

    $('.mobile-back').on('click', function() {
      $('.chitchat-container').toggleClass("mobile-menu");
      $('.main-nav').removeClass("on");
    });


    $('.chat-friend-toggle').on('click', function() {
      $('.chat-frind-content').toggle();
    });
    $('.call-option-toggle').on('click', function() {
      $('.call-option-content').toggle();
    });

    $('.calloption-close').on('click', function() {
      $('.call-option-content').css('display', 'none');
    });
    $('.gr-chat-friend-toggle').on('click', function() {
      $('.gr-chat-frind-content').toggle();
    });

    $('.msg-setting').on('click', function() {
      $(this).siblings('.msg-dropdown').toggle();
    });
    $(".favourite").on('click', function() {
      $(this).toggleClass("btn-outline-primary").toggleClass("btn-primary");
    });
    $(".edit-btn").on('click', function() {
      $(this).parent().parent().toggleClass("open");
    });

    /*=====================
        23. ADD tO-DO LIST
        ==========================*/

    $('.add').on('click', function(e) {
      var total_element = $(".element").length;
      var lastid = $(".element:last").attr("id");
      var split_id = lastid.split("_");
      var nextindex = Number(split_id[1]) + 1;
      var max = 100;
      if (total_element < max) {
        $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
        $("#div_" + nextindex).append("<form class='p-15'><div class='form-group' style='display :flex'><input type='checkbox' id='txt_" + nextindex + "'/><input type='text' class='m-l-15'/></div><div class='todo-buttons'><a class='badge badge-success font_label' href='#'' style='padding: 7px 12px'>{{ $t('Save') }}</a><a class='badge badge-outline-primary font_label' href='#'' style='margin-left : 15px;padding: 7px 12px'>{{ $t('Cancel') }}</a><span id='remove_" + nextindex + "' class='remove' style='margin-left : 40px'><i class='fa fa-trash' style='font-size : 20px'></i></span></div></form>");
      }
    });
    $('.todo-list').on('click', '.remove', function() {
      var id = this.id;
      var split_id = id.split("_");
      var deleteindex = split_id[1];
      $("#div_" + deleteindex).remove();
    });

    $('.trashbtn').on('click', function(e) {
      $(".todo-main-content .default-form").remove();
    });

    /*=====================
            24. right sidebar
            ==========================*/


    $('.apps-toggle').on('click', function() {
      if (!$('body').hasClass('sidebar-active main-page menu-active'))
        $('body').toggleClass('sidebar-active main-page');
      $('body').removeClass('menu-active');
      $('.app-sidebar').toggleClass('active');
      $('.chitchat-main').toggleClass("small-sidebar");
    });



    /*=====================
            27. profile open close
            ==========================*/
    $('.menu-trigger, .close-profile').on('click', function(e) {
      $('body').toggleClass('menu-active'); //add class
      $('.app-sidebar').toggleClass('active'); //remove
      $('.chitchat-main').toggleClass("small-sidebar"); //remove
      if ($(window).width() <= 1440) {
        $('.chitchat-container').toggleClass('sidebar-overlap');
        $('.chitchat-main').addClass("small-sidebar"); //remove
      }
      if ($('body').hasClass('menu-active')) {
        $('body').addClass('sidebar-active main-page');
        $('.app-sidebar').removeClass('active');
        $('.chitchat-main').removeClass("small-sidebar");
      }

    });

     $('.closeprofile').on('click', function(e) {
      $('body').toggleClass('menu-active'); //add class
      $('.app-sidebar').toggleClass('active'); //remove
      $('.chitchat-main').toggleClass("small-sidebar"); //remove
      if ($(window).width() <= 1440) {
        $('.chitchat-container').toggleClass('sidebar-overlap');
        $('.chitchat-main').addClass("small-sidebar"); //remove
      }
      if ($('body').hasClass('menu-active')) {
        $('body').addClass('sidebar-active main-page');
        $('.app-sidebar').removeClass('active');
        $('.chitchat-main').removeClass("small-sidebar");
      }

    });
    /*=====================
            28. dropdown
            ==========================*/

    $('.dropdown').click(function() {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function() {
      $(this).removeClass('active');
      $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function() {
      $(this).parents('.dropdown').find('span').text($(this).text());
      $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });

    /*=====================
        29. Sidebar setting
        ==========================*/

    $(".sidebar-setting .two-column").on('click', function() {
      $(".sidebar-setting li").removeClass('active');
      $(this).addClass("active");
      $('.theme-title .icon-btn').removeClass("btn-outline-light").removeClass("btn-outline-primary");
      $('.main-nav').removeClass("on");
    });
    $(".sidebar-setting .three-column").on('click', function() {
      $(".sidebar-setting li").removeClass('active');
      $(this).addClass("active");
      $('.theme-title .icon-btn').addClass("btn-outline-light").addClass("btn-outline-primary");
      $('.main-nav').addClass("on");
    });

    /*=====================
        Chat 
        ==========================*/


    $(window).on('keydown', function(e) {
      if (e.which == 13) {
        if (!e.target.value) {
          return false
        }

        return false;
      }
    });

    $(".emojis-sub-contain ul li").click(function() {
      var number = $(this).html();
      $("#setemoj").focus().val(function() {
        return this.value + number + ' ';
        // $(".messages").animate({
        //   scrollTop: $(document).height()
        // }, "fast");
      });
      $('#send-msg').removeClass('disabled').removeAttr("disabled")
    });


    $('#send-msg').addClass('disabled').attr("disabled", "disabled")
    $("#setemoj").keyup(function(e) {
      if (!e.target.value) {
        $('#send-msg').addClass('disabled').attr("disabled", "disabled")
      } else {
        $('#send-msg').removeClass('disabled').removeAttr("disabled")
      }
    });



    $(".groupemojis-sub-contain ul li").click(function() {
      var number = $(this).html();
      $("#groupsetemoj").focus().val(function() {
        return this.value + number;
        $(".messages").animate({
          scrollTop: $(document).height()
        }, "fast");
      });
      $('#send-groupmsg').removeClass('disabled').removeAttr("disabled")
    });


    $('#send-groupmsg').addClass('disabled').attr("disabled", "disabled")
    $("#groupsetemoj").keyup(function(e) {
      if (!e.target.value) {
        $('#send-groupmsg').addClass('disabled').attr("disabled", "disabled")
      } else {
        $('#send-groupmsg').removeClass('disabled').removeAttr("disabled")
      }
    });



    /*=====================
        25. Sticker
        ==========================*/
    $('.sticker-contain ul li').on('click', function(e) {
      var sticker = $(this).children().html();
      $('<li class="replies"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url("../assets/images/contact/1.jpg"); background-size: cover; background-position: center center;"></div><div class="media-body"> <div class="contact-name"> <h5>Alan josheph</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5>' + sticker + '</h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
      $('.chat-main .active .details h6').html('<span>You : </span>' + sticker);
      var test = $(this).height();
      $(".messages").animate({

        scrollTop: $(document).height()
      }, "fast");
      $(".sticker-contain").removeClass("open");
      $(".toggle-sticker").removeClass("active");
    });

    // Toggle sticker
    $('.toggle-sticker').on('click', function() {
      $(this).toggleClass("active");
      $('.sticker-contain').toggleClass("open");
      $('.emojis-contain').removeClass("open");
      $(".toggle-emoji").removeClass("active");
      $('.contact-poll-content').css('display', 'none');
    });

    // Toggle emoji
    $('.toggle-emoji').on('click', function(e) {
      e.stopPropagation();
      $(this).toggleClass("active");
      $('.emojis-contain').toggleClass("open");
      $(".sticker-contain").removeClass("open");
      $(".toggle-sticker").removeClass("active");
      $('.contact-poll-content').css('display', 'none');
    });

    // Toggle poll
    $('.contact-poll').on('click', function(e) {
      $('.contact-poll-content').toggle();
      $('.emojis-contain').removeClass("open");
      $(".toggle-emoji, .toggle-sticker").removeClass("active");
    });

    // Outside click
    $(document).on('click', function(e) {
      var outside_space = $(".outside");
      if (!outside_space.is(e.target) &&
        outside_space.has(e.target).length === 0) {
        $(".sticker-contain").removeClass("open");
        $(".emojis-contain").removeClass("open");
        $(".toggle-emoji, .toggle-sticker").removeClass("active");
        $('.contact-poll-content').css('display', 'none');
        $('.chat-frind-content').css('display', 'none');
        //$('.call-option-content').css('display', 'none');
      }
    })

    $(".mode").on("click", function() {
      $('.mode i').toggleClass("fa-moon-o").toggleClass("fa-lightbulb-o");
      $('body').toggleClass("dark");
    });
    $(".mainnav").on("click", function() {
      $('.theme-title .icon-btn').toggleClass("btn-outline-light");
      $('.main-nav').toggleClass("on");
    });

    $(".close-apps").on("click", function() {
      $('.apps-ul li').removeClass("active");
      $('.chitchat-main').addClass("small-sidebar");
    });

    $(".close-app").on("click", function() {
      $('body').removeClass("sidebar-active");
      $('.app-sidebar').removeClass("active");
    });

    $(".close-panel").on("click", function() {
      $('.dynemic-sidebar, .button-effect.active, sidebar-top .sidebar-top > li > a').removeClass("active");
      $('.recent-default').addClass("active");
    });

    $("body").on("click", ".colors li", function() {
      $(this).addClass('active').siblings().removeClass('active');
      var $color = $(this).attr("data-attr");
      $("#color").attr("href", "../assets/css/" + $color + ".css");
      return false;
    });
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
.o2omodelbefore {
  max-width: 80% !important;
}
.o2omodelbeforefull {
  max-width: 100% !important;
}

#noteTitle{
	border: none;
    font-size: 17px;
    color:  #BAC5E9;
    font-family: Open sans-serif;
    font-weight: bold
}
#noteTitle::placeholder {
  color: #BAC5E9;
}


.dropzone {
  box-sizing: border-box;
  display: none;
  position: absolute;
  width: 99%;
  height: 105%;
  z-index: 99999;
  background: #80808066;
  border: 11px dashed #60a7dc;
}

.theme-tab .nav-tabs .nav-item .callnav-link.active {
    background-color: #dcdcdc!important;
    transition: all .3s ease;
}
.replybox {
  width: 63%;
  height: auto;
  background: rgb(224, 221, 221);
  margin-left: 121px;
  border-top-right-radius: 13px;
  border-top-left-radius: 13px;
  border-bottom: 2px solid #9c979747;
}

.activeemoji {
  z-index: 9999;
  position: absolute;
  bottom: 0px;
}

.activeChatemoji {
  z-index: 9999;
  position: absolute;
  bottom: 0px;
}
#roomstartchat .activeChatemoji {
  bottom: 42px;
}
.groupmembers {
  padding-top: 7px;
  padding-bottom: 7px;
}

img.emojione {

  margin: 0px !important;
  display: inline !important;

  height: auto;
  width: 50px;
}


@media screen and (max-width: 480px) {
  .replybox {
    width: 57%;
    height: auto;
    background: rgb(224, 221, 221);
    margin-left: 72px;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    border-bottom: 2px solid #9c979747;
  }
  .o2omodelbefore{
    max-width: 100%!important;
}
  .message-call {
  height: 59px !important;
  position: fixed;
  transition: all 0.5s;
  padding: 17px 8px;
  z-index: 9;
  width: 100% !important;
  bottom: 0px !important;
}
#o2osinglemessage-input{
    min-width: 97%!important;
    bottom: -19px!important;
}
#broadcast-input{
    min-width: 100%!important;
    bottom: -18px!important;
}
.modal-body {
    padding: 10px 0px !important;
}
.theme-tab.tab-sm.chat-tabs{
  margin-top: 63px !important;
}
.afteropenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 0% !important;
  float: left;
}
.o2oafteropenChat {
    width: 0% !important;
}
.groupafteropenChat{
     width: 0% !important;
}
#contents{
  width:100% !important;
}
#o2ocontents{
  width:100% !important;
}
#groupcontents  {
  width:100% !important;
}
.beforelocalVideo {
    width: 286px;
    height: 264px !important;
}
.message-call{
    height: 72px!important;
    position: fixed;
    transition: all .5s;
    padding: 22px 8px;
    z-index: 9;
    width: 98%!important;
    bottom: -32px!important;
}
.videocall.call-modal .small-image {
    width: 100px;
    height: 120px;
    bottom: 16%;
    display: block!important;
    left: 1px !important;
}
#videoOutput{
    -o-object-fit: initial;
    object-fit: cover !important;
    height: 341px !important;
    position: absolute;
    top: 11px;
    left: 0px;
}
  li.sent h5 {
    margin-left: 15px;
  }
  div#EmojiPicker {
    margin-bottom: 35px;
  }
  .media-left .profile span {
    width: 57px;
    background-color: #25b7e0;
    padding: 17px;
    border-radius: 23px;
    font-size: 14px;
    position: absolute;
    top: 75%;
    left: 75%;
    margin-right: -50%;
    text-transform: uppercase;
}
.joincall{
      background-color: #00BCD4 !important;
}

}
.chitchat-main .call-content .call-log-main, .chitchat-main .contact-content .call-log-main {
    height: calc(70vh - 30px);
    overflow: overlay;
    margin: 0 auto 15px;
    padding-right: 10px;
}

@media screen and (max-width: 767.98px) {
  .message-input {
    width: calc(100% - 200px);
  }
  #addRoommodal .modal-dialog {
    max-width: 100%;
  }
  #addRoommodal .default-form .row{
    margin: 0;
  }
  .room-tabs li{
    width: 32%;
  }
  .room-tabs li a{
    min-width: auto !important;
  }
}


@media screen and (max-width: 600px) {
.chitchat-main .message-input textarea {
    width: calc(100% - 145px) !important;
    border: 0;
    font-size: 16px;
    color: #647589;
    font-family: Montserrat,sans-serif;
    margin-right: 12px;
}
  .chitchat-container .chitchat-main .messages .media-right ul li:nth-child(1), .chitchat-container .chitchat-main .messages .media-right ul li:nth-child(2) {
     display: block !important; 
}
.chitchat-container .chitchat-main .messages .media-right ul li:first-child, .chitchat-container .chitchat-main .messages .media-right ul li:first-child {
    display: none !important;
}
.sidebar-toggle .main-nav:not(.on)~.chitchat-main.small-sidebar .messages .contact-details {
    width: calc(100vw - 30px);
}
.o2omessageschat .contact-details{
    padding: 8px 12px;
    background-color: #fff;
    box-shadow: 0 -55px 0 0 #f3f6ff;
    position: fixed;
    display:block !important; 
    width: calc(100vw - 26px) !important;
    z-index: 999;
    transition: all .9s;
    border-radius: 5px;
    top: 0px !important;
}
.o2omessageschat .contact-details .media-right{
  order:-1;
}
.o2omessageschat .contact-details .media-right ul li:first-child {
    display: none !important;
}

.groupmessageschat .contact-details{
    padding: 8px 12px;
    background-color: #fff;
    box-shadow: 0 -55px 0 0 #f3f6ff;
    position: fixed;
    display:block !important; 
    width: calc(100vw - 45px) !important;
    z-index: 999;
    transition: all .9s;
    border-radius: 5px;
    top: 0px !important;
}
.groupmessageschat .contact-details .media-right{
  order:-1;
}
.groupmessageschat .contact-details .media-right ul li:first-child {
    display: none !important;
}
.joincall{
      background-color: #00BCD4;
}


}

@media screen and (max-width: 992px) {
  .message-input {
    width: calc(100% - 215px);
  }
}

@media screen and (max-width: 1366px) {
  .message-input {
    width: calc(100% - 490px);
  }
}

@media screen and(max-width: 767.98px) {
  .message-input {
    width: calc(100% - 200px);
  }
}

@media screen and (max-width: 992px) {
  .message-input {
    width: calc(100% - 215px);
  }
}

@media screen and (max-width: 800px) {

  .message-input {
    width: 100vw;
    -webkit-animation: fadeInRight 300ms ease-in-out;
    animation: fadeInRight 300ms ease-in-out;
    transition: all 0.3s ease;
  }
}

@media screen and (max-width: 1024px) {
  .message-input {
    padding: 26px 20px;
  }
}

@media screen and (max-width: 1366px) {
  .message-input {
    padding: 26px 25px;
  }
  .chitchat-main #broadcast-input input {
    width: calc(100% - 90px);
  }
  .chitchat-main #o2osinglemessage-input input {
    width: calc(100% - 170px);
  }
}
#broadcast-input{
  width: 29.2%!important;
    bottom: -18px!important;
}

.message-call {
  height: 72px !important;
  position: fixed;
  transition: all 0.5s;
  padding: 22px 8px;
  z-index: 9;
  width: 30%;
  bottom: -24px !important;
}

.beforeopenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 100%;
  float: left;
}

.afteropenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 70%;
  float: left;
}

.modelafter {
 display: flex;
  align-items: center;
  justify-content: center;
  height: calc(99vh - 60px);
  max-width: 1150px !important;
}

.modelbefore {
  max-width: 850px !important;
}




/*020 video call*/

.o2obeforeopenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 100%;
  float: left;
}

.o2oafteropenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 70%;
  float: left;
}

.o2omodelafter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(99vh - 60px);
  max-width: 98% !important;
}



/*Group video call*/

.groupbeforeopenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 100%;
  float: left;
}

.groupafteropenChat {
  background-image: url(/img/videocall_bg.b320143d.jpg);
  background-size: cover;
  background-position: center center;
  display: block;
  width: 70%;
  float: left;
}

.groupmodelafter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(99vh - 60px);
  max-width: 1150px !important;
}

.groupmodelbefore {
  max-width: 80% !important;
}


.beforelocalVideo {
  width: 286px;
  height: 217px;
}

.afterlocalVideo {
  width: 227px;
  height: 176px;
}

.callChat {
  width: 30%;
  float: right;
}

.minimizeclass {
  border-radius: 100%;
  background-color: #eff1f2;
  padding: 9px;
  width: 35px;
  height: 36px;
}

#remoteScreenshare {
  object-fit: initial;
  width: 400px;
  height: 600px;
}

#videoOutput {
  object-fit: cover !important;
 height: calc(100vh - 30px);
}
#broadCastVideo {
  object-fit: initial;
  height: auto;
}

#brochatings{
  padding: 6px !important;
    height: calc(101vh - 95px) !important;
    min-height: calc(100vh - 95px) !important;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-blend-mode: overlay;
    top: 0;
    background-color: #f3f6ff;
}
.o2omessageschat .contact-details{
    padding: 8px 12px;
  display:none; 
}
.groupmessageschat .contact-details{
  display:none; 
}

ul {
    list-style-type: none;
    padding: 4px;
}


/* ********** Screenshare (Ammar) ******** */
 #videos-container {
            width: 100%;
        }

        #videos-container video {
            width: 100%;
        }
        input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>
