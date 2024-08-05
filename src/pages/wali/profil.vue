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
          <p class="text-bold text-h5">Data Pengguna</p>

          <q-btn
            color="secondary"
            label="Edit Password"
            @click="modalEditPassword = true"
          />
        </div>

        <q-markup-table flat bordered class="q-mb-xl">
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
                <q-chip outline color="teal" text-color="white" icon="verified_user">
                  {{ dataUser?.status === 1 ? "Verified" : "Not Verified" }}
                </q-chip>
              </th>
            </tr>
          </thead>
        </q-markup-table>

        <div class="flex justify-between q-mb-md">
          <p class="text-bold text-h5">Data Orang Tua</p>
          <q-btn
            v-if="dataParent != null"
            color="secondary"
            label="Edit"
            @click="modalEditParent = true"
          />
          <q-btn
            v-if="!dataParent"
            color="secondary"
            label="Tautkan"
            @click="$router.push('/search-parent')"
          />
        </div>

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
              <th class="text-left">Lokasi koordinat</th>
              <th class="text-left">
                {{ `${dataParent?.latitude ?? "-"},${dataParent?.longitude ?? "-"}` }}
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
              <th class="text-left">{{ dataParent?.field_of_work ?? "-" }}</th>
            </tr>
            <tr>
              <th class="text-left">Pendidikan terakhir</th>
              <th class="text-left">{{ dataParent?.last_education ?? "-" }}</th>
            </tr>
          </thead>
        </q-markup-table>

        <div class="flex justify-between q-mb-md">
          <p class="text-bold text-h5">Data Anak</p>
          <q-btn
            color="secondary"
            label="Tambah Siswa"
            @click="$router.push('/search-siswa')"
          />
        </div>

        <q-markup-table flat bordered>
          <thead>
            <tr>
              <th class="text-left">No</th>
              <th class="text-left">Nama</th>
              <th class="text-left">Kelas</th>
              <th class="text-left">Level</th>
              <th class="text-left">NIS</th>
              <th class="text-left">NISN</th>
              <th class="text-left">Tanggal Lahir</th>
              <th class="text-left">Gender</th>
              <th class="text-left">Alamat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataSiswa" :key="index">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ item?.student.full_name }}</td>
              <td class="text-left">{{ item?.student.class }}</td>
              <td class="text-left">{{ item?.student.level }}</td>
              <td class="text-left">{{ item?.student.nis }}</td>
              <td class="text-left">{{ item?.student.nisn }}</td>
              <td class="text-left">{{ getDateTime(item?.student.dob) }}</td>
              <td class="text-left">{{ item?.student.gender }}</td>
              <td class="text-left">{{ item?.student.address }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
    <q-dialog
      v-model="modalEditParent"
      @hide="getDataParent"
      persistent
      backdrop-filter="blur(4px)"
    >
      <q-card style="width: 540px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Edit Profil</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="dataParent.name"
            outlined
            label="Nama lengkap"
            class="q-mb-md"
          />
          <q-select
            v-model="dataParent.status"
            :options="optStatus"
            outlined
            label="Status"
            class="q-mb-md"
          />
          <q-select
            v-model="dataParent.nationality"
            :options="optNationality"
            outlined
            label="Kewarganegaraan"
            class="q-mb-md"
          />
          <q-select
            v-model="dataParent.religion"
            :options="optReligion"
            outlined
            label="Agama"
            class="q-mb-md"
          />
          <q-input
            v-model="dataParent.address"
            outlined
            type="textarea"
            label="Alamat"
            class="q-mb-md"
          />
          <div class="row q-mb-md q-gutter-md">
            <q-input
              v-model="dataParent.latitude"
              outlined
              label="Latitude"
              class="q-mb-md"
            />
            <q-input
              v-model="dataParent.longitude"
              outlined
              label="Longitude"
              class="q-mb-md"
            />
            <q-btn
              padding="sm lg"
              class="q-mb-md"
              color="secondary"
              icon="my_location"
              @click="getLocation()"
            />
          </div>
          <div class="tw-bg-gray-200 q-mb-md" border="sm">
            <LoadingSpiner v-if="loading" />
            <LocationMap
              v-if="!loading && dataParent.latitude && dataParent.longitude"
              :latitude="dataParent.latitude"
              :longitude="dataParent.longitude"
              :loading="loading"
            />
          </div>
          <q-input v-model="dataParent.phone" outlined label="Telepon" class="q-mb-md" />
          <q-input
            outlined
            v-model="dataParent.email"
            type="email"
            label="Email"
            class="q-mb-md"
          />
          <q-input
            v-model="dataParent.field_of_work"
            outlined
            label="Pekerjaan"
            class="q-mb-md"
          />
          <q-select
            v-model="dataParent.last_education"
            :options="optEducation"
            outlined
            label="Pendidikan terakhir"
            class="q-mb-md"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn outline label="Batal" v-close-popup />
          <q-btn @click="editDataParent" unelevated color="primary" label="Simpan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
            label="Password Lama"
            class="q-mb-md"
          />
          <q-input
            v-model="new_password"
            outlined
            label="Password Baru"
            class="q-mb-md"
          />
          <q-input
            v-model="password_match"
            outlined
            label="Konfirmasi Password Baru"
            class="q-mb-md"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn outline label="Batal" v-close-popup />
          <q-btn @click="checkPasswordsMatch(new_password, password_match)" unelevated color="primary" label="Simpan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import { data } from "autoprefixer";
import { Notify } from "quasar";
import { defineComponent } from "vue";
import LocationMap from "../../components/LocationMap.vue";
import LoadingSpiner from "../../components/LoadingSpiner.vue";

export default {
  components: {
    LocationMap,
    LoadingSpiner,
  },

  data() {
    return {
      old_password: ref(),
      new_password: ref(),
      password_match: ref(),
      dataUser: ref(),
      dataSiswa: ref([]),
      dataParent: ref(null),
      optStatus: ["Ayah", "Ibu"],
      optNationality: ["WNI", "WNA"],
      optReligion: ["Islam", "Kristen", "Protestan", "Hindu", "Buddha", "Kong Hu Cu"],
      optEducation: ["TK", "SD", "SMP", "SMA", "SMK", "MA", "S1", "S2", "S3"],
      loading: ref(false),
    };
  },
  setup() {
    return {
      modalEditParent: ref(false),
      modalEditPassword: ref(false),
      token: ref(sessionStorage.getItem("token")),
      idUser: ref(sessionStorage.getItem("idUser")),
    };
  },
  
  mounted() {
    this.getDataSiswa();
    this.getDataParent();
  },
  methods: {
    async getLocation() {
      try {
        this.loading = true;
        const position = await new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            reject(new Error("Geolocation is not supported by this browser."));
          }
        });

        this.dataParent.latitude = position.coords.latitude;
        this.dataParent.longitude = position.coords.longitude;
        this.loading = false;

        Notify.create({
          type: "positive",
          message: "Location data has been filled!",
        });
      } catch (error) {
        this.loading = false;
        Notify.create({
          type: "negative",
          message: "Failed to get location!",
        });
      }
    },

    async getDataParent() {
      try {
        this.dataParent = null;

        const res = await this.$api.get(`/parent/show-by-userid/${this.idUser}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.dataParent = res.data?.data ?? null;
        this.dataParent.status = res.data?.data.parent_type ?? null;
      } catch (error) {
        console.log(error);
      }
    },

    async editDataParent() {
      const {
        name,
        status,
        nationality,
        religion,
        address,
        phone,
        email,
        field_of_work,
        last_education,
        latitude,
        longitude,
      } = this.dataParent;

      let payload = {
        name,
        nationality,
        religion,
        address,
        phone,
        email,
        field_of_work,
        last_education,
        latitude,
        longitude,
      };

      payload.parent_type = status;
      console.log("🚀 ~ editDataParent ~ payload.parent_type:", payload.parent_type);

      // Check for missing data
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
          const res = await this.$api.put(`/parent/update/me`, payload, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          this.modalEditParent = false;
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

    async checkPasswordsMatch(new_password, password_match) {
      if (new_password !== password_match) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords tidak sama!",
        });
        this.modalEditPassword = false;
        this.old_password = null, this.new_password = null, this.password_match = null;
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

      // payload.parent_type = status;
      // console.log("🚀 ~ editDataParent ~ payload.parent_type:", payload.parent_type)

      // Check for missing data
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
              Authorization: `Bearer ${this.token}`,
            },
          });

          this.modalEditPassword = false;
          this.old_password = null, this.new_password = null, this.password_match = null;
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
        const response = await this.$api.get(`/user-access/show-by-user/${idUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);

        this.dataSiswa = response.data.data;
        this.dataUser = response.data.data[0].user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
