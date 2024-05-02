<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2" style="height: 87vh">
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
                      <q-btn color="secondary" label="Tambah"  @click="showAddDialog = true" />
                       
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
                     <!-- <tr v-for="(item, index) in data" :key="item.id">
                      <td></td>
                      <td>sads</td>
                      <td>sads</td>
                      <td>sads</td>
                     </tr> -->
                    </tbody>
                  </q-markup-table>
                
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Dialog untuk menambahkan aktivitas -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-input v-model="newActivityName" label="Kegiatan" />
          <q-input v-model="newActivityDate" label="Tanggal" type="date" />
          <q-uploader
            style="width: 100%"
            label="Custom header"
            accept=".pdf, .docx, .word,"
          >
            <template v-slot:header="scope">
              <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <q-btn
                  v-if="scope.queuedFiles.length > 0"
                  icon="clear_all"
                  @click="scope.removeQueuedFiles"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Clear All</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="scope.uploadedFiles.length > 0"
                  icon="done_all"
                  @click="scope.removeUploadedFiles"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Remove Uploaded Files</q-tooltip>
                </q-btn>
                <q-spinner
                  v-if="scope.isUploading"
                  class="q-uploader__spinner"
                />
                <div class="col">
                  <div class="q-uploader__title">Upload your files</div>
                  <div class="q-uploader__subtitle">
                    {{ scope.uploadSizeLabel }}
                  </div>
                </div>
                <q-btn
                  v-if="scope.canAddFiles"
                  type="a"
                  icon="add_box"
                  @click="scope.pickFiles"
                  round
                  dense
                  flat
                >
                  <q-uploader-add-trigger />
                  <q-tooltip>Pick Files</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="scope.canUpload"
                  icon="cloud_upload"
                  @click="submitNewActivity(scope)"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Upload Files</q-tooltip>
                </q-btn>

                <q-btn
                  v-if="scope.isUploading"
                  icon="clear"
                  @click="scope.abort"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Abort Upload</q-tooltip>
                </q-btn>
              </div>
            </template>
          </q-uploader>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="secondary" @click="cancelAddActivity" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import Swal from "sweetalert2";

export default {
  setup() {
    return {
      activity: ref(),
      data: ref(),
      showAddDialog: ref(false),
      newActivityName: ref(""),
      newActivityDate: ref(""),
      uploadedFiles: ref([]),
    };
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const idSiswa = sessionStorage.getItem("idSiswa");

        const response = await this.$api.get(
          `achievement/show-by-student/${idSiswa}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.data = response.data.data;
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    },

    async submitNewActivity(scope) {
      const filesToUpload = scope.queuedFiles;

      const idSiswa = sessionStorage.getItem("idSiswa");

      const formData = new FormData();
      formData.append("student_id", idSiswa);
      formData.append("achievement_desc", this.newActivityName);
      formData.append("issued_at", this.newActivityDate);
      filesToUpload.forEach((file) => {
        formData.append("file", file);
      });

      try {
        const token = sessionStorage.getItem("token");
        const response = await this.$api.post(
          `achievement/create`,
          // data,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.showAddDialog = false;
      } catch (err) {
        console.log(err);
      }
    },

    async cancelAddActivity() {
      this.showAddDialog = false;
    },
  },
};
</script>
