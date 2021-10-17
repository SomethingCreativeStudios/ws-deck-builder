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
      default: ''
    },
    maxValue: {
      type: String,
      default: ''
    }
  },
  setup() {
    const test = ref('test');
    return { test };
  },
  render() {
    return (
      <div class="ws-min-max">
        <label>Min</label>
        <input-text class="ws-min-max__min"></input-text>
        <label>Max</label>
        <input-text class="ws-min-max__max"></input-text>
      </div>
    );
  }
});
</script>
