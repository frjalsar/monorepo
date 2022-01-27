<template>
<div>
   
  <p class="lead mb-4">
    Veldu þær greinar sem verða á mótinu.
  </p>
  <div class="row">    
    <div v-for="(type, index) in eventTypes" :key="type.id" class="col-md-3 mb-3 text-start" :class="{ 'offset-md-2': index % 3 === 0}">
      <strong>{{ type.name }}</strong>
      <div class="form-check" v-for="event in eventsByType[type.id]" :key="event.id">
        <input class="form-check-input" type="checkbox" :value="event" :id="'event-' + event.id" v-model="selectedEvents">
        <label class="form-check-label" :id="'event-' + event.id">
          {{ event.name }}
        </label>
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
import groupBy from 'lodash.groupby'
import agent from 'superagent'

export default {
  props: ['data'],
  emits: ['next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      events: [],
      eventTypes: [],
      selectedEvents: []
    }
  },
  computed: {
    eventsByType() {
      const eventsByType = groupBy(this.events, 'typeId')
      return eventsByType
    }  
  },
  methods: {
    next() {
      this.$emit('next', {
        selectedEvents: this.selectedEvents
      })
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/events')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.events = res.body
      })

    agent
      .get(this.FRI_API_URL + '/eventtypes')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.eventTypes = res.body.filter(type => {
          console.log(type)
          const hasRoad = type.name.includes('Götu')
          const hasOff = type.name.includes('Utan')

          return !(hasRoad || hasOff)
        })
      })
  }
};
</script>