<template>
  <div>
    <p>This is Issues list</p>
    <p>{{ $route.query?.page || 1 }}</p>
    <router-link to="/issue">an issue</router-link>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route)
  }
}</script>
