import httpClient from "./httpClient";

export async function saveLocker(lname: string, password: string, cnfrm_password: string, email: string)
    : Promise<void> {
    try {

        const lockerData = await httpClient.post('/signup/', {
            lockername: lname,
            password,
            cnfrm_password,
            email
        });

        //return lockerData as LockerResponse;
    } catch (error) {
        console.error("Error creating locker:", error);
        throw error;
    }
}

type LockerResponse = {
    lockerId: string;
    message: string;
};
