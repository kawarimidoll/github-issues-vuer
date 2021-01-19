<template>
  <div>
    <div v-if="loading">loading issue {{ number }}...</div>
    <div v-else-if="!issue || !issue.id">issue not found</div>
    <div v-else>
      <h2>{{ issue.number }}: {{ issue.title }}</h2>
      <div class="text-right mr-2">
        <EzLink :to="issue.html_url">view in GitHub</EzLink>
      </div>
      <hr />
      <div class="markdown-body" v-html="compileMarkdown"></div>
    </div>
  </div>
</template>

<script>
import markdownit from "markdown-it";
import sanitizer from "markdown-it-sanitizer";
import emoji from "markdown-it-emoji";

import EzLink from "../components/EzLink.vue";

const API_URL = "https://api.github.com/repos/facebook/react/issues/";

export default {
  components: { EzLink },
  props: {
    number: { type: String, required: true },
  },
  data: function () {
    const md = new markdownit({
      html: true,
      linkify: true,
      breaks: true,
      typographer: true,
    })
      .use(sanitizer)
      .use(emoji);

    return {
      issue: {},
      loading: true,
      markdownit: md,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: { number: "fetchData" },
  computed: {
    compileMarkdown() {
      return this.markdownit.render(this.issue.body);
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
