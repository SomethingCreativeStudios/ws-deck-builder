<script lang="tsx">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';

export default defineComponent({
  name: 'ws-deck-results',
  components: { InputText, ToggleButton },
  setup() {
    return {};
  },
  render() {
    return <div>Hello World</div>
  }
});
</script>

<style lang="scss" scoped>
.ws-deck-results {
}
</style>
