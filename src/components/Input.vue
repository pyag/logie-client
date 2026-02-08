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
    clazz: `border border-gray-400 rounded-lg py-2 px-4 focus:ring-1 focus:ring-blue-500 w-full`,
    disabled: false,
    type: "",
    id: "",
    name: "",
    placeholder: "",
    extraClasses: "",
});
</script>

<template>
<input
    :class="`${clazz} ${extraClasses || ''}`"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    :id="id"
    :name="name"/>
<slot></slot>
</template>

<style scoped>

</style>