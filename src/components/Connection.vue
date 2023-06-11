<script setup lang="ts">
defineProps({
  connections: {
    type: Array<Connection>,
    required: true
  }
})

const toTime = function(timestamp: number): String
{
  return (new Date(timestamp*1000)).toLocaleTimeString();
}
const toDelay = (delay: number): number => {
  return Math.round(delay/60);
}
</script>

<template>
  <div class="is-grid">
    <div class="is-grid has-5-columns is-bold">
      <div>Departure</div>
      <div>Train number</div>
      <div>Destination</div>
      <div>Track</div>
      <div>Delay</div>
    </div>
    <div v-for="train in connections" class="is-grid has-5-columns">
      <div>{{ toTime(train.departure.time) }}</div>
      <div>{{ train.departure.vehicleinfo.type }} {{ train.departure.vehicleinfo.number }}</div>
      <div>{{ train.arrival.direction.name }}</div>
      <div>{{ train.departure.platform }}</div>
      <div
          :class="{
            'is-success': toDelay(train.departure.delay) < 5,
            'is-warning': toDelay(train.departure.delay) < 15,
            'is-danger': toDelay(train.departure.delay) >= 15
          }"
      >
        {{ toDelay(train.departure.delay) }} min
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>