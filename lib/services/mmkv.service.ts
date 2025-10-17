import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
    id: 'task-store-db',
    encryptionKey: 'your-encryption-key-here' // Use a secure key
});

// Storage keys
export const StorageKeys = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    REACT_QUERY_CACHE: 'react_query_cache',
} as const;

// Helper functions
export const mmkvStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
    clear: () => {
        storage.clearAll();
    },
};

// Typed helpers
export const setAuthToken = (token: string) => {
    storage.set(StorageKeys.AUTH_TOKEN, token);
};

export const getAuthToken = (): string | undefined => {
    return storage.getString(StorageKeys.AUTH_TOKEN);
};

export const clearAuthToken = () => {
    storage.delete(StorageKeys.AUTH_TOKEN);
};

export const setUserData = (userData: any) => {
    storage.set(StorageKeys.USER_DATA, JSON.stringify(userData));
};

export const getUserData = () => {
    const data = storage.getString(StorageKeys.USER_DATA);
    return data ? JSON.parse(data) : null;
};