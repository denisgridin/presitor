<template>
  <div>
    <ElementsTable v-if="getCurrentElements.length" />
    <div v-if="getActiveElement" class="presentation-section">
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
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    EditorLayout,
    EditorFont,
    EditorCommon,
    ElementsTable
  }
})
export default class ActionsEditor extends Vue {
  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getCurrentElements () {
    return PresentationModule.getActiveSlide.elements
  }
}
</script>

<style lang="scss" scoped>
</style>
