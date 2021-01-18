<template>
  <a
    v-if="to.startsWith('http')"
    :href="to"
    :className="className"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot></slot>
    <svg focusable="false" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.707 4.707L12 13.414L10.586 12l5.707-5.707L13 3h8v8l-3.293-3.293z"
        fill="#999"
      ></path>
    </svg>
  </a>
  <router-link v-else to="to" :className="className">
    <slot></slot>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  to: String,
  className: String,
});
</script>
