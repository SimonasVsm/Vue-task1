<template>
  <div class="overlay">
    <div
      id="exampleModal"
      class="modal"
    >
      <div
        class="modal-dialog"
        role="dialog"
      >
        <div class="modal-content">
          <div
            id="modal-header"
            class="modal-header"
          >
            <v-button
              class="button-small"
              @click="$emit('close')"
            >
              X
            </v-button>
            <slot name="header" />
          </div>
          <div
            id="modal-body"
            class="modal-body"
          >
            <slot name="body" />
          </div>
          <div
            id="modal-footer"
            class="modal-footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "../VButton/VButton.vue"

export default {
  components: { VButton },
  mounted () {
    document.body.classList.add("fixed")
  },
  destroyed () {
    document.body.classList.remove("fixed")
  },
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