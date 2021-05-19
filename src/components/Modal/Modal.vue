<template>
    <div class="modal" id="exampleModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
      {{title}}
        <button type="button" id="close" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="modal-form">
        <label class="modal-form__item" for="title">Title</label>
        <input class="modal-form__item" type="text" id="title" name="title" v-model="itemTitle" >
        <label class="modal-form__item" for="price">Price</label>
        <input class="modal-form__item" type="number" id="price" name="price"  v-model="itemPrice" >
        <label class="modal-form__item" for="url">Url</label>
        <input class="modal-form__item" type="text" id="url" name="url"  v-model="itemUrl" >
        <label class="modal-form__item" for="favorite">Add to carousel?</label>
        <input class="modal-form__item" type="checkbox" id="favorite" name="favorite"  >
        </form>
      </div>
      <div class="modal-footer">
        <VButton @click="handleModalClose" text="Close"/>
        <VButton v-if="title === 'editing'" @click="handleSave" text="Save edit"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import t from 'vue-types'
import VButton from '../VButton/VButton.vue'

export default {
	components: { VButton },
  props: {
    title: t.string,
    buttonText: t.string,
    initialTitle: t.string,
    initialPrice: t.string,
    initialUrl: t.string,
    itemId: t.number,
  },
  data: function() {
    return {
      itemTitle: this.initialTitle,
      itemPrice: this.initialPrice,
      itemUrl: this.initialUrl
    }
  },

  methods: {
    handleModalClose: function(){
      this.$emit('close-modal')
    },
    handleSave: async function(){
      const newData = {
        title: this.itemTitle,
        price: this.itemPrice,
        url: this.itemUrl,
        id: this.itemId
      }

      const response = await fetch(`/api/shop/${this.itemId}`, {
        method: 'PUT',
        	headers: {
			  'Content-Type': 'application/json',
		    },
        body: JSON.stringify(newData)
      })

      const data = await response.json()
     
      this.$emit('edited-item', data)
      this.$emit('close-modal')
      
    }
  }
}
</script>