<template>
  <div class="container">
    <!-- <NavbarSiswa/> -->
    <q-card class="text-center bg-blue-2 flex tw-flex-col tw-min-h-screen">
      <q-card-section>
        <div class="text-center tw-mb-5">
          <p>
            <span
              class="text-center text-black text-bold"
              style="font-size: x-large"
              >KEHADIRAN SISWA</span
            ><br />
            <span
              class="text-center text-black text-bold"
              style="font-size: larger"
            >
              Bulan {{ currentmonth }}</span
            >
          </p>
        </div>
        <div>
          <q-card class="my-card tw-h-full flex tw-w-full">
            <q-card-section class="tw-w-full">
              <div class="subcontent tw-w-full">
                <navigation-bar
                  @today="onToday"
                  @prev="onPrev"
                  @next="onNext"
                  style="color: green"
                  flat
                />

                <div class="row justify-center">
                  <div style="width: 100%">
                    <q-calendar-month
                      ref="calendar"
                      v-model="selectedDate"
                      animated
                      bordered
                      focusable
                      hoverable
                      no-active-date
                      :day-min-height="100"
                      :day-height="0"
                      @change="onChange"
                      @moved="onMoved"
                      @click-date="onClickDate"
                      @click-day="onClickDay"
                      @click-workweek="onClickWorkweek"
                      @click-head-workweek="onClickHeadWorkweek"
                      @click-head-day="onClickHeadDay"
                    >
                      <template #week="{ scope: { week, weekdays } }">
                        <template
                          v-for="(computedEvent, index) in getWeekEvents(
                            week,
                            weekdays
                          )"
                          :key="index"
                        >
                          <div
                            :class="badgeClasses(computedEvent)"
                            :style="badgeStyles(computedEvent, week.length)"
                          >
                            <div
                              v-if="
                                computedEvent.event &&
                                computedEvent.event.details
                              "
                              class="title q-calendar__ellipsis tw-h-5"
                            >
                              {{
                                computedEvent.event.title +
                                " - " +
                                computedEvent.event.transport
                              }}

                            </div>
                              <q-tooltip class="text-body2 bg-primary">{{
                                computedEvent.event.title +
                                " - " +
                                computedEvent.event.transport
                              }}</q-tooltip>
                          </div>
                        </template>
                      </template>
                    </q-calendar-month>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <br />
        <div class="text-center">
          <!-- <div class="row flex">
            <div class="col-md-3 col-12 text-bold tw-p-2">
              <q-card class="tw-h-52 flex justify-center items-center">
                <q-card-section class="tw-w-full">
                  <q-markup-table>
                    <tbody>
                      <tr>
                        <td class="text-left">Izin</td>
                        <td class="text-right">{{ totalPresensi.izin }}</td>
                      </tr>
                      <tr>
                        <td class="text-left">Sakit</td>
                        <td class="text-right">
                          {{ totalPresensi.sakit }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Alfa</td>
                        <td class="text-right">{{ totalPresensi.alfa }}</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-md-9 col-12 text-bold tw-p-2">
              <q-card class="tw-h-52">
                <q-card-section>
                  <p class="text-left">
                    rekapan hadir tepat waktu dan telat
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div> -->
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import {
  QCalendarMonth,
  daysBetween,
  isOverlappingDates,
  parsed,
  parseDate,
  today,
  indexOf,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";

import { defineComponent, ref } from "vue";
import NavigationBar from "../../components/NavigationBar.vue";
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";

// The function below is used to set up our demo data
function getCurrentDay(day, date) {
  const newDay = new Date(date);
  newDay.setDate(day);
  const tm = parseDate(newDay);
  return tm.date;
}

export default defineComponent({
  name: "MonthSlotWeek",
  components: {
    NavigationBar,
    QCalendarMonth,
    NavbarSiswa,
  },
  data() {
    return {
      selectedDate: today(),
      events: ref([]),
      currentmonth: ref(""),
      year: ref(""),
      month: ref(""),
      totalPresensi: ref("-"),
    };
  },
  mounted() {
    this.getCurrentDateTime();
    this.getPresensi();
  },
  watch: {
    year(newVal) {
      this.getPresensi();
    },
    month(newVal) {
      this.getPresensi();
    },
  },
  methods: {

    onToday() {
      this.$refs.calendar.moveToToday();
      this.getCurrentDateTime()
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    getCurrentDateTime() {
      const now = new Date();
      const options = { month: "long", year: "numeric" };
      this.currentmonth = now.toLocaleDateString("id-ID", options);
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
    },

    getWeekEvents(week, weekdays) {
      const firstDay = parsed(week[0].date + " 00:00");
      const lastDay = parsed(week[week.length - 1].date + " 23:59");

      const eventsWeek = [];
      this.events.forEach((event, id) => {
        const startDate = parsed(event.start + " 00:00");
        const endDate = parsed(event.end + " 23:59");

        if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
          const left = daysBetween(firstDay, startDate, true);
          const right = daysBetween(endDate, lastDay, true);

          eventsWeek.push({
            id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event, // Info
          });
        }
      });

      const events = [];
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left);
        infoWeek.forEach((_, i) => {
          this.insertEvent(events, week.length, infoWeek, i, 0, 0);
        });
      }

      return events;
    },

    insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
      const iEvent = infoWeek[index];
      if (iEvent !== undefined && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({ size: iEvent.left - availableDays });
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event });

        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1);
        }

        const currentAvailableDays = iEvent.left + iEvent.size;

        if (currentAvailableDays < weekLength) {
          const indexNextEvent = indexOf(
            infoWeek,
            (e) => e.id !== iEvent.id && e.left >= currentAvailableDays
          );

          this.insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          );
        } // else: There are no more days available, end of iteration
      } else {
        events.push({ size: weekLength - availableDays });
        // end of iteration
      }
    },

    badgeClasses(computedEvent) {
      if (computedEvent.event !== undefined) {
        return {
          "my-event": true,
          "text-white": true,
          "text-bold": true,
          [`bg-${computedEvent.event.bgcolor}`]: true,
          "rounded-border": true,
          "q-calendar__ellipsis": true,
        };
      }
      return {
        "my-void-event": true,
      };
    },

    badgeStyles(computedEvent, weekLength) {
      const s = {};
      if (computedEvent.size !== undefined) {
        s.width = (100 / weekLength) * computedEvent.size + "%";
      }
      return s;
    },

    isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
      return (
        (dateEnd < weekEnd && dateEnd >= weekStart) ||
        dateEnd === weekEnd ||
        (dateEnd > weekEnd && dateStart <= weekEnd)
      );
    },

    onMoved(data) {
      const tanggalBaru = new Date(data.date);
      this.year = tanggalBaru.getFullYear();
      this.month = tanggalBaru.getMonth() + 1;
      const options = { month: "long", year: "numeric" };
      this.currentmonth = tanggalBaru.toLocaleDateString("id-ID", options);
      this.getPresensi();
    },

    async getPresensi() {
      try {
        const token = sessionStorage.getItem("token");
        const idSiswa = sessionStorage.getItem("idSiswa");
        const response = await this.$api.get(
          `student-attendance/show-by-student/${idSiswa}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;


        const dataPresensi = await Promise.all(
          data.map((Item, index) => {

            const rest = {
                id: index,
                title: Item.status,
                details: Item.status,
                transport: Item.remark ? Item.remark : '',
                start: getCurrentDay(
                new Date(Item.att_date).getDate(),
                Item.att_date
              ),
                end: getCurrentDay(
                new Date(Item.att_date).getDate(),
                Item.att_date
              ),
                bgcolor:
                  Item.status === "Hadir"
                    ? "green"
                    : Item.status === "Izin"
                    ? "amber"
                    : Item.status === "Sakit"
                    ? "blue"
                    : Item.status === "Alfa"
                    ? "red"
                    : "cyan",
              };
              return rest;
          })
        );

        this.events = dataPresensi;
        this.getTotalPresensi(dataPresensi);
      } catch (error) {
        console.log(error);
      }
    },

    async getTotalPresensi(data) {
      let counts = data.reduce(
        (acc, item) => {
          if (item.title === "Sakit") {
            acc.sakit++;
          } else if (item.title === "Izin") {
            acc.izin++;
          } else if (item.title === "Alfa") {
            acc.alfa++;
          }
          return acc;
        },
        { sakit: 0, izin: 0, alfa: 0 }
      );

      this.totalPresensi = counts;
    },
  },
});
</script>

<style lang="sass" scoped>
.my-event
  position: relative
  display: inline-flex
  white-space: normal
  font-size: 12px
  min-height: 30px
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: clip
  overflow: visible
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.my-void-event
  display: inline-flex
  white-space: nowrap
  height: 1px

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.rounded-border
  border-radius: 2px
</style>
