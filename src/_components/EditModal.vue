<template>
<div class="modal" tabindex="-1" id="ModalEdit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Skráning</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger" role="alert" v-if="error">
          Villa koma upp. Lokið vafranum og prófið aftur eða hafið samband við skráningarnefnd.
        </div>
        <slot :confirm="shouldConfirm" :callback="callback"></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="shouldConfirm">Hætta við</button>
        <button type="button" class="btn btn-primary" @click.prevent="confirm()" :disabled="shouldConfirm">Vista</button>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
export default {
  name: 'ModalEdit',
  data() {
    return {
      shouldConfirm: false,
      error: false
    }
  },
  methods: {
    confirm() {
      this.shouldConfirm = true
    },
    callback(success) {
      this.error = !success
      this.shouldConfirm = !success
    }
  },  
}
</script>