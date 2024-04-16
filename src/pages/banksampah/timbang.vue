<template>
  <div class="q-pa-md bg-image">
    <q-page class="flex flex-center">
      <div class="row justify-center">
        <div class="absolute-top-right">
          <p>Power By : <q-img src="../../assets/ips.png" style="width: 80%"></q-img></p>
        </div>
        <div class="col text-center">
            <p class="text-bold text-blue-7" style="font-size: xx-large;">SISTEM INFORMASI AKADEMIK</p> <br>
          <img alt="Quasar logo" src="../../assets/sade.png" style="width: 50%;">
          <div class="q-my-xl">
            <q-btn class="q-mx-sm" color="light-blue-6" label="Login" style="width: 8vw;" to="/login"/>
            <q-btn class="q-mx-sm" color="light-blue-6" label="wabsite" style="width: 8vw;" />
          </div>
        </div>
      </div>
      <div class="q-mb-sm absolute-bottom-left">
        <q-btn class="text-blue-1"  flat color="light-blue-3" label="siswa" style="width: 8vw;" to="/siswa"/>
        <q-btn class="text-blue-1" flat color="light-blue-3" label="wali" style="width: 8vw;" to="/wali"/>
        <q-btn class="text-blue-1" flat color="light-blue-3" label="timbangan" style="width: 8vw;" to="/timbangan"/>
      </div>
    </q-page>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'indexpage'
})
</script>
<style>
.bg-image {
  background-image: url('../../assets/bg2.png');
  background-repeat: no-repeat;
  background-size: cover, cover;

}
</style>

