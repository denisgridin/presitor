<template>
  <div class="presentation-section__image">
    <FileInput @change="setFile" @add="loadFile" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileInput from '@/components/FileInput.vue'
import { ImagesApi } from '@/api/images'
import { PresentationModule } from '~/store/presentation'
import { DEFAULT_ELEMENT, ELEMENT_STYLES } from '~/utils/constants'
import uuid from 'uuid-random'

@Component({
  components: {
    FileInput
  }
})
export default class ImageSelector extends Vue {
  image: FormData = null

  setFile (file: Blob) {
    this.$set(this, 'image', file)
  }

  loadFile (image: Blob) {
    this.$emit('file:load', { data: image, file: this.image })
  }
}
</script>
