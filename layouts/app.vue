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
import HeaderApp from '@/components/Headers/HeaderApp.vue'
import { PresentationModule } from '~/store/presentation'
import { UserModule } from '~/store/user'

@Component({
  components: {
    HeaderApp
  }
})
export default class app extends Vue {
  mounted () {
    UserModule.getCookieUser(this.$cookies.getAll())
  }

  // mounted () {
  //   document.addEventListener('fullscreenchange', () => {
  //     console.log('fullscreen ' + Boolean(document.fullscreenElement))
  //     if (!PresentationModule.getActiveElement) {
  //       PresentationModule.playPresentation(Boolean(document.fullscreenElement))
  //     }
  //   })
  //
  //   document.addEventListener('keydown', (event) => {
  //     switch (event.key) {
  //       case 'Escape': {
  //         this.hideFullscreen()
  //         break
  //       }
  //       case 'ArrowLeft': {
  //         this.setSlidePosition(-1)
  //         break
  //       }
  //       case 'ArrowRight': {
  //         this.setSlidePosition(1)
  //         break
  //       }
  //       case 'Enter': {
  //         this.toggleFullscreen()
  //         break
  //       }
  //     }
  //   })
  // }

  hideFullscreen () {
    PresentationModule.playPresentation(false)
  }

  setSlidePosition (step: number) {
    if (!PresentationModule.getActiveElement) {
      PresentationModule.setCurrentSlidePosition(step)
    }
  }

  toggleFullscreen () {
    PresentationModule.playPresentation(true)
  }
}
</script>

<style lang="scss" scoped>

</style>
