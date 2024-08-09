<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'LocationMap',
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.initMap();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.mapContainer).setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([this.latitude, this.longitude]).addTo(this.map);
    },
    handleResize() {
      if (this.map) {
        this.map.invalidateSize();
      }
    }
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 30vh; /* Atur tinggi sesuai kebutuhan */
}

@media (max-width: 600px) {
  .map-container {
    height: 30vh; /* Contoh untuk layar kecil */
  }
}
</style>
