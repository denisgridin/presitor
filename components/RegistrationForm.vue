<template>
  <div class="form">
    <div class="form-header">
      {{ title }}
      <span class="text-big presitor-name"> Presitor</span>
    </div>
    <div class="form-body">
      <vs-input v-model="user.email" color="#6C63FF" placeholder="Email" class="form-input">
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
      </vs-input>
      <vs-input v-model="user.password" color="#6C63FF" type="password" placeholder="Пароль" class="form-input">
        <template #icon>
          <i class='bx bx-lock-open-alt'></i>
        </template>
      </vs-input>
    </div>
    <div class="form-footer">
      <vs-button block>
        {{ buttonTitle }}
      </vs-button>
      <RegistrationFormFooterLink class="footer-link"></RegistrationFormFooterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AUTH_TYPE } from '~/utils/enums'

export default Vue.extend({
  props: {
    authType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      user: {} as { email: string, password: string }
    }
  },
  computed: {
    title (): string {
      return (this.authType === AUTH_TYPE.registration ? 'Регистрация в системе ' : 'Авторизация в системе ')
    },
    buttonTitle (): string {
      return (this.authType === AUTH_TYPE.registration ? 'Зарегистрироваться' : 'Войти')
    }
  }
})
</script>

<style lang="scss" scoped>

.form {
  width: fit-content;
  border-radius: var(--vs-radius);
  background: white;
  padding: 30px 30px 0 30px;

  @media screen and (max-width: 559px) {
    width: 230px;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;

    .presitor-name {
      @media screen and (max-width: 570px) {
        display: none;
      }
    }
  }

  &-body {
    padding: 10px 16px;
    position: relative;
    display: grid;

    @media screen and (min-width: 560px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px;
    }

    @media screen and (max-width: 561px) {
      grid-template-rows: 1fr 1fr;
      grid-gap: 10px;
      align-items: center;
    }

    input {
      margin: 0 auto;
    }
  }

  &-footer {
    padding: 0 16px 10px;
    font-size: 0.8rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
