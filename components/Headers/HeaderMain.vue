<template>
  <Header>
    <template>
      <HeaderButtons />
    </template>
  </Header>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HeaderButtons from '~/components/HeaderButtons.vue'
@Component({
  components: {
    HeaderButtons
  }
})
export default class HeaderApp extends Vue {}

</script>

<style lang="scss" scoped>
</style>
