<template>
  <div class="tabs">
    <div class="tabs-header">
      <div
        v-for="tab in items"
        :key="tab.id"
        class="tabs-header-item"
        :class="{ 'tabs-header-item__active': active === tab.id }"
        @click="emitClick(tab.id)"
      >
        <i :class="[ `bx bxs-${tab.icon}` ]"></i>
        <span style="margin-left: 3px;">
        {{ tab.text }}
      </span>
      </div>
    </div>
    <div class="tabs-body">
      <slot :name="active"></slot>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { ITabItem } from '~/interfaces'

@Component
export default class Tabs extends Vue {
  @Prop() active: string
  @Prop() items: ITabItem[]

  @Emit('select')
  emitClick (id: string | number) {
    return id
  }
}
</script>

<style lang="scss" scoped>

.tabs {
  background: white;
  &-body {
  }

  &-header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    &-item {
      font-size: 0.9rem;
      font-family: "Open Sans Bold", sans-serif;
      margin: 5px;
      padding: 10px;
      text-align: center;
      transition: $transition-delay;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &__active {
        background: $color-primary-transparent-10;
        color: $text-primary;
      }
      &:hover {
        background: $color-primary-transparent-10;
        border-radius: 3px;
      }
    }
  }
}
</style>
