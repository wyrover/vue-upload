<template>
  <span>
    <input :disabled="slug === 'superusers'" type="checkbox" v-model="selected">
  </span>
</template>

<script>
  export default {
    props: {
      'selected': { type: Boolean, default: false, required: true },
      'id': { type: Number, default: -1, required: true },
      'name': { type: String, required: true },
      'slug': { type: String, required: true },
      'permissions': { type: Object, default: {}, required: true }
    }
  }
</script>
