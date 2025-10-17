import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { setLocked } from '@/lib/store/slices/app.slice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useBiometrics } from '@/lib/hooks/use-biometrics';

export default function Index() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const { checkAvailability } = useBiometrics();

    useEffect(() => {
        handleInitialRoute();
    }, []);

    const handleInitialRoute = async () => {
        // Small delay to let providers initialize
        await new Promise(resolve => setTimeout(resolve, 100));

        if (isAuthenticated) {
            // User has valid token - show lock screen first
            const biometricsAvailable = await checkAvailability();

            if (biometricsAvailable) {
                // Lock and require biometric unlock
                dispatch(setLocked(true));
            }

            // Navigate to main app
            router.replace('/(app)/products');
        } else {
            // No token - go to login
            router.replace({ pathname: "/(auth)/login" });
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <ActivityIndicator size="large" className="text-primary" />
        </View>
    );
}