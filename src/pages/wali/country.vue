<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2" style="height: 87vh">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >ONE DAY FOR YOUR COUNTRY</span
                >
                <br />
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: 700px">
              <q-card-section>
                <div class="row">
                  <div class="col-md-6">
                    <div class="q-pa-md">
                      <!-- <div class="text-h6 text-left">Filter</div>
                      <q-select
                        dense
                        outlined
                        v-model="selectedActivity"
                        :options="activityOptions"
                        label=""
                        style="width: 50%"
                      /> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-right text-bold">
                      <br /><br />
                      <span style="font-size: large">
                        Target : <br />
                        {{ activity?.target }} Jam Pertahun
                      </span>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="">
                  <div
                    class="text-left text-bold flex tw-justify-between tw-px-5 tw-my-5"
                  >
                    <div class="tw-text-xl">Rekap</div>
                    <div>
                      <q-btn
                        color="blue"
                        label="Tambah"
                        @click="alert = true"
                      />
                    </div>
                  </div>
                  <q-markup-table separator="cell">
                    <thead>
                      <tr>
                        <th class="text-center" style="width: 10px">No</th>
                        <th class="text-center" style="width: 500px">
                          Aktivitas
                        </th>
                        <th class="text-center">Durasi</th>
                        <th class="text-center">Total Durasi</th>
                        <th class="text-center">Keterangan</th>
                        <th class="text-center">Status</th>
                        <th class="text-center" style="width: 100px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(activity, index) in countryActivity"
                        :key="index"
                      >
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-left">{{ activity?.activity }}</td>
                        <td class="text-right">{{ activity?.duration }}</td>
                        <td class="text-right">
                          {{ activity?.duration }}
                        </td>
                        <td class="text-right">{{ activity?.remark }}</td>
                        <td class="text-right"> {{ activity?.status }}</td>
                        <td class="text-right">
                          <q-btn
                            :disable="!activity?.certificate_path"
                            color="secondary"
                            label="Sertifikat"
                            @click="
                              downloadSertifikat(activity?.certificate_path)
                            "
                          />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <q-dialog v-model="alert">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Tambah Aktivitas</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>
          <label for="">Aktivitas</label>
          <q-select
            filled
            v-model="model"
            :options="options"
            label="Aktivitas"
          />
        </div>
        <div v-if="model === 'Lainnya'">
          <q-input filled label="Lainnya" v-model="inputActivity" />
        </div>
        <div class="tw-mt-5">
          <label for="">Durasi</label>
          <q-input filled label="Durasi" v-model="durasi" />
        </div>
        <div class="tw-mt-5">
          <label for="">Keterangan</label>
          <q-input filled label="Keterangan" v-model="keterangan" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Simpan" color="primary" @click="createDataCountry" />
        <q-btn label="Close" color="grey" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { data } from "autoprefixer";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  data() {
    return {
      activity: ref(),
      countryActivity: ref([]),
      alert: ref(false),
      model: ref(null),
      inputActivity: ref(),
      durasi: ref(),
      durasi: ref(),
      keterangan: ref(),
      options: ["Guru Tamu", "Perpustakaan", "Lainnya"],
    };
  },
  methods: {
    async createDataCountry() {
      try {
        const id = this.activity?.id;
        const token = sessionStorage.getItem("token");

        const formData = new FormData();
        formData.append("for_country_id", id);
        formData.append(
          "activity",
          this.model === "Lainnya" ? this.inputActivity : this.model
        );
        formData.append("duration", this.durasi);
        formData.append("remark", this.keterangan);

        const response = await this.$api.post(
          `for-country-detail/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.alert = false
        this.getDataCountryUser();
      } catch (err) {
        console.log(err);
      }
    },
    async getDataCountryUser() {
      try {
        const id = sessionStorage.getItem("idUser");
        const token = sessionStorage.getItem("token");
        const response = await this.$api.get(
          `for-country/show-by-user/${id}?academic=2023/2024`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.activity = response.data?.data[0];
        this.countryActivity = response.data?.data[0]?.forcountrydetails;

      } catch (err) {
        console.log(err);
      }
    },

    async downloadSertifikat(path) {
      console.log(path);
      Swal.fire({
        title: "Sertifikat Belum Tersedia !",
        // text: "Refresh halaman atau hubungi admin",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          // window.location.reload();
        }
      });
    },
  },
  mounted() {
    // this.getDataCountry();
    this.getDataCountryUser();
  },
};
</script>
