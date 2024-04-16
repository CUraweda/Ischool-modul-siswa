<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-blue flex" style="height: 80px">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          {{ currentTime }} | {{ currentDate }}
        </q-toolbar-title>
        <q-img src="../assets/sade.png" style="width: 60px"></q-img>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div
        class="flex q-pl-md tw-cursor-pointer"
        style="margin-top: 10px; flex-direction: row"
        @click="directProfil"
      >
        <q-avatar class="" size="60px">
          <img
            src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
          />
        </q-avatar>

        <div class="q-pl-md">
          <div class="text-bold text-left">
            <p>{{ dataNama.name }}<br />Wali Murid</p>
          </div>
        </div>
      </div>
      <div class="q-pl-md q-pr-md">
        <q-select
          filled
          v-model="selectedStudent"
          :options="dataSiswa"
          label="Nama Siswa"
        />
      </div>
      <q-list padding class="menu-list">
        <q-item class="text-blue-4" clickable v-ripple to="/wali">
          <q-item-section avatar>
            <q-icon name="dashboard" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Dashboard
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/absen"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="update" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Presensi
          </q-item-section>
        </q-item>

        <q-item
          to="/wali/kkegiatan"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="event_available" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Kalender Kegiatan Semester
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/ppekanan"
          class="text-blue-4"
          active-class="text-orange bg-blue-1"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="calendar_month" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Panduan Pekanan
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/raport"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="summarize" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Raport Digital
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/tugas"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="assignment_add" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Tugas
          </q-item-section>
        </q-item>

        <q-item
          to="/wali/billing"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Billing Info
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/country"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="outlined_flag" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            One Day For Your Country
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/achievement"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="emoji_events" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Achievement
          </q-item-section>
        </q-item>
        <q-item
          to="/wali/cs"
          class="text-blue-4"
          active-class="text-orange"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="headset_mic" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Customer Care
          </q-item-section>
        </q-item>
      </q-list>
      <div class="text-center">
        <q-btn
          style="background: rgb(248, 87, 87); color: white; width: 90%"
          label="Logout"
          @click="logOut"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";

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
      dataNama: ref(JSON.parse(sessionStorage.getItem("data"))),
      dataSiswa: ref([]),
      selectedStudent: ref(null),
    };
  },

  mounted() {
    this.getDataSiswa();
    this.getCurrentDateTime();
    setInterval(() => {
      this.getCurrentDateTime();
    }, 60000);
  },

  methods: {
    directProfil() {
      this.$router.push("/wali/profil");
    },
    getCurrentDateTime() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      });
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
        confirmButtonText: "Yes, logout",
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          this.$router.push("/");
        }
      });
    },
    async getDataSiswa() {
      const idUser = sessionStorage.getItem("idUser");
      const token = sessionStorage.getItem("token");
      try {
        const response = await this.$api.get(
          `/user-access/show-by-user/${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        const siswaList = await Promise.all(
          data.map((Item) => {
            return {
              label: Item.student.nickname,
              value: Item.student.id,
            };
          })
        );
        this.dataSiswa = siswaList;
        const idSiswa = sessionStorage.getItem("idSiswa");
        const dataSelect = siswaList.find(
          (item) => item.value === parseInt(idSiswa)
        );
        if (!dataSelect) {
          sessionStorage.setItem("idSiswa", data[0].student.id);
          this.selectedStudent = siswaList[0];
        } else {
          sessionStorage.setItem("idSiswa", dataSelect.value);
          this.selectedStudent = dataSelect;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    selectedStudent(newVal) {
      const idSiswa = sessionStorage.getItem("idSiswa");
      if (parseInt(idSiswa) != newVal.value) {
        sessionStorage.setItem("newValue", JSON.stringify(newVal));
        sessionStorage.setItem("idSiswa", newVal.value);
        window.location.reload();
      }
    },
  },
};
</script>
