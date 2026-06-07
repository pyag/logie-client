const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const REQUEST_TIMEOUT = 10000; // 10 seconds

const requestOptions = {
    credentials: 'include' as const,
};

const getAuthToken = () => typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

const attachAuthHeader = (headers: Record<string, string> | undefined) => {
    const token = getAuthToken();
    if (!token) return headers;
    return {
        ...(headers || {}),
        Authorization: `Bearer ${token}`,
    };
};

const buildTimeoutError = () => {
    const error: any = new Error('Request timed out. Please try again.');
    error.status = 504;
    error.data = { message: 'Request timed out. Please try again.' };
    return error;
};

const handleFetchError = (error: any) => {
    if (error?.name === 'AbortError') {
        throw buildTimeoutError();
    }
    if (error.status) {
        throw error;
    }
    const serverError: any = new Error('Internal Server Error');
    serverError.status = 500;
    serverError.data = { message: 'Unable to reach backend server' };
    throw serverError;
};

export default {
    get: async (endpoint: string) => {
        try {
            const response = await fetch(`${SERVER_URL}${endpoint}`, {
                ...requestOptions,
                headers: attachAuthHeader(undefined),
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
            handleFetchError(error);
        }
    },

    getBlob: async (endpoint: string) => {
        try {
            const response = await fetch(`${SERVER_URL}${endpoint}`, {
                ...requestOptions,
                headers: attachAuthHeader(undefined),
                signal: AbortSignal.timeout(REQUEST_TIMEOUT),
            });

            if (!response.ok) {
                const errorText = await response.text();
                const error: any = new Error(`HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = errorText;
                throw error;
            }

            return await response.blob();
        } catch (error: any) {
            handleFetchError(error);
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
                headers: attachAuthHeader(headers),
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
            handleFetchError(error);
        }
    },
};
