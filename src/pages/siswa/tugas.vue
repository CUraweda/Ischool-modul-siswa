<template>
  <div class="container">
    <!-- <NavbarSiswa/> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-max-w-1/2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >TUGAS SISWA</span
                >
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
                        <!-- <th class="text-center">Deskripsi</th> -->

                        <th class="text-center">Mulai</th>
                        <th class="text-center">selesai</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Feedback</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in task" :key="index">
                        <td class="text-center">
                          {{ getDateTime(item?.createdAt) }}
                        </td>
                        <td class="text-center">{{ item?.subject.name }}</td>
                        <td class="text-center">{{ item?.topic }}</td>
                        <!-- <td class="text-center">
                          {{ item?.description ? item.description : "-" }}
                        </td> -->

                        <td class="text-center">
                          {{ getDateTime(item?.start_date) }}
                        </td>
                        <td class="text-center">
                          {{ getDateTime(item?.end_date) }}
                        </td>
                        <td class="text-center">{{ item?.status }}</td>
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <td class="text-center">
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              :disable="!item.up_file"
                              color="green"
                              @click="downloadTask(item.up_file)"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="getTaskId(item.id)"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr v-for="(item, index) in taskClass1" :key="index">
                        <td>{{ getDateTime(item?.createdAt) }}</td>
                        <td>{{ item?.subject.name }}</td>
                        <td>{{ item?.topic }}</td>
                        <!-- <td>{{ item?.description }}</td> -->
                        <td>{{ getDateTime(item?.start_date) }}</td>
                        <td>{{ getDateTime(item?.end_date) }}</td>
                        <td>{{ item?.status }}</td>
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <!-- <td>-</td> -->
                        <td>
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              color="green"
                              @click="downloadTask(item.task_file)"
                              :disable="!item.task_file"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="uploadTugas(item.id)"
                            />
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
                        <!-- <th class="text-center">Deskripsi</th> -->
                        <th class="text-center">Mulai</th>
                        <th class="text-center">selesai</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Feedback</th>
                        <!-- <th class="text-center">Nilai</th> -->
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in task2" :key="item.id">
                        <td class="text-center">
                          {{ getDateTime(item?.createdAt) }}
                        </td>
                        <td class="text-center">{{ item?.subject.name }}</td>
                        <td class="text-center">{{ item?.topic }}</td>
                        <!-- <td class="text-center">
                          {{ item?.description ? item.description : "-" }}
                        </td> -->

                        <td class="text-center">
                          {{ getDateTime(item?.start_date) }}
                        </td>
                        <td class="text-center">
                          {{ getDateTime(item?.end_date) }}
                        </td>
                        <td class="text-center">{{ item?.status }}</td>
                        <!-- <td class="text-center">
                          <div v-if="item?.taskdetails.length">
                            <div
                              v-for="(detail, index) in item.taskdetails"
                              :key="index"
                            >
                              {{ detail.feedback || "-" }}
                            </div>
                          </div>
                          <div v-else>-</div>
                        </td> -->
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <td class="text-center">
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              color="green"
                              @click="downloadTask(item.up_file)"
                              :disable="!item.up_file"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="getTaskId(item.id)"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr v-for="(item, index) in taskClass2" :key="index">
                        <td>{{ getDateTime(item?.createdAt) }}</td>
                        <td>{{ item?.subject.name }}</td>
                        <td>{{ item?.topic }}</td>
                        <!-- <td>
                          {{ item?.description ? item.description : "-" }}
                        </td> -->
                        <td>{{ getDateTime(item?.start_date) }}</td>
                        <td>{{ getDateTime(item?.end_date) }}</td>
                        <td>{{ item?.status }}</td>
                        <!-- <td class="text-center">
                          <div v-if="item?.taskdetails.length">
                            <div
                              v-for="(detail, index) in item.taskdetails"
                              :key="index"
                            >
                              {{ detail.feedback || "-" }}
                            </div>
                          </div>
                          <div v-else>-</div>
                        </td> -->
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <td>
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              color="green"
                              @click="downloadTask(item.task_file)"
                              :disable="!item.task_file"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="uploadTugas(item.id)"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
              <q-card-section>
                <div>
                  <div class="test-center text-h6">Tugas Mandiri</div>
                  <br />
                  <q-markup-table style="height: 28vh" h-scroll>
                    <thead>
                      <tr>
                        <th class="text-center">Tanggal</th>
                        <th class="text-center">Mata Pelajaran</th>
                        <th class="text-center">Topik</th>
                        <!-- <th class="text-center">Deskripsi</th> -->
                        <th class="text-center">Mulai</th>
                        <th class="text-center">selesai</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Feedback</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in task3" :key="item.id">
                        <td class="text-center">
                          {{ getDateTime(item?.createdAt) }}
                        </td>
                        <td class="text-center">{{ item?.subject.name }}</td>
                        <td class="text-center">{{ item?.topic }}</td>
                        <!-- <td class="text-center">
                          {{ item?.description ? item.description : "-" }}
                        </td> -->

                        <td class="text-center">
                          {{ getDateTime(item?.start_date) }}
                        </td>
                        <td class="text-center">
                          {{ getDateTime(item?.end_date) }}
                        </td>
                        <td class="text-center">{{ item?.status }}</td>
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <td class="text-center">
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              color="green"
                              @click="downloadTask(item.up_file)"
                              :disable="!item.up_file"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="getTaskId(item.id)"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr v-for="(item, index) in taskClass3" :key="index">
                        <td>{{ getDateTime(item?.createdAt) }}</td>
                        <td>{{ item?.subject.name }}</td>
                        <td>{{ item?.topic }}</td>
                        <!-- <td>{{ item?.description }}</td> -->
                        <td>{{ getDateTime(item?.start_date) }}</td>
                        <td>{{ getDateTime(item?.end_date) }}</td>
                        <td>{{ item?.status }}</td>
                        <td class="text-center">
                          {{ item?.feed_fwd ? item.feed_fwd : "-" }}
                        </td>
                        <!-- <td>-</td> -->
                        <td>
                          <div>
                            <q-btn
                              class="q-mx-sm"
                              icon="download"
                              color="green"
                              @click="downloadTask(item.task_file)"
                              :disable="!item.task_file"
                            />
                            <q-btn
                              class="q-mx-sm"
                              icon="text_snippet"
                              color="blue"
                              @click="uploadTugas(item.id)"
                            />
                          </div>
                        </td>
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
        <div class="text-h6 text-center">Detail Tugas</div>
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
            <tr>
              <td class="text-left text-bold">Deskripsi</td>
              <td class="text-left">
                {{ dataTask?.description ? dataTask?.description : "-" }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Feedback</td>
              <td class="text-left">
                {{ dataTask?.feed_fwd ? dataTask.feed_fwd : "-" }}
              </td>
              <!-- <tr v-for="(item, index) in dataDetailTask?.feedback" :key="index">
                <td class="text-left">
                  : {{ item.feedback }}
                </td>
              </tr> -->
            </tr>
          </tbody>
        </q-markup-table>

        <br />
        <q-uploader
          style="width: 100%"
          label="Custom header"
           accept=".pdf, .docx, .word, .png, .jpg, .jpeg"
          multiple
          v-if="!dataTask?.down_file"
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
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
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
                @click="uploadFiles(scope)"
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

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="medium">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">Detail Tugas</div>
      </q-card-section>

      <br />
      <q-card-section class="q-pt-none">
        <q-markup-table flat>
          <tbody>
            <tr>
              <td class="text-left text-bold">Mata Pelajaran</td>
              <td class="text-left">: {{ dataTaskClass?.subject.name }}</td>
            </tr>
            <tr>
              <td class="text-left text-bold">Topik</td>
              <td class="text-left">: {{ dataTaskClass?.topic }}</td>
            </tr>
            <tr>
              <td class="text-left text-bold">Tanggal Mulai</td>
              <td class="text-left">
                : {{ getDateTime(dataTaskClass?.start_date) }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Tanggal Selesai</td>
              <td class="text-left">
                : {{ getDateTime(dataTaskClass?.end_date) }} |
                {{ getTimeDeadline(dataTaskClass?.end_date) }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Deskripsi</td>
              <td class="text-left">
                :
                {{
                  dataTaskClass?.description ? dataTaskClass?.description : "-"
                }}
              </td>
            </tr>
            <tr>
              <td class="text-left text-bold">Feedback</td>
              <td class="text-left">: {{ dataTaskClass?.feedback }}</td>
              <!-- <tr v-for="(item, index) in dataDetailTask" :key="index">
                <td class="text-left">
                  : {{ item .feedback}}
                </td>
              </tr> -->
            </tr>
          </tbody>
        </q-markup-table>

        <br />
        <q-uploader
          v-if="!dataDetailTask"
          style="width: 100%"
          label="Custom header"
          accept="image/*, .bmp, .webp"
          multiple
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
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
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
                @click="uploadFilesTugasDetail(scope)"
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
      idKelas: ref(sessionStorage.getItem("idClass")),
      task: ref(),
      task2: ref(),
      task3: ref(),
      idTask: ref(""),
      dataTask: ref(),
      dataDetailTask: ref(),
      taskClass1: ref(),
      taskClass2: ref(),
      taskClass3: ref(),
      dataTaskClass: ref(),
    };
  },
  methods: {
    async uploadFiles(scope) {
      try {
        const filesToUpload = scope.queuedFiles;

        const formData = new FormData();
        filesToUpload.forEach((file) => {
          formData.append("down_file", file);
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
    async uploadFilesTugasDetail(scope) {
      try {
        const filesToUpload = scope.queuedFiles;
        const date = new Date();

        const formData = new FormData();
        formData.append("task_id", this.idTask);
        formData.append("student_id", this.idSiswa);
        formData.append("work_date", date);

        filesToUpload.forEach((file) => {
          formData.append("up_file", file);
        });

        const response = await this.$api.post(`task-detail/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.medium = false;
        Swal.fire({
          title: "Tugas berhasil di upload !",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Oke",
        });
      } catch (error) {
        this.medium = false;
        console.error("Error uploading files:", error); // Handle error if necessary
        Swal.fire({
          title: error.message,
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
        const taskParent = await this.$api.get(
          `student-task/show-by-student/${this.idSiswa}?cat=Work With Parents`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        const taskKelompok = await this.$api.get(
          `student-task/show-by-student/${this.idSiswa}?cat=Project Kelompok`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        const taskMandiri = await this.$api.get(
          `student-task/show-by-student/${this.idSiswa}?cat=Mandiri`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.task = taskParent.data.data;
        this.task2 = taskKelompok.data.data;
        this.task3 = taskMandiri.data.data;
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

    async getDataTugasKelas() {
      try {
        const idKelas = sessionStorage.getItem("idClass");
        console.log("🚀 ~ getDataTugasKelas ~ idKelas:", idKelas);
        const taskWWP = await this.$api.get(
          `task/show-by-class/${idKelas}?cat=1`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        const taskProject = await this.$api.get(
          `task/show-by-class/${idKelas}?cat=2`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const taskPribadi = await this.$api.get(
          `task/show-by-class/${idKelas}?cat=3`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.taskClass1 = taskWWP.data.data.filter(
          (task) => task.status === "Open"
        );
        this.taskClass2 = taskProject.data.data.filter(
          (task) => task.status === "Open"
        );
        this.taskClass3 = taskPribadi.data.data.filter(
          (task) => task.status === "Open"
        );
        console.log(taskPribadi.data.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getTaskDetailById(id) {
      try {
        const response = await this.$api.get(`task-detail/show-by-task/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const detailTask = response.data.data.find(
          (item) => item.student_id === parseInt(this.idSiswa)
        );
        this.dataDetailTask = detailTask;
      } catch (error) {
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
        this.getTaskDetailById(id);
        console.log(
          "🚀 ~ getTaskById ~ this.dataDetailTask:",
          this.dataDetailTask
        );
        const detailTask = response.data.data.find(
          (item) => item.studentclass.student_id === parseInt(this.idSiswa)
        );

        this.dataTask = detailTask;
      } catch (error) {
        console.log(error);
      }
    },

    async getTaskClassById(id) {
      try {
        const response = await this.$api.get(`task/show/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.getTaskDetailById(id);
        console.log(
          "🚀 ~ getTaskById ~ this.dataDetailTask:",
          this.dataDetailTask
        );
        this.dataTaskClass = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },

    async downloadTask(path) {
      try {
        const response = await this.$api.get(
          `student-task/download?filepath=${path}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
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

    uploadTugas(id) {
      this.idTask = id;
      this.getTaskClassById(id);
      this.medium = true;
    },

    getTaskId(id) {
      this.idTask = id;
      this.getTaskById(id);
      this.small = true;
    },
  },

  mounted() {
    this.getDataTugas();
    this.getDataTugasKelas();
  },
};
</script>
