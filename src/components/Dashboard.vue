<script setup lang="ts">
import SideBar from './dashboard/Sidebar.vue'
import MainWindow from './dashboard/MainWindow.vue'
</script>

<template>
    <div class="p-3 bg-gray-500 h-dvh">
        <div class="flex content-stretch rounded-lg overflow-hidden h-full">
            <SideBar />
            <main class="flex-1 overflow-auto">
                <MainWindow />
            </main>
        </div>
    </div>
</template>

<style scoped>
</style>
