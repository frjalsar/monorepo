<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="fullName" class="form-label">Nafn</label>
      <input type="text" class="form-control" id="fullName" v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="kt" class="form-label">Kennitala</label>
      <input type="text" class="form-control" id="kt" v-model="currentItem.kt" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="birthyear" class="form-label">Fæðingarár</label>
      <input type="tel" class="form-control" id="birthyear" v-model="currentItem.birthyear" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="name" class="form-label">Kyn</label>
      <select class="form-select" v-model="currentItem.gender" :disabled="busy">
        <option v-for="gender in genders" :key="gender.value" :value="gender.value">{{ gender.text }}</option>
      </select>
    </div>

    <div class="col-md-4">
      <label for="name" class="form-label">Land</label>
      <select class="form-select" v-model="currentItem.country" :disabled="busy">
        <option v-for="country in countries" :key="country.value" :value="country.value">{{ country.text }}</option>
      </select>
    </div>

    <div class="col-md-3">
      <label for="thorId" class="form-label">Þór auðkenni &nbsp;<i class="bi bi-exclamation-triangle-fill text-warning" title="Þessi reitur er möppunin yfir í Þór. Farið varlega í að breyta."></i></label>
      <input type="tel" class="form-control" id="thorId" v-model="currentItem.thorId" :disabled="busy">
    </div>

    <div class="col-md-1 offset-md-1">
      <label for="id" class="form-label">Númer</label>
      <input type="name" class="form-control-plaintext" readonly id="id" v-model="currentItem.id" :disabled="busy">
    </div>
  </div>

  <hr class="my-4" />

  <div
    class="row g-3 mb-3"
    v-for="(m, index) in currentItem.newMembership"
    :key="m.clubId + '-' + m.athleteId"
  >
    <div class="col-md-6">
      <label :for="'club- '+ index" class="form-label" v-if="index === 0">Félag</label>
      <select class="form-select" v-model="m.clubId" :id="'club-' + index" :disabled="busy" @change="updateThorId()">
        <option v-for="club in clubsByRegion(m.legacyClub)" :key="club.id" :value="club.id">{{ club.fullName }}</option>
      </select>
      <div v-if="m.legacyClub" class="form-text">Viðkomandi var skráður í <em>{{ m.legacyClub }}</em> en ekki félag í gamla grunninum. Vinsamlegast lagið.</div>
      <div v-if="lastMembershipItem(index) && Boolean(m.thorId)" class="form-text">Iðkandi mun skrást í {{ m.thorId }} í Þór.</div>
      <div v-if="lastMembershipItem(index) && !Boolean(m.thorId)" class="form-text text-danger">ATH: Það vantar möppun yfir í Þór fyrir þetta félag.</div>
    </div>
    
    <div class="col-md-2">
      <label :for="'from-' + index" class="form-label" v-if="index === 0">Frá</label>
      <input type="tel" class="form-control" :for="'from-' + index" v-model="m.yearFrom" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label :for="'from-' + index" class="form-label" v-if="index === 0">Til</label>
      <input type="tel" class="form-control"  :for="'to-' + index" v-model="m.yearTo" :disabled="busy">
    </div>

    <div class="col-md-1 offset-md-1">
      <div class="form-label" v-if="index === 0">Aðgerð</div>
      <button type="button" class="btn btn-outline-danger" @click="remove(index)" :disabled="busy">
        <i class="bi-trash"></i>
      </button>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-1 offset-md-11">
      <button type="button" class="btn btn-outline-danger" @click="add()" :disabled="busy">
        <i class="bi-plus-lg"></i>
      </button>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="membershipIsConfirmed" @change="confirmAllMembership()" id="felagasaga" :disabled="busy">
        <label class="form-check-label" for="felagasaga">
          Staðfesta að félagasaga sé yfirfarin.
        </label>
</div>
    </div>
  </div>

</form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditAthlete',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['athlete', 'clubs', 'countries'],
  data() {
    return {
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
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/athletes'
    }
  },  
  methods: {
    clubsByRegion(region) {
      if (region) {
        const byRegion = this.clubs.filter(c => c.region.abbreviation === region)
        return (byRegion.length) ? byRegion : this.clubs
      }
      
      return this.clubs
       
    },
    remove(index) {
      this.currentItem.newMembership.splice(index, 1)
    },
    add() {
      const length = this.currentItem.newMembership.length
      const lastItem = this.currentItem.newMembership[length - 1]
      if (lastItem) {
        lastItem.yearTo = new Date().getFullYear() -1
      }
      
      this.currentItem.newMembership.push({ yearFrom: new Date().getFullYear() })
    },
    confirmAllMembership () {
      this.currentItem.newMembership.forEach(m => {
        m.confirmed = this.membershipIsConfirmed
      })
    },
    lastMembershipItem(index) {
      return this.currentItem.newMembership.length - 1 === index
    },
    updateThorId() {
      const lastIndex = this.currentItem.newMembership.length - 1
      const lastMembership = this.currentItem.newMembership[lastIndex]
      const findClub = this.clubs.find(club => club.id == lastMembership.clubId)
      this.currentItem.newMembership[lastIndex].thorId = findClub.thorId
    }
  },
  watch: {
    athlete (val) {
      if (val && val.id) {
        this.currentItem = val
        const confirmedCount = this.currentItem.newMembership?.reduce((total, current) => total + current.confirmed, 0)
        const totalCount = this.currentItem.newMembership?.length
        this.membershipIsConfirmed = confirmedCount === totalCount
      } else {
        // Empty athlete object
        this.currentItem = {
          club: {},
          region: {},
          newMembership: [{
            yearFrom: new Date().getFullYear()
          }]
        }

        this.membershipIsConfirmed = false
      }
    },
  },  
}
</script>