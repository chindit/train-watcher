<template>
  <h1>Trains</h1>
  <itinerary-view v-for="itinerary in itineraries" :key="itinerary.id" :itinerary="itinerary" />
  <button type="button" class="btn btn-primary mb-3 mt-2" data-bs-toggle="modal" data-bs-target="#itineraryModal">Add new itinerary</button>
  <connection-view :connections="trains" />
  <button @click="fetchStart" class="mb-3">Refresh</button>

  <div class="modal fade" id="itineraryModal" tabindex="-1" aria-labelledby="itineraryModalTitle" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="itineraryModalTitle">Add new Itinerary</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="departureStation" class="form-label">Departure station</label>
            <input type="text" class="form-control" id="departureStation" v-model="template.from">
          </div>
          <div class="mb-3">
            <label for="arrivalStation" class="form-label">Arrival station</label>
            <input type="text" class="form-control" id="arrivalStation" v-model="template.to">
          </div>
          <div class="mb-3">
            <label for="departureTime" class="form-label">Departure time</label>
            <input type="time" class="form-control" id="departureTime" v-model="template.time">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addItinerary" data-bs-dismiss="modal">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import dayjs from 'dayjs';
import {Ref, ref} from "vue";
import ItineraryView from "./components/ItineraryView.vue";
import {Itinerary} from "./types/Itinerary.ts";
import {ConnectionsResponse} from "./types/ConnectionsResponse.ts";
import {Connection} from "./types/Connection.ts";
import ConnectionView from "./components/ConnectionView.vue";

let trains: Ref<Connection[]> = ref([]);
let itineraries = ref<Itinerary[]>(JSON.parse(localStorage.getItem('itineraries') || JSON.stringify([])) as Itinerary[]);
const template = {
  from: '',
  to: '',
  time: '00:00'
}

const fetchStart = async () => {
  const date = dayjs().date().toString().padStart(2, '0') + (dayjs().month() + 1).toString().padStart(2, '0') + dayjs().year().toString().slice(2, 4);
  const itinerary = findNearestFutureItinerary(itineraries.value);

  if (itinerary === null) {
    return;
  }

  const { data: response } = await axios.get<ConnectionsResponse>('https://api.irail.be/connections/?from=' + itinerary.from + '&to=' + itinerary.to + '&date=' + date + '&time=' + itinerary.time.replace(/:/g, "") + '&lang=fr&format=json');
  trains.value = (response as ConnectionsResponse).connection;
}

const addItinerary = () => {
  const itinerary: Itinerary = {
    id: crypto.randomUUID(),
    from: template.from,
    to: template.to,
    time: template.time
  };
  itineraries.value.push(itinerary);
  localStorage.setItem('itineraries', JSON.stringify(itineraries.value));
}

const findNearestFutureItinerary = (itineraries: Itinerary[]): Itinerary|null => {
  const now = new Date();
  return itineraries.reduce((closest: Itinerary, current: Itinerary): Itinerary => {
    const closestTimeDiff = Math.abs(new Date(`1970-01-01T${closest.time}:00`).getTime() - now.getTime());
    const currentTimeDiff = Math.abs(new Date(`1970-01-01T${current.time}:00`).getTime() - now.getTime());

    return currentTimeDiff < closestTimeDiff ? current : closest;
  });
};

fetchStart();
</script>

<style scoped>

</style>
