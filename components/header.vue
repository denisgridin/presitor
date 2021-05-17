<template>
  <div class="wrapper-header">
    <div class="header">
      <nuxt-link to="/">
        <Logo class="header-logo" width="60px" height="60px" />
      </nuxt-link>
      <slot name="middle-data">
      </slot>
      <HeaderButtons></HeaderButtons>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HeaderButtons from '~/components/HeaderButtons.vue'
@Component({
  components: {
    HeaderButtons
  }
})
export default class Header extends Vue {
}

</script>

<style lang="scss" scoped >

.wrapper-header {
  padding: 5px 2rem;
  background: white;
  //border-radius: 0 0 30px 30px;
  .header {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .middle-data {
      width: 400px;
      text-align: center;
      border-radius: 3px;
      color: $color-primary;
      font-family: "Open Sans Bold", sans-serif;
      background: $grey-1;
      padding: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

</style>
