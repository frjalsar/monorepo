<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-5">
      <label for="name" class="form-label">Heiti móts</label>
      <input id="name" type="text" class="form-control"  v-model="currentItem.name" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="organizerName" class="form-label">Ábyrgðaraðili</label>
      <input id="organizerName" type="text" class="form-control" v-model="currentItem.organizerName" :disabled="busy">
    </div>

    <div class="col-md-3">
      <label for="organizerKt" class="form-label">Kt. ábyrgðaraðila</label>
      <input id="organizerKt" type="text" class="form-control" v-model="currentItem.organizerKt" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-5">
      <label for="contactName" class="form-label">Mótsstjóri</label>
      <input id="contactName" type="text" class="form-control"  v-model="currentItem.contactName" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="contactEmail" class="form-label">Netfang mótsstjóra</label>
      <input id="contactEmail" type="text" class="form-control"  v-model="currentItem.contactEmail" :disabled="busy">
    </div>

    <div class="col-md-3">
      <label for="contactPhone" class="form-label">Sími mótsstjóra</label>
      <input id="contactPhone" type="text" class="form-control"  v-model="currentItem.contactPhone" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="location" class="form-label">Staðsetning</label>
      <input id="location" type="text" class="form-control"  v-model="currentItem.location" :disabled="busy">
    </div>
    <div class="col-md-6">
      <label for="name" class="form-label">Mannvirki</label>      
      <select class="form-select" v-model="currentItem.venueId" :disabled="busy">
        <option v-for="venue in venues" :key="venue.id" :value="venue.id">{{ venue.fullName }}</option>        
      </select>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Dómari</label>      
      <select class="form-select" v-model="currentItem.judgeId" :disabled="busy">
        <option v-for="judge in judges" :key="judge.id" :value="judge.id">{{ judge.fullName }}</option>        
      </select>
    </div>

    <div class="col-md-4">
      <label for="name" class="form-label">Staða</label>      
      <select class="form-select" v-model="currentItem.status" :disabled="busy">
        <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.name }}</option>        
      </select>
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
  name: 'EditMeet',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['meet', 'venues', 'judges', 'statuses'], 
  computed: {
    apiUrl() {
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
    },    
  },  
}
</script>