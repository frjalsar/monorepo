<template>
<div>

  <p class="lead mb-4">
    Keppnisgreinar þurfa að vera flokkaðar niður á aldurshópa og kyn. Settu saman úr listanum og smelltu á "Bæta við" til að bæta við keppni. Ef þú gerir vitleysu geturðu fjarlægt línuna.
    Þegar er mótið er uppsett geturðu smellt á áfram og yfirfarið skráninguna.
  </p>

  <div class="row mb-4">
    
    <div class="col-md-3 offset-md-2">
      <label for="event" class="form-label">Grein</label>
      <select
        class="form-select"
        :class="{
          'is-valid': validEvent,
          'is-invalid': !validEvent && shake,
          'shake': !validEvent && shake
        }"
        id="event"
        aria-label="event"
        v-model="event"
      >
        <option v-for="event in data.selectedEvents" :key="event.id" :value="event">{{ event.name }}</option>
      </select>              
    </div>
    
    <div class="col-md-2">
      <label for="gender" class="form-label">Kyn</label>
      <select
        class="form-select"
        :class="{
          'is-valid': validGender,
          'is-invalid': !validGender && shake,
          'shake': !validGender && shake
        }"
        id="gender"
        aria-label="gender"
        v-model="gender"
      >
        <option v-for="gender in genders" :key="gender.id" :value="gender">{{ gender.text }}</option>
      </select>
    </div>

    <div class="col-md-1">
      <label for="ageFrom" class="form-label">Aldur frá</label>
      <input type="text" class="form-control" id="ageFrom" v-model="ageFrom">              
    </div>

    <div class="col-md-1">
      <label for="ageTo" class="form-label">Aldur til</label>
      <input type="text" class="form-control" id="ageTo" v-model="ageTo">        
    </div>
    
    <div class="col-md-2 text-start" >
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
  </div>

  <div class="row mb-3" v-for="(item, index) in competition" :key="item">
    <div class="col-md-3 offset-md-2">
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
    <div class="col-md-2 text-start" >
      <button type="button" class="btn btn-warning" @click="remove(index)">Eyða línu</button>
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
export default {
  name: 'TrackConfirm',
  props: ['data'],
  emits: ['back', 'next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      event: undefined,
      ageFrom: undefined,
      ageTo: undefined,
      gender: undefined,
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
      return this.event && this.event.id
    },
    validGender () {
      return this.gender && this.gender.id
    },
    isValid() {
      return this.validCompetition
    },    
  },
  methods: {
    add() {
      this.shake = false

      if (this.validEvent && this.validGender) {
        this.competition.push({
          event: this.event,
          ageFrom: this.ageFrom,
          ageTo: this.ageTo,
          gender: this.gender
        })

        this.event = undefined,
        this.ageFrom = undefined,
        this.ageTo = undefined,
        this.gender = undefined
      } else {
        this.shake = true
      }
    },
    remove(index) {
      this.competition.splice(index, 1)
    },
    back() {
      this.$emit('back')
    },
    next() {
      if (this.isValid) {
        this.$emit('next', {
          competition: this.competition
        })
      } else {
        this.shake = true
      }
    }    
  },
  created() {
    this.competition = this.data.competition || []
  }
};
</script>

<style scoped>
button.add {
  margin-top: 2rem;
}
</style>