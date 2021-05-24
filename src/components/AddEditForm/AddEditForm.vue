<template>
<div>
  <form class="form-container">
    <input-group labelId="title" labelText="Title">
      <template class="input-error-block" v-slot:input>
        <input class="input" v-validate="'required'" v-model="title" name="title" placeholder="Enter the title"  />
        <span class="error-message">{{ errors.first('title') }}</span>
      </template>
    </input-group>
    <input-group labelId="price" labelText="Price">
      <template v-slot:input>
        <input class="input" v-validate="'required|decimal'" v-model="price" name="price"  placeholder="Enter the price"  />
         <span class="error-message">{{ errors.first('price') }}</span>
      </template>
    </input-group>
    <input-group labelId="url" labelText="Url">
     <template v-slot:input>
        <input class="input" v-validate="'required'" v-model="url" name="url" placeholder="Enter the url"  />
         <span class="error-message"> {{ errors.first('url') }}</span>
      </template>
    </input-group>
  
  </form>
  <div class="form-buttons"> 
       <template v-if="formAction === 'Editing'">
         <VButton class="button-delete"  @click="handleClose" text="Cancel Edit"/>
        <VButton class="button-edit" :disable="buttonDisabled"  @click="handleEditSave" text="Save Edit"/>
      </template>
      <template v-else-if="formAction === 'Saving'">
        <VButton class="button-delete" @click="handleClose" text="Cancel"/>
        <VButton class="button-edit"  @click="handleSave" text="Save Item"/>
      </template>
    </div>
   
</div>
  
</template>

<script>
import t from "vue-types"

import { putData } from "../../api/apiCalls"
import InputGroup from "../InputGroup/InputGroup.vue"
import VButton from "../VButton/VButton.vue"

export default {
  components: {
    "input-group": InputGroup,
    VButton,
  },
  props: {
    item: t.object,
    action: t.string,
  
  },
  data() {
    return {
      id: "",
      price: "",
      title: "",
      url: "",
      formAction: "",
      buttonDisabled: false,
    }
  },
  computed: {
    formErrors () {
      return this.$validator.errors
    }
  },
  watch: {
    item: {
      immediate: true, 
      handler(val) {
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
      handler(val){
        if (val) this.formAction = val
      }
    },
    formErrors : {
      handler (value) {
        if (value.items.length > 0) {
          this.buttonDisabled = true
        } else {
          this.buttonDisabled = false
        }
      },

      deep:true 
    }
  },
  methods: {
    handleClose(){
      this.$emit("close-modal")
    },
    async handleEditSave (){
      const newData = {
        title: this.title,
        price: this.price,
        url: this.url,
        id: this.id
      }

      const response = await putData(`shop/${this.id}`, JSON.stringify(newData))

      const data = await response.json()
      this.$emit("save-edit", data)
      this.$emit("close-modal")

    },
  }
}
</script>


<style scoped>

.error-message {
  font-size: .6rem;
  color: red;
}


</style>