<template>
  <!-- add active class based on index -->
  <div class="carousel__image fade">
    <p class="hero-text">
      {{ title }}
    </p>
    <img
      :src="url"
      alt="Main image"
      class="hero-image"
    >
    <a
      class="hero-link"
      href="#"
    />
  </div>
</template>

<script>
import t from "vue-types"

export default {
  props: {
    id: t.number,
    url: t.string,
    title: t.string,
    price: t.string,
    featured: t.bool,
    index: t.string
  }
}
</script>


<style scoped>
.hero-image {
  width: 100%;
  max-height: 26rem;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 38%;
  left: 50%;
  font-size: 2rem;
  color: var(--white);
  transform: translate(-50%, -50%);
  opacity: 0.8;
}
</style>
