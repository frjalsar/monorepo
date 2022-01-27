<template>
<form>
   <div class="row g-3 mb-3">
     <div class="col-md-5">
      <label for="fullName" class="form-label">Fullt nafn</label>
      <input type="text" class="form-control" id="fullName" v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="token" class="form-label">Notendanafn</label>
      <input id="token" type="text" class="form-control"  v-model="currentItem.username" :disabled="busy">
    </div> 
    
    <div class="col-md-1">
      <label for="id" class="form-label">Númer</label>
      <input type="name" class="form-control-plaintext" readonly id="id" v-model="currentItem.id" :disabled="busy">
    </div>        
  </div>

  <div class="row g-3 mb-3" v-if="currentItem.id">
    <div class="col-md-6">
      <label for="token" class="form-label">Lykill</label>
      <input id="token" type="text" class="form-control"  v-model="currentItem.token" :disabled="true">
    </div> 
  </div>

  <div class="row g-3 mb-3" v-if="!currentItem.id">
    <div class="col-md-6">
      <label for="password" class="form-label">Lykilorð</label>
      <input id="password" type="text" class="form-control"  v-model="currentItem.password" :disabled="busy">
    </div> 
  </div>
   
  <strong>Réttindi</strong>
  <hr class="mt-1"/>
    
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Íþróttahérað</label>      
      <select class="form-select" v-model="currentItem.regionId" :disabled="busy">
        <option :value="null"></option>
        <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.fullName }}</option>        
      </select>
    </div>

    <div class="col-md-6">
      <label for="name" class="form-label">Félag</label>      
      <select class="form-select" v-model="currentItem.clubId" :disabled="busy">
        <option :value="null"></option>
        <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.fullName }}</option>        
      </select>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="admin" v-model="currentItem.admin">
        <label class="form-check-label" for="admin">Stjórnandi (admin)</label>
      </div>
    </div>

    <div class="col-md-6">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="application" v-model="currentItem.application">
        <label class="form-check-label" for="application">Forrit</label>
      </div>
    </div>
  </div>


</form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditUser',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['user', 'clubs', 'regions'],
  data() {
    return {
      role: undefined
    }
  },
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/users'
    }
  }, 
  watch: {
    user (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {}
      }
    },    
  },
}
</script>

<style scoped>
button.refresh {
  margin-top: 2rem;
}
</style>