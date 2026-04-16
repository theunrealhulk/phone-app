import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function MoneyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link href="/test?numDigits=2" asChild>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>مبالغ صغيرة</Text>
              <Text style={styles.buttonSubtext}>أقل من 100 درهم</Text>
            </View>
          </Pressable>
        </Link>
        <Link href="/test?numDigits=3" asChild>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>مبالغ متوسطة</Text>
              <Text style={styles.buttonSubtext}>أقل من 1000 درهم</Text>
            </View>
          </Pressable>
        </Link>
        <Link href="/test?numDigits=4" asChild>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>مبالغ كبيرة</Text>
              <Text style={styles.buttonSubtext}>أقل من 10000 درهم</Text>
            </View>
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
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    width: 260,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
