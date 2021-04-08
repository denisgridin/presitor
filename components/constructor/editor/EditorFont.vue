<template>
  <div class="editor-font">
    <vs-alert :hidden-content.sync="hidden" shadow>
      <template #title>
        <div class="editor-title">
          <i class="bx bxs-edit-alt"></i>
          <h4>Шрифт</h4>
        </div>
      </template>
      <div class="inputs">
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
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import FontSelector from '@/components/FontSelector.vue'
import { CONFINES } from '~/utils/constants'

@Component({
  components: {
    FontSelector
  }
})
export default class EditorFont extends Vue {
  hidden: boolean = false
  confines: CONFINES = CONFINES

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getCurrentFontOptions () {
    return this.getActiveElement?.font
  }

  setElementValue (key: string, value: any) {
    console.log(value)
    if (CONFINES.font[key]) {
      if (CONFINES.font[key].min < value && CONFINES.font[key].max > value) {
        PresentationModule.UPDATE_ELEMENT_FONT({ key, value, slideId: this.getActiveElement?.slideId, elementId: this.getActiveElement?.elementId })
      }
    } else {
      PresentationModule.UPDATE_ELEMENT_FONT({ key, value, slideId: this.getActiveElement?.slideId, elementId: this.getActiveElement?.elementId })
    }
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
