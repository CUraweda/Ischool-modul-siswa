const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/login",
        component: () => import("pages/login.vue"),
      },
      {
        path: "/registrasi",
        component: () => import("pages/registrasi.vue"),
      },
      {
        path: "/search-siswa",
        component: () => import("pages/SearchSiswa.vue"),
      },
      {
        path: "/verifikasi",
        component: () => import("pages/verifEmail.vue"),
      },
      {
        path: "/verifikasi/:id",
        component: () => import("pages/verifEmailBerhasil.vue"),
      },
    ],
  },
  {
    path: "/siswa",
    component: () => import("layouts/LayoutSiswa.vue"),
    children: [
      {
        path: "/siswa",
        component: () => import("pages/siswa/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/raport",
        component: () => import("pages/siswa/raport.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/tugas",
        component: () => import("pages/siswa/tugas.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/absen",
        component: () => import("pages/siswa/absen.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/bsampah",
        component: () => import("pages/siswa/b_sampah.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/kkegiatan",
        component: () => import("pages/siswa/k_kegiatan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/jkegiatan",
        component: () => import("pages/siswa/j_kegiatan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/pbuku",
        component: () => import("pages/siswa/p_buku.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/cs",
        component: () => import("pages/siswa/customer_care.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/siswa/profil",
        component: () => import("pages/siswa/profil.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/wali",
    component: () => import("layouts/LayoutWali.vue"),
    children: [
      {
        path: "/wali",
        component: () => import("pages/wali/dashboard.vue"),
      },
      {
        path: "/wali/profil",
        component: () => import("pages/wali/profil.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/wali/absen",
        component: () => import("pages/wali/absen.vue"),
      },
      {
        path: "/wali/raport",
        component: () => import("pages/wali/raport.vue"),
      },
      {
        path: "/wali/billing",
        component: () => import("pages/wali/billing.vue"),
      },
      {
        path: "/wali/kkegiatan",
        component: () => import("pages/wali/k_kegiatan.vue"),
      },
      {
        path: "/wali/lkegiatan",
        component: () => import("pages/wali/l_kegiatan.vue"),
      },
      {
        path: "/wali/country",
        component: () => import("pages/wali/country.vue"),
      },
      {
        path: "/wali/tugas",
        component: () => import("pages/wali/tugas.vue"),
      },
      {
        path: "/wali/ppekanan",
        component: () => import("pages/wali/p_pekanan.vue"),
      },
      {
        path: "/wali/achievement",
        component: () => import("pages/wali/archivement.vue"),
      },
      {
        path: "/wali/cs",
        component: () => import("pages/wali/customer_care.vue"),
      },
      
    ],
  },
  {
    path: "/guru",
    component: () => import("layouts/LayoutGuru.vue"),
    children: [
      {
        path: "/guru",
        component: () => import("pages/guru/IndexPage.vue"),
      },
      {
        path: "/guru/agenda-kegiatan",
        component: () => import("pages/guru/agendaKegiatan.vue"),
      },
      {
        path: "/guru/jadwal-mengajar",
        component: () => import("pages/guru/jadwalMengajar.vue"),
      },
      {
        path: "/guru/presensi",
        component: () => import("pages/guru/presensi.vue"),
      },
      
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
