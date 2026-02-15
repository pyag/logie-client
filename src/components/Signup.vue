<script setup>
import BrandingSection from "./frontpage/BrandingSection.vue";
import Button from "./Button.vue";
import Input from "./Input.vue";
import Link from "./Link.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4 signup-form" @submit.prevent>
            <SectionHeading>Signup</SectionHeading>

            <Input type="text" id="username" name="username"
            placeholder="Locker name or email or phone number" />

            <Password id="password" name="password" placeholder="Password" />

            <Password id="cnfrm-password" name="cnfrm-password" placeholder="Confirm password" />

            <Button>Create locker</Button>

            <div class="flex flex-col items-end mt-2 mb-5 text-sm">
                <Link>Create temporary locker</Link>
                <Link>Login</Link>
            </div>

            <BrandingSection section-placeholder="or sign up with" />
        </form>
    </div>
</template>

<style scoped>
.signup-form {
    width: 19vw;
    height: 55vh;
}
</style>
