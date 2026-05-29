<script setup lang="ts">
// import SideBar from './dashboard/Sidebar.vue'
import MainWindow from './dashboard/MainWindow.vue'

const emit = defineEmits(['logout']);

const handleLogout = () => {
    emit('logout');
};
</script>

<template>
    <!-- <div class="p-3 bg-gray-500 h-dvh"> -->
        <div class="flex content-stretch rounded-lg overflow-hidden h-dvh">
            <!-- <SideBar @logout="handleLogout" /> -->
            <main class="flex-1 overflow-auto">
                <MainWindow @logout="handleLogout"/>
            </main>
        </div>
    <!-- </div> -->
</template>

<style scoped>
</style>
