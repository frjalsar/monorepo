<template>
<div class="modal" tabindex="-1" id="ModalEdit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Breyta skráningu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot :confirm="shouldConfirm"></slot>        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hætta við</button>
        <button type="button" class="btn btn-primary" @click.prevent="confirm()">Staðfesta</button>
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
      shouldConfirm: false
    }
  },
  methods: {
    confirm() {
      this.shouldConfirm = true
    }
  }

}
</script>