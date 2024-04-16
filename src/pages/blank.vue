<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2 text-center">
        <p class="text-bold">
          <span style="font-size: 3rem">12:30</span> <br />
          senin,20 Agustus 2023
        </p>
      </div>
      <div class="col-md-8"></div>
      <div class="col-md-2 text-right q-pr-md q-pb-md">
        <br />
        <q-img src="../assets/sade.png" style="width: 40%"></q-img>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-card class="text-center bg-blue-2" style="height: 87vh">

          <q-card-section>
            <div class="text-center">
              <p>
                <span class="text-center text-black text-bold" style="font-size: x-large">Blank</span>
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('mails'),
      innerTab: ref('innerMails'),
      small: ref(false),
      medium: ref(false),
      splitterModel: ref(20),
      shape: ref(),
      shape2: ref(),
      model: ref(null)
    }
  }
}
</script>
