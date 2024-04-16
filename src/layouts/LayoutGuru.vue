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
            <div class="flex q-pl-md tw-cursor-pointer" style="margin-top: 10px;flex-direction: row;"
                @click="directProfil">
                <q-avatar class="" size="60px">
                    <img
                        src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg" />
                </q-avatar>
                <div class="q-pl-md">
                    <div class=" text-left">
                        <p class="text-bold text-h6">Nama Guru</p>

                    </div>
                </div>
            </div>
            <q-list padding class="menu-list">
                <q-item class="text-blue-4" clickable v-ripple to="/guru">
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>

                    <q-item-section class="text-bold">
                        Dashboard
                    </q-item-section>
                </q-item>
                <q-item to="/guru/jadwal-mengajar" class="text-blue-4" active-class="text-orange bg-blue-1" clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="backup_table" />
                    </q-item-section>

                    <q-item-section class="text-bold">
                        Jadwal Mengajar
                    </q-item-section>
                </q-item>
                <q-item to="/guru/agenda-kegiatan" class="text-blue-4" active-class="text-orange bg-blue-1" clickable
                    v-ripple>
                    <q-item-section avatar>
                        <q-icon name="task" />
                    </q-item-section>

                    <q-item-section class="text-bold">
                        Agenda Kegiatan
                    </q-item-section>
                </q-item>
                <div>
                    <q-item-section class="text-blue-4 text-bold " active-class="text-orange bg-blue-1">
                        <q-expansion-item icon="event_available" label="Kehadiran" class="tw-w-full">
                            <q-card>
                                <q-card-section>

                                    <q-item to="/guru/presensi" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Rekap Kehadiran
                                        </q-item-section>
                                    </q-item>
                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Pengajuan Cuti
                                        </q-item-section>
                                    </q-item>

                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-item-section>
                </div>

                <div>
                    <q-item-section class="text-blue-4 text-bold " active-class="text-orange bg-blue-1">
                        <q-expansion-item icon="group" label="Siswa" class="tw-w-full">
                            <q-card>
                                <q-card-section>

                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Administrasi
                                        </q-item-section>
                                    </q-item>
                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Presensi
                                        </q-item-section>
                                    </q-item>
                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>


                                        <q-item-section class="text-bold">
                                            Daftar Nilai
                                        </q-item-section>
                                    </q-item>

                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-item-section>
                </div>

                <div>
                    <q-item-section class="text-blue-4 text-bold " active-class="text-orange bg-blue-1">
                        <q-expansion-item icon="perm_identity" label="Guru" class="tw-w-full">
                            <q-card>
                                <q-card-section>

                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Administrasi
                                        </q-item-section>
                                    </q-item>
                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>


                                        <q-item-section class="text-bold">
                                            Bahan Ajar
                                        </q-item-section>
                                    </q-item>
                                    <q-item to="/guru/agenda-kegiatan" class="text-blue-4"
                                        active-class="text-orange bg-blue-1" clickable v-ripple>

                                        <q-item-section class="text-bold">
                                            Agenda Kegiatan
                                        </q-item-section>
                                    </q-item>

                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-item-section>
                </div>


                <q-item to="/guru/agenda-kegiatan" class="text-blue-4" active-class="text-orange bg-blue-1" clickable
                    v-ripple>
                    <q-item-section avatar>
                        <q-icon name="star" />
                    </q-item-section>

                    <q-item-section class="text-bold">
                        Pelatihan
                    </q-item-section>
                </q-item>
                <q-item to="/guru/agenda-kegiatan" class="text-blue-4" active-class="text-orange bg-blue-1" clickable
                    v-ripple>
                    <q-item-section avatar>
                        <q-icon name="forum" />
                    </q-item-section>

                    <q-item-section class="text-bold">
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
        directProfil() {
            this.$router.push("/siswa/profil")
        }
    },


};
</script>
