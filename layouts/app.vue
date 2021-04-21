<template>
  <v-app>
    <div ref="constructor" class="wrapper-constructor">
      <HeaderApp></HeaderApp>
      <nuxt />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HeaderApp from '@/components/Headers/HeaderApp'
import { PresentationModule } from '~/store/presentation'

@Component({
  components: {
    HeaderApp
  }
})
export default class app extends Vue {
  mounted () {
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.toggleFullscreen()
      } else if (e.keyCode === 27) {
        PresentationModule.playPresentation(false)
      } else if (e.keyCode === 37) {
        PresentationModule.setCurrentSlidePosition(-1)
      } else if (e.keyCode === 39) {
        PresentationModule.setCurrentSlidePosition(1)
      }
    }, false)
  }

  toggleFullscreen () {
    PresentationModule.playPresentation(!PresentationModule.currentPresentation.isPlay)
  }
}
</script>

<style lang="scss" scoped>

</style>
