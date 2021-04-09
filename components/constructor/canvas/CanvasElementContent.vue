<template>
  <div class="canvas-element-content" :style="contentStyle" v-html="contentHTML">
    {{ element.text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IContent } from '@/interfaces/presentation'
import { CONTENT_TYPE } from '~/utils/enums'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() element: IContent

  get contentHTML () {
    if (this.element.insertion.contentType === CONTENT_TYPE.LIST) {
      return `
        <ul style="list-style-type: ${this.element.insertion.listStyle}">
          ${this.parseTextToList(this.element.text)}
        </ul>
      `
    } else {
      return `<${this.element.insertion.tag}>${this.element.text}</${this.element.insertion.tag}>`
    }
  }

  get contentStyle () {
    return {
      ...this.element.font,
      fontSize: `${this.element.font.fontSize}px`,
      fontWeight: this.element.font.bold ? '700' : 'normal',
      fontStyle: this.element.font.italic ? 'italic' : 'normal',
      lineHeight: this.element.font.lineHeight + 'px',
      letterSpacing: this.element.font.letterSpacing + 'px'
    }
  }

  parseTextToList (text: string) {
    const list = text.split('\n')
    console.log(list)
    const html = list.map(el => `<li>${el}</li>`).join('')
    console.log(html)
    return html
  }
}
</script>
