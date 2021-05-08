<template>
  <div class="ws-deck-results"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";

export default defineComponent({
  name: "ws-deck-results",
  components: { InputText, ToggleButton },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.ws-deck-results {
}
</style>
