<template>
  <div class="text-center tw-mt-10">
    <span class="text-center text-black text-bold" style="font-size: x-large"
      >RENCANA PEKANAN</span
    >
  </div>
  <div class="subcontent tw-mt-10">
    <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />
    <div class="row justify-center">
      <div style="display: flex; width: 100%; height: 600px">
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          view="week"
          :hour24-format="hour24"
          :interval-minutes="60 * intervalRangeStep"
          :interval-start="intervalStart"
          :interval-count="intervalCount"
          bordered
          animated
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { QCalendarDay, today } from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";

import { defineComponent } from "vue";
import NavigationBar from "../../components/NavigationBar.vue";
export default defineComponent({
  name: "Week24Hour",
  components: {
    NavigationBar,
    QCalendarDay,
  },
  data() {
    return {
      selectedDate: today(),
      hour24: true,
      intervalRangeStep: 0.5,
      intervalRange: { min: 6, max: 18 },
    };
  },
  computed: {
    intervalStart() {
      return this.intervalRange.min * (1 / this.intervalRangeStep);
    },

    intervalCount() {
      return (
        (this.intervalRange.max - this.intervalRange.min) *
        (1 / this.intervalRangeStep)
      );
    },
  },
  methods: {
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },

    onMoved(data) {
      console.log("onMoved", data);
    },
    onChange(data) {
      console.log("onChange", data);
    },
    onClickDate(data) {
      console.log("onClickDate", data);
    },
    onClickTime(data) {
      console.log("onClickTime", data);
    },
    onClickInterval(data) {
      console.log("onClickInterval", data);
    },
    onClickHeadIntervals(data) {
      console.log("onClickHeadIntervals", data);
    },
    onClickHeadDay(data) {
      console.log("onClickHeadDay", data);
    },
  },
});
</script>
