<template>
  <section class="carousel">
    <div class="carousel__container">
      <button
        id="left-btn"
        class="carousel-control carousel-control--left"
      >
        <img
          src="../../assets/icons/left.svg"
          alt="left arrow"
        >
      </button>
      <div
        id="carousel-images"
        class="carousel-images"
      >
        <!-- Add slot here? -->
        <CarouselItem 
            
          v-for="(photo, index) in photos" 
          :id="photo.id"
          :key="photo.id"
          :title="photo.title"
          :index="index"
          :url="photo.url"
        />
      </div>
      <button
        id="right-btn"
        class="carousel-control carousel-control--right"
      >
        <img
          src="../../assets/icons/right.svg"
          alt="right arrow"
        >
      </button>

      <div
        id="carouselNav"
        class="carousel__nav"
      />
    </div>
  </section>
</template>

<script>
import t from "vue-types"
import CarouselItem from "../CarouselItem/CarouselItem.vue"

export default {
  components: { CarouselItem },
  props: {
    photos: t.array
  },
  data() {
    return {
      items: []
    }
  },
 
  
}
</script>


<style scoped>
.carousel__container {
  position: relative;
  margin: var(--spacing-xl) auto;
  max-width: 100%;
}

.carousel-control {
  height: 2rem;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  background: transparent;
  border: 0;
  z-index: 10;
  cursor: pointer;
}

.carousel-control--left {
  left: 1px;
}

.carousel-control--right {
  right: 1px;
}

@media (min-width: 992px) {
  .carousel__container {
    max-width: 70%;
  }
}

@media (min-width: 688px) {

  .carousel__container {
    margin: 2.5rem auto;
    max-width: 80%;
  }
}
</style>
