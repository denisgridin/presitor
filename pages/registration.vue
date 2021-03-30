<template>
  <div class="registration">
    <RegistrationForm
      auth-type="registration">
    </RegistrationForm>
  </div>
</template>

<script lang="ts">
import { LAYOUTS, AUTH_TYPE } from '~/utils/enums'

import RegistrationForm from '~/components/RegistrationForm.vue'
export default {
  components: {
    RegistrationForm
  },
  layout: LAYOUTS.AUTH,
  data () {
    return {
      authTypes: AUTH_TYPE
    }
  }
}
</script>

<style lang="scss" scoped>
.registration {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
