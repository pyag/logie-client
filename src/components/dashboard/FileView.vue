<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

import Button from "@/components/Button.vue";
import UploadModal from "./UploadModal.vue";
import { FileEntry, getFiles, uploadChunk, downloadFile, hideFile } from '@/api/file';
import ListView from './fileViews/ListView.vue';
import type { UploadItem } from '@/types/uploadTypes';

const files: Ref = ref({
    header: [] as string[],
    data: [] as FileEntry[],
});
const showUploadModal = ref(false);
const uploadItems: Ref<UploadItem[]> = ref<UploadItem[]>([]);
const isUploading: Ref<boolean> = ref(false);
const fileInputRef: Ref<HTMLInputElement | null> = ref<HTMLInputElement | null>(null);

async function refreshFiles() {
    try {
        const json = await getFiles();
        files.value.data = json.data;
        files.value.header = json.header;
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

onMounted(refreshFiles);

function generateUploadId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function openFileDialog() {
    fileInputRef.value?.click();
}

function handleFileSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
        return;
    }

    uploadItems.value = Array.from(input.files).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file,
        progress: 0,
        status: 'pending',
    }));

    showUploadModal.value = true;
}

function closeUploadModal() {
    showUploadModal.value = false;
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
}

function removeUploadItem(id: string) {
    uploadItems.value = uploadItems.value.filter(item => item.id !== id);
}

function clearAllUploads() {
    uploadItems.value = [];
}

async function uploadSingleFile(item: UploadItem) {
    item.status = 'uploading';
    const chunkSize = 1024 * 1024;
    const totalChunks = Math.max(1, Math.ceil(item.file.size / chunkSize));
    const uploadId = generateUploadId();

    try {
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex += 1) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, item.file.size);
            const chunk = item.file.slice(start, end);

            const formData = new FormData();
            formData.append('file', chunk, item.file.name);
            formData.append('upload_id', uploadId);
            formData.append('filename', item.file.name);
            formData.append('file_type', item.file.type || 'application/octet-stream');
            formData.append('file_size', String(item.file.size));
            formData.append('chunk_index', String(chunkIndex));
            formData.append('total_chunks', String(totalChunks));

            await uploadChunk(formData);
            item.progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        }

        item.status = 'done';
        await refreshFiles();
        removeUploadItem(item.id);
    } catch (error: any) {
        item.status = 'error';
        item.error = error?.message || 'Upload failed';
    }
}

async function uploadAll() {
    if (uploadItems.value.length === 0) {
        return;
    }

    isUploading.value = true;
    const uploads = uploadItems.value.map(item => uploadSingleFile(item));
    await Promise.allSettled(uploads);
    isUploading.value = false;
}

async function handleDownload(fileId: string, filename: string) {
    try {
        const blob = await downloadFile(fileId);
        const downloadUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

async function handleHideFile(fileId: string) {
    try {
        await hideFile(fileId);
        await refreshFiles();
    } catch (error) {
        console.error('Error hiding file:', error);
    }
}
</script>

<template>
    <div class="p-1">
        <ListView :files="files" @download="handleDownload" @hide="handleHideFile" />

        <div class="mt-4">
            <Button @click="openFileDialog">
                Upload File
            </Button>
        </div>

        <input ref="fileInputRef" type="file" multiple class="hidden" @change="handleFileSelection" />

        <UploadModal :showModal="showUploadModal" :uploadItems="uploadItems" :uploading="isUploading"
            @close="closeUploadModal" @upload="uploadAll" @remove-file="removeUploadItem" @clear="clearAllUploads" />
    </div>
</template>

<style scoped></style>
