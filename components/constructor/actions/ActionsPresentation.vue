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
        :value="currentPresentation.background"
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

  async setPresentationFontFamily (font: string) {
    console.log(font)
    await PresentationModule.editPresentation({ key: 'fontFamily', value: font })
  }

  async setPresentationColor (color: any) {
    console.log(color)
    const value = color.hexa || color
    await PresentationModule.editPresentation({ key: 'background', value: value })
  }

  async setPresentationName (e: any) {
    const name = e.target?.value
    if (name) {
      console.log(name)
      await PresentationModule.editPresentation({ key: 'name', value: name })
    }
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
