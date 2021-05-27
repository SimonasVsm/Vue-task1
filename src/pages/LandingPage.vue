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
      <template slot="body">
        <add-edit-form 
          :item="item"
          :action="action"
          @close="showModal = !showModal"
          @save-item="saveNewItem"
        />
      </template>
    </Modal>
    <div class="body">
      <Carousel :photos="carouselItems" />
      <product-list 
        :items="shopItems"
        @favorite-changed="getUpdatedCarouselItems"
        @save-edit="handleEdit"
        @delete-item="handleDelete"
      />
    </div>
  </div>
</template>

<script>
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
    carouselItems() {
      return this.shopItems.filter(si => si.favorite === true)
    },
  },
  async mounted (){
    // mounted and getUpdatedCarouselItems uses same logic should I create separate method?
    const response = await getData('api/shop')

    if (typeof response !== 'string') this.shopItems = await response.json()
  },
  methods: {
    async getUpdatedCarouselItems(){
      const response = await getData('api/shop')

    if (typeof response !== 'string') this.shopItems = await response.json()
    },
    saveNewItem(newItem){
      this.shopItems.push(newItem)
      this.showModal = !this.showModal
    },
    handleDelete(itemToDelete){
      this.shopItems = this.shopItems.filter(item => item.id !== itemToDelete)
    },
    handleEdit(itemEdited){
      const itemsWithoutEdited = this.shopItems.filter(item => item.id !== itemEdited.id)
      this.shopItems = [...itemsWithoutEdited, itemEdited]
    }
  }
}

</script>
