import { isStrongPassword } from 'validator';

export function isPasswordValid(password: string): boolean {
    return isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
}
