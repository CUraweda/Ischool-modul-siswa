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
                      <q-btn v-if="!activity"
                        color="blue"
                        label="Tambah"
                        @click="countryDialog = true"
                      />
                      <q-btn
                        color="blue"
                        label="Tambah"
                        @click="alert = true"
                      />
                    </div>
                  </div>
                  <q-scroll-area
                    style="
                      height: 400px;
                      border: 10pxl;
                      outline: #e0e0e0 solid 2px;
                    "
                  >
                    <q-markup-table separator="cell" class="no-shadow">
                      <thead>
                        <tr>
                          <th class="text-center" style="width: 10px">No</th>
                          <th class="text-center" style="width: 500px">
                            Aktivitas
                          </th>
                          <th class="text-center">Keterangan</th>
                          <th class="text-center">Status</th>
                          <th class="text-center">Durasi</th>
                          <th class="text-center">Total Durasi</th>
                          <th class="text-center">Tanggal</th>
                          <th class="text-center">Konfirmasi Tanggal</th>
                          <th class="text-center">Download Sertifikat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(activity, index) in countryActivity"
                          :key="index"
                        >
                          <td class="text-center">{{ index + 1 }}</td>
                          <td class="text-left">{{ activity?.activity }}</td>
                          <td class="text-right">{{ activity?.remark }}</td>
                          <td class="text-right">{{ activity?.status }}</td>
                          <td class="text-right">{{ activity?.duration }}</td>
                          <td class="text-right">{{ activity?.duration }}</td>
                          <td class="text-right">
                            {{ getDateFromPlanDate(activity) }}
                          </td>
                          <td class="text-center">
                            <!-- :disable="activity?.status !== 'pelaksanaan'" -->
                            <q-btn
                              :disable="
                                !activity.plan_date || activity.is_date_approved
                              "
                              style="bg-green"
                              color="green"
                              label="Pilih Tanggal"
                              @click="
                                pickDate(activity?.plan_date, activity?.id)
                              "
                            />
                          </td>
                          <td class="text-right">
                            <q-btn
                              :disable="!activity?.certificate_path"
                              color="secondary"
                              label="Download Sertifikat"
                              @click="
                                downloadSertifikat(activity?.certificate_path)
                              "
                            />
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </q-scroll-area>
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
            :options="activityOptions"
            label="Aktivitas"
          />
        </div>
        <div v-if="model === 'Lainnya'">
          <q-input
            class="q-mt-md"
            filled
            label="Lainnya"
            v-model="inputActivity"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Simpan" color="primary" @click="createDataCountry" />
        <q-btn label="Kembali" color="grey" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="pickDateDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Pilih Tanggal</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <p>{{ dateOptions }}</p> -->
        <div class="q-pa-md">
          <q-option-group
            :options="dateOptions"
            type="radio"
            v-model="selectedDate"
          />
        </div>
        <!-- {{ selectedDate }}
        {{ activity?.id }}
        {{ this.countryId }} -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Pilih" color="primary" @click="confirmPickDate()" />
        <q-btn label="Kembali" color="grey" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="countryDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Tambah country</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="academic_year"
          :options="['2023/2024', '2024/2025']"
          label="Tahun Ajaran"
        />

        <q-input
          filled
          v-model="target"
          label="Target Pertahun"
          class="q-mt-md"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Simpan" color="primary" @click="createNegara" />
        <q-btn label="Kembali" color="grey" v-close-popup />
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
      academic_year: ref(""),
      target: ref(),
      countryDialog: ref(false),
      activity: ref(),
      countryActivity: ref([]),
      alert: ref(false),
      pickDateDialog: ref(false),
      model: ref(null),
      group: ref(null),
      inputActivity: ref(),
      durasi: ref(),
      durasi: ref(),
      keterangan: ref(),
      dateOptions: [],
      selectedDate: ref(null),
      activityOptions: [
        "Library",
        "Green House",
        "Green Lab",
        "Little Pond",
        "Little Farm",
        "Waste Bank",
        "Guru Tamu",
        "Display Kelas",
        "Lainnya",
      ],
      // options: [
      //   { label: "Date Option Dummy", value: "bat" },
      //   { label: "Date Option Dummy", value: "friend" },
      //   { label: "Date Option Dummy", value: "upload" },
      // ],
    };
  },
  methods: {
    getDateFromPlanDate(activity) {
      if (activity.is_date_approved) {
        try {
          const planDate = JSON.parse(activity.plan_date); // Mengubah string JSON menjadi objek JavaScript
          console.log("🚀 ~ getDateFromPlanDate ~ planDate:", planDate);
          return planDate[0].Date; // Mengambil tanggal dari array pertama plan_date
        } catch (error) {
          console.error("Error parsing plan_date:", error);
        }
      }
      return null;
    },

    async pickDate(plan_date, countryId) {
      this.countryId = countryId;
      const parsedPlanDate = JSON.parse(plan_date);
      this.dateOptions = parsedPlanDate.map((item) => {
        return {
          label: `Date: ${item.date} Start: ${item.start} End: ${item.end}`,
          value: JSON.stringify([
            { Date: item.date, Start: item.start, End: item.end },
          ]),
        };
      });
      this.pickDateDialog = true;
    },

    async createNegara() {
      try {
        const id = sessionStorage.getItem("idUser");
        const token = sessionStorage.getItem("token");

        const data = {
          user_id: parseInt(id),
          academic_year: this.academic_year,
          target: parseInt(this.target),
        };

        await this.$api.post(`for-country/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.countryDialog = false
      } catch (error) {
        console.error(error);
      }
    },

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
        // formData.append("duration", this.durasi);
        // formData.append("remark", this.keterangan);

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
        this.alert = false;
        this.getDataCountryUser();
      } catch (err) {
        console.log(err);
      }
    },

    async confirmPickDate() {
      try {
        const id = this.countryId;
        const token = sessionStorage.getItem("token");
        const formData = new FormData();
        formData.append("plan_date", this.selectedDate);
        formData.append("is_date_approved", true);
        const response = await this.$api.put(
          `for-country-detail/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.pickDateDialog = false;
        Swal.fire({
          title: "Tanggal Terpilih!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Close",
        });
        this.getDataCountryUser();
      } catch (err) {
        console.log(err);
        this.pickDateDialog = false;
        Swal.fire({
          title: "Tanggal Gagal Dipilih!",
          text: "Refresh halaman atau hubungi admin",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Close",
        });
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
        if(response.data.data.length < 1) return
        this.activity = response.data.data[0].id;
        this.countryActivity = response.data?.data[0].forcountrydetails;
      } catch (err) {
        console.log(err);
      }
    },

    async downloadSertifikat(path) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.get(
          `/for-country-detail/download?filepath=${path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const urlParts = path.split("/");
        const fileName = urlParts.pop();
        const blobUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", fileName);
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        Swal.fire({
          title: "Sertifikat Berhasil Diunduh!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Close",
        });
        this.getDataCountryUser();
      } catch (error) {
        console.error("Error downloading file:", error);
        Swal.fire({
          title: "Sertifikat Belum Tersedia !",
          text: "Refresh halaman atau hubungi admin",
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
      }
    },

    // async downloadSertifikat(path) {
    //   console.log(path);
    //   Swal.fire({
    //     title: "Sertifikat Belum Tersedia !",
    //     // text: "Refresh halaman atau hubungi admin",
    //     icon: "warning",
    //     showCancelButton: false,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Close",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       // window.location.reload();
    //     }
    //   });
    // },
  },
  mounted() {
    // this.getDataCountry();
    this.getDataCountryUser();
  },
};
</script>
