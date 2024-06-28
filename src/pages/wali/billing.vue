<template>
  <div class="container">
    <div>
      <div>
        <q-card class="text-center bg-blue-2">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large"
                  >BILLING</span
                >
              </p>
            </div>
            <div class="q-px-md">
              <q-card style="height: 100%">
                <q-card-section>
                  <div class="" style="height: 100%">
                    <div class="col-md-9 col-9">
                      <div class="row justify-between">
                        <p class="text-left q-ml-md q-mt-sm text-grey">
                          <span style="font-size: large">Billing History</span>
                          <br />
                          <span style="font-size: smaller">
                            manage Billing information and view receips</span
                          >
                        </p>

                        <div class="text-center text-bold q-pt-sm no-shadow">
                          <q-btn @click="showDialog = true" class="text-bold no-shadow" style="background: rgb(248, 87, 87); color: white; width: 100%" label="Payment" />
                      </div>
                        </div>

                        <q-btn-toggle
                          v-model="bill"
                          spread
                          no-caps
                          :toggle-color="bill !== 'unpaid' ? 'blue-2 text-black' : 'red-5 text-black'"
                          class="no-shadow q-mt-lg q-px-md"
                          color="grey-3"
                          text-color="black"
                          :options="bill_options"
                        />
                      <q-markup-table flat  class="q-px-lg">

                        <template v-slot:body-cell="props">
                          <q-td :props="props">
                            <q-checkbox v-model="props.row.selected" />
                          </q-td>
                        </template>

                        <thead>
                          <tr>
                            <th v-if="bill == 'unpaid'" class="text-center" style="width: 10px">
                              <q-checkbox v-model="allSelected" @update:model-value="toggleAll" />
                            </th>
                            <th class="text-center" style="width: 10px">No</th>
                            <th class="text-left">Date</th>
                            <th class="text-left">Billing Type</th>
                            <th class="text-left">Total</th>
                            <th v-if="bill != 'unpaid'" class="text-left">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in dataBilling" :key="item.id">
                            <q-td v-if="bill == 'unpaid'" >
                              <q-checkbox v-model="item.selected"  @update:model-value="updateAllSelected" />
                            </q-td>
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
                            <td v-if="bill != 'unpaid'" class="text-left">
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
                      <!-- <div></div> -->
                    </div>
                    <!-- <div class="col-md-3 col-3 q-px-md" style="height: 100%">
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
                              <span style="color: black"
                                >Total: Rp.
                                {{ totalAmount.toLocaleString("id-ID") }}</span
                              >
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
                    </div> -->
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
          <p>{{ selectedRows.length }} baris bayaran dipilih:</p>
        <ul>
          <!-- <li v-for="(row, index) in selectedRows" :key="index">
            {{ row.id }} - {{ formatDate(row.createdAt) }} - {{ row.paymentcategory.billing_cycle }}
          </li> -->

          <tr v-for="(item, index) in selectedRows" :key="index">
            <td class="text-left q-mx-sm q-px-sm">{{ index + 1 }}</td>
            <!-- <td class="text-left q-mx-sm q-px-sm">
              {{ formatDate(item?.createdAt) }}
            </td> -->
            <td class="text-left q-mx-sm q-px-sm">
              {{ item?.paymentcategory.billing_cycle }}
            </td>
            <br>
            <td class="text-left q-mx-sm q-px-sm">
              Rp.{{ item?.bill_amount.toLocaleString("id-ID") }}
            </td>
          </tr>

        </ul>
        </q-card-section>

        <q-card-section>
          <div class="text-h6 text-center">Nomor Rekening Pembayaran Billing</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center tw-mt-3">
          No Rekening: 1570000005034 an Sekolah Alam Depok
        </q-card-section>

        <q-card-section class="q-px-xl">
          <q-uploader style="width: 100%" label="Custom header"  accept=".jpg, .jpeg, .png">
            <template v-slot:header="scope">
              <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <q-btn
                  v-if="scope.queuedFiles.length > 0"
                  icon="clear_all"
                  @click="scope.removeQueuedFiles"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Clear All</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="scope.uploadedFiles.length > 0"
                  icon="done_all"
                  @click="scope.removeUploadedFiles"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Remove Uploaded Files</q-tooltip>
                </q-btn>
                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                <div class="col">
                  <div class="q-uploader__title">Upload bukti pembayaran</div>
                  <div class="q-uploader__subtitle">
                    {{ scope.uploadSizeLabel }}
                  </div>
                </div>
                <q-btn
                  v-if="scope.canAddFiles"
                  type="a"
                  icon="add_box"
                  @click="scope.pickFiles"
                  round
                  dense
                  flat
                >
                  <q-uploader-add-trigger />
                  <q-tooltip>Pick Files</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="scope.canUpload"
                  icon="cloud_upload"
                  @click="uploadFiles(scope)"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Upload Files</q-tooltip>
                </q-btn>

                <q-btn
                  v-if="scope.isUploading"
                  icon="clear"
                  @click="scope.abort"
                  round
                  dense
                  flat
                >
                  <q-tooltip>Abort Upload</q-tooltip>
                </q-btn>
              </div>
            </template>
          </q-uploader>
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
  data() {
    return {
      allSelected: false,
      selected: false,
     }
  },

  setup() {
    return {
      // selectedRow: ref([]),
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
      bill: ref("monthly"),
      bill_options: [
        {
          label: "Monthly",
          value: "monthly",
        },
        {
          label: "Non Monthly",
          value: "non-monthly",
        },
        {
          label: "Unpaid",
          value: "unpaid",
        },
      ],
    };
  },

  computed: {
    selectedRows() {
      return this.dataBilling.filter(item => item.selected);
    }
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
        const response = await this.$api.get(`${this.bill}/show-by-student/${idSiswa}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filterDataBilling = response.data.data.filter(
          (a) => a.payment_status === "Paid"
        );

        this.dataBilling = filterDataBilling;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async getDataUnpaidBiling() {
      const idSiswa = sessionStorage.getItem("idSiswa");
      const token = sessionStorage.getItem("token");

      try {
        const responseMonthly = await this.$api.get(`monthly/show-by-student/${idSiswa}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseNonMonthly = await this.$api.get(`non-monthly/show-by-student/${idSiswa}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filterDataBillingMonthly = responseMonthly.data.data.filter(
          (a) => a.payment_status !== "Paid"
        );

        const filterDataBillingNonMonthly = responseNonMonthly.data.data.filter(
          (a) => a.payment_status !== "Paid"
        );

        const filterDataBilling = [...filterDataBillingMonthly, ...filterDataBillingNonMonthly]

        const dataBillingWithSelection = filterDataBilling.map(item => ({ ...item, selected: false }));

        this.dataBilling = dataBillingWithSelection;
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    toggleAll(value) {
      this.dataBilling.forEach(item => {
        item.selected = value;
      });
    },

    updateAllSelected() {
      this.allSelected = this.dataBilling.every(item => item.selected);
    },

  },

  watch: {
    bill: {
      handler(value) {
        if (value != "unpaid") {
          this.allSelected = false;
          this.dataBilling = '';
          this.getDataBiling();
          // console.log("🚀 ~ handler ~ this.nilaiBilling:", this.dataBilling)
          } else if (value === "unpaid") {
          this.getDataUnpaidBiling();
          // console.log("🚀 ~ handler ~ this.nilaiBilling:", this.dataBilling)
        }
      },
    },
  },

  mounted() {
    this.getDataBiling();
  },
};
</script>
