<template>
  <div class="slide" :class="{ 'slide-active': active }" @click="selectSlide">
    <div class="slide-index">{{ index }}</div>
    <div class="preview">
      <Canvas :ref="`slide_${slide.slideId}`" class="slide-preview" :slide-elements="getSlideElements" :disabled="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'
import { ISlide } from '~/interfaces/presentation'
import Canvas from '~/components/constructor/canvas/Canvas.vue'
import { PresentationModule } from '~/store/presentation'

@Component({
  components: {
    Canvas
  }
})
export default class SlidesSidebarItem extends Vue {
  @Prop()
  slide: ISlide

  @Prop()
  index: number

  @Prop()
  active: boolean

  get getSlideElements () {
    return this.slide.elements || []
  }

  get currentPlayedSlide () {
    return this.isPresentationPlayed ? PresentationModule.getActiveSlideId : null
  }

  get getActiveSlideId () {
    return PresentationModule.getActiveSlideId
  }

  get isPresentationPlayed () {
    return PresentationModule.currentPresentation.isPlay
  }

  @Watch('getActiveSlideId')
  onActiveSlideChanged (state: boolean) {
    this.playSlide(state)
  }

  @Watch('isPresentationPlayed')
  onPresentationStateChanged (state: boolean) {
    this.playSlide(state)
  }

  playSlide (state: boolean) {
    if (this.currentPlayedSlide === this.slide.slideId) {
      console.log(this.$refs)
      const element = (this as any).$refs[`slide_${this.currentPlayedSlide}`]?.$el
      console.log('presentation played: ' + state)
      console.log(element)
      if (element) {
        state ? element.requestFullscreen() : document.exitFullscreen()
      }
    }
  }

  @Emit('select')
  selectSlide () {
    return this.slide.slideId
  }
}
</script>

<style lang="scss" scoped>

.slide-active {
  background: $color-primary-transparent-30;

  .slide-index {
    color: $color-primary;
  }
}

.slide {
  cursor: pointer;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-gap: 5px;
  height: 100px;

  margin: 10px;
  padding: 5px;

  border-radius: 3px;
  transition: all $transition-delay;

  &:hover {
    background: $color-primary-transparent-10;
  }

  &-index {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-black-1;
    font-family: "Open Sans Bold", sans-serif;
    font-size: 0.8rem;
  }

  &-preview {
    transform-origin: top left;
    transform: $canvas-preview-scale;
  }

  .preview {
    overflow: hidden;
  }
}
</style>
