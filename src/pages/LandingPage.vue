<template>
  <div class="container">
    <div class="navigation">
      <v-button @click="showModal = !showModal">
        Add Item
      </v-button>
    </div>
    <Modal
      v-if="showModal"
      @close="showModal = !showModal"
    >
      <div slot="header">
        <p>{{ action }}</p>
      </div>
      <add-edit-form 
        slot="body"
        :item="item"
        :action="action"
        @close="showModal = !showModal"
        @save-item="saveNewItem"
      />
    </Modal>
    <div class="body">
      <Carousel :carousel-items="carouselItems" />
      <product-list 
        :items="shopItemsStore"
        @favorite-changed="getUpdatedCarouselItems"
        @save-edit="handleEdit"
        @delete-item="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import {getData} from '../api/apiCalls'
import Carousel from "../components/Carousel/Carousel.vue"
import Modal from '../components/Modal/Modal.vue'
import AddEditForm from '../components/AddEditForm/AddEditForm.vue'
import ProductList from '../components/ProductList/ProductList.vue'
import VButton from '../components/VButton/VButton.vue'

export default {
  components: {
    Carousel,
    ProductList,
    VButton,
    Modal,
    AddEditForm
  },
   data() {
    return {
      item: {},
      shopItems: [],
      showModal: false,
      action: 'Enter new Item'
    }
  },
  computed: {
    ...mapState({shopItemsStore: 'shopItems'}),
    ...mapGetters({carouselItems: 'carouselPhotos'}),
  },
  async mounted (){
    this.$store.dispatch('getCarouselPhotos', {path: '/api/shop'})
  },
  methods: {
    async getUpdatedCarouselItems(){
      const response = await getData('api/shop')

    if (typeof response !== 'string') this.shopItems = await response.json()
    },
    saveNewItem(newItem){
      this.$store.dispatch('addItem', newItem)
      this.showModal = !this.showModal
    },
    handleDelete(itemToDelete){
      this.$store.dispatch('deleteItem', {id: itemToDelete})
    },
    handleEdit(itemEdited){
      this.$store.dispatch('editItem', itemEdited)
    }
  }
}

</script>
