<template>
  <div class="slides-sidebar">
    <div class="slides-sidebar__list">
      <SlidesSidebarItem
        v-for="(slide, index) in slides"
        :key="slide.slideId"
        :ref="'slide_' + slide.slideId"
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import SlidesSidebarItem from '@/components/constructor/SlidesSidebarItem.vue'
import { ISlide } from '~/interfaces/presentation'

@Component({
  components: {
    SlidesSidebarItem
  }
})
export default class SlidesSidebar extends Vue {
  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  get getActiveSlideId () {
    return PresentationModule.getActiveSlideId
  }

  get slides () {
    return PresentationModule.getCurrentSlides
  }

  @Watch('getActiveSlideId')
  onActiveSlideChanged (id) {
    const element = this.$refs[`slide_${id}`][0].$el
    if (element) {
      element.scrollIntoView({ block: 'nearest' })
    }
    console.log(element)
  }

  isActive (id: string): boolean {
    return this.getActiveSlideId === id
  }

  setActiveSlide (id: string): void {
    PresentationModule.SET_ACTIVE_SLIDE_ID(id)
  }

  addSlide () {
    const slide: ISlide = {
      presentationId: this.currentPresentation.presentationId,
      name: `Slide ${this.currentPresentation.slides.length + 1}`,
      index: this.currentPresentation.slides.length + 1,
      elements: []
    }
    PresentationModule.addPresentationSlide(slide)
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
