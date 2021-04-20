<template>
  <div class="canvas-wrapper" >
    <Canvas :slide-elements="getSlideElements" @mousedown="resetActiveElement"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Canvas from '@/components/constructor/canvas/Canvas.vue'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    Canvas
  }
})
export default class PresentationCanvas extends Vue {
  get getSlideElements () {
    return PresentationModule.getActiveSlide?.elements || []
  }

  resetActiveElement () {
    PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: null, type: null })
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
}
</style>
