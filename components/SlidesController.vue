<template>
  <div class="controller">
    <div class="controller-button" @click="setSlidePosition(-1)">
      <i class="bx bx-left-arrow-circle"></i>
    </div>
    <div class="controller-button" style="pointer-events: none">
      <span ref="slide-input">{{ slideIndex }}</span>
    </div>
    <div class="controller-button" @click="setSlidePosition(1)">
      <i class="bx bx-right-arrow-circle"></i>
    </div>
    <div class="controller-button" @click="exit">
      <i class="bx bx-exit-fullscreen"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'

@Component
export default class SlidesController extends Vue {
  get slideIndex () {
    return PresentationModule.currentPresentation.slides.findIndex(slide => slide.slideId === PresentationModule.getActiveSlideId) + 1
  }

  setSlidePosition (step) {
    PresentationModule.setCurrentSlidePosition(step)
  }

  exit () {
    const path = this.$route.fullPath
    this.$router.push({ path: path.replace('broadcast', 'constructor') })
  }
}
</script>

<style lang="scss" scoped>
.controller {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  top: 90%;
  left: calc(100vw / 2 - 92.5px);
  position: fixed;
  background: white;
  border-radius: 10px;
  padding: 10px;
  align-items: center;

  .controller-button {
    padding: 10px;
    transition: $transition-delay;
    cursor: pointer;

    &:hover {
      background: $color-primary-transparent-10;
    }
    span {
      font-family: 'Open Sans Bold', sans-serif;
      font-size: 32px;
    }

    .bx {
      font-size: 35px;
    }
  }
}
</style>
