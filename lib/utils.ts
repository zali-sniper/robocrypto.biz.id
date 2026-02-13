import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-secret-key-change-me';

export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
