<template>
    <div class="q-pa-md">
        <q-page class="vertical-middle tw-h-screen">
            <div class="tw-w-full tw-h-screen flex tw-justify-center tw-items-center ">
                <div class="tw-w-5/6 tw-h-full bg-white flex tw-flex-row tw-justify-center tw-items-center">
                    
                    <div class="tw-h-full tw-w-5/6 text-center tw-flex-col tw-items-center q-pa-md">
                        <q-img class="q-my-lg" src="../assets/sade.png" style="width: 10%" />
                        <p class="text-h4 text-bold">Verifikasi Email</p>
                        <q-separator style="width: 100%; margin-top: 10px; margin-bottom: 20px;" color="blue" />
                        <p class="text-h6 text-center">
                            {{`Tautan verifikasi akun telah dikirimkan ke alamat Email ${email} silakan cek email anda, periksa juga folder spam apabila email tidak muncul di home`}}
                        </p>
                       
                        <div style="margin-top: 5%;">
                            <q-btn color="primary" label="Back to home" to="/"/>
                        </div>
                       
                    </div>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  
  setup() {
    return {
     email : ref(sessionStorage.getItem("email"))
    }
  },

}
</script>
