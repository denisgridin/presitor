<template>
  <div class="logo">
    <img
      :src="logo"
      :alt="pkg.name"
      :title="pkg.name"
      :style="{ width, height }"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const logo = require('@/assets/images/logo.png')
const pkg = require('@/package.json')

export default Vue.extend({
  props: {
    width: {
      type: String,
      required: false,
      default: '100%'
    },
    height: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  data () {
    return {
      logo, pkg
    }
  },
  mounted () {
    (this as any).$vs.setColor('primary', 'rgb(108,99,255)')
  }

})

</script>
