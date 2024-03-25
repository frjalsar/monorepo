<template>
  <div>
    <div class="row g-3">
      <div class="col-md-6 col-lg-5">
        <select
          :value="meetCode"
          class="form-select"
          @change="changeMeet"
        >
          <option :value="''">
            Hlaup
          </option>
          <option
            v-for="meet in meets"
            :key="meet.code"
            :value="meet.code"
          >
            {{ meet.name }}
          </option>
        </select>
      </div>
      <div class="col-md-3 col-lg-2 mt-4">
        <div class="form-check">
          <input
            id="leidrett"
            v-model="showFixed"
            class="form-check-input"
            type="checkbox"
            @change="changeShowFixed()"
          >
          <label
            class="form-check-label"
            for="leidrett"
          >
            Sýna leiðrétt
          </label>
        </div>
      </div>
      <div class="col-md-3 col-lg-2 mt-4">
        <div class="form-check">
          <input
            id="foreigners"
            v-model="showForeigners"
            class="form-check-input"
            type="checkbox"
            @change="changeShowForeigners()"
          >
          <label
            class="form-check-label"
            for="foreigners"
          >
            Sýna erlenda
          </label>
        </div>
      </div>
      <div class="col-md-4 col-lg-1">
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
export default {
  name: 'AthleteSearchPanel',
  props: {
    meets: {
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
      meetCode: this.settings.meetCode,
      showFixed: this.settings.showFixed,
      showForeigners: this.settings.showForeigners
    }
  },
  computed: {
    selected () {
      return {
        meetCode: this.meetCode,
        showFixed: this.showFixed,
        showForeigners: this.showForeigners
      }
    }
  },
  methods: {
    clear () {
      this.meetCode = undefined
      this.showFixed = false
      this.showForeigners = false
      this.$emit('search', this.selected)
    },
    changeMeet (e) {
      this.meetCode = e.target.value
      this.$emit('search', this.selected)
    },
    changeShowFixed (e) {
      this.$emit('search', this.selected)
    },
    changeShowForeigners (e) {
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
