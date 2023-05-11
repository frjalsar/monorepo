<script>
export default {
  data () {
    return {
      selectedModalItem: undefined,
      modal: undefined
    }
  },
  mounted () {
    const el = document.getElementById('ModalEdit')
    this.modal = new bootstrap.Modal(el) // eslint-disable-line
  },
  methods: {
    openEditModal (item) {
      this.selectedModalItem = item
      this.modal.show()
    },
    closeEditModal () {
      this.modal.hide()
      this.$router.go()
    }
  }
}
</script>
