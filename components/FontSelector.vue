<template>
  <vs-select
    color="primary"
    placeholder="Выберете шрифт"
    :value="value"
    @input="emitInput"
  >
    <vs-option v-for="(font, i) in fontsList" :key="i" :label="font" :value="font">
      <span :style="{ fontFamily: `${font}, sans-serif` }">
        {{ font }}
      </span>
    </vs-option>
  </vs-select>
</template>

<script lang="ts">

import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { GOOGLE_FONTS } from '@/utils/constants'

@Component
export default class FontSelector extends Vue {
  @Prop() value: string | number

  get fontsList () {
    return GOOGLE_FONTS
  }

  @Emit('input')
  emitInput (value: string | number) {
    return value
  }
}

</script>
