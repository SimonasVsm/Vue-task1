<template>
  <button class="button" v-on="$listeners" :bisable="disable"  >
      {{text}}
  </button>
</template>

<script>
import t from "vue-types"

export default {
  props: {
    text: t.string,
    disable: t.bool.def(false)
  }
    
}
</script>
