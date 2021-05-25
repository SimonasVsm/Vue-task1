<template>
  <ul class="items-container"> 
    <ProductListItem
      v-for="item in items" 
      :key="item.id"
      :item="item"
    
      @delete-item="openDeleteWindow"
      @edit-item="openEditWindow"
    />
    <Modal 
      v-if="showModal"
      :initial-title="item.title"
      :initial-price="item.price"
      :initial-url="item.url"
      :item-id="item.id"
      :title="action"
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
            @save-edit="saveEditedItem"
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
import Modal from "../Modal/Modal.vue"
import ProductListItem from "../ProductListItem/ProductListItem.vue"
import VButton from "../VButton/VButton.vue"
import AddEditForm from "../AddEditForm/AddEditForm.vue"
import {deleteData} from "../../api/apiCalls"

export default {
  components: { ProductListItem, Modal, VButton, "add-edit-form": AddEditForm },
  data() {
    return {
      items: [],
      showModal: false,
      action: null,
      itemToDeleteId: null,
      itemToEditId: null,
      item: {},
    }
  },
  
  async mounted (){
    try {
        const response = await fetch("/api/shop")
        if (!response.ok) throw Error('Something went wrong!')
        this.items = await response.json()
    } catch (error) {
      alert(error)
        return
    }
    
   
  },
  methods: {
     async handleDelete () {
      let response = await deleteData("shop", this.itemToDeleteId)
    
      if (typeof response !== 'string'){
      const newData = this.items.filter(item => item.id !== this.itemToDeleteId)
      this.items = newData
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
      this.itemToEditId = itemId
      let response

      try {
        response = await fetch(`/api/shop/${itemId}`)
        if (!response.ok) throw Error('Something went wrong!')
      } catch (error) {
        alert(error)
        return
      }

      this.item = await response.json()
      this.action = "Editing"
      this.showModal = !this.showModal
    },
    handleClose(){
      this.showModal = !this.showModal
    },
    saveEditedItem(editedItem){ 
      const editedItemRemoved = this.items.filter(item => item.id !== editedItem.id)
      this.items = [...editedItemRemoved, editedItem]
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