<template>
  <div>
    <p class="lead mb-4">
      Næst þarf að skrá hlaupstjóra. Hlaupstjóri er einstaklingur sem sér um framkvæmd hlaupsins og bæði keppendur og FRÍ geta leitað til sé eitthvað óljóst eða þarfnast úrlausnar.
    </p>

    <div class="row">
      <div class="col-md-4 offset-md-2">
        <div class="form-floating mb-3">
          <input
            id="contactName"
            v-model="contactName"
            type="text"
            class="form-control"
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
            type="tel"
            class="form-control"
            placeholder="Símanúmer"
          >
          <label for="contactPhone">Símanúmer</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary btn-lg py-3 my-3"
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
  name: 'RunContact',
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['next'],
  data () {
    return {
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    }
  },
  methods: {
    next () {
      this.$emit('next', {
        contactName: this.contactName,
        contactEmail: this.contactEmail,
        contactPhone: this.contactPhone
      })
    }
  }
}
</script>
