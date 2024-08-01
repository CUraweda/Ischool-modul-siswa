<template>
  <div>
    <div v-if="loading" class="loading-container">
      <q-spinner color="primary" size="40px" />
    </div>
    <div v-else id="map" style="height: 200px; width: 100%;"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue';
import L from 'leaflet';

const props = defineProps({
  latitude: Number,
  longitude: Number,
  loading: Boolean
});

const map = ref(null);

onMounted(() => {
  if (!props.loading) {
    map.value = L.map('map').setView([props.latitude, props.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value);

    L.marker([props.latitude, props.longitude]).addTo(map.value)
      .bindPopup('Lokasi Anda.')
      .openPopup();
  }
});

watch([() => props.latitude, () => props.longitude, () => props.loading], ([newLat, newLng, isLoading]) => {
  if (map.value && !isLoading) {
    map.value.setView([newLat, newLng], 13);
    L.marker([newLat, newLng]).addTo(map.value)
      .bindPopup('Lokasi Anda.')
      .openPopup();
  }
});
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}

.loading-container {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
