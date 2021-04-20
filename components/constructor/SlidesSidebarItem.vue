<template>
  <div class="slide" :class="{ 'slide-active': active }" @click="selectSlide">
    <div class="slide-index">{{ index }}</div>
    <div class="preview">
      <Canvas v-if="index === 1" class="slide-preview" :slide-elements="getSlideElements" :disabled="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { ISlide } from '~/interfaces/presentation'
import { PresentationModule } from '~/store/presentation'
import Canvas from '~/components/constructor/canvas/Canvas.vue'

@Component({
  components: {
    Canvas
  }
})
export default class SlidesSidebarItem extends Vue {
  @Prop()
  slide: ISlide

  @Prop()
  index: number

  @Prop()
  active: boolean

  get getSlideElements () {
    return this.slide.elements || []
  }

  @Emit('select')
  selectSlide () {
    return this.slide.slideId
  }
}
</script>

<style lang="scss" scoped>

.slide-active {
  background: $color-primary-transparent-30;

  .slide-index {
    color: $color-primary;
  }
}

.slide {
  cursor: pointer;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-gap: 5px;
  height: 100px;

  margin: 10px;
  padding: 5px;

  border-radius: 3px;
  transition: all $transition-delay;

  &:hover {
    background: $color-primary-transparent-10;
  }

  &-index {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-black-1;
    font-family: "Open Sans Bold", sans-serif;
    font-size: 0.8rem;
  }

  &-preview {
    transform-origin: top left;
    transform: $canvas-preview-scale;
  }

  .preview {
    overflow: hidden;
  }
}
</style>
