<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import BaseButton from '../BaseButton.vue';
import Label from '../Label.vue';

const arrowStyle = 'w-7 h-7 bg-white text-gray-700 hover:border hover:border-gray-500 active:bg-gray-300 rounded-full';

</script>

<template>
    <div class="flex gap-x-5 bg-stone-200 py-1 px-4 items-center">
        <div class="flex gap-x-1 px-1 py-1 rounded-lg">
            <BaseButton><ArrowLeft :class="arrowStyle" /></BaseButton>
            <BaseButton><ArrowRight :class="arrowStyle"/></BaseButton>
        </div>
        <Label extra-classes="text-base! font-medium! text-gray-500!">
            Home <!-- temporary, need to change with actual locker name and path -->
        </Label>
    </div>
</template>

<style scoped>
</style>
