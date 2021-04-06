<template>
  <div class="presentation-actions">
    <Tabs
      :items="tabActions"
      :active="currentTab"
      @select="setActiveTab"
    >
      <template #elements>
        <div class="presentation-section presentation-section__shapes">
          <h4>Фигуры</h4>
          <ConstructorElements />
        </div>
        <div class="presentation-section">
          <h4>Контент</h4>
          <div class="presentation-section__content">
            <input v-model="actions.content" type="text" placeholder="Текст" class="vs-input">
            <vs-button :disabled="!(!!actions.content)" relief>
              Добавить
            </vs-button>
          </div>
        </div>
        <div class="presentation-section">
          <h4>Изображение</h4>
          <div class="presentation-section__image">
            <FileInput />
          </div>
        </div>
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
import FileInput from '@/components/FileInput.vue'

@Component({
  data: () => {
    return {
      currentTab: ACTION_TAB.ELEMENTS,
      tabActions: CONSTRUCTOR_TAB_ACTIONS,
      actions: {
        content: '',
        shape: null
      }
    }
  },
  components: {
    Tabs,
    FileInput
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

  .presentation-section {
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
    }
  }
}

</style>
