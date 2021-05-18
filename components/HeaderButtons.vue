<template>
  <div>
    <div v-if="isAuthenticated" class="header-buttons">
      <vs-button relief @click="createPresentation">
        Новая презентация
      </vs-button>
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
import { PresentationModule } from '~/store/presentation'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HeaderButtons extends Vue {
  isLoading: boolean = false
  isClicked: boolean = false

  get userLetter () {
    if (this.user?.email) {
      return this.user.email[0].toUpperCase()
    } else {
      return ''
    }
  }

  get isAuthenticated (): boolean {
    return this.$cookies.get(FIELD.IS_AUTHENTICATED)
  }

  get user (): IUser {
    return UserModule.getUser
  }

  async logout (): Promise<void> {
    this.isLoading = true
    try {
      await this.$auth('logout', this.$cookies, () => {})
      await this.$router.push('/login')
    } catch (error) {
      console.log(error)
    }
    this.isLoading = false
  }

  async createPresentation () {
    if (this.isAuthenticated) {
      try {
        const id = await PresentationModule.createPresentation()
        await this.$router.push(`/presentations/${id}/constructor`)
      } catch (error) {
        console.error(error)
      }
    } else {
      await this.$router.push('/login')
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
