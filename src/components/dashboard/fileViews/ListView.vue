<script setup lang="ts">
const props = defineProps<{
    files: {
        header: string[],
        data: {
            name: string,
            type: string,
            size: string,
            modified: string
        }[]
    }
}>();
</script>

<template>
    <div class="rounded-lg p-2 bg-gray-50">
        <div class="grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr_1fr] border-b border-gray-200">
            <div v-for="header in files.header" :key="header" class="font-bold text-sm uppercase py-2 px-2 text-gray-500">
                {{ header }}
            </div>
        </div>

        <div v-if="!files.data || files.data.length === 0" class="py-4 italic text-center text-gray-600">
            No files found.
        </div>
        <div v-else class="pt-1 pb-5 overflow-y-auto">
            <div v-for="file in files.data" :key="file.name" class="grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr_1fr] even:bg-blue-100 rounded-lg">
                <div v-for="key in files.header" :key="key" :class="key === 'name' ? 'py-1 px-2 text-base truncate' : 'py-1 px-2 text-base'">
                    {{ file[key as keyof typeof file] }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
