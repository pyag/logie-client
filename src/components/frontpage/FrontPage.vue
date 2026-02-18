<script setup>
import { ref } from "vue";
import { Search } from "lucide-vue-next";

import BrandingSection from "./BrandingSection.vue";
import Button from "../Button.vue";
import Modal from "../Modal.vue";

import Link from "../Link.vue";
import Login from "../Login.vue";
import Input from "../Input.vue";
import Signup from "../Signup.vue";

const isOpenModal = ref(false);
const currentModel = ref(null);

const openSignUpModel = () => {
    currentModel.value = "signup";
    isOpenModal.value = true;
};

const openLogInModel = () => {
    currentModel.value = "login";
    isOpenModal.value = true;
};

const closeModal = () => {
    isOpenModal.value = false;
    currentModel.value = null;
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
                <Button @click="openSignUpModel">Sign Up</Button>
                <Button>Create temporary locker</Button>
                <Button @click="openLogInModel">Log In</Button>
            </div>
            <Input :placeholder="`Search lockers`" :extra-div-classes="`!rounded-full w-3xl max-w-3xl focus-within:ring-gray-400`"
                :extra-input-classes="`!py-2 !px-4`">
                <Button extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                    <Search class="h-6 w-6 text-gray-500" />
                </Button>
            </Input>
        </div>
    </div>

    <Teleport to="body">
        <Modal v-if="isOpenModal === true" @close="closeModal">
            <div v-if="currentModel === 'signup'" class="w-[19vw] h-[55vh]">
                <Signup />
                <div class="flex flex-col items-end mt-5 mb-5 text-sm">
                    <Link>Create temporary locker</Link>
                    <Link @click="currentModel = 'login'">
                        Login
                    </Link>
                </div>
                <BrandingSection section-placeholder="or sign up with" />
            </div>
            <div v-else-if="currentModel === 'login'" class="w-[19vw] h-[49vh]">
                <Login />
                <div class="flex flex-col items-end mt-5 mb-5 text-sm">
                    <Link>Forgot password</Link>
                    <Link>Create temporary locker</Link>
                    <Link @click="currentModel = 'signup'">Sign up</Link>
                </div>
                <BrandingSection section-placeholder="or log in with" />
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
.gradient-heading {
    background: linear-gradient(270deg, #009F6B, #4169E1, #E52B50);
    color: transparent;
    background-clip: text;
}
</style>
