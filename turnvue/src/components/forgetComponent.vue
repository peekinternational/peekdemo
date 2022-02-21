<template>
  <div id="login">
     <div class="login-page1">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-12">
            <div class="login-contain-main">
              <div class="left-page">
                <div class="login-content" >
                  <div class="login-content-header" style="padding-bottom: 140px;"><img class="image-fluid" src="../assets/images/logo/logo_big.png" alt="images"></div>
                  <h5 style="margin: 2px;">{{ $t('ForgotPassword') }}</h5>
                 <h5> {{this.errorMessage}} </h5>
                  <form v-on:submit="loginuser" class="form1">
                    <div class="form-group">
                      
                      <input class="form-control" name="email" v-model="email"  id="inputEmail3" type="email" placeholder="Email" required>
                    </div>
                  
                    <div class="form-group">
                      <div class="buttons">
                        <button type="submit" id="loginbtn" class="btn btn-primary button-effect">{{ $t('Submit') }}</button>
                        <router-link to="/login" class="btn button-effect btn-signup">{{ $t('Login') }}</router-link></div>
                    </div>
                  </form>
                
                </div>
              </div>
              <div class="right-page">
                <div class="right-login animat-rate">
                  <div class="animation-block">
                    <img
                      class="heart-logo"
                      src="../assets/images/login_signup/5.png"
                      alt="login logo"
                    /><img
                      class="has-logo"
                      src="../assets/images/login_signup/4.png"
                      alt="login logo"
                    /><img
                      class="login-img"
                      src="../assets/images/login_signup/1.png"
                      alt="login logo"
                    /><img
                      class="boy-logo"
                      src="../assets/images/login_signup/6.png"
                      alt="login boy logo"
                    /><img
                      class="girl-logo"
                      src="../assets/images/login_signup/7.png"
                      alt="girllogo"
                    />
                  </div>
                </div>
              </div>
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
import Toasted from 'vue-toasted';
// import { ApiService } from '../services/api.service'


export default {
  name: 'Forget',
   components: {  },
      props:[],
           data() {
            return {
                email: '',
                errorMessage: ''
            }
        },
         beforeCreate: function () {
        if (localStorage.getItem("userData")) {
          this.$router.push('/')
        }
      },

        watch:{
    
                },

        methods:{

             loginuser: function (event) {
              event.preventDefault();

                axios.post('/forgotPassword', {
                  email: this.email,
                  projectId: "5d4c07fb030f5d0600bf5c03"
                }).then(response => {

                console.log(response.data);
				
				
				
                  // if (response.data != null ) {
                    if(response.data.status == 1){
                      this.$toasted.success(  ' Email sent successfully!!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })

                    }else if(response.data.status == 0){
                      this.$toasted.error(  'Email does not exists !!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })

                    }else{
 
                    this.$toasted.error(  'email does not exists !!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })
                    }

                  // }else{
                    
                  //   this.$toasted.error(  'Wrong username and password !!', { 
                  //    theme: "toasted-primary", 
                  //    position: "top-left", 
                  //    duration : 5000
                  //  })

                  // }
                }, function (err) {
                  console.log('err', err);
                  //alert(err.body);
                })
              }
 

        },
        mounted() {
        	
    

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
