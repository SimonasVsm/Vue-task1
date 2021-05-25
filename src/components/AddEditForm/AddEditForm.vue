<template>
  <div>
    <form class="form-container">
      <input-group
        label-id="title"
        label-text="Title"
      >
        <template
          class="input-error-block"
        >
          <input
            v-model="title"
            v-validate="'required'"
            class="input"
            name="title"
            placeholder="Enter the title"
          >
          <span class="error-message">{{ errors.first('title') }}</span>
        </template>
      </input-group>
      <input-group
        label-id="price"
        label-text="Price"
      >
        <template>
          <input
            v-model="price"
            v-validate="'required|decimal'"
            class="input"
            name="price"
            placeholder="Enter the price"
          >
          <span class="error-message">{{ errors.first('price') }}</span>
        </template>
      </input-group>
      <input-group
        label-id="url"
        label-text="Url"
      >
        <template>
          <input
            v-model="url"
            v-validate="'required'"
            class="input"
            name="url"
            placeholder="Enter the url"
          >
          <span class="error-message"> {{ errors.first('url') }}</span>
        </template>
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

import { putData } from "../../api/apiCalls"
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
     async handleEditSave (){
      const newData = {
        title: this.title,
        price: this.price,
        url: this.url,
        id: this.id
      }

      const response = await putData(`shop/${this.id}`, JSON.stringify(newData))
      
      if (typeof response === 'string') {
        this.$emit("close")
      } else {
      this.$emit("save-edit", response)
      this.$emit("close")
      }
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