<script setup>
import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";
</script>

<template>
    <form class="flex flex-col gap-y-4" @submit.prevent>
        <SectionHeading>Create locker</SectionHeading>

        <Input type="text" id="username" name="username"
        placeholder="Locker name" />

        <Password id="password" name="password" placeholder="Password" />

        <Password id="cnfrm-password" name="cnfrm-password" placeholder="Confirm password" />

        <Input type="text" id="email" name="email"
        placeholder="Email or Phone (optional)" />

        <Button>Create locker</Button>
    </form>
</template>

<style scoped>
</style>
