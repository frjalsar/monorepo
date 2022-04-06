<template>
<form>
  <ul class="nav nav-tabs" id="application" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="upplysingarTab" data-bs-toggle="tab" data-bs-target="#upplysingar" role="tab">
        Upplýsingar
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" id="timasedillTab" data-bs-toggle="tab" data-bs-target="#timasedill" role="tab">
        Keppnisgreinar
      </button>
    </li>
    <li class="nav-item" id="keppendurTab" data-bs-toggle="tab" data-bs-target="#keppendurTab" role="tab">
      <button class="nav-link" href="#">Keppendur</button>
    </li>  
  </ul>
  
  <div class="tab-content">
    <div class="tab-pane fade show active" id="upplysingar" role="tabpanel">
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
    </div>

    <div class="tab-pane fade" id="timasedill" role="tabpanel">             
      <table class="table">
        <thead>
          <tr>
            <th>Grein</th>
            <th>Kyn</th>        
            <th>Aldur frá</th>
            <th>Aldur til</th>            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in currentItem.competition" :key="item.id">
            <td>{{ item.eventName }}</td>
            <td>{{ item.gender && item.gender.text }}</td>
            <td>{{ item.ageFrom }}</td>
            <td>{{ item.ageTo }}</td>            
          </tr>
        </tbody>
      </table>
            
     </div>
     <div class="tab-pane fade" id="keppendur" role="tabpanel">
       -
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
  data () {
    return {
      event: undefined,
      ageFrom: undefined,
      ageTo: undefined,
      gender: undefined,
      genders: [{
        value: 1,
        text: 'Karlar'
      }, {
        value: 2,
        text: 'Konur'
      }],
    }
  },
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

<style scoped>
.tab-content {
  padding: 1rem;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
}
</style>