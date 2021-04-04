<template>
  <div class="home-wrapper">
    <div class="container container-top animate__animated animate__fadeInUp">
      <div>
        <div class="greeting">
          {{ greeting }}
        </div>
        <vs-button block>
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
      <LastPresentationsList :presentations="[]" />
    </div>
  </div>
</template>

<script>
import { PresentationApi } from '@/api/presentation'
import { UserModule } from '@/store/user'
import { MESSAGE } from '~/utils/constants'
const presentationImage = require('@/assets/images/presentation.svg')

export default {
  async asyncData ({ $cookies }) {
    await UserModule.getCookieUser($cookies)

    const api = new PresentationApi(UserModule.getTokens.accessToken)
    console.log(UserModule.getUser)
    const presentations = await api.getLastPresentations(UserModule.getUser.userId)
    return {
      presentations
    }
  },
  data () {
    return {
      presentationImage,
      greeting: MESSAGE.greeting,
      presentations: []
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
