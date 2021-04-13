<template>
  <vs-card type="3" @click="openPresentation">
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
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { DATE_FORMAT } from '~/utils/constants'
import { IPresentation } from '~/interfaces/presentation'
const dayjs = require('dayjs')

@Component({
  filters: {
    dateFormat (date: Date) {
      return dayjs(date).format(DATE_FORMAT)
    }
  }
})
export default class PresentationItem extends Vue {
  @Prop() presentation: IPresentation

  @Emit('open')
  openPresentation () {
    return this.presentation.presentationId
  }
}
</script>
