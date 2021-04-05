<template>
  <div class="wrapper-constructor">
    <Header>
      <template #middle-data>
        <div class="middle-data">{{ currentPresentation.name }}</div>
      </template>
    </Header>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { PresentationModule } from '~/store/presentation'

export default {
  computed: {
    currentPresentation () {
      return PresentationModule.getCurrentPresentation
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-constructor {
  .middle-data {
    width: 400px;
    text-align: center;
    border-radius: 3px;
    color: $color-primary;
    font-family: "Open Sans Bold", sans-serif;
    background: $grey-1;
    padding: 5px;
  }
}
</style>
