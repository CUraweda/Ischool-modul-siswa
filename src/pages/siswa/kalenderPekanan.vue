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
            <q-card style="height: 600px" class="tw-p-3">
              <FullCalendar :options="calendarOptions" style="height: 550px" />
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
        slotMaxTime: "16:30:00",
       
        headerToolbar: {
          start: "today",
          center: "title",
          end: "prev next",
        },

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
