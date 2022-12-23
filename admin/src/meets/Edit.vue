<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-5">
        <label
          for="name"
          class="form-label"
        >Heiti móts</label>
        <input
          id="name"
          v-model="currentItem.name"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-4">
        <label
          for="organizerName"
          class="form-label"
        >Ábyrgðaraðili</label>
        <input
          id="organizerName"
          v-model="currentItem.organizerName"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-3">
        <label
          for="organizerKt"
          class="form-label"
        >Kt. ábyrgðaraðila</label>
        <input
          id="organizerKt"
          v-model="currentItem.organizerKt"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-5">
        <label
          for="contactName"
          class="form-label"
        >Mótsstjóri</label>
        <input
          id="contactName"
          v-model="currentItem.contactName"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-4">
        <label
          for="contactEmail"
          class="form-label"
        >Netfang mótsstjóra</label>
        <input
          id="contactEmail"
          v-model="currentItem.contactEmail"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-3">
        <label
          for="contactPhone"
          class="form-label"
        >Sími mótsstjóra</label>
        <input
          id="contactPhone"
          v-model="currentItem.contactPhone"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="location"
          class="form-label"
        >Staðsetning</label>
        <input
          id="location"
          v-model="currentItem.location"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>
      <div class="col-md-6">
        <label
          for="name"
          class="form-label"
        >Mannvirki</label>
        <select
          v-model="currentItem.venueId"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="venue in venues"
            :key="venue.id"
            :value="venue.id"
          >
            {{ venue.fullName }}
          </option>
        </select>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="name"
          class="form-label"
        >Dómari</label>
        <select
          v-model="currentItem.judgeId"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="judge in judges"
            :key="judge.id"
            :value="judge.id"
          >
            {{ judge.fullName }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label
          for="name"
          class="form-label"
        >Staða</label>
        <select
          v-model="currentItem.status"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="status in statuses"
            :key="status.id"
            :value="status.id"
          >
            {{ status.name }}
          </option>
        </select>
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
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditMeet',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    meet: {
      type: Object,
      required: true
    },
    venues: {
      type: Array,
      required: true
    },
    judges: {
      type: Array,
      required: true
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/meets'
    }
  },
  watch: {
    meet (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          competition: []
        }
      }
    }
  }
}
</script>
