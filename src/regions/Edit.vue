<template>
<form>
  <div class="row g-3 mb-6">
    <div class="col-md-9">
      <label for="fullName" class="form-label">Fullt nafn</label>
      <input type="name" class="form-control" id="fullName" v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="abbreviation" class="form-label">Skammstöfun</label>
      <input type="name" class="form-control" id="abbreviation" v-model="currentItem.abbreviation" :disabled="busy">
    </div>    
   
    <div class="col-md-1">
      <label for="id" class="form-label">Númer</label>
      <input type="name" class="form-control-plaintext" readonly id="id" v-model="currentItem.id" :disabled="busy">
    </div>
  </div>  

</form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditRegion',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['region'],
  computed: {
    apiUrl() {
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
    },    
  },  
}
</script>