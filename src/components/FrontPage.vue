<script setup>
import { ref } from "vue";

import Button from "./Button.vue";
import Modal from "./Modal.vue";

import Login from "./Login.vue";
import Input from "./Input.vue";

const showSignUpModal = ref(false);
const showLoginModal = ref(false);
</script>

<template>
    <div class="flex justify-center items-center min-h-[80vh] ">
        <div class="flex flex-col items-center justify-center -mt-15">
            <div class="mb-7">
                <div class="gradient-heading text-[11em]">logie</div>
                <div class="flex justify-end text-xl -mt-15 mr-2.5 italic">Online lockers</div>
            </div>
            <Input :placeholder="`Search lockers`" :extra-div-classes="`!rounded-full w-3xl max-w-3xl mb-6 focus-within:ring-gray-400`"
                :extra-input-classes="`!py-2 !px-4`">
                <Button extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </template>
                </Button>
            </Input>
            <div class="flex gap-x-4">
                <Button @click="showSignUpModal=true">Sign Up</Button>
                <Button>Want a temporary locker?</Button>
                <Button @click="showLoginModal=true">Log In</Button>
            </div>
        </div>
    </div>

    <Modal v-model="showSignUpModal" @close="showSignUpModal=false">
        <h2>locker creation</h2>
        <p>locker creation form goes here.</p>
    </Modal>

    <Modal v-model="showLoginModal" @close="showLoginModal=false">
        <!-- <h2>log in to locker</h2>
        <p>locker login form goes here.</p> -->
        <Login />
    </Modal>
</template>

<style scoped>
.gradient-heading {
    background: linear-gradient(270deg, #009F6B, #4169E1, #E52B50);
    color: transparent;
    background-clip: text;
    /* font-style: italic; */
}
</style>
