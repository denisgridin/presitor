<template>
  <v-app>
    <div class="wrapper-constructor">
      <Header />
      <nuxt />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class app extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
