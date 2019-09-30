<template>
  <!-- Footer -->
  <footer class="page-footer font-small">
    <!-- Footer Links -->
    <div class="container text-center text-md-left mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <div class="col-md-3 col-xl-3 mb-3">
          <!-- Content -->
          <h6 class="text-uppercase font-weight-bold mb-4">FOLLOW US</h6>
          <div class="social-group">
            <!-- Facebook -->
            <a
              href="https://www.facebook.com/tmasolutions/"
              class="fb-ic mr-3 btn"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <!-- Google +-->
            <a class="gplus-ic mr-3">
              <i class="fab fa-google-plus-g"></i>
            </a>
            <!-- Twitter -->
            <a class="tw-ic mr-3">
              <i class="fab fa-twitter"></i>
            </a>
            <!--Linkedin -->
            <a
              href="https://www.linkedin.com/company/tma-solutions/"
              class="li-ic mr-3"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <!--Instagram-->
            <a class="ins-ic">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div class="col-md-3 col-xl-3 mb-3 detail-group">
          <h6 class="text-uppercase font-weight-bold mb-4">CONTACT US</h6>
          <p class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>
              Address
              <br />
              <span class="darker">
                work at Home, Quy Nhon City, Binh Dinh Province , Viet Nam
              </span>
            </span>
          </p>
        </div>

        <div class="col-md-3 col-xl-3 mb-3 detail-group">
          <h6 class="text-uppercase font-weight-bold mb-4">&nbsp;</h6>
          <p class="detail-item">
            <a href="tel:+84905421116">
              <i class="fas fa-phone-volume"></i>
              <span>
                Phone
                <br />
                <span class="darker">+84 905 421 116</span>
              </span>
            </a>
          </p>
        </div>

        <div class="col-md-3 col-xl-3 mb-3 detail-group">
          <h6 class="text-uppercase font-weight-bold mb-4">&nbsp;</h6>
          <p class="detail-item">
            <a href="mailto:khanhphamqn@gmail.com">
              <i class="fas fa-envelope"></i>
              <span>
                Email
                <br />
                <span class="darker">khanhphamqn@gmail.com</span>
              </span>
            </a>
          </p>
        </div>
      </div>
      <!-- Grid row -->
    </div>
    <!-- Footer Links -->
  </footer>
  <!-- Footer -->
</template>

<script>
export default {
  name: "Footer",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
footer {
  background-color: #f6f6f6;
  padding: 50px 0;
  .social-group {
    font-size: 30px;
    a {
      width: 36px;
      height: 36px;
      border-radius: 18px;
      display: inline-block;
      font-size: 1rem;
      vertical-align: middle;
      padding: 0.375rem 0.45rem;
      margin-bottom: 10px;
      &.fb-ic {
        background-color: #375798;
      }
      &.gplus-ic {
        background-color: #dd4d3f;
      }
      &.tw-ic {
        background-color: #53aeee;
      }
      &.li-ic {
        background-color: #007ab9;
      }
      &.ins-ic {
        background-color: #6a4337;
      }
    }
  }
  .fab {
    color: #fff;
  }
  h6 {
    font-size: 18px;
    font-weight: bold;
    color: #313131;
    min-height: 42px;
  }
  a {
    text-decoration: none;
    color: #787878;
  }
  .detail-group {
    color: #787878;
    .darker {
      color: #313131;
    }
  }
  i {
    color: #787878;
    font-size: 24px;
  }
  .detail-item {
    position: relative;
    margin-left: 30px;
    i {
      position: absolute;
      left: -35px;
    }
  }
}
</style>
