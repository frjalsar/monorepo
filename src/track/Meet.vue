<template>
<div>
   
  <p class="lead mb-4">
    Þá eru það almennar upplýsingar um mótið sjálft.
  </p>

  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          :class="{
            'is-valid': validMeetName,
            'is-invalid': !validMeetName && shake,
            'shake': !validMeetName && shake
          }"
          id="meetName"
          placeholder="Heiti móts"
          v-model="meetName"
        />
        <label for="meetName">Heiti móts</label>
      </div>
    </div>
  </div>

   <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="meetLocation"
          placeholder="Staðsetning"
          v-model="meetLocation"
        />
        <label for="meetLocation">Staðsetning</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating">
        <select
          class="form-select"
          :class="{
            'is-valid': validMeetVenue,
            'is-invalid': !validMeetVenue && shake,
            'shake': !validMeetVenue && shake
          }"
          id="meetVenues"
          aria-label="Mannvirki"
          v-model="meetVenue"
        >
          <option :value="undefined">Mannvirki</option>
          <option v-for="venue in venues" :key="venue.id" :value="venue">{{ venue.fullName }}</option>          
        </select>
        <label for="meetVenues">Mannvirki</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          :class="{
            'is-valid': validMeetStart,
            'is-invalid': !validMeetStart && shake,
            'shake': !validMeetStart && shake
          }"
          id="meetStart"
          placeholder="Hefst"
          v-model="meetStart"
          v-maska="'##.##.#### kl. ##:##'"
        />
        <label for="meetStart">Hefst <small class="text-secondary">(dd.mm.yyyy kl. hh:mm)</small></label>
      </div>
    </div>


    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          :class="{
            'is-valid': validMeetEnd,
            'is-invalid': !validMeetEnd && shake,
            'shake': !validMeetEnd && shake
          }"
          id="meetEnd"
          placeholder="Lýkur"
          v-model="meetEnd"
          v-maska="'##.##.#### kl. ##:##'"
        />
        <label for="meetEnd">Lýkur <small class="text-secondary">(dd.mm.yyyy kl. hh:mm)</small></label>
      </div>
    </div>   
  </div>

  <div class="row">
    <div class="col mx">
      <button type="button" class="btn btn-secondary btn-lg py-3 my-3" @click="back">
        Til baka
      </button>
      <button type="button" class="btn btn-primary btn-lg py-3 my-3 mx-3" @click="next">
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
  props: ['data'],
  emits: ['back', 'next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      meetName: undefined,
      meetLocation: undefined,
      meetVenue: undefined,
      meetStart: undefined,      
      meetEnd: undefined,      
      venues: [],
      shake: false,
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
  methods: {
    back() {
      this.$emit('back')
    },
    next() {
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
    toDate(date) {
      if (date) {
        const meetStartParts = date.split(' ')
        if (meetStartParts.length === 3) {
          const date = meetStartParts[0].split('.')
          const time = meetStartParts[2].split(':')

          if (date.length === 3 && time.length == 2) {
            const dd = Number(date[0])
            const mm = Number(date[1])
            const yyyy = Number(date[2])
            const hh = Number(time[0])
            const m = Number(time[1])          

            if (dd > 0 && dd < 32 && mm > 0 && mm < 13 && yyyy > 1900) {
              return new Date(yyyy, mm-1, dd, hh, m)
            }
          }
        }
      }

      return undefined     
    }
  },
  created() {
    this.meetName = this.data.meetName || undefined
    this.meetLocation = this.data.meetLocation || undefined
    this.meetVenue = this.data.meetVenue || undefined

    agent
      .get(this.FRI_API_URL + '/venues')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.venues = res.body
      })
  }
};
</script>