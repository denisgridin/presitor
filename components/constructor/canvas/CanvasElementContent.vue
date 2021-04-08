<template>
  <div class="canvas-element-content" :style="contentStyle">
    {{ element.text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IContent } from '@/interfaces/presentation'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() element: IContent

  get contentStyle () {
    return {
      ...this.element.font,
      fontSize: `${this.element.font.fontSize}px`,
      fontWeight: this.element.font.bold ? '700' : 'normal',
      fontStyle: this.element.font.italic ? 'italic' : 'normal'
    }
  }
}
</script>
