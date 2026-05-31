<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

import BaseButton from './BaseButton.vue';
import Label from './Label.vue';

interface Props {
    modalTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modalTitle: "",
});

const isVisible = ref(true);
const emit = defineEmits(['close']);

function closeModal() {
    // start leave transition; emit 'close' only after transition finishes
    isVisible.value = false;
}

function onAfterLeave() {
    emit('close');
}
</script>

<template>
    <Transition appear name="modal" @after-leave="onAfterLeave">
        <div v-show="isVisible" @click="closeModal" class="modal-overlay flex justify-center items-center">
            <div class="modal-content rounded-lg overflow-hidden" @click.stop>
                <div class="modal-heading relative flex items-center p-0.5 py-1">
                    <div class="modal-title text-sm absolute left-1/2 transform -translate-x-1/2">
                        <Label>{{ modalTitle }}</Label>
                    </div>
                    <div class="modal-controls ml-auto mr-1 w-4 h-4 bg-red-700 rounded-full flex items-center justify-center">
                        <BaseButton @click="closeModal">
                            <X class="h-3 w-3 text-white" stroke-width="4" />
                        </BaseButton>
                    </div>
                </div>
                <div class="modal-body p-4">
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
