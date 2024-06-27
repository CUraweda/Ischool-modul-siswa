<template>
  <div class="container">
    <!-- <NavbarSiswa /> -->
    <div class="row">
      <div class="col-md-12">
        <div class="text-center bg-blue-2 tw-min-h-screen">
          <q-card-section>
            <div class="text-center">
              <p>
                <span
                  class="text-center text-black text-bold"
                  style="font-size: x-large"
                  >RENCANA PEKANAN</span
                >
              </p>
            </div>
          </q-card-section>

          <q-card-section>
            <q-card style="height: 700px" class="tw-p-3 tw-overflow-auto">
              <div class="tw-w-full flex tw-justify-end text-right">
                <q-select
                  class="tw-w-32"
                  filled
                  v-model="tahun"
                  :options="options"
                  label="Tahun"
                  @change="getKalender"
                />
                <q-select
                  class="tw-w-32"
                  filled
                  v-model="smt"
                  :options="options2"
                  label="Semester"
                  @change="getKalender"
                />
              </div>
              <FullCalendar :options="calendarOptions" :key="calendarKey" />
            </q-card>
          </q-card-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import idLocale from "@fullcalendar/core/locales/id";
import { ref } from "vue";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      dataKalender: ref([]),
      calendarKey: 0,
      token: sessionStorage.getItem("token"),
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        weekends: false,
        locale: idLocale,
        slotMinTime: "07:30:00",
        slotMaxTime: "16:30:00",
        contentHeight: "auto",
        headerToolbar: {
          start: "today",
          center: "title",
          end: "prev next",
        },

        events: [],
        eventColor: "#1679AB", // Set a default color for events
        eventClick: function (info) {
          alert("Event: " + info.event.title); // Show an alert when an event is clicked
        },
      },
      tahun: ref("2023/2024"),
      smt: ref("1"),
      options: ["2023/2024", "2024/2025"],
      options2: ["1", "2"],
    };
  },
  methods: {
    async getKalender() {
      console.log("ini jalan ya");
      try {
        const response = await this.$api.get(
          `timetable/show-by-class/11?semester=${this.smt}&academic=${this.tahun}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = response.data.data;

        const dataKegiatan = await Promise.all(
          data
            .filter((item) => item.hide_student === true)
            .map((item, index) => {
              const rest = {
                title: item.title,
                start: new Date(item.start_date),
                end: new Date(item.end_date),
              };
              return rest;
            })
        );
        this.dataKalender = dataKegiatan;
        this.calendarKey++;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    dataKalender(newVal) {
      this.calendarOptions.events = newVal;
    },
    tahun: {
      handler: function (newVal, oldVal) {
        this.getKalender();
      },
      immediate: true,
    },
    smt: {
      handler: function (newVal, oldVal) {
        this.getKalender();
      },
      immediate: true,
    },
  },
  mounted() {
    this.getKalender();
  },
};
</script>
