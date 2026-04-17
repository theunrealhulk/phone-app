import { Stack } from 'expo-router';
import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="money" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
      <Stack.Screen name="test" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff', height: 0 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
      <Stack.Screen name="write" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff', height: 0 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
      <Stack.Screen name="write-level" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff', height: 0 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
      <Stack.Screen name="read-level" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff', height: 0 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
      <Stack.Screen name="read" options={{ 
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#fff', height: 0 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
        ),
      }} />
    </Stack>
  );
}
