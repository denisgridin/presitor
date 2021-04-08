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

@Component
export default class EditorLayout extends Vue {
  hidden: boolean = false

  get getActiveElement (): IElement {
    return PresentationModule.getActiveElement
  }

  get getCurrentLayout (): ILayout | null {
    return PresentationModule.getActiveElement?.layout
  }

  setElementValue (key: string, event: Event) {
    console.log(event.target.value)
    PresentationModule.UPDATE_ELEMENT_LAYOUT({ key, value: event.target.value, slideId: this.getActiveElement?.slideId, elementId: this.getActiveElement?.elementId })
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
