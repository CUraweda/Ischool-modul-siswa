<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2 text-center">
        <p class="text-bold">
          <span style="font-size: 3rem">12:30</span> <br />
          senin,20 Agustus 2023
        </p>
      </div>
      <div class="col-md-8"></div>
      <div class="col-md-2 text-right q-pr-md q-pb-md">
        <br />
        <q-img src="../assets/sade.png" style="width: 40%"></q-img>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2" style="height: 87vh">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">TUGAS SISWA</span>
              </p>
            </div>
            <q-card>
              <q-card-section>
                <div>
                  <div class="test-center text-h6"> Quiz</div>
                  <br>
                  <q-markup-table style="height: 28vh;" h-scroll>
                    <thead>
                      <tr>
                        <th class="text-left">Tanggal</th>
                        <th class="text-right">Mata Pelajaran</th>
                        <th class="text-right">Topik</th>
                        <th class="text-right">Durasi</th>
                        <th class="text-right">Mulai</th>
                        <th class="text-right">Status</th>
                        <th class="text-right">Nilai</th>
                        <th class="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-left">20 sep 2023</td>
                        <td class="text-right">Bahasa Inggris</td>
                        <td class="text-right">-</td>
                        <td class="text-right">45 menit</td>
                        <td class="text-right">20 sep 2023</td>
                        <td class="text-right">Berjalan</td>
                        <td class="text-right">-</td>
                        <td class="text-right">

                          <div>
                            <q-btn label="Mulai" color="green" @click="medium = true" />

                            <q-dialog v-model="medium">
                              <q-card style="width: 1000px; max-width: 80vw;">
                                <q-card-section>
                                  <div class="text-h6">QUIZ</div><br>
                                  <div class="row">
                                    <div class="col-6 text-bold" style="font-size: medium;" >
                                      <p>Nama : Sarrah Aditya Nareswari <br>
                                        <span>Nis : 12345678</span><br>
                                        <span>Kelas : 3D</span>
                                      </p>

                                    </div>
                                    <div class="col-6 text-bold"  style="font-size: medium;">
                                      <p>Mata Pelajaran : Bahasa Inggris <br> <span>Topik : -</span></p>
                                    </div>
                                  </div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                  <p>
                                    <span class="text-bold" style="font-size: medium;">Pilihan Ganda</span>
                                  </p>
                                  <div>
                                    <q-markup-table>

                                         <tr>
                                          <td colspan="4">1. Sonia ... a book in the library</td>
                                        </tr>
                                        <tr>
                                          <td class="text-left"><q-radio v-model="shape" val="Eats" label="Eats" />
                                          </td>
                                          <td class="text-left"><q-radio v-model="shape" val="Reads" label="Reads" /></td>
                                          <td class="text-left"><q-radio v-model="shape" val="Buys" label="Buys" /></td>
                                          <td class="text-left"><q-radio v-model="shape" val="Pays" label="Pays" /></td>
                                        </tr>
                                        <tr>
                                          <td colspan="4">  Your Answer is: <strong>{{ shape }}</strong></td>
                                        </tr>
                                      <br>

                                      <tr>
                                        <td colspan="4"><q-separator color="orange" inset /></td>
                                      </tr>

                                         <tr>
                                          <td colspan="4">2. The word below is our daily activity, it is...</td>
                                        </tr>
                                        <tr>
                                          <td class="text-left"><q-radio v-model="shape2" val="Eats" label="Eats" />
                                          </td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Reads" label="Reads" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Buys" label="Buys" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Pays" label="Pays" /></td>
                                        </tr>
                                        <tr>
                                          <td colspan="4">  Your Answer is: <strong>{{ shape2 }}</strong></td>
                                        </tr>


                                      <tr>
                                        <td colspan="4"><q-separator color="orange" inset /></td>
                                      </tr>

                                         <tr>
                                          <td colspan="4">3. The word below is our daily activity, it is...</td>
                                        </tr>
                                        <tr>
                                          <td class="text-left"><q-radio v-model="shape2" val="Eats" label="Eats" />
                                          </td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Reads" label="Reads" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Buys" label="Buys" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Pays" label="Pays" /></td>
                                        </tr>
                                        <tr>
                                          <td colspan="4">  Your Answer is: <strong>{{ shape }}</strong></td>
                                        </tr>


                                      <tr>
                                        <td colspan="4"><q-separator color="orange" inset /></td>
                                      </tr>

                                         <tr>
                                          <td colspan="4">4. The word below is our daily activity, it is...</td>
                                        </tr>
                                        <tr>
                                          <td class="text-left"><q-radio v-model="shape2" val="Eats" label="Eats" />
                                          </td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Reads" label="Reads" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Buys" label="Buys" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Pays" label="Pays" /></td>
                                        </tr>
                                        <tr>
                                          <td colspan="4">  Your Answer is: <strong>{{ shape }}</strong></td>
                                        </tr>


                                      <tr>
                                        <td colspan="4"><q-separator color="orange" inset /></td>
                                      </tr>

                                         <tr>
                                          <td colspan="4">5. The word below is our daily activity, it is...</td>
                                        </tr>
                                        <tr>
                                          <td class="text-left"><q-radio v-model="shape2" val="Eats" label="Eats" />
                                          </td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Reads" label="Reads" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Buys" label="Buys" /></td>
                                          <td class="text-left"><q-radio v-model="shape2" val="Pays" label="Pays" /></td>
                                        </tr>
                                        <tr>
                                          <td colspan="4">  Your Answer is: <strong>{{ shape }}</strong></td>
                                        </tr>



                                    </q-markup-table>
                </div>

              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Submit" v-close-popup />
              </q-card-actions>
            </q-card>
            </q-dialog>

      </div>
      </td>
      </tr>



      </tbody>
      </q-markup-table>
    </div>
    </q-card-section>
    <br>
    <q-separator />
    <br>
    <q-card-section>
      <div>
        <div class="test-center text-h6"> Pekerjaan Rumah</div>
        <br>
        <q-markup-table style="height: 28vh;" h-scroll>
          <thead>
            <tr>
              <th class="text-left">Tanggal</th>
              <th class="text-right">Mata Pelajaran</th>
              <th class="text-right">Topik</th>
              <th class="text-right">Sifat</th>
              <th class="text-right">Mulai</th>
              <th class="text-right">selesai</th>
              <th class="text-right">Status</th>
              <th class="text-right">Nilai</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </td>
            </tr>

            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </td>
            </tr>

            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </td>
            </tr>

            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </td>
            </tr>

            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </td>
            </tr>

            <tr>
              <td class="text-left">20 sep 2023</td>
              <td class="text-right">Matematika</td>
              <td class="text-right">Trigonometri</td>
              <td class="text-right">individu</td>
              <td class="text-right">20 sep 2023</td>
              <td class="text-right">21 sep 2023</td>
              <td class="text-right">Berjalan</td>
              <td class="text-right">-</td>
              <td class="text-right">
                <div>
                  <q-btn label="Upload" color="green" @click="small = true" />

                  <q-dialog v-model="small">
                    <q-card style="width: 300px">
                      <q-card-section>
                        <div class="text-h6 text-center">Upload Tugas</div>
                      </q-card-section>
                      <q-separator />
                      <br>
                      <q-card-section class="q-pt-none">
                        <p>Mata pelajaran : <span> Matematika</span></p>
                        <p>Topik : <span> Trigonometri</span></p>

                        <q-separator />
                        <br>
                        <q-file color="teal" filled v-model="model" label="upload file">
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                          </template>
                        </q-file>
                      </q-card-section>

                      <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="submit" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
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
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('mails'),
      innerTab: ref('innerMails'),
      small: ref(false),
      medium: ref(false),
      splitterModel: ref(20),
      shape: ref(),
      shape2: ref(),
      model: ref(null)
    }
  }
}
</script>
