import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <WebView
        source={{ uri: 'https://picklerotator.com' }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
