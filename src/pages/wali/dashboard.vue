<template>
  <div class="bg-blue-2 q-pa-md tw-min-h-screen">
    <div class="text-center">
      <p>
        <span
          class="text-center text-black text-bold"
          style="font-size: x-large"
          >DASHBOARD ORANG TUA</span
        >
      </p>
    </div>

    <div class="q-mt-md tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
      <div>
        <!-- presensi  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-green-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="tw-w-1/3">
                  <q-img src="../../assets/sadeicon.png" />
                </div>
                <div class="text-h5 q-ml-sm text-bold">Presensi</div>
              </div>
            </q-card-section>

            <q-card-section>
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
            </q-card-section>
          </q-card>
        </div>
        <!-- agenda  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-yellow-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="tw-w-1/4">
                  <q-img src="../../assets/camper.png" />
                </div>
                <div class="text-h5 q-ml-md text-bold">Agenda kegiatan</div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-markup-table class="bg-yellow-1" flat>
                <tbody>
                  <tr v-for="item in agenda" :key="item.id">
                    <td class="text-bold">
                      {{ getDateTime(item?.start_date) }} -
                      {{ getDateTime(item?.end_date) }}
                    </td>
                    <td>: {{ item.agenda }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div>
        <!-- raport digital  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-pink-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="tw-w-1/5">
                  <q-img src="../../assets/Asesmen.png" />
                </div>
                <div class="text-h5 q-ml-sm text-bold">Rapot Digital</div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-markup-table class="bg-pink-1" flat>
                <tbody>
                  <tr>
                    <td class="text-left">Narasi</td>
                    <td>
                      <div class="row justify-end">
                        <q-btn
                          round
                          color="green"
                          icon="file_download"
                          @click="downloadTask(raport?.narrative_path)"
                          :disable="!raport?.narrative_path"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Portofolio</td>
                    <td>
                      <div class="row justify-end">
                        <q-btn
                          round
                          color="green"
                          icon="file_download"
                          @click="downloadTask(raport?.portofolio_path)"
                          :disable="!raport?.portofolio_path"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">Raport Angka</td>
                    <td>
                      <div class="row justify-end">
                        <q-btn
                          round
                          color="green"
                          icon="file_download"
                          @click="downloadTask(raport?.number_path)"
                          :disable="!raport?.number_path"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
        </div>

        <!-- bank sampah  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-light-blue-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="tw-w-1/5">
                  <q-img src="../../assets/book/total.png" />
                </div>
                <div class="text-h5 q-ml-md text-bold">Bank Sampah</div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-markup-table class="bg-light-blue-1" flat>
                <tbody>
                  <tr>
                    <td class="text-left">Terkumpul</td>
                    <td class="text-right">
                      <!-- {{   (rekapSampah[0]?.this_month ?? 0) / 1000 }} -->
                      {{ totalSampah }}
                    </td>
                    <td class="text-left">Kg</td>
                  </tr>
                  <tr>
                    <td class="text-left">Target</td>
                    <td class="text-right">{{ targetSampah }}</td>
                    <td class="text-left">Kg</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div>
        <!-- overview  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-light-green-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="text-h5 q-ml-sm text-bold">Overview</div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-markup-table class="bg-light-green-1" flat>
                <tbody>
                  <tr>
                    <td>Tema</td>
                    <td>: {{ overview?.topic }}</td>
                  </tr>
                  <tr>
                    <td>Pemahaman</td>
                    <td>: {{ overview?.meaningful_understanding }}</td>
                  </tr>
                  <tr>
                    <td>Periode</td>
                    <td>: {{ overview?.period }}</td>
                  </tr>
                  <tr v-if="overview?.class">
                    <td>Kelas</td>
                    <td>: {{ overview.class.class_name ?? "-" }}</td>
                  </tr>
                </tbody>
              </q-markup-table>

              <q-card flat bordered class="q-mt-sm">
                <q-card-section>
                  <q-scroll-area style="height: 19vh">
                    <b>TUP</b> <br />
                    {{ overview?.tup }}
                  </q-scroll-area>
                </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>
        </div>

        <!-- achievement  -->
        <div class="q-pa-sm">
          <q-card flat bordered class="bg-light-blue-1">
            <q-card-section class="q-pb-none">
              <div class="row items-center no-wrap">
                <div class="tw-w-1/5">
                  <q-img src="../../assets/Achievement.png" />
                </div>
                <div class="text-h5 q-ml-md text-bold">Achievement</div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-markup-table class="bg-light-blue-1" flat>
                <tbody>
                  <tr>
                    <td class="text-bold">
                      {{ getDateTime(achevment?.issued_at) }}
                    </td>
                    <td>
                      {{ achevment?.achievement_desc ?? "-" }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="q-pa-sm">
      <q-card flat bordered class="">
        <q-card-section class="q-pb-none">
          <div class="row items-center no-wrap">
            <div class="text-h5 q-ml-md text-bold">Pengumuman</div>
          </div>
        </q-card-section>

        <q-card-section>
          <ul class="tw-list-disc q-pl-xl">
            <li v-for="item in pengumuman" :key="item.id" class="q-my-md">
              <div class="row items-center">
                <div class="col">
                  <span class="text-bold">
                    {{ getDateTime(item?.date_start) }} -
                    {{ getDateTime(item?.date_end) }}
                  </span>
                  <span>: {{ item?.announcement_desc ?? "-" }}</span>
                </div>
                <div class="col-auto">
                  <button class="right">
                    <q-icon
                      name="open_in_new"
                      size="sm"
                      @click="openModal(item)"
                    />
                  </button>
                </div>
              </div>
              <q-separator class="q-my-sm" />
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="isModalOpen" persistent maximized>
      <q-card>
        <q-card-section>
          <div class="text-h6 tw-m-2">
            {{ this.detailPengumuman?.announcement_desc }}
          </div>
          <q-btn
            flat
            label="download disini jika pdf tidak muncul"
            color="primary"
            v-if="this.detailPengumuman.file_path != null"
            @click="downloadFile(this.detailPengumuman.file_path)"
          />
          <div
            v-if="this.detailPengumuman.file_path != null"
            class="pdf-viewer"
          >
            <iframe :src="pdfUrl" width="100%"></iframe>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Keluar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
import { ref } from "vue";

export default {
  components: {
    NavbarSiswa,
  },

  setup() {
    return {
      isModalOpen: ref(false),
      selectedFile: "",
      detailPengumuman: ref([]),
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
      idClass: ref(sessionStorage.getItem("idClass")),
      token: ref(sessionStorage.getItem("token")),
      pengumuman: ref([]),
      rekapSampah: ref([]),
      hasiltarget: ref(),
      targetSampah: ref(),
      totalSampah: ref(),
      pdfUrl: ref(),
    };
  },
  methods: {
    openModal(data) {
      this.detailPengumuman = data;
      this.selectedFile = this.detailPengumuman.file_path;
      this.displayFile(this.detailPengumuman.file_path);
      this.isModalOpen = true;
    },
    getDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },
    async getDataSiswa() {
      const idUser = sessionStorage.getItem("idUser");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/user-access/show-by-user/${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const id = response.data.data[0].student.id;
        const idSiswaFix = this.idSiswa ? this.idSiswa : id;

        this.getPresensi(idSiswaFix);
        this.getAchevment(idSiswaFix);
        this.getSiswaById(idSiswaFix);
        this.getRaport(idSiswaFix);
        this.getRekapSampah(idSiswaFix);
        this.getRekapSampahbulan(idSiswaFix);
      } catch (error) {
        console.log(error);
      }
    },
    async getPresensi(idSiswa) {
      try {
        const response = await this.$api.get(
          `student-attendance/show-by-student/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
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
        this.hadir = filterHadir.length;
        this.izin = filterIzin.length;
        this.sakit = filterSakit.length;
        this.alfa = filterAlfa.length;
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

        let futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 5);
        futureDate.setHours(23, 59, 59, 999);

        let filterData = data?.filter((item) => {
          let itemDate = new Date(item?.start_date);
          return itemDate >= currentDate && itemDate <= futureDate;
        });

        if (filterData?.length > 5) {
          filterData = filterData.slice(0, 5);
        }
        //as

        this.agenda = filterData;
      } catch (error) {}
    },

    async getPengumuman(idClass) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date();
      const endDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      const formattedStartDate = startDate.toISOString().slice(0, 10);
      const formattedEndDate = endDate.toISOString().slice(0, 10);

      try {
        const response = await this.$api.get(
          `/announcement/show-between?start=${formattedStartDate}&end=${formattedEndDate}&class_id=${idClass}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.pengumuman = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async displayFile(path) {
      try {
        const token = sessionStorage.getItem("token");
        const idUser = sessionStorage.getItem("idSiswa");
        const response = await this.$api.get(
          `student-task/download?filepath=${path}&student_id=${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const typePath = path.split(".");
        const fileExtension = typePath[typePath.length - 1];
        // Cek apakah file bertipe PDF
        if (fileExtension === "pdf") {
          this.typePathFile = true;
        } else {
          this.typePathFile = false;
        }
        // Cek tipe konten dan buat Blob dari response
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], {
          type: fileExtension === "pdf" ? "application/pdf" : contentType,
        });
        const blobUrl = window.URL.createObjectURL(blob);
        console.log("🚀 ~ this.pdfUrl:", blob);

        // Set URL Blob berdasarkan tipe konten
        this.pdfUrl = blobUrl;
      } catch (error) {
        console.error("Error displaying file:", error);
      }
    },
    async downloadFile(path) {
      try {
        const token = sessionStorage.getItem("token");
        const idUser = sessionStorage.getItem("idSiswa");
        const response = await this.$api.get(
          `student-task/download?filepath=${path}&student_id=${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        // Buat Blob dari response
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
        // Jika file PDF, tampilkan di iframe
        if (contentType.includes("pdf")) {
          this.pdfUrl = blobUrl;
        } else if (contentType.includes("image")) {
          // Jika file adalah gambar, tampilkan sebagai gambar
          this.pdfUrl = blobUrl;
        }
        // Buat elemen anchor untuk mendownload file
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = path.split("/").pop(); // Nama file dari path
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },
    async getAchevment(idSiswa) {
      try {
        const response = await this.$api.get(
          `/achievement/show-by-student/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.achevment = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getOverview(idClass) {
      try {
        const response = await this.$api.get(
          `/overview/show-active?class_id=${idClass || ""}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.overview = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getSiswaById(idSiswa) {
      try {
        const response = await this.$api.get(`/student/show/${idSiswa}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const id = response.data.data[0].studentclasses[0].class_id;
        sessionStorage.setItem("idClass", id);
      } catch (err) {
        console.log(err);
      }
    },
    async getRaport(idSiswa) {
      try {
        console.log({ idSiswa });

        const response = await this.$api.get(
          `/student-report/show-by-student?id=${idSiswa}&semester=1`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const idClass = response.data.data[0].studentclass.class_id;
        console.log(response.data);

        this.getPengumuman(idClass);
        this.raport = response.data.data[0];
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
    async getRekapSampah(idSiswa) {
      try {
        const response = await this.$api.get(
          `waste-collection/target-achievement-by-student/${idSiswa}?is_current=1`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        const total = [response.data.data[0].weight / 1000];
        const target = Math.round(
          response.data.data[0].studentclass.class.waste_target
        );
        const hasilTarget = (total / target) * 100;
        console.log(hasilTarget);
        this.hasiltarget = [Math.round(hasilTarget)];
        this.targetSampah = target;
        this.totalSampah = total[0];
      } catch (error) {}
    },
    async getRekapSampahbulan(idSiswa) {
      try {
        const response = await this.$api.get(
          `waste-collection/show-recap-history/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.rekapSampah = response.data.data;
      } catch (error) {}
    },
  },

  mounted() {
    this.getDataSiswa();
    this.getAgenda();
    this.getOverview(sessionStorage.getItem("idClass"));
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
.pdf-viewer {
  width: 100%;
  height: 80vh; /* 100% of the viewport height */
  overflow: hidden; /* Ensure no scrolling */
}
iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>
