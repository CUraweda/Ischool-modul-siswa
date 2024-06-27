<template>
  <div class="text-h4 text-bold text-left">{{ data?.category }}</div>

  <div style="margin-top: 30px">
    <q-markup-table
      flat
      bordered
      h-scroll
      v-for="(item, index) in data?.narrative_sub_categories"
      :key="item.id"
      class="tw-mt-5"
    >
      <thead>
        <tr>
          <th colspan="5" class="bg-teal">
            <div class="row no-wrap items-center">
              <div class="text-h5 q-ml-md text-white">
                {{ item?.sub_category }}
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left text-bold">Keterangan</th>
          <th class="text-center text-bold">Mandiri</th>
          <th class="text-center text-bold">Berkembang</th>
          <th class="text-center text-bold">Membutuhkan Banyak Latihan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in item?.narrative_reports" :key="item.id">
          <td class="text-left">{{ item?.desc }}</td>
          <td class="text-center">
            <q-radio
              v-model="shape"
              disable
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="item?.grade == 1"
            />
          </td>
          <td class="text-center">
            <q-radio
              v-model="shape"
              disable
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="item?.grade == 2"
            />
          </td>
          <td class="text-center">
            <q-radio
              v-model="shape"
              disable
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="item?.grade == 3"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div
      class="tw-mt-5"
      v-if="
        data &&
        data.narrative_category_comments &&
        data.narrative_category_comments.comments
      "
    >
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Komentar Guru</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section class="q-pt-none text-left tw-mt-3">
          {{ data.narrative_category_comments.comments }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { data } from "autoprefixer";
import { ref } from "vue";

export default {
  name: "Pemimpin",

  setup() {
    return {
      shape: ref(true),
      semester: ref(sessionStorage.getItem("smt")),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      token: ref(sessionStorage.getItem("token")),
      data: ref(),
    };
  },
  watch: {
    semester(newVal) {
      this.getRaport();
    },
  },
  props: ["sub"],
  methods: {
    async getRaport() {
      try {
        const category = parseInt(this.sub);
        console.log(this.semester);
        const response = await this.$api.get(
          `narrative-report/show-by-student/${this.idSiswa}?semester=${
            this.semester ? this.semester : "1"
          }`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const dataRest = response.data?.data?.narrative_categories;
        let filteredData = [];
        if (Array.isArray(dataRest)) {
          filteredData = dataRest.filter((item) => item.id === category);
        }
        this.data = filteredData[0];
        console.log(filteredData[0]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getRaport();
  },
};
</script>
