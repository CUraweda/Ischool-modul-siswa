<template>
  <div class="container">
    <div>
      <div>
        <q-card class="text-center bg-blue-2">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">BILLING</span>
              </p>
            </div>
            <div class="q-px-md">
              <q-card style="height: 100%">
                <q-card-section>
                  <div class="row" style="height: 100%">
                    <div class="col-md-9 col-9">
                      <p class="text-left q-ml-md q-mt-sm text-grey">
                        <span style="font-size: large">Billing History</span><br />
                        <span style="font-size: smaller">
                          manage Billing information and view receips</span>
                      </p>
                      <q-markup-table flat class="q-px-lg">
                        <thead>
                          <tr>
                            <th class="text-center" style="width: 10px">No</th>
                            <th class="text-left">Date</th>
                            <th class="text-left">Billing Type</th>
                            <th class="text-left">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in dataBilling" :key="index">
                            <td class="text-left">{{ index + 1 }}</td>
                            <td class="text-left">
                              {{ formatDate(item.createdAt) }}
                            </td>
                            <td class="text-left">{{ item.month.name }}</td>
                            <td class="text-left">
                              <q-btn outline style="color: grey" label="Download" />
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                      <div></div>
                    </div>
                    <div class="col-md-3 col-3 q-px-md" style="height:100%">
                      <q-card class="q-px-sm q-mt-lg text-center bg-red-5">
                        <q-card-section>
                          <div class="text-left">
                            <p class="text-left text-bold q-ml-md text-white">
                              <span style="font-size: medium">Next Payment</span>
                            </p>
                          </div>
                          <q-separator color="white" inset />
                          <div class="q-mx-md tw-flex tw-flex-col text-left">
                            <p class="text-bold q-mt-md text-white text-left">
                              <span style="font-size: medium">Payment Options</span>
                              <template v-for="(billing, index) in nilaiBilling" :key="index">
                                <q-checkbox v-model="billing.isChecked" :label="`SPP ${billing.month.name
                            } Rp. ${billing.bill_amount.toLocaleString(
                              'id-ID'
                            )}`" style="font-size: 8px; margin-bottom: 3px; margin-right: 0px;"></q-checkbox>
                              </template>
                            </p>
                            <span style="font-size: smaller">Payment deadline</span>
                            <span class="text-warning" style="font-size: smaller">10 Desember 2023</span>
                            <p class="text-white" style="font-size: larger; margin-top: 10px">
                              <span style="color: black">Total: Rp.
                                {{ totalAmount.toLocaleString("id-ID") }}</span>
                            </p>
                            <q-btn class="full-width q-mt-lg" outline style="color: black" label="Pay Now"
                              @click="showDialog = true" />
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
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">Nomor Rekening Pembayaran Billing</div>
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
import { ref, watch, onMounted } from "vue";
import axios from "axios";

export default {
  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${day}-${month}-${year}`;
    },
  },
  setup() {
    const nilaiBilling = ref([]);
    const dataBilling = ref([]);
    const showDialog = ref(false);
    const getBilling = async () => {
      const idSiswa = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api-dev.curaweda.com:7000/api/monthly/show-by-student/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filterDataBilling = response.data.data.filter(
          (a) => a.payment_status !== "Paid"
        );
        const filterDataBillingSudahBayar = response.data.data.filter(
          (a) => a.payment_status === "Paid"
        );
        console.log(filterDataBilling);
        dataBilling.value = filterDataBillingSudahBayar;
        nilaiBilling.value = filterDataBilling;
        // rekapSampah.value = response.data.data
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getBilling();
    });
    const januaryCheckbox = ref(false);
    const februaryCheckbox = ref(false);
    const marchCheckbox = ref(false);
    const amountPerMonth = 500000;
    const totalAmount = ref(0);

    const calculateTotal = () => {
      totalAmount.value = nilaiBilling.value.reduce((total, billing) => {
        if (billing.isChecked) {
          return total + billing.bill_amount;
        } else {
          return total;
        }
      }, 0);
    };
    watch([januaryCheckbox, februaryCheckbox, marchCheckbox], () => {
      calculateTotal();
    });
    watch(
      nilaiBilling,
      () => {
        calculateTotal();
      },
      { deep: true }
    );
    return {
      tab: ref("mails"),
      innerTab: ref("innerMails"),
      small: ref(false),
      medium: ref(false),
      splitterModel: ref(20),
      shape: ref(),
      shape2: ref(),
      model: ref(null),
      januaryCheckbox,
      nilaiBilling,
      dataBilling,
      februaryCheckbox,
      marchCheckbox,
      totalAmount,
      calculateTotal,
      showDialog
    };
  },
};
</script>
