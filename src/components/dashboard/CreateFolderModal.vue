<script setup lang="ts">
import { Ref, ref } from 'vue';

import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";

interface Props {
    showModal: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'refresh', 'createFolder']);

const folderName: Ref = ref('');
const errorMessage: Ref = ref('');

function createFolder() {
    if (folderName.value.trim() === '') {
        errorMessage.value = 'Folder name cannot be empty.';
        return;
    }

    emit('createFolder', folderName.value);
    folderName.value = '';
    errorMessage.value = '';
}
</script>

<template>
    <Teleport to="body">
        <Modal
            v-if="showModal"
            modalTitle="Create New Folder"
            @close="$emit('close')"
        >
            <div class="flex flex-col gap-4">
                <input
                    v-model="folderName"
                    type="text"
                    placeholder="Folder Name"
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div v-if="folderName.trim() === ''" class="text-red-500 text-sm">{{ errorMessage }}</div>
                <Button @click="createFolder" class="self-end">Create</Button>
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
</style>
