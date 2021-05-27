<template>
  <!-- add active class based on index -->
  <div
    class="image fade"
    :class="isActive ? 'image-active' : ''"
  >
    <p class="hero-text">
      {{ item.title }}
    </p>
    <img
      :src="item.url"
      :alt="item.title"
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
    item: t.object,
    isActive: t.bool,
  }
}
</script>


<style scoped>
 .image {
  display: none;
}

.image-active {
  display: block;
} 

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

.fade {
	-webkit-animation-name: fade;
	-webkit-animation-duration: 1s;
	animation-name: fade;
	animation-duration: 1s;
}

@-webkit-keyframes fade {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}

@keyframes fade {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}
</style>
