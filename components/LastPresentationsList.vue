<template>
  <div v-if="presentations.length" class="presentations-list">
    <h2>Последние презентации</h2>
    <vs-card-group>
      <PresentationItem
        v-for="presentation in presentations"
        :key="presentation.presentationId"
        :presentation="presentation"
        @open="openPresentation"
      />
    </vs-card-group>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { IPresentation } from '~/interfaces/presentation'
import { FIELD } from '~/utils/constants'
import { PresentationApi } from '~/api/presentation'
import { UserModule } from '~/store/user'

@Component
export default class LastPresentationsList extends Vue {
  presentations: IPresentation[] = []
  async fetch () {
    let presentations = [] as IPresentation[]
    try {
      const api = new PresentationApi(this.$cookies.get(FIELD.ACCESS_TOKEN))
      console.log(UserModule.getUser)
      presentations = await api.getLastPresentations(UserModule.getUser.userId) as IPresentation[]
    } catch (error) {
      console.log(error)
    }
    this.presentations = presentations || []
  }

  openPresentation (presentationId: string) {
    this.$router.push(`/presentations/${presentationId}/constructor`)
  }
}
</script>

<style lang="scss" scoped>
.presentations-list {
  margin-top: 30px;
  margin-bottom: 40px;
}
</style>
