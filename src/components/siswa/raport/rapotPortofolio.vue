<template>
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
</template>

<script>
import { ref } from "vue";
export default {
  props: ["sub"],
  data() {
    return {
      pdfUrl: ref(),
      tersedia: false,
    };
  },

  methods: {
    async getPortofolioRapot() {
      const token = sessionStorage.getItem("token");
      const idReport = sessionStorage.getItem("raportId");

      try {
        const response = await this.$api.get(
          `portofolio-report/show-all-by-student-report/${idReport}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        let filteredData;
        if (Array.isArray(data)) {
          filteredData = data.filter((item) => item.type === this.sub);
          const path = filteredData[0].file_path;
          if (path) {
          this.tersedia = true;
          this.downloadTask(path);
        }
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
        const status = error.response?.status
        if (status == 403 || status == 404) this.tersedia = false 
      }
    },
  },
  mounted() {
    this.getPortofolioRapot();
  },
};
</script>
