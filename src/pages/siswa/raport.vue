<template>
  <div class="container">
    <!-- <NavbarSiswa /> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center tw-mb-10">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">RAPORT SISWA</span>
              </p>
            </div>
            <div>
              <q-card>
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                  align="justify">
                  <q-tab name="1" label="Semester Ganjil" />
                  <q-tab name="2" label="Semester Genap" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="1" class="q-pa-none">
                    <RapotSiswa :TabPilihan="'1'"/>
                  </q-tab-panel>

                  <q-tab-panel name="2">
                    <RapotSiswa :TabPilihan="'2'"/>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </q-card-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
import RapotSiswa  from "../../components/siswa/RaportSiswa.vue";
import { stringify } from "postcss";

export default {
  components: {
    NavbarSiswa,
    RapotSiswa ,
  },

  setup() {
    const tab = ref("1");
    return {
     
      tab: ref("1"),
     
    };
  },
  watch: {
   tab(newVal) {
   
      sessionStorage.setItem('smt', newVal);
    }
  },

};
</script>
