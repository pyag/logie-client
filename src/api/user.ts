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
    } catch (error) {
        console.error("Error creating locker:", error);
        throw error;
    }
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
    try {
        const response = await httpClient.get('/me/');
        return response as GetCurrentUserResponse;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

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

export async function login(identifier: string, password: string): Promise<LoginResponse> {
    try {
        const response = await httpClient.post('/login/', {
            identifier,
            password,
        });
        return response as LoginResponse;
    } catch (error) {
        console.error('Error logging in:', error);
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
