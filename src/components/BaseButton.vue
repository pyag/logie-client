<script setup lang="ts">
interface Props {
    clazz?: string;
    extraClasses?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    clazz: "cursor-pointer",
    disabled: false,
});
</script>

<template>
<button
    :class="`${clazz} ${extraClasses || ''}`"
    :disabled="disabled">
    <slot></slot>
</button>
</template>

<style scoped>
</style>
