<template>
<div>
  <div class="d-flex justify-content-between">
    <h2>{{ text }}</h2>
    <button type="button" class="btn btn-primary" @click="$emit('addNewItem')"><i class="bi bi-pencil"></i> &nbsp;Stofna</button>
  </div>
  <hr />  
</div>
</template>

<script>
export default {
  name: 'Title',
  props: ['text'],
  emits: ['addNewItem']
}
</script>