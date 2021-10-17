<template>
  <div class="ws-deck-builder">
    <ws-deck-search :availableSouls="souls" :availableTraits="traits" :availableTypes="types" :availableColors="colors"></ws-deck-search>
    <ws-deck-list></ws-deck-list>
    <ws-deck-results></ws-deck-results>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { OptionLabel } from '../../types/optionLabel';
import WSDeckList from '../ws-deck-list/WsDeckList.vue';
import WSDeckResults from '../ws-deck-results/WsDeckResults.vue';
import WSDeckSearch from '../ws-deck-search/WsDeckSearch.vue';

export default defineComponent({
  name: 'ws-deck-builder',
  components: { WSDeckSearch, WSDeckList, WSDeckResults },
  setup() {
    const souls = ref(['soul1', 'soul2', 'soul3', 'soul4'].map(text => ({ value: text, display: text } as OptionLabel<string>)));
    const traits = ref(['trait1', 'trait2', 'trait3', 'trait4'].map(text => ({ value: text, display: text } as OptionLabel<string>)));
    const types = ref(['type1', 'type2', 'type3', 'type4'].map(text => ({ value: text, display: text } as OptionLabel<string>)));
    const colors = ref(['yellow', 'green', 'red', 'blue'].map(text => ({ value: text, display: text } as OptionLabel<string>)));

    return { souls, traits, types, colors };
  }
});
</script>

<style lang="scss">
.ws-deck-builder {
  display: grid;

  grid-template-areas:
    'search search search'
    'list   list   results';

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.test,
.ws-deck-search {
  grid-area: search;
}

.ws-deck-list {
  grid-area: list;
}

.ws-deck-results {
  grid-area: results;
}
</style>
