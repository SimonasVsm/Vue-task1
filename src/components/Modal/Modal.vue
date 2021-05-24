<template>
 <div class="overlay">
  <div class="modal" id="exampleModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div id="modal-header" class="modal-header">
        <VButton class="button-small" @click="handleClose" text="X"/>
        <slot name="header"></slot>
      </div>
      <div id="modal-body" class="modal-body">
        <slot name="modal-body"></slot>
      </div>
      <div id="modal-footer" class="modal-footer">
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
</div>
 </div>
   
</template>

<script>
import t from "vue-types"

import VButton from "../VButton/VButton.vue"


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
    handleClose(){
      this.$emit("close-modal")
    },
  },
  mounted () {
    document.body.classList.add("fixed")
  },
  destroyed () {
    document.body.classList.remove("fixed")
  }
}
</script>

<style scoped>

.overlay {
	position: absolute;
	width: 100%;
	height: 100vh;
	overflow-y: hidden;
	z-index: 100;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--white);
}

.modal-header {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-between;
}
</style>