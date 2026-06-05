<script setup lang="ts">
interface Props {
    btnClass?: string;
    extraClasses?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
    btnClass: "text-white py-2 px-3 rounded-xl \
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    disabled: false,
    type: 'submit',
});

const emit = defineEmits(['click']);
</script>

<template>
<button
    :type="type"
    :class="`${btnClass} btnStyle ${extraClasses || ''}`"
    :disabled="disabled"
    @click="emit('click')">
    <slot></slot>
</button>
</template>

<style scoped>
.btnStyle {
    /* Calm Sky palette (base → hover → active) */
    --c1: #7FB8FF; /* base */
    --c2: #5EA8FF; /* hover */
    --c3: #2B6EDC; /* active/darker */

    background: linear-gradient(90deg, var(--c1) 0%, var(--c2) 50%, var(--c3) 100%);
    /* background: #36454F; */
    background-size: 300% 100%;
    background-position: 100% 50%;
    transition: background-position 1100ms cubic-bezier(.22,.9,.28,1), filter 60ms linear, transform 80ms ease;
    will-change: background-position, transform, filter;
}

.btnStyle:hover {
    /* slide the gradient right-to-left and slightly darken */
    background-position: 0% 50%;
    filter: brightness(0.96);
}
</style>
