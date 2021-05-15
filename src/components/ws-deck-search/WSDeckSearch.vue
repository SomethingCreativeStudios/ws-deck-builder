<template>
  <card class="ws-deck-search">
    <template #content>
      <div class="ws-deck-search__body">
        <div class="ws-deck-search__body--name input-block">
          <label>Name</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--effect input-block">
          <label>Effect</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--color input-block">
          <label>Color</label>
          <input-text></input-text>
        </div>
        <div class="ws-deck-search__body--type input-block">
          <label>Type</label>
          <input-text></input-text>
        </div>
        <div class="ws-deck-search__body--trait input-block">
          <label>Trait</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--level input-block">
          <label>Level</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--cost input-block">
          <label>Cost</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--power input-block">
          <label>Power</label>
          <input-text></input-text>
        </div>

        <div class="ws-deck-search__body--soul input-block">
          <label>Soul</label>
          <input-text></input-text>
        </div>
      </div>
    </template>
  </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';

export default defineComponent({
  name: 'ws-deck-search',
  components: { Card, InputText },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
@import '../../common.scss';

.ws-deck-search__body {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.ws-deck-search__body--name {
  grid-column: span 2;
}

.ws-deck-search__body--power {
}

.ws-deck-search__body--color {
  grid-row: span 2;
}

.ws-deck-search__body--type {
  grid-row: span 2;
}

.ws-deck-search__body--cost {
}

.ws-deck-search__body--soul {
}

.ws-deck-search__body--level {
}

.ws-deck-search__body--trait {
  grid-row: span 2;
}

.ws-deck-search__body--effect {
  grid-column: span 2;
}
</style>
