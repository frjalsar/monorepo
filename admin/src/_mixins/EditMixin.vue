<script>
import agent from 'superagent'
export default {
  props: {
    confirm: {
      type: Boolean,
      required: true
    }
  },
  emits: ['alert'],
  data () {
    return {
      busy: false,
      currentItem: {}
    }
  },
  watch: {
    confirm (val) {
      if (val) {
        this.save()
      }
    }
  },
  methods: {
    save () {
      this.busy = true
      const method = this.currentItem.id ? 'put' : 'post'
      agent(method, this.apiUrl)
        .send(this.currentItem)
        .withCredentials()
        .then(() => {
          this.busy = false
          this.$emit('alert', { type: 'success', message: 'Tókst að villa. Þú mátt loka glugganum.' })
        })
        .catch(e => {
          console.log(e)
          this.$emit('alert', { type: 'error', message: 'Villa kom upp við að vista. Lokið vafranum og prófið aftur.' })
        })
    }
  }
}
</script>
