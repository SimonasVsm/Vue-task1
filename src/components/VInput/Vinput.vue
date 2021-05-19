<template>
  
  <input v-on="listeners" :type="type" :placeholder="placeholder">
</template>

<script>
import VueTypes from 'vue-types'

export default {
  props: {
    type: VueTypes.string.def('text'),
    placeholder: VueTypes.string
  }
}
</script>

