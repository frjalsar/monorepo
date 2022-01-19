<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="fullName" class="form-label">Nafn</label>
      <input type="text" class="form-control" id="fullName" v-model="currentItem.fullName">
    </div>

    <div class="col-md-4">
      <label for="kt" class="form-label">Kennitala</label>
      <input type="text" class="form-control" id="kt" v-model="currentItem.kt">
    </div>

    <div class="col-md-2">
      <label for="birthyear" class="form-label">Fæðingarár</label>
      <input type="tel" class="form-control" id="birthyear" v-model="currentItem.birthyear">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="name" class="form-label">Kyn</label>      
      <select class="form-select" v-model="currentItem.gender">
        <option v-for="gender in genders" :key="gender.value" :value="gender.value">{{ gender.text }}</option>        
      </select>
    </div>    

    <div class="col-md-4">
      <label for="name" class="form-label">Land</label>      
      <select class="form-select" v-model="currentItem.country">
        <option v-for="country in countries" :key="country.value" :value="country.value">{{ country.text }}</option>        
      </select>
    </div>    
  </div>

  <hr class="my-4" />

  <div
    class="row g-3 mb-3"
    v-for="(m, index) in currentItem.membership"
    :key="m.clubId + '-' + m.athleteId"
  >
    <div class="col-md-6">
      <label :for="'club- '+ index" class="form-label" v-if="index === 0">Félag</label>      
      <select class="form-select" v-model="m.clubId" :id="'club-' + index">
        <option v-for="club in clubsByRegion(m.legacyClub)" :key="club.id" :value="club.id">{{ club.fullName }}</option>        
      </select>
      <div v-if="m.legacyClub" class="form-text">Viðkomandi var skráður í <em>{{ m.legacyClub }}</em> en ekki félag í gamla grunninum. Vinsamlegast lagið.</div>
    </div>
    
    <div class="col-md-2">
      <label :for="'from-' + index" class="form-label" v-if="index === 0">Frá</label>
      <input type="tel" class="form-control" :for="'from-' + index" v-model="m.from">
    </div>

    <div class="col-md-2">
      <label :for="'from-' + index" class="form-label" v-if="index === 0">Til</label>
      <input type="tel" class="form-control"  :for="'to-' + index" v-model="m.to">
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

  <div class="row g-3 mb-3">
    <div class="col-md-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="membershipIsConfirmed" @change="confirmAllMembership()" id="felagasaga">
        <label class="form-check-label" for="felagasaga">
          Staðfesta skráningu í félagasögu.
        </label>
</div>
    </div>
  </div>

</form>
</template>

<script>

export default {
  name: 'EditAthlete',
  inject: ['FRI_API_URL'],
  props: ['athlete', 'clubs', 'countries'],
  data() {
    return {
      busy: false,
      currentItem: this.athlete,
      membershipIsConfirmed: false,
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
      this.currentItem.membership.splice(index, 1)
    },
    add() {
      const length = this.currentItem.membership.length
      const lastItem = this.currentItem.membership[length - 1]
      if (lastItem) {
        lastItem.to = new Date().getFullYear()
      }
      
      this.currentItem.membership.push({})
    },
    confirmAllMembership () {
      this.currentItem.membership.forEach(m => {
        m.confirmed = this.membershipIsConfirmed
      })

      console.log(this.currentItem.membership)
    },
  },
  watch: {
    athlete (val) {
      this.currentItem = val
    },
    confirm (shouldConfirm) {
      if (shouldConfirm) {
        this.save()
      }
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