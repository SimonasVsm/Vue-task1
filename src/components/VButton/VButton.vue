<template>
<!-- need to fix abitilty to add aditional class -->
  <button v-on="$listeners" class="shop-bnt">
      {{text}}
  </button>
</template>

<script>

  export default {
    props: {
      text: String,
     
    }
    
  }
</script>
