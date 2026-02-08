<script setup>
import Button from "./Button.vue";
import Input from "./Input.vue";
import Link from "./Link.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4 login-form" @submit.prevent>
            <SectionHeading>login</SectionHeading>

            <Input type="text" id="username" name="username"
            placeholder="Locker name or email or phone number" />

            <Password id="password" name="password" placeholder="Password" />

            <Button>Login</Button>

            <div class="flex flex-col items-end mt-3 grow text-sm">
                <Link>Forgot password?</Link>
                <Link>Create temporary locker</Link>
                <Link>Sign up?</Link>
            </div>
        </form>
    </div>
</template>

<style scoped>
.login-form {
    width: 19vw;
    height: 40vh;
}
</style>
