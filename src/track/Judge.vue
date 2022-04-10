<template>
<div>
  <p class="lead mb-4">
   Dómari sem er viðurkenndur af FRÍ er nauðsynlegur til að fá árangurinn staðfestan. Dómari gætir þess að framkvæmd mótsins hafi verið í samræmi við reglur FRÍ og World Athletics og leysir úr ágreiningsatriðum sem upp koma á mótinu.
  </p>
 <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="form-floating">
        <select
          class="form-select"
           :class="{
            'is-valid': validJudge,
            'is-invalid': !validJudge && shake,
            'shake': !validJudge && shake
          }"
          id="judge"
          aria-label="judge"
          v-model="judge"
        >
          <option :value="undefined">Dómari</option>
          <option v-for="judge in judges" :key="judge.id" :value="judge">{{ judge.fullName }}</option>
        </select>
        <label for="judge">Dómari</label>
      </div>
    </div>
  </diV>


  <div class="row">
    <div class="col mx">
      <button type="button" class="btn btn-secondary btn-lg py-3 my-3" @click="back">
        Til baka
      </button>
      <button type="button" class="btn btn-primary btn-lg py-3 my-3 mx-3" @click="next">
        Áfram
      </button>
    </div>    
  </div>
  
  
</div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'TrackJudge',
  props: ['data'],
  emits: ['back', 'next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  data() {
    return {
      judge: undefined,      
      judges: [],
      shake: false,
    }
  },
  computed: {
    validJudge () {
      return this.judge && this.judge.id
    },
    isValid () {
      return this.validJudge
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    next() {
      this.shake = false

      if (this.isValid) {
        this.$emit('next', {
          judge: this.judge,
        })
      } else {
        this.shake = true
      }
    }
  },
  created() {
    this.judge = this.data.judge || undefined

    agent
      .get(this.FRI_API_URL + '/judges')
      .auth(this.FRI_API_TOKEN, { type: 'bearer' })
      .then(res => {
        this.judges = res.body.filter(judge => judge.valid)
      })
  }
};
</script>