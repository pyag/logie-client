<script lang="ts" setup>
import { Ref, ref } from "vue";
import Modal from "../Modal.vue";
import Signup from "../Signup.vue";
import Link from "../Link.vue";
import Login from "../Login.vue";

const isOpenModal: Ref = ref(false);
const currentModel: Ref = ref(null);

const openSignUp = () => {
    currentModel.value = "signup";
    isOpenModal.value = true;
};

const openLogin = () => {
    currentModel.value = "login";
    isOpenModal.value = true;
};

const closeModal = () => {
    isOpenModal.value = false;
    currentModel.value = null;
};

// Expose methods so they can be called from FrontPage.vue via a ref
defineExpose({
    openSignUp,
    openLogin,
});
</script>

<template>
    <Teleport to="body">
        <Modal v-if="isOpenModal === true" @close="closeModal">
            <div v-if="currentModel === 'signup'" class="w-[19vw] h-[55vh]">
                <Signup />
                <div class="flex flex-col items-end mt-5 mb-5 text-sm">
                    <!-- <Link>Create temporary locker</Link> -->
                    <Link @click="currentModel = 'login'">
                        Login
                    </Link>
                </div>
                <!-- <BrandingSection section-placeholder="or sign up with" /> -->
            </div>
            <div v-else-if="currentModel === 'login'" class="w-[19vw] h-[49vh]">
                <Login />
                <div class="flex flex-col items-end mt-5 mb-5 text-sm">
                    <Link>Forgot password</Link>
                    <!-- <Link>Create temporary locker</Link> -->
                    <Link @click="currentModel = 'signup'">Signup</Link>
                </div>
                <!-- <BrandingSection section-placeholder="or log in with" /> -->
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
</style>
