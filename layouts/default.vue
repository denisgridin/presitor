<template>
  <div class="wrapper">
    <Header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { FIELD } from '~/utils/constants'
import { UserModule } from '~/store/user'
import { getCookieUser } from '~/utils/helpers'

export default {
  created () {
    const user = getCookieUser(this.$cookies)
    if (user) {
      UserModule.SET_USER(user)
    }
  }
}
</script>
