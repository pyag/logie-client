<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { searchLockers, LockerSearchItem } from '../api/user';

const props = defineProps<{ searchText: string }>();
const router = useRouter();
const query = ref(props.searchText ?? '');
const results = ref<LockerSearchItem[]>([]);
const loading = ref(false);
const errorMessage = ref('');
const lastSearchQuery = ref('');

const performSearch = async (text: string) => {
    const trimmed = text.trim();
    results.value = [];
    errorMessage.value = '';

    if (!trimmed) {
        lastSearchQuery.value = '';
        errorMessage.value = 'No search text provided.';
        return;
    }

    loading.value = true;

    try {
        const response = await searchLockers(trimmed);
        if (!response.success) {
            errorMessage.value = response.message || 'Search failed. Please try again.';
            lastSearchQuery.value = '';
            return;
        }

        results.value = response.data.lockers;
        lastSearchQuery.value = trimmed;

        if (!results.value.length) {
            errorMessage.value = `No lockers found for "${trimmed}".`;
        }
    } catch (error) {
        errorMessage.value = 'Search failed. Please try again.';
        lastSearchQuery.value = '';
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const handleSubmit = () => {
    router.push({ name: 'search', query: { name: query.value } });
};

onMounted(() => {
    if (query.value.trim()) {
        performSearch(query.value);
    } else {
        errorMessage.value = 'No search text provided.';
    }
});

watch(
    () => props.searchText,
    (newValue) => {
        query.value = newValue ?? '';
        if (query.value.trim()) {
            performSearch(query.value);
        } else {
            results.value = [];
            lastSearchQuery.value = '';
            errorMessage.value = 'No search text provided.';
        }
    }
);
</script>

<template>
    <div class="min-h-[80vh] px-6 py-8">
        <div class="max-w-5xl mx-auto space-y-6">
            <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Search lockers</h1>
                    <p class="text-sm text-gray-600 mt-2">Search by locker name and get exact or related matches.</p>
                </div>
            </div>

            <div class="flex flex-col gap-3 md:flex-row md:items-center">
                <Input
                    v-model:modelValue="query"
                    @keydown.enter="handleSubmit"
                    :extra-div-classes="`!rounded-full w-full md:w-3/4 max-w-3xl focus-within:ring-gray-400`"
                    :extra-input-classes="`!py-2 !px-4`"
                    placeholder="Search lockers by name...">
                    <Button
                        @click="handleSubmit"
                        extra-classes="!border-none !text-black !bg-gray-200 hover:!bg-gray-300 !rounded-full !bg-none">
                        <Search class="h-5 w-5" />
                    </Button>
                </Input>
            </div>

            <div class="space-y-4">
                <div v-if="loading" class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p class="text-gray-500">Searching...</p>
                </div>

                <div v-else-if="errorMessage" class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p class="text-gray-900 font-semibold">{{ errorMessage }}</p>
                    <p v-if="!query.trim()" class="text-sm text-gray-500 mt-2">Enter a locker name above and press Enter or click the search icon.</p>
                </div>

                <div v-else-if="results.length" class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p class="text-gray-900 font-semibold">Results for "{{ lastSearchQuery }}"</p>
                    <ul class="mt-4 space-y-3">
                        <li
                            v-for="locker in results"
                            :key="locker.uid"
                            class="cursor-pointer rounded-2xl border border-blue-100 bg-blue-50 p-4 transition hover:border-blue-200 hover:bg-blue-100">
                            <p class="font-medium text-lg text-gray-900">{{ locker.name }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
