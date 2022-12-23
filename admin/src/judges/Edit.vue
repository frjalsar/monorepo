<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="fullName"
          class="form-label"
        >Fullt nafn</label>
        <input
          id="fullName"
          v-model="currentItem.fullName"
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-4">
        <label
          for="name"
          class="form-label"
        >Flokkur</label>
        <select
          v-model="currentItem.typeId"
          class="form-select"
          :disabled="busy"
        >
          <option :value="undefined" />
          <option
            v-for="type in judgeTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="col-md-2">
        <label
          for="date"
          class="form-label"
        >Dags. réttindi</label>
        <input
          id="date"
          v-model="currentItem.date"
          type="name"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="name"
          class="form-label"
        >Félag</label>
        <select
          v-model="currentItem.clubId"
          class="form-select"
          :disabled="busy"
        >
          <option
            v-for="club in clubs"
            :key="club.id"
            :value="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
      </div>

      <div class="col-md-1">
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
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditClub',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    judge: {
      type: Object,
      required: true
    },
    judgeTypes: {
      type: Array,
      required: true
    },
    clubs: {
      type: Array,
      required: true
    }
  },
  computed: {
    apiUrl () {
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
    }
  }
}
</script>
