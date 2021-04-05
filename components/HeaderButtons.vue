<template>
  <div>
    <div v-if="isAuthenticated" class="header-buttons">
      <nuxt-link to="/constructor">
        <vs-button relief>
          Новая презентация
        </vs-button>
      </nuxt-link>
      <vs-tooltip bottom>
        <vs-avatar circle>
          <template #text>
            {{ userLetter }}
          </template>
        </vs-avatar>
        <template #tooltip>
          {{ user.email }}
        </template>
      </vs-tooltip>
      <vs-button
        circle
        icon
        danger
        flat
        size="large"
        :loading="isLoading"
        @click="logout"
      >
        <i class="bx bxs-exit"></i>
      </vs-button>
    </div>
    <div v-else class="header-buttons">
      <nuxt-link to="/login">
        <vs-button border>
          Вход
        </vs-button>
      </nuxt-link>
      <nuxt-link to="/registration">
        <vs-button>
          Регистрация
        </vs-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { IUser, UserModule } from '@/store/user'
import { FIELD } from '~/utils/constants'

export default {
  data () {
    return {
      isLoading: false,
      isClicked: false
    }
  },
  computed: {
    userLetter () {
      if (this.user?.email) {
        return this.user.email[0].toUpperCase()
      } else {
        return ''
      }
    },
    isAuthenticated (): boolean {
      return this.$cookies.get(FIELD.IS_AUTHENTICATED)
    },
    user (): IUser {
      return UserModule.getUser
    }
  },
  methods: {
    async logout (): void {
      this.isLoading = true
      try {
        await this.$auth('logout', this.$cookies, () => {})
        await this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-buttons {
  display: flex;
  flex-direction: row;
  height: fit-content;
}
</style>
