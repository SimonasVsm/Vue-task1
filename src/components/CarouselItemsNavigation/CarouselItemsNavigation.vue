<template>
  <div class="carousel-nav">
    <button
      v-for="(photo, index) in photos"
      :key="photo.id"
      class="photo-indicator"
      :class="index == active ? 'active' : ''"
      @click="$emit('change-image', index)"
    />
  </div>
</template>

<script>
import t from 'vue-types'
export default {
  props: {
    photos: t.array,
    active: t.number
  },
}
</script>

<style scoped>
.carousel-nav {
  display: flex;
	justify-content: center;
	padding: var(--spacing-xs);
}

.photo-indicator {
	cursor: pointer;
	border: 0;
	border-radius: 50px;
	width: 1rem;
	height: 1rem;
	margin: 0 var(--spacing-small);
}


.photo-indicator:hover {
	background: var(--secondary);
}

.active {
	background: var(--secondary);
}
</style>