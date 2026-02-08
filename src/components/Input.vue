<script setup lang="ts">
interface Props {
    inputClazz?: string;
    divClazz?: string;
    extraInputClasses?: string;
    extraDivClasses?: string;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    id?: string;
    name?: string;
}

const props = withDefaults(defineProps<Props>(), {
    inputClazz: `flex-1 border-none outline-none bg-transparent rounded-none focus:outline-none focus:ring-0 py-1 px-2`,
    divClazz: `flex p-1 border-none border-gray-300 rounded-lg
    bg-gray-200 focus-within:ring-1 focus-within:ring-gray-300`,


    disabled: false,
    type: "",
    id: "",
    name: "",
    placeholder: "",
    extraClasses: "",
});
</script>

<template>
<div :class="`${divClazz} ${extraDivClasses || ''}`">
<input
    :class="`${inputClazz} ${extraInputClasses || ''}`",
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    :id="id"
    :name="name"/>
<slot></slot>
</div>
</template>

<style scoped>

</style>
