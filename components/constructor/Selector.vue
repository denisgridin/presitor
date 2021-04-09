<template>
  <div class="selector">
    <vs-tooltip v-for="item in items" :key="item.id">
      <div
        class="selector-item"
        :class="{ 'selector-item__active': isSelected(item.value) }"
        @click="selectItem(item.value)"
      >
        <i class="bx" :class="item.icon"></i>
      </div>
      <template #tooltip>
        {{ item.tooltip }}
      </template>
    </vs-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { ISelectorItem } from '~/interfaces'

@Component
export default class Selector extends Vue {
  @Prop({ required: true, type: Array }) items: ISelectorItem[]
  @Prop({ required: true }) value: any

  isSelected (value) {
    return value === this.value
  }

  @Emit('input')
  selectItem (value) {
    return value
  }
}
</script>

<style lang="scss" scoped>
.selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  grid-gap: 5px;

  &-item {
    padding: 5px;
    border-radius: $border-radius;
    transition: $transition-delay;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &__active {
      background: $color-primary-transparent-30;
    }

    &:hover {
      background: $color-primary-transparent-10;
    }

    .vs-tooltip-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
