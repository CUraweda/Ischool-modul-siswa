<template>
  <div class="container">
    <div>
      <div>
        <q-card class="text-center bg-blue-2">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >BILLING</span
                >
              </p>
            </div>
            <div class="q-px-md">
              <q-card style="height: 100%">
                <q-card-section>
                  <div class="row" style="height: 100%">
                    <div class="col-md-9 col-9">
                      <p class="text-left q-ml-md q-mt-sm text-grey">
                        <span style="font-size: large">Billing History</span
                        ><br />
                        <span style="font-size: smaller">
                          manage Billing information and view receips</span
                        >
                      </p>
                      <q-markup-table flat class="q-px-lg">
                        <thead>
                          <tr>
                            <th class="text-center" style="width: 10px">No</th>
                            <th class="text-left">Date</th>
                            <th class="text-left">Billing Type</th>
                            <th class="text-left">Total</th>
                            <th class="text-left">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in dataBilling"
                            :key="item.id"
                          >
                            <td class="text-left">{{ index + 1 }}</td>
                            <td class="text-left">
                              {{ formatDate(item?.createdAt) }}
                            </td>
                            <td class="text-left">
                              {{ item?.paymentcategory.billing_cycle }}
                            </td>
                            <td class="text-left">
                              Rp.{{ item?.bill_amount.toLocaleString("id-ID") }}
                            </td>
                            <td class="text-left">
                              <q-btn
                                outline
                                style="color: grey"
                                label="Download"
                                :disable="!item?.invoice"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                      <div></div>
                    </div>
                    <div class="col-md-3 col-3 q-px-md" style="height: 100%">
                      <q-card class="q-px-sm q-mt-lg text-center bg-red-5">
                        <q-card-section>
                          <div class="text-left">
                            <p class="text-left text-bold q-ml-md text-white">
                              <span style="font-size: medium"
                                >Next Payment</span
                              >
                            </p>
                          </div>
                          <q-separator color="white" inset />
                          <div class="q-mx-md tw-flex tw-flex-col text-left text-white">
                           
                            <div
                              v-for="(item, index) in nilaiBilling"
                              :key="index"
                            >
                              <q-checkbox
                                :label="`${item?.paymentcategory?.billing_cycle} Rp. ${item?.bill_amount}`"
                              />
                            </div>

                            <p
                              class="text-white"
                              style="font-size: larger; margin-top: 10px"
                            >
                              <!-- <span style="color: black"
                                >Total: Rp.
                                {{ totalAmount.toLocaleString("id-ID") }}</span
                              > -->
                            </p>
                            <q-btn
                              class="full-width q-mt-lg"
                              outline
                              label="Pay Now"
                              @click="showDialog = true"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Dialog -->
    <q-dialog v-model="showDialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center">
            Nomor Rekening Pembayaran Billing
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center tw-mt-3">
          No Rekening: 1570000005034 an Sekolah Alam Depok
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("mails"),
      innerTab: ref("innerMails"),
      small: ref(false),
      medium: ref(false),
      splitterModel: ref(20),
      shape: ref(),
      shape2: ref(),
      model: ref(null),
      dataBilling: ref(),
      showDialog: ref(false),
      nilaiBilling: ref(),
      billing: ref(),
    };
  },

  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    },

    async getDataBiling() {
      const idSiswa = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");

      try {
        const response = await this.$api.get(
          `monthly/show-by-student/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filterDataBilling = response.data.data.filter(
          (a) => a.payment_status !== "Paid"
        );

        this.dataBilling = response.data.data;
        this.nilaiBilling = filterDataBilling;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getDataBiling();
  },
};
</script>
