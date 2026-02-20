<script setup lang="ts">
import { ref } from 'vue'
import { House, Settings } from 'lucide-vue-next';

import Label from '../Label.vue';

const active = ref<'home'|'settings'>('home')
const liClass
    = (name: 'home'|'settings') =>
    `flex gap-x-2 cursor-pointer rounded-lg p-1.5 pl-3
    ${active.value !== name ? 'hover:bg-gray-300' : ''}
    transition-colors duration-150
    ${active.value === name ? 'bg-blue-500 text-white' : ''}`

const listItems: { name: 'home'|'settings'; icon: any }[] = [
    {
        name: 'home',
        icon: House,
    },
    {
        name: 'settings',
        icon: Settings,
    },
];

</script>

<template>
    <div class="w-74 bg-gray-200 flex flex-col gap-y-6">
        <Logo />
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
    </div>
</template>

<style scoped>
</style>
