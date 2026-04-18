import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import basicWords from './data/basic.json';
import mediumWords from './data/medium.json';
import advancedWords from './data/advanced.json';

const levelData = [
  { id: 'basic', label: 'كَلِمَاتٌ صَغِيرَةٌ', sublabel: '1-3 حروف', count: basicWords.length },
  { id: 'medium', label: 'كَلِمَاتٌ مُتَوَسِّطَةٌ', sublabel: '4-5 حروف', count: mediumWords.length },
  { id: 'advanced', label: 'كَلِمَاتٌ طَوِيلَةٌ', sublabel: '6+ حروف', count: advancedWords.length },
];

export default function WriteLevelScreen() {
  const [correctCounts, setCorrectCounts] = useState<Record<string, number>>({});

  useFocusEffect(() => {
    const loadCounts = async () => {
      const counts: Record<string, number> = {};
      for (const level of levelData) {
        try {
          const stored = await AsyncStorage.getItem(`correctWords_${level.id}`);
          counts[level.id] = stored ? JSON.parse(stored).length : 0;
        } catch (e) {
          counts[level.id] = 0;
        }
      }
      setCorrectCounts(counts);
    };
    loadCounts();
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {levelData.map((level) => (
          <Link key={level.id} href={`/write?level=${level.id}`} asChild>
            <Pressable style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{level.label}</Text>
                <Text style={styles.buttonSubtext}>{level.sublabel}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{level.count > 0 ? Math.round((correctCounts[level.id] || 0) / level.count * 100) : 0}%</Text>
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
    position: 'relative',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 27,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    minWidth: 48,
    height: 32,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#292c3d',
    fontSize: 12,
    fontWeight: 'bold',
  },
});