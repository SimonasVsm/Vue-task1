<template>
  <div class="input-group">
    <label
    v-if="labelText"
    :id="labelId"
    class="control"
    >{{labelText}}<sup
    v-if="required"
    class="text-danger"
    >*</sup>
    </label>
    <slot name="input" />
  
  </div>
</template>

<script>
import t from "vue-types"

export default {
  props: {
    labelText: t.string,
    labelId: t.string,
    required: t.bool.def(true)
  }
}
</script>