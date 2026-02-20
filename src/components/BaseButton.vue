<script setup lang="ts">
interface Props {
    clazz?: string;
    extraClasses?: string;
    disabled?: boolean;
    ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    clazz: "cursor-pointer",
    disabled: false,
    ariaLabel: "",
});
</script>

<template>
<button
    :class="`${clazz} ${extraClasses || ''}`"
    :disabled="disabled"
    :aria-label="ariaLabel">
    <slot></slot>
</button>
</template>

<style scoped>
</style>
