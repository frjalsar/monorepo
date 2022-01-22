<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-4">
      <label for="name" class="form-label">Heiti</label>
      <input id="name" type="text" class="form-control" v-model="currentItem.name" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="iaaf" class="form-label">IAAF</label>      
      <select id="iaaf" class="form-select" v-model="currentItem.indoor" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>

    <div class="col-md-6">
      <label for="type" class="form-label">Flokkur</label>      
      <select id="type" class="form-select" v-model="currentItem.typeId" :disabled="busy">
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>        
      </select>
    </div>
  </div>

  <div class="row g-3 mb-3">
     <div class="col-md-3">
      <label for="thorId" class="form-label">Þór auðkenni &nbsp;<i class="bi bi-exclamation-triangle-fill text-warning" title="Þessi reitur er möppunin yfir í Þór. Farið varlega í að breyta."></i></label>
      <input type="tel" class="form-control" id="thorId" v-model="currentItem.thorId" :disabled="busy">
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
  props: ['event', 'types'],
  data() {
    return {
      yesNo: [
        {
          value: true,
          text: 'Já'
        }, {
          value: false,
          text: 'Nei'
        }
      ],
    }
  },
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/events'
    }
  },  
  watch: {
    event (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          type: {}
        }
      }
    },    
  },  
}
</script>