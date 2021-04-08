<template>
  <div class="canvas-element-content" :style="contentStyle">
    {{ item.text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IContent } from '@/interfaces/presentation'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() item: IContent

  get contentStyle () {
    return {
      ...this.item.font,
      fontSize: `${this.item.font.fontSize}px`,
      fontWeight: this.item.font.bold ? '700' : 'normal',
      fontStyle: this.item.font.italic ? 'italic' : 'normal'
    }
  }
}
</script>
