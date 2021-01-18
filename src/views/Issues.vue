<template>
  <div>
    <p>This is Issues list</p>
    <p>{{ page }}</p>
    <router-link to="/issues/1">issue 1</router-link>
    <router-link to="/issues/2">issue 2</router-link>
    <router-link :to="prev">prev</router-link>
    <router-link :to="next">next</router-link>
  </div>
</template>

<script>
// [Vue 3 Fetch Data and Consume REST APIs | Techiediaries](https://www.techiediaries.com/vue-3-fetch-data-rest-api/)
// [Vue3 Composition API でのVue Routerの使い方 - Qiita](https://qiita.com/azukiazusa/items/9f467fdea7298baf3476)
const API_URL =
  "http://api.github.com/repos/facebook/react/issues?per=10&page=";

export default {
  data: function () {
    return {
      page: "1",
      issues: [],
      loading: true,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: { "$route.query.page": "fetchData" },
  computed: {
    next() {
      return `/issues?page=${Number(this.page) + 1}`;
    },
    prev() {
      return `/issues?page=${Number(this.page) - 1}`;
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.page = this.$route.query.page || "1";
      console.log("fetch!", `${API_URL}${this.page}`);
      this.loading = false;
    },
  },
};
</script>
