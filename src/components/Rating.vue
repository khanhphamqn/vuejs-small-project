<template>
  <div class="rating">
    <span v-for="(item, i) in star" :key="i">
      <i v-if="isGreater(i + 1, rating)" class="fas fa-star"></i>
      <i v-if="isHalf(i + 1, rating)" class="fas fa-star-half-alt"></i>
      <i v-if="isLesser(i + 1, rating)" class="far fa-star"></i>
    </span>
    <span v-if="isShowNumber" class="ml-2">({{ rating }})</span>
  </div>
</template>

<script>
import { Sponsor } from "../config/sponsor.js";

export default {
  name: "Rating",
  props: {
    star: Array,
    rating: Number,
    isShowNumber: Boolean
  },
  methods: {
    isGreater(i, rating) {
      return rating >= i;
    },
    isHalf(i, rating) {
      return i - 0.5 == rating;
    },
    isLesser(i, rating) {
      return i > rating && i - 0.5 !== rating;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
</style>
