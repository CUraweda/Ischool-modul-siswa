<template>
  <div
    class="padding bg-image tw-h-screen flex tw-justify-center tw-overflow-auto"
  >
    <div
      class="bg-white tw-w-full flex tw-justify-center tw-items-center tw-py-5"
    >
      <div class="tw-w-full flex tw-flex-col tw-justify-center tw-items-center">
        <q-img
          class="q-my-lg img"
          src="../assets/sade.png"
          style="width: 10%"
        />
        <div class="tw-m-8">
          <p class="tw-text-xl tw-font-bold">Cari Data Orang Tua</p>
        </div>
        <q-form
          @submit.prevent="searchParent"
          class="tw-w-full flex justify-center tw-items-center q-pa-md tw-flex-col"
        >
          <q-input
            outlined
            bottom-slots
            v-model="inputFullName"
            label="Nama lengkap"
            class="input"
          />

          <!-- <q-input
            outlined
            v-model="dob"
            type="date"
            label="Tanggal lahir"
            class="input q-mb-sm"
          /> -->

          <q-btn type="submit" color="blue-grey-6" glossy label="Cari Data" />
        </q-form>
        <div
          v-if="dataParent"
          class="tw-flex tw-w-full tw-mt-5 justify-center tw-items-center tw-flex-col tw-gap-5"
        >
          <q-markup-table flat bordered class="q-mb-xl">
            <thead>
              <tr>
                <th class="text-left">Nama lengkap</th>
                <th class="text-left">{{ dataParent?.name ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Status</th>
                <th class="text-left">{{ dataParent?.parent_type ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Kewarganegaraan</th>
                <th class="text-left">{{ dataParent?.nationality ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Agama</th>
                <th class="text-left">{{ dataParent?.religion ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Alamat</th>
                <th class="text-left">{{ dataParent?.address ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Lokasi Koordinat</th>
                <th class="text-left">
                  {{
                    `${dataParent?.latitude ?? "-"},${
                      dataParent?.longitude ?? "-"
                    }`
                  }}
                </th>
              </tr>
              <tr>
                <th class="text-left">Telepon</th>
                <th class="text-left">{{ dataParent?.phone ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Email</th>
                <th class="text-left">{{ dataParent?.email ?? "-" }}</th>
              </tr>
              <tr>
                <th class="text-left">Pekerjaan</th>
                <th class="text-left">
                  {{ dataParent?.field_of_work ?? "-" }}
                </th>
              </tr>
              <tr>
                <th class="text-left">Pendidikan terakhir</th>
                <th class="text-left">
                  {{ dataParent?.last_education ?? "-" }}
                </th>
              </tr>
            </thead>
          </q-markup-table>
          <q-btn
            @click="confirmAttachUser"
            :disable="isBtnConfirmDisable"
            type="submit"
            color="green-6"
            glossy
            label="Tautkan Data"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  setup() {
    return {
      token: sessionStorage.getItem("token"),
      roleId: sessionStorage.getItem("role"),
      userId: sessionStorage.getItem("idUser"),
    };
  },
  data() {
    return {
      inputFullName: ref(""),
      dataParent: ref(null),
      isBtnConfirmDisable: ref(null),
      // dob: ref(""),
    };
  },
  methods: {
    async searchParent() {
      const name = this.inputFullName;
      try {
        const response = await this.$api.get(`/parent/show-by-name/${name}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.dataParent = response.data?.data ?? null;
      } catch (error) {
        if (error?.response?.status == 404)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Data Orang Tua Tidak Ditemukan",
          });
        else
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal Mencari Orang Tua, silakan coba beberapa saat lagi",
          });
      }
    },
    confirmAttachUser() {
      Swal.fire({
        title: "Anda Yakin?",
        text: `Tautkan akun anda dengan ${this.dataParent?.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tautkan Sekarang",
      }).then((result) => {
        if (result.isConfirmed) {
          this.attachUser();
        }
      });
    },
    async attachUser() {
      this.isBtnConfirmDisable = true;

      try {
        const response = await this.$api.put(
          `/parent/attach-user/${this.dataParent?.id ?? ""}`,
          {
            user_id: this.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        Swal.fire({
          title: "Success!",
          text: `akun anda telah tertaut dengan data Orang Tua ${this.dataParent?.name}`,
          icon: "success",
        });

        this.$router.push("/wali/profil");
      } catch (error) {
        if (
          error.response?.status == 400 &&
          error.response?.data?.message?.includes("already linked")
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Profil orang tua sudah ditautkan dengan akun lain",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal menautkan data, silakan coba beberapa saat lagi",
          });
        }
      } finally {
        this.isBtnConfirmDisable = false;
      }
    },
  },
};
</script>

<style>
.padding {
  padding: 100px;
}

.input {
  width: 50%;
}
.bg-image {
  background-image: url("../assets/bg2.png");
  background-repeat: no-repeat;
  background-size: cover, contain;
}

.img {
  width: 10%;
}

@media (max-width: 768px) {
  .img {
    width: 50%;
  }

  .padding {
    padding: 0px;
  }
  .input {
    width: 100%;
  }
}
</style>
