<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2" style="height: 87vh">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >ONE DAY FOR YOUR COUNTRY</span
                >
                <br />
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: 700px">
              <q-card-section>
                <div class="row">
                  <div class="col-md-6">
                    <div class="q-pa-md">
                      <!-- <div class="text-h6 text-left">Filter</div>
                      <q-select
                        dense
                        outlined
                        v-model="selectedActivity"
                        :options="activityOptions"
                        label=""
                        style="width: 50%"
                      /> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class=" text-right text-bold">
                      <br /><br />
                      <span style="font-size: large">
                        Target : <br />
                        {{ activity[0]?.forcountry.target }} Jam Pertahun
                      </span>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="">
                  <div
                    class=" text-left text-bold"
                    style="font-size: x-large"
                  >
                    Rekap
                  </div>
                  <q-markup-table separator="cell">
                    <thead>
                      <tr>
                        <th class="text-center" style="width: 10px">No</th>
                        <th class="text-center" style="width: 500px">
                          Aktivitas
                        </th>
                        <th class="text-center">Durasi</th>
                        <th class="text-center">Total Durasi</th>
                        <th class="text-center">Keterangan</th>
                        <th class="text-center" style="width: 100px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(activity, index) in activity"
                        :key="index"
                      >
                        <td class="text-center">{{ index + 1 }}</td>
                        <td class="text-left">{{ activity?.activity }}</td>
                        <td class="text-right">{{ activity?.duration }}</td>
                        <td class="text-right">{{ activity?.forcountry.target }}</td>
                        <td class="text-right">{{ activity?.remark }}</td>
                        <td class="text-right">
                          <q-btn color="secondary" label="Sertifikat" @click="downloadSertifikat('k')"/>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { ref} from "vue";

export default {
  data() {
    return {
      activity : ref([]),
      selectedActivity : ref([])
    }},
    methods: {
    async getDataCountry() {
      try {
        const id = sessionStorage.getItem("idUser")
        const token = sessionStorage.getItem("token")
        const response = await this.$api.get(`for-country-detail/show-by-user/${id}?academic=2023/2024`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        this.activity = response.data.data
        console.log(response.data.data);

      } catch (err) {
        console.log(err);
      }
    },
    async downloadSertifikat(path) {
      Swal.fire({
          title: "Sertifikat Belum Tersedia !",
          // text: "Refresh halaman atau hubungi admin",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.reload();
          }
        });
      // try {
      //   const response = await this.$api.get(`student-task/download?filepath=${path}`, {
      //     headers: {
      //       Authorization: `Bearer ${this.token}`,
      //     },
      //     responseType: 'blob',
      //   });
      //   const urlParts = path.split('/');
      //   const fileName = urlParts.pop();
      //   const blobUrl = window.URL.createObjectURL(response.data);
      //   const link = document.createElement('a');
      //   link.href = blobUrl;
      //   link.setAttribute('download', fileName);
      //   link.style.display = 'none'; 

      //   document.body.appendChild(link);
      //   link.click();
      //   link.remove();
      //   window.URL.revokeObjectURL(blobUrl);

      // } catch (error) {
      //   console.error('Error downloading file:', error);
      // }
    }

  },
  mounted() {
   this.getDataCountry()
  },  
};
</script>
