<template>
  <div v-if="presentations.length" class="presentations-list">
    <h2>Последние презентации</h2>
    <vs-card-group>
      <PresentationItem
        v-for="presentation in presentations"
        :key="presentation.presentationId"
        :presentation="presentation"
        @remove="onRemove"
        @open="openPresentation"
      />
    </vs-card-group>
    <ModalConfirm :active="modalActive" @submit="onSubmit"/>
  </div>
</template>

<script lang="ts">

import { Component, Emit, Vue } from 'nuxt-property-decorator'
import { IPresentation } from '~/interfaces/presentation'
import { FIELD } from '~/utils/constants'
import { PresentationApi } from '~/api/presentation'
import { UserModule } from '~/store/user'
import { PresentationModule } from '~/store/presentation'
import ModalConfirm from '~/components/Modals/ModalConfirm.vue'

@Component({
  components: {
    ModalConfirm
  }
})
export default class LastPresentationsList extends Vue {
  modalActive: boolean = false
  removingPresentation: string | null = null
  presentations: IPresentation[] = []
  async fetch () {
    await this.getPresentations()
  }

  async getPresentations () {
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

  onSubmit (flag: boolean) {
    this.modalActive = false
    if (flag) {
      this.removePresentation(this.removingPresentation)
    }
    this.removingPresentation = null
  }

  async removePresentation (id: string) {
    await PresentationModule.removePresentation(id)
    await this.getPresentations()
  }

  onRemove (id: string) {
    console.log('remove presentation ' + id)
    this.removingPresentation = id
    this.modalActive = true
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
