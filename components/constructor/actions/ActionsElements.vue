<template>
  <div class="actions-elements">
    <div class="presentation-section presentation-section__shapes">
      <h4>Фигуры</h4>
      <ConstructorElements />
    </div>
    <div class="presentation-section">
      <h4>Контент</h4>
      <ContentSelector />
    </div>
    <div class="presentation-section">
      <h4>Изображение</h4>
      <ImageSelector @file:load="loadFile" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContentSelector from '@/components/constructor/content/ContentSelector.vue'
import ImageSelector from '@/components/constructor/ImageSelector'
import { ImagesApi } from '~/api/images'
import { PresentationModule } from '~/store/presentation'

@Component({
  data: () => {
    return {
      actions: {
        content: {
          text: '',
          fontFamily: 'Roboto',
          fontSize: 14,
          letterSpacing: 'normal',
          lineHeight: 'normal',
          fontCase: 'normal'
        },
        shape: null
      }
    }
  },
  components: {
    ImageSelector,
    ContentSelector
  }
})
export default class ActionsElements extends Vue {
  uploadImage (file: Blob) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await PresentationModule.uploadImage(file)
        console.log(url)
        resolve(url)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  async loadFile ({ file, data }: { file: FormData, data: Blob }) {
    try {
      const url = await this.uploadImage(file)
      await PresentationModule.addSlideElement(
        {
          slideId: (this as any).$current('slide').slideId,
          data: {
            name: data.fileName || 'Изображение',
            background: 'transparent',
            style: {
              zIndex: PresentationModule.getLastZIndex,
              background: `url(${url})`
            }
          }
        })
    } catch (error) {
      console.error(error)
    }
  }
}

</script>

<style lang="scss" scoped>
.actions-elements {
  overflow: auto;
  max-height: calc(100vh - 200px);
}
</style>
