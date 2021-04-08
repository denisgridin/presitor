<template>
  <div v-if="getActiveElement" class="presentation-section">
    <EditorLayout />
    <EditorFont />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import EditorLayout from '@/components/constructor/editor/EditorLayout.vue'
import EditorFont from '@/components/constructor/editor/EditorFont.vue'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    EditorLayout,
    EditorFont
  }
})
export default class ActionsEditor extends Vue {
  get getActiveElement () {
    return PresentationModule.getActiveElement
  }
}
</script>

<style lang="scss" scoped>
</style>
