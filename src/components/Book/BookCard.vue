<template>
  <div class="card">
    <slot name="card-image"></slot>
    <div class="card-info">
      <slot name="card-info"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="css" scoped>
.card {
  display: flex;
  height: 100%;
  margin: 0px 10px;
}

.card-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>