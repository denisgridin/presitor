<template>
  <div class="content-selector">
    <div v-for="element in contentElements" class="selector-element" v-html="element.html">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CONTENT_ELEMENTS } from '~/utils/constants'

@Component
export default class ContentSelector extends Vue {
  contentElements = CONTENT_ELEMENTS
}
</script>

<style lang="scss" scoped>
.content-selector {
  padding: 5px;
  .selector-element {
    padding: 5px;
    transition: $transition-delay;
    margin-top: 5px;
    border-radius: $border-radius;
    cursor: pointer;

    &:hover {
      background: $color-primary-transparent-10;
    }
  }
}
</style>
