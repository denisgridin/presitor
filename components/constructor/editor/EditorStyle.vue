<template>
  <div class="editor-style">
    <vs-alert :hidden-content.sync="hidden" shadow>
      <template #title>
        <div class="editor-title">
          <i class="bx bxs-pin"></i>
          <h4>Стили</h4>
        </div>
      </template>
      <div class="inputs">
        <div class="inputs-item">
          <label for="backgroundColor">Цвет заднего фона</label>
          <v-color-picker
            width="250px"
            dot-size="25"
            swatches-max-height="200"
            mode="hexa"
            :value="getCurrentStyle.backgroundColor"
            @input="(val) => setElementValue('backgroundColor', val.hexa, val)"
          ></v-color-picker>
          <input id="backgroundColor" class="vs-input" type="number" :value="getCurrentStyle.backgroundColor" @input="(e) => setElementValue('backgroundColor', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="boxShadow">Тень</label>
          <input id="boxShadow" class="vs-input" type="number" :value="getCurrentStyle.boxShadow" @input="(e) => setElementValue('boxShadow', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="opacity">Прозрачность</label>
          <input id="opacity" class="vs-input" type="number" :value="getCurrentStyle.opacity" @input="(e) => setElementValue('opacity', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderColor">Цвет рамки</label>
          <input id="borderColor" class="vs-input" type="number" :value="getCurrentStyle.borderColor" @input="(e) => setElementValue('borderColor', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderRadius">Закругление краев</label>
          <input id="borderRadius" class="vs-input" type="number" :value="getCurrentStyle.borderRadius" @input="(e) => setElementValue('borderRadius', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderWidth">Раземер рамки</label>
          <input id="borderWidth" class="vs-input" type="number" :value="getCurrentStyle.borderWidth" @input="(e) => setElementValue('borderWidth', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderStyle">Стиль рамки</label>
          <input id="borderStyle" class="vs-input" type="number" :value="getCurrentStyle.borderStyle" @input="(e) => setElementValue('borderStyle', +e.target.value)">
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { IElementType, IStyle } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
const cloneDeep = require('lodash.clonedeep')
@Component
export default class EditorStyle extends Vue {
  hidden: boolean = false
  updateDebounce: any = null
  get getActiveElement (): IElementType {
    return PresentationModule.getActiveElement as IElementType
  }

  get getCurrentStyle (): IStyle | undefined {
    return PresentationModule.getActiveElement?.style
  }

  setElementValue (key: string, val: any, data: any) {
    console.log(data)
    const value = val || data
    console.log(`key: ${key}, value: `, value)
    const style = this.getActiveElement.style as IStyle
    if (value) {
      style[key] = value
      PresentationModule.UPDATE_ELEMENT_VALUE(
        {
          key: 'style',
          value: cloneDeep(style),
          slideId: this.getActiveElement?.slideId,
          elementId: this.getActiveElement?.elementId
        })
      const currentElement = this.getActiveElement
      clearTimeout(this.updateDebounce)
      this.updateDebounce = setTimeout(() => {
        PresentationModule.updateElementValue(
          {
            key: 'style',
            value: cloneDeep(style),
            slideId: currentElement?.slideId,
            elementId: currentElement?.elementId,
            element: currentElement
          })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-style {
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
