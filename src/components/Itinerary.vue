<template>
<form @submit="handleUpdate">
  <div class="field">
    <label>From</label>
    <input type="text" v-model="origin" required>
  </div>
  <div class="field">
    <label>To</label>
    <input type="text" v-model="arrival" required>
  </div>
  <div class="field">
    <label>Time</label>
    <input type="time" v-model="time" required>
  </div>
  <input type="submit" value="Submit">
</form>
</template>

<script setup lang="ts">
import {ref} from "vue";

const origin = ref(localStorage.getItem('departure'));
const arrival = ref(localStorage.getItem('arrival'));
const time = ref(localStorage.getItem('time'));

const handleUpdate = () => {
  localStorage.setItem('departure', origin.value || '');
  localStorage.setItem('arrival', arrival.value || '');
  localStorage.setItem('time', time.value || '');
}
</script>

<style scoped>

</style>