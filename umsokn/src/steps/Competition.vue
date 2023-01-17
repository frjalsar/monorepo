<template>
  <div>
    <p class="lead mb-4">
      {{ isRun ? 'Hlaupagreinar' : 'Keppnisgreinar' }} þurfa að vera flokkaðar niður á aldurshópa og kyn. Til að flýta fyrir skráningu getur þú smellt
      á fyrirfram skilgreinda aldurshópa og kerfið setur þá upp fyrir þig samkvæmt reglugerð.
      Þú getur líka sett saman úr listanum eftir hentugleika og smellt á "Bæta við" til að bæta keppni við.
    </p>

    <div class="row mb-4">
      <div class="col">
        <button
          class="btn btn-outline-primary mx-3 my-2"
          @click="addAge(0, 10)"
        >
          10 ára og yngri
        </button>
        <button
          class="btn btn-outline-primary mx-3 my-2"
          @click="addAge(11, 15)"
        >
          11 - 15 ára
        </button>
        <button
          class="btn btn-outline-primary mx-3 my-2"
          @click="addAge(16, 22)"
        >
          16-22 ára
        </button>
        <button
          class="btn btn-outline-primary mx-3 my-2"
          @click="addAdults()"
        >
          Fullorðnir (án aldursflokka)
        </button>
        <button
          class="btn btn-outline-primary mx-3 my-2"
          @click="addAge(30, 100)"
        >
          30+ (öldungar)
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-3 offset-md-2">
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
      </div>
      <div class="col-md-1 text-start" />
    </div>

    <div
      v-for="(item, index) in competition"
      :key="item"
      class="row mb-3"
    >
      <div class="col-md-3 offset-md-2">
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
  inject: ['FRI_API_URL', 'FRI_API_KEY'],
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
      ageGroups: [],
      shake: false
    }
  },
  computed: {
    isRun () {
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
      .auth(this.FRI_API_KEY, { type: 'bearer' })
      .then(res => {
        this.equipment = res.body
      })

    agent
      .get(this.FRI_API_URL + '/agegroups')
      .auth(this.FRI_API_KEY, { type: 'bearer' })
      .then(res => {
        this.ageGroups = res.body
      })

    this.competition = this.application && this.application.competition ? this.application.competition : []
  },
  methods: {
    getEquipment (event, gender, ageFrom, ageTo) {
      const adultAge = 23
      const minAge = ageFrom || 0
      const foundEquipment = this.equipment.filter(eq => {
        const correctEvent = eq.eventId === event.id
        const correctGender = eq.gender === gender.id

        // default to adult unless age is given
        let correctAge = eq.age === adultAge
        if (ageTo) {
          correctAge = eq.age >= minAge && eq.age <= ageTo
        }

        return correctEvent && correctGender && correctAge
      })

      return foundEquipment.reduce((max, element) => {
        return element.value > max.value ? element : max
      }, foundEquipment[0])
    },
    add () {
      this.shake = false

      if (this.validGender && this.validEvent) {
        if (this.selectedGender.id === -1) {
          this.competition.push({
            event: this.selectedEvent,
            gender: this.genders[0],
            ageFrom: this.ageFrom,
            ageTo: this.ageTo,
            equipment: this.getEquipment(this.selectedEvent, this.genders[0], this.ageFrom, this.ageTo)
          })

          this.competition.push({
            event: this.selectedEvent,
            gender: this.genders[1],
            ageFrom: this.ageFrom,
            ageTo: this.ageTo,
            equipment: this.getEquipment(this.selectedEvent, this.genders[0], this.ageFrom, this.ageTo)
          })

          this.selectedEvent = undefined
          this.selectedGender = undefined
          this.ageFrom = undefined
          this.ageTo = undefined
        } else {
          this.competition.push({
            event: this.selectedEvent,
            gender: this.selectedGender,
            ageFrom: this.ageFrom,
            ageTo: this.ageTo,
            equipment: this.getEquipment(this.selectedEvent, this.selectedGender, this.ageFrom, this.ageTo)
          })

          this.selectedEvent = undefined
          this.selectedGender = undefined
          this.ageFrom = undefined
          this.ageTo = undefined
        }
      } else {
        this.shake = true
      }
    },
    addAge (min, max) {
      this.application.selectedEvents.forEach(event => {
        this.ageGroups
          .filter(ageGroup => ageGroup.from >= min && ageGroup.from <= max)
          .forEach(ageGroup => {
            this.genders
              .filter(gender => gender.id !== -1)
              .forEach(gender => {
                this.competition.push({
                  event,
                  gender,
                  equipment: this.getEquipment(event, gender, ageGroup.from, ageGroup.to),
                  ageFrom: ageGroup.from,
                  ageTo: ageGroup.to
                })
              })
          })
      })
    },
    addAdults () {
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
