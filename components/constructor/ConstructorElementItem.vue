<template>
  <div class="constructor-element-item" @click="addShape">
    <i :class="[ `bx bxs-${item.icon}` ]"></i>
    <span>{{ item.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IConstructorElementShape } from '~/interfaces'
import { PresentationModule } from '~/store/presentation'
import { FIGURE } from '~/utils/enums'
import { ILayout, IStyle } from '~/interfaces/presentation'
import { DEFAULT_ELEMENT, ELEMENT_STYLES } from '~/utils/constants'

@Component
export default class ConstructorElementItem extends Vue {
  @Prop()
  item!: IConstructorElementShape

  addShape () {
    let style = { ...ELEMENT_STYLES, zIndex: PresentationModule.getLastZIndex }
    let layout = DEFAULT_ELEMENT.layout
    switch (this.item.type) {
      case FIGURE.circle: {
        style = {
          ...style,
          borderRadius: 1000
        } as IStyle
        layout = {
          ...layout,
          width: 100,
          height: 100
        } as ILayout
        break
      }
      case FIGURE.rectangle: {
        layout = {
          ...layout,
          width: 200,
          height: 100
        } as ILayout
        break
      }
      case FIGURE.square: {
        layout = {
          ...layout,
          width: 100,
          height: 100
        } as ILayout
      }
    }
    PresentationModule.addSlideElement(
      {
        slideId: (this as any).$current('slide').slideId,
        data: {
          name: 'Графический элемент',
          figure: this.item.type,
          text: '',
          style,
          layout
        } as any
      })
  }
}
</script>

<style lang="scss" scoped>
.constructor-element-item {
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 3px;
  transition: $transition-delay;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: $color-primary-transparent-10;
    color: $text-primary;
  }

  .bx {
    font-size: 2rem;
  }
}
</style>
