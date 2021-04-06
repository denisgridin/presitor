<template>
  <div class="content-editor">
    <div class="presentation-section__content">
      <input v-model="actions.content.text" type="text" placeholder="Текст" class="vs-input">
      <vs-button :disabled="!(!!actions.content.text)" relief>
        Добавить
      </vs-button>
    </div>
    <div class="presentation-section__content-fontFamily">
      <FontSelector v-model="actions.content.fontFamily" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component
export default class ContentEditor extends Vue {
  get currentOptions () {
    return PresentationModule.getCurrentContent
  }
}
</script>
