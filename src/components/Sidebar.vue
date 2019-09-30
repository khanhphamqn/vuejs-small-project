<template>
  <form id="product-filter" class="card-filter">
    <article
      v-for="(item, idxItem) in Sidebar"
      v-bind:key="idxItem"
      v-bind:class="renderClassGroupItem(item.className)"
    >
      <template v-if="item.type === 'radio'">
        <header class="card-header">
          <h6 class="title">{{ item.categoryName }}</h6>
        </header>
        <div
          v-for="(category, idxCat) in item.categories"
          v-bind:key="idxCat"
          class="outer"
        >
          <div
            v-if="category.typeName"
            class="card-header-title"
            :class="{ 'is-open': category.isOpen }"
            v-accordion
          >
            <a href="javascript:void(0);">
              <i class="icon-action fa fa-chevron-up"></i>
              <h6 class="title">
                {{ category.typeName }}
                <span class="float-right mr-2">
                  {{ category.total }}
                </span>
              </h6>
            </a>
          </div>
          <div class="card-body">
            <label
              v-for="(catType, idxCatType) in category.types"
              v-bind:key="idxCatType"
              class="form-check-box"
            >
              <input
                class="form-check-input"
                :value="catType.value"
                :name="catType.name"
                type="checkbox"
                v-on:change="onFilter()"
              />
              <span class="form-check-label"></span>
              <span>
                {{ catType.text }}
                <span v-if="catType.total" class="float-right mr-3">
                  {{ catType.total }}
                </span>
              </span>
            </label>
          </div>
        </div>
      </template>
      <template v-if="item.type === 'select'">
        <header class="card-header">
          <h6 class="title">{{ item.categoryName }}</h6>
        </header>
        <div class="outer">
          <div class="card-body">
            <div class="form-row">
              <div
                v-for="(selectCat, idxSelectCat) in item.categories"
                v-bind:key="idxSelectCat"
                class="form-group col-md-6"
              >
                <select
                  v-on:change="onFilter()"
                  class="custom-select"
                  :name="selectCat.name"
                >
                  <option
                    v-for="(option, idxOption) in selectCat.options"
                    :value="option.value"
                    v-bind:key="idxOption"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </template>
    </article>
  </form>
</template>
<script>
import { Sidebar } from "../config/sidebar.js";
import { Accordion } from "../directives/accordion/index.js";
import { serialize } from "../helper/index";
import { parse } from "query-string";
import { stringify } from "query-string";
import { API } from "@/config/api.js";
import { mapGetters, mapState } from "vuex";
import { doFilter } from "../services";

export default {
  name: "Sidebar",
  props: {},
  debounce: null,
  data() {
    return {
      Sidebar: Sidebar
    };
  },
  methods: {
    renderClassGroupItem: function(extraClass) {
      return `card-group-item ${extraClass}`;
    },
    onFilter() {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(() => {
        this.$store.commit("updateOnAjax", true);
        var formData = parse(serialize(document.forms["product-filter"]));
        doFilter(stringify(formData))
          .then(r => {
            this.$store.commit("updateItems", r);
            this.$store.commit("updateOnAjax", false);
          })
          .catch(e => {
            this.$store.commit("updateItems", API.filter(formData));
            this.$store.commit("updateOnAjax", false);
          });
      }, 1000);
    }
  },
  directives: {
    Accordion
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.card-group-item {
  &:not(.last) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  .custom-select {
    color: #a0a0a0;
  }
}
.card-header {
  background: none;
  border-bottom: none;
  h6 {
    font-size: 16px;
    font-weight: bold;
    color: #313131;
  }
}

.card-header-title {
  a {
    text-decoration: none;
    color: #555555;
  }
  .icon-action {
    margin-top: 2px;
    float: right;
    font-size: 80%;
  }
  &.is-open + .card-body {
    display: block;
  }
  &.is-open {
    .fa-chevron-up {
      &::before {
        content: "\f078";
      }
    }
  }
}
.card-header-title + .card-body {
  display: none;
}
.card-header-title {
  padding: 0.75rem 0;
  .title {
    font-size: 15px;
    color: #000000;
    font-weight: 500;
    .float-right {
      color: #717171;
      font-size: 14px;
    }
  }
}
.card-body,
.card-header {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
