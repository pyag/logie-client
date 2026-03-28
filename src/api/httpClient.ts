const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default {
    get: async (endpoint: string) => {
        const response = await fetch(`${SERVER_URL}${endpoint}`);
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
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },
};
