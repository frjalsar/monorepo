<template>
  <form>
    <div class="row g-3 mb-3">
      <div class="col-md-5">
        <label
          for="fullName"
          class="form-label"
        >Fullt nafn</label>
        <input
          id="fullName"
          v-model="currentItem.fullName"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-4">
        <label
          for="token"
          class="form-label"
        >Notendanafn</label>
        <input
          id="token"
          v-model="currentItem.username"
          type="text"
          class="form-control"
          :disabled="busy"
        >
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

    <div
      v-if="currentItem.id"
      class="row g-3 mb-3"
    >
      <div class="col-md-6">
        <label
          for="token"
          class="form-label"
        >Lykill</label>
        <input
          id="token"
          v-model="currentItem.token"
          type="text"
          class="form-control"
          :disabled="true"
        >
      </div>
    </div>

    <div
      v-if="!currentItem.id"
      class="row g-3 mb-3"
    >
      <div class="col-md-6">
        <label
          for="password"
          class="form-label"
        >Lykilorð</label>
        <input
          id="password"
          v-model="currentItem.password"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <strong>Réttindi</strong>
    <hr class="mt-1">

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label
          for="name"
          class="form-label"
        >Íþróttahérað</label>
        <select
          v-model="currentItem.regionId"
          class="form-select"
          :disabled="busy"
        >
          <option :value="null" />
          <option
            v-for="region in regions"
            :key="region.id"
            :value="region.id"
          >
            {{ region.fullName }}
          </option>
        </select>
      </div>

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
          <option :value="null" />
          <option
            v-for="club in clubs"
            :key="club.id"
            :value="club.id"
          >
            {{ club.fullName }}
          </option>
        </select>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <div class="form-check">
          <input
            id="admin"
            v-model="currentItem.admin"
            class="form-check-input"
            type="checkbox"
          >
          <label
            class="form-check-label"
            for="admin"
          >Stjórnandi (admin)</label>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-check">
          <input
            id="application"
            v-model="currentItem.application"
            class="form-check-input"
            type="checkbox"
          >
          <label
            class="form-check-label"
            for="application"
          >Forrit</label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditUser',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    user: {
      type: Object,
      required: true
    },
    clubs: {
      type: Array,
      required: true
    },
    regions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      role: undefined
    }
  },
  computed: {
    apiUrl () {
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
    }
  }
}
</script>

<style scoped>
button.refresh {
  margin-top: 2rem;
}
</style>
