<template>
  <div class="slides-sidebar">
    <div class="slides-sidebar__list">
      <SlidesSidebarItem
        v-for="(slide, index) in slides"
        :key="slide.slideId"
        :index="index + 1"
        :active="isActive(slide.slideId)"
        :slide="slide"
        @select="setActiveSlide" />
    </div>
    <div class="slides-sidebar__add-button">
      <vs-button relief block @click="addSlide">
        Добавить слайд
        <i class="bx bxs-plus"></i>
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import SlidesSidebarItem from '@/components/constructor/SlidesSidebarItem.vue'
import { ISlide } from '~/interfaces/presentation'

@Component({
  components: {
    SlidesSidebarItem
  },
  mounted () {
    this.activeSlideId = PresentationModule.getActiveSlideId
  }
})
export default class SlidesSidebar extends Vue {
  activeSlideId: string = '1'

  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  get slides () {
    return PresentationModule.getCurrentSlides
  }

  isActive (id: string): boolean {
    return this.activeSlideId === id
  }

  setActiveSlide (id: string): void {
    this.activeSlideId = id
    PresentationModule.SET_ACTIVE_SLIDE_ID(id)
  }

  addSlide () {
    const slide: ISlide = {
      presentationId: this.currentPresentation.name,
      slideId: (+this.currentPresentation.slides[this.currentPresentation.slides.length - 1].slideId + 1).toString(),
      name: `Slide ${this.currentPresentation.slides.length + 1}`,
      index: this.currentPresentation.slides.length + 1,
      elements: []
    }
    PresentationModule.ADD_PRESENTATION_SLIDE(slide)
  }
}
</script>

<style lang="scss" scoped>
.slides-sidebar {
  position: relative;
  background: $grey-1;
  border-right: 1px solid #C7C7C7;
  display: grid;
  grid-template-rows: 94% 70px;
  height: calc(100vh - 75px);

  &__list {
    overflow: auto;
  }

  &__add-button {
    width: 80%;
    margin: 0 auto 10px;
  }

}
</style>
