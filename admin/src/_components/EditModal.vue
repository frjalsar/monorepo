<template>
  <div
    id="ModalEdit"
    class="modal"
    tabindex="-1"
  >
    <div
      class="modal-dialog"
      :class="modalSize"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Skráning
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div
            v-if="error"
            class="alert alert-danger"
            role="alert"
          >
            Villa koma upp. Lokið vafranum og prófið aftur eða hafið samband við skráningarnefnd.
          </div>
          <slot
            :confirm="shouldConfirm"
            :callback="callback"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="shouldConfirm"
          >
            Hætta við
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="shouldConfirm"
            @click.prevent="confirm()"
          >
            Vista
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalEdit',
  props: {
    size: {
      typye: String,
      default: 'large',
      validator (val) {
        return val === 'small' || val === 'medium' || val === 'large' || val === 'extra-large' || val === 'fullscreen'
      }
    }
  },
  data () {
    return {
      shouldConfirm: false,
      error: false
    }
  },
  computed: {
    modalSize () {
      const defaultSize = 'modal-lg'

      const sizeMap = {
        small: 'modal-sm',
        medium: '',
        large: 'modal-lg',
        'extra-large': 'modal-xl',
        fullscreen: 'modal-fullscreen'
      }

      return sizeMap[this.size] || defaultSize
    }
  },
  methods: {
    confirm () {
      this.shouldConfirm = true
    },
    callback (success) {
      this.error = !success
      this.shouldConfirm = !success
    }
  }
}
</script>
