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
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/thor/missingrunners'
    }
  },
  watch: {
    athlete (val) {
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
  }
}
</script>
