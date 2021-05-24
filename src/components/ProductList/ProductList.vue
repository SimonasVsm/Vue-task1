<template>

  <ul class="items-container"> 
    <ProductListItem v-for="item in items" 
    :id="item.id" 
    :key="item.id"
    :title="item.title" 
    :url="item.url"
    :price="item.price"
     @delete-item="openDeleteWindow"
     @editing-item="openEditWindow"
    />
      <Modal 
     v-if="showModal"
    :initialTitle="item.title"
    :initialPrice="item.price"
    :initialUrl="item.url"
    :itemId="item.id"
    :title="action"
    @close-modal="handleClose"
    >
    <div slot="header">
      <p>{{action}}</p>
    </div>
    <div  slot="modal-body">
      <template v-if="action === 'Deleting'">
        <p>Deleted item will be lost!</p>
      </template>
      <template v-else>
       <add-edit-form 
       :action="action" 
       :item="item"
       @close-modal="handleClose"
       @save-edit="saveEditedItem"
       ></add-edit-form>
      </template>
    </div>
    <div slot="modal-footer"> 
       <template v-if="action === 'Deleting'">
         <VButton @click="handleClose" text="Cancel"/>
        <VButton class="button-delete"  @click="handleDelete" text="Delete"/>
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
  methods: {
 
    async handleDelete () {
      const oldDtata = [...this.items]
      deleteData("shop", `${this.itemToDeleteId}`)
        
      const newData = oldDtata.filter(item => item.id !== this.itemToDeleteId)
      this.items = newData
      this.itemToDeleteId = null
      this.showModal = !this.showModal
    },
    openDeleteWindow(e){
      this.action = "Deleting"
      this.showModal = !this.showModal
      this.itemToDeleteId = e
    },
    async openEditWindow(e) {
      this.itemToEditId = e
      const response =  await fetch(`/api/shop/${e}`) 
      const data = await response.json()
      this.item = data
      this.action = "Editing"
      this.showModal = !this.showModal
    },
    handleClose(){
      this.showModal = !this.showModal
    },
    saveEditedItem(e){ 
      const editedItemRemoved = [...this.items].filter(item => item.id !== e.id)
      const newData = [...editedItemRemoved, e]
  
      this.items = newData
    },
  },
  
  async mounted (){
    const response = await fetch("/api/shop")
    const data = await response.json()
    this.items = [...this.items, ...data]
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