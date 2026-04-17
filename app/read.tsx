import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, PermissionsAndroid, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';

import basicWords from './data/basic.json';
import mediumWords from './data/medium.json';
import advancedWords from './data/advanced.json';

const wordData: Record<string, string[]> = {
  basic: basicWords,
  medium: mediumWords,
  advanced: advancedWords,
};

export default function ReadScreen() {
  const { level } = useLocalSearchParams();
  const [number, setNumber] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [showResult, setShowResult] = useState<{show: boolean, success: boolean}>({show: false, success: false});

  const words = wordData[level as string] || basicWords;
  const currentWord = words[number];

  useEffect(() => {
    setNumber(Math.floor(Math.random() * words.length));
  }, [level]);

  useEffect(() => {
    setRecognizedText('');
    setShowResult({show: false, success: false});
  }, [number]);

  useEffect(() => {
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value[0]) {
        setRecognizedText(e.value[0]);
      }
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    Voice.onSpeechError = () => {
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const stripTashkeel = (text: string) => text.replace(/[\u064B-\u0652\u0670]/g, '');

  const normalizeForComparison = (text: string) => {
    const normalized = stripTashkeel(text);
    return normalized.replace(/[ة]/g, 'ه').replace(/[ىي]/g, 'ي').replace(/[ؤء]/g, 'ء').replace(/[أإآ]/g, 'ا');
  };

  const speakWord = () => {
    Speech.speak(currentWord, { language: 'ar-SA', pitch: 1.0, rate: 0.8 });
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('Permission result:', grants);
        return grants[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const toggleListening = async () => {
    console.log('toggleListening called, isListening:', isListening);
    
    if (isListening) {
      try {
        await Voice.stop();
        setIsListening(false);
        console.log('Voice stopped');
        
        if (recognizedText) {
          console.log('Checking answer with:', recognizedText);
          checkAnswer();
        }
      } catch (e) {
        console.log('Stop error:', e);
      }
    } else {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        console.log('No permission');
        return;
      }

      try {
        setRecognizedText('');
        const result = await Voice.start('ar-SA');
        console.log('Voice started:', result);
        setIsListening(true);
      } catch (error) {
        console.log('Start error:', error);
      }
    }
  };

  const checkAnswer = () => {
    if (!recognizedText) return;
    
    const userNormalized = normalizeForComparison(recognizedText);
    const correctNormalized = normalizeForComparison(currentWord);
    const isMatch = userNormalized === correctNormalized;
    setShowResult({show: true, success: isMatch});
    
    setTimeout(() => {
      setShowResult({show: false, success: false});
      setRecognizedText('');
      setNumber(Math.floor(Math.random() * words.length));
    }, 3000);
  };

  const getResultEmoji = () => showResult.success ? '👍' : '😡';
  const getResultText = () => showResult.success ? 'أحسنت! صحيح' : 'حاول مرة أخرى';

  return (
    <View style={styles.container}>
      {showResult.show && (
        <View style={[styles.resultContainer, showResult.success ? styles.resultSuccess : styles.resultError]}>
          <Text style={styles.resultEmoji}>{getResultEmoji()}</Text>
          <Text style={styles.resultText}>{getResultText()}</Text>
        </View>
      )}

      <Pressable 
        style={styles.wordContainer}
        onPress={() => setNumber(Math.floor(Math.random() * words.length))}
      >
        <Text style={styles.wordText}>{currentWord}</Text>
      </Pressable>

      <View style={styles.buttonRow}>
        <Pressable onPress={speakWord} style={styles.speakButton}>
          <Text style={styles.speakButtonText}>🔊</Text>
        </Pressable>

        <Pressable
          onPress={toggleListening}
          disabled={showResult.show}
          style={[styles.micButton, isListening && styles.micButtonActive]}
        >
          <Text style={styles.micButtonText}>{isListening ? '⏹️' : '🎤'}</Text>
        </Pressable>
      </View>

      {isListening && (
        <Text style={styles.listeningText}>جاري الاستماع... (اضغط مرة أخرى للتوقف)</Text>
      )}

      {recognizedText.length > 0 && !showResult.show && !isListening && (
        <View style={styles.recognizedContainer}>
          <Text style={styles.recognizedLabel}>النص المكتوب:</Text>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resultContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  resultSuccess: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
  },
  resultError: {
    backgroundColor: 'rgba(244, 67, 54, 0.95)',
  },
  resultEmoji: {
    fontSize: 100,
  },
  resultText: {
    fontSize: 28,
    color: '#fff',
    marginTop: 16,
    fontWeight: 'bold',
  },
  wordContainer: {
    marginTop: 80,
    padding: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
  },
  wordContainerTouchable: {
    cursor: 'pointer',
  },
  wordText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#292c3d',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 20,
  },
  speakButton: {
    backgroundColor: '#292c3d',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakButtonText: {
    fontSize: 30,
  },
  micButton: {
    backgroundColor: '#292c3d',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#F44336',
  },
  micButtonText: {
    fontSize: 30,
  },
  listeningText: {
    marginTop: 20,
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
  recognizedContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  recognizedLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recognizedText: {
    fontSize: 24,
    color: '#292c3d',
  },
});