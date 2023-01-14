<template>
  <div>
    <p class="lead mb-4">
      Næst þarf að skrá {{ isRun ? 'hlaupstjóra' : 'mótsstjóra' }}. {{ isRun ? 'Hlaupstjóri' : 'Mótsstjóri' }} er einstaklingur sem sér um framkvæmd hlaupsins og bæði keppendur og FRÍ geta leitað til sé eitthvað óljóst eða þarfnast úrlausnar.
    </p>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="contactName"
            v-model="contactName"
            type="text"
            class="form-control"
            :class="{
              'is-valid': validContactName,
              'is-invalid': !validContactName && shake,
              'shake': !validContactName && shake
            }"
            placeholder="Nafn"
          >
          <label for="contactName">Nafn</label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            id="contactEmail"
            v-model="contactEmail"
            type="email"
            class="form-control"
            :class="{
              'is-valid': validContactEmail,
              'is-invalid': !validContactEmail && shake,
              'shake': !validContactEmail && shake
            }"
            placeholder="Netfang"
          >
          <label for="contactEmail">Netfang</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="contactPhone"
            v-model="contactPhone"
            v-maska="'###-####'"
            type="tel"
            class="form-control"
            :class="{
              'is-valid': validContactPhone,
              'is-invalid': !validContactPhone && shake,
              'shake': !validContactPhone && shake
            }"
            placeholder="Símanúmer"
          >
          <label for="contactPhone">Símanúmer</label>
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

export default {
  name: 'ContactStep',
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  data () {
    return {
      contactName: undefined,
      contactEmail: undefined,
      contactPhone: undefined,
      shake: false
    }
  },
  computed: {
    isRun () {
      return this.application.type === 'hlaup'
    },
    validContactName () {
      return this.contactName && this.contactName.length > 3
    },
    validContactEmail () {
      const emailRegex = /\w+@\w+\.\w{2,10}/
      return this.contactEmail && this.contactEmail.match(emailRegex)
    },
    validContactPhone () {
      const phoneRegex = /^\d{7}/
      return this.contactPhone && this.contactPhone.replace('-', '').match(phoneRegex)
    },
    isValid () {
      return this.validContactName && this.validContactEmail && this.validContactPhone
    }
  },
  created () {
    this.contactName = this.application.contactName || undefined
    this.contactEmail = this.application.contactEmail || undefined
    this.contactPhone = this.application.contactPhone || undefined
  },
  methods: {
    back () {
      this.$emit('back')
    },
    next () {
      this.shake = false

      if (this.isValid) {
        this.$emit('next', {
          contactName: this.contactName,
          contactEmail: this.contactEmail,
          contactPhone: this.contactPhone.replace('-', '')
        })
      } else {
        this.shake = true
      }
    }
  }
}
</script>
