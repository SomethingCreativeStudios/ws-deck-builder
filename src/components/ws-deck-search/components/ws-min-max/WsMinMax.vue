<script lang="tsx">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import './WsMinMax.scss';

export default defineComponent({
  name: 'ws-multi-select',
  components: { InputText },
  props: {
    minValue: {
      type: String,
      default: '',
    },
    maxValue: {
      type: String,
      default: '',
    },
  },
  setup() {},
  render() {
    return (
      <div class="ws-min-max">
        <input-text
          class="ws-min-max--input ws-min-max__min"
          value={this.minValue}
          placeholder="min"
          type="number"
          onInput={(event: any) => this.$emit('update', { min: event.target.value, max: this.maxValue })}
        ></input-text>
        <input-text
          class="ws-min-max--input ws-min-max__max"
          value={this.maxValue}
          placeholder="max"
          type="number"
          onInput={(event: any) => this.$emit('update', { min: this.minValue, max: event.target.value })}
        ></input-text>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.ws-min-max {
  padding-left: 5px;
  display: flex;
}

.ws-min-max--input {
  width: 50%;
}

.ws-min-max--label {
  width: 40px;
  font-size: 10px;
}
</style>
