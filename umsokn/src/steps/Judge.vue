<template>
  <div>
    <p class="lead mb-4">
      Dómari sem er viðurkenndur af FRÍ er nauðsynlegur til að fá árangurinn staðfestan. Dómari gætir þess að framkvæmd mótsins hafi verið í samræmi við reglur FRÍ og World Athletics og leysir úr ágreiningsatriðum sem upp koma í {{ isRun ? 'hlaupinu' : 'mótinu' }}.
    </p>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="form-floating">
          <select
            id="judge"
            v-model="selectedJudge"
            class="form-select"
            :class="{
              'is-valid': validJudge,
              'is-invalid': !validJudge && shake,
              'shake': !validJudge && shake
            }"
            aria-label="judge"
          >
            <option :value="undefined">
              Dómari
            </option>
            <option
              v-for="judge in judges"
              :key="judge.id"
              :value="judge"
            >
              {{ judge.fullName }}
            </option>
          </select>
          <label for="judge">Dómari</label>
        </div>
      </div>
    </diV>

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
import agent from 'superagent'
export default {
  name: 'TrackJudge',
  inject: ['FRI_API_URL', 'FRI_API_KEY'],
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  data () {
    return {
      selectedJudge: undefined,
      judges: [],
      shake: false
    }
  },
  computed: {
    isRun () {
      return this.application.type === 'hlaup'
    },
    validJudge () {
      return this.selectedJudge && this.selectedJudge.id
    },
    isValid () {
      return this.validJudge
    }
  },
  created () {
    this.selectedJudge = this.application.judge || undefined

    agent
      .get(this.FRI_API_URL + '/judges')
      .auth(this.FRI_API_KEY, { type: 'bearer'})
      .then(res => {
        this.judges = res.body.filter(judge => judge.valid)
      })
  },
  methods: {
    back () {
      this.$emit('back')
    },
    next () {
      this.shake = false

      if (this.isValid) {
        this.$emit('next', {
          judge: this.selectedJudge
        })
      } else {
        this.shake = true
      }
    }
  }
}
</script>
