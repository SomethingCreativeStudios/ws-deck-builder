<script lang="tsx">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const height = ref(window.innerHeight);
    const width = ref(window.innerWidth);

    window.onresize = () => {
      height.value = window.innerHeight;
      width.value = window.innerWidth;
    };

    return { styles: computed(() => ({ '--ws--window--height': `${height.value}px`, '--ws--window--width': `${width.value}px` })) };
  },
  render() {
    return <ws-deck-builder style={this.styles}></ws-deck-builder>;
  },
});
</script>

<style>
.ws-deck-builder {
  height: calc(var(--ws--window--height) - 20px);
}

body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
</style>
