import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const token = await SecureStore.getItemAsync('jwt');
      setJwt(token);
    }
    loadToken();
  }, []);

  if (!jwt) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
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
