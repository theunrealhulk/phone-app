import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, ImageSourcePropType, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const allButtonValues = [200, 100, 50, 20, 10, 5, 2, 1];

const buttonImages: Record<number, ImageSourcePropType> = {
  200: require('../assets/images/200.jpg'),
  100: require('../assets/images/100.jpg'),
  50: require('../assets/images/50.jpg'),
  20: require('../assets/images/20.jpg'),
  10: require('../assets/images/10.jpg'),
  5: require('../assets/images/5.jpg'),
  2: require('../assets/images/2.jpg'),
  1: require('../assets/images/1.jpg'),
};

export default function TestScreen() {
  const { numDigits } = useLocalSearchParams();
  const router = useRouter();
  const [number, setNumber] = useState(0);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [clickHistory, setClickHistory] = useState<{value: number, id: number}[]>([]);
  const [popup, setPopup] = useState<{show: boolean, success: boolean}>({show: false, success: false});
  const [showComplete, setShowComplete] = useState(false);
  const showOverlay = popup.show || showComplete;
  const digits = parseInt(numDigits as string);

  useEffect(() => {
    const d = parseInt(numDigits as string);
    const min = Math.pow(10, d - 1);
    const max = Math.pow(10, d) - 1;
    loadAndGenerateNumber(min, max);
  }, [numDigits]);

  const loadAndGenerateNumber = async (min: number, max: number) => {
    try {
      const stored = await AsyncStorage.getItem(`moneyCorrect_${numDigits}`);
      const correctAmounts: number[] = stored ? JSON.parse(stored) : [];
      const available: number[] = [];
      for (let i = min; i <= max; i++) {
        if (!correctAmounts.includes(i)) {
          available.push(i);
        }
      }
      if (available.length > 0) {
        setNumber(available[Math.floor(Math.random() * available.length)]);
      } else {
        setShowComplete(true);
      }
    } catch (e) {
      setNumber(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handlePress = (value: number) => {
    setCounts((prev) => ({
      ...prev,
      [value]: (prev[value] || 0) + 1,
    }));
    setClickHistory((prev) => [...prev, { value, id: Date.now() }]);
  };

  const decreaseCount = (value: number, e: any) => {
    e.stopPropagation();
    if (counts[value] > 0) {
      setClickHistory((prev) => {
        const index = prev.findLastIndex((item) => item.value === value);
        if (index !== -1) {
          const newHistory = [...prev];
          newHistory.splice(index, 1);
          return newHistory;
        }
        return prev;
      });
      setCounts((prev) => {
        const newCounts = { ...prev };
        if (newCounts[value] > 1) {
          newCounts[value] -= 1;
        } else {
          delete newCounts[value];
        }
        return newCounts;
      });
    }
  };

  const removeClick = (id: number) => {
    const itemToRemove = clickHistory.find((item) => item.id === id);
    setClickHistory((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      setCounts((prev) => {
        const newCounts = { ...prev };
        if (newCounts[itemToRemove.value] > 1) {
          newCounts[itemToRemove.value] -= 1;
        } else {
          delete newCounts[itemToRemove.value];
        }
        return newCounts;
      });
    }
  };

  const clearCounts = () => {
    setCounts({});
    setClickHistory([]);
  };

  const total = Object.entries(counts).reduce((sum, [value, count]) => sum + parseInt(value) * count, 0);

  const generateNewNumber = async () => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    await loadAndGenerateNumber(min, max);
  };

  const checkAnswer = async () => {
    if (total === number) {
      setPopup({show: true, success: true});
      const key = `moneyCorrect_${numDigits}`;
      try {
        const stored = await AsyncStorage.getItem(key);
        const correctAmounts: number[] = stored ? JSON.parse(stored) : [];
        if (!correctAmounts.includes(number)) {
          const newCorrect = [...correctAmounts, number];
          await AsyncStorage.setItem(key, JSON.stringify(newCorrect));
          const max = Math.pow(10, digits) - 1;
          if (newCorrect.length >= max) {
            setTimeout(() => {
              setShowComplete(true);
            }, 3000);
            return;
          }
        }
      } catch (e) {}
      setTimeout(async () => {
        setPopup({show: false, success: true});
        setCounts({});
        setClickHistory([]);
        await generateNewNumber();
      }, 1000);
    } else {
      setPopup({show: true, success: false});
      setTimeout(() => {
        setPopup({show: false, success: false});
      }, 1000);
    }
  };
  const useGrayText = digits >= 4;
  const buttonValues = digits === 2 
    ? allButtonValues.filter(v => v < 100)
    : allButtonValues;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.numberText}>{formatNumber(number)}</Text>
        <Text style={styles.currencyText}>درهم</Text>
        <View style={styles.clearRow}>
          <Pressable style={styles.clearButton} onPress={clearCounts}>
            <Text style={styles.clearText}>🗑️</Text>
          </Pressable>
          <Pressable style={styles.clearButton} onPress={checkAnswer}>
            <Text style={styles.clearText}>🔍</Text>
          </Pressable>
        </View>
      </View>
      {useGrayText ? (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{formatNumber(total)}</Text>
        </View>
      ) : (
        <View style={styles.stackContainer}>
          <ScrollView contentContainerStyle={styles.stackContent}>
            {clickHistory.map((item) => (
              <View key={item.id} style={styles.stackItem}>
                <Pressable onPress={() => removeClick(item.id)}>
                  <ImageBackground
                    source={buttonImages[item.value]}
                    style={styles.stackImage}
                    imageStyle={{}}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <View style={[styles.gridContainer, showOverlay && styles.gridContainerOverlay]}>
        {digits === 2 ? (
          <>
            <View style={[styles.row, { width: '75%' }]}>
              {buttonValues.slice(0, 3).map((value) => (
                <View key={value} style={[styles.buttonWrapper, { width: '33.33%' }]}>
                  <Pressable onPress={() => handlePress(value)}>
                    <ImageBackground source={buttonImages[value]} style={styles.gridButton} imageStyle={{ resizeMode: 'cover' }} />
                  </Pressable>
                  {counts[value] > 0 && (
                    <Pressable style={styles.badge} onPress={(e) => decreaseCount(value, e)}>
                      <View style={styles.badgeInner}>
                        <Text style={styles.badgeText}>{counts[value]}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
            <View style={[styles.row, { width: '75%' }]}>
              {buttonValues.slice(3, 6).map((value) => (
                <View key={value} style={[styles.buttonWrapper, { width: '33.33%' }]}>
                  <Pressable onPress={() => handlePress(value)}>
                    <ImageBackground source={buttonImages[value]} style={styles.gridButton} imageStyle={{ resizeMode: 'cover' }} />
                  </Pressable>
                  {counts[value] > 0 && (
                    <Pressable style={styles.badge} onPress={(e) => decreaseCount(value, e)}>
                      <View style={styles.badgeInner}>
                        <Text style={styles.badgeText}>{counts[value]}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.row}>
              {buttonValues.slice(0, 4).map((value) => (
                <View key={value} style={styles.buttonWrapper}>
                  <Pressable onPress={() => handlePress(value)}>
                    <ImageBackground source={buttonImages[value]} style={styles.gridButton} imageStyle={{ resizeMode: 'cover' }} />
                  </Pressable>
                  {counts[value] > 0 && (
                    <Pressable style={styles.badge} onPress={(e) => decreaseCount(value, e)}>
                      <View style={styles.badgeInner}>
                        <Text style={styles.badgeText}>{counts[value]}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.row}>
              {buttonValues.slice(4, 8).map((value) => (
                <View key={value} style={styles.buttonWrapper}>
                  <Pressable onPress={() => handlePress(value)}>
                    <ImageBackground source={buttonImages[value]} style={styles.gridButton} imageStyle={{ resizeMode: 'cover' }} />
                  </Pressable>
                  {counts[value] > 0 && (
                    <Pressable style={styles.badge} onPress={(e) => decreaseCount(value, e)}>
                      <View style={styles.badgeInner}>
                        <Text style={styles.badgeText}>{counts[value]}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      {popup.show && (
        <View style={[styles.popup, popup.success ? styles.popupSuccess : styles.popupError]}>
          <Text style={styles.popupText}>{popup.success ? '✅ صحيح' : '❌ خطأ'}</Text>
          <Text style={styles.popupSubtext}>{popup.success ? 'أحسنت! الجواب صحيح' : 'حاول مرة أخرى'}</Text>
        </View>
      )}
      {showComplete && (
        <View style={[styles.popup, styles.popupComplete]}>
          <Text style={styles.completeText}>لقد أتممتم جميع التمارين</Text>
          <Text style={styles.completeSubtext}>هل تريدون الإعادة مرة أخرى؟</Text>
          <View style={styles.completeButtons}>
            <Pressable style={styles.completeButton} onPress={async () => {
              await AsyncStorage.removeItem(`moneyCorrect_${numDigits}`);
              setShowComplete(false);
              await generateNewNumber();
            }}>
              <Text style={styles.completeButtonText}>نعم</Text>
            </Pressable>
            <Pressable style={styles.completeButton} onPress={() => {
              router.back();
            }}>
              <Text style={styles.completeButtonText}>لا</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  numberText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#292c3d',
  },
  currencyText: {
    fontSize: 24,
    color: '#666',
    marginTop: 8,
  },
  totalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  stackContainer: {
    position: 'absolute',
    top: 200,
    bottom: 260,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  stackContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  stackItem: {
    position: 'relative',
    marginTop: 8,
  },
  stackImage: {
    width: 120,
    height: 60,
  },
  removeBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF9500',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  clearButton: {
    backgroundColor: '#292c3d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 28,
  },
  gridContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  gridContainerOverlay: {
    opacity: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  buttonWrapper: {
    width: '25%',
    position: 'relative',
  },
  gridButton: {
    width: '100%',
    height: 70,
  },
  gridButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInner: {
    backgroundColor: '#FF3B30',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupSuccess: {
    backgroundColor: 'rgba(0, 200, 0, 0.9)',
  },
  popupError: {
    backgroundColor: 'rgba(200, 0, 0, 0.9)',
  },
  popupText: {
    fontSize: 72,
    color: '#fff',
    fontWeight: 'bold',
  },
  popupSubtext: {
    fontSize: 32,
    color: '#fff',
    marginTop: 16,
  },
  popupComplete: {
    backgroundColor: 'rgba(0, 122, 255, 0.95)',
    zIndex: 200,
  },
  completeText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  completeSubtext: {
    fontSize: 24,
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  completeButtons: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 20,
  },
  completeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
