import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '@/lib/store';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

export default function OfflineIndicator() {
  const isOffline = useAppSelector(state => state.app.isOffline);

  if (!isOffline) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(300)}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <View className="bg-destructive px-4 py-3">
        <Text className="text-center text-sm font-medium text-destructive-foreground">
          📡 No Internet Connection - Showing Cached Data
        </Text>
      </View>
    </Animated.View>
  );
}