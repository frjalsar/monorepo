<script>
export default {
  data() {
    return {
      selectedModalItem: {}
    }
  },
  methods: {
    openModalEdit (item) {
      this.selectedModalItem = item
      const el = document.getElementById('ModalEdit')
      const ModalEdit = new bootstrap.Modal(el)
      
      ModalEdit.show()
    },
  }
}
</script>