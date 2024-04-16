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
                            {{`Akun anda ${status} di verifikasi, Silakang ${status == 'gagal' ? 'Hubungi Admin Sekolah Alam Depok' : 'Login untuk mengakses akun anda'}`}} 
                        </p>
                        <div style="margin-top: 5%;">
                            <q-btn color="primary" label="Login" to="/login" :disable="status == 'gagal'"/>
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
     id : ref(window.location.href.split("/")[4]),
     status: ref('berhasil')
    }
  },
  methods: {
    async VerifEmail() {
        try {
            const response = await this.$api.post(`auth/verify-email/${this.id}`,);
            if(response){
                this.status = 'berhasil'
            }
        } catch (error) {
            console.log(error);
            this.status = 'gagal'
        }
    },
},
mounted() {
    this.VerifEmail()
}

}
</script>
