<template>
  <vs-alert shadow>
    <template #title>
      Или найдите существующую презентацию по тегу
    </template>
    <div class="alert-body">
      <vs-input
        v-model="tag"
        state="primary"
        class="tag-input"
        color="#7d33ff"
        placeholder="Тег"
      >
        <template #icon>
          <i class="bx bx-purchase-tag"></i>
        </template>
      </vs-input>
      <vs-button :disabled="!(!!tag)">
        Найти
      </vs-button>
    </div>
  </vs-alert>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      tag: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.vs-alert {
  height: auto!important;
}

.alert-body {
  display: flex;

  .tag-input {
    width: 200px;
  }
}
</style>
