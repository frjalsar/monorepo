<template>
<div class="modal" tabindex="-1" id="myModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Breyta skráningu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot></slot>        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Loka</button>
        <button type="button" class="btn btn-primary">Vista</button>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
export default {
  name: 'ModalPopup',
}
</script>