<template>
<div>
  <p class="lead mb-4">
   Fyrsta verk er að skrá ábyrgðaraðila. Ábyrgðaraðili er sá sem heldur hlaupið og ber ábyrgð á framkvæmd þess. Það getur verið íþróttadeild einhvers félags eða sambönd og félög eins og t.d. Félaga maraþonhlaupara.
  </p>
 <div class="row">
    <div class="col-md-4 offset-md-2">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="organizerName" placeholder="Heiti ábyrgðaraðila" v-model="organizerName">
        <label for="organizerName">Heiti ábyrgðaraðila</label>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="organizerKt" placeholder="Kennitala ábyrgðaraðila" v-model="organizerKt">
        <label for="organizerKt">Kennitala ábyrgðaraðila</label>
      </div>
    </div>
  </div>


  <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button
      type="button"
      class="btn btn-primary btn-lg py-3 px-4 my-3"
      @click="next"
    >
      Áfram     
    </button>
  </div>
  
</div>
</template>

<script>
const apiUrl = import.meta.env.VITE_FRI_API_URL

export default {
  name: 'RunOrganizer',
  props: ['data'],
  emits: ['next'],
  data() {
    return {
      organizerName: '',
      organizerKt: ''
    }
  },
  methods: {
    next() {
      this.$emit('next', {
        organizerName: this.organizerName,
        organizerKt: this.organizerKt
      })
    }
  }
};
</script>