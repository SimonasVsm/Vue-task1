<template>
  <input 
  :type="type"
  :value="value"
  :disabled="disabled"
  :required="required"
  :placeholder="placeholder"
  >
</template>

<script>
import t from 'vue-types'

export default {
 props: {
   type: t.string.def('text'),
   value: t.string,
   disabled: t.bool.def(false),
   required: t.bool.def(true),
   placeholder: t.string,

 }
 

}
</script>

