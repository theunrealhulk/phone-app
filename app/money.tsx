import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function MoneyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href="/test?numDigits=2" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>⭐⭐</Text>
          </Pressable>
        </Link>
        <Link href="/test?numDigits=3" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>⭐⭐⭐</Text>
          </Pressable>
        </Link>
        <Link href="/test?numDigits=4" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>⭐⭐⭐⭐</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#292c3d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});
