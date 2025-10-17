/**
 * API Configuration
 */
export const API_BASE_URL = 'https://dummyjson.com';
export const API_TIMEOUT = 15000; // 15 seconds

/**
 * Auto-lock Configuration
 */
export const INACTIVITY_TIMEOUT = 10000; // 10 seconds

/**
 * Selected Category for "Specific Category" Screen
 * This is the category chosen for the assignment
 */
export const SELECTED_CATEGORY = 'smartphones';

/**
 * React Query Configuration
 */
export const QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 60 * 24, // 24 hours
  retry: 2,
} as const;

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REACT_QUERY_CACHE: 'react_query_cache',
} as const;