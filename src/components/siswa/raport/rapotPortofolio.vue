<template>
  <div v-if="!tersedia" class="flex tw-flex-col tw-items-center q-pb-none">
    <span class="tw-text-xl">Raport {{ sub }} Belum Tersedia</span>
    <img
      src="https://static.vecteezy.com/system/resources/previews/012/003/110/non_2x/information-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
      alt="no data available"
      class="tw-w-1/3"
    />
  </div>
  <div style="height: 100%" v-else>
    <!-- Tombol Download -->
    <button
      v-if="filePath"
      @click="downloadFile(filePath)"
      class="download-btn"
    >
      Download {{ sub }} File
    </button>

    <!-- Menampilkan PDF menggunakan iframe -->
    <div v-if="pdfUrl && typePathFile === true" class="pdf-viewer">
      <iframe :src="pdfUrl" width="100%" height="600px"></iframe>
      {{ pdfUrl }}
    </div>

    <!-- Menampilkan Gambar jika file bukan PDF -->
    <div v-if="pdfUrl && typePathFile === false">
      <img :src="pdfUrl" alt="Report image" style="width: 100%; height: auto" />
      {{ pdfUrl }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    sub: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      filePath: null,
      pdfUrl: null,
      tersedia: ref(false),
      raprotOrtu: ref(),
      guruFilePath: null,
      orangTuaFilePath: null,
      typePathFile: ref(false),
    };
  },

  setup(props) {
    return {
      path: props.path,
    };
  },

  methods: {
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

        // Filter file berdasarkan nilai prop 'sub'
        const fileData = data.find((item) => item.type === this.sub);

        // Set file path jika ditemukan
        this.filePath = fileData?.file_path || null;
        this.tersedia = !!this.filePath; // Set tersedia jika filePath ada

        if (this.filePath) {
          this.displayFile(this.filePath);
        }
      } catch (error) {
        console.error("Error fetching portfolio report:", error);
        this.tersedia = false;
      }
    },

    async downloadTask(path) {
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
        console.log("🚀 ~ this.pdfUrl:", contentType);

        // Set URL Blob berdasarkan tipe konten
        this.pdfUrl = blobUrl;
      } catch (error) {
        console.error("Error displaying file:", error);
      }
    },

    async downloadType(type) {
      try {
        if (type === "Orang Tua") {
          const urlParts = path.split("/");
          const fileName = urlParts.pop() || "";
          const link = document.createElement("a");
          link.href = blobUrl;
          link.style.display = "none";
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(blobUrl);
        }
      } catch (err) {}
    },
  },
  mounted() {
    this.getPortofolioRapot();
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
