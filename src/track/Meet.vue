<template>
<div>
   
  <p class="lead mb-4">
    Þá eru það almennar upplýsingar um mótið sjálft.
  </p>

  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="meetName" placeholder="Heiti móts" v-model="meetName">
        <label for="meetName">Heiti móts</label>
      </div>
    </div>
  </div>

   <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="meetLocation" placeholder="Staðsetning" v-model="meetLocation">
        <label for="meetLocation">Staðsetning</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating">
        <select class="form-select" id="meetVenues" aria-label="Mannvirki" v-model="meetVenue">
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
        <input type="date" class="form-control" id="meetStartDate" placeholder="Hefst" v-model="meetStartDate">
        <label for="meetStartDate">Hefst</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input type="time" class="form-control" id="meetStartTime" placeholder="Klukkan" v-model="meetStartTime">
        <label for="meetStartTime">Klukkan</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="meetEndDate" placeholder="Lýkur" v-model="meetEndDate">
        <label for="meetEndDate">Lýkur</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input type="time" class="form-control" id="meetEndTime" placeholder="Klukkan" v-model="meetEndTime">
        <label for="meetEndTime">Klukkan</label>
      </div>
    </div>
  </div>
  
  <div class="row">
    <div class="col">
      <button
        type="button"
        class="btn btn-primary btn-lg py-3 my-3"
        @click="next"
      >Áfram</button>
    </div>    
  </div>

</div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'TrackMeet',
  props: ['data'],
  emits: ['next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      meetName: '',
      meetLocation: '',
      meetVenue: undefined,
      meetStartDate: undefined,
      meetStartTime: undefined,
      meetEndDate: undefined,
      meetEndTime: undefined,
      venues: []
    }
  },
  computed: {
    meetStart() {
      if (!this.meetStartDate) {
        return undefined
      }

      const meetStartDate = new Date(this.meetStartDate)      
      const day = meetStartDate.getDate()
      const month = meetStartDate.getMonth()
      const year = meetStartDate.getFullYear()      
      
      let hours = 0
      let minutes = 0
      
      if (this.meetStartTime) {
        const meetStartTime = this.meetStartTime.split(':')      
        if (meetStartTime.length === 2) {
          hours = meetStartTime[0]
          minutes = meetStartTime[1]
        }
      }

      return new Date(year, month, day, hours, minutes)      
    },
    meetEnd () {
      if (!this.meetEndDate) {
        return undefined
      }

      const meetEndDate = new Date(this.meetEndDate)
      const day = meetEndDate.getDate()
      const month = meetEndDate.getMonth()
      const year = meetEndDate.getFullYear()

      let hours = 0
      let minutes = 0

      if (this.meetEndTime) {
      const meetEndTime = this.meetEndTime.split(':')
        if (meetEndTime.length === 2) {
          hours = meetEndTime[0]
          minutes = meetEndTime[1]
        }
      }
      

      return new Date(year, month, day, hours, minutes)
    }    
  },
  methods: {
    next() {
      this.$emit('next', {
        meetName: this.meetName,
        meetLocation: this.meetLocation,
        meetVenue: this.meetVenue,
        meetStart: this.meetStart,
        meetEnd: this.meetEnd
      })
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/venues')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.venues = res.body
      })
  }
};
</script>