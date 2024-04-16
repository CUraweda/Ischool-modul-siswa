<template>
  <div class="row">
      <div class="col-md-12 ">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">DASHBOARD SISWA</span>
              </p>
            </div>

            <div class="tw-mt-3 tw-flex tw-flex-wrap row">
              <div class="tw-w-1/3 tw-p-3 col-12 col-md ">
                <q-card class="bg-green-1 tw-w-full tw-h-80">
                  <q-card-section>
                    <div class="row flex tw-flex-col justify-center items-center">
                      <p><span style="font-size: xx-large">Presensi</span></p>
                      <div class="row flex justify-center items-center tw-w-full">

                        <div class="img">
                          <q-img src="../../assets/sadeicon.png" />
                        </div>
                        <div class="col-md col-12 text-left">

                          <q-markup-table class="bg-green-1" flat>
                            <tbody>
                              <tr>
                                <td class="text-left">Hadir</td>
                                <td class="text-right">{{ presensi?.hadir }}</td>
                              </tr>
                              
                              <tr>
                                <td class="text-left">Sakit</td>
                                <td class="text-right">{{ presensi?.sakit }}</td>
                              </tr>
                              <tr>
                                <td class="text-left">Alfa</td>
                                <td class="text-right">{{ presensi?.tanpa_keterangan }}</td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="tw-w-1/3 tw-p-3 col-12 col-md">

                <q-card class="bg-pink-1 tw-w-full tw-h-80">
                  <q-card-section>
                    <div class="row flex tw-flex-col justify-center items-center">
                      <p>
                        <span style="font-size: xx-large">Asesmen</span>
                        <br />
                        <span> Semester 1 </span>
                      </p>
                      <div class="row flex justify-center items-center tw-w-full">

                        <div class="img">
                          <q-img src="../../assets/Asesmen.png" style="width: 70%" />
                        </div>
                        <div class="col-md-8 text-left">

                          <q-markup-table class="bg-pink-1" flat>
                            <tbody>
                              <tr>
                                <td class="text-left">Narasi</td>
                                <td class="text-right">23 juni 2023</td>
                                <td>
                                  <q-btn round color="blue-2" icon="file_download" />
                                </td>
                              </tr>
                              <tr>
                                <td class="text-left">Portofolio</td>
                                <td class="text-right">23 juni 2023</td>
                                <td>
                                  <q-btn round color="blue-2" icon="file_download" />
                                </td>
                              </tr>
                              <tr>
                                <td class="text-left">Raport Angka</td>
                                <td class="text-right">23 juni 2023</td>
                                <td>
                                  <q-btn round color="blue-2" icon="file_download" />
                                </td>
                              </tr>
                            </tbody>
                          </q-markup-table>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="tw-w-1/3 tw-p-3 col-12 col-md">

                <q-card class="bg-light-green-1 tw-w-full tw-h-80">
                  <q-card-section>
                    <P class="text-bold text-left">Overview <br />
                      Tema : <span class="text-blue"></span>
                      <br />
                      Pemahaman Bermakna : <br />
                      periode : <br />
                      TUP :
                      <span class="text-blue"></span>
                    </P>

                    <div class="text-justify" style="width: 95%">
                      <q-scroll-area style="height: 20vh" class="q-pa-sm">
                        <p>
                          -
                        </p>
                      </q-scroll-area>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
         

            <div class="tw-w-full tw-p-3">

              <q-card class="tw-h-40">
                <q-card-section class="text-left">
                  <p class="text-left">
                    <br />
                    <span class="text-bold">Pengumuman</span>
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </div>
      </div>
    </div>
</template>

<script>

import NavbarSiswa from "../../components/siswa/HederSiswa.vue"
import { ref } from 'vue'

export default {
  components: {
    NavbarSiswa
  },
  setup() {
    return {
      presensi: ref(),
      agenda: ref(),
      idSiswa : ref(sessionStorage.getItem("idSiswa")),
      token : ref(sessionStorage.getItem("token"))
    }
  },
  mounted() {
   
  },
  methods: {
  
  }

};
</script>


<style>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .img {
    display: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .img {
    display: flex;
    width: 30%;
  }
}
</style>
