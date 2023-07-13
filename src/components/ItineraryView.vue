<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Itinerary</h5>
    </div>
    <div class="card-body">
      <ul class="list-unstyled">
        <li>From: {{ itinerary.from }}</li>
        <li>To: {{ itinerary.to }}</li>
        <li>Time: {{ itinerary.time }}</li>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Itinerary} from "../types/Itinerary.ts";
defineProps({
  itinerary: {
    type: Object as () => Itinerary,
    required: true
  }
});

</script>

<style lang="sass" scoped>
.card
  padding: 0
  margin-bottom: 5px
</style>