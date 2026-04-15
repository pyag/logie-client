<script setup>
import { ref } from 'vue';

import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";

import { saveLocker } from '@/api/user';

const lname = ref('')
const password = ref('')
const cnfrm_password = ref('')
const email = ref('')

const createLocker = async () => {
    // Placeholder function; replace with actual locker creation logic
    await saveLocker(lname.value, password.value, cnfrm_password.value, email.value);

    // Refresh the page or navigate to the dashboard after locker creation
    window.location.reload();
}

</script>

<template>
    <form class="flex flex-col gap-y-4" @submit.prevent>
        <SectionHeading>Create locker</SectionHeading>

        <Input type="text" id="username" v-model="lname" name="username"
        placeholder="Locker name" />

        <Password id="password" v-model="password" name="password" placeholder="Password" />

        <Password id="cnfrm-password" v-model="cnfrm_password" name="cnfrm-password" placeholder="Confirm password" />

        <Input type="text" id="email" v-model="email" name="email"
        placeholder="Email or Phone (optional)" />

        <Button @click="createLocker">Create locker</Button>
    </form>
</template>

<style scoped>
</style>
