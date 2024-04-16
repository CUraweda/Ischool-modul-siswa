<template>
    <div class="text-h4 text-bold text-left">Kemampun Berfikir</div>
   
    <div style="margin-top: 30px">
        <q-markup-table flat bordered h-scroll>
            <thead>
                <tr>
                    <th colspan="5" class="bg-teal">
                        <div class="row no-wrap items-center">
                            <div class="text-h5 q-ml-md text-white">Kemampuan Umum</div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th class="text-left text-bold" style="width: 20px; font-size: medium;">Keterangan</th>
                    <th class="text-center text-bold " style="width: 20px; font-size: medium;">Nilai</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">Mampu mengontrol perilaku sendiri</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mulai menunjukkan kemampuan menulis</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu memahami soal cerita</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                     
            </tbody>
            <thead>
                <tr>
                    <th colspan="5" class="bg-teal">
                        <div class="row no-wrap items-center">
                            <div class="text-h5 q-ml-md text-white">Kemampuan Umum</div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th class="text-left text-bold" style="width: 20px; font-size: medium;">Keterangan</th>
                    <th class="text-center text-bold " style="width: 20px; font-size: medium;">Nilai</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">Mampu mengajukan pertanyaan yang membangun keingintahuannya</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu menggunakan kata tanya (5W + 1H)</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu mengumpulkan data</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu mencari hubungan</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu menentukan hubungan sebab akibat</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                <tr>
                    <td class="text-left">Mampu membuat inferensi (kesimpulan sementara)</td>
                    <td class="text-center">3 (mandiri)</td>  
                </tr>
                     
            </tbody>
            
        </q-markup-table>
      
        <br>
        <q-separator />
        <br>

        <div class="text-h6 text-bold text-left">Komentar pembimbing:</div>

        <div>
            <q-card>
                <q-card-section>
                  
                    <P class="text-left">
                        Aisha mampu membaca Al Qur’an dengan lancar. Masih sama seperti semester sebelumnya, yang
                        perlu dilatih adalah melatih nafas saat membaca qur’an agar dapat membaca satu ayat tanpa
                        berhenti di tengah-tengah ayat. Kalau perlu berhenti, Aisha perlu berlatih untuk berhenti di
                        tanda
                        waqaf. Tanda 15 jenis tanda waqaf yang perlu dikenali lebih dalam agar dapat digunakan dengan
                        tepat saat membaca Al Qur’an <br><br>
                        Kuantitas Qira’ah tahsin : <br>
                        Al Qur’an : Al Maidah <br>
                        Ayat : 95
                    </P>
                    <br>
                   
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Berfikir',

  setup() {
    return {
      shape: ref('line'),
    }
  },



}
</script>