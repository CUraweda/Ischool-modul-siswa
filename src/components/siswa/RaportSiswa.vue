<template>
  <q-splitter v-if="trigerRapot" v-model="splitterModel" style="height: 75vh">
    <template v-slot:before>
      <q-tabs v-model="innerTab" vertical class="text-teal">
        <q-tab name="innerMails" icon="filter_9_plus" label="Angka" />
        <q-tab name="innerAlarms" icon="history_edu" label="Narasi" />
        <q-tab name="innerMovies" icon="text_snippet" label="Portofolio" />
        <q-tab
          name="raport-merge"
          icon="file_download"
          label="Raport Gabungan"
        />
        <!-- <q-tab name="raport-merge" icon="text_snippet" label="Raport Merge" /> -->
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="innerTab"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
        style="width: 100%; height: 600px"
      >
        <q-tab-panel name="innerMails">
          <NumberRaport
            :TabPilihan="TabPilihan"
            :tahun="tahun"
            :path="number_path"
          />
        </q-tab-panel>

        <q-tab-panel name="innerAlarms">
          <div>
            <q-tabs
              v-model="tab2"
              inline-label
              outside-arrows
              mobile-arrows
              class="bg-blue-5 text-white shadow-2"
            >
              <!-- <q-tab
                v-for="(item, index) in kategori"
                :key="item.id"
                :name="'page' + index"
                :label="item.category"
              /> -->
              <q-tab name="page15" label="Narasi" />
              <q-tab name="page14" label="Komentar Guru" />
              <q-tab name="page13" label="Komentar Ortu" />
            </q-tabs>
          </div>
          <q-space />
          <q-separator />
          <q-card>
            <q-tab-panels v-model="tab2" animated>
              <!-- <q-tab-panel
                v-for="(item, index) in kategori"
                :key="item.id"
                :name="'page' + index"
              >
                <Pemimpin :sub="item.id" />
              </q-tab-panel> -->

              <q-tab-panel name="page13">
                <div class="text-h4 q-mb-md">Komentar Orang Tua</div>
                <div class="tw-flex tw-w-full">
                  <div
                    class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md"
                    style="min-height: 200px"
                  >
                    <p>
                      {{ submittedComment }}
                    </p>
                    <div
                      v-if="
                        parseInt(role) === 8 &&
                        readyStatusRaport === true &&
                        !submittedComment
                      "
                    >
                      <q-input
                        v-model="editedComment"
                        filled
                        outlined
                        label="Edit Komentar"
                        placeholder="Edit komentar Anda di sini..."
                        type="textarea"
                      />
                      <q-btn
                        @click="submitComment"
                        class="q-mt-md text-right"
                        color="primary"
                        label="Simpan"
                      />
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="page14">
                <div class="text-h4 q-mb-md">Komentar Guru</div>
                <div class="tw-flex tw-w-full">
                  <div
                    class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md"
                    style="min-height: 200px"
                  >
                    <p>
                      {{ dataRapot?.nar_teacher_comments }}
                    </p>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="page15" style="height: 600px">
                <div class="tw-flex tw-w-full" style="height: 100%">
                  <div
                    class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md"
                    style="height: 100%"
                  >
                    <Narasi :TabPilihan="TabPilihan" :path="narrative_path" />
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
            <q-separator />
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="innerMovies">
          <div>
            <q-tabs
              v-model="tab3"
              dense
              class="text-white bg-blue-5"
              active-color="white"
              indicator-color="primary"
              align="justify"
            >
              <q-tab name="porto" label="Raport Portofolio" />
              <q-tab
                name="porto-siswa"
                label="Upload Portofolio Siswa"
                :hidden="role == 7"
              />
              <q-tab name="guru" label="Komentar Guru" />
              <q-tab name="ortu" label="Komentar Ortu" />
            </q-tabs>
          </div>

          <q-card>
            <q-tab-panels v-model="tab3" animated>
              <q-tab-panel name="porto">
                <div style="width: 100%; height: 600px">
                  <RapotPortofolio :path="portofolio_path" :sub="'Merged'" />
                </div>
              </q-tab-panel>
              <q-tab-panel name="ortu">
                <div class="text-h4 q-mb-md">Komentar Orang Tua</div>
                <div class="tw-flex tw-w-full">
                  <div
                    class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md"
                    style="min-height: 200px"
                  >
                    <p>
                      {{ submittedCommentPorto }}
                    </p>
                    <div v-if="parseInt(role) === 8 && avaibleraport">
                      <q-input
                        v-model="editedCommentPorto"
                        filled
                        outlined
                        label="Edit Komentar"
                        placeholder="Edit komentar Anda di sini..."
                        type="textarea"
                      />
                      <q-btn
                        @click="submitCommentPorto"
                        class="q-mt-md text-right"
                        color="primary"
                        label="Simpan"
                      />
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="guru">
                <div class="text-h4 q-mb-md">Komentar Guru</div>
                <div class="tw-flex tw-w-full">
                  <div
                    class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md"
                    style="min-height: 200px"
                  >
                    <p>
                      {{ dataRapot?.por_teacher_comments }}
                    </p>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="porto-siswa">
                <div class="text-h4 q-mb-md">Upload Portofolio Siswa</div>
                <div class="tw-flex tw-w-full tw-flex-col">
                  <div class="tw-w-full flex tw-my-3 tw-justify-end">
                    <q-btn
                      color="secondary"
                      label="upload"
                      @click="medium = true"
                    />
                  </div>
                </div>
                <div style="width: 100%; height: 600px">
                  <RapotPortofolio :sub="'Orang Tua'" />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="raport-merge">
          <q-card>
            <q-tab-panels v-model="tab3" animated>
              <q-tab-panel name="porto">
                <div style="width: 100%; height: 600px">
                  <MergedRapotPortofolio :path="merged_path" />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>

  <div v-if="!trigerRapot">
    <div v-if="avaibleraporthistory === false">
      <div
        class="flex tw-w-full tw-justify-center tw-flex-col tw-items-center tw-py-4"
      >
        <span class="tw-text-xl">Raport Belum Tersedia</span>
        <img
          src="https://static.vecteezy.com/system/resources/previews/012/003/110/non_2x/information-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          alt="no data available"
          class="tw-w-1/3"
        />
      </div>
    </div>

    <div
      v-else
      class="flex tw-w-full tw-justify-center tw-flex-col tw-items-center tw-py-4"
    >
      <iframe height="100%" width="100%" :src="pdfUrlHistory"></iframe>
      <!--
      <q-spinner
        color="primary"
        size="3em"
        :thickness="5"
        class="tw-justify-center"
      /> -->
    </div>
  </div>

  <q-dialog v-model="medium">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">Upload Portofolio</div>
      </q-card-section>

      <br />
      <q-card-section class="q-pt-none">
        <q-uploader
          style="width: 100%"
          label="Custom header"
          accept="image/*, .bmp, .webp"
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
</template>

