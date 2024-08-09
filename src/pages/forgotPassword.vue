<template>
  <div class="q-pa-md bg-image">
    <q-page class="vertical-middle tw-h-screen">
      <div class="flex justify-center items-center tw-w-full tw-h-full">
        <div class="col-8 flex justify-center items-center">
          <q-card style="width: 100%; height: auto">
            <q-card-section class="tw-w-full">
              <div class="flex">
                <!-- <div class="img col text-center bg-image2 flex justify-center">
                  <img
                    class="q-my-lg"
                    src="../assets/sade.png"
                    style="width: 10rem; height: 10rem"
                  />
                </div> -->
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
                        <q-icon name="lock" size="lg" /> Forgot Password <br />
                        <span class="text-blue-6" style="font-size: large"
                          >SEKOLAH ALAM DEPOK</span
                        >
                      </p>
                      <!-- <div class="text-center tw-my-10">
                        <q-img class="tw-w-32" src="../assets/lock2.png" />
                      </div> -->
                    </div>
                    <div class="flex tw-w-full justify-center items-center">
                      <div class="col flex justify-center">
                        <div
                          class="q-px-lg q-py-md h-[100px] w-full overflow-y-scroll"
                        >
                          <q-form
                            class="tw-w-full flex justify-center"
                            @submit.prevent="changePassword"
                          >
                            <q-input
                              v-model="newPassword"
                              class="text-center"
                              bottom-slots
                              filled
                              :type="showPassword ? 'text' : 'password'"
                              label="Password Baru"
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

                            <q-input
                              v-model="confirmPassword"
                              class="text-center"
                              bottom-slots
                              filled
                              :type="showConfirmPassword ? 'text' : 'password'"
                              label="Konfirmasi Password Baru"
                              style="width: 100%"
                            >
                              <template v-slot:prepend>
                                <q-icon name="key" />
                              </template>
                              <template v-slot:append>
                                <q-icon
                                  :name="
                                    showConfirmPassword
                                      ? 'visibility_off'
                                      : 'visibility'
                                  "
                                  class="cursor-pointer"
                                  @click="toggleShowConfirm"
                                />
                              </template>
                            </q-input>

                            <q-btn
                              type="submit"
                              color="blue-grey-6"
                              glossy
                              @click="changePassword"
                              label="Submit"
                              style="width: 100%"
                            />
                          </q-form>
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
import Swal from "sweetalert2";

export default {
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShowConfirm() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async changePassword() {
      if (this.newPassword != this.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password Tidak Sesuai",
        });
      } else {
        const data = {
          token: this.id,
          password: this.newPassword,
          confirm_password: this.confirmPassword,
        };
        try {
          const response = await this.$api.post(`/auth/reset-password/`, data);
          if (response.data.code != "200") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil!!",
              text: "Ganti Password berhasil",
            });
            this.$router.push("/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  data() {
    return {
      email: "",
      verificationCode: "",
      newPassword: "",
      id: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      currentStep: 0,
      submit: false,
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
