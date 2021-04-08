<template>
  <transition name="fade">
    <div
      v-show="isVisible"
      v-click-outside="close"
      class="context-menu"
      :style="style">
      <template>
        <a
          v-for="(item, i) in filteredItems"
          :key="i"
          class="item"
          :class="itemClassNames(item)"
          @click="item.handler"
          @mousedown="close">
          <div v-show="item.icon" class="icon">{{ item.icon }}</div>
          <div class="text">{{ item.text }}</div>
        </a>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ContextMenu extends Vue {
  @Prop() coords
  @Prop() items
  @Prop({ default: 160 }) width

  isVisible: boolean = false
  x: number = 0
  y: number = 0

  get style () {
    return {
      left: this.x + 'px',
      minWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
      top: this.y + 'px'
    }
  }

  close () {
    this.isVisible = false
  }

  open (event) {
    this.isVisible = true
    this.x = event.pageX
    this.y = event.pageY
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
  z-index: 1;

  .item {
    align-items: center;
    color: #333;
    cursor: pointer;
    display: flex;
    padding: 7px 24px;
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
