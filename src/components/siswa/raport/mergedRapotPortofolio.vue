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
  props: {
    path: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      pdfUrl: ref(),
      tersedia: true,
    };
  },

  setup(props) {
    return {
      path: props.path,
    }
  },

  methods: {

    async downloadTask() {
      try {
        const token = sessionStorage.getItem("token");
        const idUser = sessionStorage.getItem("idSiswa");
        console.log("🚀 ~ downloadTask ~ path:", this.path)
        const response = await this.$api.get(
          `student-task/download?filepath=${this.path}&student_id=${idUser}`,
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
    this.downloadTask()
  },
};
</script>
