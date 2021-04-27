<template>
  <div :style="getShapeStyle">
    <div
      v-if="disabled"
      ref="input"
      class="canvas-element-content"
      :style="contentStyle"
      v-html="contentHTML"
    >
      {{ element.text.trim() }}
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
import { IContent, IShape } from '@/interfaces/presentation'
import { CONTENT_TYPE } from '~/utils/enums'
import { PresentationModule } from '~/store/presentation'

@Component
export default class CanvasElementContent extends Vue {
  @Prop() element: IShape
  @Prop({ default: false }) readonly disabled: boolean

  text: string = ''
  isContentEditable: boolean = false

  mounted () {
    this.text = this.element.text.trim()
  }

  get getShapeStyle () {
    const s = this.element.style
    return {
      // backgroundColor: s.fillColor,
      // boxShadow: s.boxShadow,
      // opacity: s.opacity,
      // borderColor: s.borderColor,
      // borderRadius: s.borderRadius,
      // borderWidth: s.borderWidth,
      // borderStyle: s.borderStyle
    }
  }

  get contentHTML () {
    if (this.element.insertion.contentType === CONTENT_TYPE.LIST) {
      return `
        <ul style="list-style-type: ${this.element.insertion.listStyle}">
          ${this.parseTextToList(this.element.text)}
        </ul>
      `
    } else {
      return `<${this.element.insertion.tag}>${this.element.text.trim()}</${this.element.insertion.tag}>`
    }
  }

  get contentStyle () {
    return {
      ...this.element.font,
      fontSize: `${this.element.font.fontSize}px`,
      fontWeight: this.element.font.bold ? '700' : 'normal',
      fontStyle: this.element.font.italic ? 'italic' : 'normal',
      lineHeight: this.element.font.lineHeight + 'px',
      letterSpacing: this.element.font.letterSpacing + 'px',
      textAlign: this.element.font.align
    }
  }

  parseTextToList (text: string) {
    const list = text.split('\n')
    console.log(list)
    const html = list.map((el) => {
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
        this.$refs.input.focus()
      }, 0)
    }
  }
}
</script>
