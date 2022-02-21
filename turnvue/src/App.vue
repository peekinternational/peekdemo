<template>
  <div id="app">

  <!-- <select style="position: absolute;top: 0;z-index: 99;right: 0;" name="" @change="changelanguage($event)">
       <option value="">{{ $t('selectlan') }}</option>
       <template v-for="locale in locales" :key="locale">
         <option :value="locale" >{{ $t(locale) }}</option>
       </template>
  </select> -->

  <router-view ></router-view>

  </div>
</template>

<style>
  @import './assets/css/style.css';
  @import './assets/css/newStyle.css';
  
  /*@import './assets/css/magnific-popup.css';*/
  /*@import './assets/css/tour.css';*/
  @import './assets/css/date-picker.css';
</style>

<script>

// import Login from './components/loginComponent.vue'

export default {
  name: 'App',
  components: {
    // Login
  },
  data() {
            return {
            locales:process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
               
            }
        },
        methods:{
              // changelanguage(value){
              // var locale =value.target.value;
              //  if(this.$i18n.locale !== locale){
              //     this.$i18n.locale = locale;
              //  }
              // },

},
       
};
</script>

<style>

</style>
