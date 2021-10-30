<template>
  <div>
    <ws-deck-builder></ws-deck-builder>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {DetailedText } from '@ws/shared';

export default defineComponent({
  components: {},
});
</script>

<style>
body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
</style>
