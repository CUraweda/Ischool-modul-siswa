<template>
    <div class="text-h4 q-mb-md">Raport Angka</div>
    <div>
        <q-markup-table class="" separator="cell" bordered="">
            <thead>
                <tr>
                    <th rowspan="2" class="text-center">No</th>
                    <th rowspan="2" class="text-center">Nama Pelajaran</th>
                    <th rowspan="2" class="text-center">Kriteria <br>
                        Ketuntasan <br>
                        Minimal</th>
                    <th colspan="2" class="text-center">Nilai</th>
                </tr>
                <tr>
                    <th class="text-center">Angka</th>
                    <th class="text-center">Huruf</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in dataRaport" :key="item.id">
                    <td class="text-left" style="width: 10px;">{{ index + 1 }}</td>
                    <td class="text-left">{{ item?.subject_name }}</td>
                    <td class="text-center">{{ item?.threshold }}</td>
                    <td class="text-center">{{ item?.grade }}</td>
                    <td class="text-left">{{ item?.grade_text }}</td>
                </tr>


            </tbody>
        </q-markup-table>
    </div>
    <br>
    <q-separator />
    <br>
    <div>
        <q-markup-table separator="cell" v-if="dataPersonality">
            <thead>
                <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Kepribadian</th>
                    <th class="text-center">Nilai <br></th>
                    <th class="text-center">Ketidak Hadiran</th>
                    <th class="text-center">Hari</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left" style="width: 10px;">1</td>
                    <td class="text-left">Sikap</td>
                    <td class="text-center">{{ dataPersonality[0]?.grade }}</td>
                    <td class="text-left">Izin</td>
                    <td class="text-center">{{ dataPresensi?.izin }}</td>
                </tr>

                <tr>
                    <td class="text-left" style="width: 10px;">2</td>
                    <td class="text-left">Kerajinan</td>
                    <td class="text-center">{{ dataPersonality[1]?.grade }}</td>
                    <td class="text-left">Sakit</td>
                    <td class="text-center">{{ dataPresensi?.sakit }}</td>
                </tr>

                <tr>
                    <td class="text-left" style="width: 10px;">3</td>
                    <td class="text-left">Kebersihan dan Kerapihan</td>
                    <td class="text-center">{{ dataPersonality[2]?.grade }}</td>
                    <td class="text-left">Tanpa Keterangan</td>
                    <td class="text-center">{{ dataPresensi?.tanpa_keterangan }}</td>
                </tr>
            </tbody>
        </q-markup-table>
    </div>
    <P>
    </P>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'NumberRapot',
    props: {
    TabPilihan: {
      type: String,
      required: true
    }
  },
    setup(props) {
        return {
            shape: ref('line'),
            idSiswa: ref(sessionStorage.getItem("idSiswa")),
            token: ref(sessionStorage.getItem("token")),
            dataRaport: ref(),
            dataPresensi: ref(),
            dataPersonality: ref(),
            semester: ref(sessionStorage.getItem("smt"))
        }
    },
    watch: {
        semester(newVal) {
            this.getRaport()
        }
    },
    methods: {
        async getRaport() {
            try {
                const response = await this.$api.get(`number-report/show-by-student/${this.idSiswa}?semester=${this.semester ? this.semester : '1'}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                
               
                this.dataRaport = response.data.data.number_reports
                this.dataPresensi = response.data.data.attendances
                this.dataPersonality = response.data.data.personalities

            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.getRaport()
    },
}
</script>
