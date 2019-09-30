<template>
  <div class="product-wrapper">
    <div class="single-products text-center">
      <div class="product-img">
        <img :src="itemData.imgSrc" alt="" />
        <div class="standard-area">
          <img
            v-if="itemData.standard == 1"
            src="../assets/icons/VietGAP.png"
            alt=""
          />
          <img
            v-if="itemData.standard == 2"
            src="../assets/icons/GlobalGAP.png"
            alt=""
          />
        </div>
      </div>
      <div class="product-overlay" v-if="!hideOverlay">
        <div class="overlay"></div>
        <div class="product-overlay-content">
          <router-link to="/my-cart" class="btn btn-cart">
            <i class="fa fa-shopping-cart"></i>
          </router-link>
          <a
            v-on:click="$emit('showDetail', itemData)"
            href="javascript:void(0);"
            class="btn btn-default add-to-cart"
          >
            QUICK VIEW
          </a>
        </div>
      </div>
    </div>
    <div class="product-container">
      <a
        v-on:click="$emit('navigateToDetail', itemData)"
        href="Javascript:void(0);"
      >
        <h6 class="product__title">{{ itemData.title }}</h6>
        <div class="cost">
          <sup class="fas fa-dollar-sign"></sup>
          <span class="weight">
            {{ itemData.price.toFixed(2) }}
            <small>/kg</small>
          </span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span class="stock">(In-Stock : {{ itemData.inStock }})</span>
          <p>
            <i class="fab fa-pagelines"></i>
            &nbsp;&nbsp;{{ itemData.supplier }}
          </p>
        </div>
        <Rating :star="Arr" :rating="itemData.rating" />
      </a>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/Rating.vue";

export default {
  name: "ItemProduct",
  props: {
    itemData: Object,
    hideOverlay: Boolean
  },
  data() {
    return {
      Arr: new Array(5)
    };
  },
  components: {
    Rating
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.product-wrapper {
  margin-bottom: 20px;
  a {
    text-decoration: none;
  }
  .product-container {
    padding: 20px;
    border-bottom: solid 1px #e4e4e4;
    border-right: solid 1px #e4e4e4;
    border-left: solid 1px #e4e4e4;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .product__title {
      font-size: 16px;
      font-weight: bold;
      color: #313131;
    }
    .weight,
    .fa-dollar-sign {
      font-weight: bold;
      color: #46ae5f;
    }
    .weight {
      font-size: 20px;
    }
    small {
      font-size: 15px;
      color: #a2a2a2;
    }
    .stock,
    p {
      color: #313131;
      font-size: 13px;
    }
  }
  .single-products {
    position: relative;
    img {
      width: 100%;
    }
    &:hover {
      box-shadow: 0px 7px 30px 0 rgba(0, 0, 0, 0.1);
      & ~ .product-container {
        box-shadow: 0px 7px 30px 0 rgba(0, 0, 0, 0.1);
      }
      .overlay,
      .product-overlay-content {
        display: block;
      }
    }
  }
  .product-img {
    position: relative;
    .standard-area {
      position: absolute;
      width: 55px;
      height: 30px;
      top: 5px;
      right: 5px;
    }
  }
  .product-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0.7;
      background-color: #000000;
      display: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .product-overlay-content {
      position: absolute;
      width: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: none;
      .fa-shopping-cart {
        color: #fff;
      }
      a {
        border-radius: 3px;
        border: solid 1px #46ae5f;
        height: 40px;
        color: #74ff95;
        margin-left: 15px;
      }
      .btn {
        &.btn-cart {
          background-image: linear-gradient(57deg, #19a779, #74c947);
          border: none;
        }
      }
    }
    a {
      text-decoration: none;
      outline: none;
    }
  }
  p {
    margin-bottom: 0;
  }
}
</style>
