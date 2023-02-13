<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="name"
          class="form-label"
        >Heiti</label>
        <input
          id="name"
          v-model="currentItem.name"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="official"
          class="form-label"
        >Official</label>
        <select
          id="official"
          v-model="currentItem.official"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="opt in yesNo"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.text }}
          </option>
        </select>
      </div>

      <div class="col-md-6">
        <label
          for="type"
          class="form-label"
        >Flokkur</label>
        <select
          id="type"
          v-model="currentItem.typeId"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="type in types"
            :key="type.id"
            :value="type.id"
          >
            {{ type.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-3">
        <label
          for="thorId"
          class="form-label"
        >Þór auðkenni &nbsp;<i
          class="bi bi-exclamation-triangle-fill text-warning"
          title="Þessi reitur er möppunin yfir í Þór. Farið varlega í að breyta."
        /></label>
        <input
          id="thorId"
          v-model="currentItem.thorId"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-1 offset-md-1">
        <label
          for="id"
          class="form-label"
        >Númer</label>
        <input
          id="id"
          v-model="currentItem.id"
          type="name"
          class="form-control-plaintext"
          readonly
          :disabled="busy"
        >
      </div>
    </div>

    <hr
      v-if="isCombinedEvent"
      class="my-4"
    >

    <div v-if="isCombinedEvent">
      <div
        v-for="(childEvent, index) in currentItem.childEvents"
        :key="childEvent.id"
        class="row g-3 mb-3"
      >
        <div class="col-md-6">
          <label
            v-if="index === 0"
            :for="'event- '+ childEvent.id"
            class="form-label"
          >Undirgreinar</label>
          <select
            :id="'event-' + childEvent.id"
            v-model="childEvent.id"
            class="form-select"
            :disabled="busy"
          >
            <option
              v-for="item in nonCombinedEvents"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="col-md-1 offset-md-5">
          <div
            v-if="index === 0"
            class="form-label"
          >
            Aðgerð
          </div>
          <button
            type="button"
            class="btn btn-outline-danger"
            :disabled="busy"
            @click="remove(index)"
          >
            <i class="bi-trash" />
          </button>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-md-1 offset-md-11">
          <button
            type="button"
            class="btn btn-outline-danger"
            :disabled="busy"
            @click="add()"
          >
            <i class="bi-plus-lg" />
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
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    event: {
      type: Object,
      required: true
    },
    types: {
      type: Array,
      required: true
    },
    events: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      yesNo: [
        {
          value: true,
          text: 'Já'
        }, {
          value: false,
          text: 'Nei'
        }
      ]
    }
  },
  computed: {
    apiUrl () {
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
    }
  },
  methods: {
    remove (index) {
      this.currentItem.childEvents.splice(index, 1)
    },
    add () {
      this.currentItem.childEvents.push({})
    }
  }
}
</script>
