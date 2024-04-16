<template>
  <div class="container">
    <!-- <NavbarSiswa/> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-max-w-1/2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">TUGAS SISWA</span>
              </p>
            </div>
          </q-card-section>

          <q-card-section>
            <q-card>
              <q-card-section>
                <div>
                  <div class="test-center text-h6">Work With Parents</div>
                  <br />
                  <q-markup-table style="height: 28vh" h-scroll>
                    <thead>
                      <tr>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center">Mata Pelajaran</th>
                        <th class="text-center">Topik</th>
                        <th class="text-center">Sifat</th>
                        <th class="text-center">Mulai</th>
                        <th class="text-center">selesai</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Feedforward</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in task" :key="item.id">
                        <td class="text-center">
                          {{ getDateTime(item?.createdAt) }}
                        </td>
                        <td class="text-center">{{ item?.subject.name }}</td>
                        <td class="text-center">{{ item?.topic }}</td>
                        <td class="text-center">{{ item?.characteristic }}</td>
                        <td class="text-center">
                          {{ getDateTime(item?.start_date) }}
                        </td>
                        <td class="text-center">
                          {{ getDateTime(item?.end_date) }}
                        </td>
                        <td class="text-center">{{ item?.status }}</td>
                        <td class="text-center">-</td>
                        <td class="text-center">
                          <div>
                            <q-btn class="q-mx-sm" icon="download" color="green"
                              @click="downloadTask(item.down_file)" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
              <br />
              <q-separator color="blue" inset />
              <q-card-section>
                <div>
                  <div class="test-center text-h6">Project Kelompok</div>
                  <br />
                  <q-markup-table style="height: 28vh" h-scroll>
                    <thead>
                      <tr>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center">Mata Pelajaran</th>
                        <th class="text-center">Topik</th>
                        <th class="text-center">Sifat</th>
                        <th class="text-center">Mulai</th>
                        <th class="text-center">selesai</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in task2" :key="item.id">
                        <td class="text-center">
                          {{ getDateTime(item?.createdAt) }}
                        </td>
                        <td class="text-center">{{ item?.subject.name }}</td>
                        <td class="text-center">{{ item?.topic }}</td>
                        <td class="text-center">{{ item?.characteristic }}</td>
                        <td class="text-center">
                          {{ getDateTime(item?.start_date) }}
                        </td>
                        <td class="text-center">
                          {{ getDateTime(item?.end_date) }}
                        </td>
                        <td class="text-center">{{ item?.status }}</td>
                        <td class="text-center">-</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="small">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">Upload Tugas</div>
      </q-card-section>

      <br />
      <q-card-section class="q-pt-none">
        <q-markup-table flat>
          <tbody>
            <tr>
              <td class="text-left text-bold">Mata Pelajaran</td>
              <td class="text-left">: {{ dataTask?.subject.name }}</td>
            </tr>
            <tr>
              <td class="text-left text-bold">Topik</td>
              <td class="text-left">: {{ dataTask?.topic }}</td>
            </tr>
            <tr>
              <td class="text-left text-bold">Tanggal Mulai</td>
              <td class="text-left">
                : {{ getDateTime(dataTask?.start_date) }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Tanggal Selesai</td>
              <td class="text-left">
                : {{ getDateTime(dataTask?.end_date) }} |
                {{ getTimeDeadline(dataTask?.end_date) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>

        <br />
        <q-uploader style="width: 100%" label="Custom header" accept=".pdf, .docx, .word,">
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense
                flat>
                <q-tooltip>Clear All</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round
                dense flat>
                <q-tooltip>Remove Uploaded Files</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">Upload your files</div>
                <div class="q-uploader__subtitle">
                  {{ scope.uploadSizeLabel }}
                </div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Pick Files</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="uploadFiles(scope)" round dense flat>
                <q-tooltip>Upload Files</q-tooltip>
              </q-btn>

              <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
import Swal from "sweetalert2";

export default {
  components: {
    NavbarSiswa,
  },
  setup() {
    return {
      tab: ref("mails"),
      innerTab: ref("innerMails"),
      small: ref(false),
      medium: ref(false),
      splitterModel: ref(20),
      shape: ref(),
      shape2: ref(),
      model: ref(null),
      token: ref(sessionStorage.getItem("token")),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      task: ref(),
      task2: ref(),
      idTask: ref(""),
      dataTask: ref(),
    };
  },
  methods: {
    async uploadFiles(scope) {
      try {
        const filesToUpload = scope.queuedFiles;

        const formData = new FormData();
        filesToUpload.forEach((file) => {
          formData.append("up_file", file);
        });

        const response = await this.$api.put(
          `student-task/upload/${this.idTask}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.status == 200) {
          this.small = false;
          Swal.fire({
            title: "Tugas berhasil di upload !",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Oke",
          });
        } else {
        }
      } catch (error) {
        this.small = false;
        console.error("Error uploading files:", error); // Handle error if necessary
        Swal.fire({
          title: "Gagal mengupload tugas!",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Oke",
        });
      }
    },
    getDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },

    getTimeDeadline(date) {
      const durasi = new Date(new Date(date) - new Date());
      const hari = durasi.getUTCDate() - 1;
      const jam = durasi.getUTCHours();
      const menit = durasi.getUTCMinutes();

      return `${hari} hari, ${jam} jam, ${menit} menit`;
    },
    async getDataTugas() {
      try {
        const taskParent = await this.$api.get(`student-task/show-by-student/${this.idSiswa}?cat=Work With Parents`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        console.log(taskParent);
        const taskKelompok = await this.$api.get(`student-task/show-by-student/${this.idSiswa}?cat=Project Kelompok`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.task = taskParent.data.data;
        this.task2 = taskKelompok.data.data;
      } catch (error) {
        Swal.fire({
          title: "Gagal Mengambil data tugas !",
          text: "Refresh halaman atau hubungi admin",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Refresh Now",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        console.log(error);
      }
    },
    async getTaskById(id) {
      try {
        const response = await this.$api.get(`student-task/show/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log(this.taskStudent);
        console.log(response);
        this.dataTask = response.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async downloadTask(path) {
      try {
        const response = await this.$api.get(`student-task/download?filepath=${path}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          responseType: 'blob',
        });
        const urlParts = path.split('/');
        const fileName = urlParts.pop();
        const blobUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', fileName);
        link.style.display = 'none'; 

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);

      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
    ,



    getTaskId(id) {
      this.idTask = id;
      this.getTaskById(id);
      this.small = true;
    },
  },

  mounted() {
    this.getDataTugas();
  },
};
</script>
