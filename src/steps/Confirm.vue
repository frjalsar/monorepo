<template>
  <div>
    <p class="lead mb-4">
      Nú getur þú farið yfir skráninguna. Með því að ýta á staðfesta sendist umsóknin til FRÍ sem fer hana og sendir þér síðan svar.
      Verði umsóknin samþykkt birtist mótið í mótadagatali FRÍ á fri.is
    </p>

    <div class="row mb-3">
      <div class="col-md-4 offset-md-2">
        <h2>Ábyrgðaraðili</h2>
        {{ application.organizerName }}<br>
        {{ application.organizerKt }}
      </div>
      <div class="col-md-4">
        <h2>{{ isRun ? 'Hlaupstjóri' : 'Mótsstjóri' }}</h2>
        {{ application.contactName }}<br>
        {{ application.contactEmail }}<br>
        {{ application.contactPhone }}
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4 offset-md-2">
        <h2>{{ isRun ? 'Hlaup' : 'Mót' }}</h2>
        {{ application.meetName }}<br>
        {{ application.meetVenue && application.meetVenue.fullName }}<br>
        {{ application.meetLocation }}
      </div>
      <div class="col-md-4">
        <h2>Dómari</h2>
        {{ application.judge && application.judge.fullName }}<br>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4 offset-md-2">
        <h2>Keppni</h2>
        <div
          v-for="item in application.competition"
          :key="item"
        >
          {{ item.event && item.event.name }}, {{ item.ageFrom }} - {{ item.ageTo }} ára, {{ item.gender && item.gender.text }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mx">
        <button
          type="button"
          class="btn btn-secondary btn-lg py-3 my-3"
          @click="back"
        >
          Til baka
        </button>
        <button
          type="button"
          class="btn btn-primary btn-lg py-3 my-3 mx-3"
          @click="next"
        >
          Staðfesta
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'TrackConfirm',
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  computed: {
    isRun () {
      return this.application.type === 'hlaup'
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    next () {
      agent
        .post(this.FRI_API_URL + '/meets')
        .send({
          name: this.application.meetName,
          organizerName: this.application.organizerName,
          organizerKt: this.application.organizerKt,
          contactName: this.application.contactName,
          contactEmail: this.application.contactEmail,
          contactPhone: this.application.contactPhone,
          location: this.application.meetLocation,
          venueId: this.application.meetVenue ? this.application.meetVenue.id : undefined,
          judgeId: this.application.judge ? this.application.judge.id : undefined,
          startDate: this.application.meetStart,
          endDate: this.application.meetEnd,
          competition: this.application.competition.map(item => ({
            eventId: item.event ? item.event.id : undefined,
            ageFrom: item.ageFrom,
            ageTo: item.ageTo,
            gender: item.gender ? item.gender.id : undefined
          })),
          base64Attachment: this.application.base64Attachment
        })
        .auth(this.FRI_API_TOKEN, { type: 'bearer' })
        .then(() => {
          this.$emit('next', { success: true })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
