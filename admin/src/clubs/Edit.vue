<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="fullName"
          class="form-label"
        >Fullt nafn</label>
        <input
          id="fullName"
          v-model="currentItem.fullName"
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-4">
        <label
          for="shortName"
          class="form-label"
        >Sutt nafn</label>
        <input
          id="shortName"
          v-model="currentItem.shortName"
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="abbreviation"
          class="form-label"
        >Skammstöfun</label>
        <input
          id="abbreviation"
          v-model="currentItem.abbreviation"
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-7">
        <label
          for="name"
          class="form-label"
        >Íþróttahérað</label>
        <select
          v-model="currentItem.regionId"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.fullName }}
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
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-1">
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
    <div class="row g-3 mb-3">
      <div class="col-md-12">
        <div class="form-check">
          <input
            id="inactive"
            v-model="currentItem.inactive"
            class="form-check-input"
            type="checkbox"
            :disabled="busy"
          >
          <label
            class="form-check-label"
            for="inactive"
          >
            Félag er ekki lengur starfandi
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditClub',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    club: {
      type: Object,
      required: true
    },
    regions: {
      type: Array,
      required: true
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/clubs'
    }
  },
  watch: {
    club (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          region: {}
        }
      }
    }
  }
}
</script>
