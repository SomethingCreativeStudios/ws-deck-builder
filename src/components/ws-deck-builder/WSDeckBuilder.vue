<template>
  <div class="ws-deck-builder">
    <ws-deck-search></ws-deck-search>
    <ws-deck-list></ws-deck-list>
    <ws-deck-results></ws-deck-results>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import WSDeckList from "../ws-deck-list/WSDeckList.vue";
import WSDeckResults from "../ws-deck-results/WSDeckResults.vue";
import WSDeckSearch from "../ws-deck-search/WSDeckSearch.vue";

export default defineComponent({
  name: "ws-deck-builder",
  components: { WSDeckSearch, WSDeckList, WSDeckResults },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" >
.ws-deck-builder {
  display: grid;

  grid-template-areas:
    "search search results"
    "list   list   results";

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
