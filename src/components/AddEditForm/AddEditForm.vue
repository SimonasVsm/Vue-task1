<template>
<div>
  <form  class="form-container">
    <input-group labelText="Title">
      <template v-slot:input>
        <input v-model="title"  placeholder="Enter the title"  />
      </template>
    </input-group>
    <input-group labelText="Price">
      <template v-slot:input>
        <input  v-model="price"  placeholder="Enter the price"  />
      </template>
    </input-group>
    <input-group labelText="Url">
     <template v-slot:input>
        <input  v-model="url"  placeholder="Enter the url"  />
      </template>
    </input-group>
  </form>
  <div class="form-buttons"> 
       <template v-if="formAction === 'Editing'">
         <VButton @click="handleClose" text="Cancel Edit"/>
        <VButton  @click="handleEditSave" text="Save Edit"/>
      </template>
      <template v-else-if="formAction === 'Saving'">
        <VButton @click="handleClose" text="Cancel"/>
        <VButton  @click="handleSave" text="Save Item"/>
      </template>
    </div>
   
</div>
  
</template>

<script>
import { object, string } from 'vue-types'
import InputGroup from '../InputGroup/InputGroup.vue'
import VButton from '../VButton/VButton.vue'

export default {
  components: {
    'input-group': InputGroup,
    VButton,
  },
  props: {
    item: object,
    action: string
  },
  data() {
    return {
        id: '',
        price: '',
        title: '',
        url: '',
        formAction: ''
    
    }
  },
  watch: {
    item: {
      immediate: true, 
     handler(val, oldVal) {
       if(val) {
         this.id = val.id
         this.price = val.price
         this.title = val.title
         this.url = val.url
       } else {
        this.id = null
        this.price = null
        this.title = null
        this.url = null
       }
     }
    },
    action: {
      immediate: true,
      handler(val, oldVal){
        if (val) this.formAction = val
      }
    }
  },
  methods: {
     handleClose(){
      this.$emit('close-modal')
    },
    async handleEditSave (){
       const newData = {
        title: this.title,
        price: this.price,
        url: this.url,
        id: this.id
      }
    const response = await fetch(`/api/shop/${this.id}`, {
        method: 'PUT',
        	headers: {
			  'Content-Type': 'application/json',
		    },
        body: JSON.stringify(newData)
      })

      const data = await response.json()
      // man reikia ne emitinti eventa, o callinti actiona
      this.$emit('save-edit', data)
      this.$emit('close-modal')

    }
  }
}
</script>