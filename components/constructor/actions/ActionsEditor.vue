<template>
  <div>
    <History />
    <ElementsTable v-if="getCurrentElements.length" />
    <div v-if="getActiveElement" class="presentation-section" :style="actionsStyle">
      <EditorCommon />
      <EditorLayout />
      <EditorFont />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import EditorLayout from '@/components/constructor/editor/EditorLayout.vue'
import EditorCommon from '@/components/constructor/editor/EditorCommon.vue'
import EditorFont from '@/components/constructor/editor/EditorFont.vue'
import ElementsTable from '@/components/constructor/actions/ElementsTable.vue'
import History from '@/components/History'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    EditorLayout,
    EditorFont,
    EditorCommon,
    ElementsTable,
    History
  }
})
export default class ActionsEditor extends Vue {
  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getCurrentElements () {
    return PresentationModule.getActiveSlide.elements
  }

  get actionsStyle () {
    return {
      maxHeight: this.getActiveElement ? '60vh' : 'calc(100vh - 200px)'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
