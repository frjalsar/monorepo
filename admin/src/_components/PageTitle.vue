<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2>{{ text }}</h2>
      <button
        v-if="showCreateButton"
        type="button"
        class="btn btn-primary"
        @click="$emit('addNewItem')"
      >
        <i class="bi bi-pencil" /> &nbsp;Stofna
      </button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    text: {
      type: String,
      required: true
    },
    showCreateButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['addNewItem']
}
</script>
