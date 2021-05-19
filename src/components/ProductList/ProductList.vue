<template>

  <ul> 
    <ProductListItem v-for="item in items" 
    :id="item.id" 
    :key="item.id"
    :title="item.title" 
    :url="item.url"
    :price="item.price"
     @deleted-item="handleDelete"
     @editing-item="handleEdit"
    />
   <Modal 

   v-if="showModal"
   :initialTitle="item.title"
   :initialPrice="item.price"
   :initialUrl="item.url"
   :itemId="item.id"
    :title="action"
    @close-modal="handleModalClose"
    @edited-item="handleEditSave"
    />
    
  </ul>
  
</template>

<script>
import Modal from '../Modal/Modal.vue'
import ProductListItem from '../ProductListItem/ProductListItem.vue'

// TODO Add - add to favourites feature that will add photo to carousel  

export default {
	components: { ProductListItem, Modal },
  data() {
    return {
      items: [],
      showModal: false,
      action: null,
      item: {},
    }
  },
  methods: {
    handleDelete(e) {
      const oldDtata = [...this.items]
      const newData = oldDtata.filter(item => item.id !== e)
      this.items = newData
    },
    async handleEdit(e) {
      const response =  await fetch(`/api/shop/${e}`) 
      const data = await response.json()
      this.item = data
      this.action = 'editing'
      this.showModal = !this.showModal
    },
    handleModalClose(){
      this.showModal = !this.showModal
    },
    handleEditSave(e){
      const editedItemRemoved = [...this.items].filter(item => item.id !== e.id)
      const newData = [...editedItemRemoved, e]
  
      this.items = newData
    }
  },
  
 async mounted (){
    const response = await fetch('/api/shop')
    const data = await response.json()
    this.items = [...this.items, ...data]
  }
}
</script>
