<template>
  <div>
    <div class="canvas-wrapper">
      <div class="presentation-canvas" :style="canvasStyle">
        <CanvasElement v-for="(item, index) in getSlideElements" :item="item" :key="index">
          <div v-if="item.elementType === 'content'">
            {{ item.text }}
          </div>
        </CanvasElement>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CanvasElement from '@/components/constructor/canvas/CanvasElement.vue'
import { PresentationModule } from '@/store/presentation'
import { ELEMENT_TYPE } from '~/utils/enums'

@Component({
  components: {
    VueSlider: () => import('vue-slider-component'),
    CanvasElement
  },
  data: () => {
    return {
      zoomTimeout: null
    }
  }
})
export default class PresentationCanvas extends Vue {
  elementTypes = Object.values(ELEMENT_TYPE)

  get canvasStyle () {
    return {
      background: this.presentationOptions.fillColor,
      fontFamily: this.presentationOptions.fontFamily,
      transform: `scale(${this.getConstructorZoom / 100})`
    }
  }

  get getConstructorZoom () {
    return PresentationModule.getConstructorZoom
  }

  get getCurrentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  get presentationOptions () {
    return {
      fillColor: this.getCurrentPresentation.fillColor,
      fontFamily: this.getCurrentPresentation.fontFamily
    }
  }

  get getSlideElements () {
    return PresentationModule.getActiveSlide?.elements || []
  }

  setZoom (zoom: number) {
    PresentationModule.SET_ZOOM(zoom)
  }
}
</script>

<style lang="scss" scoped>

$canvas-width: 1400px;
.canvas-wrapper {
  width: 100%;
  height: 80vh;
  margin-top: 20px;
  overflow: auto;
  border: $grey-2 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  .presentation-canvas {
    width: $canvas-width;
    height: calc(#{$canvas-width / 16 * 8})
  }
}

.scale-controller {
  width: 30%;
  margin: 10px auto;
}
</style>
