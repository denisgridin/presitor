<template>
  <div class="constructor">
    <SlidesSidebar />
    <PresentationCanvas />
    <PresentationActions />
    <ContextMenu
      v-if="getContextMenu.active"
      ref="contextMenu"
      :context-menu-items="getContextMenu.items"
    ></ContextMenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SlidesSidebar from '@/components/constructor/SlidesSidebar'
import PresentationCanvas from '@/components/constructor/PresentationCanvas'
import PresentationActions from '@/components/constructor/PresentationActions'
import ContextMenu from '@/components/ContextMenu'
import { LAYOUTS } from '@/utils/enums'
import { CommonModule } from '@/store/common'
import { PresentationModule } from '@/store/presentation'
import { asyncForEach } from '@/utils/helpers'

@Component({
  components: {
    ContextMenu,
    SlidesSidebar,
    PresentationCanvas,
    PresentationActions
  },
  layout: LAYOUTS.APP
})
export default class Constructor extends Vue {
  async asyncData ({ route }) {
    if (route.params.presentationId !== PresentationModule.currentPresentation.presentationId) {
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
              await PresentationModule.getSlideElements({
                presentationId,
                slideId
              })
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  get getContextMenu () {
    return CommonModule.getContextMenu
  }
}
</script>

<style lang="scss" scoped>

.constructor {
  width: 100%;
  background: $grey-1;

  display: grid;
  grid-template-columns: 250px calc(100vw - 550px - 50px) 300px;
  grid-gap: 20px;
}
</style>
