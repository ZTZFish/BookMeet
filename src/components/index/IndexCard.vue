<template>
  <div class="card">
    <slot name="bookImage" />
    <slot name="infoBody" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

</script>

<style scoped>
.card {
  width: 100%;
  height: 340px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
</style>
