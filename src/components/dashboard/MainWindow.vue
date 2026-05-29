<script setup lang="ts">
import FileView from './FileView.vue'
import NavBar from './NavBar.vue'
// import ToolBar from './ToolBar.vue'
</script>

<template>
    <div class="flex flex-col bg-white items-stretch h-full">
        <NavBar @logout="$emit('logout')"/>
        <!-- <ToolBar /> -->
        <FileView />
    </div>
</template>

<style scoped>
</style>
