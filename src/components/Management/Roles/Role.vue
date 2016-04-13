<template>
  <span>
    <tooltip-component
      :hint="selected ? 'Remove from ' + name : 'Add to ' + name"
      :muted placement="top">
      <span slot="html">
        <input
          @click="this.$emit(selected ? 'remove' : 'assign', this)"
          :disabled="slug === 'superusers'"
          type="checkbox"
          v-model="selected"
          debounce>
        </span>
      </tooltip-component>
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
