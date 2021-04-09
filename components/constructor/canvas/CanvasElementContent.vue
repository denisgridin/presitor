<template>
  <div
    ref="input"
    class="canvas-element-content"
    :contenteditable="isContentEditable"
    :style="contentStyle"
    @input="editElementText"
    @blur="setElementText"
    @dblclick="setContentEditable(true)"
    v-html="contentHTML"
  >
    {{ element.text }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IContent } from '@/interfaces/presentation'
import { CONTENT_TYPE } from '~/utils/enums'
import { PresentationModule } from '~/store/presentation'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() element: IContent

  text: string = ''
  isContentEditable: boolean = false

  mounted () {
    this.text = this.element.text
  }

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
    const html = list.map(el => {
      if (el) {
        return `<li>${el}</li>`
      } else {
        return ''
      }
    }).join('')
    console.log(html)
    return html
  }

  editElementText (event) {
    const value = event.target.innerText
    this.text = value
    console.log(value)
  }

  setElementText () {
    PresentationModule.updateElementValue({ elementId: this.element.elementId, slideId: this.element.slideId, key: 'text', value: this.text })
    this.setContentEditable(false)
  }

  setContentEditable (flag: boolean) {
    this.isContentEditable = flag

    if (flag) {
      setTimeout(() => {
        this.$refs.input.focus()
      }, 0)
    }
  }
}
</script>
