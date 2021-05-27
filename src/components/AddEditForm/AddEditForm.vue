<template>
  <div>
    <form class="form-container">
      <input-group
        label-id="title"
        label-text="Title"
      >
        <input
          v-model="title"
          v-validate="'required'"
          class="input"
          name="title"
          placeholder="Enter the title"
        >
        <span class="error-message">{{ errors.first('title') }}</span>
      </input-group>
      <input-group
        label-id="price"
        label-text="Price"
      >
        <input
          v-model="price"
          v-validate="'required|decimal'"
          class="input"
          type="number"
          name="price"
          placeholder="Enter the price"
        >
        <span class="error-message">{{ errors.first('price') }}</span>
      </input-group>
      <input-group
        label-id="url"
        label-text="Url"
      >
        <input
          v-model="url"
          v-validate="'required'"
          class="input"
          name="url"
          placeholder="Enter the url"
        >
        <span class="error-message"> {{ errors.first('url') }}</span>
      </input-group>
      <input-group
        label-id="checkbox"
        label-text="Add to favorites?"
      >
        <input
          v-model="favorite"
          class="input"
          name="url"
          type="checkbox"
        >
      </input-group>
    </form>
    <div class="form-buttons"> 
      <template v-if="item.id">
        <v-button
          class="button-delete"
          @click="$emit('close')"
        >
          Cancel Edit
        </v-button>
        <v-button
          class="button-edit"
          :disabled="buttonDisabled"
          @click="handleEditSave"
        >
          Save Edit
        </v-button>
      </template>
      <template v-else>
        <v-button
          class="button-delete"
          @click="$emit('close')"
        >
          Cancel
        </v-button>
        <v-button
          class="button-edit"
          :disabled="buttonDisabled"
          @click="handleSave"
        >
          Save Item
        </v-button>
      </template>
    </div>
  </div>
</template>

<script>
import t from "vue-types"

import { putData, postData } from "../../api/apiCalls"
import InputGroup from "../InputGroup/InputGroup.vue"
import VButton from "../VButton/VButton.vue"

export default {
  components: {
    InputGroup,
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
      favorite: "",
      formAction: "",
      buttonDisabled: false,
    }
  },
  computed: {
    formErrors () {
      return this.$validator.errors
    },
  
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
          this.favorite = val.favorite
        } else {
          this.id = null
          this.price = null
          this.title = null
          this.url = null
          this.favorite = null
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
     async handleEditSave (){
      const newData = {
        title: this.title,
        price: this.price,
        url: this.url,
        id: this.id,
        favorite: this.favorite
      }
      const response = await putData(`shop/${this.id}`, JSON.stringify(newData))
      
      if (typeof response !== 'string') {
        this.$emit("save-edit", response)
        this.$emit("close")

        if (this.item.favorite !== this.favorite) this.$emit('favorite-changed')
      }
    },
    async handleSave(){
      const newData = {
        title: this.title,
        price: this.price,
        url: this.url,
        favorite: this.favorite
      }

      const response = await postData(`shop/`, JSON.stringify(newData))
      if (typeof response !== 'string') this.$emit('save-item', response)
    }
  }
}
</script>

<style scoped>

.error-message {
  font-size: .6rem;
  color: red;
}
</style>