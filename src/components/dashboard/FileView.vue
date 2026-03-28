<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getFiles } from '@/api/file';
import ListView from './fileViews/ListView.vue';

const files = ref({
    header: [],
    data: []
});

onMounted(async () => {
    try {
        const json = await getFiles();
        files.value.data = json.data;
        files.value.header = json.header;
    } catch (error) {
        console.error('Error fetching files:', error);
    }
});

</script>

<template>
    <div class="p-1">
        <ListView :files="files" />
    </div>
</template>

<style scoped>
</style>
