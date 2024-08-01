<template>
  <div class="container">
    <!-- <NavbarSiswa /> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center tw-mb-10">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >RAPORT SISWA</span
                >
              </p>
            </div>
            <div>
              <q-card>
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                >
                  <q-tab name="1" label="Semester Ganjil" />
                  <q-tab name="2" label="Semester Genap" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="1" class="q-pa-none">
                    <Rapot :TabPilihan="'1'" :avabile="isAvabile"/>
                  </q-tab-panel>

                  <q-tab-panel name="2">
                    <Rapot :TabPilihan="'2'" :avabile="isAvabile"/>
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
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch } from "vue";
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
import Rapot from "../../components/siswa/RaportSiswa.vue";

export default {
  components: {
    NavbarSiswa,
    Rapot,
  },

  data() {
    return {
      isAvabile: ref(true),
    };
  },

   setup() {

    return {
      tab: ref("1"),
    };
  },

  mounted() {
    this.getDataUnpaidBiling()
  },

  methods: {
    async getDataUnpaidBiling() {
      const idSiswa = sessionStorage.getItem("idSiswa");
      console.log("🚀 ~ getDataUnpaidBiling ~ idSiswa:", idSiswa)
      const token = sessionStorage.getItem("token");

      try {
        const response = await this.$api.get(
          `/student-bills/get-by-student-id/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              status: "belum lunas",
            },
          }
        );
        console.log("🚀 ~ getDataUnpaidBiling ~ response:", response)

        // const filterDataBilling = response.data.data.filter((a) => a.paidoff_at === null);
        // console.log("🚀 ~ getDataUnpaidBiling ~ filterDataBilling:", filterDataBilling)

        const dataBilling = response.data.data.length;
        this.isAvabile = dataBilling <= 0;

        // console.log("🚀 ~ getDataUnpaidBiling ~ this.isAvabile:", this.isAvabile)
        // console.log("🚀 ~ getDataUnpaidBiling ~ this.dataBilling:", dataBilling)
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

