<template>
    <li :id="id" class="items-container__item">
   <div class="photo">
    <img
      class="item"
      :src="url"
      alt="Shop item"
      />
    </div>
  <div class="information">
    <p class="description">{{title}}</p>
    <p class="price">{{price}}</p>
  </div>
  <div class="action-buttons">
    <VButton class="button-edit" @click="handleEdit" text="Edit"/>
    <VButton class="button-delete" @click="handleDelete" text="Delete" />
  </div>
</li>
</template>

<script>
import t from "vue-types"
import VButton from "../VButton/VButton.vue"


export default {
  components: { VButton },
  props: {
    id: t.number,
    url: t.string,
    title: t.string, 
    price: t.string,
  },
  methods: {
    handleEdit(){
      this.$emit("editing-item", this.id)
    },
    handleDelete(){
      this.$emit("delete-item", this.id)
    },
  }
}
</script>


<style scoped>
.items-container__item {
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%),
   0 1px 2px rgb(0 0 0 / 24%);
	min-height: 10rem;
	min-width: 10rem;
	object-fit: contain;
}

.item {
	max-width: 100%;
}

.information {
	display: flex;
	justify-content: space-around;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>