<template>
<div>
  <h2>{{ text }}</h2>
  <hr />
</div>
</template>

<script>
export default {
  name: 'Title',
  props: ['text']
}
</script>