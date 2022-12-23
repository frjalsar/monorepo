<script>
import agent from 'superagent'
export default {
  props: {
    confirm: {
      type: Boolean,
      required: true
    }
  },
  emits: ['done'],
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
          this.$emit('done', true)
        })
        .catch(e => {
          this.$emit('done', false)
        })
    }
  }
}
</script>
