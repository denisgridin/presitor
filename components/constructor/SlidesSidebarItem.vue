<template>
  <div class="slide" :class="{ 'slide-active': active }" @click="selectSlide">
    <div class="slide-index">{{ index }}</div>
    <div class="preview">
      <Canvas :ref="`slide_${slide.slideId}`" class="slide-preview" :slide-elements="getSlideElements" :disabled="true">
        <template #controller>
          <div class="fullscreen-controller">
            <div class="controller-button" @click="setSlidePosition(-1)">
              <i class="bx bx-left-arrow-circle"></i>
            </div>
            <div class="controller-button">
              <span contenteditable="true" ref="slide-input" @input="setCurrentIndex" @keydown.enter.prevent.stop="changeSlide">{{ index }}</span>
            </div>
            <div class="controller-button" @click="setSlidePosition(1)">
              <i class="bx bx-right-arrow-circle"></i>
            </div>
            <div class="controller-button" @click="exit">
              <i class="bx bx-exit-fullscreen"></i>
            </div>
          </div>
        </template>
      </Canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'
import { ISlide } from '~/interfaces/presentation'
import Canvas from '~/components/constructor/canvas/Canvas.vue'
import { PresentationModule } from '~/store/presentation'
import { exitFullScreen, startFullScreen } from '~/utils/helpers'

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

  currentPlayedSlideIndex = this.index

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
    if (document.fullscreen) {
      this.playSlide(state)
    }
  }

  @Watch('isPresentationPlayed')
  onPresentationStateChanged (state: boolean) {
    this.playSlide(state)
  }

  exit () {
    exitFullScreen()
  }

  setSlidePosition (step) {
    PresentationModule.setCurrentSlidePosition(step)
  }

  setCurrentIndex (event) {
    const value = event.target.innerText
    const resetValue = (event) => {
      event.target.innerText = this.index
    }

    if (/^\d+$/.test(value)) {
      if (value <= PresentationModule.getCurrentSlides.length) {
        console.log('change to ' + value)
        this.currentPlayedSlideIndex = +value
      } else {
        resetValue(event)
      }
    } else {
      resetValue(event)
    }
  }

  changeSlide () {
    this.$refs['slide-input'].blur()
    const slideId = PresentationModule.getCurrentSlides[this.currentPlayedSlideIndex + 1].slideId
    PresentationModule.setCurrentSlidePosition(slideId)
  }

  playSlide (state: boolean) {
    if (this.currentPlayedSlide === this.slide.slideId && PresentationModule.isPresentationPlayed) {
      console.log(this.$refs)
      const element = (this as any).$refs[`slide_${this.currentPlayedSlide}`]?.$el
      console.log('presentation played: ' + state)
      console.log(element)
      if (element) {
        state ? startFullScreen(element) : PresentationModule.playPresentation(false)
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

    &:fullscreen {
      background: black;
    }
  }

  .preview {
    overflow: hidden;

    .fullscreen-controller {
      display: none;
      top: 90%;
      left: calc(100vw / 2 - 92.5px);
      position: fixed;
      background: white;
      border-radius: 10px;
      padding: 10px;
      align-items: center;

      @media all and (display-mode: fullscreen) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      .controller-button {
        padding: 10px;
        transition: $transition-delay;

        &:nth-child(2) {
          &:hover {
            background: transparent;
          }
        }

        &:nth-child(3) {
          margin: 0 10px;
        }

        &:hover {
          background: $color-primary-transparent-10;
        }

        span {
          font-family: 'Open Sans Bold', sans-serif;
          font-size: 32px;
        }

        .bx {
          font-size: 35px;
        }
      }
    }
  }
}
</style>
