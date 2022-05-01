<template>
  <div>
    <p class="lead mb-4">
      {{ isRun ? 'Hlaupagreinar' : 'Keppnisgreinar' }} þurfa að vera flokkaðar niður á aldurshópa og kyn. Settu saman úr listanum og smelltu á "Bæta við" til að bæta við keppni. Ef þú gerir vitleysu geturðu fjarlægt línuna.
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
      <div class="col-md-1 text-start" />
    </div>

    <div
      v-for="(item, index) in competition"
      :key="item"
      class="row mb-3"
    >
      <div class="col-md-3 offset-md-1">
        {{ item.event.name }}
        <small
          v-if="item.equipment"
          style="margin-left: .5rem;"
        >
          {{ item.equipment?.value }} {{ item.equipment?.unit }}
        </small>
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
      }, {
        id: -1,
        text: 'Bæði kyn'
      }],
      equipment: [],
      shake: false
    }
  },
  computed: {
    isRun() {
      return this.application.type === 'hlaup'
    },
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
    agent
      .get(this.FRI_API_URL + '/equipment')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.equipment = res.body
      })

    this.competition = this.application && this.application.competition ? this.application.competition : []
  },
  methods: {
    getEquipment (event, gender, age) {
      const foundEquipment = this.equipment.filter(eq => {
        const correctEvent = eq.eventId === event.id
        const correctGender = eq.gender === gender.id
        let correctAge = true
        if (age) {
          correctAge = eq.age <= this.ageTo
        }

        return correctEvent && correctGender && correctAge
      })

      if (foundEquipment.length) {
        return foundEquipment[foundEquipment.length - 1]
      }

      return undefined
    },
    add () {
      this.shake = false

      if (this.selectedGender.id === -1 && this.validEvent) {
        this.competition.push({
          event: this.selectedEvent,
          gender: this.genders[0],
          ageFrom: this.ageFrom,
          ageTo: this.ageTo,
          equipment: this.getEquipment(this.selectedEvent, this.selectedGender, this.ageTo)
        })

        this.competition.push({
          event: this.selectedEvent,
          gender: this.genders[1],
          ageFrom: this.ageFrom,
          ageTo: this.ageTo,
          equipment: this.getEquipment(this.selectedEvent, this.selectedGender, this.ageTo)
        })
      } else if (this.validEvent && this.validGender) {
        this.competition.push({
          event: this.selectedEvent,
          gender: this.selectedGender,
          ageFrom: this.ageFrom,
          ageTo: this.ageTo,
          equipment: this.getEquipment(this.selectedEvent, this.selectedGender, this.ageTo)
        })
      } else {
        this.shake = true
      }

      this.selectedEvent = undefined
      this.selectedGender = undefined
      this.ageFrom = undefined
      this.ageTo = undefined
    },
    addAll () {
      this.application.selectedEvents.forEach(event => {
        this.genders
          .filter(gender => gender.id !== -1)
          .forEach(gender => {
            this.competition.push({
              event,
              gender,
              equipment: this.getEquipment(event, gender)
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
