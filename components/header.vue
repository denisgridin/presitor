<template>
  <div class="wrapper-header">
    <div class="header">
      <Logo class="header-logo" width="60px" height="60px" />
      <HeaderButtons />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserModule } from '~/store/user'
export default Vue.extend({
  mounted () {
    console.log('created')
    UserModule.SET_USER_FROM_LOCAL_STORAGE()
  }
})

</script>

<style lang="scss" scoped >

.wrapper-header {
  padding: 5px 2rem;
  background: white;
  border-radius: 0 0 30px 30px;
  .header {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
