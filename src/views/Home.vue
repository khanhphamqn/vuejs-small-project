<template>
  <div class="content-app">
    <div class="container product-content">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Fruits Category
        </li>
      </ol>
      <section class="section-main bg padding-top-sm">
        <div class="row row-sm">
          <aside class="col-md-3">
            <Sidebar></Sidebar>
          </aside>
          <div class="col-md-9">
            <div class="product-body">
              <div class="product-body-header">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">{{ Items.title }}</a>
                  </li>
                  <li
                    v-if="Items.data"
                    class="breadcrumb-item active"
                    aria-current="page"
                  >
                    {{ Items.data.length }}
                    {{ Items.data.length === 1 ? "Item" : "Items" }}
                  </li>
                </ol>
                <select
                  v-on:change="onSort()"
                  v-model="sort"
                  class="custom-select float-right mt-2"
                  name="sort"
                >
                  <option value="1">Newest</option>
                  <option value="2">Oldest</option>
                </select>
              </div>
              <div class="product-body-items row">
                <ItemProduct
                  v-for="(item, i) in Items.data"
                  :key="i"
                  :itemData="item"
                  class="col-md-6 col-xl-4"
                  v-on:showDetail="onShowDetail"
                  v-on:navigateToDetail="navigateToDetail"
                >
                </ItemProduct>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="container-fluid wrapper-sponsor">
      <div class="container">
        <Sponsor></Sponsor>
      </div>
    </div>
    <Popup :isOpen="isOpenPopup" class="popup" v-on:onClose="closePopup">
      <div class="row">
        <div class="preview col-md-5 d-flex align-items-center">
          <div class="preview-pic">
            <img :src="popupItem.bigImgSrc" />
          </div>
        </div>
        <div class="details col-md-7">
          <h4 class="product-title ">{{ popupItem.title }}</h4>
          <Rating :star="Arr" :rating="popupItem.rating" :isShowNumber="true" />
          <div class="cost">
            <sup class="fas fa-dollar-sign"></sup>
            <span class="weight">
              {{ popupItem.price.toFixed(2) }}
              <small>/kg</small>
            </span>
          </div>
          <div class="row">
            <div class="col-md-3 col-sm-4">
              <img src="../assets/images/QR Code.png" />
            </div>
            <div class="details col-md-3 col-sm-4">
              <dl class="list-align">
                <dt>Barcode</dt>
                <dd>{{ popupItem.barcode }}</dd>
              </dl>
              <dl class="list-align">
                <dt>Product Code</dt>
                <dd>{{ popupItem.productCode }}</dd>
              </dl>
            </div>
            <div class="details col-md-6 col-sm-4">
              <dl class="list-align">
                <dt>Size</dt>
                <dd>
                  {{ popupItem.size }}
                  <span v-if="popupItem.size">/ Item</span>
                  <span v-if="!popupItem.size">&nbsp;</span>
                </dd>
              </dl>
              <dl class="list-align">
                <dt>Supplier</dt>
                <dd>{{ popupItem.supplier }}</dd>
              </dl>
            </div>
          </div>
          <div class="row">
            <div class="details col-md-3 col-sm-4">
              <dl class="list-align">
                <dt>Planting date</dt>
                <dd>{{ popupItem.plantingDate }}</dd>
              </dl>
            </div>
            <div class="details col-md-3 col-sm-4">
              <dl class="list-align">
                <dt>Harveting date</dt>
                <dd>{{ popupItem.harvetingDate }}</dd>
              </dl>
            </div>
            <div class="details col-md-3 col-sm-4">
              <dl class="list-align">
                <dt>Production</dt>
                <dd>{{ popupItem.production }}</dd>
              </dl>
            </div>
          </div>
          <div class="row">
            <dl class="list-align col-12">
              <dt>Quantity:&nbsp;</dt>
              <dd>
                <ul class="quantity row">
                  <li class="d-flex align-items-center list col-6">
                    <button
                      v-on:click="minus()"
                      class="btn minus"
                      type="button"
                      name="button"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="form-control"
                      v-on:change="update()"
                      name="name"
                      v-model="quantity"
                      v-integer
                    />
                    <button
                      v-on:click="plus()"
                      class="btn plus"
                      type="button"
                      name="button"
                    >
                      +
                    </button>
                    <span>&nbsp;&nbsp;kg</span>
                  </li>
                  <li class="d-flex align-items-center list col-6">
                    <p>(In-Stock : {{ popupItem.inStock }})</p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <div class="row button-footer">
            <div class="col-md-4 col-cart mb-2">
              <button v-on:click="buyNow()" class="btn buy-now" type="button ">
                Buy Now
              </button>
            </div>
            <div class="col-md-4 col-cart mb-2">
              <button v-on:click="addCart()" class="btn" type=" button ">
                Add Cart
              </button>
            </div>
            <div class="col-md-4 col-cart">
              <button v-on:click="viewDetail()" class="btn" type="button">
                View Detail
              </button>
            </div>
          </div>
          <AjaxLoading v-if="isBuying" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Component, Vue, PropSync } from "vue-property-decorator";
import Sponsor from "@/components/Sponsor.vue";
import Sidebar from "@/components/Sidebar.vue";
import AjaxLoading from "@/components/AjaxLoading.vue";
import ItemProduct from "@/components/ItemProduct.vue";
import Popup from "@/components/Popup.vue";
import Rating from "@/components/Rating.vue";
import { Integer } from "../directives/inputInteger/index.js";
import { API } from "@/config/api.js";
import { mapGetters, mapState } from "vuex";
import { GetAllItems, SortItem, BuyItem } from "../services";

