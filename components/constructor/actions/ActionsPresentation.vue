<template>
  <div class="presentation-section">
    <div>
      <h4>Название презентации</h4>
      <input
        :value="currentPresentation.name"
        type="text"
        placeholder="Название"
        class="vs-input"
        @input="setPresentationName"
      >
    </div>
    <div>
      <h4>Цвет фона</h4>
      <v-color-picker
        width="250px"
        dot-size="25"
        swatches-max-height="200"
        mode="hexa"
        :value="currentPresentation.fillColor"
        @input="setPresentationColor"
      ></v-color-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component()
export default class ActionsPresentation extends Vue {
  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  setPresentationColor (color: string) {
    console.log(color)
    PresentationModule.UPDATE_PRESENTATION_FIELD({ key: 'fillColor', value: color })
  }

  setPresentationName (e: Event) {
    const name = e.target.value
    console.log(name)
    PresentationModule.UPDATE_PRESENTATION_FIELD({ key: 'name', value: name })
  }
}
</script>
