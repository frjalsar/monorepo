<template>
<form>
  <div class="row g-3 mb-3">
    <div class="col-md-4">
      <label for="name" class="form-label">Heiti</label>
      <input id="name" type="text" class="form-control" v-model="currentItem.name" :disabled="busy">
    </div>

    <div class="col-md-2">
      <label for="iaaf" class="form-label">IAAF</label>
      <select id="iaaf" class="form-select" v-model="currentItem.iaaf" :disabled="busy">
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

  <hr class="my-4" v-if="isCombinedEvent">
  
  <div v-if="isCombinedEvent">
  <div
    class="row g-3 mb-3"
    v-for="(childEvent, index) in currentItem.childEvents"
    :key="childEvent.id"
  >
    <div class="col-md-6">
      <label :for="'event- '+ childEvent.id" class="form-label" v-if="index === 0">Undirgreinar</label>
      <select class="form-select" v-model="childEvent.id" :id="'event-' + childEvent.id" :disabled="busy">
        <option v-for="event in nonCombinedEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
      </select>
    </div>

    <div class="col-md-1 offset-md-5">
      <div class="form-label" v-if="index === 0">Aðgerð</div>
      <button type="button" class="btn btn-outline-danger" @click="remove(index)" :disabled="busy">
        <i class="bi-trash"></i>
      </button>
    </div>
  </div>

  <div class="row g-3 mb-3">
    <div class="col-md-1 offset-md-11">
      <button type="button" class="btn btn-outline-danger" @click="add()" :disabled="busy">
        <i class="bi-plus-lg"></i>
      </button>
    </div>
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
  props: ['event', 'types', 'events'],
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
  methods: {
    remove(index) {
      this.currentItem.childEvents.splice(index, 1)
    },
    add() {     
      this.currentItem.childEvents.push({})
    },
  },
  computed: {
    apiUrl() {
      return this.FRI_API_URL + '/events'
    }, 
    isCombinedEvent () {
      return this.currentItem.typeId === 10
    },
    nonCombinedEvents () {
      return this.events.filter(event => event.typeId !== 10)
    }
  },  
  watch: {
    event (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          type: {},
          childEvents: [{}]
        }
      }
    },    
  },  
}
</script>