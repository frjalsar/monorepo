<template>
<div>
  <p class="lead mb-4">
   Dómari sem er viðurkenndur af FRÍ er nauðsynlegur til að fá árangurinn staðfestan. Dómari gætir þess að framkvæmd mótsins hafi verið í samræmi við reglur FRÍ og World Athletics og leysir úr ágreiningsatriðum sem upp koma á mótinu.
  </p>
 <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating">
        <select class="form-select" id="judge" aria-label="judge" v-model="judge">
          <option :value="undefined">Dómari</option>
          <option v-for="judge in judges" :key="judge.id" :value="judge">{{ judge.fullName }}</option>
        </select>
        <label for="judge">Dómari</label>
      </div>
    </div>
  </diV>


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
import agent from 'superagent'
export default {
  props: ['data'],
  emits: ['next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      judge: undefined,      
      judges: []
    }
  },
  methods: {
    next() {
      this.$emit('next', {
        judge: this.judge,
      })
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/judges')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.judges = res.body
      })
  }
};
</script>