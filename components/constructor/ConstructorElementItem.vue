<template>
  <div class="constructor-element-item">
    <i :class="[ `bx bxs-${item.icon}` ]"></i>
    <span>{{ item.name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IConstructorElementShape } from '~/interfaces'

@Component
export default class ConstructorElementItem extends Vue {
  @Prop() item: IConstructorElementShape
}
</script>

<style lang="scss" scoped>
.constructor-element-item {
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 5px;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 3px;
  transition: $transition-delay;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: $color-primary-transparent-10;
    color: $text-primary;
  }

  .bx {
    font-size: 2rem;
  }
}
</style>
