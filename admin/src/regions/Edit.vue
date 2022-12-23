<template>
  <form>
    <div class="row g-3 mb-6">
      <div class="col-md-9">
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
  name: 'EditRegion',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    region: {
      type: Object,
      required: true
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/regions'
    }
  },
  watch: {
    region (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {}
      }
    }
  }
}
</script>
