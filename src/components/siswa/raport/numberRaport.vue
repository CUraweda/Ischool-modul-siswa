<template>
  <div class="text-h4 q-mb-md">Raport Angka</div>
 
  <div v-if="!tersedia" class="flex tw-flex-col tw-items-center q-pb-none">
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
          `/student-report/show-by-student?id=${idUser}&semester=${this.TabPilihan}&`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataState = response.data.data;
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
        const response = await this.$api.get(
          `student-task/download?filepath=${path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
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
