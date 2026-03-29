import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import LoginScreen from './auth/login'; // <-- ADD THIS

export default function HomeScreen() {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const token = await SecureStore.getItemAsync('jwt');
      setJwt(token);
    }
    loadToken();
  }, []);

  // ⭐ REPLACE YOUR SPINNER BLOCK WITH THIS:
  if (!jwt) {
    return <LoginScreen />;
  }

  return (
    <WebView
      source={{
        uri: 'https://picklerotator.com',
        headers: { Authorization: `Bearer ${jwt}` },
      }}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
