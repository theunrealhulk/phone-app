import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

const levels = [
  { id: 'basic', label: 'كلمات صغيرة', sublabel: '1-3 حروف' },
  { id: 'medium', label: 'كلمات متوسطة', sublabel: '4-5 حروف' },
  { id: 'advanced', label: 'كلمات طويلة', sublabel: '6+ حروف' },
];

export default function WriteLevelScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {levels.map((level) => (
          <Link key={level.id} href={`/write?level=${level.id}`} asChild>
            <Pressable style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{level.label}</Text>
                <Text style={styles.buttonSubtext}>{level.sublabel}</Text>
              </View>
            </Pressable>
          </Link>
        ))}
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