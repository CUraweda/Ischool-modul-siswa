<template>
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
      pdfUrl: ref(), // ganti dengan path ke file PDF Anda
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
          this.downloadTask(filteredData[0].file_path)
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
        console.error("Error downloading file:", error);
      }
    },
  },
  mounted() {
    this.getPortofolioRapot();
  },
};
</script>
