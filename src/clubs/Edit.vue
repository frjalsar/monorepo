<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="fullName" class="form-label">Fullt nafn</label>
      <input type="name" class="form-control" id="fullName" v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="shortName" class="form-label">Sutt nafn</label>
      <input type="name" class="form-control" id="shortName" v-model="currentItem.shortName" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="abbreviation" class="form-label">Skammstöfun</label>
      <input type="name" class="form-control" id="abbreviation" v-model="currentItem.abbreviation" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-7">
      <label for="name" class="form-label">Íþróttahérað</label>      
      <select class="form-select" v-model="currentItem.regionId" :disabled="busy">
        <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.fullName }}</option>        
      </select>
    </div>

    <div class="col-md-3">
      <label for="thorId" class="form-label">Þór auðkenni</label>
      <input type="name" class="form-control" id="thorId" v-model="currentItem.thorId" :disabled="busy">
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
  name: 'EditClub',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['club', 'regions'], 
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/clubs'
    }
  },  
  watch: {
    club (val) {
      this.currentItem = val
    },    
  },  
}
</script>