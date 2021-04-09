<template>
  <div>
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
      <div class="presentation-section__image">
        <FileInput />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileInput from '@/components/FileInput.vue'
import ContentSelector from '@/components/constructor/content/ContentSelector.vue'

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
    FileInput,
    ContentSelector
  }
})
export default class ActionsElements extends Vue {
}

</script>
