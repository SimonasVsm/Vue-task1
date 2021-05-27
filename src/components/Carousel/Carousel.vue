<template>
  <section class="carousel">
    <div class="carousel__container">
      <button
        id="left-btn"
        class="carousel-control carousel-control--left"
        @click="handlePrevious"
      >
        <left-arrow />
      </button>
      <div
        id="carousel-images"
        class="carousel-images"
      >
        <carousel-item
          v-for="(item, index) in carouselItems"
          :key="item.id"
          :is-active="index === activeIndex ? true : false"
          :item="item"
        />
      
        <carousel-items-navigation
          :active-index="activeIndex"
          :carousel-items="carouselItems"
          @change-image="handleChange"
        />
      </div>
      <button
        id="right-btn"
        class="carousel-control carousel-control--right"
        @click="handleNext"
      >
        <right-arrow />
      </button>
    </div>
  </section>
</template>

<script>
import t from "vue-types"

import LeftArrow from '../../assets/icons/LeftArrow.vue'
import RightArrow from '../../assets/icons/RightArrow.vue'
import CarouselItem from "../CarouselItem/CarouselItem.vue"
import CarouselItemsNavigation from '../CarouselItemsNavigation/CarouselItemsNavigation.vue'

export default {
  components: { 
    CarouselItem,
    CarouselItemsNavigation,
    LeftArrow,
    RightArrow
    },
  props: {
    carouselItems: t.array
  },
  data(){
    return {
      activeIndex: 0
    }
  },
  watch: {
    carouselItems(){
      this.activeIndex = 0
    }
  },
  methods: {
    handleNext(){
      if (this.activeIndex + 1 > this.carouselItems.length - 1){
        this.activeIndex = 0
      } else {
        this.activeIndex++
      }
    },
    handlePrevious(){
      if(this.activeIndex -1 < 0){
        this.activeIndex = this.carouselItems.length -1
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
