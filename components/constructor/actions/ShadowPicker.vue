<template>
  <div class="shadow-picker">
    <div class="inputs">
      <div>
        <label for="x">X</label>
        <input id="x" class="input" type="number" :value="options['x']" @input="(e) => setValue('x', +e.target.value)">
      </div>
      <div>
        <label for="y">Y</label>
        <input id="y" class="input" type="number" :value="options['y']" @input="(e) => setValue('y', +e.target.value)">
      </div>
      <div>
        <label for="blur">Размытие</label>
        <input id="blur" class="input" type="number" :value="options['blur']" @input="(e) => setValue('blur', +e.target.value)">
      </div>
      <div>
        <label for="spread">Размах</label>
        <input id="spread" class="input" type="number" :value="options['spread']" @input="(e) => setValue('spread', +e.target.value)">
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
        :value="options.color"
        @input="(val) => setValue('color', val.hexa, val)"
      ></v-color-picker>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator'
@Component
export default class ShadowPicker extends Vue {
  options = {
    x: 0,
    y: 0,
    blur: 0,
    spread: 0,
    color: 0
  }

  @Prop({ required: true }) value

  @Watch('value')
  onValueChanged () {
    const values = this.value.split(' ')
    this.options = {
      x: +values[0].replace('px', ''),
      y: +values[1].replace('px', ''),
      blur: +values[2].replace('px', ''),
      spread: +values[3].replace('px', ''),
      color: values[4]
    }
  }

  get getBoxShadow () {
    const { x, y, blur, spread, color } = this.options
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`
  }

  @Emit('input')
  setValue (key, value, data) {
    const val = value || data
    this.options[key] = key === 'color' ? val : +val
    return this.getBoxShadow
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
