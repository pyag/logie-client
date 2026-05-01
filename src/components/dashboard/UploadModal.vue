<script setup lang="ts">
import { X } from 'lucide-vue-next';

import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";

interface Props {
    showModal: boolean;
    selectedFiles: File[];
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'upload']);

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(index: number) {
    props.selectedFiles.splice(index, 1);
}

function clearAllFiles() {
    props.selectedFiles.length = 0;
}

function uploadAll() {
    // TODO: Connect to backend API to upload files
    console.log('Uploading', props.selectedFiles.length, 'files');
    emit('upload');
}
</script>

<template>
    <Teleport to="body">
        <Modal
            v-if="showModal"
            modalTitle="Selected Files"
            @close="$emit('close')"
        >
            <div class="flex flex-col h-125 w-130">
                <div class="overflow-y-auto flex-1">
                    <div class="space-y-2">
                        <div v-if="selectedFiles.length === 0" class="text-gray-500">
                            No files selected
                        </div>
                        <ul v-else class="space-y-1">
                            <li
                                v-for="(file, index) in selectedFiles"
                                :key="index"
                                class="text-sm text-gray-700 p-2 bg-gray-200 rounded-md flex items-start justify-between gap-2"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="font-medium truncate">{{ file.name }}</div>
                                    <div class="text-xs text-gray-500">
                                        {{ formatFileSize(file.size) }}
                                    </div>
                                </div>
                                <button
                                    @click="removeFile(index)"
                                    class="shrink-0 p-1 hover:bg-red-200 rounded-md transition-colors"
                                    title="Remove file"
                                >
                                    <X class="h-4 w-4 text-red-600" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="selectedFiles.length > 0" class="flex gap-2 mt-4 pt-4 border-t border-gray-300">
                    <Button
                        @click="uploadAll"
                        extraClasses="flex-1"
                    >
                        Upload All
                    </Button>
                    <Button
                        @click="clearAllFiles"
                        btnClass="text-white py-2 px-3 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed !bg-red-500 hover:!bg-red-600 !bg-none"
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
</style>
