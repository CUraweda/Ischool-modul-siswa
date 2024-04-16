<template>
  <q-splitter v-model="splitterModel" style="height: 75vh">
    <template v-slot:before>
      <q-tabs v-model="innerTab" vertical class="text-teal">
        <q-tab name="innerMails" icon="filter_9_plus" label="Angka" />
        <q-tab name="innerAlarms" icon="history_edu" label="Narasi" />
        <q-tab name="innerMovies" icon="text_snippet" label="Portofolio" />
        <q-tab name="ortu" icon="people" label="Komentar Orang tua" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="innerTab"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
      >
        <q-tab-panel name="innerMails">
          <NumberRaport :TabPilihan="TabPilihan" />
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
              <q-tab name="page1" label="Tahsin" />
              <q-tab name="page2" label="akhlak & Perilaku" />
              <q-tab name="page3" label="kepemimpinan" />
              <q-tab name="page4" label="kemampuan berfikir" />
              <q-tab name="page5" label="islamika" />
              <q-tab name="page6" label="IPA" />
              <q-tab name="page7" label="MTK" />
              <q-tab name="page8" label="Bhs indo" />
              <q-tab name="page9" label="sosial" />
              <q-tab name="page10" label="sass" />
              <q-tab name="page11" label="karya seni" />
              <q-tab name="page12" label="english" />
            </q-tabs>
          </div>
          <q-space />
          <q-separator />

          <div class="text-h4 q-mb-md" style="margin-top: 20px">
            Raport Narasi
          </div>
          <q-card>
            <q-tab-panels v-model="tab2" animated>
              <q-tab-panel name="page1">
                <Tahsin />
              </q-tab-panel>

              <q-tab-panel name="page2">
                <Akhlak />
              </q-tab-panel>

              <q-tab-panel name="page3">
                <Pemimpin sub="2" />
              </q-tab-panel>

              <q-tab-panel name="page4">
                <Pemimpin sub="3" />
              </q-tab-panel>

              <q-tab-panel name="page5">
                <Pemimpin sub="4" />
              </q-tab-panel>

              <q-tab-panel name="page6">
                <Pemimpin sub="5" />
              </q-tab-panel>

              <q-tab-panel name="page7">
                <Pemimpin sub="6" />
              </q-tab-panel>

              <q-tab-panel name="page8">
                <Pemimpin sub="7" />
              </q-tab-panel>
              <q-tab-panel name="page9">
                <Pemimpin sub="8" />
              </q-tab-panel>
              <q-tab-panel name="page10">
                <Pemimpin sub="9" />
              </q-tab-panel>
              <q-tab-panel name="page11">
                <Pemimpin sub="10" />
              </q-tab-panel>
              <q-tab-panel name="page12">
                <Pemimpin sub="11" />
              </q-tab-panel>
              <q-tab-panel name="page13">
                <Pemimpin sub="12" />
              </q-tab-panel>
            </q-tab-panels>

            <q-separator />
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="innerMovies">
          <q-card>
            <div style="width: 100%; height: 600px">
              <RapotPortofolio />
            </div>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="ortu">
          <div class="text-h4 q-mb-md">Komentar Orang Tua</div>
          <div class="tw-flex tw-w-full">
            <div class="tw-w-full tw-p-3 text-left tw-border-2 tw-rounded-md" style="min-height: 200px;">
              <p>
                {{ submittedComment }}
             
              </p>
              <div v-if="!submittedComment && parseInt(role) === 8">
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
          <div class="tw-flex tw-w-full justify-end tw-p-5">
            <!-- <q-btn color="secondary" label="Simpan" /> -->
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import { ref } from "vue";
import Tahsin from "./raport/narasiTahsin.vue";
import Akhlak from "./raport/narasiAkhlak.vue";
import Pemimpin from "./raport/narasiPemimpin.vue";
import Berfikir from "./raport/narasiBerfikir.vue";
import NumberRaport from "./raport/numberRaport.vue";
import RapotPortofolio from "./raport/rapotPortofolio.vue";

export default {
  data() {
    return {
      editedComment: "",
      submittedComment: "",
      role: ref(sessionStorage.getItem("role"))
    };
  },
  methods: {
    async getCommnentParent() {
      const idUser = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/student-report/show-by-student?id=${idUser}&semester=${this.TabPilihan}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        (this.submittedComment = response.data.data[0].parent_comments),
          sessionStorage.setItem(
            "student_class_id",
            response.data.data[0].student_class_id
          );
        sessionStorage.setItem("raportId", response.data.data[0].id);
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment() {
      const student_class_id = sessionStorage.getItem("student_class_id");
      const RaportId = sessionStorage.getItem("raportId");
     
      const token = sessionStorage.getItem("token");
      try {
      
        const response = await this.$api.put(
          `/student-report/update/${RaportId}`,
          {
            "student_class_id": student_class_id,
            semester: this.TabPilihan,
            parent_comments: this.editedComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        this.getCommnentParent();
        this.editedComment = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCommnentParent();
  },
  name: "Rapot",
  props: {
    TabPilihan: {
      type: String,
      required: true,
    },
  },
  components: {
    Tahsin,
    Akhlak,
    Pemimpin,
    Berfikir,
    NumberRaport,
   
    RapotPortofolio,
  },

  setup(props) {
    return {
      tab: ref("mails"),
      tab2: ref("page1"),
      innerTab: ref("innerMails"),
      shape: ref("line"),
      splitterModel: ref(20),
      editor: ref("Sangat Baik !"),
      TabPilihan: props.TabPilihan,
      editedComment: ref(""),
      submittedComment: ref(""),
    };
  },
};
</script>
