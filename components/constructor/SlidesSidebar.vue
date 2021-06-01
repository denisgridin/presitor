<template>
  <div class="slides-sidebar">
    <div class="slides-sidebar__list">
      <SlidesSidebarItem
        v-for="(slide, index) in slides"
        :ref="'slide_' + slide.slideId"
        :key="slide.slideId"
        :removable="true"
        :index="index + 1"
        :active="isActive(slide.slideId)"
        :slide="slide"
        @select="setActiveSlide" />
    </div>
    <div class="slides-sidebar__add-button" v-if="isAdmin">
      <vs-button relief block @click="addSlide">
        Добавить слайд
        <i class="bx bxs-plus"></i>
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { IConstructorPresentation, PresentationModule } from '@/store/presentation'
import SlidesSidebarItem from '@/components/constructor/SlidesSidebarItem.vue'
import { ISlide } from '~/interfaces/presentation'
import { UserModule } from '~/store/user'

@Component({
  components: {
    SlidesSidebarItem
  }
})
export default class SlidesSidebar extends Vue {
  get currentPresentation (): IConstructorPresentation {
    return PresentationModule.getCurrentPresentation as IConstructorPresentation
  }

  get isAdmin (): boolean {
    return PresentationModule.currentPresentation.editorIds?.includes(UserModule.getUser.userId)
  }

  get getActiveSlideId (): string {
    return PresentationModule.getActiveSlideId
  }

  get slides (): ISlide[] {
    return PresentationModule.getCurrentSlides
  }

  @Watch('getActiveSlideId')
  onActiveSlideChanged (id: string) {
    const refs = this.$refs[`slide_${id}`]
    if (Array.isArray(refs)) {
      const element = (refs[0] as any)?.$el
      if (element) {
        element.scrollIntoView({ block: 'nearest' })
      }
      console.log(element)
    }
  }

  isActive (id: string): boolean {
    return this.getActiveSlideId === id
  }

  setActiveSlide (id: string): void {
    PresentationModule.SET_ACTIVE_SLIDE_ID(id)
  }

  addSlide () {
    const slide: ISlide = {
      slideId: '',
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
