<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ws-deck-builder',
  components: {},
  render() {
    return (
      <div class="ws-deck-builder">
        <ws-deck-search></ws-deck-search>
        <ws-deck-list></ws-deck-list>
        <ws-deck-results></ws-deck-results>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.ws-deck-builder {
  display: grid;

  grid-template-areas:
    'search search search search'
    'list   list   list   results';

  grid-template-columns: 1fr 1fr 1fr 500px;
  grid-template-rows: min-content;
  margin: 10px;
  row-gap: 20px;
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
