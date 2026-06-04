import httpClient from "./httpClient";

export async function saveLocker(lname: string, password: string, cnfrm_password: string, email: string)
    : Promise<CreateLockerResponse> {
    try {
        const lockerData = await httpClient.post('/signup/', {
            lockername: lname,
            password,
            cnfrm_password,
            email
        });

        return lockerData as CreateLockerResponse;
    } catch (error: any) {
        console.error("Error creating locker:", error);
        // Handle validation errors from backend
        if (error.status && error.data) {
            // FastAPI returns error details in the 'detail' field
            const errorDetail = error.data.detail || error.data.message || 'Signup failed. Try again after sometime.';
            return {
                success: false,
                message: typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail),
                status_code: error.status,
            };
        }
        // For network or other errors
        throw error;
    }
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
    try {
        const response = await httpClient.get('/me/');
        return response as GetCurrentUserResponse;
    } catch (error) {
        throw error;
    }
}

export type GetCurrentUserResponse = {
    message: string;
    status_code: number;
    success: boolean;
    data?: {
        user_id: string;
        locker_name: string;
        email: string;
        root_id: string;
        session_created: string;
    };
};

export type CreateLockerResponse = {
    message: string;
    status_code: number;
    success: boolean;
    data?: object;
};

export type LoginResponse = {
    message: string;
    status_code: number;
    success: boolean;
};

export type LockerSearchItem = {
    uid: string;
    name: string;
};

export type SearchLockerResponse = {
    message: string;
    status_code: number;
    success: boolean;
    data: {
        lockers: LockerSearchItem[];
    };
};

export async function searchLockers(name: string): Promise<SearchLockerResponse> {
    try {
        const response = await httpClient.get(`/search/?name=${encodeURIComponent(name)}`);
        return response as SearchLockerResponse;
    } catch (error: any) {
        console.error('Error searching lockers:', error);
        if (error.status && error.data) {
            return {
                success: false,
                message: error.data.message || 'Search failed. Please try again.',
                status_code: error.status,
                data: { lockers: [] },
            };
        }
        throw error;
    }
}

export async function login(identifier: string, password: string): Promise<LoginResponse> {
    try {
        const response: LoginResponse = await httpClient.post('/login/', {
            identifier,
            password,
        });

        return response as LoginResponse;
    } catch (error: any) {
        // Handle 401 Unauthorized (wrong credentials) as a normal response
        if (error.status === 401 && error.data) {
            return {
                success: false,
                message: error.data.message || 'Unauthorized access. Please check your credentials.',
                status_code: 401,
            };
        }
        // Re-throw other errors (network, server errors, etc.)
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function changePassword(current_password: string, new_password: string): Promise<{ success: boolean; message: string; status_code: number }> {
    try {
        const response = await httpClient.post('/change-password/', {
            current_password,
            new_password,
        });
        return response as { success: boolean; message: string; status_code: number };
    } catch (error: any) {
        console.error('Error changing password:', error);
        // Handle validation errors from backend
        if (error.status && error.data) {
            const errorDetail = error.data.detail || error.data.message || 'Password change failed. Try again after sometime.';
            return {
                success: false,
                message: typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail),
                status_code: error.status,
            };
        }
        throw error;
    }
}

export async function deleteLocker(password: string): Promise<{ success: boolean; message: string; status_code: number }> {
    try {
        const response = await httpClient.post('/delete-locker/', {
            password,
        });
        return response as { success: boolean; message: string; status_code: number };
    } catch (error: any) {
        console.error('Error deleting locker:', error);
        // Handle validation errors from backend
        if (error.status && error.data) {
            const errorDetail = error.data.detail || error.data.message || 'Locker deletion failed. Try again after sometime.';
            return {
                success: false,
                message: typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail),
                status_code: error.status,
            };
        }
        throw error;
    }
}

export async function logout(): Promise<{ success: boolean }> {
    try {
        const response = await httpClient.post('/logout/', {});
        return response as { success: boolean };
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}
