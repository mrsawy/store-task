import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { mmkvStorage } from './mmkv.service';

// Create persister using MMKV
export const persister = createSyncStoragePersister({
  storage: mmkvStorage,
});

// Create React Query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

// Query keys
export const queryKeys = {
  products: {
    all: ['products'] as const,
    category: (category: string) => ['products', 'category', category] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
} as const;