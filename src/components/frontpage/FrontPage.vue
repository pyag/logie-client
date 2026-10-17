<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "lucide-vue-next";

import Button from "../Button.vue";
import Input from "../Input.vue";
import FrontPageModal from "./FrontPageModal.vue";

const emit = defineEmits(['authenticated']);
const modalRef = ref();  // Template ref to access the modal's exposed methods
const router = useRouter();
const searchQuery = ref('');

const openSignUpModel = () => {
    modalRef.value.openSignUp();
};

const openLogInModel = () => {
    modalRef.value.openLogin();
};

const submitSearch = () => {
    const query = searchQuery.value.trim();
    if (!query) {
        return;
    }
    router.push({ name: 'search', query: { name: query } });
};
</script>

<template>
    <div class="flex justify-center items-center min-h-[80vh] px-4 py-10 sm:px-6">
        <div class="flex w-full max-w-3xl flex-col items-center justify-center sm:-mt-15">
            <div class="mb-7 w-full">
                <div class="mx-auto mt-7 w-fit max-w-full">
                    <div class="gradient-heading text-center leading-[1.15] text-[11em]">logie</div>
                    <div class="-mt-7 flex justify-end text-base italic sm:mr-2.5 sm:text-xl">Online lockers</div>
                </div>
            </div>
            <div class="lg:ml-8 md:ml-10 mb-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-x-4">
                <Button @click="openSignUpModel" class="w-full font-normal sm:w-50">Create locker</Button>
                <!-- <Button>Create temporary locker</Button> -->
                <Button @click="openLogInModel" class="w-full font-normal sm:w-50">Log In</Button>
            </div>
            <Input
                v-model:modelValue="searchQuery"
                @keydown.enter="submitSearch"
                :placeholder="`Search lockers`"
                :extra-div-classes="`!rounded-full w-full max-w-3xl focus-within:ring-gray-400`"
                :extra-input-classes="`!py-2 !px-4`">
                <Button
                    @click="submitSearch"
                    extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                    <Search class="h-6 w-6 text-gray-500" />
                </Button>
            </Input>
        </div>
    </div>

    <FrontPageModal ref="modalRef" @authenticated="emit('authenticated')" />
</template>

<style scoped>
.gradient-heading {
    display: inline-block;
    background-image: linear-gradient(270deg, #009F6B, #4169E1, #E52B50);
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}
</style>
