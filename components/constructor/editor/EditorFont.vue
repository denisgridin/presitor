<template>
  <div class="editor-font">
    <vs-alert :hidden-content.sync="hidden" shadow>
      <template #title>
        <div class="editor-title">
          <i class="bx bxs-edit-alt"></i>
          <h4>Шрифт</h4>
        </div>
      </template>
      <div class="inputs" v-if="getActiveElement.font">
        <div class="inputs-item">
          <label for="fontSize">Размер шрифта</label>
          <input
            id="fontSize"
            class="vs-input"
            type="number"
            :min="confines.font.fontSize.min"
            :max="confines.font.fontSize.max"
            :value="getCurrentFontOptions.fontSize"
            @input="(e) => setElementValue('fontSize', e.target.value)"
          >
        </div>
        <div class="inputs-item">
          <label>Семейство</label>
          <FontSelector :value="getCurrentFontOptions.fontFamily" @input="(value) => setElementValue('fontFamily', value)" />
        </div>
        <div class="inputs-item">
          <label>Выравнивание</label>
          <Selector :items="aligns" :value="getActiveElement.font.align" @input="(value) => setElementValue('align', value)" />
        </div>
        <div class="inputs-item">
          <h4>Цвет текста</h4>
          <v-color-picker
            width="250px"
            dot-size="25"
            swatches-max-height="200"
            mode="hexa"
            :value="getCurrentFontOptions.color"
            @input="(value) => setElementValue('color', value)"
          ></v-color-picker>
        </div>
        <div class="inputs-item">
          <vs-checkbox :value="getCurrentFontOptions.bold" @input="(value) => setElementValue('bold', value)">
            <template #icon>
              <i class='bx bx-bold'></i>
            </template>
            <span>Полужирный</span>
          </vs-checkbox>
          <vs-checkbox :value="getCurrentFontOptions.italic" @input="(value) => setElementValue('italic', value)">
            <template #icon>
              <i class='bx bx-italic'></i>
            </template>
            <span>Наклоненный</span>
          </vs-checkbox>
        </div>
        <div class="inputs-item">
          <label for="fontSize">Межстрочное расстояние</label>
          <input
            id="lineHeight"
            class="vs-input"
            type="number"
            :min="confines.font.lineHeight.min"
            :max="confines.font.lineHeight.max"
            :value="getCurrentFontOptions.fontSize"
            @input="(e) => setElementValue('lineHeight', e.target.value)"
          >
        </div>
        <div class="inputs-item">
          <label for="fontSize">Межбуквенное расстояние</label>
          <input
            id="letterSpacing"
            class="vs-input"
            type="number"
            :min="confines.font.letterSpacing.min"
            :max="confines.font.letterSpacing.max"
            :value="getCurrentFontOptions.letterSpacing"
            @input="(e) => setElementValue('letterSpacing', e.target.value)"
          >
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import FontSelector from '@/components/FontSelector.vue'
import Selector from '@/components/constructor/Selector.vue'
import { CONFINES, DEFAULT_ELEMENT, TEXT_ALIGNS } from '~/utils/constants'
import { IElement, IFont } from '~/interfaces/presentation'

@Component({
  components: {
    FontSelector,
    Selector
  }
})
export default class EditorFont extends Vue {
  hidden: boolean = false
  confines = CONFINES
  aligns = TEXT_ALIGNS
  updateDebounce: any = null

  get getActiveElement (): IElement {
    return PresentationModule.getActiveElement as IElement || DEFAULT_ELEMENT
  }

  get getCurrentFontOptions () {
    return this.getActiveElement?.font || DEFAULT_ELEMENT.font
  }

  setElementValue (key: string, value: any) {
    console.log(value)
    if ((CONFINES as any).font[key]) {
      if ((CONFINES as any).font[key].min < value && (CONFINES as any).font[key].max > value) {
        PresentationModule.UPDATE_ELEMENT_FONT({ key, value, slideId: this.getActiveElement?.slideId, elementId: this.getActiveElement?.elementId })
      }
    } else {
      PresentationModule.UPDATE_ELEMENT_FONT({ key, value, slideId: this.getActiveElement?.slideId, elementId: this.getActiveElement?.elementId })
    }

    const currentElement = this.getActiveElement
    clearTimeout(this.updateDebounce)
    this.updateDebounce = setTimeout(() => {
      const font = currentElement?.font as IFont
      font[key] = value
      PresentationModule.updateElementValue({
        element: currentElement,
        key: 'font',
        value: font,
        slideId: currentElement?.slideId as string,
        elementId: currentElement?.elementId as string
      })
    }, 1000)
  }
}

</script>

<style lang="scss" scoped>
.editor-font {
  .editor-title {
    display: flex;
    align-items: center;
    .bx {
      margin-left: 3px;
    }
  }

  .inputs {
    &-item {
      margin: 10px auto 0;
    }
  }
}
</style>
