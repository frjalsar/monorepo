<template>
  <form>
    <ul
      id="application"
      class="nav nav-tabs"
      role="tablist"
    >
      <li
        class="nav-item"
        role="presentation"
      >
        <button
          id="upplysingarTab"
          class="nav-link active"
          data-bs-toggle="tab"
          data-bs-target="#upplysingar"
          role="tab"
        >
          Upplýsingar
        </button>
      </li>
      <li class="nav-item">
        <button
          id="timasedillTab"
          class="nav-link"
          data-bs-toggle="tab"
          data-bs-target="#timasedill"
          role="tab"
        >
          Keppnisgreinar
        </button>
      </li>
      <li
        id="keppendurTab"
        class="nav-item"
        data-bs-toggle="tab"
        data-bs-target="#keppendurTab"
        role="tab"
      >
        <button
          class="nav-link"
          href="#"
        >
          Keppendur
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div
        id="upplysingar"
        class="tab-pane fade show active"
        role="tabpanel"
      >
        <div class="row g-3 mb-3">
          <div class="col-md-5">
            <label
              for="name"
              class="form-label"
            >Heiti móts</label>
            <input
              id="name"
              v-model="currentItem.name"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>

          <div class="col-md-4">
            <label
              for="organizerName"
              class="form-label"
            >Ábyrgðaraðili</label>
            <input
              id="organizerName"
              v-model="currentItem.organizerName"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>

          <div class="col-md-3">
            <label
              for="organizerKt"
              class="form-label"
            >Kt. ábyrgðaraðila</label>
            <input
              id="organizerKt"
              v-model="currentItem.organizerKt"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-5">
            <label
              for="contactName"
              class="form-label"
            >Mótsstjóri</label>
            <input
              id="contactName"
              v-model="currentItem.contactName"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>

          <div class="col-md-4">
            <label
              for="contactEmail"
              class="form-label"
            >Netfang mótsstjóra</label>
            <input
              id="contactEmail"
              v-model="currentItem.contactEmail"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>

          <div class="col-md-3">
            <label
              for="contactPhone"
              class="form-label"
            >Sími mótsstjóra</label>
            <input
              id="contactPhone"
              v-model="currentItem.contactPhone"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <label
              for="location"
              class="form-label"
            >Staðsetning</label>
            <input
              id="location"
              v-model="currentItem.location"
              type="text"
              class="form-control"
              :disabled="busy"
            >
          </div>
          <div class="col-md-4">
            <label
              for="name"
              class="form-label"
            >Mannvirki</label>
            <select
              v-model="currentItem.venueId"
              class="form-select"
              :disabled="busy"
            >
              <option
                v-for="venue in venues"
                :key="venue.id"
                :value="venue.id"
              >
                {{ venue.fullName }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label
              for="name"
              class="form-label"
            >Dómari</label>
            <select
              v-model="currentItem.judgeId"
              class="form-select"
              :disabled="busy"
            >
              <option
                v-for="judge in judges"
                :key="judge.id"
                :value="judge.id"
              >
                {{ judge.fullName }}
              </option>
            </select>
          </div>
        </div>

        <div class="row g-3 mb-3">
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

          <div class="col-md-2">
            <label
              for="sent"
              class="form-label"
            >Sent inn</label>
            <input
              id="sent"
              type="name"
              class="form-control-plaintext"
              readonly
              :value="formatDate(currentItem.sent)"
              :disabled="busy"
            >
          </div>

          <div class="col-md-2">
            <label
              for="sent"
              class="form-label"
            >Dags. móts</label>
            <input
              id="sent"
              type="name"
              class="form-control-plaintext"
              readonly
              :value="formatDate(currentItem.startDate)"
              :disabled="busy"
            >
          </div>

          <div class="col-md-4">
            <label
              for="name"
              class="form-label"
            >Staða</label>
            <select
              v-model="currentItem.status"
              class="form-select"
              :disabled="busy"
            >
              <option
                v-for="status in statuses"
                :key="status.id"
                :value="status.id"
              >
                {{ status.name }}
              </option>
            </select>
          </div>

          <div class="offset-md-1 col-md-2">
            <button
              type="button"
              class="btn btn-secondary btn-attachment"
              :disabled="!currentItem.hasAttachment"
              @click="getFile()"
            >
              Sækja boðsbréf
            </button>
          </div>
        </div>
      </div>

      <div
        id="timasedill"
        class="tab-pane fade"
        role="tabpanel"
      >
        <table class="table">
          <thead>
            <tr>
              <th>Grein</th>
              <th>Kyn</th>
              <th>Aldur frá</th>
              <th>Aldur til</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item) in currentItem.competitions"
              :key="item.id"
            >
              <td>{{ item.eventName }}</td>
              <td>{{ item.gender && item.gender.text }}</td>
              <td>{{ item.ageFrom }}</td>
              <td>{{ item.ageTo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        id="keppendur"
        class="tab-pane fade"
        role="tabpanel"
      >
        -
      </div>
    </div>
  </form>
</template>

<script>
import agent from 'superagent'
import fileDownload from 'js-file-download'
import { format } from 'date-fns'
import EditMixin from '../_mixins/EditMixin.vue'
export default {
  name: 'EditMeet',
  mixins: [EditMixin],
  inject: ['FRI_API_URL'],
  props: {
    meet: {
      type: Object,
      required: true
    },
    venues: {
      type: Array,
      required: true
    },
    judges: {
      type: Array,
      required: true
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      event: undefined,
      ageFrom: undefined,
      ageTo: undefined,
      gender: undefined,
      genders: [{
        value: 1,
        text: 'Karlar'
      }, {
        value: 2,
        text: 'Konur'
      }]
    }
  },
  computed: {
    apiUrl () {
      return this.FRI_API_URL + '/meets'
    }
  },
  watch: {
    meet (val) {
      if (val && val.id) {
        this.currentItem = val
      } else {
        this.currentItem = {
          competition: []
        }
      }
    }
  },
  methods: {
    formatDate (d) {
      const date = new Date(d)
      if (!isNaN(date)) {
        return format(new Date(d), 'dd.MM.yyyy')
      }

      return ''
    },
    getFile () {
      return agent
        .get(this.apiUrl + '/' + this.currentItem.id + '/file')
        .responseType('blob')
        .withCredentials()
        .then(res => fileDownload(res.body, this.currentItem.name + '.docx'))
    }
  }
}
</script>

<style scoped>
.tab-content {
  padding: 1rem;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
}

.btn-attachment {
  margin-top: 2rem;
}
</style>
