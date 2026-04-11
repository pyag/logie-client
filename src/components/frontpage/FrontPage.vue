<script setup>
import { ref } from "vue";
import { Search } from "lucide-vue-next";

import Button from "../Button.vue";

import Input from "../Input.vue";
import FrontPageModal from "./FrontPageModal.vue";

const modalRef = ref();  // Template ref to access the modal's exposed methods

const openSignUpModel = () => {
    modalRef.value.openSignUp();  // Call the exposed method
};

const openLogInModel = () => {
    modalRef.value.openLogin();  // Call the exposed method
};

</script>

<template>
    <div class="flex justify-center items-center min-h-[80vh] ">
        <div class="flex flex-col items-center justify-center -mt-15">
            <div class="mb-7">
                <div class="gradient-heading text-[11em]">logie</div>
                <div class="flex justify-end text-xl -mt-15 mr-2.5 italic">Online lockers</div>
            </div>
            <div class="flex gap-x-4 mb-6">
                <Button @click="openSignUpModel" class="w-50 font-normal">Create locker</Button>
                <!-- <Button>Create temporary locker</Button> -->
                <Button @click="openLogInModel" class="w-50 font-normal">Log In</Button>
            </div>
            <Input :placeholder="`Search lockers`" :extra-div-classes="`!rounded-full w-3xl max-w-3xl focus-within:ring-gray-400`"
                :extra-input-classes="`!py-2 !px-4`">
                <Button extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                    <Search class="h-6 w-6 text-gray-500" />
                </Button>
            </Input>
        </div>
    </div>

    <FrontPageModal ref="modalRef" />
</template>

<style scoped>
.gradient-heading {
    background: linear-gradient(270deg, #009F6B, #4169E1, #E52B50);
    color: transparent;
    background-clip: text;
}
</style>
