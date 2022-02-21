<template>
  <div class="hello">
    <div class="login-page1">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-12">
           <h4>terms</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import $ from "jquery";
import JQuery from "jquery";
import "bootstrap";
import feather from "feather-icons";
import Popper from "popper.js";
import Datepicker from 'vuejs-datepicker';
import "feather-icons/dist/feather.min.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

import {
  AirplayIcon,
  AtSignIcon,
  PhoneIcon,
  VideoIcon,
  SmileIcon,
  MicIcon,
  SendIcon,
  MessageSquareIcon,
  UsersIcon,
  PlusCircleIcon,
  PlusIcon,
  PhoneIncomingIcon,
  PhoneOutgoingIcon,
  FileIcon,
  ClockIcon,
  ListIcon,
  GridIcon,
  BookIcon,
  XIcon,
  DownloadIcon,
  SearchIcon,
  StarIcon,
  MoreVerticalIcon,
} from "vue-feather-icons";
import carousel from "vue-owl-carousel";

export default {
  name: "Terms",
  components: {
    carousel,
    PhoneIncomingIcon,
    PhoneIcon,
    Datepicker,
    VideoIcon,
    SmileIcon,
    MicIcon,
    SendIcon,
    MessageSquareIcon,
    UsersIcon,
    PlusCircleIcon,
    PlusIcon,
    PhoneOutgoingIcon,
    FileIcon,
    ClockIcon,
    ListIcon,
    GridIcon,
    BookIcon,
    XIcon,
    DownloadIcon,
    SearchIcon,
    StarIcon,
    MoreVerticalIcon,
  },
  props: [],
  data() {
    return {
      
    };
  },
  watch: {},
  methods: {
    
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.dob input {
      border: none !important;
    background: transparent !important;
    width: 100%;
}
.login-content .form1 .form-group, .login-content .form2 .form-group {
    margin-bottom: 15px;
}
</style>
