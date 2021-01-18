<template>
  <div>
    <h2>Issues</h2>
    <div>
      <div v-if="loading">loading issues list...</div>
      <div v-else-if="!issues[0]">issues not found</div>
      <div v-else>
        <ul>
          <li v-for="issue in issues" :key="issue.id">
            <router-link :to="`/issues/${issue.number}`">
              {{ issue.number }}: {{ issue.title }}
            </router-link>
          </li>
        </ul>
        <!-- <Pager :current="page" :max="maxPage" :getPath="getPath" /> -->
      </div>
    </div>
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
      this.issues = [
        { id: 1, number: 1, title: "issue title 1", body: "issue body 1" },
        { id: 2, number: 2, title: "issue title 2", body: "issue body 2" },
        { id: 3, number: 3, title: "issue title 3", body: "issue body 3" },
        { id: 4, number: 4, title: "issue title 4", body: "issue body 4" },
        { id: 5, number: 5, title: "issue title 5", body: "issue body 5" },
        { id: 6, number: 6, title: "issue title 6", body: "issue body 6" },
        { id: 7, number: 7, title: "issue title 7", body: "issue body 7" },
        { id: 8, number: 8, title: "issue title 8", body: "issue body 8" },
        { id: 9, number: 9, title: "issue title 9", body: "issue body 9" },
        { id: 10, number: 10, title: "issue title 10", body: "issue body 10" },
      ];
      this.loading = false;
    },
  },
};
</script>
