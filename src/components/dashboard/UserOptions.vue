<script setup lang="ts">
import { LogOut, Settings } from 'lucide-vue-next';


import BaseButton from '../BaseButton.vue';

const userOptionsStyle = "flex gap-x-1 py-2 px-4 rounded-full text-gray-800 bg-red-300 hover:bg-red-400 transition-colors duration-200";
</script>

<template>
    <div class="flex gap-x-4">
        <BaseButton :extra-classes="userOptionsStyle">
            <Settings />
            Settings
        </BaseButton>
        <BaseButton :extra-classes="userOptionsStyle" @click="$emit('logout')">
            <LogOut />
            Logout
        </BaseButton>
    </div>
</template>

<style scoped>
</style>
