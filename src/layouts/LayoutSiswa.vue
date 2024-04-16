<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-white text-blue flex" style="height: 80px;">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                <q-toolbar-title>

                    {{ currentTime }} | {{ currentDate }}
                </q-toolbar-title>
                <q-img src="../assets/sade.png" style="width: 60px"></q-img>
            </q-toolbar>

        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <div class="flex q-pl-md tw-cursor-pointer" style="margin-top: 10px;flex-direction: row;" @click="directProfil">
                <q-avatar class="" size="60px">
                    <img src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg" />
                </q-avatar>
                <div class="q-pl-md">
                    <div class=" text-left">
                        <p class="text-bold">{{ nama }}</p>
                        <p>{{ nis }}</p>
                        <p> kelas {{ kelas }}</p>
                    </div>
                </div>
            </div>
            <q-list padding class="menu-list">
                <q-item class="text-blue-4" clickable v-ripple to="/siswa">
                    <q-item-section avatar>
                        <q-icon name="dashboard" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Dashboard
                    </q-item-section>
                </q-item>
                <q-item to="/siswa/absen" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="update" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Presensi
                    </q-item-section>
                </q-item>
                <q-item to="/siswa/kkegiatan" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="event_available" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Kalender Kegiatan Semester
                    </q-item-section>
                </q-item>
                <q-item to="/siswa/jkegiatan" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="calendar_month" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Jadwal Kegiatan
                    </q-item-section>
                </q-item>
                <q-item to="/siswa/tugas" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="assignment_add" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Tugas
                    </q-item-section>
                </q-item>
                <q-item to="/siswa/pbuku" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="auto_stories" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Peminjaman Buku
                    </q-item-section>
                </q-item>
              
                <q-item to="/siswa/raport" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="summarize" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Raport Digital
                    </q-item-section>
                </q-item>

                <q-item to="/siswa/bsampah" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="recycling" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Bank Sampah
                    </q-item-section>
                </q-item>
               
                <q-item to="/siswa/cs" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="headset_mic" style="font-size: 2rem" />
                    </q-item-section>

                    <q-item-section class="text-bold" style="font-size: 1rem">
                        Customer Care
                    </q-item-section>
                </q-item>
            </q-list>
            <div class="text-center">
                <q-btn style="background: rgb(248, 87, 87); color: white; width: 90%" label="Logout" @click="logOut" />
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from "vue";
import Swal from 'sweetalert2'
// import Vue from 'vue';
import moment from 'moment';

// Vue.prototype.$moment = moment;

export default {
    setup() {
        const leftDrawerOpen = ref(false);

        return {
            leftDrawerOpen,

            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
    data() {
        return {
            currentDate: "",
            currentTime: "",
            nama: ref(""),
            nis: ref(""),
            kelas: ref("")
        };
    },

    mounted() {
        this.getCurrentDateTime();
        setInterval(() => {
            this.getCurrentDateTime();
        }, 20000);

        this.getDataSiswa()

    },

    methods: {
        getCurrentDateTime() {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            const formattedTime = now.toLocaleTimeString('id-ID', { hour: 'numeric', minute: 'numeric' });
            this.currentDate = formattedDate;
            this.currentTime = formattedTime;
        },

        async logOut() {
            Swal.fire({
                title: "Log out?",
                text: "anda akan diarahkan ke halaman utama",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, logout"
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem("token");
                    this.$router.push("/");
                }
            });
        },

        async getDataSiswa() {
            const idUser = sessionStorage.getItem("idUser")
            const token = sessionStorage.getItem("token")
            try {
                const response = await this.$api.get(`/user-access/show-by-user/${idUser}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.nama = response.data.data[0].student.full_name
                this.nis = response.data.data[0].student.nis
                this.kelas = response.data.data[0].student.class
                const id = response.data.data[0].student.id
                const level = response.data.data[0].student.level
                sessionStorage.setItem('idSiswa', id)
                sessionStorage.setItem('level', level)

            } catch (error) {
                console.log(error);
            }
        },
        directProfil() {
            this.$router.push("/siswa/profil")
        }
    },


};
</script>
