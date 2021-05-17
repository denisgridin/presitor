<template>
  <Header>
    <template #middle-data>
      <div class="presentation_info">
        <div v-if="currentPresentation" class="middle-data">
          {{ currentPresentation.name }}
        </div>
        <vs-button circle>
          <div class="play-button" @click="playPresentation">
            <i class="bx bx-play-circle"></i>
            <span>Транслировать</span>
          </div>
        </vs-button>
        <vs-button circle>
          <div class="export-button" @click="exportInPng">
            <i class="bx bx-export"></i>
            <span>Экспорт в PNG</span>
          </div>
        </vs-button>
      </div>
      <HeaderButtons />
    </template>
  </Header>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { PresentationModule } from '@/store/presentation'
@Component({})
export default class HeaderApp extends Vue {
  get currentPresentation () {
    return PresentationModule.getCurrentPresentation
  }

  playPresentation () {
    const path = this.$route.fullPath
    PresentationModule.SET_ACTIVE_ELEMENT_ID_AND_TYPE({ id: null, type: null })
    this.$router.push({ path: path.replace('constructor', 'broadcast') })
  }
}

</script>

<style lang="scss" scoped>
.presentation_info {
  display: flex;
  justify-content: center;
  align-items: center;

  .play-button {
    display: flex;
    align-items: center;

    .bx {
      margin-right: 3px;
      font-size: 20px;
    }
  }
}
</style>
