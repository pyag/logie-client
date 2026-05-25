<script setup lang="ts">
import { FileEntry } from '@/api/file';
import Link from '@/components/Link.vue';
import { isRoot } from '@/logic/fpath';

const props = defineProps<{
    files: {
        header: string[],
        data: FileEntry[]
    }
}>();

function formatModifiedDate(dateString: string): string {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) {
        return dateString;
    }

    return parsed.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
</script>

<template>
    <div class="rounded-lg p-2 bg-gray-50 overflow-hidden">
        <table class="min-w-full table-fixed border-collapse rounded-lg">
            <thead class="bg-blue-100 border-none">
                <tr>
                    <th class="text-left text-sm uppercase tracking-wider text-gray-500 py-1.5 px-2 w-[40%]">{{ files.header[0] }}</th>
                    <th class="text-left text-sm uppercase tracking-wider text-gray-500 py-1.5 px-2 w-[15%]">{{ files.header[1] }}</th>
                    <th class="text-left text-sm uppercase tracking-wider text-gray-500 py-1.5 px-2 w-[15%]">{{ files.header[2] }}</th>
                    <th class="text-left text-sm uppercase tracking-wider text-gray-500 py-1.5 px-2 w-[30%]">{{ files.header[3] }}</th>
                    <th class="text-left text-sm uppercase tracking-wider text-gray-500 py-1.5 px-2 w-[15%]">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr v-if="!isRoot()" @click="$emit('goBackFolder')" class="cursor-pointer even:bg-blue-50 hover:bg-violet-200 transition-colors rounded! border-none">
                    <td class="py-1.5 px-2 italic text-gray-600" colspan="5">
                        <span class="text-lg font-extrabold">..</span>
                    </td>
                </tr>
                <tr v-if="!files.data || files.data.length === 0">
                    <td class="py-4 px-2 italic text-center text-gray-600 bg-teal-100" colspan="5">No files found.</td>
                </tr>
                <tr v-else v-for="file in files.data" :key="file.name" :class="[{ 'opacity-95': file.hidden }, 'even:bg-blue-50', 'hover:bg-violet-200', 'transition-colors', 'rounded!', 'border-none']">
                    <td class="py-1.5 px-2 overflow-hidden whitespace-nowrap text-ellipsis" :title="file.name">
                        <span v-if="file.type == 'folder'" :class="file.hidden ? 'text-gray-800' : ''">
                            <Link @click="$emit('goToFolder', file.file_id, file.name)">
                                {{ file.name }}
                            </Link>
                        </span>
                        <span v-else class="text-gray-800">
                            {{ file.name }}
                        </span>
                        <span v-if="file.hidden" class="ml-2 inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-orange-600">Hidden</span>
                    </td>
                    <td class="py-1.5 px-2 text-base">{{ file.type }}</td>
                    <td class="py-1.5 px-2 text-base">{{ file.size }}</td>
                    <td class="py-1.5 px-2 text-base">{{ formatModifiedDate(file.modified) }}</td>
                    <td class="py-1.5 px-2 text-base flex">
                        <Link class="text-blue-600" @click="$emit('download', file.file_id, file.name)">Download</Link>
                        <Link class="ml-4 text-green-600" @click="file.hidden ? $emit('unhide', file.file_id) : $emit('hide', file.file_id)">{{ file.hidden ? 'Unhide' : 'Hide' }}</Link>
                        <Link class="ml-4 text-red-600" @click="$emit('delete', file.file_id)">Delete</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>
