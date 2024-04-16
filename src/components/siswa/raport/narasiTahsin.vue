<template>
    <div class="text-h4 text-bold text-left">Tahsin</div>
    <div class="text-h6 text-bold text-left">Kualitas Tilawah</div>
    <div>
        <q-markup-table flat bordered h-scroll>
            <thead>
                <tr>
                    <th colspan="5" class="bg-teal">
                        <div class="row no-wrap items-center">
                            <div class="text-h5 q-ml-md text-white">Al Qur’an</div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th class="text-left text-bold">Keterangan</th>
                    <th class="text-center text-bold">jayyid</th>
                    <th class="text-center text-bold">jayyid Jiddan</th>
                    <th class="text-center text-bold">Mumtaz</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="item.id">
                    <td class="text-left" >
                        {{ item?.desc }}
                      
                    </td>
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
        <br />
        <q-separator />
        <br />

        <div class="text-h6 text-bold text-left">Komentar pembimbing:</div>

        <div>
            <q-card>
                <q-card-section>
                    <div class="text-h6 text-bold text-italic text-left">
                        Komentar Tahsin :
                    </div>
                    <P class="text-left"> - </P>
                    <br />
                    <q-separator />
                    <br />
                    <div class="text-h6 text-bold text-italic text-left">
                        Komentar Tahfidz:
                    </div>
                    <P class="text-left"> - </P>
                    <br />
                    <q-separator />
                    <br />
                    <div class="text-h6 text-bold text-italic text-left">
                        Rekomendasi :
                    </div>
                    <P class="text-left"> - </P>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: "Tahsin",

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
    methods: {
        async getRaport() {
            try {
                const response = await this.$api.get(
                    `narrative-report/show-by-student/${this.idSiswa}?semester=${this.semester ? this.semester : "1"
                    }`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                console.log(
                    response.data.data.narrative_categories[0].narrative_sub_categories[0]
                        .narrative_reports
                );
                this.data =
                    response.data.data.narrative_categories[0].narrative_sub_categories[0].narrative_reports;
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
