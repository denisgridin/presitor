<template>
  <div
    class="upload"
  >
    <label class="label" for="file">
      <vs-button relief class="p-0" variant="primary" @click="emitClick">
        Выбрать файл
      </vs-button>
    </label>
    <input
      ref="file-input"
      id="file"
      hidden
      type="file"
      :accept="mimeTypes"
      :multiple="false"
      @change="onChange">
    <div class="loaded-image-wrapper">
      <img v-if="image" :src="image" class="loaded-image" alt="Выбранное изображение">
      <vs-button v-if="image" relief>
        <i class="bx bxs-image-add"></i>
        <span style="margin-left: 3px;">Добавить на полотно</span>
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'
import { MIME_TYPES_IMAGE } from '~/utils/constants'

@Component({
  data: () => {
    return {
      mimeTypes: MIME_TYPES_IMAGE,
      image: null
    }
  }
})
export default class FileInput extends Vue {
  @Emit('change')
  onChange ({ target }: Event) {
    const reader = new FileReader()
    if (target.files[0]) {
      reader.readAsDataURL(target.files[0])
      reader.onload = () => {
        this.image = reader.result
        console.log(reader.result)
      }

      reader.onerror = () => {
        console.log(reader.error)
      }
      return target.files
    } else {
      return null
    }
  }

  emitClick () {
    this.$refs['file-input'].click()
  }
}
</script>

<style lang="scss" scoped>

.loaded-image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .loaded-image {
    margin: 0 auto;
    width: 200px;
  }
}

.custom-file-input{
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: 'Выбрать файл';
    cursor: pointer;
    display: flex;
  }

  &::after {
    display: none;
  }
}
</style>
