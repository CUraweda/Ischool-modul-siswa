<template>
  <div class="container">
    <!-- <NavbarSiswa /> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">RENCANA PEKANAN</span>
              </p>
              <p>
                <span class="text-center text-black" style="font-size: x-large">{{ periode }}</span>
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card class="my-card tw-w-full">
              <q-card-section>

                <q-markup-table separator="cell" flat bordered>
                  <thead>
                    <tr class="bg-blue-3 text-bold">
                      <th class="text-center">Pekan / Tanggal</th>
                      <th class="text-center">Senin</th>
                      <th class="text-center">Selasa</th>
                      <th class="text-center">Rabu</th>
                      <th class="text-center">Kamis</th>
                      <th class="text-center">Jum'at</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in rows" :key="item.id">
                      <td v-if="!index || rows[index - 1]?.tanggal !== item?.tanggal"
                        :rowspan="rows?.filter((Item) => Item?.tanggal === item?.tanggal).length">
                        {{ item?.tanggal }}
                      </td>
                      <td class="text-center" v-if="!index || rows[index - 1]?.senin !== item?.senin "
                        :rowspan="rows?.filter((Item) => Item?.senin === item?.senin && Item?.tanggal === item?.tanggal).length">
                        {{ item?.senin }}
                      </td>
                      <td class="text-center" v-if="!index || rows[index - 1]?.selasa !== item?.selasa"
                        :rowspan="rows?.filter((Item) => Item?.selasa === item?.selasa && Item?.tanggal === item?.tanggal).length">
                        {{ item?.selasa }}
                      </td>
                      <td class="text-center" v-if="!index || rows[index - 1]?.rabu !== item?.rabu"
                        :rowspan="rows?.filter((Item) => Item?.rabu === item?.rabu && Item?.tanggal === item?.tanggal).length">
                        {{ item?.rabu }}
                      </td>
                      <td class="text-center" v-if="!index || rows[index - 1]?.kamis !== item?.kamis"
                        :rowspan="rows?.filter((Item) => Item?.kamis === item?.kamis && Item?.tanggal === item?.tanggal).length">
                        {{ item?.kamis }}
                      </td>
                      <td class="text-center" v-if="!index || rows[index - 1]?.jumat !== item?.jumat"
                        :rowspan="rows?.filter((Item) => Item?.jumat === item?.jumat && Item?.tanggal === item?.tanggal).length">
                        {{ item?.jumat }}
                      </td>

                    </tr>

                  </tbody>
                </q-markup-table>

              </q-card-section>
            </q-card>
          </q-card-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, getCurrentInstance, watch } from "vue";



export default {
  setup() {


    return {
      separator: ref('cell'),
      periode: ref(''),
      rows: [
        {
          id: 1,
          tanggal: '1 (9 - 12 Januari 2024)',
          senin: 'libur',
          selasa: 'bersih rapi bersama',
          rabu: "Muraja'ah bersama",
          kamis: "Muraja'ah bersama",
          jumat: "Muraja'ah bersama"

        },
        {
          id: 2,
          tanggal: '1 (9 - 12 Januari 2024)',
          senin: 'libur',
          selasa: 'bersih rapi bersama',
          rabu: "Presentasi WWP Sains",
          kamis: "Peniaian ibadah sholat",
          jumat: "Jumsih"

        },
        {
          id: 3,
          tanggal: '1 (9 - 12 Januari 2024)',
          senin: 'libur',
          selasa: 'bersih rapi bersama',
          rabu: "Presentasi WWP Sains",
          kamis: "Screening math",
          jumat: "Daily Writing"

        },
        {
          id: 4,
          tanggal: '1 (9 - 12 Januari 2024)',
          senin: 'libur',
          selasa: 'bersih rapi bersama',
          rabu: "Presentasi WWP Sains",
          kamis: "Screening math",
          jumat: "Ekskul"

        },
        {
          id: 5,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'Tahsin',
          selasa: 'Tahsin',
          rabu: 'Tahsin',
          kamis: 'Tahsin',
          jumat: 'Tahsin'

        },
        {
          id: 6,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'Kunjungan perpustakaan',
          selasa: 'Display konsep pesawat sederhana',
          rabu: "Peran sosialku di sekolah",
          kamis: "Eksplor area EA",
          jumat: "JUMSIH"

        },
        {
          id: 7,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'Kunjungan perpustakaan',
          selasa: 'Display konsep pesawat sederhana',
          rabu: "Peran sosialku di sekolah",
          kamis: "Eksplor area EA",
          jumat: "JUMSIH"

        },
        {
          id: 8,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'Kunjungan perpustakaan',
          selasa: 'EFLES',
          rabu: "Peran sosialku di sekolah",
          kamis: "Eksplor area EA",
          jumat: "JUMSIH"

        },
        {
          id: 9,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'ART',
          selasa: 'Display konsep pesawat sederhana (2)',
          rabu: "Islamika",
          kamis: "Math",
          jumat: "Daily writing"

        },
        {
          id: 9,
          tanggal: '2 (15 - 19 Januari 2024)',
          senin: 'Konsep pesawat sederhana',
          selasa: 'Display konsep pesawat sederhana (2)',
          rabu: "Islamika",
          kamis: "Math",
          jumat: "ekskul"

        },
        

      ],
      token: sessionStorage.getItem("token")
    }
  },
  mounted() {
    this.getJadwalKegiatan()
  },
  methods: {
    async getJadwalKegiatan() {
      // try {
      //   const { schedules, pushIndex } = this.createEmptySchedule()
      //   console.log(schedules, pushIndex)
      //   const { data } = await axios.get(`https://api-dev.curaweda.com:7000/api/timetable?page=0&limit=10`, {
      //     headers: {
      //       'Authorization': `Bearer ${this.token}`
      //     }
      //   });
      //   console.log(data);

      // } catch (error) {
      //   console.log(error);
      // }

    },


  }
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
