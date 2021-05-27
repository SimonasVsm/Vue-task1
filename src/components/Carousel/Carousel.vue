<template>
  <section class="carousel">
    <div class="carousel__container">
      <button
        id="left-btn"
        class="carousel-control carousel-control--left"
        @click="handlePrevious"
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
        <CarouselItem
          v-for="(photo, index) in photos"
          :key="photo.id"
          :active="activeIndex"
          :index="index"
          :photo="photo"
        />
      
        <CarouselItemsNavigation
          :active="activeIndex"
          :photos="photos"
          @change-image="handleChange"
        />
      </div>
      <button
        id="right-btn"
        class="carousel-control carousel-control--right"
        @click="handleNext"
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
import CarouselItemsNavigation from '../CarouselItemsNavigation/CarouselItemsNavigation.vue'

export default {
  components: { CarouselItem, CarouselItemsNavigation},
  props: {
    photos: t.array
  },
  data(){
    return {
      activeIndex: 0
    }
  },
  watch: {
    photos(){
      this.activeIndex = 0
    }
  },
  methods: {
    handleNext(){
      if (this.activeIndex + 1 > this.photos.length - 1){
        this.activeIndex = 0
      } else {
        this.activeIndex++
      }
    },
    handlePrevious(){
      if(this.activeIndex -1 < 0){
        this.activeIndex = this.photos.length -1
      } else {
        this.activeIndex--
      }
    },
    handleChange(index){
      this.activeIndex = index
    }
  }
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
