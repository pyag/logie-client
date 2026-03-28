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
    <div class="flex flex-col rounded-lg p-2 bg-gray-50">
        <div class="flex border-b border-gray-200">
            <div v-for="header in files.header" :key="header" class="w-1/4">
                <div class="font-bold text-sm uppercase py-2 px-2 text-gray-500">
                    {{ header }}
                </div>
            </div>
        </div>

        <div v-if="!files.data || files.data.length === 0" class="py-4 italic text-center text-gray-600">
            No files found.
        </div>
        <div v-else class="pt-1 pb-5 overflow-y-auto">
            <div v-for="file in files.data" :key="file.name" class="flex even:bg-blue-100 rounded-lg">
                <div v-for="key in files.header" :key="key" class="w-1/4">
                    <div class="py-1 px-2 text-base">
                        {{ file[key as keyof typeof file] }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
