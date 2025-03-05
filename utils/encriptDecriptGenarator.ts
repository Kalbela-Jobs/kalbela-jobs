import CryptoJS from "crypto-js";

// Secret Key (Keep it Safe!)
const SECRET_KEY = "your-secret-key";

// Function to Encrypt ID
export const encryptId = (id: string) => {
    const encrypted = CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
    return encodeURIComponent(encrypted); // Encode for URL safety
};

// Function to Decrypt ID
export const decryptId = (encryptedId: string) => {
    try {
        const decodedId = decodeURIComponent(encryptedId); // Decode first
        const bytes = CryptoJS.AES.decrypt(decodedId, SECRET_KEY);
        const originalId = bytes.toString(CryptoJS.enc.Utf8);
        return originalId || null;
    } catch (error) {
        console.error("Decryption Error:", error);
        return null; // Handle invalid cases
    }
};
