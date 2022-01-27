<template>
<div>
   
  <p class="lead mb-4">
    Næst þarf að skrá mótssjóra. Mótsstjóri er einstaklingur sem sér um framkvæmd mótsins og bæði keppendur og FRÍ geta leitað til sé eitthvað óljóst eða þarfnast úrlausnar. 
  </p>

  <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="contactName" placeholder="Nafn" v-model="contactName">
        <label for="contactName">Nafn</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="contactEmail" placeholder="Netfang" v-model="contactEmail">
        <label for="contactEmail">Netfang</label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input type="tel" class="form-control" id="contactPhone" placeholder="Símanúmer" v-model="contactPhone">
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
      >Áfram</button>
    </div>    
  </div>

</div>
</template>

<script>
const apiUrl = import.meta.env.VITE_FRI_API_URL

export default {
  props: ['data'],
  emits: ['next'],
  data() {
    return {
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    }
  },
  methods: {
    next() {
      this.$emit('next', {
        contactName: this.contactName,
        contactEmail: this.contactEmail,
        contactPhone: this.phone
      })
    }
  }
};
</script>