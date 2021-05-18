<template>
  <div class="presentation-broadcast">
    <client-only>
      <keep-alive>
        <Canvas ref="canvas" class="canvas" :slide-elements="getSlideElements" :presentation="currentPresentation" :style="canvasStyle" />
      </keep-alive>
      <SlidesController :is-admin="isAdmin" @sync="setSync"></SlidesController>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Canvas from '@/components/constructor/canvas/Canvas.vue'
import { PresentationModule } from '@/store/presentation'
import { asyncForEach } from '@/utils/helpers'
import { LAYOUTS } from '~/utils/enums'
import { CANVAS_OPTIONS } from '~/utils/constants'
import SlidesController from '~/components/SlidesController.vue'
import { UserModule } from '~/store/user'

@Component({
  components: {
    Canvas,
    SlidesController
  },
  layout: LAYOUTS.EMPTY
})
export default class Broadcast extends Vue {
  canvasScale: { width: number, height: number } = { width: 1, height: 1 }
  interval = null
  isSync: boolean = true

  get isAdmin () {
    return PresentationModule.currentPresentation.editorIds?.includes(UserModule.getUser.userId)
  }

  get currentPresentation () {
    return PresentationModule.currentPresentation
  }

  setSync (val) {
    this.isSync = val
    if (val && !this.interval) {
      this.startInterval()
    } else {
      this.clearInterval()
    }
  }

  mounted () {
    this.changeScale()
    window?.addEventListener('resize', this.changeScale)
    this.startInterval(true)
  }

  beforeDestroy () {
    window?.removeEventListener('resize', this.changeScale)
    clearInterval(this.interval)
  }


  startInterval () {
    this.interval = setInterval(() => {
      this.getCurrentSlide()
    }, 1000)
  }

  clearInterval () {
    clearInterval(this.interval)
    this.interval = null
  }

  async getCurrentSlide () {
    if (this.isSync) {
      try {
        const presentation = await PresentationModule.getPresentation(this.$route.params.presentationId)
        if (presentation.slideIndex !== null && Array.isArray(PresentationModule.getCurrentSlides)) {
          const id = PresentationModule.getCurrentSlides[presentation.slideIndex]?.slideId
          if (id !== PresentationModule.getActiveSlide.slideId) {
            PresentationModule.SET_ACTIVE_SLIDE_ID(id)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  async asyncData ({ route }) {
    if (!PresentationModule.currentPresentation.presentationId) {
      try {
        const presentation = await PresentationModule.getPresentation(route.params.presentationId)
        console.log(presentation)
        if (presentation) {
          PresentationModule.SET_CURRENT_PRESENTATION(presentation)
          const slides = await PresentationModule.getPresentationSlides(presentation.presentationId)
          console.log(slides)
          if (Array.isArray(slides)) {
            PresentationModule.SET_ACTIVE_SLIDE_ID(slides[0].slideId)
            PresentationModule.SET_CURRENT_SLIDES(slides)
            await asyncForEach(slides, async (slide) => {
              const { presentationId, slideId } = slide
              console.table({ presentationId, slideId })
              const elements = await PresentationModule.getSlideElements({
                presentationId,
                slideId
              })
              if (Array.isArray(elements)) {
                PresentationModule.SET_SLIDE_ELEMENTS({
                  slideId,
                  elements
                })
              }
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  changeScale () {
    const canvasDefaultHeight = CANVAS_OPTIONS.layout.height
    const canvasDefaultWidth = CANVAS_OPTIONS.layout.width
    const heightScale = (window.innerHeight / canvasDefaultHeight) + 0.5
    const widthScale = (window.innerHeight / canvasDefaultWidth) + 0.5
    this.canvasScale = {
      width: widthScale,
      height: heightScale
    }
  }

  get activeSlide () {
    return PresentationModule.getActiveSlide
  }

  get getSlideElements () {
    return this.activeSlide?.elements || []
  }

  get canvasStyle () {
    const scale = this.canvasScale.height < this.canvasScale.width ? this.canvasScale.height : this.canvasScale.width
    return {
      transform: `scale(${scale})`
    }
  }
}
</script>
<style lang="scss" scoped>
.presentation-broadcast {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background: black;
  .canvas {
    transform: scale(1.5);
    pointer-events: none;
  }
}
</style>
