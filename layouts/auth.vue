<template>
  <div class="wrapper" :style="{ backgroundImage: `url(${background})` }">
<!--    <img :src="background" alt="Авторизация">-->
    <nuxt />
  </div>
</template>

<script lang="ts">
const background = require('@/assets/images/login.svg')
export default {
  data () {
    return {
      background
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;

  background-position: right;
  background-repeat: no-repeat;
  background-size: 50% 60%;
}
</style>
