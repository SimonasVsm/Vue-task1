<template>
  <li
    :id="item.id"
    class="items-container__item"
  >
    <div class="photo">
      <img
        class="item"
        :src="item.url"
        :alt="`${item.title} photo`"
      >
    </div>
    <div class="information">
      <p class="description">
        {{ item.title }}
      </p>
      <p class="price">
        {{ item.price }}
      </p>
    </div>
    <div class="action-buttons">
      <v-button
        class="button-edit"
        @click="$emit('edit-item', item.id)"
      >
        Edit
      </v-button>
      <v-button
        class="button-delete"
        @click="$emit('delete-item', item.id)"
      >
        Delete
      </v-button>
    </div>
  </li>
</template>

<script>
import t from "vue-types"
import VButton from "../VButton/VButton.vue"

export default {
  components: { VButton },
  props: {
    item: t.object,
  },
}
</script>

<style scoped>
.items-container__item {
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
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
