<template>
  <div
    v-if="isOpen"
    :class="'modal product_view' + (isShow ? ' show' : ' hide')"
    v-on:animationend="onAnimationEnd()"
  >
    <div class="modal-overlay"></div>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <a v-on:click="closeModal()" href="javascript:void(0);" class="close">
          <span class="fas fa-times"></span>
        </a>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    closeModal() {
      this.isShow = false;
    },
    onAnimationEnd() {
      if (this.isShow) return;
      this.$emit("onClose");
      this.isShow = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.modal {
  h4 {
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: 600;
  }
}
.product_view {
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  .modal-body {
    padding: 0.5rem;
  }
  &.show {
    .modal-content {
      -webkit-animation-duration: 0.5s;
      animation-duration: 0.5s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation-name: bounceInDown;
      animation-name: bounceInDown;
    }
  }
  &.hide {
    .modal-content {
      -webkit-animation-duration: 0.5s;
      animation-duration: 0.5s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation-name: bounceOutUp;
      animation-name: bounceOutUp;
    }
  }
  .modal-dialog {
    max-width: 800px;
    &.modal-dialog-centered {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      min-height: calc(100% - (0.5rem * 2));
    }
    @media (min-width: 576px) {
      &.modal-dialog-centered {
        min-height: calc(100% - (1.75rem * 2));
      }
    }
  }
  .close {
    position: absolute;
    right: 0;
    font-size: 15px;
    padding: 5px 10px;
    color: #d2d2d2;
    z-index: 1;
  }
  .modal-content {
    padding: 0.75rem 0.75rem;
  }
  .modal-overlay {
    opacity: 0.8;
    background-color: #000000;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

@-webkit-keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@-webkit-keyframes bounceOutUp {
  20% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, 20px, 0);
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes bounceOutUp {
  20% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    -webkit-transform: translate3d(0, 20px, 0);
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -2000px, 0);
    transform: translate3d(0, -2000px, 0);
  }
}
</style>
