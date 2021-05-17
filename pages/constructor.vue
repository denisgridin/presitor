<template>
  <div class="constructor">
    <SlidesSidebar />
    <PresentationCanvas :style="{ pointerEvents: isAdmin ? 'all' : 'none' }"/>
    <PresentationActions v-if="isAdmin" />
    <ContextMenu
      v-if="getContextMenu.active"
      ref="contextMenu"
      :context-menu-items="getContextMenu.items"
    ></ContextMenu>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import SlidesSidebar from '@/components/constructor/SlidesSidebar'
import PresentationCanvas from '@/components/constructor/PresentationCanvas'
import PresentationActions from '@/components/constructor/PresentationActions'
import ContextMenu from '@/components/ContextMenu'
import { LAYOUTS } from '@/utils/enums'
import { CommonModule } from '@/store/common'
import { PresentationModule } from '@/store/presentation'
import { UserModule } from '@/store/user'

@Component({
  components: {
    ContextMenu,
    SlidesSidebar,
    PresentationCanvas,
    PresentationActions
  },
  layout: LAYOUTS.APP
})
export default class Constructor extends Vue {
  get getContextMenu () {
    return CommonModule.getContextMenu
  }

  get isAdmin () {
    return PresentationModule.currentPresentation.editorIds?.includes(UserModule.getUser.userId)
  }
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
