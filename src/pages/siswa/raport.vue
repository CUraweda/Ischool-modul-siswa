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
            <div class="q-mb-md align-center justify-center">
              <q-select
                class="text-center"
                style="width: 200px"
                filled
                v-model="tahun"
                :options="yearOptions"
                label="Tahun"
              />
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
                    <RapotSiswa
                      :TabPilihan="'1'"
                      :avabile="isAvabile"
                      :tahun="tahun"
                    />
                  </q-tab-panel>

                  <q-tab-panel name="2">
                    <RapotSiswa
                      :TabPilihan="'2'"
                      :avabile="isAvabile"
                      :tahun="tahun"
                    />
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
import RapotSiswa from "../../components/siswa/RaportSiswa.vue";
import { stringify } from "postcss";

export default {
  components: {
    NavbarSiswa,
    RapotSiswa,
  },

  data() {
    return {
      isAvabile: ref(null),
      yearOptions: ref([]),
      tahun: ref("2023/2024"),
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
      sessionStorage.setItem("smt", newVal);
    },
    tahun(newVal) {
      console.log(this.tahun);
    },
  },

  mounted() {
    this.getDataUnpaidBiling();
    this.getAcademicYear();
  },

  methods: {
    async getAcademicYear() {
      const idKelas = sessionStorage.getItem("idClass");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/academic-year?search_query=&limit=10000&page=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data.data.result;
        console.log(
          "🚀 ~ getAcademicYear ~ respon:",
          response.data.data.result
        );
        this.yearOptions = result.map((item) => item.name);
        console.log(
          "🚀 ~ getKategoriRapot ~ this.yearOptions:",
          this.yearOptions
        );
      } catch (error) {
        console.log(error);
      }
    },

    async getDataUnpaidBiling() {
      const idSiswa = sessionStorage.getItem("idSiswa");
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
        console.log("🚀 ~ getDataUnpaidBiling ~ response:", response);

        const dataBilling = response.data.data.length;
        this.isAvabile = dataBilling <= 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
