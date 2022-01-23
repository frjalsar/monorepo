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
    closeEditModal(isDone, callback) {      
      if (isDone) {
        this.modal.hide()        
        this.$router.go()
      }

      callback(isDone)      
    },
  },
  mounted() {    
    const el = document.getElementById('ModalEdit')
    this.modal = new bootstrap.Modal(el)
  }
}
</script>