<template>
  <div class="constructor">
    <SlidesSidebar />
    <PresentationCanvas />
    <PresentationActions />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import SlidesSidebar from '@/components/constructor/SlidesSidebar'
import PresentationCanvas from '@/components/constructor/PresentationCanvas'
import PresentationActions from '@/components/constructor/PresentationActions'
import { LAYOUTS } from '@/utils/enums'

@Component({
  components: {
    SlidesSidebar,
    PresentationCanvas,
    PresentationActions
  },
  layout: LAYOUTS.APP
})
export default class Constructor extends Vue {
}
</script>

<style lang="scss" scoped>

.constructor {
  width: 100%;
  background: $grey-1;

  display: grid;
  grid-template-columns: minmax(150px, 10%) 1fr minmax(150px, 15%);
  grid-gap: 20px;
}
</style>
