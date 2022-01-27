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
        <input type="date" class="form-control" id="meetStart" placeholder="Hefst" v-model="meetStart">
        <label for="meetStart">Hefst</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input type="date" class="form-control" id="meetEnd" placeholder="Lýkur" v-model="meetEnd">
        <label for="meetEnd">Lýkur</label>
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
  props: ['data'],
  emits: ['next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      meetName: '',
      meetLocation: '',
      meetVenue: undefined,
      meetStart: undefined,
      meetEnd: undefined,
      venues: []
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