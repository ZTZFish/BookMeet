<template>
  <div class="card">
    <slot name="card-image"></slot>
    <slot name="card-info"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="css" scoped></style>