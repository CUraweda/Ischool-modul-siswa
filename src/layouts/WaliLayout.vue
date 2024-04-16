<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer v-model="drawer" show-if-above :width="350" :breakpoint="500" bordered>
      <!-- drawer content -->
      <br />
      <div class="row">
        <div class="col-md-5">
          <q-avatar class="q-pl-md" size="80px">
            <img src="../assets/sarrah.png">
          </q-avatar>
        </div>
        <div class="col-md-7">
          <div class="text-bold text-left">
            <p>CAHYADI BUDISATYA <br />SARRAH ADITYA NARESWARI <br />Kelas 3 D</p>
          </div>
        </div>
      </div>
      <br />
      <q-separator />
      <br /><br />
      <q-list padding class="menu-list">
        <q-item class="text-blue-4" clickable v-ripple to="/wali">
          <q-item-section avatar>
            <q-icon name="dashboard" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Dashboard
          </q-item-section>
        </q-item>
        <q-item to="/wali/kkegiatan" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="event_available" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Kalender Kegiatan
          </q-item-section>
        </q-item>
        <q-item to="/wali/absen" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="update" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Abesnsi
          </q-item-section>
        </q-item>

        <q-item to="/wali/lkegiatan" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="assignment_add" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Laporan Program dan Kegiatan
          </q-item-section>
        </q-item>

        <q-item to="/wali/raport" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="summarize" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Raport Digital
          </q-item-section>
        </q-item>

        <q-item to="/wali/billing" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Billing Info
          </q-item-section>
        </q-item>

        <q-item to="" class="text-blue-4" active-class="text-orange" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="headset_mic" style="font-size: 2rem" />
          </q-item-section>

          <q-item-section class="text-bold" style="font-size: 1rem">
            Customer Care
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      active: ref(true),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
