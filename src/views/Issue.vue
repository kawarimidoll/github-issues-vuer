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
const issues = [
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
      this.issue = issues[Number(this.number)];
      this.loading = false;
    },
  },
};
</script>
