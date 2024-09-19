<template>
  <div
    class="text-h4 text-bold text-left q-mb-md flex tw-flex-col tw-items-center q-pb-none"
  >
    Raport Narasi
  </div>
  <button v-if="pdfUrl" @click="downloadFile(this.path)" class="download-btn">
    Download Narasi File
  </button>
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
</template>

<script>
import { ref } from "vue";

export default {
  name: "NumberRapot",
  props: {
    sub: String,
    TabPilihan: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      pdfUrl: ref(),
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
      pathNarasi: null,
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
        // const path = dataState[0].narrative_path.split("./")[1];
        const path = dataState[0].narrative_path;
        this.pathNarasi = path;
        if (this.pathNarasi) {
          this.tersedia = true;
          this.displayFile(this.pathNarasi);
          console.log(this.pathNarasi, "narasi");
        } else {
          this.tersedia = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async displayFile() {
      try {
        const token = sessionStorage.getItem("token");
        const idUser = sessionStorage.getItem("idSiswa");
        const response = await this.$api.get(
          `student-task/download?filepath=${this.path}&student_id=${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        // Cek tipe konten dan buat Blob dari response
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const blobUrl = window.URL.createObjectURL(blob);
        console.log("🚀 ~ this.pdfUrl:", contentType);

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
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const blobUrl = window.URL.createObjectURL(blob);

        // Buat elemen anchor untuk mendownload file
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = path.split("/").pop(); // Nama file dari path
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.pdfUrl = blobUrl;
        this.tersedia = true;
      } catch (error) {
        console.error("Error downloading file:", error);
        this.tersedia = false;
      }
    },
  },

  mounted() {
    // this.getNumberRaport();
    this.displayFile();
  },
};
</script>
<style>
.download-btn {
  cursor: pointer;
  color: white;
  background: #5cb0f4;
  font-weight: bold;
  margin: 10px;
  padding: 5px 15px;
  border-radius: 5px;
}
</style>
