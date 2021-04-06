<template>
  <div class="editor-layout">
    <h4>Редактирование расположения</h4>
    <div class="inputs">
      <div class="inputs-item">
        <label for="x">Координаты по X</label>
        <input id="x" class="vs-input" type="number" :value="getCurrentLayout.x">
      </div>
      <div class="inputs-item">
        <label for="y">Координаты по Y</label>
        <input id="y" class="vs-input" type="number" :value="getCurrentLayout.y">
      </div>
      <div class="inputs-item">
        <label for="width">Ширина</label>
        <input id="width" class="vs-input" type="number" :value="getCurrentLayout.width">
      </div>
      <div class="inputs-item">
        <label for="height">Высота</label>
        <input id="height" class="vs-input" type="number" :value="getCurrentLayout.height">
      </div>
      <div class="inputs-item">
        <label for="rotation">Угол поворота</label>
        <input id="rotation" class="vs-input" type="number" :value="getCurrentLayout.rotation">
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { ILayout } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'

@Component
export default class EditorLayout extends Vue {
  get getCurrentLayout (): ILayout | null {
    return PresentationModule.getActiveElement?.layout
  }
}
</script>

<style lang="scss" scoped>
.editor-layout {
  .inputs {

    &-item {
      margin: 0 auto;
    }
  }
}
</style>
