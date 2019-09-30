<template>
  <div v-if="ItemDetail" class="container product-detail-content">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ ItemDetail.supplier }}
      </li>
    </ol>
    <div class="product-detail-header">
      <div class="row">
        <aside class="col-sm-3">
          <div class="img-wrap">
            <img :src="ItemDetail.imgSrcFarm" alt />
          </div>
        </aside>
        <article class="col-sm-9">
          <h4 class="title">{{ ItemDetail.supplier }}</h4>
          <div class="row mt-5">
            <div class="col-sm-3">
              <dl class="list-align">
                <dt>Owner</dt>
                <dd>{{ ItemDetail.owner }}</dd>
              </dl>
              <dl class="list-align">
                <dt>Product</dt>
                <dd>{{ ItemDetail.product }}</dd>
              </dl>
            </div>
            <div class="col-sm-3">
              <dl class="list-align">
                <dt>Phone</dt>
                <dd>
                  <a class="phone" :href="'tel:' + ItemDetail.phone">
                    {{ ItemDetail.phone }}
                  </a>
                </dd>
              </dl>
              <dl class="list-align">
                <dt>Quantity provided</dt>
                <dd>{{ ItemDetail.quantityProvided }}</dd>
              </dl>
            </div>
            <div class="col-sm-6">
              <dl class="list-align">
                <dt>Address</dt>
                <dd>{{ ItemDetail.address }}</dd>
              </dl>
              <dl class="list-align">
                <dt>Arable land</dt>
                <dd>{{ ItemDetail.arableLand }}</dd>
              </dl>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="product-detail-body">
      <h4 class="mt-5 mb-3">Introduction</h4>
      <p
        v-html="intro"
        v-for="(intro, i) in ItemDetail.introduction"
        :key="i"
      ></p>
      <h4 v-if="hasRelatedProduct(ItemDetail.relatedProduct)" class="mt-5 mb-3">
        Related Products
      </h4>
      <div
        v-if="hasRelatedProduct(ItemDetail.relatedProduct)"
        class="product-detail-items row"
      >
        <ItemProduct
          v-for="(product, i) in ItemDetail.relatedProduct"
          :key="i"
          :itemData="product"
          :hideOverlay="true"
          class="col-md-6 col-xl-3"
        ></ItemProduct>
        <div class="col-md-12 text-center mb-5 mt-5">
          <button class="btn" type="submit">view more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ItemProduct from "@/components/ItemProduct.vue";
import { API } from "@/config/api.js";
import { mapGetters, mapState } from "vuex";
import { GetItem } from "../services";

@Component({
  components: {
    ItemProduct
  },
  computed: {
    ...mapState(["ItemDetail"])
  }
})
export default class ProductDetail extends Vue {
  mounted() {
    if (!this.ItemDetail) {
      GetItem(this.$route.params.id)
        .then(r => {
          this.$store.commit("hideSplash", false);
          this.$store.commit("getItemDetail", r);
        })
        .catch(e => {
          this.$store.commit("hideSplash", false);
          this.$store.commit(
            "getItemDetail",
            API.getItem(this.$route.params.id)
          );
        });
    }
  }
  // mounted() {
  //   if(!this.ItemDetail){

  //   }
  //   console.log(this.$route.params.id);
  // }
  // data() {
  //   console.log(this);
  //   return {
  //     //item: API.createDb().data[5]
  //   };
  // }
  hasRelatedProduct(relatedproducts) {
    return relatedproducts.length;
  }
}
</script>

<style scoped lang="less">
.product-detail-content {
  padding-bottom: 10px;
  a {
    text-decoration: none;
    color: #555555;
  }
  .product-detail-body {
    h4 {
      font-size: 20px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
    }
    h4,
    p {
      color: #313131;
    }
  }
  .product-detail-header {
    .img-wrap {
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #313131;
    }
    .list-align {
      dt {
        font-size: 13px;
        font-weight: normal;
        color: #707070;
      }
      dd {
        font-size: 16px;
        font-weight: 600;
        color: #313131;
        .phone {
          color: #43aa5f;
        }
      }
    }
  }
  .product-detail-items {
    .btn {
      border: solid 1px #46ae5f;
      color: #46ae5f;
      font-size: 14px;
      font-weight: bold;
      padding: 0.75rem 1rem;
      text-transform: uppercase;
    }
  }
}
</style>
