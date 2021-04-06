<template>
  <div>
    <div class="canvas-wrapper">
      <div class="presentation-canvas" :style="canvasStyle">
      </div>
    </div>
<!--    <client-only>-->
<!--      <div class="scale-controller">-->
<!--        <span>Масштаб</span>-->
<!--        <div>-->
<!--          <vue-slider-->
<!--            :min="10"-->
<!--            :max="200"-->
<!--            :value="getConstructorZoom"-->
<!--            @change="setZoom" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </client-only>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    VueSlider: () => import('vue-slider-component')
  },
  data: () => {
    return {
      zoomTimeout: null
    }
  }
})
export default class PresentationCanvas extends Vue {
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

  get activeSlide () {
    return PresentationModule.getActiveSlide
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
