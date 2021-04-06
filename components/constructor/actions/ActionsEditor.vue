<template>
  <div v-if="getActiveElement" class="presentation-section">
    <EditorLayout />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import EditorLayout from '@/components/constructor/editor/EditorLayout.vue'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    EditorLayout
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
