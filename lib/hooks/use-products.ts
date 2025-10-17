import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { queryKeys } from '../services/query-client';
import { productsApi } from '../api/products.api';

/**
 * Hook to fetch all products
 */
export const useAllProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: productsApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch products by category
 */
export const useCategoryProducts = (category: string) => {
  return useQuery({
    queryKey: queryKeys.products.category(category),
    queryFn: () => productsApi.getByCategory(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to delete a product (simulated)
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.delete,
    onMutate: async (productId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.products.all });

      // Snapshot previous value
      const previousProducts = queryClient.getQueryData(queryKeys.products.all);

      // Optimistically update to remove product
      queryClient.setQueryData(queryKeys.products.all, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.filter((p: any) => p.id !== productId),
        };
      });

      return { previousProducts };
    },
    onError: (err, productId, context) => {
      // Rollback on error
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKeys.products.all, context.previousProducts);
      }
      Alert.alert('Error', 'Failed to delete product');
    },
    onSuccess: (data) => {
      Alert.alert('Success', `${data.title} has been deleted`);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

/**
 * Hook to fetch all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
    staleTime: 1000 * 60 * 60, // 1 hour (categories rarely change)
  });
};