<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="fullName" class="form-label">Fullt nafn</label>
      <input type="name" class="form-control" id="fullName" v-model="currentItem.fullName" :disabled="busy">
    </div>

    <div class="col-md-4">
      <label for="name" class="form-label">Flokkur</label>
      <select class="form-select" v-model="currentItem.typeId" :disabled="busy">
        <option :value="undefined"></option>
        <option v-for="type in judgeTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
      </select>
    </div>

    <div class="col-md-2">
      <label for="date" class="form-label">Dags. réttindi</label>
      <input type="name" class="form-control" id="date" v-model="currentItem.date" :disabled="busy">
    </div>

  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Félag</label>
      <select class="form-select" v-model="currentItem.clubId" :disabled="busy">
        <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.fullName }}</option>
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
  name: 'EditClub',
  inject: ['FRI_API_URL'],
  mixins: [EditMixin],
  props: ['judge', 'judgeTypes', 'clubs'], 
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/judges'
    }
  },  
  watch: {
    judge (val) {
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