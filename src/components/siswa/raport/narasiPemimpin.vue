<template>
    <div class="text-h4 text-bold text-left">{{ category }}</div>
   
    <div style="margin-top: 30px">
        <q-markup-table flat bordered h-scroll v-for="(item, index) in data" :key="item.id">
            <thead>
                <tr>
                    <th colspan="5" class="bg-teal">
                        <div class="row no-wrap items-center">
                            <div class="text-h5 q-ml-md text-white">{{ item?.sub_category }}</div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th class="text-left text-bold">Keterangan</th>
                    <th class="text-center text-bold">Membutuhkan banyak latihan</th>
                    <th class="text-center text-bold">Berkembang</th>
                    <th class="text-center text-bold">Mandiri</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in item?.narrative_reports" :key="item.id">
                    <td class="text-left">{{ item?.desc }}</td>
                    <td class="text-center">
                        <q-radio v-model="shape" disable checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val=" item?.grade == 1"/>
                    </td>
                    <td class="text-center">
                        <q-radio v-model="shape" disable checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val=" item?.grade == 2"/>
                    </td>
                    <td class="text-center">
                        <q-radio v-model="shape" disable checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val=" item?.grade == 3"/>
                    </td>
                </tr>  
            </tbody> 
        </q-markup-table>
      
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Pemimpin',

 
  setup() {
        return {
            shape: ref(true),
            semester: ref(sessionStorage.getItem("smt")),
            idSiswa: ref(sessionStorage.getItem("idSiswa")),
            token: ref(sessionStorage.getItem("token")),
            data:ref(),
            category: ref()
        }
    },
    watch: {
        semester(newVal) {
            this.getRaport()
        }
    },
    props: ['sub'],
    methods: {
        async getRaport() {
            try {
                const category = parseInt(this.sub)
                const response = await this.$api.get(`narrative-report/show-by-student/${this.idSiswa}?semester=${this.semester ? this.semester : '1'}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
              
                this.data = response.data.data.narrative_categories[category].narrative_sub_categories
                this.category = response.data.data.narrative_categories[category].category

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