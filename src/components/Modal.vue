<script setup>
const isVisible = defineModel({
    type: Boolean,
});

function closeModal() {
    isVisible.value = false;
}
</script>

<template>
    <Transition name="modal">
        <div v-if="isVisible" @click="closeModal" class="modal-overlay flex justify-center items-center">
            <div class="modal-content w-fit h-fit rounded-lg overflow-hidden" @click.stop>
                <div class="modal-heading flex justify-end p-1">
                    <span class="close-button cursor-pointer bg-rose-400 p-0.75 mr-0.75 rounded-sm" @click="closeModal">&times;</span>
                </div>
                <div class="p-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-overlay {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    transition: opacity 0.3s ease;
}

.modal-content {
    background: #ffeeff;
    transition: all 0.3s ease;
}

.close-button {
    border-radius: 100%;
    line-height: 0.8em;
    /* font-size: 1.25em; */
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
