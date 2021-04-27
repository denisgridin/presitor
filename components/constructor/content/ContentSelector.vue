<template>
  <div class="content-selector">
    <div
      v-for="element in contentElements"
      :key="element.type"
      class="selector-element"
      @click="addElement(element.type)"
      v-html="element.html"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CONTENT_ELEMENTS } from '~/utils/constants'
import { PresentationModule } from '~/store/presentation'
import { CONTENT_TYPE, ELEMENT_TYPE } from '~/utils/enums'

@Component
export default class ContentSelector extends Vue {
  contentElements = CONTENT_ELEMENTS

  addElement (contentType: CONTENT_TYPE) {
    PresentationModule.addSlideElement({ slideId: (this as any).$current('slide').slideId, data: { elementType: ELEMENT_TYPE.CONTENT, contentType, name: 'Тестовый элемент' } })
  }
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
