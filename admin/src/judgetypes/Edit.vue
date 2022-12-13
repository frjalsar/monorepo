<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-4">
      <label for="name" class="form-label">Heiti</label>
      <input id="name" type="text" class="form-control" v-model="currentItem.name" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="stage" class="form-label">Stig</label>
      <input id="stage" type="text" class="form-control" v-model="currentItem.stage" :disabled="busy">
    </div>

    <div class="col-md-1 offset-md-1">
      <label for="id" class="form-label">Númer</label>
      <input type="name" class="form-control-plaintext" readonly id="id" v-model="currentItem.id" :disabled="busy">
    </div>
  </div>

</form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditEvent',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['judgetype'],
  computed: {
    apiUrl() {
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
    },    
  },  
}
</script>