<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else>
      <h2>
      {{ issue.title }}
      </h2>
      <div>{{issue.body}}</div>
    </div>
    <router-link :to="prev">prev</router-link>
    <router-link :to="next">next</router-link>
  </div>
</template>

<script>
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
      this.issue.number = this.number;
      this.issue.title = `title ${this.number}`
      this.issue.body = `body ${this.number}`
      this.loading = false;
    },
  },
};
</script>
