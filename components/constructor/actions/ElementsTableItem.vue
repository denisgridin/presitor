<template>
  <div
    class="elements-table-item"
    :class="{ 'elements-table-item__active': isSelected }"
    @mouseover="setHoverElement(element.elementId)"
    @mouseleave="setHoverElement(null)"
    @click="setActiveElement"
  >
    <i class="bx" :class="getIconClass"></i>
    <span>{{ element.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IContent } from '~/interfaces/presentation'
import { ELEMENT_TYPE } from '~/utils/enums'
import { PresentationModule } from '~/store/presentation'

@Component
export default class ElementsTableItem extends Vue {
  @Prop() element: IContent

  get isSelected () {
    return this.getActiveElement?.elementId === this.element.elementId
  }

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }

  get getIconClass () {
    switch (this.element.elementType) {
      case ELEMENT_TYPE.CONTENT: {
        return 'bx-text'
      }
    }
  }

  setHoverElement (id) {
    PresentationModule.SET_HOVER_ELEMENT({ id })
  }

  setActiveElement () {
    console.log('click', { key: this.element.elementId, type: this.element.elementType })
    PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: this.element.elementId, type: this.element.elementType })
  }
}
</script>

<style lang="scss" scoped>
.elements-table-item {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 5px;
  padding: 5px;
  align-items: center;
  transition: $transition-delay;
  border-radius: $border-radius;
  cursor: pointer;

  &:hover {
    background: $color-primary-transparent-10;
  }

  &__active {
    background: $color-primary-transparent-30;
    color: $text-primary;
  }
}
</style>
