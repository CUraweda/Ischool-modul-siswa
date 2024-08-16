<template>
  <div class="flex tw-p-10 tw-h-full bg-blue-2">
    <q-card class="tw-w-full tw-p-10">
      <div
        style="
          background: url('https://t3.ftcdn.net/jpg/02/77/30/98/360_F_277309825_h8RvZkoyBGPDocMtippdfe3497xTrOXO.jpg');
          background-size: cover;
        "
      >
        <div
          class="flex justify-start tw-flex-col items-center tw-p-5"
          style="
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <q-avatar size="100px">
            <img
              src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
            />
          </q-avatar>
          <div class="flex tw-flex-col items-center">
            <p class="text-h4 tw-mt-3 text-bold text-white">
              {{ dataUser?.full_name }}
            </p>
            <div class="tw-w-full bg-blue" style="height: 5px" />
          </div>
        </div>
      </div>

      <div class="tw-mt-10">
        <div class="flex justify-between q-mb-md">
          <p class="text-bold text-h5 tw-mb-5">Data Pengguna</p>
          <q-btn
            style="height: 35px"
            color="secondary"
            label="Edit Password"
            @click="modalEditPassword = true"
          />
        </div>
        <q-markup-table class="tw-w-full">
          <thead>
            <tr>
              <th class="text-left">Nama</th>
              <th class="text-left">{{ dataUser?.full_name }}</th>
            </tr>
            <tr>
              <th class="text-left">Email</th>
              <th class="text-left">{{ dataUser?.email }}</th>
            </tr>
            <tr>
              <th class="text-left">Role</th>
              <th class="text-left">{{ dataUser?.role.name }}</th>
            </tr>
            <tr>
              <th class="text-left">Status</th>
              <th class="text-left">
                <q-chip
                  outline
                  color="teal"
                  text-color="white"
                  icon="verified_user"
                >
                  {{ dataUser?.status === 1 ? "Verified" : "Not Verified" }}
                </q-chip>
              </th>
            </tr>
          </thead>
        </q-markup-table>
        <q-separator />
        <p class="text-bold text-h5 tw-mb-5 tw-mt-10">Data Siswa</p>
        <q-markup-table class="tw-w-full">
          <thead>
            <tr>
              <th class="text-left">Nama Lengkap</th>
              <th class="text-left">{{ dataSiswa?.full_name }}</th>
            </tr>
            <tr>
              <th class="text-left">Nomor Induk Siswa</th>
              <th class="text-left">{{ dataSiswa?.nis }}</th>
            </tr>
            <tr>
              <th class="text-left">Nomor Induk Siswa Nasional</th>
              <th class="text-left">{{ dataSiswa?.nisn }}</th>
            </tr>
            <tr>
              <th class="text-left">Jenis Kelamin</th>
              <th class="text-left">{{ dataSiswa?.gender }}</th>
            </tr>
            <tr>
              <th class="text-left">Tempat Lahir</th>
              <th class="text-left">{{ dataSiswa?.pob }}</th>
            </tr>
            <tr>
              <th class="text-left">Tanggal Lahir</th>
              <th class="text-left">{{ getDateTime(dataSiswa?.dob) }}</th>
            </tr>
            <tr>
              <th class="text-left">Alamat</th>
              <th class="text-left">{{ dataSiswa?.address }}</th>
            </tr>
            <tr>
              <th class="text-left">Kelas</th>
              <th class="text-left">{{ dataSiswa?.class }}</th>
            </tr>
          </thead>
        </q-markup-table>
      </div>
    </q-card>

    <q-dialog
      v-model="modalEditPassword"
      @hide="getDataParent"
      persistent
      backdrop-filter="blur(4px)"
    >
      <q-card style="width: 540px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Edit Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="old_password"
            outlined
            :type="showPassword ? 'password' : 'text'"
            label="Password Lama"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="toggleShow"
              /> </template
          ></q-input>
          <q-input
            v-model="new_password"
            outlined
            :type="showPasswordnew ? 'password' : 'text'"
            label="Password Baru"
            class="q-mb-md"
            ><template v-slot:append>
              <q-icon
                :name="showPasswordnew ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="toggleShowNew"
              />
            </template>
          </q-input>
          <q-input
            v-model="password_match"
            outlined
            :type="showPasswordconfirm ? 'password' : 'text'"
            label="Konfirmasi Password Baru"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="toggleShowConfirm"
              /> </template
          ></q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn outline label="Batal" v-close-popup />
          <q-btn
            @click="checkPasswordsMatch(new_password, password_match)"
            unelevated
            color="primary"
            label="Simpan"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import { Notify } from "quasar";

export default {
  data() {
    return {
      showPassword: ref(true),
      showPasswordnew: ref(true),
      showPasswordconfirm: ref(true),
      dataUser: ref(),
      dataSiswa: ref(),
      old_password: ref(),
      new_password: ref(),
      password_match: ref(),
    };
  },

  setup() {
    return {
      modalEditPassword: ref(false),
      token: ref(sessionStorage.getItem("token")),
      idUser: ref(sessionStorage.getItem("idUser")),
    };
  },

  mounted() {
    this.getDataSiswa();
  },

  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowNew() {
      this.showPasswordnew = !this.showPasswordnew;
    },
    toggleShowConfirm() {
      this.showPasswordconfirm = !this.showPasswordconfirm;
    },
    async checkPasswordsMatch(new_password, password_match) {
      if (new_password !== password_match) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password tidak sama!",
        });
        this.modalEditPassword = false;
        (this.old_password = null),
          (this.new_password = null),
          (this.password_match = null);
        return false;
      }
      this.editDataPassword();
    },

    async editDataPassword() {
      let payload = {
        old_password: this.old_password,
        password: this.new_password,
        confirm_password: this.password_match,
      };

      const token = sessionStorage.getItem("token");

      const missingData = [];
      for (const key in payload) {
        if (!payload[key]) {
          missingData.push(key);
        }
      }

      if (missingData.length > 0) {
        // Show popup with missing data
        Notify.create({
          position: "top",
          color: "negative",
          message: `Tolong isi data ${missingData.join(", ")}`,
        });
      } else {
        try {
          const res = await this.$api.put(`/user/change-password`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          this.modalEditPassword = false;
          (this.old_password = null),
            (this.new_password = null),
            (this.password_match = null);
          Swal.fire({
            icon: "success",
            title: "Aksi Berhasil",
            text: "Berhasil memperbarui data",
          });
        } catch (error) {
          console.log(error);
          if (error.response?.status == 400)
            Notify.create({
              position: "top",
              color: "negative",
              message: "Periksa kembali input Anda",
            });
          else
            Notify.create({
              position: "top",
              color: "negative",
              message: "Gagal untuk memperbarui data",
            });
        }
      }
    },

    getDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
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
        console.log(response);

        this.dataSiswa = response.data.data[0].student;
        this.dataUser = response.data.data[0].user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
