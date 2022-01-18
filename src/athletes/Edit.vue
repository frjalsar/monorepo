<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Nafn</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.fullName">
    </div>

    <div class="col-md-4">
      <label for="name" class="form-label">Kennitala</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.kt">
    </div>

    <div class="col-md-2">
      <label for="name" class="form-label">Fæðingarár</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.birthyear">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="name" class="form-label">Kyn</label>      
      <select class="form-select" v-model="currAthlete.gender">
        <option v-for="gender in genders" :key="gender.value" :value="gender.value">{{ gender.text }}</option>        
      </select>
    </div>    

    <div class="col-md-4">
      <label for="name" class="form-label">Land</label>      
      <select class="form-select" v-model="currAthlete.country">
        <option v-for="country in countries" :key="country.value" :value="country.value">{{ country.text }}</option>        
      </select>
    </div>    
  </div>

  <hr class="my-4" />

  <div
    class="row g-3 mb-3"
    v-for="(m, index) in currAthlete.membership"
    :key="m.clubId + '-' + m.from"
  >
    <div class="col-md-6">
      <label for="name" class="form-label" v-if="index === 0">Félag</label>      
      <select class="form-select" v-model="m.clubId">
        <option v-for="club in clubsByRegion(m.legacyClub)" :key="club.id" :value="club.id">{{ club.fullName }}</option>        
      </select>
      <div v-if="m.legacyClub" class="form-text">Viðkomandi var skráður í <em>{{ m.legacyClub }}</em> en ekki félag í gamla grunninum. Vinsamlegast lagið.</div>
    </div>
    
    <div class="col-md-2">
      <label for="name" class="form-label" v-if="index === 0">Frá</label>
      <input type="name" class="form-control" id="name" v-model="m.from">
    </div>

    <div class="col-md-2">
      <label for="name" class="form-label" v-if="index === 0">Til</label>
      <input type="name" class="form-control" id="name" v-model="m.to">
    </div>

    <div class="col-md-1 offset-md-1">
      <div class="form-label" v-if="index === 0">Aðgerð</div>
      <button type="button" class="btn btn-outline-danger" @click="remove(index)">
        <i class="bi-trash"></i>
      </button>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-1 offset-md-11">
      <button type="button" class="btn btn-outline-danger" @click="add()">
        <i class="bi-plus-lg"></i>
      </button>
    </div>
  </div>

</form>
</template>

<script>

export default {
  name: 'AthleteList',
  inject: ['FRI_API_URL'],
  props: ['athlete', 'clubs', 'countries'],
  data() {
    return {
      busy: false,
      currAthlete: this.athlete,
      genders: [{
        value: 1,
        text: 'Karl'
      }, {
        value: 2,
        text: 'Kona'
      }],      
    }
  },
  methods: {
    clubsByRegion(region) {
      const byRegion = this.clubs.filter(c => c.region.abbreviation === region)
      return (byRegion.length) ? byRegion : this.clubs      
    },
    remove(index) {
      this.currAthlete.membership.splice(index, 1)
    },
    add() {
      const length = this.currAthlete.membership.length
      const lastItem = this.currAthlete.membership[length - 1]
      if (lastItem) {
        lastItem.to = new Date().getFullYear()
      }
      
      this.currAthlete.membership.push({})
    }
  },
  watch: {
    athlete (val) {
      this.currAthlete = val
    }
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>