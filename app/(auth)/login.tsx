import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';
import { useAppDispatch } from '@/lib/store';
import { setCredentials, setSuperadmin } from '@/lib/store/slices/auth.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isSuperadmin } from '@/lib/config/superadmin.config';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store credentials
      dispatch(setCredentials({
        token: data.accessToken,
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
      }));

      // Check superadmin status
      dispatch(setSuperadmin(isSuperadmin(data.username)));

      // Navigate to app
      router.replace('/(app)/products');
    },
    onError: (error: any) => {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Invalid credentials. Please try again.',
        [{ text: 'OK' }]
      );
    },
  });

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    loginMutation.mutate({ username: username.trim(), password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerClassName="flex-1 justify-center p-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-4xl">🛍️</Text>
            <Text className="text-3xl font-bold text-foreground">Task Store</Text>
            <Text className="text-center text-muted-foreground">
              Sign in to continue
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <View className="gap-2">
              <Label nativeID="username">Username</Label>
              <Input
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loginMutation.isPending}
              />
            </View>

            <View className="gap-2">
              <Label nativeID="password">Password</Label>
              <Input
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loginMutation.isPending}
              />
            </View>

            <Button
              onPress={handleLogin}
              disabled={loginMutation.isPending}
              className="mt-4"
            >
              <Text className="text-primary-foreground font-semibold">
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
              </Text>
            </Button>
          </View>

          {/* Test Credentials */}
          <View className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
            <Text className="mb-2 text-sm font-semibold text-foreground">
              Test Credentials:
            </Text>
            <Text className="text-xs text-muted-foreground">
              Username: emilys{'\n'}
              Password: emilyspass{'\n\n'}
              (Superadmin with delete privileges)
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}