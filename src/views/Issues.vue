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
        <Pager :current="page" :max="maxPages" :getPath="getPath" />
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "../components/Pager.vue";
const perPage = 10;

const API_URL = `https://api.github.com/repos/facebook/react`;

export default {
  components: { Pager },
  data: function () {
    return {
      page: "1",
      issues: [],
      loading: true,
      issuesCount: 1,
      getPath: (num) => `/issues?page=${num}`,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: { "$route.query.page": "fetchData" },
  computed: {
    maxPages() {
      return Math.ceil(this.issuesCount / perPage);
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.page = this.$route.query?.page || "1";
      fetch(`${API_URL}/issues?per_page=${perPage}&page=${this.page}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((json) => {
          this.issues = json;
        })
        .then(() => {
          fetch(`${API_URL}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(res.statusText);
              }
              return res.json();
            })
            .then((json) => {
              this.issuesCount = json.open_issues_count;
            })
            .then(() => {
              this.loading = false;
            });
        })
        .catch((err) => {
          console.warn(err);
          this.issues = [];
          this.loading = false;
        });
    },
  },
};
</script>
