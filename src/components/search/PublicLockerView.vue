<script setup lang="ts">
import { onMounted, ref, Ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import SearchHeader from "@/components/search/SearchHeader.vue";
import PublicFileList from "./PublicFileList.vue";
import { FileEntry, getPublicLockerFiles, downloadFile } from '@/api/file';

const route = useRoute();
const router = useRouter();

const lockername = computed(() => route.params.lockername as string);
const lockerUid = computed(() => route.query.uid as string);

const files: Ref<{header: string[], data: FileEntry[]}> = ref({
    header: [],
    data: []
});

const pidStack: Ref<string[]> = ref([]);
const pathNameStack: Ref<string[]> = ref(['']);
const fileCache: Ref<Record<string, FileEntry[]>> = ref({});
const loading: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

/**
 * Can we go back? Only if pidStack has more than 1 element
 */
const canGoBack = computed(() => pidStack.value.length > 1);

/**
 * Current breadcrumb path display
 */
const currentPath = computed(() => {
    if (pathNameStack.value.length === 0) return '/';
    return pathNameStack.value.length === 1 ? '/' : `/${pathNameStack.value.slice(1).join('/')}`;
});

/**
 * Load files from API or cache
 * Edge case safe: Validates pid before API call
 */
async function loadFiles(pid: string) {
    if (!pid) {
        errorMessage.value = 'Invalid folder ID';
        return;
    }

    // Check cache first
    if (fileCache.value[pid]) {
        files.value.data = fileCache.value[pid];
        errorMessage.value = '';
        return;
    }

    loading.value = true;
    errorMessage.value = '';

    try {
        const response = await getPublicLockerFiles(lockerUid.value, pid);
        fileCache.value[pid] = response.data;
        files.value.data = response.data;
        files.value.header = response.header;
    } catch (error: any) {
        console.error('Error loading files:', error);
        errorMessage.value = error?.message || 'Failed to load files';
        files.value.data = [];
    } finally {
        loading.value = false;
    }
}

/**
 * Navigate to a folder
 * Edge case safe: Validates folderId before adding to stack
 */
function navigateToFolder(folderId: string, folderName: string) {
    if (!folderId) {
        console.error('Invalid folder ID');
        return;
    }

    pidStack.value.push(folderId);
    pathNameStack.value.push(folderName || '');
    loadFiles(folderId);
    router.push({ query: { uid: lockerUid.value, pid: folderId } });
}

/**
 * Go back one level
 * Edge case safe: Only pops if pidStack.length > 1 (root element stays)
 */
function goBack() {
    if (pidStack.value.length <= 1) {
        console.warn('Already at root level, cannot go back');
        return;
    }

    pidStack.value.pop();
    pathNameStack.value.pop();

    const prevPid = pidStack.value[pidStack.value.length - 1];
    if (!prevPid) {
        console.error('Invalid previous parent ID');
        return;
    }

    loadFiles(prevPid);
    router.push({ query: { uid: lockerUid.value, pid: prevPid } });
}

/**
 * Download file from public locker
 */
async function downloadFileAction(fileId: string, fileName: string) {
    try {
        const blob = await downloadFile(fileId);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading file:', error);
        errorMessage.value = 'Failed to download file';
    }
}

/**
 * Initialize: Load root folder on mount
 * Edge case safe: Validates route params and initializes pidStack with root_id
 */
onMounted(async () => {
    const initialPid = route.query.pid as string;
    
    if (!lockerUid.value) {
        errorMessage.value = 'Invalid locker ID';
        return;
    }

    if (!initialPid) {
        errorMessage.value = 'Invalid folder ID';
        return;
    }

    // Initialize pidStack with root ID
    pidStack.value = [initialPid];
    await loadFiles(initialPid);
});
</script>

<template>
    <div class="min-h-screen bg-white flex flex-col">
        <SearchHeader />
        
        <div class="flex-1 px-6 py-8">
            <div class="max-w-7xl mx-auto space-y-6">
                <!-- Header with locker info -->
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 class="text-3xl font-bold">{{ lockername }}'s Files</h1>
                        <p class="text-sm text-gray-600 mt-2">Browsing public files • Download available</p>
                        <p class="text-xs text-gray-500 mt-1">Current path: {{ currentPath }}</p>
                    </div>
                </div>

                <!-- Error message -->
                <div v-if="errorMessage" class="rounded-3xl border border-red-200 bg-red-50 p-6">
                    <p class="text-red-900 font-semibold">{{ errorMessage }}</p>
                </div>

                <!-- Loading state -->
                <div v-if="loading" class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p class="text-gray-500">Loading files...</p>
                </div>

                <!-- File list (only show if loaded and no error) -->
                <div v-else-if="!errorMessage && pidStack.length > 0">
                    <PublicFileList
                        :files="files"
                        :canGoBack="canGoBack"
                        @download="downloadFileAction"
                        @goToFolder="navigateToFolder"
                        @back="goBack" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