@Component({
  components: {
    Sponsor,
    Sidebar,
    ItemProduct,
    Popup,
    Rating,
    AjaxLoading
  },
  computed: {
    ...mapState(["Items"])
  },
  directives: {
    Integer
  }
})
export default class Home extends Vue {
  data() {
    return {
      Arr: new Array(5),
      popupItem: API.createDb().data[0],
      isOpenPopup: false,
      quantity: 1,
      sort: 1,
      isBuying: false
    };
  }
  created() {
    if (!this.Items.data) {
      this.$store.commit("updateOnAjax", true);
    }
    GetAllItems()
      .then(r => {
        this.$store.commit("updateItems", r);
        this.$store.commit("hideSplash", false);
        this.$store.commit("updateOnAjax", false);
      })
      .catch(e => {
        this.$store.commit("updateItems", API.createDb());
        this.$store.commit("hideSplash", false);
        this.$store.commit("updateOnAjax", false);
      });
  }
  navigateToDetail(item) {
    this.$store.commit("getItemDetail", item);
    this.$router.push({ name: "product", params: { id: item.id } });
  }
  viewDetail() {
    this.navigateToDetail(this.popupItem);
  }
  addCart() {
    return new Promise((resolve, reject) => {
      let newItem = Object.assign({}, this.popupItem, { buy: this.quantity });
      this.isBuying = true;
      BuyItem(newItem)
        .then(r => {
          this.$store.commit("addToCard", newItem);
          this.isBuying = false;
          resolve();
        })
        .catch(e => {
          this.$store.commit("addToCard", newItem);
          this.isBuying = false;
          resolve();
        });
    });
  }
  buyNow() {
    this.$store.commit("updateOnAjax", true);
    this.addCart().then(() => {
      this.$router.push(`/my-cart`);
      this.$store.commit("updateOnAjax", false);
    });
  }
  plus() {
    this.quantity = Math.min(
      this.quantity + 1,
      parseInt(this.popupItem.inStock) * 1000
    );
  }
  minus() {
    this.quantity = Math.max(this.quantity - 1, 1);
  }
  update() {
    this.quantity = Math.min(
      this.quantity,
      parseInt(this.popupItem.inStock) * 1000
    );
  }
  closePopup() {
    this.isOpenPopup = false;
  }
  onShowDetail(item) {
    this.popupItem = item;
    this.isOpenPopup = true;
  }
  onSort() {
    this.$store.commit("updateOnAjax", true);
    SortItem(this.sort)
      .then(r => {
        this.$store.commit("updateOnAjax", false);
        this.$store.commit("updateItems", r);
      })
      .catch(e => {
        this.$store.commit("updateOnAjax", false);
        this.$store.commit("updateItems", API.updateSort(this.sort));
      });
  }
}
</script>

<style scoped lang="less">
.product-content {
  position: relative;
  a {
    text-decoration: none;
    color: #555555;
  }
  .product-body-header {
    .breadcrumb {
      font-size: 16px;
      font-weight: bold;
      color: #313131;
      display: inline-block;
      padding: 0.75rem 0;
      .breadcrumb-item {
        display: inline-block;
      }
      .active {
        font-size: 13px;
        color: #555555;
        font-weight: normal;
      }
    }
    .custom-select {
      width: auto;
      color: #555555;
      font-size: 14px;
    }
  }
  .card-filter {
    padding-right: 20px;
    border-right: 1px #f2f2f2 solid;
    @media (max-width: 768px) {
      padding-right: 10px;
    }
  }
  .product-body-header {
    margin-left: -10px;
    margin-right: -10px;
  }
  .form-check-box {
    .float-right {
      color: #b4b4b4;
    }
  }
}

.popup {
  img {
    max-width: 100%;
  }
  .product-title {
    margin-top: 0;
    font-weight: bold;
    font-size: 20px;
    color: #313131;
  }
  .rating {
    .fas {
      color: #ffc23f;
      font-size: 12px;
    }
    .far {
      color: #e6e6e6;
      font-size: 12px;
    }
  }
  .cost {
    color: #46ae5f;
    font-size: 20.5px;
    .fa-dollar-sign {
      font-size: 16px;
    }
    .weight {
      font-size: 30px;
      font-weight: bold;
      small {
        color: #a2a2a2;
      }
    }
  }
  .button-footer {
    .btn {
      border: solid 1px #46ae5f;
      text-transform: uppercase;
      width: 100%;
      padding: 0.5rem 0.75rem;
      color: #46ae5f;
      font-size: 14px;
      font-weight: bold;
      &.buy-now {
        color: #fff;
        background-image: linear-gradient(57deg, #19a779, #74c947);
      }
    }
  }
  .list-align {
    dt {
      font-size: 13px;
      color: #a2a2a2;
      font-weight: normal;
    }
    dd {
      font-size: 14px;
      font-weight: 600;
      color: #313131;
      span {
        color: #a2a2a2;
      }
    }
  }
  .quantity {
    list-style: none;
    margin-bottom: 0;
    padding: 0;
    .list {
      padding-top: 10px;
      display: inline-block;
      p {
        margin-bottom: 0;
      }
    }
    .btn {
      border: solid 1px #e8e8e8;
      width: 40px;
      color: #717171;
      &.minus {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 0;
      }
      &.plus {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
    }
    .form-control {
      width: 65px;
      display: inline-block;
      height: auto;
      border-radius: 0;
      text-align: center;
    }
  }
  .preview-pic {
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
  .details {
    position: relative;
  }
}
</style>
