<template>
  <div
    v-if="show"
    :class="
      `wrapper-loading d-flex justify-content-center align-items-center${
        onAnimation ? '' : ' hide-splash'
      }`
    "
  >
    <div v-on:transitionend="onTransitionEnd()" class="left-screen"></div>
    <div class="right-screen"></div>
    <div class="preloadinglogo">{{ LogoText }}</div>
  </div>
</template>

<script>
export default {
  name: "PreLoading",
  props: {
    LogoText: {
      type: String,
      required: true
    },
    Status: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      onAnimation: this.Status,
      show: true
    };
  },
  methods: {
    onTransitionEnd() {
      this.show = false;
    }
  },
  watch: {
    Status: function(val, oldVal) {
      this.onAnimation = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wrapper-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 10;
  .left-screen,
  .right-screen {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    background-color: #fff;
    -webkit-transition: width 1s;
    transition: width 1s;
  }
  .left-screen {
    left: 0;
  }
  .right-screen {
    right: 0;
  }
  &.hide-splash {
    .left-screen,
    .right-screen {
      width: 0;
    }
    .preloadinglogo {
      animation: blink 1s linear;
      opacity: 0;
    }
  }
}

.preloadinglogo {
  background-size: contain;
  font-family: Trebuchet MS, sans-serif;
  font-size: 10vh;
  font-weight: bold;
  color: #46ae5f;
  text-align: center;
  line-height: 10vh;
  opacity: 1;
  transition: opacity 1s;
  animation: blink 1s linear infinite;
}

@-webkit-keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
