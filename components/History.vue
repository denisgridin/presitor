<template>
  <div class="history">
    <div class="handler handler-left" :class="{ 'handler-blur': isLocked.left }" @click="changeHistoryCursor('left')">
      <i class="bx bxs-left-arrow-square"></i>
    </div>
    <h2 class="history-title">История</h2>
    <div class="handler handler-right" :class="{ 'handler-blur': isLocked.right}" @click="changeHistoryCursor('right')">
      <i class="bx bxs-right-arrow-square"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component
export default class History extends Vue {
  get getHistory () {
    return PresentationModule.getHistory
  }

  get isLocked () {
    if (this.getHistory.items.length > 0) {
      const index = this.getHistory.index
      return {
        index,
        left: index === 0,
        right: index === this.getHistory.items.length - 1
      }
    } else {
      return {
        index: -1,
        left: true,
        right: true
      }
    }
  }

  changeHistoryCursor (flag: string) {
    const index = flag === 'right' ? this.getHistory.index + 1 : this.getHistory.index - 1
    console.log(index)
    if ((!this.isLocked.left && flag === 'left') || (!this.isLocked.right && flag === 'right')) {
      PresentationModule.setHistoryCursor(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &-title {
    margin: 0 10px;
  }

  .handler {
    width: 70px;
    height: 70px;
    border-radius: $border-radius;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    &-blur {
      opacity: 0.8;
      cursor: not-allowed;
    }

    &:hover {
      background: $color-primary-transparent-10;
    }
  }
}
</style>
