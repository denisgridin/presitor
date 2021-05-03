<template>
  <div>
    <div
      v-if="disabled"
      ref="input"
      class="canvas-element-content"
      :style="contentStyle"
      v-html="contentHTML"
    >
      {{ elementText }}
    </div>
    <div
      v-else
      ref="input"
      class="canvas-element-content"
      :contenteditable="isContentEditable"
      :style="contentStyle"
      @blur="setElementText"
      @input="editElementText"
      @dblclick="setContentEditable(true)"
      v-html="contentHTML"
    >
      {{ element.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { CONTENT_TYPE } from '~/utils/enums'
import { PresentationModule } from '~/store/presentation'
import { IElement } from '~/interfaces/presentation'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() element: IElement
  @Prop({ default: false }) readonly disabled: boolean

  text: string = ''
  isContentEditable: boolean = false

  mounted () {
    this.text = this.element.text?.trim() || ''
  }

  get elementText () {
    return this.element.text?.trim() || ''
  }

  get contentHTML () {
    if (this.element.insertion) {
      if (this.element.insertion.contentType === CONTENT_TYPE.LIST) {
        return `
        <ul style="list-style-type: ${this.element.insertion.listStyle}">
          ${this.parseTextToList(this.element.text)}
        </ul>
      `
      } else {
        return `<${this.element.insertion.tag}>${this.element.text?.trim() || ''}</${this.element.insertion.tag}>`
      }
    } else {
      return ''
    }
  }

  get contentStyle () {
    const f = this.element.font
    if (f) {
      return {
        ...this.element.font,
        fontSize: `${this.element.font.fontSize}px`,
        fontWeight: this.element.font.bold ? '700' : 'normal',
        fontStyle: this.element.font.italic ? 'italic' : 'normal',
        lineHeight: this.element.font.lineHeight + 'px',
        letterSpacing: this.element.font.letterSpacing + 'px',
        textAlign: this.element.font.align
      }
    } else {
      return {}
    }
  }

  parseTextToList (text: string) {
    const list = text.split('\n')
    console.log(list)
    const html = list.map((el: string) => {
      if (el) {
        return `<li>${el}</li>`
      } else {
        return ''
      }
    }).join('')
    console.log(html)
    return html
  }

  editElementText (event: any) {
    const value = event.target.innerText
    this.text = value
    console.log(value)
  }

  setElementText () {
    PresentationModule.updateElementValue({
      elementId: this.element.elementId,
      slideId: this.element.slideId,
      key: 'text',
      value: this.text,
      element: this.element
    })
    this.setContentEditable(false)
  }

  setContentEditable (flag: boolean) {
    this.isContentEditable = flag

    if (flag) {
      setTimeout(() => {
        (this as any).$refs.input.focus()
      }, 0)
    }
  }
}
</script>
