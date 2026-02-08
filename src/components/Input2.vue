<script setup lang="ts">
interface Props {
    clazz?: string;
    extraClasses?: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    id?: string;
    name?: string;
}

const props = withDefaults(defineProps<Props>(), {
    clazz: `flex-1 border-none outline-none bg-transparent rounded-none focus:outline-none focus:ring-0 py-1 px-2`,
    disabled: false,
    type: "",
    id: "",
    name: "",
    placeholder: "",
    extraClasses: "",
});
</script>

<template>
<div class="flex p-1 border-none border-gray-300 rounded-lg
    bg-gray-200 focus-within:ring-1 focus-within:ring-gray-300">
<input
    :class="`${clazz} ${extraClasses || ''}`"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    :id="id"
    :name="name"/>
</div>
</template>

<style scoped>

</style>
