<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="kt"
          class="form-label"
        >Kennitala</label>
        <input
          id="kt"
          v-model="currentItem.kt"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-6">
        <label
          for="fullName"
          class="form-label"
        >Nafn</label>
        <input
          id="fullName"
          v-model="currentItem.fullName"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="birthyear"
          class="form-label"
        >Fæðingarár</label>
        <input
          id="birthyear"
          v-model="currentItem.birthyear"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditAthlete',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    athlete: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  data () {
    return {
      membershipIsConfirmed: false,
      genders: [{
        value: 1,
        text: 'Karl'
      }, {
        value: 2,
        text: 'Kona'
      }]
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/thor/missingrunners'
    }
  },
  watch: {
    athlete (val) {
      console.log(val)
      if (val && val.fullName) {
        this.currentItem = val
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
    }
  },
  methods: {
    clubsByRegion (region) {
      if (region) {
        const byRegion = this.clubs.filter(c => c.region.abbreviation === region)
        return (byRegion.length) ? byRegion : this.clubs
      }

      return this.clubs
    },
    remove (index) {
      this.currentItem.newMembership.splice(index, 1)
    },
    add () {
      const length = this.currentItem.newMembership.length
      const lastItem = this.currentItem.newMembership[length - 1]
      if (lastItem) {
        lastItem.yearTo = new Date().getFullYear() - 1
      }

      this.currentItem.newMembership.push({ yearFrom: new Date().getFullYear() })
    },
    confirmAllMembership () {
      this.currentItem.newMembership.forEach(m => {
        m.confirmed = this.membershipIsConfirmed
      })
    },
    lastMembershipItem (index) {
      return this.currentItem.newMembership.length - 1 === index
    },
    updateThorId () {
      const lastIndex = this.currentItem.newMembership.length - 1
      const lastMembership = this.currentItem.newMembership[lastIndex]
      const findClub = this.clubs.find(club => club.id === lastMembership.clubId)
      this.currentItem.newMembership[lastIndex].thorId = findClub.thorId
    }
  }
}
</script>
