<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import idLocale from "@fullcalendar/core/locales/id";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        weekends: false,
        locale: idLocale,
        slotMinTime: "07:30:00",
        slotMaxTime: '16:30:00',
        // eventMinHeight: 20,
      

        events: [
          {
            title: "Meeting",
            start: "2024-04-25T10:00:00",
            end: "2024-04-25T12:30:00",
          },
          {
            title: "Workout",
            start: "2024-04-25T08:00:00",
            end: "2024-04-25T10:00:00",
          },
        ],
        eventColor: "#1679AB", // Set a default color for events
        eventClick: function (info) {
          alert("Event: " + info.event.title); // Show an alert when an event is clicked
        },
      },
    };
  },
};
</script>

<template>
  <div class="flex tw-w-full tw-flex-col tw-justify-center tw-items-center tw-mt-10">
    <div class="tw-w-5/6 " style="height: 600px">
      <div class="flex tw-w-full tw-flex-col tw-justify-center tw-items-center tw-mt-10">
        <span class="tw-text-3xl text-center">Kalender Pekanan</span>
      </div>
      <FullCalendar :options="calendarOptions" class="tw-h-full"/>
    </div>
  </div>
</template>
