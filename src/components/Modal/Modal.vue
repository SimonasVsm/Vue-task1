<template>
    <div class="modal" id="exampleModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div id="modal-header" class="modal-header">
        <slot name="modal-header"></slot>
      {{title}}
      <VButton @click="handleModalClose" text="X"/>
      </div>
      <div id="modal-body" class="modal-body">
        <slot name="modal-body"></slot>
        <form class="modal-form">
        <label class="modal-form__item" for="title">Title</label>
        
        <!-- <my-input  v-model="itemTitle"></my-input> -->
        <!-- <input class="modal-form__item" type="text" id="title" name="title" v-model="itemTitle" > -->
        <custom-input v-model="itemTitle"></custom-input>
        <label class="modal-form__item" for="price">Price</label>
        <input class="modal-form__item" type="number" id="price" name="price"  v-model="itemPrice" >
        <label class="modal-form__item" for="url">Url</label>
        <input class="modal-form__item" type="text" id="url" name="url"  v-model="itemUrl" >
        <label class="modal-form__item" for="favorite">Add to carousel?</label>
        <input class="modal-form__item" type="checkbox" id="favorite" name="favorite"  >
        </form>
      </div>
      <div id="modal-footer" class="modal-footer">
        <slot name="modal-footer"></slot>
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
import CustomInput from '../VInput/custom-input.vue'
import VInput from '../VInput/Vinput.vue'

export default {
	components: { VButton, VInput, CustomInput },
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

<style scoped>
.modal-content {
	height: 275px;
	padding: var(--spacing-md);
	width: 300px;
	background: hsl(0deg 2% 65%);
	display: flex;
	border-radius: 2rem;
	flex-direction: column;
	justify-content: space-between;
}

.modal-header {
	display: flex;
	justify-content: space-between;
}

.modal-title {
	margin: 0;
	font-size: inherit;
}

.modal-form {
	display: flex;
	flex-direction: column;
}

.modal-form__item {
	padding: var(--spacing-xs);
}

.modal-footer {
	display: flex;
	justify-content: space-around;
}

.modal-btn {
	padding: var(--spacing-xs);
}
</style>