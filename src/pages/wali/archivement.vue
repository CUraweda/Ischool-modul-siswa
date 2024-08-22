<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >Achievement</span
                >
                <br />
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: 700px">
              <q-card-section>
                <div class="q-pa-md">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="text-bold" style="font-size: x-large">
                      <div class="text-left" style="font-size: x-large">
                        List
                      </div>
                      <div
                        class="text-right text-bold tw-my-5"
                        style="font-size: x-large"
                      >
                        <q-btn
                          color="secondary"
                          label="Tambah"
                          @click="showAddDialog = true"
                        />
                      </div>
                    </div>
                  </div>
                  <q-markup-table separator="cell">
                    <thead>
                      <tr>
                        <th class="text-center">No</th>
                        <th class="text-center">Kegiatan</th>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in data" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item?.achievement_desc }}</td>
                        <td>{{ formatDate(item?.issued_at) }}</td>
                        <td>
                          <q-btn
                            class="q-mx-sm"
                            icon="edit"
                            color="primary"
                            @click="editActivity(item)"
                          />

                          <q-btn
                            class="q-mx-sm"
                            icon="download"
                            color="green"
                            @click="downloadTask(item?.certificate_path)"
                            :disable="!item.certificate_path"
                          />

                          <q-btn
                            class="q-mx-sm"
                            icon="delete"
                            color="negative"
                            @click="confirmDelete(item.id)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-input v-model="newActivityName" label="Kegiatan" />
          <q-input v-model="newActivityDate" label="Tanggal" type="date" />

          <!-- Custom File Upload -->
          <div class="file-upload">
            <div
              class="file-upload-dropzone"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <span class="file-upload-placeholder">
                Drag & Drop files here or
                <label class="file-upload-button">
                  <input
                    ref="fileInput"
                    type="file"
                    @change="handleFileChange"
                    class="file-upload-input"
                  />
                  Select File
                </label>
              </span>
            </div>
            <div v-if="files.length" class="file-upload-preview">
              <div
                v-for="file in files"
                :key="file.name"
                class="file-upload-file"
              >
                {{ file.name }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="secondary" @click="cancelAddActivity" />
          <q-btn label="Save" color="primary" @click="submitNewActivity" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";

export default {
  setup() {
    return {
      activity: ref(),
      data: ref(),
      showAddDialog: ref(false),
      newActivityName: ref(""),
      newActivityDate: ref(""),
      files: ref([]),
      editingActivityId: ref(null),
      fileInput: ref(null),
    };
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    },

    async fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const idSiswa = sessionStorage.getItem("idSiswa");

        const response = await this.$api.get(
          `achievement/show-all-by-student/${idSiswa}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.data = response.data.data;
      } catch (err) {
        console.error(err);
      }
    },

    editActivity(item) {
      this.editingActivityId = item.id;
      this.newActivityName = item.achievement_desc;
      this.newActivityDate = item.issued_at;
      this.showAddDialog = true;
    },

    handleFileChange(event) {
      const file = event.target.files;
      this.files = file;
    },

    handleDrop(event) {
      const file = event.dataTransfer.files;
      this.files = file;
    },

    async submitNewActivity() {
      const formData = new FormData();
      const idSiswa = sessionStorage.getItem("idSiswa");

      formData.append("student_id", idSiswa);
      formData.append("achievement_desc", this.newActivityName);
      formData.append("issued_at", this.newActivityDate);
      formData.append("file", this.files[0]);

      try {
        const token = sessionStorage.getItem("token");

        let endpoint = `achievement/create`;
        let method = "post";

        if (this.editingActivityId) {
          endpoint = `achievement/update/${this.editingActivityId}`;
          method = "put";
        }

        await this.$api[method](endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: this.editingActivityId
            ? "Update Successful!"
            : "Creation Successful!",
          text: this.editingActivityId
            ? "Your activity has been updated."
            : "Your activity has been created.",
        });

        this.showAddDialog = false;
        this.fetchData();
        this.resetForm();
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },

    resetForm() {
      this.newActivityName = "";
      this.newActivityDate = "";
      this.files = [];
      this.editingActivityId = null;
    },

    async cancelAddActivity() {
      this.showAddDialog = false;
      this.resetForm(); // Reset form ketika membatalkan
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

    async confirmDelete(id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await this.deleteActivity(id);
      }
    },

    async deleteActivity(id) {
      try {
        const token = sessionStorage.getItem("token");
        await this.$api.delete(`achievement/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your activity has been deleted.",
        });

        this.fetchData(); // Refresh the list after deletion
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
};
</script>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}

.file-upload-dropzone {
  border: 2px dashed #007bff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: relative;
  background-color: #f0f8ff;
  transition: background-color 0.3s ease;
}

.file-upload-dropzone:hover {
  background-color: #e6f7ff;
}

.file-upload-placeholder {
  color: #007bff;
  font-size: 16px;
}

.file-upload-button {
  display: inline-block;
  font-weight: 700;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.file-upload-input {
  display: none;
}

.file-upload-preview {
  margin-top: 10px;
  width: 100%;
}

.file-upload-file {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
}
</style>
