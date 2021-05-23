<template>
  <div class="input-group">
    <label
    v-if="labelText"
    :id="labetId"
    class="control"
    >{{labelText}}
    <span
    v-if="required"

    class="text-danger"
    >*</span>
    </label>
    <slot name="input" />
    <!-- <input 
      :type="type"
      :id="id"
    /> -->
  </div>
</template>

<script>
import t from 'vue-types'

export default {
  // komponentas turetu gauti propsus susijusius su error is tevinio elemento
  props: {
    // type: t.string.def('text'),
    labelText: t.string,
    // id: t.string 
  }
}
</script>