<template>
  <div :class="`container-fluid layout ${splash ? 'hidden' : ''}`">
    <TopHeader></TopHeader>
    <Header></Header>
    <router-view />
    <Footer />
    <CopyRight />
    <AjaxLoading v-if="onAjax" />
    <PreLoading :Status="splash" :LogoText="App.Logo.text" />
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import CopyRight from "./components/CopyRight.vue";
import AjaxLoading from "./components/AjaxLoading.vue";
import PreLoading from "./components/PreLoading.vue";
import { mapState, mapGetters } from "vuex";
import { App } from "./config/app.js";

export default {
  name: "app",
  components: {
    TopHeader,
    Header,
    Footer,
    CopyRight,
    AjaxLoading,
    PreLoading
  },
  computed: {
    ...mapState(["onAjax"]),
    ...mapGetters(["splash"])
  },
  data() {
    return {
      App: App
    };
  }
};
</script>
<style lang="less">
/* You can add global styles to this file, and also import other style files */
body {
  font-family: Roboto;
  font-size: 14px;
  color: #313131;
  &.overflow-hidden {
    overflow: hidden;
  }
}
.hidden {
  overflow: hidden;
  max-height: 100vh;
}
.form-check-box {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  color: #555;
  .form-check-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked {
      & ~ .form-check-label {
        border: solid 1px #46ae5f;
      }
      & ~ .form-check-label:after {
        display: block;
      }
      & ~ span {
        color: #46ae5f;
      }
    }
  }
  .form-check-label {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    border-radius: 2px;
    border: solid 1px #dbdbdb;
    background-color: transparent;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
    &:after {
      left: 4px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid #46ae5f;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
.breadcrumb {
  background-color: transparent;
  padding: 1rem 0;
  .active {
    color: #313131;
    font-size: 14px;
    font-weight: 600;
  }
}
.wrapper-sponsor {
  border-top: 1px #f2f2f2 solid;
}
</style>
