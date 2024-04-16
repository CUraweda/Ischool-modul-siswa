<template>
    <div class="container">
      <!-- <NavbarSiswa /> -->
      <div>
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">Customer Care</span>
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: 76vh" class="flex">
            
              <div class="colom_chat tw-w-full">
                <q-card-section
                  style="width: 100%;   background-image: url(https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg);">
                  <div class="bg-white q-pa-md">
                    <p class="text-bold text-h5">
                      Nama
                    </p>
  
                  </div>
                  <q-scroll-area style="height: 58vh" class="q-pa-sm">
                    <div class="q-pa-md" rounded style="
                      height: 100%;   
                      display: flex;
                      flex-direction: column;
                      justify-content: end;
                      
                    ">
                      <div ref="scrollTargetRef" class="q-pa-md" style="max-height: 100%; overflow: auto">
                        <q-infinite-scroll @load="onLoadRef" :scroll-target="scrollTargetRef">
                          <div class="q-pa-md row" style="height: 100%">
                            <div style="width: 100%; height: 100%;" class="text-left" v-for="message in messages" :key="message.id">
                              <q-chat-message name="me" :text="[
                                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ',
                              ]" stamp="7 minutes ago" sent bg-color="amber-7" />
                              <!-- <q-chat-message name="Jane" :text="[
                                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ',
                              ]" stamp="4 minutes ago" text-color="white" bg-color="primary" /> -->
                             
                            </div>
                          </div>
                        </q-infinite-scroll>
                      </div>
                    </div>
                  </q-scroll-area>
                  <div class="flex justify-center items-center">
                    <div class="tw-w-5/6 flex justify-start">
                      <q-input rounded outlined v-model="text" class="input bg-white tw-w-full" placeholder="Type Here" />
                    </div>
                    <div class="tw-w-1/6 flex tw-pl-2">
                      <q-btn round color="green" icon="send" />
                    </div>
  
                  </div>
                </q-card-section>
              </div>
  
            </q-card>
          </q-card-section>
        </div>
      </div>
  
    </div>
  
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Kirim Pesan</div>
        </q-card-section>
  
        <q-card-section class="q-pt-none">
          <q-card class="tw-m-1 tw-cursor-pointer">
            <div class="flex justify-start items-center q-pa-md">
              <div class="tw-w-1/6">
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
              </div>
              <div class="flex tw-flex-col justify-start items-start q-pl-md tw-w-5/6">
                <p class="text-bold text-h6"> nama</p>
              </div>
  
            </div>
          </q-card>
          <q-card class="tw-m-1 tw-cursor-pointer">
            <div class="flex justify-start items-center q-pa-md">
              <div class="tw-w-1/6">
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
              </div>
              <div class="flex tw-flex-col justify-start items-start q-pl-md tw-w-5/6">
                <p class="text-bold text-h6"> nama</p>
              </div>
  
            </div>
          </q-card>
          <q-card class="tw-m-1 tw-cursor-pointer">
            <div class="flex justify-start items-center q-pa-md">
              <div class="tw-w-1/6">
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
              </div>
              <div class="flex tw-flex-col justify-start items-start q-pl-md tw-w-5/6">
                <p class="text-bold text-h6"> nama</p>
              </div>
  
            </div>
          </q-card>
        </q-card-section>
  
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cencel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
  import { ref } from 'vue'
  import Swal from 'sweetalert2';
  
  export default {
    components: {
      NavbarSiswa,
    },
    setup() {
      return {
        medium: ref(false),
        messages: ref([]),
        token: ref(sessionStorage.getItem("token")),
        idSiswa: ref(sessionStorage.getItem("idSiswa")),
      }
    }
  };
  
  </script>
  
  <style>
  @media (max-width: 768px) {
    .colom_chat {
      display: none;
    }
    .colom_nama{
      width: 100%;
    }
    .colom_chat{
      width: 100%;
    }
  }
  </style>