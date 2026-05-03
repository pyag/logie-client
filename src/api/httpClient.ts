const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const REQUEST_TIMEOUT = 1500; // 1.5 seconds

const requestOptions = {
    credentials: 'include' as const,
};

export default {
    get: async (endpoint: string) => {
        try {
            const response = await fetch(`${SERVER_URL}${endpoint}`, {
                ...requestOptions,
                signal: AbortSignal.timeout(REQUEST_TIMEOUT),
            });
            const data = await response.json();
            if (!response.ok) {
                const error: any = new Error(`HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = data;
                throw error;
            }
            return data;
        } catch (error: any) {
            if (error.status) {
                throw error;
            }
            const serverError: any = new Error('Internal Server Error');
            serverError.status = 500;
            serverError.data = { message: 'Unable to reach backend server' };
            throw serverError;
        }
    },

    post: async (endpoint: string, data: any, formData: FormData | null = null) => {
        try {
            const headers = formData
                ? undefined
                : {
                      'Content-Type': 'application/json',
                  };

            const response = await fetch(`${SERVER_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData || JSON.stringify(data),
                ...requestOptions,
                signal: AbortSignal.timeout(REQUEST_TIMEOUT),
            });
            const responseData = await response.json();
            if (!response.ok) {
                const error: any = new Error(`HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = responseData;
                throw error;
            }
            return responseData;
        } catch (error: any) {
            if (error.status) {
                throw error;
            }
            const serverError: any = new Error('Internal Server Error');
            serverError.status = 500;
            serverError.data = { message: 'Unable to reach backend server' };
            throw serverError;
        }
    },
};
