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
    <div class="col-md-4">
      <label for="name" class="form-label">Íþróttahérað</label>      
      <select class="form-select" v-model="currentItem.regionId" :disabled="busy">
        <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.fullName }}</option>        
      </select>
    </div>    
  </div>  

</form>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'EditClub',
  inject: ['FRI_API_URL'],
  props: ['club', 'regions', 'confirm'],
  data() {
    return {
      busy: false,
      currentItem: this.club,      
    }
  },
  methods: {
    save() {
      this.busy = true
      agent
        .post(this.FRI_API_URL + '/clubs')
        .send(this.currentItem)
        .withCredentials()
        .then(res => {          
          console.log(res)          
          this.busy = false
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  watch: {
    club (val) {
      this.currentItem = val
    },
    confirm (shouldConfirm) {
      if (shouldConfirm) {
        this.save()
      }
    }
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>