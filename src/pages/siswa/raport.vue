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
                    <RapotSiswa :TabPilihan="'1'" :avabile="isAvabile"/>
                    <RapotSiswa :TabPilihan="'1'" :avabile="isAvabile"/>
                  </q-tab-panel>

                  <q-tab-panel name="2">
                    <RapotSiswa :TabPilihan="'2'" :avabile="isAvabile"/>
                    <RapotSiswa :TabPilihan="'2'" :avabile="isAvabile"/>
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

  data() {
    return {
      isAvabile: ref(null),
    };
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
  },

  mounted() {
    this.getDataUnpaidBiling()
  },

  methods: {
    async getDataUnpaidBiling() {
      const idSiswa = sessionStorage.getItem("idSiswa");
      // console.log("🚀 ~ getDataUnpaidBiling ~ idSiswa:", idSiswa)
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
        // console.log("🚀 ~ getDataUnpaidBiling ~ this.avabile:", this.avabile)
        // console.log("🚀 ~ getDataUnpaidBiling ~ this.dataBilling:", dataBilling)
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
