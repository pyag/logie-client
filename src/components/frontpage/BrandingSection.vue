<script setup lang="ts">
import { Facebook, TwitterIcon, GithubIcon, InstagramIcon } from "lucide-vue-next";

import BaseButton from "../BaseButton.vue";
import SectionHeading from "../SectionHeading.vue";

interface Props {
    sectionPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    sectionPlaceholder: "Branding section",
});

</script>

<template>
    <SectionHeading>{{ sectionPlaceholder }}</SectionHeading>
    <div class="flex gap-x-1 justify-center branding-div">
        <BaseButton><InstagramIcon /></BaseButton>
        <BaseButton><GithubIcon /></BaseButton>
        <BaseButton><Facebook /></BaseButton>
        <BaseButton><TwitterIcon /></BaseButton>
    </div>
</template>

<style scoped>
.branding-div > * {
    padding: 1rem;
    border-radius: 99999px;
    transition: background 0.3s ease;
}

.branding-div > *:hover {
    background: oklch(87.2% 0.01 258.338);
}
</style>
