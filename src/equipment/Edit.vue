<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-4">
      <label for="event" class="form-label">Grein</label>
      <select class="form-select" v-model="currentItem.eventId" :disabled="busy">
        <option :value="undefined"></option>
        <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
      </select>
    </div>

    <div class="col-md-2">
      <label for="gender" class="form-label">Kyn</label>
      <select class="form-select" v-model="currentItem.gender" :disabled="busy">
        <option :value="undefined"></option>
        <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{ gender.name }}</option>
      </select>
    </div>

    <div class="col-md-2">
      <label for="age" class="form-label">Aldur</label>
      <input type="number" class="form-control" id="age" v-model="currentItem.age" :disabled="busy">
    </div>

     <div class="col-md-2">
      <label for="value" class="form-label">Gildi</label>
      <input type="number" class="form-control" id="value" v-model="currentItem.value" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="unit" class="form-label">Eining</label>
      <input type="text" class="form-control" id="value" v-model="currentItem.unit" :disabled="busy">
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
  props: ['equipment', 'events'],
  data () {
    return {
      genders: [{
        id: 1,
        name: 'Karlar'
      }, {
        id: 2,
        name: 'Konur'
      }],
    }
  },
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/equipment'
    }
  },  
  watch: {
    equipment (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          club: {}
        }
      }
    },    
  },  
}
</script>