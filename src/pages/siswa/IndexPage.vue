<template>
  <div class="row">
    <div class="col-md-12 ">
      <div class="text-center bg-blue-2 tw-min-h-screen">
        <q-card-section>
          <div class="text-center">
            <p>
              <span class="text-center text-black text-bold" style="font-size: x-large">DASHBOARD SISWA</span>
            </p>
          </div>

          <div class="tw-mt-3 tw-flex tw-flex-wrap row">
            <div class="tw-w-1/3 tw-p-3 col-12 col-md ">
              <q-card class="bg-green-1 tw-w-full tw-h-80">
                <q-card-section>
                  <div class="row flex tw-flex-col justify-center items-center">
                    <p><span style="font-size: 200%" class="text-bold">Presensi</span></p>
                    <div class="row flex justify-center items-center tw-w-full">

                      <div class="img">
                        <q-img src="../../assets/sadeicon.png" />
                      </div>
                      <div class="col-md col-12 text-left">

                        <q-markup-table class="bg-green-1" flat>
                          <tbody>
                            <tr>
                              <td class="text-left">Hadir</td>
                              <td class="text-right">{{ hadir }}</td>
                            </tr>

                            <tr>
                              <td class="text-left">Sakit</td>
                              <td class="text-right">{{ sakit }}</td>
                            </tr>
                            <tr>
                              <td class="text-left">Izin</td>
                              <td class="text-right">{{ izin }}</td>
                            </tr>
                            <tr>
                              <td class="text-left">Alfa</td>
                              <td class="text-right">{{ alfa }}</td>
                            </tr>
                          </tbody>
                        </q-markup-table>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="tw-w-1/3 tw-p-3 col-12 col-md">

              <q-card class="bg-pink-1 tw-w-full tw-h-80">
                <q-card-section>
                  <div class="row flex tw-flex-col justify-center items-center">
                    <p>
                    <p><span style="font-size: 200%" class="text-bold">Raport Digital</span></p>

                    </p>
                    <div class="row flex justify-center items-center tw-w-full">

                      <div class="img">
                        <q-img src="../../assets/Asesmen.png" style="width: 70%" />
                      </div>
                      <div class="col-md-8 text-left">

                        <q-markup-table class="bg-pink-1" flat>
                          <tbody>
                            <tr>
                              <td class="text-left">Narasi</td>

                              <td>
                                <q-btn round color="green" icon="file_download"
                                  @click="downloadTask(raport?.narrative_path)" :disable="!raport?.narrative_path" />
                              </td>
                            </tr>
                            <tr>
                              <td class="text-left">Portofolio</td>

                              <td>
                                <q-btn round color="green" icon="file_download"
                                  @click="downloadTask(raport?.portofolio_path)" :disable="!raport?.portofolio_path" />
                              </td>
                            </tr>
                            <tr>
                              <td class="text-left">Raport Angka</td>

                              <td>
                                <q-btn round color="green" icon="file_download"
                                  @click="downloadTask(raport?.number_path)" :disable="!raport?.number_path" />
                              </td>
                            </tr>
                          </tbody>
                        </q-markup-table>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="tw-w-1/3 tw-p-3 col-12 col-md">

              <q-card class="bg-light-green-1 tw-w-full tw-h-80">
                <q-card-section>
                  <p style="font-size: 200%" class="text-bold">Overview</p>
                  <div class="text-left">
                    <p>Tema : {{ overview?.topic }}</p>
                    <p>Pemahaman : {{ overview?.meaningful_understanding }}</p>
                    <p>Periode : {{ overview?.period }}</p>
                    <p>TUP:</p>
                  </div>

                  <div class="text-justify" style="width: 95%">
                    <q-scroll-area style="height: 19vh" class="q-pa-sm">
                      <p>
                        {{ overview?.tup }}
                      </p>
                    </q-scroll-area>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class=" flex tw-flex-wrap tw-mt-2 row ">
            <div class="tw-w-1/3 tw-p-3  col-12 col-md">

              <q-card class="bg-yellow-1 tw-h-52">
                <q-card-section>
                  <div class="row flex justify-center items-center">
                    <div class="col-md-4">

                      <q-img src="../../assets/camper.png" style="width: 60%" />
                    </div>
                    <div class="col-md-8 text-left ">
                      <p style="font-size: 200%" class="text-bold">Agenda Kegiatan</p>
                      <div v-for="(item, index) in agenda" :key="item.id" class="tw-ml-3">
                        <li>
                          {{ getDateTime(item?.start_date) }} - {{ getDateTime(item?.end_date) }} : {{
                                item?.agenda
                              }}
                        </li>

                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="tw-w-1/3 tw-p-3 col-12 col-md">

              <q-card class="bg-light-blue-1 tw-h-52">
                <q-card-section>
                  <div class="row flex justify-center items-center">
                    <div class="col-md-4">

                      <q-img src="../../assets/book/total.png" style="width: 60%" />
                    </div>
                    <div class="col-md-8 text-left">
                      <p style="font-size: 200%" class="text-bold">Bank Sampah</p>
                      <q-markup-table class="bg-light-blue-1" flat>
                        <tbody>
                          <tr>
                            <td class="text-left">Terkumpul</td>
                            <td class="text-right">0</td>
                            <td class="text-left">kg</td>
                          </tr>
                          <tr>
                            <td class="text-left">Target</td>
                            <td class="text-right">0</td>
                            <td class="text-left">Hari</td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="tw-w-1/3 tw-p-3 col-12 col-md">

              <q-card class="bg-light-blue-1 tw-h-52">
                <q-card-section>
                  <div class="row flex justify-center items-center">
                    <div class="col-md-4">

                      <q-img src="../../assets/Achievement.png" style="width: 60%" />
                    </div>
                    <div class="col-md-8 text-left">
                      <p style="font-size: 200%" class="text-bold">Achievement</p>

                      <q-markup-table class="bg-light-blue-1" flat>
                        <tbody>
                          <tr>
                            <td class="text-left" style="font-size: medium">
                              {{ achevment?.achievement_desc }}
                            </td>
                          </tr>
                          <tr>
                            <td class="text-left" style="font-size: medium">
                              {{ getDateTime(achevment?.issued_at) }}

                            </td>
                          </tr>

                        </tbody>
                      </q-markup-table>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="tw-w-full tw-p-3">

            <q-card class="">
              <q-card-section class="text-left">
                <p class="text-left">
                  <br />
                  <span class="text-bold">Pengumuman</span>
                </p>

                <div v-for="(item, index) in pengumuman" :key="item.id" class="tw-ml-3">
                  <li>
                    {{ getDateTime(item?.date_start) }} - {{ getDateTime(item?.date_end) }} : {{ item?.announcement_desc
                    }}
                  </li>

                </div>

              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script>

