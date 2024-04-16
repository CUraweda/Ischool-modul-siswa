<template>
  <div class="row">
    <div class="col-md-2 text-center">
      <p class="text-bold">
        <span style="font-size: 3rem">{{ currentTime }}</span> <br />
        {{ currentDate }}
      </p>
    </div>
    <div class="col-md-8"></div>
    <div class="col-md-2 text-right q-pr-md q-pb-md">
      <br />
      <q-img src="../../assets/sade.png" style="width: 40%"></q-img>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavbarSiswa',
  data() {
    return {
      currentDate: "",
      currentTime: "",
    };
  },

  mounted() {
    this.getCurrentDateTime();
    setInterval(() => {
      this.getCurrentDateTime();
    }, 60000);
  },

  methods: {
    getCurrentDateTime() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-ID', { month: 'long', day: 'numeric', year: 'numeric' });
      const formattedTime = now.toLocaleTimeString('en-ID', { hour: 'numeric', minute: 'numeric' });
      this.currentDate = formattedDate;
      this.currentTime = formattedTime;
    },
  },

}
</script>
