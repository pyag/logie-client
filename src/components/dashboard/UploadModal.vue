<script setup lang="ts">
import { X } from 'lucide-vue-next';

import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import type { UploadItem } from '@/types/uploadTypes';

interface Props {
    showModal: boolean;
    uploadItems: UploadItem[];
    uploading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'upload', 'remove-file', 'clear']);

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeItem(id: string) {
    emit('remove-file', id);
}

function clearAllFiles() {
    emit('clear');
}

function uploadAll() {
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
                        <div v-if="uploadItems.length === 0" class="text-gray-500">
                            No files selected
                        </div>
                        <ul v-else class="space-y-1">
                            <li
                                v-for="item in uploadItems"
                                :key="item.id"
                                class="text-sm text-gray-700 p-2 bg-gray-200 rounded-md"
                            >
                                <div class="flex items-start justify-between gap-2">
                                    <div class="flex-1 min-w-0">
                                        <div class="font-medium truncate">{{ item.file.name }}</div>
                                        <div class="text-xs text-gray-500">
                                            {{ formatFileSize(item.file.size) }}
                                        </div>
                                    </div>
                                    <button
                                        v-if="item.status === 'pending' || item.status === 'error'"
                                        @click="removeItem(item.id)"
                                        class="shrink-0 p-1 hover:bg-red-200 rounded-md transition-colors"
                                        title="Remove file"
                                    >
                                        <X class="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <div class="h-2 bg-gray-300 rounded-full overflow-hidden">
                                        <div
                                            class="h-full bg-blue-500 transition-all duration-300"
                                            :style="{ width: item.progress + '%' }"
                                        />
                                    </div>
                                    <div class="flex justify-between text-xs text-gray-600 mt-1">
                                        <span>
                                            {{ item.status === 'uploading' ? 'Uploading...' : item.status === 'error' ? 'Error' : item.status === 'done' ? 'Complete' : 'Ready' }}
                                        </span>
                                        <span>{{ item.progress }}%</span>
                                    </div>
                                    <div v-if="item.error" class="text-xs text-red-600 mt-1">
                                        {{ item.error }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="uploadItems.length > 0" class="flex gap-2 mt-4 pt-4 border-t border-gray-300">
                    <Button
                        @click="uploadAll"
                        :disabled="uploadItems.length === 0 || uploading"
                        extraClasses="flex-1"
                    >
                        Upload All
                    </Button>
                    <Button
                        @click="clearAllFiles"
                        :disabled="uploading"
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
