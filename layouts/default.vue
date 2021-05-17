<template>
  <div class="wrapper">
    <HeaderMain />
    <nuxt />
  </div>
</template>

<script lang="ts">
import HeaderMain from '@/components/Headers/HeaderMain'
export default {
  components: {
    HeaderMain
  }
  // created () {
  //   const user = getCookieUser(this.$cookies)
  //   if (user) {
  //     UserModule.SET_USER(user)
  //   }
  // }
}
</script>
