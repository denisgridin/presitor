<template>
  <div ref="canvas" class="presentation-canvas" :style="canvasStyle">
    <div v-for="element in slideElements" :key="element.elementId">
      <keep-alive>
        <CanvasElement :element="element" :disabled="disabled">
          <CanvasElementContent :element="element" :disabled="disabled" />
        </CanvasElement>
      </keep-alive>
      <slot name="controller" class="controller"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { IElementType } from '@/interfaces/presentation'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import CanvasElement from './CanvasElement.vue'
import CanvasElementContent from './CanvasElementContent.vue'

@Component({
  components: {
    CanvasElement,
    CanvasElementContent
  }
})
export default class Canvas extends Vue {
  @Prop() slideElements: IElementType
  @Prop({ default: false }) disabled: boolean

  updated () {
    console.log('updated')
  }

  get canvasStyle () {
    return {
      background: this.presentationOptions.fillColor,
      fontFamily: this.presentationOptions.fontFamily
    }
  }

  get presentationOptions () {
    return {
      fillColor: this.getCurrentPresentation.fillColor,
      fontFamily: this.getCurrentPresentation.fontFamily
    }
  }

  get getCurrentPresentation () {
    return PresentationModule.getCurrentPresentation
  }
}
</script>

<style lang="scss" scoped>
.presentation-canvas {
  width: $canvas-width;
  height: $canvas-height;
}
</style>
