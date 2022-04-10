<template>
  <div>
    <p class="lead mb-4">
      Þá eru það almennar upplýsingar um hlaupið sjálft.
    </p>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetName"
            v-model="meetName"
            type="text"
            class="form-control"
            placeholder="Heiti móts"
          >
          <label for="meetName">Heiti hlaups</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetLocation"
            v-model="meetLocation"
            type="text"
            class="form-control"
            placeholder="Staðsetning / ræst frá"
          >
          <label for="meetLocation">Staðsetning / ræst frá</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="meetStartDate"
            v-model="meetStartDate"
            type="date"
            class="form-control"
            placeholder="Hefst"
          >
          <label for="meetStartDate">Hefst</label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            id="meetStartTime"
            v-model="meetStartTime"
            type="time"
            class="form-control"
            placeholder="Klukkan"
          >
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
        >
          Áfram
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RunMeet',
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
      meetName: '',
      meetLocation: '',
      meetVenue: undefined,
      meetStartDate: undefined,
      meetStartTime: undefined
    }
  },
  computed: {
    meetStart () {
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
    }
  },
  methods: {
    next () {
      this.$emit('next', {
        meetName: this.meetName,
        meetLocation: this.meetLocation,
        meetStart: this.meetStart
      })
    }
  }
}
</script>
