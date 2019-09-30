<template>
  <div class="content-app">
    <div class="container card-content">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Fruits Category
        </li>
      </ol>
      <div class="shopping-cart">
        <div class="row">
          <div class="col-md-12 col-lg-9">
            <div
              v-for="(items, indexItem) in myCart"
              :key="indexItem"
              class="items mb-2"
            >
              <div class="item-header d-flex align-items-center">
                <span class="mr-2">&nbsp;</span>
                <h3 class="title">{{ items.supplier }}</h3>
              </div>
              <div
                v-for="(item, index) in items.data"
                class="product"
                :key="index"
                :class="{ last: isLast(index, items.data) }"
              >
                <div class="row">
                  <div class="col-md-2 d-flex align-items-center">
                    <img class="mx-auto d-block image" :src="item.imgSrc" />
                  </div>
                  <div class="col-md-3 d-flex align-items-center">
                    <div class="description">
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="col-md-2 d-flex align-items-center">
                    <div class="cost">
                      <sup class="fas fa-dollar-sign"></sup>
                      <span class="weight">{{ item.price.toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="col-md-4 d-flex align-items-center">
                    <ul class="quantity">
                      <li class="d-flex align-items-center list">
                        <button
                          v-on:click="remove(item)"
                          class="btn minus"
                          type="button"
                          name="button"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          v-model="item.buy"
                          v-on:change="update(item)"
                          v-integer
                        />
                        <button
                          v-on:click="add(item)"
                          class="btn plus"
                          type="button"
                          name="button"
                        >
                          +
                        </button>
                        <span>&nbsp;&nbsp;kg</span>
                      </li>
                      <li class="list">
                        <p>&nbsp;&nbsp;(In-Stock : {{ item.inStock }})</p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-1 d-flex align-items-center">
                    <div class="buttons">
                      <span v-on:click="onDelete(item)" class="fas fa-trash">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-3">
            <div class="summary">
              <div class="summary-header">
                <div class="row d-flex align-items-center">
                  <div class="col-6">
                    <p class="sub">Subtotal:</p>
                  </div>
                  <div class="col-6 text-right">
                    <div class="cost">
                      <sup class="fas fa-dollar-sign"></sup>
                      <span class="weight">{{ total() }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="summary-body">
                <div class="row">
                  <div class="col-6">
                    <p class="total">Total:</p>
                  </div>
                  <div class="col-6 text-right">
                    <div class="cost">
                      <sup class="fas fa-dollar-sign"></sup>
                      <span class="weight">{{ total() }}</span>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="checkout-process">
                      <button class="btn" type="submit">
                        proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid wrapper-sponsor">
      <div class="container">
        <Sponsor></Sponsor>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Sponsor from "@/components/Sponsor.vue";
import { Integer } from "../directives/inputInteger/index.js";
import ItemProduct from "@/components/ItemProduct.vue";
import { API } from "@/config/api.js";
import { mapGetters, mapState, mapActions } from "vuex";
import { DeleteItem, UpdateItem } from "../services";

@Component({
  components: {
    Sponsor,
    ItemProduct
  },
  computed: {
    ...mapGetters(["myCart", "unitItems"])
  },
  methods: {
    ...mapActions(["cartFlow"])
  },
  directives: {
    Integer
  }
})
export default class MyCart extends Vue {
  total() {
    return this.unitItems
      .reduce((a, c) => (a += c.buy * c.price), 0)
      .toFixed(2);
  }
  isLast(i, data) {
    return i === data.length - 1;
  }
  onDelete(item) {
    this.$store.commit("updateOnAjax", true);
    DeleteItem(item)
      .then(r => {
        this.cartFlow({
          type: "DELETE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      })
      .catch(e => {
        this.cartFlow({
          type: "DELETE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      });
  }
  add(item) {
    if (item.buy == parseInt(item.inStock) * 1000) return;
    item.buy = Math.min(parseInt(item.buy) + 1, parseInt(item.inStock) * 1000);
    this.$store.commit("updateOnAjax", true);
    UpdateItem(item)
      .then(r => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      })
      .catch(e => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      });
  }
  update(item) {
    if (parseInt(item.buy) / 1000 > parseInt(item.inStock)) {
      item.buy = parseInt(item.inStock) * 1000;
    }
    this.$store.commit("updateOnAjax", true);
    UpdateItem(item)
      .then(r => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      })
      .catch(e => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      });
  }
  remove(item) {
    item.buy = Math.max(parseInt(item.buy) - 1, 1);
    if (item.buy == 1) return;
    this.$store.commit("updateOnAjax", true);
    UpdateItem(item)
      .then(r => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      })
      .catch(e => {
        this.cartFlow({
          type: "UPDATE",
          item: item
        });
        this.$store.commit("updateOnAjax", false);
      });
  }
  mounted() {
    setTimeout(() => this.$store.commit("hideSplash", false), 2000);
  }
}
</script>

<style scoped lang="less">
.card-content {
  a {
    text-decoration: none;
    color: #555555;
  }
  .items {
    .item-header,
    .product {
      padding: 0.75rem 1rem;
    }
    .item-header {
      background-color: #f5f5f5;
      border: solid 1px #e4e4e4;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      span {
        width: 24px;
        height: 24px;
        background-color: #8c8c8c;
        border-radius: 12px;
        display: inline-block;
      }
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #313131;
        display: inline-block;
        margin-bottom: 0;
      }
    }
    .product {
      border-left: solid 1px #e4e4e4;
      border-right: solid 1px #e4e4e4;
      position: relative;
      &:not(.last) {
        &:before {
          content: "";
          border-bottom: solid 1px #e4e4e4;
          width: calc(100% - 2rem);
          position: absolute;
          bottom: 0;
        }
      }
      &.last {
        border-bottom: solid 1px #e4e4e4;
      }
      .image {
        width: 76px;
        height: 76px;
        border-radius: 3px;
      }
      .fa-trash {
        color: #a2a2a2;
      }
      .btn,
      .form-control {
        padding: 0.1rem 0.75rem;
        border: solid 1px #e8e8e8;
      }
      .btn {
        border: solid 1px #e8e8e8;
        width: 40px;
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
      .quantity {
        list-style: none;
        margin-bottom: 0;
        padding-left: 0;
        .list {
          padding-top: 10px;
        }
      }
      .form-control {
        width: 65px;
        display: inline-block;
        height: auto;
        border-radius: 0;
        text-align: center;
      }
      .description {
        color: #313131;
        font-size: 16px;
      }
      .cost {
        color: #46ae5f;
        font-size: 20.5px;
        font-weight: bold;
      }
      .fa-trash {
        cursor: pointer;
      }
    }
  }
  .summary {
    border: solid 1px #e4e4e4;
    .summary-header,
    .summary-body {
      padding: 0.75rem 1rem;
      color: #313131;
    }
    .summary-header {
      position: relative;
      .cost {
        font-size: 16px;
      }
      &:before {
        content: "";
        border-bottom: solid 1px #e4e4e4;
        width: calc(100% - 2rem);
        position: absolute;
        bottom: 0;
      }
    }
    .summary-body {
      .cost {
        font-size: 24px;
        color: #46ae5f;
      }
    }
    .cost {
      font-weight: bold;
    }
    .sub {
      font-size: 13px;
      margin-bottom: 0;
    }
    .total {
      font-size: 16px;
    }
    .btn {
      border-radius: 3px;
      background-image: linear-gradient(57deg, #19a779, #74c947);
      color: #fff;
      text-transform: uppercase;
      width: 100%;
    }
  }
  .shopping-cart {
    position: relative;
  }
}
</style>
