<template>
  <v-app>
    <div class="wrapper-constructor">
      <Header>
        <template #middle-data>
          <div v-if="currentPresentation.name" class="middle-data">
            {{ currentPresentation.name }}
          </div>
        </template>
      </Header>
      <nuxt />
    </div>
  </v-app>
</template>

<script lang="ts">
import { PresentationModule } from '@/store/presentation'

export default {
  head () {
    return {
      script: [
        { src: 'https://apis.google.com/js/api.js' }
      ]
    }
  },
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

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
