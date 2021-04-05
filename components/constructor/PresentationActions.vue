<template>
  <div class="presentation-actions">
    <Tabs
      :items="tabActions"
      :active="currentTab"
      @select="setActiveTab"
    >
      <template #elements>
        <h4 class="title-elements">Фигуры</h4>
        <ConstructorElements />
      </template>
      <template #feedback>
        321
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ACTION_TAB } from '@/utils/enums'
import Tabs from '@/components/Tabs'
import { CONSTRUCTOR_TAB_ACTIONS } from '~/utils/constants'

@Component({
  data: () => {
    return {
      currentTab: ACTION_TAB.ELEMENTS,
      tabActions: CONSTRUCTOR_TAB_ACTIONS
    }
  },
  components: {
    Tabs
  }
})
export default class PresentationActions extends Vue {
  setActiveTab (id) {
    console.log(id)
    this.currentTab = id
  }
}
</script>

<style lang="scss" scoped>
.presentation-actions {
  margin: 20px 5px;

  .title {
    &-elements {
      margin: 5px 10px;
    }
  }
}

</style>
