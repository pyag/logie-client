<script setup lang="ts">
import Input from '../Input.vue';
import UserOptions from './UserOptions.vue'
</script>

<template>
    <div class="bg-gray-100 w-full flex h-fit gap-x-14">
        <div class="pl-8 p-3 content-center">
            <h1 class="text-xl font-bold">
                <!-- temporary locker name, need to change with actual locker name -->
                Mylocker
            </h1>
        </div>
        <div class="p-3 w-1/3 content-center">
            <Input extra-div-classes="rounded-full! focus-within:ring-blue-200! border-gray-500! border!"
                extra-input-classes="pl-5"
                placeholder="Search other locker..." />
        </div>
        <div class="ml-auto mr-3 p-3">
            <UserOptions />
        </div>
    </div>
</template>

<style scoped>
</style>