import NavbarSiswa from "../../components/siswa/HederSiswa.vue"
import { ref } from 'vue'

export default {
  components: {
    NavbarSiswa
  },
  setup() {
    return {
      presensi: ref({}),
      agenda: ref(),
      achevment: ref(),
      overview: ref(),
      raport: ref(),
      hadir: ref(0),
      izin: ref(0),
      alfa: ref(0),
      sakit: ref(0),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      token: ref(sessionStorage.getItem("token")),
      pengumuman: ref([])
    }
  },

  methods: {

    getDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },
    async getPresensi() {
      try {
        const response = await this.$api.get(`student-attendance/show-by-student/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        const filterHadir = response.data.data.filter(
          (a) => a.status === "Hadir"
        );
        const filterIzin = response.data.data.filter(
          (a) => a.status === "Izin"
        );
        const filterSakit = response.data.data.filter(
          (a) => a.status === "Sakit"
        );
        const filterAlfa = response.data.data.filter(
          (a) => a.status === "Alfa"
        );
        this.hadir = filterHadir.length
        this.izin = filterIzin.length
        this.sakit = filterSakit.length
        this.alfa = filterAlfa.length

      } catch (err) {
        console.log(err);
      }
    },
    async getAgenda() {
      try {
        const response = await this.$api.get(
          `edu-calendar-detail?search_query=&page=0&limit=100`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );


        const data = response.data.data.result;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        let futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 5);
        futureDate.setHours(23, 59, 59, 999);

        const filterData = data?.filter(item => {
          let itemDate = new Date(item?.start_date)
          return itemDate >= currentDate && itemDate <= futureDate
        })

        if(filterData?.length > 5){
          filterData = filterData.slice(0, 5);
        }

        
        this.agenda = filterData
        console.log(filterData);

      } catch (error) { }
    },
    async getPengumuman() {

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date();
      const endDate = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
      const formattedStartDate = startDate.toISOString().slice(0, 10);
      const formattedEndDate = endDate.toISOString().slice(0, 10);

      try {
        const response = await this.$api.get(`/announcement/show-between?start=${formattedStartDate}&end=${formattedEndDate}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        this.pengumuman = response.data.data
      } catch (err) {
        console.log(err);
      }
    },
    async getAchevment() {

      try {
        const response = await this.$api.get(`/achievement/show-by-student/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        this.achevment = response.data.data

      } catch (err) {
        console.log(err);
      }
    },
    async getOverview() {

      try {
        const response = await this.$api.get(`/overview/show-active`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        this.overview = response.data.data


      } catch (err) {
        console.log(err);
      }
    },
    async getSiswaById() {

      try {
        const response = await this.$api.get(`/student/show/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        const id = response.data.data[0].studentclasses[0].class_id
        sessionStorage.setItem('idClass', id)


      } catch (err) {
        console.log(err);
      }
    },
    async getRaport() {
      try {
        const response = await this.$api.get(`/student-report/show-by-student?id=${this.idSiswa}&semester=1`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        console.log(response.data.data[0]);
        this.raport = response.data.data[0]

      } catch (err) {
        console.log(err);
      }
    },
    async downloadTask(path) {
      try {
        const response = await this.$api.get(
          `student-task/download?filepath=${path}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
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
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },

  },
  mounted() {
    this.getRaport()
    this.getSiswaById()
    this.getPresensi()
    this.getAgenda()
    this.getPengumuman()
    this.getAchevment()
    this.getOverview()
  },

};
</script>


<style>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .img {
    display: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .img {
    display: flex;
    width: 30%;
  }
}
</style>
