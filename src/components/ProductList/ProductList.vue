<template>
  <ul class="items-container"> 
    <product-list-item
      v-for="item in items" 
      :key="item.id"
      :item="item"
      @delete-item="openDeleteWindow"
      @edit-item="openEditWindow"
    /> 
    <Modal 
      v-if="showModal"
      @close="handleClose"
    >
      <div slot="header">
        <p>{{ action }}</p>
      </div>
      <template slot="body">
        <template v-if="action === 'Deleting'">
          <p>Deleted item will be lost!</p>
        </template>
        <template v-else>
          <add-edit-form 
            :action="action"
            :item="item"
            @close="handleClose"
            @favorite-changed="$emit('favorite-changed')"
            @save-edit="(editedItem) => $emit('save-edit', editedItem)"
          />
        </template>
      </template>
      <div slot="footer"> 
        <template v-if="action === 'Deleting'">
          <v-button
            @click="handleClose"
          >
            Cancel
          </v-button>
          <v-button
            class="button-delete"
            @click="handleDelete"
          >
            Delete
          </v-button>
        </template>
      </div>
    </Modal>
  </ul>
</template>

<script>
import t from 'vue-types'

import Modal from "../Modal/Modal.vue"
import ProductListItem from "../ProductListItem/ProductListItem.vue"
import VButton from "../VButton/VButton.vue"
import AddEditForm from "../AddEditForm/AddEditForm.vue"
import {deleteData, getData} from "../../api/apiCalls"

export default {
  components: {
    ProductListItem, 
    Modal, 
    VButton,
    AddEditForm
    },
    props: {
      items: t.array 
    },
  data() {
    return {
      showModal: false,
      action: null,
      itemToDeleteId: null,
      item: {},
    }
  }, 
  
  methods: {
     async handleDelete () {
      let response = await deleteData("shop", this.itemToDeleteId)
    
      if (typeof response !== 'string'){
      this.$emit('delete-item', this.itemToDeleteId)
      this.itemToDeleteId = null
      this.showModal = !this.showModal
      }
    },
    openDeleteWindow(e){
      this.action = "Deleting"
      this.showModal = !this.showModal
      this.itemToDeleteId = e
    },
    async openEditWindow(itemId) {
      const response = await getData(`api/shop/${itemId}`)

      if (typeof response !== 'string') {
        this.item = await response.json()
        this.action = "Editing"
        this.showModal = !this.showModal
      }
    },
    handleClose(){
      this.showModal = !this.showModal
    },
  }
}
</script>

<style scoped>
.items-container {
	position: relative;
	margin: var(--spacing-md);
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	gap: var(--spacing-md);
}

@media (min-width: 688px) {
	.items-container {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media (min-width: 992px) {
	.items-container {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>