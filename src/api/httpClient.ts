const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const requestOptions = {
    credentials: 'include' as const,
};

export default {
    get: async (endpoint: string) => {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            ...requestOptions,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    post: async (endpoint: string, data: any) => {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...requestOptions,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },
};
