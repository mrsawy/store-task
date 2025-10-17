import React from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { useAppSelector } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/api/products.api';

interface ProductCardProps {
  product: Product;
  onDelete?: (productId: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const isSuperadmin = useAppSelector(state => state.auth.isSuperadmin);

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(product.id),
        },
      ]
    );
  };

  return (
    <View className="mb-4 overflow-hidden rounded-lg border border-border bg-card">
      <View className="flex-row p-4">
        {/* Thumbnail */}
        <Image
          source={{ uri: product.thumbnail }}
          className="h-24 w-24 rounded-md bg-muted"
          resizeMode="cover"
        />

        {/* Product Info */}
        <View className="ml-4 flex-1 justify-between">
          <View>
            <Text className="text-base font-semibold text-foreground" numberOfLines={2}>
              {product.title}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={1}>
              {product.category}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary">
              ${product.price}
            </Text>
            
            {isSuperadmin && onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onPress={handleDelete}
              >
                <Text className="text-destructive-foreground text-xs font-medium">
                  Delete
                </Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}