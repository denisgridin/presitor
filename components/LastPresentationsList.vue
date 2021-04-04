<template>
  <div class="presentations-list">
    <h2 v-if="presentations.length">Последние презентации</h2>
    <vs-card-group>
      <vs-card v-for="presentation in presentations" :key="presentation.presentationId" type="3">
        <template #title>
          <h3>{{ presentation.name }}</h3>
        </template>
        <template #img>
          <img :src="`/foto.png`" alt="">
        </template>
        <template #text>
          <p class="card-text">
            <span class="card-text__title">Описание</span>
            <span class="card-text__description">{{ presentation.description }}</span>
          </p>
          <p>
            <span class="card-text__updated">Последнее обновление</span>
            <span>{{ presentation.lastUpdated | dateFormat }}</span>
          </p>
        </template>
        <template #interactions>
          <vs-button danger icon>
            <i class='bx bx-heart'></i>
          </vs-button>
          <vs-button class="btn-chat" shadow primary>
            <i class='bx bx-chat'></i>
            <span class="span">
            54
          </span>
          </vs-button>
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IPresentation } from '~/interfaces/presentation'
import { DATE_FORMAT } from '~/utils/constants'
import { PresentationApi } from '~/api/presentation'
import { UserModule } from '~/store/user'
const dayjs = require('dayjs')

@Component({
  filters: {
    dateFormat (date: Date) {
      return dayjs(date).format(DATE_FORMAT)
    }
  }
})
export default class LastPresentationsList extends Vue {
  presentations: IPresentation[] = []
  async fetch () {
    let presentations = []
    try {
      const api = new PresentationApi(UserModule.getTokens.accessToken)
      console.log(UserModule.getUser)
      presentations = await api.getLastPresentations(UserModule.getUser.userId)
    } catch (error) {
      console.log(error)
    }
    this.presentations = presentations
  }
}
</script>

<style lang="scss" scoped>
.presentations-list {
  margin-top: 30px;
  margin-bottom: 40px;
}
</style>
