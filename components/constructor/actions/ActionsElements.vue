<template>
  <div>
    <div class="presentation-section presentation-section__shapes">
      <h4>Фигуры</h4>
      <ConstructorElements />
    </div>
    <div class="presentation-section">
      <h4>Контент</h4>
      <div class="presentation-section__content">
        <input v-model="actions.content" type="text" placeholder="Текст" class="vs-input">
        <vs-button :disabled="!(!!actions.content)" relief>
          Добавить
        </vs-button>
      </div>
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

@Component({
  data: () => {
    return {
      actions: {
        content: '',
        shape: null
      }
    }
  },
  components: {
    FileInput
  }
})
export default class ActionsElements extends Vue {
}

</script>
