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
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Escape': {
          this.hideFullscreen()
          break
        }
        case 'ArrowLeft': {
          this.setSlidePosition(-1)
          break
        }
        case 'ArrowRight': {
          this.setSlidePosition(1)
          break
        }
        case 'Enter': {
          this.toggleFullscreen()
          break
        }
      }
    })
  }

  hideFullscreen () {
    PresentationModule.playPresentation(false)
  }

  setSlidePosition (step) {
    PresentationModule.setCurrentSlidePosition(step)
  }

  toggleFullscreen () {
    PresentationModule.playPresentation(!PresentationModule.currentPresentation.isPlay)
  }
}
</script>

<style lang="scss" scoped>

</style>
