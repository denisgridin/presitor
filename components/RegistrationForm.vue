<template>
  <div class="form">
    <div class="form-logo">
      <Logo width="150px" height="150px"></Logo>
    </div>
    <div class="form-header">
      {{ title }}
      <span class="text-big presitor-name"> Presitor</span>
    </div>
    <div class="form-body">
      <vs-input
        v-model="user.email"
        @input="resetFieldError('email')"
        :state="states.email"
        color="#6C63FF"
        placeholder="Email"
        class="form-input">
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
        <template v-if="errors.email" #message-danger>
          <span>Некорректный email или формат email</span>
        </template>
      </vs-input>
      <vs-input
        v-model="user.password"
        :state="states.password"
        @input="resetFieldError('password')"
        color="#6C63FF"
        type="password"
        placeholder="Пароль"
        class="form-input"
      >
        <template #icon>
          <i class='bx bx-lock-open-alt'></i>
        </template>
        <template v-if="errors.password" #message-danger>
          <span>Пароль должен иметь 6 и более символов</span>
        </template>
      </vs-input>
    </div>
    <div class="form-footer">
      <vs-button
        block
        :disabled="isButtonDisabled"
        :loading="isLoading"
        @click="submit"
      >
        {{ buttonTitle }}
      </vs-button>
      <RegistrationFormFooterLink class="footer-link"></RegistrationFormFooterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IUser, UserModule } from '@/store/user'
import { AUTH_TYPE } from '~/utils/enums'
import { errorCodes } from '~/utils/errorCodes'
import { FIELD } from '~/utils/constants'

export default Vue.extend({
  props: {
    authType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      user: {} as { email: string, password: string },
      errors: {
        email: false,
        password: false
      },
      isLoading: false
    }
  },
  computed: {
    states (): { email: string | null, password: string | null } {
      return {
        email: this.errors.email ? 'danger' : null,
        password: this.errors.password ? 'danger' : null
      }
    },
    isButtonDisabled () {
      return !((this as any).user.email && (this as any).user.password)
    },
    title (): string {
      return (this.authType === AUTH_TYPE.registration ? 'Регистрация в системе ' : 'Авторизация в системе ')
    },
    buttonTitle (): string {
      return (this.authType === AUTH_TYPE.registration ? 'Зарегистрироваться' : 'Войти')
    }
  },
  methods: {
    async submit (): Promise<void> {
      this.isLoading = true
      if (this.authType === AUTH_TYPE.registration) {
        await this.registerUser()
      } else {
        await this.loginUser()
      }
      this.isLoading = false
    },
    async loginUser (): Promise<void> {
      this.isLoading = true
      try {
        await this.$auth('login', this.$cookies, () => { this.$router.push('/') }, this.user)
      } catch (error) {
        console.log(error)
        this.handleError(error.response?.data || error.response)
      }
      this.isLoading = false
    },
    async registerUser (): Promise<void> {
      try {
        await UserModule.registerUser(this.user as IUser)
        await this.loginUser()
      } catch (error) {
        this.handleError(error.response?.data || error.response)
      }
    },
    resetFieldError (field: string) {
      (this as any).errors[field] = false
    },
    handleError (data: any) {
      const fail = Array.isArray(data?.errors) ? data.errors : data.code

      if (Array.isArray(fail)) {
        this.errors.email = false
        this.errors.password = false
        fail.forEach((err: { property: string }) => {
          (this as any).errors[err.property] = true
        })
      } else {
        (this as any).$vs.notification({
          progress: 'auto',
          color: 'danger',
          position: 'top-right',
          title: 'Ошибка',
          text: (errorCodes as any)[fail]
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>

.form {
  width: 470px;
  border-radius: var(--vs-radius);
  background: white;
  padding: 30px 30px 0 30px;

  @media screen and (max-width: 559px) {
    width: 230px;
  }

  &-logo {
    display: flex;
    justify-content: center;
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
