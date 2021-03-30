<template>
  <div class="footer-link">
    <span>
      {{ text }}
    </span>
    <nuxt-link :to="buttonLink">
      <vs-button transparent>
        {{ buttonText }}
      </vs-button>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
import { AUTH_TYPE } from '~/utils/enums'

export default Vue.extend({
  computed: {
    text () {
      return (this.$parent.$props.authType === AUTH_TYPE.registration ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?')
    },
    buttonText () {
      return (this.$parent.$props.authType === AUTH_TYPE.registration ? 'Войти' : 'Создать аккаунт')
    },
    buttonLink () {
      return (this.$parent.$props.authType === AUTH_TYPE.registration ? '/login' : '/registration')
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-link {
  display: flex;
  justify-content: center;
  text-align: center;

  align-items: center;
}
</style>
