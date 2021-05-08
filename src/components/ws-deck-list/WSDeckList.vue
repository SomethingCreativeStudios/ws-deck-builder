<template>
  <div class="ws-deck-list"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";

export default defineComponent({
  name: "ws-deck-list",
  components: { InputText, ToggleButton },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.ws-deck-list {
}
</style>
