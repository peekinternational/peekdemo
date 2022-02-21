<template>
  <div>
    <div class="container-fluid" style="background-color: #F3F6FF; height: calc(119vh - 20vh);">
         <div class="row meetingRow" >
          <div class="col-">
            <div  class="profile" style="width: 56px;height: 56px;">
              <span> {{getFirstLetter(meedtingData.meeting_title)}}</span>
            </div>
          </div>
          <div class="col-5">
            <p>{{meedtingData.meeting_title}}</p>
            <p>{{isToday(meedtingData.meeting_date)}}</p>
          </div>
        <div class="col-6" style="flex: 1 0 50%;max-width: 62%;padding-right: 0px;"></div>
      </div>

      <div class="row">
        <div class="col" style="text-align:center">
           <img class="bg-img" src="../assets/images/meetingwait.png" style="width: 25%; padding-top: 66px;"  alt="Avatar" />
        </div>
      </div>

      <div class="row">
        <div class="col-3"></div>

        <div class="col" style="text-align:center;margin-top:15px">
           <h4 id="joinMeetingNow" style="font-weight: 600;padding-bottom: 10px; color: #222222;">{{$t ("MeetingNotStarted")}}</h4>
            <button v-if="buttonDisable"  class="btn addMeeting2" style="margin-top: 9px;" disabled >
           <span style="color: white;"> {{$t ("JoinNow")}} </span>
            </button>
            <button v-if="buttonEnable" @click="joinMeeting()" class="btn addMeeting2" style="margin-top: 9px;"  >
           <span style="color: white;">{{$t ("JoinNow")}} </span>
            </button>
        </div>
        <div class="col-3"></div>
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
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import moment from 'moment';


export default {
  name: 'JoinMeeting',
   components: {  },
           data() {
            return {
              meetingId:'',
              buttonDisable:true,
              buttonEnable:false,
              meedtingData:''
                
            }
        },
         beforeCreate: function () {
        // if (localStorage.getItem("userData")) {
        //   this.$router.push('/')
        // }
      },
      sockets: {
        connect: function() {
          console.log('socket connected successfully')
        },

        disconnect() {
          console.log('socket disconnected')
        },

        receiveStartMeeting(data) {
          console.log(data);
          if(this.meetingId == data.meetindId){
             this.buttonDisable= false;
             this.buttonEnable= true;
             // data.hoster
             $('#joinMeetingNow').html(""+ this.$t('HostMeetingStarted'));
          }
        },
  },

        watch:{},

        methods:{
            getFirstLetter(str){
                console.log(str);
                if(str){
                  var matchess = str.match(/\b(\w)/g); // ['J','S','O','N']
                var matches = matchess.slice(0, 2);
                var acronym = matches.join(''); // JSON

                return acronym;
                }
                
             },
              isToday(date) {
                  return moment(date).format('l');
              },
              joinMeeting(){
                  this.meetingId=this.$route.query.meetingId;
                  this.$router.push('/meeting?meetingId='+this.meetingId);
              },
            },
           mounted() {
           this.meetingId=this.$route.query.meetingId;
            axios.get('/getSingleMeeting/'+this.meetingId+'/5d4c07fb030f5d0600bf5c03')
                  .then((responce) => this.meedtingData = responce.data)
                  .catch((error) => console.log(error));
        }
}
    
  
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
</style>
