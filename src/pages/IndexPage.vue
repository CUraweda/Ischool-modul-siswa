<template>
  <div class="q-pa-md bg-image">
    <q-page class="flex flex-center">
      <div class="row justify-center">
        <div class="absolute-top-right">
          <p>Power By : <q-img src="../assets/ips.png" style="width: 80%"></q-img></p>
        </div>
        <div class="col text-center flex justify-center tw-flex-col tw-gap-5">
          <div>
            <p class="text-bold text-blue-7" style="font-size: xx-large;">SISTEM INFORMASI AKADEMIK</p> <br>
          </div>
          <div class="tw-w-full flex justify-center">

            <img alt="Quasar logo" src="../assets/sade.png">
          </div>
          <div class="tw-mt-5 flex tw-w-full justify-center items-center">
            <q-btn class="q-mx-sm" color="light-blue-6" label="Login"  to="/login" />
            <q-btn class="q-mx-sm" color="light-blue-6" label="website" type="a" target="_blank"
              href="https://sekolahalamdepok.sch.id" />
          </div>
        </div>
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
  background-image: url('../assets/bg2.png');
  background-repeat: no-repeat;
  background-size: cover, cover;

}
</style>

