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

        <div class="flex justify-between q-mb-md">
          <p class="text-bold text-h5">Data Orang Tua</p>
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
              <th class="text-left">Prioritas komunikasi</th>
              <th class="text-left">{{ dataParent?.com_priority ?? "-" }}</th>
            </tr>
            <tr>
              <th class="text-left">Pekerjaan</th>
              <th class="text-left">{{ dataParent?.field_of_work ?? "-" }}</th>
            </tr>
            <tr>
              <th class="text-left">Gaji</th>
              <th class="text-left">{{ dataParent?.salary ?? "-" }}</th>
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
  </div>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import { data } from "autoprefixer";

export default {
  data() {
    return {
      dataUser: ref(),
      dataSiswa: ref([]),
      dataParent: ref(null),
    };
  },
  setup() {
    return {
      token: ref(sessionStorage.getItem("token")),
      idUser: ref(sessionStorage.getItem("idUser")),
    };
  },
  mounted() {
    this.getDataSiswa();
    this.getDataParent();
  },
  methods: {
    async getDataParent() {
      try {
        this.dataParent = null;

        const res = await this.$api.get(
          `/parent/show-by-userid/${this.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.dataParent = res.data?.data ?? null;
      } catch (error) {
        console.log(error);
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
