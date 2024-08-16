<template>
  <div class="q-pa-md bg-image">
    <q-page class="vertical-middle tw-h-screen">
      <div class="flex justify-center items-center tw-w-full tw-h-full">
        <div class="col-8 flex justify-center items-center">
          <q-card style="width: 100%; height: auto">
            <q-card-section class="tw-w-full">
              <div class="flex">
                <div class="img col text-center bg-image2 flex justify-center">
                  <img
                    class="q-my-lg"
                    src="../assets/sade.png"
                    style="width: 10rem; height: 10rem"
                  />
                </div>
                <div
                  class="flex col-md col-12 text-left tw-my-10"
                  style="height: auto"
                >
                  <div class="tw-w-full flex">
                    <div
                      class="tw-w-full flex tw-flex-col justify-center items-center"
                    >
                      <p
                        class="text-center text-blue-6 text-bold"
                        style="font-size: x-large"
                      >
                        SISTEM INFORMASI SEKOLAH <br />
                        <span class="text-blue-6" style="font-size: large"
                          >SEKOLAH ALAM DEPOK</span
                        >
                      </p>
                      <div class="text-center tw-my-10">
                        <q-img class="tw-w-32" src="../assets/lock2.png" />
                      </div>
                    </div>
                    <div class="flex tw-w-full justify-center items-center">
                      <div class="col flex justify-center">
                        <q-form
                          @submit.prevent="loginUser"
                          class="tw-w-full flex justify-center"
                        >
                          <q-input
                            v-model="email"
                            class="text-center"
                            bottom-slots
                            filled
                            type="text"
                            label="Username/Email"
                            style="width: 70%"
                          >
                            <template v-slot:prepend>
                              <q-icon name="email" />
                            </template>
                          </q-input>

                          <div class="block w-full" style="width: 70%">
                            <q-input
                              v-model="password"
                              class="text-center"
                              bottom-slots
                              filled
                              :type="showPassword ? 'text' : 'password'"
                              label="Password"
                              style="width: 100%"
                            >
                              <template v-slot:prepend>
                                <q-icon name="key" />
                              </template>
                              <template v-slot:append>
                                <q-icon
                                  :name="
                                    showPassword
                                      ? 'visibility_off'
                                      : 'visibility'
                                  "
                                  class="cursor-pointer"
                                  @click="toggleShow"
                                />
                              </template>
                            </q-input>
                            <div class="flex items-end">
                              <q-btn
                                size="sm"
                                label="Lupa Password?"
                                style="color: #00ccff"
                                flat
                                @click="alert = true"
                              />
                            </div>
                          </div>

                          <q-btn
                            type="submit"
                            color="blue-grey-6"
                            glossy
                            label="Login"
                            :disable="submit"
                            style="width: 70%"
                          />
                        </q-form>
                        <div class="tw-mt-5 flex justify-center items-center">
                          <p>Belum Punya akun?</p>
                          <q-btn
                            flat
                            style="color: #00ccff"
                            label="Registrasi"
                            to="/registrasi"
                          />
                        </div>
                      </div>
                    </div>

                    <q-dialog v-model="alert">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Lupa Password</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <q-input
                            v-model="emailforgot"
                            class="text-center"
                            bottom-slots
                            filled
                            type="text"
                            label="Masukan Email"
                            style="width: 100%; min-width: 300px"
                          >
                            <template v-slot:prepend>
                              <q-icon name="email" />
                            </template>
                          </q-input>
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn
                            flat
                            label="Kirim"
                            color="primary"
                            v-close-popup
                            @click="forgotPassword"
                          />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
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
import Swal from "sweetalert2";

export default {
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    async loginUser() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      try {
        this.submit = true;
        const response = await this.$api.post("/auth/login", loginData);
        const verif = response.data.data.email_verified;
        const id = response.data.data.id;

        if (verif == 1) {
          const token = response.data.tokens.access.token;
          const name = response.data.data.full_name;
          const role = response.data.data.role_id;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("idUser", id);

          const data = {
            id,
            token,
            role,
            name,
          };

          sessionStorage.setItem("data", JSON.stringify(data));
          this.getUserAccess(data);
        } else {
          this.$router.push("/verifikasi");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email atau Password salah!",
        });
      } finally {
        this.submit = false;
      }
    },
    async forgotPassword() {
      const forgotData = {
        email: this.emailforgot,
      };
      try {
        const response = await this.$api.post(
          "/auth/forgot-password",
          forgotData
        );
        if (!response.ok) return Error("Gagal mengirimkan email");
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Konfirmasi password akan diinformasikan di email terkait",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getUserAccess(data) {
      const idCust = data.id;
      const token = data.token;
      const role = data.role;
      try {
        const response = await this.$api.get(
          `/user-access/show-by-user/${idCust}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;

        if (data.length === 0) {
          this.$router.push("/search-siswa");
        } else {
          role === 7
            ? this.$router.push("/siswa")
            : role === 8
            ? this.$router.push("/wali")
            : "";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      submit: false,
      alert: false,
      emailforgot: "",
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
  background-size: cover;
}

@media (max-width: 768px) {
  .img {
    display: none;
  }
}
</style>
