<script setup lang="ts">
import { ref } from 'vue';

import { fileHeaders, files } from '@/data/dummyFiles';

const fileHeadersRef = ref(fileHeaders);
const filesRef = ref(files);

</script>

<template>
    <div class="p-1">
        <div class="flex flex-col rounded-lg p-2 bg-gray-50">
            <div class="flex border-b border-gray-200">
                <div v-for="header in fileHeadersRef" :key="header" class="w-1/4">
                    <div class="font-bold text-sm uppercase py-2 px-2 text-gray-500">
                        {{ header }}
                    </div>
                </div>
            </div>

            <div class="pt-1 overflow-y-auto">
                <div v-for="file in filesRef" :key="file.name" class="flex even:bg-blue-100 rounded-lg">
                    <div v-for="key in fileHeadersRef" :key="key" class="w-1/4">
                        <div class="py-1 px-2 text-base">
                            {{ file[key as keyof typeof file] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
