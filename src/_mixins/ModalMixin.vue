<script>
export default {
  data() {
    return {
      selectedModalItem: undefined,
      modal: undefined
    }
  },
  methods: {
    openEditModal(item) {
        this.selectedModalItem = item
        this.modal.show()
    },      
    closeEditModal(callback) {
      callback()
      this.modal.hide()
    },
  },
  mounted() {    
    const el = document.getElementById('ModalEdit')
    this.modal = new bootstrap.Modal(el)
  }
}
</script>