<template>
  <div class="presentation-actions">
    <Tabs
      :items="tabActions"
      :active="currentTab"
      @select="setActiveTab"
    >
      <template #elements>
        <ActionsElements />
      </template>
      <template #presentation>
        <ActionsPresentation />
      </template>
      <template #editor>
        <ActionsEditor />
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ACTION_TAB } from '@/utils/enums'
import Tabs from '@/components/Tabs'
import ActionsElements from '@/components/constructor/actions/ActionsElements'
import ActionsPresentation from '@/components/constructor/actions/ActionsPresentation'
import ActionsEditor from '@/components/constructor/actions/ActionsEditor'
import { CONSTRUCTOR_TAB_ACTIONS } from '~/utils/constants'

import { PresentationModule } from '~/store/presentation'

@Component({
  data: () => {
    return {
      currentTab: ACTION_TAB.ELEMENTS,
      tabActions: CONSTRUCTOR_TAB_ACTIONS
    }
  },
  components: {
    Tabs,
    ActionsElements,
    ActionsPresentation,
    ActionsEditor
  }
})
export default class PresentationActions extends Vue {
  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  setActiveTab (id) {
    console.log(id)
    this.currentTab = id
  }
}
</script>

<style lang="scss">
.presentation-actions {
  margin: 20px 5px;
  padding: 0 10px;
  .presentation-section {
    overflow: auto;

    h4 {
      margin: 5px 10px;
    }
    padding: 10px;
    border-top: 1px solid $grey-2;
    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .vs-input {
        width: 150px;
        height: 45px;
      }

      &-fontFamily {
        margin-top: 5px;
      }
    }
  }
}

</style>
