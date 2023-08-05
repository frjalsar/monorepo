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
            v-if="alertType"
            class="alert"
            :class="{
              'alert-danger': alertType === 'error',
              'alert-success': alertType === 'success'
            }"
            role="alert"
          >
            {{ alertMessage }}
          </div>
          <slot
            :confirm="shouldConfirm"
            :alert="alert"
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
      alertType: undefined,
      alertMessage: ''
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
    alert (type, message) {
      this.alertType = type
      this.alertMessage = message
      this.shouldConfirm = false

      setTimeout(() => {
        this.alertType = undefined
        this.alertMessage = ''
      }, 3000)
    }
  }
}
</script>
