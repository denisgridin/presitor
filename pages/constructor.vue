<template>
  <div class="constructor">
    <SlidesSidebar />
    <PresentationCanvas />
    <PresentationFeedbacks />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import SlidesSidebar from '@/components/constructor/SlidesSidebar'
import PresentationCanvas from '@/components/constructor/PresentationCanvas'
import PresentationFeedbacks from '@/components/constructor/PresentationFeedbacks'
import { LAYOUTS } from '@/utils/enums'

@Component({
  components: {
    SlidesSidebar,
    PresentationCanvas,
    PresentationFeedbacks
  },
  layout: LAYOUTS.APP,
  mounted () {
    console.log(this)
  }
})
export default class Constructor extends Vue {
}
</script>

<style lang="scss" scoped>

.constructor {
  width: 100%;
  height: calc(100vh - 75px);

  display: grid;
  grid-template-columns: minmax(150px, 10%) 1fr minmax(150px, 10%);
  grid-gap: 20px;
}
</style>
