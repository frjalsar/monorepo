<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="name"
          class="form-label"
        >Heiti</label>
        <input
          id="name"
          v-model="currentItem.name"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="stage"
          class="form-label"
        >Stig</label>
        <input
          id="stage"
          v-model="currentItem.stage"
          type="text"
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
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditEvent',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    judgetype: {
      type: Object,
      required: true
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/judgetypes'
    }
  },
  watch: {
    judgetypes (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {}
      }
    }
  }
}
</script>
