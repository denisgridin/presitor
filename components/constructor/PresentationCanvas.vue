<template>
  <div class="canvas-wrapper" >
    <client-only>
      <Canvas ref="canvas" :style="{ pointerEvents: disabled ? 'none' : null }" :slide-elements="getSlideElements" @mousedown="resetActiveElement" />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import Canvas from '@/components/constructor/canvas/Canvas.vue'
import { PresentationModule } from '@/store/presentation'
import { IElement } from '~/interfaces/presentation'

@Component({
  components: {
    Canvas
  }
})
export default class PresentationCanvas extends Vue {
  @Prop() disabled: boolean

  elements: IElement[] = []

  get getSlideElements () {
    return this.activeSlide?.elements || []
  }

  get activeSlide () {
    return PresentationModule.getActiveSlide
  }

  @Watch('activeSlide.elements')
  onElementsChanged (elements: IElement[]) {
    console.log('elements changed')
    this.$set(this, 'elements', elements)
    this.$forceUpdate()
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
  border: $grey-2 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
</style>
