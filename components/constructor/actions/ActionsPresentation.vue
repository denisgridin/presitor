<template>
  <div class="presentation-section">
    <div class="presentation-section__item">
      <h4>Название презентации</h4>
      <input
        :value="currentPresentation.name"
        type="text"
        placeholder="Название"
        class="vs-input"
        @input="setPresentationName"
      >
    </div>
    <div class="presentation-section__item">
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
    <div>
      <h4>Шрифт презентации</h4>
      <FontSelector :value="currentPresentation.fontFamily" @input="setPresentationFontFamily" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FontSelector from '@/components/FontSelector.vue'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    FontSelector
  }
})
export default class ActionsPresentation extends Vue {
  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  setPresentationFontFamily (font: string) {
    console.log(font)
    PresentationModule.UPDATE_PRESENTATION_FIELD({ key: 'fontFamily', value: font })
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

<style lang="scss" scoped>
.presentation-section__item {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid $grey-2;
}
</style>
