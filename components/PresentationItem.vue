<template>
  <vs-card @click="openPresentation">
    <template #title>
      <h3>{{ presentation.name }}</h3>
    </template>
    <template #img>
      <Canvas
        style="transform: scale(0.3);
    transform-origin: top left;"
        :slide-elements="elements"
        :presentation="presentation"
        :disabled="true"></Canvas>
    </template>
    <template #text>
      <p class="card-text">
        <span class="card-text__title">Описание</span>
        <span class="card-text__description">{{ presentation.description }}</span>
      </p>
      <p>
        <span class="card-text__updated">Создана</span>
        <span>{{ presentation.lastUpdated | dateFormat }}</span>
      </p>
    </template>
    <template #interactions>
      <vs-button class="btn-chat" icon danger @click.stop="removePresentation">
        <i class='bx bx-trash'></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { DATE_FORMAT } from '~/utils/constants'
import { IElement, IPresentation } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
import Canvas from '~/components/constructor/canvas/Canvas.vue'
const dayjs = require('dayjs')

@Component({
  components: {
    Canvas
  },
  filters: {
    dateFormat (date: Date) {
      return dayjs(date).format(DATE_FORMAT)
    }
  }
})
export default class PresentationItem extends Vue {
  elements: IElement[] = []

  @Prop() presentation: IPresentation

  @Emit('open')
  openPresentation () {
    return this.presentation.presentationId
  }

  mounted () {
    this.getElements()
  }

  @Emit('remove')
  removePresentation () {
    return this.presentation.presentationId
  }

  async getElements () {
    try {
      const presentation = this.presentation
      this.elements = []
      console.log(presentation)
      if (presentation) {
        const slides = await PresentationModule.getPresentationSlides(presentation.presentationId)
        console.log(slides)
        if (Array.isArray(slides)) {
          const { presentationId, slideId } = slides[0]
          console.table({ presentationId, slideId })
          this.elements = await PresentationModule.getSlideElements({
            presentationId,
            slideId
          }) as IElement[]
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss">
.vs-card__img {
  display: block;
}
</style>
