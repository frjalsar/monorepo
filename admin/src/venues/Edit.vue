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
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="inddor"
          class="form-label"
        >Innahús</label>
        <select
          id="inddor"
          v-model="currentItem.indoor"
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

      <div class="col-md-2">
        <label
          for="banked"
          class="form-label"
        >Hallandi</label>
        <select
          id="banked"
          v-model="currentItem.banked"
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

      <div class="col-md-2">
        <label
          for="straightLanes"
          class="form-label"
        >Beinar brautir</label>
        <input
          id="straightLanes"
          v-model="currentItem.straightLanes"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-2">
        <label
          for="ovalLanes"
          class="form-label"
        >Hringbrautir</label>
        <input
          id="ovalLanes"
          v-model="currentItem.ovalLanes"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="longTripleJump"
          class="form-label"
        >Lang/þrístökk</label>
        <input
          id="longTripleJump"
          v-model="currentItem.longTripleJump"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="polevault"
          class="form-label"
        >Stangarstökk</label>
        <input
          id="polevault"
          v-model="currentItem.polevault"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="hammerDiscus"
          class="form-label"
        >Sleggja/kringla</label>
        <input
          id="hammerDiscus"
          v-model="currentItem.hammerDiscus"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="javelin"
          class="form-label"
        >Spjótkast</label>
        <input
          id="javelin"
          v-model="currentItem.javelin"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="shotPut"
          class="form-label"
        >Kúluvarp</label>
        <input
          id="shotPut"
          v-model="currentItem.shotPut"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label
          for="material"
          class="form-label"
        >Efni</label>
        <input
          id="material"
          v-model="currentItem.material"
          type="text"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="certification"
          class="form-label"
        >WA staðfest</label>
        <select
          id="certification"
          v-model="currentItem.certification"
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

      <div class="col-md-2">
        <label
          for="constructionYear"
          class="form-label"
        >Byggingarár</label>
        <input
          id="constructionYear"
          v-model="currentItem.constructionYear"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="renovationYear"
          class="form-label"
        >Endurnýjað (ár)</label>
        <input
          id="renovationYear"
          v-model="currentItem.renovationYear"
          type="tel"
          class="form-control"
          :disabled="busy"
        >
      </div>

      <div class="col-md-2">
        <label
          for="warmupTrack"
          class="form-label"
        >Upphitunarvöllur</label>
        <select
          id="warmupTrack"
          v-model="currentItem.warmupTrack"
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
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-2">
        <label
          for="throwingField"
          class="form-label"
        >Kastvöllur</label>
        <select
          id="throwingField"
          v-model="currentItem.throwingField"
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
  name: 'EditVenues',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    venue: {
      type: Object,
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
    }
  }
}
</script>