<script>
import { ref } from "vue";
import Tahsin from "./raport/narasiTahsin.vue";
import Akhlak from "./raport/narasiAkhlak.vue";
import Pemimpin from "./raport/narasiPemimpin.vue";
import Berfikir from "./raport/narasiBerfikir.vue";
import NumberRaport from "./raport/numberRaport.vue";
import Narasi from "./raport/narasi.vue";
import RapotPortofolio from "./raport/rapotPortofolio.vue";
import MergedRapotPortofolio from "./raport/mergedRapotPortofolio.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      editedComment: "",
      submittedComment: "",
      editedCommentPorto: "",
      submittedCommentPorto: "",
      role: ref(sessionStorage.getItem("role")),
      studentClassId: ref(sessionStorage.getItem("studentClassId")),
      dataRapot: ref([]),
      trigerRapot: ref(true),
      reportId: ref(),
      idSiswa: ref(),
      number_path: ref(),
      narrative_path: ref(),
      portofolio_path: ref(),
      merged_path: ref(),
      medium: ref(false),
      avaibleraport: ref(false),
      readyStatusRaport: ref(false),
      avaibleraporthistory: ref(false),
      pdfUrlHistory: ref(),
    };
  },
  methods: {
    async getIdSiswa() {
      const idSiswa = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");

      try {
        const response = await this.$api.get(`/student/show/${idSiswa}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.idSiswa = response.data.data[0].id;
        // this.submitComment();
        this.getCommentParent();
        console.log(this.idSiswa);
      } catch (error) {
        console.error(error);
      }
    },
    async getRaportBefore() {
      try {
        const response = await this.$api.get(
          `student-report-file/show-by-student/${this.idSiswa}`
        );
        if (response.data.data.length > 0) {
          this.avaibleraporthistory = true;
          const blob = new Blob([response.data], { type: "application/pdf" }); //
          const blobUrl = window.URL.createObjectURL(blob);
          this.pdfUrlHistory = blobUrl;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCommentParent() {
      // console.log("🚀 ~ getCommentParent ~ this.tahun:", this.tahun)
      const token = sessionStorage.getItem("token");
      const idSiswa = this.idSiswa;
      try {
        const response = await this.$api.get(
          `/student-report/show-by-student?id=${this.idSiswa}&semester=${this.TabPilihan}&academic=${this.tahun}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataState = response.data.data[0];
        console.log(dataState);
        if (dataState) {
          this.trigerRapot = true;
          this.dataRapot = dataState;
          this.submittedComment = dataState?.nar_parent_comments;
          this.submittedCommentPorto = dataState?.por_parent_comments;
          this.number_path = dataState?.number_path;
          this.narrative_path = dataState?.narrative_path;
          this.portofolio_path = dataState?.portofolio_path;
          this.merged_path = dataState?.merged_path;

          sessionStorage.setItem("raportId", dataState.id);
          console.log("Narative", dataState?.narrative_path);
          dataState?.narrative_path
            ? (this.readyStatusRaport = true)
            : (this.readyStatusRaport = false);

          this.reportId = dataState.id;
        } else {
          this.trigerRapot = false;
          // console.log("kosong");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getKategoriRapot() {
      const idKelas = sessionStorage.getItem("idClass");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `narrative-category/show-by-class/${idKelas}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.kategori = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async mergePorto() {
      try {
        const idSiswa = this.idSiswa;

        const response = await this.$api.put(
          `/portofolio-report/merge/${idSiswa}`
        );
        if (response.data.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil Merge",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment() {
      const idSiswa = this.idSiswa;
      const RaportId = sessionStorage.getItem("raportId");

      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.put(
          `/student-report/update/${RaportId}`,
          {
            student_class_id: this.studentClassId,
            semester: this.TabPilihan,
            nar_parent_comments: this.editedComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.getCommentParent();
        this.editedComment = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getPortofolioRapot() {
      console.log("role: ", this.role);

      const token = sessionStorage.getItem("token");
      const idReport = sessionStorage.getItem("raportId");
      const responsenarrative = await this.$api.get(
        `narrative-report/show-by-student/${this.idSiswa}?semester=${
          this.semester ? this.semester : "1"
        }`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const dataRest = responsenarrative.data?.data?.narrative_categories;
      console.log("test", responsenarrative.data?.data);
      try {
        const response = await this.$api.get(
          `portofolio-report/show-all-by-student-report/${idReport}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let filteredData;
        const data = response.data.data;

        if (Array.isArray(data)) {
          console.log(this.sub);
          filteredData = data.filter((item) => item.type === "Orang Tua");
          console.log("🚀 ~ getPortofolioRapot ~ filteredData:", filteredData);
          const path = filteredData[0]?.file_path ?? null;
          console.log("🚀 ~ getPortofolioRapot ~ path:", path);
          path ? (this.avaibleraport = true) : (this.avaibleraport = false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitCommentPorto() {
      const RaportId = sessionStorage.getItem("raportId");

      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.put(
          `/student-report/update/${RaportId}`,
          {
            student_class_id: this.studentClassId,
            semester: this.TabPilihan,
            por_parent_comments: this.editedCommentPorto,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // if (response.data.code == 200) {
        //   this.mergePorto();
        // }

        this.getCommentParent();
        // console.log('sukses');
        this.editedCommentPorto = "";
      } catch (error) {
        console.log(error);
      }
    },
    async uploadFiles(scope) {
      const token = sessionStorage.getItem("token");
      const reportId = sessionStorage.getItem("raportId");
      try {
        const filesToUpload = scope.queuedFiles;

        const formData = new FormData();
        filesToUpload.forEach((file) => {
          formData.append("file", file);
          formData.append("type", "Orang Tua");
          formData.append("student_report_id", reportId);
        });
        const response = await this.$api.post(
          `portofolio-report/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.getCommentParent();
        this.medium = false;
        Swal.fire({
          title: "Portofolio berhasil di upload !",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Oke",
        });
      } catch (error) {
        this.medium = false;
        console.error("Error uploading files:", error); // Handle error if necessary
        Swal.fire({
          title: "Gagal mengupload portofolio!",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Oke",
        });
      }
    },
  },
  mounted() {
    this.getCommentParent();
    this.getIdSiswa();
    this.getPortofolioRapot();
    if (this.trigerRapot) {
      this.getKategoriRapot();
    }
  },

  watch: {
    tahun(newVal) {
      console.log("🚀 ~ tahun ~ newVal:", this.tahun);
      this.getCommentParent();
      this.getRaportBefore();
    },
  },

  name: "Rapot",
  props: {
    TabPilihan: {
      type: String,
      required: true,
    },
    // avabile: {
    //   type: Boolean,
    //   required: true,
    // },
    tahun: {
      type: String,
      required: true,
    },
  },

  components: {
    Tahsin,
    Akhlak,
    Pemimpin,
    Berfikir,
    Narasi,
    NumberRaport,
    RapotPortofolio,
    MergedRapotPortofolio,
  },

  setup(props) {
    return {
      tab: ref("mails"),
      tab3: ref("porto"),
      tab2: ref("page15"),
      innerTab: ref("innerMails"),
      shape: ref("line"),
      splitterModel: ref(20),
      editor: ref("Sangat Baik !"),
      TabPilihan: props.TabPilihan,
      // avabile: props.avabile,
      // tahun: props.tahun,
      editedComment: ref(""),
      submittedComment: ref(""),
      kategori: ref(),
    };
  },
};
</script>
