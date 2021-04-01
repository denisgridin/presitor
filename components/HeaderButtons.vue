<template>
  <div>
    <div v-if="isAuthenticated" class="header-buttons">
      <vs-tooltip bottom>
        <vs-avatar circle>
          <template #text>
            {{ user.email[0].toUpperCase() }}
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

export default {
  data () {
    return {
      isLoading: false,
      isClicked: false
    }
  },
  computed: {
    isAuthenticated (): boolean {
      return UserModule.getAuthenticationState
    },
    user (): IUser {
      return UserModule.getUser
    }
  },
  methods: {
    async logout (): void {
      this.isLoading = true
      try {
        await this.$router.push('/login')
        await UserModule.logoutUser()
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
