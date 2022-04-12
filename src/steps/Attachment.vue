<template>
  <div>
    <p class="lead mb-4">
      Í boðsbréfi koma fram ítarlegar upplýsingar um {{ isRun ? 'hlaupið' : 'mótið' }} fyrir keppendur t.d. upplýsingar um skráningar, þáttökugjöld, nafnakall og verðlaun.
    </p>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <input
          class="form-control"
          type="file"
          @change="setFile"
        >
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
export default {
  name: 'TrackAttachment',
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'next'],
  data () {
    return {
      base64Attachment: undefined
    }
  },
  computed: {
    isRun () {
      return this.application.type === 'hlaup'
    }
  },
  methods: {
    setFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const dataUrl = e.target.result
        const base64Index = dataUrl.indexOf('base64,')
        const base64String = dataUrl.substring(base64Index + 7)
        this.base64Attachment = base64String
      }
    },
    back () {
      this.$emit('back')
    },
    next () {
      this.$emit('next', {
        base64Attachment: this.base64Attachment
      })
    }
  }
}
</script>
