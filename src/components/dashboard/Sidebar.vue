<script setup lang="ts">
import { ref } from 'vue'
import { Clapperboard, FileText, House, Image, LogOut, Music, Settings } from 'lucide-vue-next';

import Label from '../Label.vue';

const active = ref<string>('home');

const liClass
    = (name: string) =>
    `flex gap-x-2 cursor-pointer rounded-lg p-1.5 pl-3
    ${active.value !== name ? 'hover:bg-gray-300' : ''}
    transition-colors duration-150
    ${active.value === name ? 'bg-blue-500 text-white' : ''}`;

const actionLiClass
    = (name: string) =>
    `flex gap-x-2 cursor-pointer rounded-lg p-1.5 pl-3
    ${active.value !== name ? 'hover:bg-gray-300' : ''}
    transition-colors duration-150
    ${active.value === name ? 'bg-red-700 text-white' : ''}`;

const listItems: { name: string; icon: any }[] = [
    {
        name: 'home',
        icon: House,
    },
    {
        name: 'photos',
        icon: Image,
    },
    {
        name: 'videos',
        icon: Clapperboard,
    },
    {
        name: 'music',
        icon: Music,
    },
    {
        name: 'documents',
        icon: FileText,
    },
];

const emit = defineEmits(['logout']);

const actionItems: { name: string; icon: any }[] = [
    {
        name: 'settings',
        icon: Settings,
    },
    {
        name: 'logout',
        icon: LogOut,
    }
];

const handleActionClick = (name: string) => {
    active.value = name;
    if (name === 'logout') {
        emit('logout');
    }
};

</script>

<template>
    <div class="w-74 bg-gray-200 flex flex-col gap-y-6">
        <!-- <Logo /> -->
        <Label extra-classes="!text-lg pl-6">Menu</Label>
        <ul class="flex flex-col gap-y-1 px-3">
            <li
                v-for="item in listItems"
                :key="item.name"
                :class="liClass(item.name)"
                @click="active = item.name"
            >
                <div><component :is="item.icon" /></div>
                <div>{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</div>
            </li>
        </ul>

        <ul class="flex flex-col gap-y-1 px-3 mt-auto mb-10">
            <li
                v-for="item in actionItems"
                :key="item.name"
                :class="actionLiClass(item.name)"
                @click="handleActionClick(item.name)"
            >
                <div><component :is="item.icon" /></div>
                <div>{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>
