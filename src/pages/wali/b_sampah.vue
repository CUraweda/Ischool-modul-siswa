<template>
  <div class="container">
    <!-- <NavbarSiswa /> -->
    <div class="row">
      <div class="col-md-12">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">BANK SAMPAH</span>
              </p>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card style="height: auto">
              <q-card-section>
                <div class="row flex justify-center tw-gap-3">
                  <div class="col-md col-12">
                    <q-card class="bg-light-green-1 tw-h-80">
                      <q-card-section>
                        <p>
                          <span style="font-size: xx-large">History</span>
                        </p>
                        <div class="row flex justify-center items-center">
                          <div class="col-md-4">
                            <q-img src="../../assets/garbage.png" style="width: 70%" />
                          </div>
                          <div class="col-md-8 text-left tw-w-full">
                            <q-markup-table class="bg-light-green-1 tw-w-full" flat>
                              <tbody class="text-bold text-blue tw-w-full">
                                <tr>
                                  <td class="text-left" style="font-size: larger">
                                    Hari ini
                                  </td>
                                  <td class="text-right" style="font-size: larger">
                                    {{ Math.round(rekapSampah[0]?.today) }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: small">
                                    Kg
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left" style="font-size: larger">
                                    Bulan ini
                                  </td>
                                  <td class="text-right" style="font-size: larger">
                                    {{ Math.round(rekapSampah[0]?.this_month) }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: small">
                                    Kg
                                  </td>
                                </tr>
                              </tbody>
                            </q-markup-table>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-md col-12 text center">
                    <q-card class=" tw-h-80">
                      <q-card-section>
                        <div class="text-center flex tw-flex-col tw-justify-center items-center">
                          <p class="text-bold" style="font-size: x-large">
                            Target dan Capaian
                          </p>
                          <p class="text-blue-4 text-bold" style="font-size: larger">
                            Target {{ target }} Kg
                          </p>

                          <p class="tw-mt-5 tw-text-xl tw-font-bold">Capaian</p>
                          <div id="chart" class="tw-w-full">
                            <apexchart type="radialBar" :options="chartOptions1" :series="series1"></apexchart>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-md col-12">
                    <q-card class="bg-light-green-1 tw-h-80">
                      <q-card-section>
                        <div class="row">
                          <div class="col-md-12 text-left flex justify-center">
                            <p class="text-center">
                              <span class="text-bold" style="font-size: larger">Rekap Periode:
                              </span>
                            </p>
                            <q-markup-table class="bg-light-green-1 tw-w-full" flat>
                              <tbody class="text-bold text-blue">
                                <tr>
                                  <td class="text-left" style="font-size: small">
                                    Senin
                                  </td>
                                  <td class="text-right" style="font-size: small">
                                    {{ rekapMinggu[0]?.weight ? rekapMinggu[0]?.weight : 0 }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: smaller">
                                    Kg
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left" style="font-size: small">
                                    Selasa
                                  </td>
                                  <td class="text-right" style="font-size: small">
                                    {{ rekapMinggu[1]?.weight ? rekapMinggu[1]?.weight : 0 }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: smaller">
                                    Kg
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left" style="font-size: small">
                                    Rabu
                                  </td>
                                  <td class="text-right" style="font-size: small">
                                    {{ rekapMinggu[2]?.weight ? rekapMinggu[2]?.weight : 0 }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: smaller">
                                    Kg
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left" style="font-size: small">
                                    Kamis
                                  </td>
                                  <td class="text-right" style="font-size: small">
                                    {{ rekapMinggu[3]?.weight ? rekapMinggu[3]?.weight : 0 }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: smaller">
                                    Kg
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-left" style="font-size: small">
                                    Jumat
                                  </td>
                                  <td class="text-right" style="font-size: small">
                                    {{ rekapMinggu[4]?.weight ? rekapMinggu[4]?.weight : 0 }}
                                  </td>
                                  <td class="text-left text-red" style="font-size: smaller">
                                    Kg
                                  </td>
                                </tr>
                              </tbody>
                            </q-markup-table>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
              <q-separator color="blue" inset />
              <br />
              <p class="text-center text-bold" style="font-size: large">
                Periode Minggu ini
              </p>

              <div>
                <div v-if="chartCollection" id="chart">
                  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                </div>

              </div>
            
            </q-card>
          </q-card-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

let dataSampah = ref([])

export default {
  name: 'chartBar',

  data() {
    return {
      series: [
        {
          name: 'senin',
          data: []
        },
        {
          name: 'selasa',
          data: []
        },
        {
          name: 'rabu',
          data: []
        },
        {
          name: 'kamis',
          data: []
        },
        {
          name: 'Jumat',
          data: []
        }
      ],

      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent']
        },
        xaxis: {
          categories: dataSampah,
        },
        yaxis: {
          title: {
            text: 'g (gram)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Gram"
            }
          }
        }
      },

      series1: ref([0]),
      chartOptions1: {
        chart: {
          type: 'radialBar',
          offsetY: -20,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: '97%',
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -3,
                fontSize: '22px'
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          },
        },
        labels: ['Average Results'],
      },

      token: ref(sessionStorage.getItem("token")),
      idSiswa: ref(sessionStorage.getItem("idSiswa")),
      rekapMinggu: ref([]),
      rekapSampah: ref([]),
      total: ref(0),
      target: ref(0),
      chartCollection: ref(false)

    }

  },
  methods: {
    async getRekapSampahMingguan() {
      try {
        const response = await this.$api.get(`waste-collection/recap-week-by-student/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        this.rekapMinggu = response.data.data
      } catch (error) {

      }
    },
    async getCollectionSampahMingguan() {
      try {
        const response = await this.$api.get(`waste-collection/collection-week-by-student/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const data = response.data.data
        const categories = data.map(item => item.waste_type);
        this.chartOptions.xaxis.categories = categories

        data.forEach(item => {
          this.series[0].data.push(item.weekday.senin);
          this.series[1].data.push(item.weekday.selasa);
          this.series[2].data.push(item.weekday.rabu);
          this.series[3].data.push(item.weekday.kamis);
          this.series[4].data.push(item.weekday.jumat);
        });

        this.chartCollection = true

      } catch (error) {

      }
    },

    async getRekapSampahbulan() {
      try {
        const response = await this.$api.get(`waste-collection/show-recap-history/${this.idSiswa}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        this.rekapSampah = response.data.data
      } catch (error) {

      }
    },
    async getRekapSampah() {
      try {
        const response = await this.$api.get(`waste-collection/target-achievement-by-student/${this.idSiswa}?is_current=1`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        const total = [response.data.data[0].weight]
        const target = Math.round(response.data.data[0].studentclass.class.waste_target)

        const hasilTarget = (total / target) * 100

        this.series1 = [Math.round(hasilTarget)]
        this.target = target
      } catch (error) {

      }
    },
  },
  mounted() {
    this.getRekapSampahMingguan()
    this.getRekapSampahbulan()
    this.getRekapSampah()
    this.getCollectionSampahMingguan()
  },

}
</script>
