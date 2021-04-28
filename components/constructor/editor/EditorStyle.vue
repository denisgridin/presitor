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
            id="backgroundColor"
            width="250px"
            dot-size="25"
            swatches-max-height="200"
            mode="hexa"
            :value="getCurrentStyle.backgroundColor"
            @input="(val) => setElementValue('backgroundColor', val.hexa, val)"
          ></v-color-picker>
        </div>
        <div class="inputs-item">
          <label for="boxShadow">Тень</label>
          <ShadowPicker id="boxShadow" :value="parseBoxShadow(getCurrentStyle.boxShadow)" @input="(val) => setElementValue('boxShadow', buildShadow(val))" />
        </div>
        <div class="inputs-item">
          <label for="opacity">Прозрачность</label>
          <input id="opacity" class="vs-input" type="number" min="0" max="1" step="0.1" :value="getCurrentStyle.opacity" @input="(e) => setElementValue('opacity', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderColor">Цвет рамки</label>
          <v-color-picker
            id="borderColor"
            width="250px"
            dot-size="25"
            swatches-max-height="200"
            mode="hexa"
            :value="getCurrentStyle.borderColor"
            @input="(val) => setElementValue('borderColor', val.hexa, val)"
          ></v-color-picker>
        </div>
        <div class="inputs-item">
          <label for="borderWidth">Размер рамки</label>
          <input id="borderWidth" class="vs-input" type="number" min="0" :value="getCurrentStyle.borderWidth" @input="(e) => setElementValue('borderWidth', +e.target.value)">
        </div>
        <div class="inputs-item">
          <label for="borderStyle">Стиль рамки</label>
          <vs-select placeholder="Выберете стиль рамки" :value="getCurrentStyle.borderStyle" @input="(val) => setElementValue('borderStyle', val)">
            <vs-option v-for="(style, index) in borderStyles" :key="index" :label="style.text" :value="style.value">
              {{ style.text }}
            </vs-option>
          </vs-select>
        </div>
        <div class="inputs-item">
          <label for="borderRadius">Закругление краев</label>
          <input id="borderRadius" class="vs-input" type="number" min="0" :value="getCurrentStyle.borderRadius" @input="(e) => setElementValue('borderRadius', +e.target.value)">
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { IElementType, IStyle } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
import ShadowPicker from '~/components/constructor/actions/ShadowPicker'
import { BORDER_STYLE } from '~/utils/enums'
import { BORDER_STYLES } from '~/utils/constants'

const cloneDeep = require('lodash.clonedeep')
@Component({
  components: {
    ShadowPicker
  }
})
export default class EditorStyle extends Vue {
  hidden: boolean = false
  updateDebounce: any = null
  borderStyles = BORDER_STYLES
  get getActiveElement (): IElementType {
    return PresentationModule.getActiveElement as IElementType
  }

  get getCurrentStyle (): IStyle {
    const style = PresentationModule.getActiveElement?.style as IStyle || {} as IStyle
    style.borderWidth = style.borderWidth || 0
    style.borderColor = style.borderColor || 'transparent'
    style.borderRadius = style.borderRadius || 0
    style.borderStyle = style.borderStyle || BORDER_STYLE.SOLID
    return style
  }

  parseBoxShadow (val: string) {
    console.log('val', val)
    if (val) {
      const s = val.split(' ')
      return {
        x: +s[0].replace('px', ''),
        y: +s[1].replace('px', ''),
        blur: +s[2].replace('px', ''),
        spread: +s[3].replace('px', ''),
        color: s[4]
      }
    } else {
      return {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: 0
      }
    }
  }

  buildShadow ({ x, y, blur, spread, color }: { x: number, y: number, blur: number, spread: number, color: string }) {
    console.log(`${x || 0}px ${y || 0}px ${blur || 0}px ${spread || 0}px ${color}`)
    return `${x || 0}px ${y || 0}px ${blur || 0}px ${spread || 0}px ${color}`
  }

  setElementValue (key: string, val: any, data?: any) {
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
