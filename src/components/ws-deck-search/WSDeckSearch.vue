<template>
  <div class="ws-deck-search">
    HELLO Goodbye
    {{ getText() }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'ws-deck-search' })
export default class extends Vue {
  getText() {
    console.log('Hello');
  }
}
</script>

<style scoped></style>
