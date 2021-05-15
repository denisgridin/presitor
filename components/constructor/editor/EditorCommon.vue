<template>
  <div class="editor-common">
    <vs-alert :hidden-content.sync="hidden" shadow>
      <template #title>
        <div class="editor-title">
          <i class="bx bxs-edit-alt"></i>
          <h4>Общие</h4>
        </div>
      </template>
      <div class="inputs">
        <div class="inputs-item">
          <label for="name">Имя</label>
          <input
            id="name"
            type="text"
            class="vs-input"
            :value="getCurrentCommonConfig.name"
            @input="(e) => setElementValue('name', e.target.value)"
          >
        </div>
        <div class="inputs-item" v-if="!isImage">
          <label for="inner">Наполнение</label>
          <textarea
            id="inner"
            class="vs-input"
            name="inner"
            cols="30"
            rows="10"
            :value="getCurrentCommonConfig.text"
            @input="(e) => setElementValue('text', e.target.value)"
          ></textarea>
        </div>
        <div class="inputs-item">
          <ContentEditor :content="getActiveElement" />
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContentEditor from '@/components/constructor/content/ContentEditor.vue'
import { PresentationModule } from '@/store/presentation'
import { IFont } from '~/interfaces/presentation'

@Component({
  components: {
    ContentEditor
  }
})
export default class EditorCommon extends Vue {
  hidden: boolean = false
  updateDebounce: any = null

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get isImage () {
    return this.getActiveElement?.style.background?.includes('url')
  }

  get getCurrentCommonConfig () {
    const element = this.getActiveElement
    return {
      text: element?.text,
      name: element?.name
    }
  }

  setElementValue (key: string, value: any) {
    PresentationModule.UPDATE_ELEMENT_VALUE({ key, value, slideId: this.getActiveElement?.slideId as string, elementId: this.getActiveElement?.elementId as string })

    clearTimeout(this.updateDebounce)
    this.updateDebounce = setTimeout(() => {
      PresentationModule.updateElementValue({ key, value, slideId: this.getActiveElement?.slideId as string, elementId: this.getActiveElement?.elementId as string })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.editor-common {
  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

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
