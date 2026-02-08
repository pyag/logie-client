<script setup>
import Button from "./Button.vue";
import Input from "./Input.vue";
import Link from "./Link.vue";
import SectionHeading from "./SectionHeading.vue";
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4 login-form">
            <SectionHeading>login</SectionHeading>

            <Input type="text" id="username" name="username" placeholder="Locker name or email or phone number" />

            <Input type="password" id="password" name="password" placeholder="Password" />

            <Button>Login</Button>

            <div class="flex flex-col items-end grow justify-end mt-4 text-sm gap-y-0.5">
                <Link>Create Temporary locker</Link>
                <Link>Sign Up?</Link>
            </div>
        </form>
    </div>
</template>

<style scoped>
.login-form {
    width: 20vw;
}
</style>
