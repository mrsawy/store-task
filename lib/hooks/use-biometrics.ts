// src/hooks/use-biometrics.ts
import { useState, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

export const useBiometrics = () => {
    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = useCallback(async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        const available = compatible && enrolled;
        setIsAvailable(available);
        return available;
    }, []);

    const authenticate = useCallback(async (): Promise<{
        success: boolean;
        error?: string;
    }> => {
        try {
            const available = await checkAvailability();

            if (!available) {
                return {
                    success: false,
                    error: 'Biometrics not available',
                };
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Unlock Task Store',
                fallbackLabel: 'Use Password',
                disableDeviceFallback: false,
                cancelLabel: 'Cancel',
            });

            if (result.success) {
                return { success: true };
            } else {
                return {
                    success: false,
                    error: result.error || 'Authentication failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Authentication error',
            };
        }
    }, [checkAvailability]);

    const getBiometricType = useCallback(async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
            return Platform.OS === 'ios' ? 'Face ID' : 'Face Recognition';
        }
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            return Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint';
        }
        if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
            return 'Iris';
        }
        return 'Biometric';
    }, []);

    return {
        isAvailable,
        authenticate,
        checkAvailability,
        getBiometricType,
    };
};