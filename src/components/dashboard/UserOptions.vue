<script setup lang="ts">
import { ref } from 'vue';
import { LogOut, Settings } from 'lucide-vue-next';

import BaseButton from '../BaseButton.vue';
import SettingsModal from './SettingsModal.vue';

const showSettingModal = ref(false);

const userOptionsStyle = "flex gap-x-1 py-2 px-4 rounded-full text-gray-800 bg-red-300 hover:bg-red-400 transition-colors duration-200";
</script>

<template>
    <div class="flex gap-x-4">
        <BaseButton :extra-classes="userOptionsStyle" @click="showSettingModal = true">
            <Settings />
            Settings
        </BaseButton>
        <BaseButton :extra-classes="userOptionsStyle" @click="$emit('logout')">
            <LogOut />
            Logout
        </BaseButton>
    </div>

    <SettingsModal v-if="showSettingModal" @close="showSettingModal = false" />

</template>

<style scoped>
</style>
