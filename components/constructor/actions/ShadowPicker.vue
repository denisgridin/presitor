<template>
  <div class="shadow-picker">
    <div class="inputs">
      <div>
        <label for="x">X</label>
        <input id="x" class="input" type="number" :value="value['x']" @input="(e) => setValue('x', +e.target.value)">
      </div>
      <div>
        <label for="y">Y</label>
        <input id="y" class="input" type="number" :value="value['y']" @input="(e) => setValue('y', +e.target.value)">
      </div>
      <div>
        <label for="blur">Размытие</label>
        <input id="blur" class="input" type="number" :value="value['blur']" @input="(e) => setValue('blur', +e.target.value)">
      </div>
      <div>
        <label for="spread">Размах</label>
        <input id="spread" class="input" type="number" :value="value['spread']" @input="(e) => setValue('spread', +e.target.value)">
      </div>
    </div>
    <div>
      <label for="color">Цвет</label>
      <v-color-picker
        id="color"
        width="250px"
        dot-size="25"
        swatches-max-height="200"
        mode="hexa"
        :value="value.color"
        @input="(val) => setValue('color', val.hexa, val)"
      ></v-color-picker>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
@Component
export default class ShadowPicker extends Vue {
  @Prop({ required: true }) value

  @Emit('input')
  setValue (key, value, data) {
    const val = value || data
    return {
      ...this.value,
      [key]: val
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow-picker {
  .inputs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    grid-gap: 10px;
    .input {
      width: 50px;
      background: rgba(244, 247, 248, 1);
      padding: 5px;
    }
  }
}
</style>
