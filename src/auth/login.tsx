import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: Constants.expoConfig.extra.googleIosClientId,
  });

  useEffect(() => {
    async function handleLogin() {
      if (response?.type !== 'success') return;

      const accessToken = response.authentication?.accessToken;
      if (!accessToken) return;

      setLoading(true);

      try {
        const res = await fetch(
          'https://social-sync-knock-murph1581.replit.app/auth/google',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_token: accessToken }),
          }
        );

        const data = await res.json();

        if (data?.jwt) {
          console.log('Backend JWT:', data.jwt);

          // Store JWT securely on device
          await SecureStore.setItemAsync('jwt', data.jwt);

          // Navigate to WebView home screen
          router.replace('/');
        } else {
          console.error('No JWT returned from backend:', data);
        }
      } catch (err) {
        console.error('Error exchanging token:', err);
      } finally {
        setLoading(false);
      }
    }

    handleLogin();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pickle Rotator</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request || loading}
      >
        <Text style={styles.googleText}>
          {loading ? 'Signing in…' : 'Continue with Google'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  googleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});


