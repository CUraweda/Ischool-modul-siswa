<template>
  <div class="container">
    <!-- <NavbarService/> -->
    <div class="row">
      <div class="col">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">PEMINJAMAN BUKU</span>
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: auto">
              <q-card-section>
                <div class="row">
                  <div class="col-md col-12">
                    <div class="tw-p-2">
                      <q-card style="height: 300px">
                        <q-card-section>
                          <p>
                            <span style="font-size: xx-large">History</span>
                          </p>
                          <div class="row flex justify-center items-center">
                            <div class="col-md-5">
                              <q-img src="../../assets/book/book.png" class="tw-w-1/2" />
                            </div>

                            <div class="col text-left">
                              <q-markup-table flat>
                                <tbody class="text-bold text-blue">
                                  <tr>
                                    <td class="text-left">Wajib</td>
                                    <td class="text-right">
                                      {{ rekap?.wajib }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="text-left">Pilihan</td>
                                    <td class="text-right">
                                      {{ rekap?.pilihan }}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="text-left">Target</td>
                                    <td class="text-right">10</td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                  <div class="col-md col-12">
                    <div class="tw-p-2">
                      <q-card>
                        <q-card-section>
                          <p class="text-center text-bold text-h6 text-blue-grey-8">
                            Rekomendasi Buku
                          </p>
                          <div class="q-pa-md" style="overflow: hidden">
                            <q-carousel swipeable animated v-model="slide" :autoplay="autoplay" ref="carousel" infinite
                              class="carousel">
                              <q-carousel-slide v-for="(item, index) in slider" :key="item.id" :name="item?.title"
                                class="flex flex-center">
                                <div class="gambar">
                                  <q-img :src="item?.path" :ratio="3 / 4" />
                                </div>
                                <div class="tabel">
                                  <q-markup-table flat>
                                    <tbody class="">
                                      <tr>
                                        <td class="text-left text-bold">
                                          Judul
                                        </td>
                                        <td class="text-left">
                                          {{ item?.title }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="text-left text-bold">
                                          Pengarang
                                        </td>
                                        <td class="text-left">
                                          {{ item?.writer }}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="text-left text-bold">
                                          Penerbit
                                        </td>
                                        <td class="text-left">
                                          {{ item?.publisher }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </q-markup-table>
                                </div>
                              </q-carousel-slide>

                              <template v-slot:control>
                                <q-carousel-control position="top-right" :offset="[1, 1]"
                                  class="text-white rounded-borders" style="
                                    background: rgba(0, 0, 0, 0.3);
                                    padding: 4px 8px;
                                  ">
                                  <q-toggle dense dark color="blue" v-model="autoplay" label="Auto Play" />
                                </q-carousel-control>

                                <q-carousel-control position="bottom-right" :offset="[1, 1]" class="q-gutter-xs">
                                  <q-btn push round dense color="blue" text-color="black" icon="arrow_left"
                                    @click="$refs.carousel.previous()" />
                                  <q-btn push round dense color="blue" text-color="black" icon="arrow_right"
                                    @click="$refs.carousel.next()" />
                                </q-carousel-control>
                              </template>
                            </q-carousel>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <!-- <q-card class="bg-blue-grey-4 text-white text-bold">
                  <p>13 Oktober 2023 buku dengan judul <span class="text-amber-12"> Reach For The Sky</span> telah
                    dikembalikan</p>
                </q-card> -->
                <q-separator />
              </q-card-section>
              <q-card-section>
                <div class="col-md col-12 tw-p-2">
                  <div class="text-center">
                    <div class="text-h6 text-blue">DAFTAR BUKU</div>

                    <q-markup-table class="tw-h-96 tw-mt-5">
                      <thead>
                        <tr>
                          <th class="text-center">cover</th>
                          <th class="text-left">Judul Buku</th>
                          <th class="text-left">Kategori</th>
                          <th class="text-center">Tanggal pinjam</th>
                          <th class="text-center">Batas Pengembalian</th>
                          <th class="text-center">Tanggal kembali</th>
                          <th class="text-center">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in borrow" :key="item.id">
                          <td class="text-center">
                            <q-img :src="item?.book.cover
                                        ? item?.book.cover
                                        : 'https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png'
                                        " />
                          </td>
                          <td class="text-left">{{ item?.book.title }}</td>
                          <td class="text-left">{{ item?.book.category }}</td>
                          <td class="text-center">
                            {{ getDateTime(item?.start_date) }}
                          </td>
                          <td class="text-center">
                            {{ getDateTime(item?.end_date) }}
                          </td>
                          <td class="text-center">
                            {{ getDateTime(item?.end_date) }}
                          </td>
                          <td class="text-center" @click="handleRating(item)" style="cursor: pointer">
                            <div class="flex justify-center items-center">
                              <q-icon name="grade" size="1.5rem" color="orange" />
                              <p class="text-h6">4.5</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-dialog v-model="medium">
            <q-card style="width: 700px; max-width: 80vw; max-height: 700px">
              <q-card-section class="">
                <div class="text-h4 text-bold q-pl-md">
                  150 Review
                </div>
                <div class="flex items-center q-pl-md">
                  <!-- <p class="text-h4 text-bold">{{ totalRating }}</p> -->
                  <q-rating v-model="totalRating" max="5" size="2em" color="orange" icon="star_border"
                    icon-selected="star" icon-half="star_half" no-dimming readonly />
                </div>
              </q-card-section>
              <q-separator style="width: 100%; margin-top: 20px; margin-bottom: 20px" color="orange" />
              <q-card-section class="q-pt-none flex justify-center items-center">
                <div style="width: 100%; margin-left: 20px; margin-right: 20px">
                  <p>Masukan Rating</p>
                  <q-rating v-model="ratingWajib" max="5" size="2em" color="orange" icon="star_border"
                    icon-selected="star" icon-half="star_half" no-dimming />
                  <q-input outlined bottom-slots v-model="comment" label="Review" counter maxlength="100" class="q-py-sm"
                   >

                    <template v-slot:after>
                      <q-btn round dense flat icon="send" @click="postRating()" />
                    </template>
                  </q-input>
                </div>
                <q-separator style="width: 100%; margin-top: 20px; margin-bottom: 20px" color="orange" />
                
                <div style="margin: 20px">
                  <p class="text-h5">Semua Rating</p>
                </div>
                <q-card style="margin-top: 10px; display: block; width: 100%" v-for="(list, index) in this.bookRating?.reviews"
                  :key="index">
                  <div style="width: 95%; border-radius: 10px; margin: 5px" class="q-pa-md" v-if="list.rating">
                    <div>
                      <q-rating v-model="list.rating" max="5" size="2em" color="orange" icon="star_border"
                        icon-selected="star" icon-half="star_half" no-dimming readonly />
                      <p class="text-bold">{{ list.student.full_name }}</p>
                      <p class="">
                        {{ list.comment }}
                      </p>
                    </div>
                  </div>
                </q-card>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Ok" @click="closeDialog()" />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { ref } from "vue";
import NavbarService from "../../components/siswa/HederSiswa.vue";

export default {
  components: {
    NavbarService,
  },

  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
      ratingWajib: ref(0),
      medium: ref(false),
      token: ref(sessionStorage.getItem("token")),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      slider: ref(),
      rekap: ref(),
      borrow: ref(),
      bookRating: ref(),
      totalRating: ref(0),
      comment: ref('')

    }
  },
  methods: {
    getDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },
    getRound() {
     const round = Math.round(this.bookRating?.total_ratings)
      return round;
    },
    async getSliderBook() {
      try {
        const response = await this.$api.get(`book-slider/show-all`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.slider = response.data.data;
        this.slide = response.data.data[0].title;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecapBook() {
      try {
        const response = await this.$api.get(
          `borrow-book/show-recap-by-student/${this.idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
          console.log(response);
        this.rekap = response.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    async getBorrowBook() {
      try {
        const response = await this.$api.get(`borrow-book/show-by-student/${this.idSiswa}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })

        console.log(response.data);
        this.borrow = response.data.data
      } catch (error) {
        console.log(error);
      }
    },
    async postRating() {
      try {
        const data = {
          rating: this.ratingWajib,
          student_id: parseInt(sessionStorage.getItem("idSiswa")),
          book_id: this.bookdata.book.id,
          comment: this.comment,
        };
      
        const response = await this.$api.post(`/book-review/create`, data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.data) {
          Swal.fire({
            title: "Success!",
            text: `Rating buku ${this.bookdata.book.title} berhasil ditambahkan`,
            icon: "success",
          });
          this.medium = false;
          this.clearData();
        }
      } catch (err) {
        console.error(err);
      }
    },

    async getBookAll() {
      try {
        const response = await this.$api.get(
          `book-review/show-by-book/${this.bookdata.book.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        this.bookRating = response.data.data
        this.totalRating = Math.round(response?.data.data.total_ratings) 
   
      } catch (error) {
        console.error(error);
      }
    },
    closeDialog() {
      this.medium = false;
    },
    clearData() {
      this.ratingWajib = null;
      this.bookdata = null;
      this.comment = null;
    },
    handleRating(data) {
      this.medium = true;
      this.bookdata = data;
      this.getBookAll();
    },
  },
  mounted() {
    this.getSliderBook()
    this.getRecapBook()
    this.getBorrowBook()
  },
};
</script>

<style>
.gambar {
  width: 150px;
}

.tabel {
  margin-left: 10px;
  width: 60%;
}

.carousel {
  height: 200px;
  overflow: hidden;
}

@media (max-width: 480px) {
  .carousel {
    height: 500px;
  }

  .tabel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 300px;
  }

  .tabel {
    width: 100%;
  }
}

@media (max-width: 1120px) {
  .gambar {
    width: 50%;
    max-width: 50px;
  }

  .tabel {
    width: 10%;
  }
}

@media (max-width: 1390px) {
  .gambar {
    width: 100%;
    max-width: 100px;
  }

  .tabel {
    width: 60%;
  }
}
</style>
