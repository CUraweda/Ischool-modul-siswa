<template>
    <div class="q-pa-md bg-image">
        <q-page class="vertical-middle tw-h-screen">
            <div class="tw-w-full tw-h-screen flex tw-justify-center tw-items-center tw-py-32">
                <div class="tw-w-5/6 tw-h-full bg-white flex tw-justify-center tw-items-center tw-grid tw-grid-cols-2">
                    <div class="tw-h-full flex tw-flex-col tw-justify-center tw-items-center">
                        <q-img class="q-my-lg" src="../assets/sade.png" style="width: 25%" />
                        <div class="tw-m-8">
                            <p class="tw-text-xl tw-font-bold">Cari Siswa</p>
                        </div>
                        <q-form @submit.prevent="searchSiswa" class="tw-w-full flex justify-center">
                            <q-input v-model="nis" class="text-center " bottom-slots filled type="text" label="NIS"
                                style="width: 70%">
                                <template v-slot:prepend>
                                    <q-icon name="people" />
                                </template>
                            </q-input>
                            <q-btn type="submit" color="blue-grey-6" glossy label="Cari Siswa" style="width: 70%" />
                        </q-form>

                    </div>
                    <div class="tw-h-full">
                        <div class="tw-m-3 tw-mb-10 text-center tw-text-2xl tw-font-bold">
                            Data Siswa
                        </div>
                        <div class="tw-flex justify-center tw-items-center tw-flex-col tw-gap-5">

                            <q-markup-table class="tw-w-5/6">
                                <thead>
                                    <tr>
                                        <th class="text-left">Nomor Induk Siswa</th>
                                        <th class="text-left">{{ siswa?.nis }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Nomor Induk Siswa Nasional</th>
                                        <th class="text-left">{{ siswa?.nisn }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Nama Lengkap</th>
                                        <th class="text-left">{{ siswa?.full_name }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Jenis Kelamin</th>
                                        <th class="text-left">{{ siswa?.gender }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Tempat Lahir</th>
                                        <th class="text-left">{{ siswa?.pob }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Tanggal Lahir</th>
                                        <th class="text-left">{{ date }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Alamat</th>
                                        <th class="text-left">{{ siswa?.address }}</th>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Kelas</th>
                                        <th class="text-left">{{ siswa?.class }}</th>
                                    </tr>
                                </thead>
                            </q-markup-table>
                            <q-btn v-if="siswa" @click="userAccess" :disable="btn" type="submit" color="green-6" glossy
                                label="Tautkan Siswa" />
                        </div>

                    </div>
                </div>

            </div>
        </q-page>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2'
import { ref } from 'vue'

export default {

    methods: {   
        async searchSiswa() {
            const nisSiswa = this.nis
            const token = sessionStorage.getItem("token")

            try {
                const response = await this.$api.get(`/student/show-nis/${nisSiswa}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.message == 'Student not found!') {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Data Siswa Tidak Ditemukan",

                    });
                } else {
                    this.siswa = response.data.data
                    const dob = response.data.data.dob
                    this.date = new Date(dob).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gagal Mencari siswa, silakan coba beberapa saat lagi",

                });
            }
        },

        userAccess() {
            Swal.fire({
                title: "Are you sure?",
                text: `Tautkan akun anda dengan ${this.siswa?.full_name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Tautkan Sekarang"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.linkUser()
                }
            });

        },

        async linkUser() {
            try {
                this.btn = true
                const token = sessionStorage.getItem("token")
                const role = sessionStorage.getItem("role")
                const idUser = sessionStorage.getItem("idUser")
                const data = {
                    user_id: parseInt(idUser),
                    student_id: this.siswa.id
                }
                const response = await this.$api.post(`/user-access/create`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data) {
                    Swal.fire({
                        title: "Success!",
                        text: `akun anda telah tertaut dengan siswa ${this.siswa?.full_name}`,
                        icon: "success"
                    });
                    if (role == 7) {
                        this.$router.push("/siswa")
                    } else if (role == 8){
                        this.$router.push("/wali") 
                    }
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gagal menautkan siswa, silakan coba beberapa saat lagi",
                });
            } finally {
                this.btn = false
            }
        }
    },

    data() {

        return {
            nis: ref(null),
            siswa: ref(null),
            date: ref(null),
            btn: ref(false)
        };
    },
};
</script>
  
<style>
.bg-image {
    background-image: url("../assets/bg2.png");
    background-repeat: no-repeat;
    background-size: cover, contain;
}
</style>
  