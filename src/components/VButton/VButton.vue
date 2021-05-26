<template>
  <button
    class="button"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
import t from "vue-types"

export default {
  props: {
    text: t.string,
  }  
}
</script>
