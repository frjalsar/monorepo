<template>
  <div>
    <p class="lead mb-4">
      Þá eru það almennar upplýsingar um mótið sjálft.
    </p>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetName"
            v-model="meetName"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validMeetName,
              'is-invalid': !validMeetName && shake,
              'shake': !validMeetName && shake
            }"
            placeholder="Heiti móts"
          >
          <label for="meetName">Heiti móts</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetLocation"
            v-model="meetLocation"
            type="text"
            class="form-control"
            placeholder="Staðsetning"
          >
          <label for="meetLocation">Staðsetning</label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating">
          <select
            id="meetVenues"
            v-model="meetVenue"
            class="form-select"
            :class="{
              'is-valid': validMeetVenue,
              'is-invalid': !validMeetVenue && shake,
              'shake': !validMeetVenue && shake
            }"
            aria-label="Mannvirki"
          >
            <option :value="undefined">
              Mannvirki
            </option>
            <option
              v-for="venue in venues"
              :key="venue.id"
              :value="venue"
            >
              {{ venue.fullName }}
            </option>
          </select>
          <label for="meetVenues">Mannvirki</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetStart"
            v-model="meetStart"
            v-maska="'##.##.#### kl. ##:##'"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validMeetStart,
              'is-invalid': !validMeetStart && shake,
              'shake': !validMeetStart && shake
            }"
            placeholder="Hefst"
          >
          <label for="meetStart">Hefst <small class="text-secondary">(dd.mm.yyyy kl. hh:mm)</small></label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            id="meetEnd"
            v-model="meetEnd"
            v-maska="'##.##.#### kl. ##:##'"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validMeetEnd,
              'is-invalid': !validMeetEnd && shake,
              'shake': !validMeetEnd && shake
            }"
            placeholder="Lýkur"
          >
          <label for="meetEnd">Lýkur <small class="text-secondary">(dd.mm.yyyy kl. hh:mm)</small></label>
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
          Áfram
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'TrackMeet',
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  data () {
    return {
      meetName: undefined,
      meetLocation: undefined,
      meetVenue: undefined,
      meetStart: undefined,
      meetEnd: undefined,
      venues: [],
      shake: false
    }
  },
  computed: {
    validMeetName () {
      return this.meetName && this.meetName.length > 3
    },
    validMeetVenue () {
      return this.meetVenue && this.meetVenue.id
    },
    validMeetStart () {
      const d = this.toDate(this.meetStart)
      return !isNaN(d)
    },
    validMeetEnd () {
      const d = this.toDate(this.meetEnd)
      return !isNaN(d)
    },
    isValid () {
      return this.validMeetName && this.validMeetVenue && this.validMeetStart && this.validMeetEnd
    }
  },
  created () {
    this.meetName = this.application.meetName || undefined
    this.meetLocation = this.application.meetLocation || undefined
    this.meetVenue = this.application.meetVenue || undefined

    agent
      .get(this.FRI_API_URL + '/venues')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.venues = res.body
      })
  },
  methods: {
    back () {
      this.$emit('back')
    },
    next () {
      this.shake = false

      if (this.isValid) {
        this.$emit('next', {
          meetName: this.meetName,
          meetLocation: this.meetLocation,
          meetVenue: this.meetVenue,
          meetStart: this.toDate(this.meetStart),
          meetEnd: this.toDate(this.meetEnd)
        })
      } else {
        this.shake = true
      }
    },
    toDate (date) {
      if (date) {
        const meetStartParts = date.split(' ')
        if (meetStartParts.length === 3) {
          const date = meetStartParts[0].split('.')
          const time = meetStartParts[2].split(':')

          if (date.length === 3 && time.length === 2) {
            const dd = Number(date[0])
            const mm = Number(date[1])
            const yyyy = Number(date[2])
            const hh = Number(time[0])
            const m = Number(time[1])

            if (dd > 0 && dd < 32 && mm > 0 && mm < 13 && yyyy > 1900) {
              return new Date(yyyy, mm - 1, dd, hh, m)
            }
          }
        }
      }

      return undefined
    }
  }
}
</script>
