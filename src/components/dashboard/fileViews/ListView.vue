<script setup lang="ts">
import Link from '@/components/Link.vue';

const props = defineProps<{
    files: {
        header: string[],
        data: {
            file_id: string,
            name: string,
            type: string,
            size: string,
            modified: string
        }[]
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
                <tr v-if="!files.data || files.data.length === 0">
                    <td class="py-4 px-2 italic text-center text-gray-600" colspan="4">No files found.</td>
                </tr>
                <tr v-else v-for="file in files.data" :key="file.name" class="even:bg-blue-50 rounded! border-none">
                    <td class="py-1.5 px-2 overflow-hidden whitespace-nowrap text-ellipsis text-base" :title="file.name">{{ file.name }}</td>
                    <td class="py-1.5 px-2 text-base">{{ file.type }}</td>
                    <td class="py-1.5 px-2 text-base">{{ file.size }}</td>
                    <td class="py-1.5 px-2 text-base">{{ formatModifiedDate(file.modified) }}</td>
                    <td class="py-1.5 px-2 text-base flex">
                        <Link class="text-blue-600" @click="$emit('download', file.file_id, file.name)">Download</Link>
                        <Link class="ml-4 text-green-600" @click="$emit('hide', file.file_id)">Hide</Link>
                        <Link class="ml-4 text-red-600" @click="$emit('delete', file.file_id)">Delete</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>
