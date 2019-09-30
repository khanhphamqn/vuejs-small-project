<template>
  <nav class="navbar navbar-expand-lg">
    <div class="collapse navbar-collapse container" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="first">
          <i class="fas fa-phone-volume"></i>
        </li>
        <li>
          <a href="tel:+84905421116">
            Live Help :
            <span>0905421116</span>
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="#">SIGN UP</a>
        </li>
        <li>|</li>
        <li>
          <a href="#">LOGIN</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopHeader"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
nav {
  background-color: #f6f6f6;
  a,
  i {
    color: #7e7e7e;
  }
  a {
    font-size: 13px;
    text-decoration: none;
  }
  li {
    padding: 0 5px;
    &.first {
      padding-left: 0;
    }
  }
  span {
    font-weight: bold;
    color: #2d2d2d;
  }
}
</style>
