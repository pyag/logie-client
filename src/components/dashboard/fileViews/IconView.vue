<script setup lang="ts">
import { CirclePlay, File, FileText, Folder, Image, ArrowUpLeft } from 'lucide-vue-next';

import { FileEntry } from '@/api/file';
import { isRoot } from '@/logic/fpath';

const props = defineProps<{
    files: {
        header: string[],
        data: FileEntry[]
    }
}>();

function getTypeIcon(type: string) {
    switch (type) {
        case 'folder':
            return Folder;
        case 'video':
            return CirclePlay;
        case 'image':
            return Image;
        case 'pdf':
            return FileText;
        default:
            return File;
    }
}

function getTypeClasses(type: string) {
    switch (type) {
        case 'folder':
            return 'text-amber-500 fill-amber-200';
        case 'video':
            return 'text-red-500 fill-red-100';
        case 'image':
            return 'text-indigo-500 fill-indigo-100';
        case 'pdf':
            return 'text-rose-500 fill-rose-100';
        default:
            return 'text-slate-600 fill-slate-100';
    }
}
</script>

<template>
    <div class="rounded-xl bg-gray-50 p-3">
        <button
            v-if="!isRoot()"
            type="button"
            class="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
            @click="$emit('goBackFolder')"
        >
            <ArrowUpLeft class="h-4 w-4" />
            Back
        </button>

        <div v-if="!files.data || files.data.length === 0" class="rounded-lg border border-dashed border-slate-300 bg-slate-100 px-3 py-5 text-center text-sm italic text-slate-600">
            No files found.
        </div>

        <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div
                v-for="file in files.data"
                :key="file.file_id || file.name"
                class="group rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
                <div
                    class="flex cursor-pointer flex-col items-center justify-center text-center"
                    :title="file.name"
                    @click="file.type === 'folder' ? $emit('goToFolder', file.file_id, file.name) : $emit('view', file.file_id)"
                >
                    <div class="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                        <component
                            :is="getTypeIcon(file.type)"
                            :class="['h-9 w-9', getTypeClasses(file.type)]"
                            :stroke-width="1.5"
                        />
                    </div>

                    <div class="w-full truncate px-1 text-sm font-medium text-slate-800" :title="file.name">
                        {{ file.name }}
                    </div>
                    <div class="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                        {{ file.type }}
                    </div>
                </div>

                <div v-if="file.hidden" class="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-orange-600">
                    Hidden
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>