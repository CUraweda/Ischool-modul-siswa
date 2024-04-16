<template>
  <div class="q-pa-md bg-image">
    <q-page class="vertical-middle tw-h-screen">
      <div class="flex justify-center items-center tw-w-full tw-h-full">
        <div class="col-8 flex justify-center items-center">

          <q-card style="width: 100%; height: auto">
            <q-card-section class="tw-w-full">
              <div class="row">
                <div class="img col-md col-12 text-center bg-image2">
                  <q-img class="q-my-lg" src="../assets/sade.png" style="width: 30%" />
                </div>
                <div class="flex col-md col-12 text-left tw-my-10" style="height: auto">
                  <div class="tw-w-full flex ">
                    <div class=" tw-w-full flex tw-flex-col justify-center items-center">
                      <p class="text-center text-blue-6 text-bold" style="font-size: x-large">
                        SISTEM INFORMASI SEKOLAH <br />
                        <span class="text-blue-6" style="font-size: large">SEKOLAH ALAM DEPOK</span>
                      </p>
                      <div class="text-center tw-my-10">
                        <q-img class="tw-w-32" src="../assets/lock2.png" />
                      </div>
                    </div>
                    <div class="flex tw-w-full justify-center items-center">

                      <div class="col flex justify-center">
                        <q-form @submit.prevent="registerUser" class="tw-w-full flex justify-center">
                          <q-input v-model="name" class="text-center " bottom-slots filled type="text"
                            label="Nama Lengkap" style="width: 70%">
                            <template v-slot:prepend>
                              <q-icon name="people" />
                            </template>
                          </q-input>
                          <q-input v-model="email" class="text-center " bottom-slots filled type="text" label="Email"
                            style="width: 70%">
                            <template v-slot:prepend>
                              <q-icon name="email" />
                            </template>
                          </q-input>
                          <q-input v-model="password" class="tw-w-full" bottom-slots filled type="password"
                            label="Password" style="width: 70%">
                            <template v-slot:prepend>
                              <q-icon name="key" />
                            </template>
                          </q-input>
                          <q-input v-model="rePassword" class="tw-w-full" bottom-slots filled type="password"
                            label="konfirmasi Password" style="width: 70%">
                            <template v-slot:prepend>
                              <q-icon name="key" />
                            </template>
                          </q-input>
                          <q-select v-model="model" :options="options" class="tw-w-full" filled label="Register Sebagai" style="width: 70%; margin-bottom: 20px;">
                            <template v-slot:prepend>
                              <q-icon name="people" />
                            </template>
                          </q-select>
                          
                          <q-btn type="submit" color="blue-grey-6" glossy label="Register" style="width: 70%" />
                        </q-form>
                        <div class="tw-mt-5 flex justify-center items-center">
                          <p>Sudah Punya akun?</p>
                          <q-btn flat style="color: #00ccff" label="Login" to="/login" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </q-page>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { ref } from 'vue'

export default {

  methods: {
    async registerUser() {
     
      const registerData = {
        full_name: this.name,  
        email: this.email,
        password: this.password,
        confirm_password: this.rePassword,
        role_id : this.model === 'Orang Tua' ? 8 : 7,

      };
     
      try {
        const response = await this.$api.post("/auth/register", registerData);
        const token = response.data.tokens.access.token
        const idUser = response.data.data.id
        const role = response.data.data.role_id
        const email = response.data.data.email

        sessionStorage.setItem("idUser", idUser)
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("role", role)
        sessionStorage.setItem("email", email )
        
        this.$router.push("/verifikasi")
       

      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registrasi Gagal, Silakan ulangi beberapa saat lagi",

        });
      }
    },
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      model: ref(null),
      options: [
        'Orang Tua', 'Siswa'
      ]
    };
  },
};
</script>

<style>
.bg-image {
  background-image: url("../assets/bg2.png");
  background-repeat: no-repeat;
  background-size: cover, contain;
}

.bg-image2 {
  background-image: url("../assets/sesi2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@media (max-width: 768px) {
  .img {
    display: none;
  }
}
</style>
