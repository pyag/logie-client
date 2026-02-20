<script setup lang="ts">
import { Bell } from 'lucide-vue-next';

import BaseButton from '../BaseButton.vue';
import UserPanel from './UserPanel.vue';

const userOptionsStyle = "p-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200";
const userPanelStyle = "px-4 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
</script>

<template>
    <div class="flex gap-x-4">
        <BaseButton :extra-classes="userOptionsStyle" aria-label="notification"><Bell /></BaseButton>
        <BaseButton :extra-classes="userPanelStyle">
            <UserPanel />
        </BaseButton>
    </div>
</template>

<style scoped>
</style>
