<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="fullName" class="form-label">Fullt nafn</label>
      <input id="fullName" type="text" class="form-control"  v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="inddor" class="form-label">Innahús</label>      
      <select id="inddor" class="form-select" v-model="currentItem.indoor" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>

     <div class="col-md-2">
      <label for="banked" class="form-label">Hallandi</label>      
      <select id="banked" class="form-select" v-model="currentItem.banked" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>

    <div class="col-md-2">
      <label for="straightLanes" class="form-label">Beinar brautir</label>
      <input id="straightLanes" type="tel" class="form-control" v-model="currentItem.straightLanes" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="ovalLanes" class="form-label">Hringbrautir</label>
      <input id="ovalLanes" type="tel" class="form-control" v-model="currentItem.ovalLanes" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="longTripleJump" class="form-label">Lang/þrístökk</label>
      <input id="longTripleJump" type="tel" class="form-control" v-model="currentItem.longTripleJump" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="polevault" class="form-label">Stangarstökk</label>
      <input id="polevault" type="tel" class="form-control" v-model="currentItem.polevault" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="hammerDiscus" class="form-label">Sleggja/kringla</label>
      <input id="hammerDiscus" type="tel" class="form-control"  v-model="currentItem.hammerDiscus" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="javelin" class="form-label">Spjótkast</label>
      <input id="javelin" type="tel" class="form-control" v-model="currentItem.javelin" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="shotPut" class="form-label">Kúluvarp</label>
      <input id="shotPut" type="tel" class="form-control" v-model="currentItem.shotPut" :disabled="busy">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-4">
      <label for="material" class="form-label">Efni</label>
      <input id="material" type="text" class="form-control"  v-model="currentItem.material" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="certification" class="form-label">IAAF staðfest</label>      
      <select id="certification" class="form-select" v-model="currentItem.certification" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>

    <div class="col-md-2">
      <label for="constructionYear" class="form-label">Byggingarár</label>
      <input id="constructionYear" type="tel" class="form-control" v-model="currentItem.constructionYear" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="renovationYear" class="form-label">Endurnýjað (ár)</label>
      <input id="renovationYear" type="tel" class="form-control" v-model="currentItem.renovationYear" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="warmupTrack" class="form-label">Upphitunarvöllur</label>      
      <select id="warmupTrack" class="form-select" v-model="currentItem.warmupTrack" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="throwingField" class="form-label">Kastvöllur</label>      
      <select id="throwingField" class="form-select" v-model="currentItem.throwingField" :disabled="busy">
        <option v-for="opt in yesNo" :key="opt.value" :value="opt.value">{{ opt.text }}</option>        
      </select>
    </div>

    <div class="col-md-1">
      <label for="id" class="form-label">Númer</label>
      <input id="id" type="name" class="form-control-plaintext" readonly v-model="currentItem.id" :disabled="busy">
    </div>
  </div>  

</form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditVenues',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['venue'],
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
      return this.FRI_API_URL + '/venues'
    }
  },  
  watch: {
    venue (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          region: {}
        }
      }
    },    
  },  
}
</script>