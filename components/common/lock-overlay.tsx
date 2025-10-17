import { useBiometrics } from '@/lib/hooks/use-biometrics';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setLocked } from '@/lib/store/slices/app.slice';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, ActivityIndicator, Alert } from 'react-native';
import { Button } from '../ui/button';


export default function LockOverlay() {
  const dispatch = useAppDispatch();
  const isLocked = useAppSelector(state => state.app.isLocked);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const { authenticate, checkAvailability, getBiometricType } = useBiometrics();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('Biometric');

  useEffect(() => {
    if (isLocked) {
      loadBiometricType();
      attemptUnlock();
    }
  }, [isLocked]);

  const loadBiometricType = async () => {
    const type = await getBiometricType();
    setBiometricType(type);
  };

  const attemptUnlock = async () => {
    setIsAuthenticating(true);
    
    const available = await checkAvailability();
    
    if (available) {
      const result = await authenticate();
      
      if (result.success) {
        dispatch(setLocked(false));
      } else {
        // Show error and allow retry
        Alert.alert(
          'Authentication Failed',
          result.error || 'Please try again',
          [
            { text: 'Try Again', onPress: attemptUnlock },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      }
    } else {
      // No biometrics available - show password fallback
      Alert.alert(
        'Biometrics Unavailable',
        'Please use your device password to unlock',
        [
          { text: 'Unlock', onPress: () => dispatch(setLocked(false)) }
        ]
      );
    }
    
    setIsAuthenticating(false);
  };

  if (!isLocked || !isAuthenticated) {
    return null;
  }

  return (
    <Modal
      visible={isLocked}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-background p-6">
        <View className="items-center gap-6">
          {/* Lock Icon */}
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Text className="text-4xl">🔒</Text>
          </View>

          {/* Title */}
          <View className="items-center gap-2">
            <Text className="text-2xl font-bold text-foreground">
              App Locked
            </Text>
            <Text className="text-center text-muted-foreground">
              Unlock with {biometricType} to continue
            </Text>
          </View>

          {/* Loading or Unlock Button */}
          {isAuthenticating ? (
            <ActivityIndicator size="large" className="text-primary" />
          ) : (
            <Button
              onPress={attemptUnlock}
              className="w-full max-w-xs"
            >
              <Text className="text-primary-foreground font-semibold">
                Unlock with {biometricType}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
}