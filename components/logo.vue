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
  data () {
    return {
      logo, pkg
    }
  },
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
  }
})

</script>
