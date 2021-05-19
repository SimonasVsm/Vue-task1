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
    <VButton @click="handleEdit" :data-id="id" text="Edit"/>
    <VButton @click="handleDelete" :data-id="id" text="Delete" />
  </div>
</li>
</template>

<script>
import t from 'vue-types'
import VButton from '../VButton/VButton.vue'
 export default {
	components: { VButton },
   props: {
     id: t.number,
     url: t.string,
     title: t.string, 
     price: t.string,
   },
   methods: {
     handleEdit: function(){
       this.$emit('editing-item', this.id)
     },
     handleDelete:  async function(){
       if(confirm('Are you sure?')) {
          const response = await fetch(`/api/shop/${this.id}`, {
         method: 'DELETE'
       })
       this.$emit('deleted-item', this.id)
       }
        
     }
   }
 }
</script>


<style scoped>
.items-container__item {
	border: 1px solid gray;
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
</style>