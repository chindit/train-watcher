<template>
  <h1>Trains</h1>
  <itinerary />
  <connection :connections="trains" />
  <button @click="fetchStart">Refresh</button>
</template>

<script setup lang="ts">
import axios from "axios";
import * as dayjs from "dayjs";
import Connection from "./components/Connection.vue";
import {ref} from "vue";
import Itinerary from "./components/Itinerary.vue";

let trains = ref<Connection[]>([]);
const fetchStart = async () => {
  const date = dayjs().date().toString().padStart(2, '0') + (dayjs().month() + 1).toString().padStart(2, '0') + dayjs().year().toString().slice(2, 4);
  const time = '0730'

  const { data: response } = await axios.get<ConnectionsResponse>('https://api.irail.be/connections/?from=Ottignies&to=Etterbeek&date=' + date + '&time=' + time + '&lang=fr&format=json');
  trains.value = (response as ConnectionsResponse).connection;
}
</script>

<style scoped>

</style>
