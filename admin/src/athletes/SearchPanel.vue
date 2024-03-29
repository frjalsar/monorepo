<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12 text-center">
        <a
          v-for="letter in alphabet"
          :key="letter"
          class="btn btn-sm"
          :class="{'btn-outline-secondary': startsWith === letter}"
          @click="toggleLetter(letter)"
        >
          {{ letter }}
        </a>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-md-6 col-lg-3 mb-3">
        <input
          :value="search"
          type="text"
          class="form-control text-center"
          placeholder="Leita"
          @input="searchInput"
        >
      </div>
      <div class="col-md-4 col-lg-3 mb-3">
        <select
          :value="clubId"
          class="form-select"
          @change="changeClub"
        >
          <option :value="''">
            Félag
          </option>
          <option
            v-for="club in filteredClubs"
            :key="club.id"
            :value="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <select
          :value="regionId"
          class="form-select"
          @change="changeRegion"
        >
          <option :value="''">
            Íþróttahérað
          </option>

          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.fullName }}
          </option>
        </select>
      </div>
      <div class="col-md-4 col-lg-2 mb-3">
        <select
          :value="legacyClub"
          class="form-select"
          @change="changeLegacy"
        >
          <option :value="''">
            Gömul skráning
          </option>
          <option
            v-for="club in legacy"
            :key="club"
            :value="club"
          >
            {{ club }}
          </option>
        </select>
      </div>
      <div class="col-md-4 col-lg-1 mb-3">
        <button
          type="button"
          class="btn btn-secondary btn-block"
          @click.prevent="clear"
        >
          Hreinsa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'AthleteSearchPanel',
  props: {
    regions: {
      type: Array,
      default: () => []
    },
    clubs: {
      type: Array,
      default: () => []
    },
    legacy: {
      type: Array,
      default: () => []
    },
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click', 'input', 'change', 'search'],
  data () {
    return {
      startsWith: this.settings.startsWith,
      search: this.settings.search,
      regionId: this.settings.regionId,
      clubId: this.settings.clubId,
      legacyClub: this.settings.legacyClub,
      alphabet: ['A', 'Á', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Ý', 'Z', 'Þ', 'Æ', 'Ö']
    }
  },
  computed: {
    selected () {
      return {
        startsWith: this.startsWith,
        search: this.search,
        regionId: this.regionId,
        clubId: this.clubId,
        legacyClub: this.legacyClub
      }
    },
    filteredClubs () {
      if (this.regionId > 0) {
        return this.clubs.filter(club => club.regionId === Number(this.regionId))
      } else {
        return this.clubs
      }
    }
  },
  methods: {
    clear () {
      this.startsWith = undefined
      this.search = undefined
      this.regionId = undefined
      this.clubId = undefined
      this.legacyClub = undefined
      this.$emit('search', this.selected)
    },
    toggleLetter (letter) {
      if (this.startsWith === letter) {
        this.startsWith = undefined
      } else {
        this.startsWith = letter
        this.search = undefined
      }
      this.$emit('search', this.selected)
    },
    searchInput: debounce(function (e) {
      this.startsWith = undefined
      this.search = e.target && e.target.value

      // To clear box
      if (this.search.length === 0) {
        this.$emit('search', this.selected)
      }

      // Only search on 3
      if (this.search.length >= 3) {
        this.$emit('search', this.selected)
      }
    }, 300),
    changeRegion (e) {
      this.regionId = e.target.value
      this.clubId = undefined
      this.$emit('search', this.selected)
    },
    changeClub (e) {
      this.clubId = e.target.value
      this.$emit('search', this.selected)
    },
    changeLegacy (e) {
      this.legacyClub = e.target.value
      this.regionId = undefined
      this.clubId = undefined
      this.$emit('search', this.selected)
    }
  }
}
</script>
<style scoped>
a.btn {
  cursor: pointer;
}
a.btn:hover {
  border-color: #6c757d
}

a.btn-outline-secondary:hover {
  color: #fff
}
</style>
