<template>
  <div class="constructor-elements">
    <ConstructorElementItem
      v-for="item in constructorItems"
      :key="item.type"
      :item="item">
    </ConstructorElementItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CONSTRUCTOR_ELEMENTS } from '~/utils/constants'

@Component({
  data: () => {
    return {
      constructorItems: CONSTRUCTOR_ELEMENTS
    }
  }
})
export default class ConstructorElements extends Vue {

}
</script>

<style lang="scss" scoped>
.constructor-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}
</style>
