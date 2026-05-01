<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

import Button from "@/components/Button.vue";
import UploadModal from "./UploadModal.vue";
import { getFiles } from '@/api/file';
import ListView from './fileViews/ListView.vue';

const files: Ref = ref({
    header: [],
    data: []
});

const showUploadModal = ref(false);
const selectedFiles: Ref<File[]> = ref([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

onMounted(async () => {
    try {
        const json = await getFiles();
        files.value.data = json.data;
        files.value.header = json.header;
    } catch (error) {
        console.error('Error fetching files:', error);
    }
});

function openFileDialog() {
    fileInputRef.value?.click();
}

function handleFileSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        selectedFiles.value = Array.from(input.files);
        showUploadModal.value = true;
    }
}

function closeUploadModal() {
    showUploadModal.value = false;
    // Reset the file input
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
}

</script>

<template>
    <div class="p-1">
        <ListView :files="files" />
        
        <div class="mt-4">
            <Button @click="openFileDialog">
                Upload File
            </Button>
        </div>

        <input
            ref="fileInputRef"
            type="file"
            multiple
            class="hidden"
            @change="handleFileSelection"
        />

        <UploadModal
            :showModal="showUploadModal"
            :selectedFiles="selectedFiles"
            @close="closeUploadModal"
        />
    </div>
</template>

<style scoped>
</style>
