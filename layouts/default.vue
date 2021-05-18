<template>
  <div class="wrapper">
    <HeaderMain />
    <nuxt />
  </div>
</template>

<script lang="ts">
import HeaderMain from '@/components/Headers/HeaderMain'
import { UserModule } from '~/store/user'
export default {
  components: {
    HeaderMain
  },
  mounted () {
    UserModule.getCookieUser(this.$cookies.getAll())
  }
  // created () {
  //   const user = getCookieUser(this.$cookies)
  //   if (user) {
  //     UserModule.SET_USER(user)
  //   }
  // }
}
</script>
