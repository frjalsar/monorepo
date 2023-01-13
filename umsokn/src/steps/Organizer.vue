<template>
  <div>
    <p class="lead mb-4">
      Fyrsta verk er að skrá ábyrgðaraðila. Ábyrgðaraðili er sá sem heldur mótið og ber ábyrgð á framkvæmd þess. Það getur verið frjálsíþróttadeild einhvers félags eða sambönd og félög eins og t.d. Félaga maraþonhlaupara.
    </p>
    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="organizerName"
            v-model="organizerName"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validOrganizerName,
              'is-invalid': !validOrganizerName && shake,
              'shake': !validOrganizerName && shake
            }"
            placeholder="Heiti ábyrgðaraðila"
          >
          <label for="organizerName">Heiti ábyrgðaraðila</label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            id="organizerKt"
            v-model="organizerKt"
            v-maska="'######-####'"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validOrganizerKt,
              'is-invalid': !validOrganizerKt && shake,
              'shake': !validOrganizerKt && shake
            }"
            placeholder="Kennitala ábyrgðaraðila"
          >
          <label for="organizerKt">Kennitala ábyrgðaraðila</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mx">
        <button
          type="button"
          class="btn btn-secondary btn-lg py-3 my-3"
          @click="back"
        >
          Til baka
        </button>
        <button
          type="button"
          class="btn btn-primary btn-lg py-3 my-3 mx-3"
          @click="next"
        >
          Áfram
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { isValid as isValidKt } from 'kennitala-utility'

export default {
  name: 'OrganizerStep',
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  data () {
    return {
      organizerName: undefined,
      organizerKt: undefined,
      shake: false
    }
  },
  computed: {
    validOrganizerName () {
      return this.organizerName && this.organizerName.length > 3
    },
    validOrganizerKt () {
      return this.organizerKt && isValidKt(this.organizerKt)
    },
    isValid () {
      return this.validOrganizerName && this.validOrganizerKt
    }
  },
  created () {
    this.organizerName = this.application.organizerName || undefined
    this.organizerKt = this.application.organizerKt || undefined
  },
  methods: {
    back () {
      this.$emit('back')
    },
    next () {
      this.shake = false

      if (this.isValid) {
        this.$emit('next', {
          organizerName: this.organizerName,
          organizerKt: this.organizerKt.replace('-', '')
        })
      } else {
        this.shake = true
      }
    }
  }
}
</script>
