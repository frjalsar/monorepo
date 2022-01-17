<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Nafn</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.fullName">
    </div>

    <div class="col-md-4">
      <label for="name" class="form-label">Kennitala</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.kt">
    </div>

    <div class="col-md-2">
      <label for="name" class="form-label">Fæðingarár</label>
      <input type="name" class="form-control" id="name" v-model="currAthlete.birthyear">
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-2">
      <label for="name" class="form-label">Kyn</label>      
      <select class="form-select" v-model="currAthlete.gender">
        <option v-for="gender in genders" :key="gender.value" :value="gender.value">{{ gender.text }}</option>        
      </select>
    </div>    

    <div class="col-md-4">
      <label for="name" class="form-label">Land</label>      
      <select class="form-select" v-model="currAthlete.country">
        <option v-for="country in countries" :key="country.value" :value="country.value">{{ country.text }}</option>        
      </select>
    </div>

  </div>  

</form>
</template>

<script>

export default {
  name: 'AthleteList',
  inject: ['FRI_API_URL'],
  props: ['athlete', 'countries'],
  data() {
    return {
      busy: false,
      currAthlete: this.athlete,
      genders: [{
        value: 1,
        text: 'Karl'
      }, {
        value: 2,
        text: 'Kona'
      }],      
    }
  },
  watch: {
    athlete (val) {
      this.currAthlete = val
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