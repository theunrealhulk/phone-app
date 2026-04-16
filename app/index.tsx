import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  const handleExit = () => {
    Alert.alert(
      'خروج',
      'هل أنت متأكد من الخروج من التطبيق؟',
      [
        { text: 'لا', style: 'cancel' },
        { text: 'نعم', onPress: () => {
          // Exit app - on Android this will close the activity
          window.close();
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>الكتابة و الحساب</Text>
      <Link href="/money" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>💵 النقود</Text>
        </Pressable>
      </Link>
      <Link href="/write-level" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>📄 الكتابة</Text>
        </Pressable>
      </Link>
      <Pressable style={[styles.button, styles.exitButton]} onPress={handleExit}>
        <Text style={styles.buttonText}>🚪 خروج</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292c3d',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#292c3d',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: '#d32f2f',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
