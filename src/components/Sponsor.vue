<template>
  <div class="sponsor-block">
    <h6 class="mb-4">Customers</h6>
    <div class="row">
      <div
        v-for="(item, idx) in sponsorData"
        v-bind:key="idx"
        class="col-lg-2 col-md-4 col-6"
      >
        <a :href="item.link" class="d-block mb-2 h-100">
          <img class="img-fluid" :src="item.img" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Sponsor } from "../config/sponsor.js";

export default {
  name: "Sponsor",
  props: {},
  data() {
    return {
      sponsorData: Sponsor
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sponsor-block {
  padding: 40px 0;
  h6 {
    font-size: 24px;
    font-weight: bold;
    color: #313131;
  }
}
</style>
