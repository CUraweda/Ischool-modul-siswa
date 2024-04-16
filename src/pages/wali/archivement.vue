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
                        class="text-right text-bold"
                        style="font-size: x-large"
                      >
                        <q-btn
                          dense
                          round
                          color="blue-2"
                          icon="add"
                          @click="showAddDialog = true"
                          style="margin-right: 10px; margin-bottom: 10px"
                        />
                      </div>
                    </div>
                  </div>
                  <q-markup-table separator="cell">
                    <thead>
                      <tr>
                        <th class="text-center" style="width: 10px">No</th>
                        <th class="text-center" style="width: 500px">
                          Kegiatan
                        </th>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center" style="width: 100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(activity, index) in filteredActivities"
                        :key="index"
                      >
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-left">{{ activity.name }}</td>
                        <td class="text-right">{{ activity.tanggal }}</td>
                        <td class="text-right">
                          <q-btn
                            round
                            dense
                            color="blue-2"
                            icon="file_download"
                          />
                          <q-btn
                            dense
                            round
                            color="blue-2"
                            icon="file_upload"
                            class="tw-ml-2"
                            @click="fileUploadModalOpen = true"
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
    <!-- Dialog untuk menambahkan aktivitas -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="newActivityName" label="Kegiatan" />
          <q-input v-model="newActivityDate" label="Tanggal" type="date" />
          <q-uploader
            v-model="uploadedFiles"
            label="Unggah File"
            accept=".jpg, .png"
            color="blue-2"
            @added="fileAdded"
          />

          <!-- <q-file outlined v-model="selectedFile">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file> -->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="secondary" @click="cancelAddActivity" />
          <q-btn label="Submit" color="primary" @click="submitNewActivity" />
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
      activity : ref([]),
      showAddDialog : ref(false),
      newActivityName: ref(""),
      newActivityDate: ref(""),
      uploadedFiles:ref([])
    }
  },
  // data() {
  //   return {
  //     showAddDialog: false,
  //     newActivityName: "",
  //     newActivityDate:"",
  //     activity: []
  //   };
  // },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const idSiswa = sessionStorage.getItem('idSiswa')
        const response = await this.$api.get(
          `achievement/show-by-student/${idSiswa}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          console.log("hallo");
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fileAdded (files){
      this.uploadedFiles = files
    },
    async submitNewActivity() {
      const filesToUpload = this.uploadedFiles;
      // console.log(filesToUpload[0]);
      const idSiswa = sessionStorage.getItem('idSiswa')
      // console.log(idSiswa);
      
    
      const formData = new FormData();
      formData.append("student_id", idSiswa);
      formData.append("achievement_desc", this.newActivityName);
      formData.append("issued_at", this.newActivityDate);
      formData.append("file", filesToUpload[0]);
    ;

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
        if (response.status == 200) {
          Swal.fire({
            title: "Success!",
            text: `Rating buku ${this.bookdata.book.title} berhasil ditambahkan`,
            icon: "success",
          });
        }
      } catch (err) {
        console.error(err);
      }
    },

    async cancelAddActivity (){
      this.showAddDialog = false
    }
  },
};
</script>
