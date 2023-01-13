<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="kt"
          class="form-label"
        >Kennitala</label>
        <div class="input-group">
          <input
            id="kt"
            v-model="currentItem.kt"
            type="text"
            class="form-control"
            :disabled="busy"
          >
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="search()"
            >
              <i class="bi bi-search" />
            </button>
          </div>
        </div>
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

    <div class="row g-3 mb-3">
      <div class="col-md-2">
        <label
          for="name"
          class="form-label"
        >Kyn</label>
        <select
          v-model="currentItem.gender"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="gender in genders"
            :key="gender.value"
            :value="gender.value"
          >
            {{ gender.text }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label
          for="name"
          class="form-label"
        >Land</label>
        <select
          v-model="currentItem.country"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="country in countries"
            :key="country.value"
            :value="country.value"
          >
            {{ country.text }}
          </option>
        </select>
      </div>

      <div class="col-md-3">
        <label
          for="thorId"
          class="form-label"
        >Þór auðkenni &nbsp;<i
          class="bi bi-exclamation-triangle-fill text-warning"
          title="Þessi reitur er möppunin yfir í Þór. Farið varlega í að breyta."
        /></label>
        <input
          id="thorId"
          v-model="currentItem.thorId"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-1 offset-md-1">
        <label
          for="id"
          class="form-label"
        >Númer</label>
        <input
          id="id"
          v-model="currentItem.id"
          type="name"
          class="form-control-plaintext"
          readonly
          :disabled="busy"
        >
      </div>
    </div>

    <hr class="my-4">

    <div
      v-for="(m, index) in currentItem.newMembership"
      :key="m.clubId + '-' + m.athleteId"
      class="row g-3 mb-3"
    >
      <div class="col-md-6">
        <label
          v-if="index === 0"
          :for="'club- '+ index"
          class="form-label"
        >Félag</label>
        <select
          :id="'club-' + index"
          v-model="m.clubId"
          class="form-select"
          :disabled="busy"
          @change="updateThorId()"
        >
          <option
            v-for="club in clubsByRegion(m.legacyClub)"
            :key="club.id"
            :value="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
        <div
          v-if="m.legacyClub"
          class="form-text"
        >
          Viðkomandi var skráður í <em>{{ m.legacyClub }}</em> en ekki félag í gamla grunninum. Vinsamlegast lagið.
        </div>
        <div
          v-if="lastMembershipItem(index) && Boolean(m.thorId)"
          class="form-text"
        >
          Iðkandi mun skrást í {{ m.thorId }} í Þór.
        </div>
        <div
          v-if="lastMembershipItem(index) && !Boolean(m.thorId)"
          class="form-text text-danger"
        >
          ATH: Það vantar möppun yfir í Þór fyrir þetta félag.
        </div>
      </div>

      <div class="col-md-2">
        <label
          v-if="index === 0"
          :for="'from-' + index"
          class="form-label"
        >Frá</label>
        <input
          v-model="m.yearFrom"
          type="tel"
          class="form-control"
          :for="'from-' + index"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          v-if="index === 0"
          :for="'from-' + index"
          class="form-label"
        >Til</label>
        <input
          v-model="m.yearTo"
          type="tel"
          class="form-control"
          :for="'to-' + index"
          :disabled="busy"
        >
      </div>

      <div class="col-md-1 offset-md-1">
        <div
          v-if="index === 0"
          class="form-label"
        >
          Aðgerð
        </div>
        <button
          type="button"
          class="btn btn-outline-danger"
          :disabled="busy"
          @click="remove(index)"
        >
          <i class="bi-trash" />
        </button>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-1 offset-md-11">
        <button
          type="button"
          class="btn btn-outline-danger"
          :disabled="busy"
          @click="add()"
        >
          <i class="bi-plus-lg" />
        </button>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-12">
        <div class="form-check">
          <input
            id="felagasaga"
            v-model="membershipIsConfirmed"
            class="form-check-input"
            type="checkbox"
            :disabled="busy"
            @change="confirmAllMembership()"
          >
          <label
            class="form-check-label"
            for="felagasaga"
          >
            Staðfesta að félagasaga sé yfirfarin.
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
import agent from 'superagent'
export default {
  name: 'EditAthlete',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    athlete: {
      type: Object,
      required: true
    },
    clubs: {
      type: Array,
      required: true
    },
    countries: {
      type: Array,
      required: true
    }
  },
  emits: ['alert'],
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
      return this.FRI_API_URL + '/athletes'
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
    },
    search () {
      this.busy = true

      if (this.currentItem.kt.length !== 10) {
        this.busy = false
        return this.$emit('alert', { type: 'error', message: 'Kennitala passar ekki' })
      }

      return agent
        .get(this.FRI_API_URL + '/athletes')
        .withCredentials()
        .query({ kt: this.currentItem.kt })
        .then(res => {
          if (res.body.length > 0) {
            this.$emit('alert', { type: 'error', message: 'Iðkandi er þegar til í félagatalinu.' })
            this.busy = false
          } else {
            return this.searchThor()
          }
        }).catch(() => {
          this.busy = false
        })
    },
    searchThor () {
      return agent
        .get(this.FRI_API_URL + `/thor/competitor/${this.currentItem.kt}`)
        .withCredentials()
        .then(res => {
          if (res.body.length === 1) {
            this.currentItem = {
              ...res.body[0],
              newMembership: this.clubs.filter(club => club.thorId === this.currentItem.club)
            }
            this.busy = false
            this.$emit('alert', {})
          } else {
            this.$emit('alert', { type: 'error', message: 'Iðkandi fannst ekki í Þór' })
            this.busy = false
          }
        }).catch(() => {
          this.busy = false
        })
    }
  }
}
</script>
