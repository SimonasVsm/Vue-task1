<template>
  <input 
  :id="id" 
  :name="name" 
  :type="type" 
  :placeholder="placeholder" 
  :value="value"
  :input="$emit('input', $event.target.value)"
  >
</template>

<script>
import t from 'vue-types'

export default {
  props: {
    value: t.string,
    type: t.string.def('text'),
    placeholder: t.string,
    id: t.string,
    name: t.string,
    itemTitle: t.string
  }
}
</script>

