<template>
  <div class="elements-table">
    <h4>Элементы слайда</h4>
    <ElementsTableItem v-for="element in getCurrentElements" :key="element.elementId" :element="element" class="elements-table__item" />
  </div>
</template>

<script lang="ts">
import ElementsTableItem from '@/components/constructor/actions/ElementsTableItem.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
import { IElement } from '~/interfaces/presentation'

@Component({
  components: {
    ElementsTableItem
  }
})
export default class ElementsList extends Vue {
  get getCurrentElements (): IElement[] {
    return PresentationModule.getActiveSlide.elements as IElement[]
  }

  get getActiveElement (): IElement {
    return PresentationModule.getActiveElement as IElement
  }
}
</script>

<style lang="scss" scoped>
.elements-table {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  max-height: 25vh;
  overflow: auto;

  &__item {
    margin-top: 5px;
  }
}
</style>
