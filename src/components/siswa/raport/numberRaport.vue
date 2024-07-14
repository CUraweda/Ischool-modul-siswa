<template>
  <div class="text-h4 q-mb-md">Raport Angka</div>
  <!-- <div style="height: 100%"> -->
  <!-- <q-markup-table class="" separator="cell" bordered="">
      <thead>
        <tr>
          <th rowspan="2" class="text-center">No</th>
          <th rowspan="2" class="text-center">Nama Pelajaran</th>
          <th rowspan="2" class="text-center">
            Kriteria <br />
            Ketuntasan <br />
            Minimal
          </th>
          <th colspan="2" class="text-center">Nilai</th>
        </tr>
        <tr>
          <th class="text-center">Angka</th>
          <th class="text-center">Huruf</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataRaport" :key="item.id">
          <td class="text-left" style="width: 10px">{{ index + 1 }}</td>
          <td class="text-left">{{ item?.subject_name }}</td>
          <td class="text-center">{{ item?.threshold }}</td>
          <td class="text-center">{{ item?.grade }}</td>
          <td class="text-left">{{ item?.grade_text }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <br />
  <q-separator />
  <br />
  <div>
    <q-markup-table separator="cell" v-if="dataPersonality">
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th class="text-center">Kepribadian</th>
          <th class="text-center">Nilai <br /></th>
          <th class="text-center">Ketidak Hadiran</th>
          <th class="text-center">Hari</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left" style="width: 10px">1</td>
          <td class="text-left">Sikap</td>
          <td class="text-center">{{ dataPersonality[0]?.grade }}</td>
          <td class="text-left">Izin</td>
          <td class="text-center">{{ dataPresensi?.izin }}</td>
        </tr>

        <tr>
          <td class="text-left" style="width: 10px">2</td>
          <td class="text-left">Kerajinan</td>
          <td class="text-center">{{ dataPersonality[1]?.grade }}</td>
          <td class="text-left">Sakit</td>
          <td class="text-center">{{ dataPresensi?.sakit }}</td>
        </tr>

        <tr>
          <td class="text-left" style="width: 10px">3</td>
          <td class="text-left">Kebersihan dan Kerapihan</td>
          <td class="text-center">{{ dataPersonality[2]?.grade }}</td>
          <td class="text-left">Tanpa Keterangan</td>
          <td class="text-center">{{ dataPresensi?.tanpa_keterangan }}</td>
        </tr>
      </tbody>
      </q-markup-table> -->
  <!-- </div> -->
  <div
    v-if="!tersedia"
    class="flex tw-flex-col tw-items-center q-pb-none"
  >
    <span class="tw-text-xl">Raport Belum Tersedia</span>
    <img
      src="https://static.vecteezy.com/system/resources/previews/012/003/110/non_2x/information-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
      alt="no data available"
      class="tw-w-1/3"
    />
  </div>
  <div style="height: 100%">
    <iframe height="100%" width="100%" :src="pdfUrl"></iframe>
  </div>

  <!-- <P> </P> -->
</template>

<script>
import { ref } from "vue";

export default {
  name: "NumberRapot",
  props: {
    sub: String, // Assuming 'sub' is a prop with type String
    TabPilihan: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      pdfUrl: ref(), // ganti dengan path ke file PDF Anda
      tersedia: true,
    };
  },

  setup(props) {
    return {
      shape: ref("line"),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      token: ref(sessionStorage.getItem("token")),
      dataRaport: ref(),
      dataPresensi: ref(),
      dataPersonality: ref(),
      semester: ref(sessionStorage.getItem("smt")),
    };
  },

  watch: {
    semester(newVal) {
      this.getRaport();
    },
  },

  methods: {
    async getNumberRaport() {
      const idUser = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/student-report/show-by-student?id=${idUser}&semester=${this.TabPilihan}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataState = response.data.data;
        console.log("🚀 ~ getNumberRaport ~ dataState:", dataState)
        const path = dataState[0].number_path;
        if (path) {
          this.tersedia = true;
          this.downloadTask(path);
          } else {
            this.tersedia = false;
          }
      } catch (error) {
        console.log(error);
      }
    },

    async downloadTask(path) {
      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.get(`student-task/download?filepath=${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "application/pdf" }); //
        const blobUrl = window.URL.createObjectURL(blob);
        this.pdfUrl = blobUrl;
      } catch (error) {
        this.tersedia = false;
        console.error("Error downloading file:", error);
      }
    },
  },

  mounted() {
    this.getNumberRaport();
  },
};
</script>
