<template>
  <div class="content-editor">
    <div v-if="getContentType === 'list'">
      <h4>Стиль списка</h4>
      <div class="list-style">
        <vs-radio v-for="item in listTypes" :key="item.type" :val="item.type" :value="getElementInsertion.listStyle" @input="setElementListStyle">
          {{ item.name }}
          <template #icon>
            <i class='bx' :class="item.icon" ></i>
          </template>
        </vs-radio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import { IContent } from '~/interfaces/presentation'
import { LIST_STYLE_TYPES } from '~/utils/constants'

@Component
export default class ContentEditor extends Vue {
  @Prop() content: IContent

  listTypes = Object.values(LIST_STYLE_TYPES)

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getElementInsertion () {
    return this.getActiveElement?.insertion
  }

  get getContentType () {
    return this.getElementInsertion.contentType
  }

  get currentOptions () {
    return PresentationModule.getCurrentContent
  }

  setElementListStyle (style) {
    console.log('input')
    const insertion = this.getElementInsertion
    insertion.listStyle = style
    PresentationModule.updateElementValue({ id: this.content.elementId, slideId: this.content.slideId, key: 'insertion', value: insertion })
  }
}
</script>

<style lang="scss" scoped>
.content-editor {
  .list-style {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 10px;
    margin-top: 10px;

    .vs-radio-content {
      display: flex;
      justify-content: flex-start;
    }
  }
}
</style>
