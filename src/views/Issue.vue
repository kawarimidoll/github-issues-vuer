<template>
  <div>
    <div v-if="loading">loading issue {{ number }}...</div>
    <div v-else-if="!issue || !issue.id">issue not found</div>
    <div v-else>
      <h2>{{ issue.number }}: {{ issue.title }}</h2>
      <div className="text-right mr-2">
        <!-- <Link :to="issue.html_url">view in GitHub</Link> -->
      </div>
      <hr />
      {{ issue.body }}
    </div>
  </div>
</template>

<script>
const API_URL = "http://api.github.com/repos/facebook/react/issues/";

export default {
  props: ["number"],
  data: function () {
    return {
      issue: {},
      loading: true,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: { number: "fetchData" },
  computed: {
    next() {
      return `/issues/${Number(this.number) + 1}`;
    },
    prev() {
      return `/issues/${Number(this.number) - 1}`;
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      fetch(`${API_URL}${this.number}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((json) => {
          console.log(json);
          this.issue = json;
          this.loading = false;
        })
        .catch((err) => {
          console.warn(err);
          this.issue = {};
          this.loading = false;
        });
    },
  },
};
</script>
