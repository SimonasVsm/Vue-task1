<template>
  <div class="contai">
    <Carousel :photos="carouselItems" />
    <ProductList />
  </div>
</template>

<script>
import Carousel from "../components/Carousel/Carousel.vue"
import ProductList from '../components/ProductList/ProductList.vue'

export default {
  components: {
    Carousel,
    ProductList
  },
   data() {
    return {
      shopItems: [],
    }
  },
  computed: {
    carouselItems() {
      return this.shopItems.filter(si => si.favorite === "true")
    },
  },
  
  async mounted (){
    const response = await fetch("/api/shop")
    const data = await response.json()
    console.log(data)
    this.shopItems = data
  }
}

</script>
