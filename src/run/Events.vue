<template>
  <div>
    <p class="lead mb-4">
      Veldu þær greinar sem verða á mótinu.
    </p>
    <div class="row">
      <div
        v-for="(type, index) in eventTypes"
        :key="type.id"
        class="col-md-3 mb-3 text-start"
        :class="{ 'offset-md-2': index % 3 === 0}"
      >
        <strong>{{ type.name }}</strong>
        <div
          v-for="event in eventsByType[type.id]"
          :key="event.id"
          class="form-check"
        >
          <input
            :id="'event-' + event.id"
            v-model="selectedEvents"
            class="form-check-input"
            type="checkbox"
            :value="event"
          >
          <label
            :id="'event-' + event.id"
            class="form-check-label"
          >
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
        >
          Áfram
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'
import agent from 'superagent'

export default {
  name: 'RunEvents',
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['next'],
  data () {
    return {
      events: [],
      eventTypes: [],
      selectedEvents: []
    }
  },
  computed: {
    eventsByType () {
      const eventsByType = groupBy(this.events, 'typeId')
      return eventsByType
    }
  },
  created () {
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
          const hasRoad = type.name.includes('Götu')
          const hasOff = type.name.includes('Utan')

          return (hasRoad || hasOff)
        })
      })
  },
  methods: {
    next () {
      this.$emit('next', {
        selectedEvents: this.selectedEvents
      })
    }
  }
}
</script>
