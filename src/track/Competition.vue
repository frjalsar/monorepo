<template>
  <div>
    <p class="lead mb-4">
      Keppnisgreinar þurfa að vera flokkaðar niður á aldurshópa og kyn. Settu saman úr listanum og smelltu á "Bæta við" til að bæta við keppni. Ef þú gerir vitleysu geturðu fjarlægt línuna.
      Þegar er mótið er uppsett geturðu smellt á áfram og yfirfarið skráninguna.
    </p>

    <div class="row mb-4">
      <div class="col-md-3 offset-md-1">
        <label
          for="event"
          class="form-label"
        >Grein</label>
        <select
          id="event"
          v-model="selectedEvent"
          class="form-select"
          :class="{
            'is-valid': validEvent,
            'is-invalid': !validEvent && shake,
            'shake': !validEvent && shake
          }"
          aria-label="event"
        >
          <option
            v-for="event in application.selectedEvents"
            :key="event.id"
            :value="event"
          >
            {{ event.name }}
          </option>
        </select>
      </div>

      <div class="col-md-2">
        <label
          for="gender"
          class="form-label"
        >Kyn</label>
        <select
          id="gender"
          v-model="selectedGender"
          class="form-select"
          :class="{
            'is-valid': validGender,
            'is-invalid': !validGender && shake,
            'shake': !validGender && shake
          }"
          aria-label="gender"
        >
          <option
            v-for="gender in genders"
            :key="gender.id"
            :value="gender"
          >
            {{ gender.text }}
          </option>
        </select>
      </div>

      <div class="col-md-1">
        <label
          for="ageFrom"
          class="form-label"
        >Aldur frá</label>
        <input
          id="ageFrom"
          v-model="ageFrom"
          type="text"
          class="form-control"
        >
      </div>

      <div class="col-md-1">
        <label
          for="ageTo"
          class="form-label"
        >Aldur til</label>
        <input
          id="ageTo"
          v-model="ageTo"
          type="text"
          class="form-control"
        >
      </div>

      <div class="col-md-3 text-start">
        <button
          type="button"
          class="btn btn-primary add"
          :class="{
            'shake': !validCompetition && shake
          }"
          @click="add"
        >
          Bæta við
        </button>
        <button
          type="button"
          class="btn btn-outline-primary add ms-3"
          @click="addAll"
        >
          Skrá allt
        </button>
      </div>
      <div class="col-md-2 text-start" />
    </div>

    <div
      v-for="(item, index) in competition"
      :key="item"
      class="row mb-3"
    >
      <div class="col-md-3 offset-md-1">
        {{ item.event.name }}
      </div>
      <div class="col-md-2">
        {{ item.gender && item.gender.text }}
      </div>
      <div class="col-md-1">
        {{ item.ageFrom }}
      </div>
      <div class="col-md-1">
        {{ item.ageTo }}
      </div>
      <div class="col-md-2 text-start">
        <button
          type="button"
          class="btn btn-warning"
          @click="remove(index)"
        >
          Eyða línu
        </button>
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
  data () {
    return {
      selectedEvent: undefined,
      selectedGender: undefined,
      ageFrom: undefined,
      ageTo: undefined,
      competition: [],
      genders: [{
        id: 1,
        text: 'Karlar'
      }, {
        id: 2,
        text: 'Konur'
      }],
      shake: false
    }
  },
  computed: {
    validCompetition () {
      return this.competition.length > 0
    },
    validEvent () {
      return this.selectedEvent && this.selectedEvent.id
    },
    validGender () {
      return this.selectedGender && this.selectedGender.id
    },
    isValid () {
      return this.validCompetition
    }
  },
  created () {
    this.competition = this.application.competition || []
  },
  methods: {
    add () {
      this.shake = false

      if (this.validEvent && this.validGender) {
        this.competition.push({
          event: this.selectedEvent,
          selectedGender: this.gender,
          ageFrom: this.ageFrom,
          ageTo: this.ageTo
        })

        this.selectedEvent = undefined
        this.selectedGender = undefined
        this.ageFrom = undefined
        this.ageTo = undefined
      } else {
        this.shake = true
      }
    },
    addAll () {
      this.application.selectedEvents.forEach(event => {
        this.genders.forEach(gender => {
          this.competition.push({
            event,
            gender
          })
        })
      })
    },
    remove (index) {
      this.competition.splice(index, 1)
    },
    back () {
      this.$emit('back')
    },
    next () {
      if (this.isValid) {
        this.$emit('next', {
          competition: this.competition
        })
      } else {
        this.shake = true
      }
    }
  }
}
</script>

<style scoped>
button.add {
  margin-top: 2rem;
}
</style>
