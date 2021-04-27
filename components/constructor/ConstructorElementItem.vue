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
import { ELEMENT_TYPE } from '~/utils/enums'

@Component
export default class ConstructorElementItem extends Vue {
  @Prop() item: IConstructorElementShape

  addShape () {
    PresentationModule.addSlideElement({ slideId: (this as any).$current('slide').slideId, data: { elementType: ELEMENT_TYPE.CONTENT, name: 'Графический элемент', figure: this.item.type } })
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
