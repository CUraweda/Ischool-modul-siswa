<template>
  <div class="text-h4 text-bold text-left q-mb-md">Raport Narasi</div>
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
      path: props.path,
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
        const path = dataState[0].narrative_path.split("./")[1];
        downloadTask();
        if (path) {
          this.tersedia = true;
          this.downloadTask();
        } else {
          this.tersedia = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async downloadTask() {
      try {
        const token = sessionStorage.getItem("token");

        const response = await this.$api.get(
          `student-task/download?filepath=${this.path}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data], { type: "application/pdf" }); //
        const blobUrl = window.URL.createObjectURL(blob);

        // const urlParts = path.split("/");
        // const fileName = urlParts.pop() || "";
        // const link = document.createElement("a");
        // document.body.appendChild(link);
        // link.href = blobUrl;
        // link.style.display = "none";
        // link.click();
        // link.remove();
        // link.setAttribute("download", fileName);
        // window.URL.revokeObjectURL(blobUrl);
        this.pdfUrl = blobUrl;
      } catch (error) {
        this.tersedia = false;
        console.error("Error downloading file:", error);
      }
    },
  },

  mounted() {
    // this.getNumberRaport();
    this.downloadTask();
  },
};
</script>
