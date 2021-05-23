<template>
    <div class="modal" id="exampleModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div id="modal-header" class="modal-header">
        <VButton @click="handleClose" text="X"/>
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
</template>

<script>
import t from 'vue-types'
import VButton from '../VButton/VButton.vue'
import CustomInput from '../VInput/custom-input.vue'

export default {
	components: { VButton,  CustomInput },
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
       this.$emit('close-modal')
    },
  }
}
</script>

<style scoped>
/* .modal-content {
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
} */
</style>