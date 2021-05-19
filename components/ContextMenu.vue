<template>
  <transition name="fade">
    <div
      v-click-outside="close"
      class="context-menu"
      :style="style"
    >
      <template>
        <a
          v-for="(item, i) in getContextMenu.items"
          :key="i"
          class="item"
          @click="onItemClick(item.handler)">
          <i v-show="item.icon" class="bx" :class="item.icon"></i>
          <div class="text">{{ item.text }}</div>
        </a>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CommonModule } from '~/store/common'

@Component
export default class ContextMenu extends Vue {
  @Prop({ default: 160 })
  width!: string

  isVisible: boolean = false

  get style () {
    return {
      minWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
      left: this.getContextMenu.coords.x + 'px',
      top: this.getContextMenu.coords.y + 'px',
      display: this.getContextMenu.active ? 'block' : 'none'
    }
  }

  close () {
    console.log('close')
    if (CommonModule.getContextMenu.active) {
      CommonModule.SET_CONTEXT_MENU_OPTIONS({
        event: {
          pageX: 0,
          pageY: 0
        },
        items: [],
        active: false
      })
    }
  }

  onItemClick (handler: () => void) {
    handler()
    this.close()
  }

  get getContextMenu () {
    return CommonModule.getContextMenu
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: $border-radius;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  position: fixed;
  white-space: nowrap;
  z-index: 1000;

  .item {
    align-items: center;
    color: #333;
    cursor: pointer;
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 10px;
    padding: 5px 10px;
    text-decoration: none;

    &:hover {
      background: #f5f5f5;
      color: #333;
      text-decoration: inherit;
    }

    &:focus {
      background: $color-primary;
      color: #fff;
    }

    &_disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .text {
      flex: 1;
    }
  }
}
</style>
