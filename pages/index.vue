<template>
  <div class="home-wrapper">
    <div class="container container-top animate__animated animate__fadeInUp">
      <div>
        <div class="greeting">
          {{ greeting }}
        </div>
        <vs-button block @click="createPresentation">
          <div class="create-button-content">
            <i class="bx bxs-paint" />
            <span class="create-button-content__text">Создать</span>
          </div>
        </vs-button>
      </div>
      <div>
        <img :src="presentationImage" class="presentation-image" alt="Presentation image">
      </div>
    </div>
    <div class="container animate__animated animate__fadeInUp">
      <div class="container-bottom">
        <PresentationTagInput />
      </div>
    </div>
    <div class="container animate__animated animate__fadeInUp">
      <LastPresentationsList />
    </div>
  </div>
</template>

<script>
import { UserModule } from '@/store/user'
import { MESSAGE } from '~/utils/constants'
import { LAYOUTS } from '@/utils/enums'
import { PresentationModule } from '@/store/presentation'
const presentationImage = require('@/assets/images/presentation.svg')

export default {
  layout: LAYOUTS.DEFAULT,
  data () {
    return {
      presentationImage,
      greeting: MESSAGE.greeting
    }
  },
  computed: {
    isAuth () {
      return UserModule.getAuthenticationState
    }
  },
  methods: {
    async createPresentation () {
      if (this.isAuth) {
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
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  align-content: center;
  padding-top: 50px;

  .container-top {
    @media screen and (min-width: 900px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 60px;
    }

    @media screen and (max-width: 900px) {
      display: flex;
      flex-direction: column;
    }
  }

  .container-bottom {
    margin-top: 40px;
    width: 500px;

    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }

  .container {
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 500px) {
      width: 90%;
    }

    .presentation-image {
      width: 100%;

      @media screen and (max-width: 900px) {
        display: none;
      }
    }

    .greeting {
      font-family: "Open Sans Bold", sans-serif;
      font-size: 3em;
      margin-bottom: 20px;

      @media screen and (max-width: 1400px) {
        font-size: 2em;
      }
    }

    .create-button-content {
      font-size: 1.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      &__text {
        margin-left: 3px;
      }
    }
  }
}
</style>
