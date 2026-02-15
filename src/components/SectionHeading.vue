<script setup lang="ts">
import Label from './Label.vue';
</script>

<template>
    <div class="flex items-center">
        <hr class="grow border-t border-gray-300" />
        <Label class="mx-2 text-black! tracking-wider">
            <slot></slot>
        </Label>
        <hr class="grow border-t border-gray-300 text-sm!" />
    </div>
</template>

<style scoped>
</style>
