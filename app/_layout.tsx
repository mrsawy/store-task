import '../global.css';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { store } from '@/lib/store';
import { queryClient, persister } from '@/lib/services/query-client';
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch } from '@/lib/store';
import { setOffline } from '@/lib/store/slices/app.slice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalHost } from '@rn-primitives/portal';
import LockOverlay from '@/components/common/lock-overlay';
import OfflineIndicator from '@/components/common/offline-indicator';

function RootLayoutContent() {
  const dispatch = useAppDispatch();

  // Monitor network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setOffline(!state.isConnected));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
      <LockOverlay />
      <OfflineIndicator />
      <PortalHost />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <RootLayoutContent />
        </PersistQueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}