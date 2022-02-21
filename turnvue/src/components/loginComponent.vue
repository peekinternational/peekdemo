<template>
  <div id="login">
     <div class="login-page1">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-12">
            <div class="login-contain-main">
              <div class="left-page">
                <div class="login-content">
                  <div class="login-content-header"><img class="image-fluid" src="../assets/Chatto_Logo.png" alt="images"></div>
                   <h3 style="margin: 2px;">{{ $t("welcomeals") }}</h3>
                   <h4>{{$t("welcomeals2")}}</h4>
                 <h5> {{this.errorMessage}} </h5>
                  <form v-on:submit="loginuser" class="form1">
                    <div class="form-group">
                      <input class="form-control" name="username" v-model="input.username"  id="inputEmail3" type="text" :placeholder="$t('EmailAddress')" required>
                    </div>
                    <div class="form-group">
                      <span> </span>
                      <input class="form-control" name="password" v-model="input.password" id="inputPassword3" type="password" :placeholder="$t('Password')" required>
                    </div>
                    <div class="form-group">
                      <div class="rememberchk">
                        <div class="form-check">
                          <input class="form-check-input" id="gridCheck1" type="checkbox">

                          <label class="form-check-label" for="gridCheck1">Remember Me.</label>
                          <h6><router-link to="/forget" class="btn button-effect btn-signup">Forgot Password?</router-link></h6>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="buttons">
                        <button type="submit" id="loginbtn" class="btn btn-primary button-effect">{{ $t('Login') }}</button>
                        <router-link to="/signup" class="btn button-effect btn-signup">{{ $t('Signup') }}</router-link></div>
                    </div>
                  </form>
                
                  <div class="termscondition">
                    <h4 class="mb-0"><span>*</span> <router-link
                          to="/terms"
                          class="">{{ $t('Termsandcondition') }}</router-link
                        ><b>&amp;</b><router-link
                          to="/privacy"
                          class=""
                          >{{ $t('Privacypolicy') }}</router-link
                        ></h4>
                  </div>
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
  name: 'Login',
   components: {  },
      props:[],
           data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
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

                axios.post('/login', {
                  password: this.input.password,
                  name: this.input.username.toLowerCase().trim(),
                  projectId: "5d4c07fb030f5d0600bf5c03"
                }).then(response => {

                console.log(response.data);
				
				
				
                  if (response.data != null ) {
                    if(response.data.status == 0){
                      this.$toasted.error(  ' Email not verified!!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })

                    }else if(response.data.status == 3){

                        $('#loginbtn').addClass('disabled').attr('disabled',true);
                          this.$toasted.success( this.$t('Welcomeback'), { 
                         theme: "toasted-primary", 
                         position: "top-left", 
                         duration : 2000
                         })
                       //localStorage.setItem('c_user', JSON.stringify(response.data.user));
                       localStorage.setItem('userData', JSON.stringify(response.data.user));
                      //  localStorage.setItem('screenshareUserData', JSON.stringify(response.data.user));
                       localStorage.setItem('c_user_image', JSON.stringify(response.data.user.user_image));
                       localStorage.setItem('jwt', JSON.stringify(response.data.token));
                       
                     //  this.$session.start()
                     // // this.$session.set('c_user', response.data.user)
                     //  this.$session.set('c_user_image', response.data.user.user_image)
                      
                     //  this.$session.set('jwt', response.data.user.token)
                      Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.user.token
                      //this.$router.push('/')
            
                       window.location.href = '/';
                    }else{
 
                    this.$toasted.error(  'Wrong username and password !!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })
                    }

                  }else if(response.data.status == 2){

                    this.$toasted.error(  'Wrong username and password !!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })
                  }
                  else{
                    
                    this.$toasted.error(  'Wrong username and password !!', { 
                     theme: "toasted-primary", 
                     position: "top-left", 
                     duration : 5000
                   })

                  }
                }, function (err) {
                  console.log('err', err);
                  //alert(err.body);
                })
              }
 

        },
        mounted() {
        	if(this.$route.query.verifyid){
        		var verifyid=this.$route.query.verifyid;
        		axios.get('/projects/verify/'+verifyid)
                  .then((responce) => { 
                  	console.log(responce.data);
                  	if(responce.data.status == true){
                  		this.$toasted.success(  'Your account is verify !!', { 
          						 theme: "toasted-primary", 
          						 position: "top-left", 
          						 duration : 2000
          					   })
                  	}
                  	
 
                  }).catch((error) => console.log(error));
        		
        	}
    

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
