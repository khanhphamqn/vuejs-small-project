<template>
  <section class="header-main shadow-sm">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-3 col-sm-4">
          <div class="brand-wrap">
            <router-link to="/">
              <img class="logo" :src="App.Logo.imgSrc" />
              <h2 class="logo-text">{{ App.Logo.text }}</h2>
            </router-link>
          </div>
        </div>
        <div class="col-lg-4 col-xl-7 col-sm-8">
          <form action="#" class="search-wrap">
            <div class="input-group w-100">
              <select class="custom-select" name="category_name">
                <option value>All type</option>
                <option value="codex">Special</option>
                <option value="comments">Only best</option>
                <option value="content">Latest</option>
              </select>
              <input type="text" class="form-control" placeholder="Search" />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          <!-- search-wrap .end// -->
        </div>
        <!-- col.// -->
        <div class="col-lg-5 col-xl-2 col-sm-12">
          <div class="wrapper-shopping-cart float-right">
            <router-link to="/my-cart">
              <div class="icon-wrap">
                <i class="fa fa-shopping-cart"></i>
              </div>
              <div class="text-wrap ml-2">
                <span v-if="unitItems.length" class="number">
                  {{ unitItems.length }}
                </span>
                <div>Cart</div>
              </div>
            </router-link>
          </div>
          <!-- widgets-wrap.// -->
        </div>
        <!-- col.// -->
      </div>
      <!-- row.// -->
    </div>
    <!-- container.// -->
  </section>
</template>

<script>
import { App } from "../config/app.js";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Header",
  props: {},
  computed: {
    ...mapGetters(["unitItems"])
  },
  data() {
    return {
      App: App
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header-main {
  border-top: 1px #f2f2f2 solid;
  .container {
    padding: 25px 0;
  }
  .btn {
    width: 60px;
    height: 40px;
    background-image: linear-gradient(89deg, #19a779, #74c947);
    color: #fff;
    border: none;
  }
  &.shadow-sm {
    -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }
  .brand-wrap {
    .logo {
      margin-right: 7px;
      max-height: 42px;
      display: inline-block;
    }
    .logo-text {
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      color: #46ae5f;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .wrapper-shopping-cart {
    position: relative;
    .icon-wrap,
    .text-wrap {
      display: inline-block;
    }
    .icon-wrap {
      color: #a2a2a2;
      font-size: 30px;
    }
    .text-wrap {
      font-size: 14px;
      color: #313131;
      .number {
        position: absolute;
        top: 0;
        left: 24px;
        color: #fff;
        background-color: #46ae5f;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        padding: 0 6px;
      }
    }
  }
  .search-wrap {
    .form-control {
      width: 55%;
    }
    input,
    select {
      height: 40px;
    }
    input {
      color: #a7a7a7;
    }
    .custom-select {
      color: #313131;
    }
  }
}
</style>
