<template>
  <div class="elements-table">
    <h4>Элементы слайда</h4>
    <ElementsTableItem v-for="element in getCurrentElements" :key="element.elementId" :element="element" />
  </div>
</template>

<script lang="ts">
import ElementsTableItem from '@/components/constructor/actions/ElementsTableItem.vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component({
  components: {
    ElementsTableItem
  }
})
export default class ElementsList extends Vue {
  get getCurrentElements () {
    return PresentationModule.getActiveSlide.elements
  }

  get getActiveElement () {
    return PresentationModule.getActiveElement
  }
}
</script>

<style lang="scss" scoped>
.elements-table {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
}
</style>
