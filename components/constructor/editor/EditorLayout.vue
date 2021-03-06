<template>
  <div class="editor-layout">
    <vs-alert :hidden-content.sync="hidden" shadow>
      <template #title>
        <div class="editor-title">
          <i class="bx bxs-pin"></i>
          <h4>Расположение</h4>
        </div>
      </template>
      <div class="inputs">
        <div class="inputs-item">
          <label for="x">Координаты по X</label>
          <input id="x" class="vs-input" type="number" :value="getCurrentLayout.x" @input="(e) => setElementValue('x', e)">
        </div>
        <div class="inputs-item">
          <label for="y">Координаты по Y</label>
          <input id="y" class="vs-input" type="number" :value="getCurrentLayout.y" @input="(e) => setElementValue('y', e)">
        </div>
        <div class="inputs-item">
          <label for="width">Ширина</label>
          <input id="width" class="vs-input" type="number" :value="getCurrentLayout.width" @input="(e) => setElementValue('width', e)">
        </div>
        <div class="inputs-item">
          <label for="height">Высота</label>
          <input id="height" class="vs-input" type="number" :value="getCurrentLayout.height" @input="(e) => setElementValue('height', e)">
        </div>
        <div class="inputs-item">
          <label for="rotation">Угол поворота</label>
          <input id="rotation" class="vs-input" type="number" :value="getCurrentLayout.rotation" @input="(e) => setElementValue('rotation', e)">
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { IElement, ILayout } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
const cloneDeep = require('lodash.clonedeep')

@Component
export default class EditorLayout extends Vue {
  hidden: boolean = false
  updateDebounce: any = null
  get getActiveElement (): IElement {
    return PresentationModule.getActiveElement as IElement
  }

  get getCurrentLayout (): ILayout | undefined {
    return PresentationModule.getActiveElement?.layout ? PresentationModule.getActiveElement?.layout : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    } as ILayout
  }

  setElementValue (key: string, event: any) {
    console.log(event.target.value)
    const layout = this.getActiveElement?.layout
    if (layout) {
      layout[key] = +event.target.value
      PresentationModule.UPDATE_ELEMENT_VALUE(
        {
          key: 'layout',
          value: cloneDeep(layout),
          slideId: this.getActiveElement?.slideId,
          elementId: this.getActiveElement?.elementId
        })
      const currentElement = this.getActiveElement
      clearTimeout(this.updateDebounce)
      this.updateDebounce = setTimeout(() => {
        PresentationModule.updateElementValue(
          {
            key: 'layout',
            value: cloneDeep(layout),
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
.editor-layout {
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
