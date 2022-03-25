<template>
<div>
   
  <p class="lead mb-4">
    Þá eru það almennar upplýsingar um hlaupið sjálft.
  </p>

  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="meetName" placeholder="Heiti móts" v-model="meetName">
        <label for="meetName">Heiti hlaups</label>
      </div>
    </div>
  </div>

   <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="meetLocation" placeholder="Staðsetning / ræst frá" v-model="meetLocation">
        <label for="meetLocation">Staðsetning / ræst frá</label>
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
  name: 'RunMeet',
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
  },
  methods: {
    next() {
      this.$emit('next', {
        meetName: this.meetName,
        meetLocation: this.meetLocation,
        meetStart: this.meetStart,
      })
    }
  },  
};
</script>