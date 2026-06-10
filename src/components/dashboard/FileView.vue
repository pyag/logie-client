<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

import Button from "@/components/Button.vue";
import UploadModal from "./UploadModal.vue";
import CreateFolderModal from "./CreateFolderModal.vue";
import { FileEntry, getFiles, uploadChunk, downloadFile, hideFile, unhideFile, deleteFile, createFolder } from '@/api/file';
import ListView from './fileViews/ListView.vue';
import type { UploadItem } from '@/types/uploadTypes';
import { addFolderToPath, getParentId, setParentId, removeLastParentId, removeLastFolderFromPath } from '@/logic/fpath';

const files: Ref = ref({
    header: [] as string[],
    data: [] as FileEntry[],
});
const showUploadModal = ref(false);
const uploadItems: Ref<UploadItem[]> = ref<UploadItem[]>([]);
const isUploading: Ref<boolean> = ref(false);
const fileInputRef: Ref<HTMLInputElement | null> = ref<HTMLInputElement | null>(null);

const showCreateFolderModal = ref(false);

const isDragging = ref(false);

function onDragOver() {
    isDragging.value = true;
}

function onDragLeave() {
    isDragging.value = false;
}

function onDrop(event: DragEvent) {
    isDragging.value = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        // Maps files into the precise UploadItem format expected by UploadModal
        uploadItems.value = Array.from(event.dataTransfer.files).map((file, index) => ({
            id: `${Date.now()}-${index}`,
            file,
            progress: 0,
            status: 'pending',
        }));

        showUploadModal.value = true;
    }
}

async function refreshFiles() {
    try {
        const pid = getParentId();
        const json = await getFiles(pid);
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
    const pid = getParentId();

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
            formData.append('pid', String(pid));

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

    // Close the modal after all uploads are done if there are no failed uploads
    const hasErrors = uploadItems.value.some(item => item.status === 'error');
    if (!hasErrors) {
        showUploadModal.value = false;
    }
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

async function handleUnhideFile(fileId: string) {
    try {
        await unhideFile(fileId);
        await refreshFiles();
    } catch (error) {
        console.error('Error unhiding file:', error);
    }
}

async function handleDeleteFile(fileId: string) {
    try {
        await deleteFile(fileId);
        await refreshFiles();
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}

function openCreateFolderModal() {
    showCreateFolderModal.value = true;
}

function closeCreateFolderModal() {
    showCreateFolderModal.value = false;
}

async function createNewFolder(folderName: string) {
    // [TODO]: Call API to create folder
    await createFolder(folderName, getParentId());

    closeCreateFolderModal();
    await refreshFiles();
}

async function goToFolder(folderId: string, folderName: string) {
    // Set parent ID to the selected folder and refresh files
    setParentId(folderId);
    addFolderToPath(folderName);

    await refreshFiles();
}

async function goBackFolder() {
    // Remove the last parent ID and folder name from the path, then refresh files
    removeLastParentId();
    removeLastFolderFromPath();

    await refreshFiles();
}

</script>

<template>
    <div class="p-3 flex justify-center bg-gray-200 gap-x-2">
        <Button @click="openFileDialog">Upload Files</Button>
        <Button @click="openCreateFolderModal">Create New Folder</Button>
    </div>


    <div class="p-1">
        <div class="relative transition-all duration-200 rounded-lg p-2"
            :class="{ 'border-2 border-dashed border-blue-500 bg-blue-50/50 dark:bg-blue-950/20': isDragging }"
            @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
            <div v-if="isDragging"
                class="absolute inset-0 flex items-center justify-center bg-blue-50/40 dark:bg-blue-950/10 pointer-events-none z-10 rounded-lg">
                <span
                    class="text-blue-600 dark:text-blue-400 font-medium text-lg bg-white dark:bg-zinc-900 px-5 py-2 rounded-full shadow-md border border-blue-200">
                    Drop files to upload here
                </span>
            </div>

                <ListView
                    :files="files"
                    @download="handleDownload"
                    @hide="handleHideFile"
                    @unhide="handleUnhideFile"
                    @delete="handleDeleteFile"
                    @goToFolder="goToFolder"
                    @goBackFolder="goBackFolder" />

            </div>

            <input ref="fileInputRef" type="file" multiple class="hidden" @change="handleFileSelection" />

            <UploadModal :showModal="showUploadModal" :uploadItems="uploadItems" :uploading="isUploading"
                @close="closeUploadModal" @upload="uploadAll" @remove-file="removeUploadItem"
                @clear="clearAllUploads" />

            <CreateFolderModal :showModal="showCreateFolderModal" @close="closeCreateFolderModal"
                @createFolder="createNewFolder" />

        </div>
</template>

<style scoped></style>
