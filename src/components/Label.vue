<script setup lang="ts">
const props = withDefaults(defineProps<{
    for?: string;
    clazz?: string;
    extraClasses?: string;
}>(), {
    for: "",
    clazz: "text-stone-500 font-extrabold text-xs uppercase",
    extraClasses: "",
});
</script>

<template>
    <label
        :for="for"
        :class="`${clazz} ${extraClasses || ''}`">
        <slot></slot>
    </label>
</template>

<style scoped>
</style>
