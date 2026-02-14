<script setup lang="ts">
import { ref } from "vue";
import { Eye } from "lucide-vue-next";
import { EyeClosed } from "lucide-vue-next";

import Button from "./Button.vue";
import Input from "./Input.vue";

interface Props {
    disabled?: boolean;
    placeholder?: string;
    id?: string;
    name?: string;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    id: "",
    name: "",
    placeholder: "",
});

const visible = ref(false);
const type = ref("password");

function toggleVisibility() {
    visible.value = !visible.value;
    type.value = visible.value ? "text" : "password";
}
</script>

<template>
<Input :type="type" :id="id" :name="name"
    :placeholder="placeholder" :disabled="disabled">
    <Button @click="toggleVisibility"
        extra-classes="!border-none !text-gray-300 hover:!bg-gray-300 !rounded-lg !bg-none !py-0">
        <template v-if="visible">
            <EyeClosed class="h-5.5 w-5 text-gray-500" stroke-width="1.3"/>
        </template>
        <template v-else>
            <Eye class="h-5.5 w-5 text-gray-500" stroke-width="1.3"/>
        </template>
    </Button>
</Input>
</template>

<style scoped>

</style>
