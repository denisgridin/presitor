<template>
  <vs-dialog width="550px" not-center :value="active" @close="onSubmit(false)">
    <template #header>
      <h4 class="not-margin">
        Подтвердите действие
      </h4>
    </template>
    <div class="con-content">
      <p>
        Вы действительно хотите удалить элемент?
      </p>
    </div>
    <template #footer>
      <div class="con-footer">
        <vs-button @click="onSubmit(true)" danger>
          Удалить
        </vs-button>
        <vs-button @click="onSubmit(false)" dark transparent>
          Отмена
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class ModalConfirm extends Vue {
  @Prop() active: boolean

  @Emit('submit')
  onSubmit (flag: boolean) {
    return flag
  }
}
</script>

<style lang="scss" scoped>
.con-footer {
  display: flex;
}
</style>
