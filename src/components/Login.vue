<script setup>
import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4" @submit.prevent>
            <SectionHeading>login</SectionHeading>

            <Input type="text" id="username" name="username"
            placeholder="Locker name or email" />

            <Password id="password" name="password" placeholder="Password" />

            <Button>Login</Button>
        </form>
    </div>
</template>

<style scoped>
</style>
