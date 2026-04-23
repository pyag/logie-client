const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const requestOptions = {
    credentials: 'include' as const,
};

export default {
    get: async (endpoint: string) => {
        const response = await fetch(`${SERVER_URL}${endpoint}`, {
            ...requestOptions,
        });
        const data = await response.json();
        if (!response.ok) {
            const error: any = new Error(`HTTP error! status: ${response.status}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }
        return data;
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
        const responseData = await response.json();
        if (!response.ok) {
            const error: any = new Error(`HTTP error! status: ${response.status}`);
            error.status = response.status;
            error.data = responseData;
            throw error;
        }
        return responseData;
    },
};
