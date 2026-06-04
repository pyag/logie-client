<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';
import { useUserStore } from '../../stores/user';
import Input from '../Input.vue';
import Button from '../Button.vue';
import UserOptions from './UserOptions.vue'

const userStore = useUserStore();
const router = useRouter();
const searchQuery = ref('');

const submitSearch = () => {
    const query = searchQuery.value.trim();
    if (!query) {
        return;
    }
    router.push({ name: 'search', query: { name: query } });
};
</script>

<template>
    <div class="bg-gray-100 w-full flex h-fit gap-x-14">
        <div class="pl-6 p-3 content-center">
            <h1 class="text-xl font-bold">
                {{ userStore.currentUser?.locker_name }}
            </h1>
        </div>
        <div class="p-3 w-1/3 content-center">
            <Input
                v-model:modelValue="searchQuery"
                @keydown.enter="submitSearch"
                extra-div-classes="rounded-full! focus-within:ring-blue-200! border-gray-500! border!"
                extra-input-classes="pl-5"
                placeholder="Search other locker...">
                <Button
                    @click="submitSearch"
                    extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                    <Search class="h-5 w-5" />
                </Button>
            </Input>
        </div>
        <div class="ml-auto mr-3 p-3">
            <UserOptions @logout="$emit('logout')" />
        </div>
    </div>
</template>

<style scoped>
</style>
