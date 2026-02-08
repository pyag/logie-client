<script setup lang="ts">
const props = withDefaults(defineProps<{
    href?: string;
    clazz?: string;
    extraClasses?: string;
}>(), {
    href: "#",
    clazz: "no-underline font-semibold text-blue-600 hover:bg-gray-300 px-1 rounded",
    extraClasses: "",
});
</script>

<template>
<a :href="href" :class="`${clazz} ${extraClasses || ''}`">
    <slot></slot>
</a>
</template>

<style scoped>
</style>
