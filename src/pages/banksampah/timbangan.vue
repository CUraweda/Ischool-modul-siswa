<template>
  <div class="bg-image">
    <q-page>
      <br><br>
      <div class="row q-mt-sm">
        <div class="absolute-top-right">
          <p>Power By : <q-img src="../../assets/ips.png" style="width: 80%"></q-img></p>
        </div>
        <div>
          <div class="row q-mt-md">
            <div class="col-3 text-center">
              <img alt="Quasar logo" src="../../assets/sade.png" style="width: 50%;">
            </div>
            <div class="col-9 text-right">
              <q-card class="bg-grey-2 text-center " style="width: 77vw; height: 90vh;">
                <q-card-section>
                  <p class="text-bold text-blue-5"><span style="font-size: xx-large;">BANK SAMPAH</span> <br> <span
                      style="font-size: x-large;">Timbangan</span></p>
                  <q-separator color="grey-6" inset />
                  <div class="row">
                    <div class="col-md-3 text-center">
                      <div class="col ">
                        <br><br><br><br><br>
                        <q-card class="full-width" style="height: 63vh;">
                          <q-card-section>
                            <p class="text-bold" style="font-size: x-large;">DATA SISWA</p>
                            <q-select class="q-mt-md" filled v-model="model" :options="options" label="Kelas" />
                            <q-select class="q-mt-md" filled v-model="model1" :options="options1" label="Nama Siswa" />
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>

                    <div class="col-md-9 text-center q-mt-md">
                      <p><span class="text-bold" style="font-size: x-large;">Senin</span><br> <span>16 Oktober 2023</span>
                      </p>
                      <div class="q-mt-xl">
                        <div class="row justify-center">

                          <div class="col-2 text-center">
                            <p class=" text-bold" style="font-size: medium;">Botol Plastik Bening</p>
                            <q-field filled label="gram" stack-label class="q-px-sm">
                              <template v-slot:control>
                                <div class="text-center text-blue-8 text-bold full-width no-outline q-my-xl"
                                  style="height: 3vh; font-size: 4rem;" tabindex="0">000</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-2 text-center">
                            <p class=" text-bold" style="font-size: medium;">Gelas Plastik Bening</p>
                            <q-field filled label="gram" stack-label class="q-px-sm">
                              <template v-slot:control>
                                <div class="text-center text-blue-8 text-bold full-width no-outline q-my-xl"
                                  style="height: 3vh; font-size: 4rem;" tabindex="0">000</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-2 text-center">
                            <p class=" text-bold" style="font-size: medium;">Gelas Plastik warna</p>
                            <q-field filled label="gram" stack-label class="q-px-sm">
                              <template v-slot:control>
                                <div class="text-center text-blue-8 text-bold full-width no-outline q-my-xl"
                                  style="height: 3vh; font-size: 4rem;" tabindex="0">000</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-2 text-center">
                            <p class=" text-bold" style="font-size: medium;">Tutup Botol</p>
                            <q-field filled label="gram" stack-label class="q-px-sm">
                              <template v-slot:control>
                                <div class="text-center text-blue-8 text-bold full-width no-outline q-my-xl"
                                  style="height: 3vh; font-size: 4rem;" tabindex="0">000</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-2 text-center">
                            <p class=" text-bold" style="font-size: medium;">Compact Disk</p>
                            <q-field filled label="gram" stack-label class="q-px-sm">
                              <template v-slot:control>
                                <div class="text-center text-blue-8 text-bold full-width no-outline q-my-xl"
                                  style="height: 3vh; font-size: 4rem;" tabindex="0">000</div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </div>

                      <q-btn class="q-mx-sm q-mt-md text-right" color="light-blue-6" label="Submit" style="width: 8vw;" />

                      <p class="q-mt-md text-bold text-blue-9" > <span style="font-size: larger;">Bank Sampah</span> <br><span style="font-size: small;">Periode senin 16 Oktober 2023</span></p>

                      <q-select class=" q-ml-xl q-mt-md" dense style="width: 20%;" outlined v-model="model" :options="options" label="Filter" />
                      <div class="row justify-center">
                        <q-table class="q-mt-md" style="height: 200px" flat bordered :rows="rows" :columns="columns"
                          row-key="index" virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[0]" hide-bottom />

                      </div>
                    </div>

                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'

const columns = [

  {
    name: 'name',
    required: true,
    label: 'Nama',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Kelas', field: 'calories', sortable: true },
  { name: 'fat', label: 'Botol Plastik Bening', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Gelas Plastik Bening', field: 'carbs' },
  { name: 'protein', label: 'Gelas Plastik warna', field: 'protein' },
  { name: 'sodium', label: 'Tutup Botol', field: 'sodium' },
  { name: 'calcium', label: 'Compact Disk', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Total', field: 'iron' },
]

const seed = [
  {
    name: 'Sarrah Aditya Nareswari',
    calories: '3D' ,
    fat: 0.5,
    carbs: 2.5,
    protein: 4,
    sodium: 2,
    calcium: '2',
    iron: '11'

  },
  {
    name: 'dudidam',
    calories: '3D' ,
    fat: 0.5,
    carbs: 2.5,
    protein: 4,
    sodium: 2,
    calcium: '2',
    iron: '11'

  },
  {
    name: 'purna',
    calories: '3D' ,
    fat: 0.5,
    carbs: 2.5,
    protein: 4,
    sodium: 2,
    calcium: '2',
    iron: '11'

  },

]

// we generate lots of rows here
let rows = []
for (let i = 0; i < 50; i++) {
  rows = rows.concat(seed.slice(0).map(r => ({ ...r })))
}
rows.forEach((row, index) => {
  row.index = index
})

export default {
  setup() {
    return {
      model: ref(null),
      model1: ref(null),
      columns,
      rows,

      pagination: ref({
        rowsPerPage: 0
      }),

      options: [
        {
          label: 'Kelas 1',
          value: 'Kelas 1',
        },
        {
          label: 'Kelas 2',
          value: 'Kelas 2',
        },
        {
          label: 'Kelas 3',
          value: 'Kelas 3',
        },
        {
          label: 'Kelas 4',
          value: 'Kelas 4',
        },
        {
          label: 'Kelas 5',
          value: 'Kelas 5',
        },
        {
          label: 'Kelas 5',
          value: 'Kelas 5',
        },
        {
          label: 'Kelas 6',
          value: 'Kelas 6',
        },

      ],

      options1: [
        {
          label: 'Sarrah Aditya Nareswari',
          value: 'Sarrah Aditya Nareswari',
        },
        {
          label: 'Dudidam',
          value: 'Dudidam',
        },


      ]
    }
  }
}
</script>
<style>
.bg-image {
  background-image: url('../../assets/bg2.png');
  background-repeat: no-repeat;
  background-size: cover, cover;
}
</style>
